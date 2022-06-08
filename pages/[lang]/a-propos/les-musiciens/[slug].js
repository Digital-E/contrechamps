import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../../components/header'
import Layout from '../../../../components/layout'
import { SITE_NAME } from '../../../../lib/constants'
import { lEnsembleMenuQuery, lesMusiciensMenuQuery, lesMusiciensSlugsQuery, lesMusiciensQuery, menuQuery, footerQuery } from '../../../../lib/queries'
import { sanityClient, getClient } from '../../../../lib/sanity.server'

import splitSlug from "../../../../lib/splitSlug"

import LesMusiciensBody from '../../../../components/l-ensemble/les-musiciens-body'

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
                <meta
                  name="description"
                  content={data.content}
                />
              </Head>
              <LesMusiciensBody data={data.data} menuData={data.lEnsembleMenu} menuTwoData={data.lesMusiciensMenu} isSubPage={true} isSubSubPage={true} />
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `${params.lang}__a-propos__les-musiciens__${params.slug}`


  const data = await getClient(preview).fetch(lesMusiciensQuery, {
    slug: slug,
  })

  const lEnsembleMenu = await getClient(preview).fetch(lEnsembleMenuQuery, {
    lang: params.lang
  });

  const lesMusiciensMenu = await getClient(preview).fetch(lesMusiciensMenuQuery, {
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
        lesMusiciensMenu,
        menuData,
        footerData
      },
    },
  }
}


export async function getStaticPaths() {
  const paths = await sanityClient.fetch(lesMusiciensSlugsQuery)
  
  return {
    paths: paths.map((slug) => ({ params: { lang: splitSlug(slug, 0), slug: splitSlug(slug, 3) } })),
    fallback: false,
  }
}
