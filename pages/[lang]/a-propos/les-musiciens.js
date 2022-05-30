import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../components/header'
import Layout from '../../../components/layout'
import { SITE_NAME } from '../../../lib/constants'
import { lesMusiciensMenuQuery, lEnsembleMenuQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { sanityClient, getClient } from '../../../lib/sanity.server'

import LesMusiciensBody from '../../../components/l-ensemble/les-musiciens-body'

export default function Component({ data = {}, preview }) {
  const router = useRouter()

//   const slug = data?.data?.slug


//   if (!router.isFallback && !slug) {
//     return <ErrorPage statusCode={404} />
//   }


  return (
    <Layout preview={preview}>
        <Header />
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
              <Head>
                <title>
                  {data.lesMusiciensMenu?.title} | {SITE_NAME}
                </title>
              </Head>

              <LesMusiciensBody data={null} menuData={data.lEnsembleMenu} menuTwoData={data.lesMusiciensMenu} />

          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {


//   const data = await getClient(preview).fetch(lEnsembleQuery, {
//     slug: slug,
//   })

  const data = null

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
//   const paths = await sanityClient.fetch(lesMusiciensSlugsQuery)
const paths = ['fr', 'en_gb'];
  
  return {
    paths: paths.map((slug) => ({ params: { lang: slug } })),
    fallback: false,
  }
}
