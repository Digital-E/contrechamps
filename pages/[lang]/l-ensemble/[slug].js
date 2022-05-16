import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../components/header'
import Layout from '../../../components/layout'
import { CMS_NAME } from '../../../lib/constants'
import { lEnsembleSlugsQuery, lEnsembleQuery, lEnsembleMenuQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { sanityClient, getClient } from '../../../lib/sanity.server'

import LEnsembleBody from '../../../components/l-ensemble/l-ensemble-body'

export default function Post({ data = {}, preview }) {
  const router = useRouter()

  const slug = data?.data?.slug


  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  console.log(data)

  return (
    <Layout preview={preview}>
        <Header />
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
              <Head>
                <title>
                  {data.data.title} | Next.js Blog Example with {CMS_NAME}
                </title>
              </Head>
              <LEnsembleBody data={data.data} menuData={data.lEnsembleMenu} />
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `${params.lang}__l-ensemble__${params.slug}`


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

let splitSlug = (slug) => {
  return slug.split("__")[0]
}

let splitSlugAlt = (slug) => {
  return slug.split("__")[2]
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(lEnsembleSlugsQuery)
  
  return {
    paths: paths.map((slug) => ({ params: { lang: splitSlug(slug), slug: splitSlugAlt(slug) } })),
    fallback: true,
  }
}
