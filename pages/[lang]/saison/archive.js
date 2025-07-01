import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../components/header'
import Layout from '../../../components/layout'
import { SITE_NAME } from '../../../lib/constants'
import { indexQuery, actualitesQuery, saisonQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { getClient } from '../../../lib/sanity.server'

import SaisonHeader from '../../../components/saison/saison-header'
import Filters from '../../../components/saison/filters'
import ArchiveEvents from '../../../components/saison/archive-events'

export default function Post({ data = {}, preview }) {
  const router = useRouter()

  const slug = data?.data?.slug


  let allEvents = data?.allEvents.sort(function(a,b){
    return  new Date(b.startdate) - new Date(a.startdate)
  });

  data = data?.data;


  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {
    // document.querySelector("body").classList.add("dark-background");

    // return () => {
    //   document.querySelector("body").classList.remove("dark-background");
    // }
  }, []);


  return (
    <Layout preview={preview}>
        <Header />
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
              <Head>
                <title>
                  Archive | {SITE_NAME}
                </title>
              </Head>
              {/* <SaisonHeader data={data} withBorder={true} /> */}
              {/* <Filters data={data} /> */}
              <ArchiveEvents data={allEvents} />
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `${params.lang}__saison`


  const data = await getClient(preview).fetch(saisonQuery, {
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
        data,
        allEvents,
        menuData,
        footerData
      },
    },
  }
}


export async function getStaticPaths() {
  const paths = ['fr', 'en_gb'];
  
  return {
    paths: paths.map((slug) => ({ params: { lang: slug } })),
    fallback: false,
  }
}
