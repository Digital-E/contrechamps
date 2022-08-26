import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../components/header'
import Layout from '../../../components/layout'
import { SITE_NAME } from '../../../lib/constants'
import { indexQuery, saisonQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { getClient } from '../../../lib/sanity.server'

import SaisonHeader from '../../../components/saison/saison-header'
import Filters from '../../../components/saison/filters'
import SaisonEvents from '../../../components/saison/saison-events'

export default function Post({ data = {}, preview }) {
  const router = useRouter()

  const slug = data?.data?.slug

let allEvents = data?.allEvents

data = data?.data;


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
    <Layout preview={preview}>
        <Header />
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
              <Head>
                <title>
                  {data.title} | {SITE_NAME}
                </title>
                <meta
                  name="description"
                  content={data.content}
                />
              </Head>
              <SaisonHeader data={data} withBorder={true} hideOnMobile={true} />
              <Filters data={data} />
              <SaisonEvents data={allEvents} />
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
  const allEvents = await getClient(preview).fetch(indexQuery, {
    slug: params.lang
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
