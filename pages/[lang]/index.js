import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import { CMS_NAME } from '../../lib/constants'
import { indexQuery, indexEventsQuery, homeQuery, menuQuery, footerQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient, overlayDrafts } from '../../lib/sanity.server'


// Components
import EventList from "../../components/home/event-list"
import Video from "../../components/home/video"
import Circles from '../../components/home/circles'
import Calendar from '../../components/home/calendar'

export default function Index({ data = {}, preview }) {
  // const heroPost = allPosts[0]
  // const morePosts = allPosts.slice(1)
  const router = useRouter()

  const slug = data?.homeData?.slug

  const {
    data: { homeData },
  } = usePreviewSubscription(homeQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {
    document.querySelector("body").classList.add("dark-background");

    return () => {
      document.querySelector("body").classList.remove("dark-background");
    }
  }, []);


  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{homeData?.title}</title>
          <meta
          name="description"
          content={homeData?.content}
          />
        </Head>
        <Circles data={homeData} />
        <Calendar data={data.news} />
        <EventList data={data.events} title={homeData?.newsTitle}/>
        <Video data={homeData} title={homeData?.videoTitle}/>
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
    fallback: true,
  }
}
