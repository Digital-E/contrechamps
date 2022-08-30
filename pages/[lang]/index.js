import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { indexQuery, indexEventsQuery, homeQuery, menuQuery, footerQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient, overlayDrafts } from '../../lib/sanity.server'


// Components
import EventList from "../../components/home/event-list"
import Circles from '../../components/home/circles'
import Calendar from '../../components/home/calendar'
import Overlay from "../../components/home/overlay"

export default function Index({ data = {}, preview }) {
  // const heroPost = allPosts[0]
  // const morePosts = allPosts.slice(1)
  let [allEvents, setAllEvents] = useState([]);
  const router = useRouter()

  const slug = data?.homeData?.slug

  // const {
  //   data: { homeData },
  // } = usePreviewSubscription(homeQuery, {
  //   params: { slug },
  //   initialData: data,
  //   enabled: preview && slug,
  // })

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {
    // document.querySelector("body").classList.add("dark-background");

    let now  = new Date();
    now = now;

    let events = data.events.slice();

    let orderedEvents = events.sort(function(a,b) {
      var aToDate = (new Date(a.startdate));
      var bToDate = (new Date(b.startdate));
      return Math.abs(aToDate - now) - Math.abs(bToDate - now);
    })

    let allEventsArray = orderedEvents.filter(item => {
      if(new Date(item.startdate) > new Date()) {
        return item
      }
    })

    let splicedAllEventsArray = [];

    if(data.homeData.video !== null) {
      splicedAllEventsArray = allEventsArray.splice(0, 5)
    } else {
      splicedAllEventsArray = allEventsArray.splice(0, 6)
    }

    setAllEvents([...splicedAllEventsArray])

    return () => {
      // document.querySelector("body").classList.remove("dark-background");
    }
  }, []);


  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.homeData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.homeData?.content}
          />
        </Head>
        {/* <Overlay /> */}
        <Circles data={data?.homeData?.circles} />
        <Calendar data={data.news} />
        {/* <Video data={homeData} title={homeData?.videoTitle}/> */}
        <EventList data={allEvents} title={data?.homeData?.newsTitle} videoData={data?.homeData}/>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {
  // const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  // return {
  //   props: { allPosts, preview },
  // }

  let slug = params.lang

  const homeData = await getClient(preview).fetch(homeQuery, {
    slug: slug,
  })

  const news = await getClient(preview).fetch(indexQuery, {
    slug: slug
  });

  const events = await getClient(preview).fetch(indexEventsQuery, {
    slug: slug
  });

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery, {
    lang: params.lang
  });

  const footerData = await getClient(preview).fetch(footerQuery, {
    lang: params.lang
  });

  return {
    props: {
      preview,
      data: {
        homeData,
        news,
        events,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
  const paths = ['fr', 'en_gb'];

  return {
    paths: paths.map((lang) => ({ params: { lang } })),
    fallback: false,
  }
}
