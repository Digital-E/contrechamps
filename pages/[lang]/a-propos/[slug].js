import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../components/header'
import Layout from '../../../components/layout'
import { SITE_NAME } from '../../../lib/constants'
import { lEnsembleSlugsQuery, lEnsembleQuery, lEnsembleMenuQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { sanityClient, getClient } from '../../../lib/sanity.server'

import splitSlug from "../../../lib/splitSlug"

import LEnsembleBody from '../../../components/l-ensemble/l-ensemble-body'


export default function Component({ data = {}, preview }) {
  const router = useRouter()

  const slug = data?.data?.slug


  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }


  return (
    <Layout preview={preview}>
        <Header />
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
              <Head>
                <title>
                  {data.data.title} | {SITE_NAME}
                </title>
              </Head>
              <LEnsembleBody data={data.data} menuData={data.lEnsembleMenu} />
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `${params.lang}__a-propos__${params.slug}`


  const data = await getClient(preview).fetch(lEnsembleQuery, {
    slug: slug,
  })

  const lEnsembleMenu = await getClient(preview).fetch(lEnsembleMenuQuery, {
    lang: params.lang
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
        lEnsembleMenu,
        menuData,
        footerData
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(lEnsembleSlugsQuery)
  
  return {
    paths: paths.map((slug) => ({ params: { lang: splitSlug(slug, 0), slug: splitSlug(slug, 2) } })),
    fallback: false,
  }
}
