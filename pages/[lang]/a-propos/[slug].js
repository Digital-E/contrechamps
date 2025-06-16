import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../components/header'
import Layout from '../../../components/layout'
import { SITE_NAME } from '../../../lib/constants'
import { lEnsembleSlugsQuery, previewLEnsembleQuery, lEnsembleQuery, lEnsembleMenuQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { sanityClient, getClient } from '../../../lib/sanity.server'

import splitSlug from "../../../lib/splitSlug"

import LEnsembleBody from '../../../components/l-ensemble/l-ensemble-body'


export default function Component({ data = {}, preview, shortSlug }) {
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
                <meta
                  name="description"
                  content={data.data.content}
                />
              </Head>
              <LEnsembleBody data={data.data} menuData={data.lEnsembleMenu} slug={data.shortSlug}/>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `${params.lang}__a-propos__${params.slug}`

  let shortSlug = params.slug;


  let data = await getClient(preview).fetch(lEnsembleQuery, {
    slug: slug,
  })

  if(preview) {
    data = await getClient(preview).fetch(previewLEnsembleQuery, {
      slug: slug,
    })
  }

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
        footerData,
        shortSlug
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
