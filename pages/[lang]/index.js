import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { indexQuery, actualitesQuery, homeQuery, menuQuery, footerQuery } from '../../lib/queries'
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

    let orderedEvents = data?.allEvents.sort(function(a,b){
      return  new Date(a.startdate) - new Date(b.startdate)
    });

    let allEventsArray = orderedEvents.filter(item => {
      let today = new Date()
      today.setHours(0,0,0,0)

      if(new Date(item.startdate) > today) {
        return item
      }
    })

    setAllEvents([...allEventsArray])

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
        <Calendar data={data.allEvents} />
        {/* <Video data={homeData} title={homeData?.videoTitle}/> */}
        <EventList data={allEvents} />
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

  // All Events
  let allEvents = await getClient(preview).fetch(indexQuery, {
    slug: params.lang
  });

  // All Actualites
  const allActualites = await getClient(preview).fetch(actualitesQuery, {
    slug: params.lang
  });

  allEvents = [...allEvents, ...allActualites]

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
        allEvents,
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
