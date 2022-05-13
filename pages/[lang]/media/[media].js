import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../components/header'
import Layout from '../../../components/layout'
import { SITE_NAME } from '../../../lib/constants'
import { mediaPageQuery, mediaSlugsQuery, pressQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../../lib/sanity.server'

import MediasHeader from '../../../components/saison/saison-header'
import Filters from '../../../components/media/filters'
import ListHeader from "../../../components/media/list-header"

import PressList from "../../../components/media/presse/press-list"


export default function Post({ data = {}, preview }) {
  const router = useRouter()

  const slug = data?.data?.slug

//   const {
//     data: { post, morePosts },
//   } = usePreviewSubscription(postQuery, {
//     params: { slug },
//     initialData: data,
//     enabled: preview && slug,
//   })



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
              <MediasHeader data={data.data} />
              <Filters data={data.data} />
              <ListHeader data={data.data} />
              <PressList data={data.allMedia} />
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `${params.lang}__media__${params.media}`


  const data = await getClient(preview).fetch(mediaPageQuery, {
    slug: slug,
  })


  let allMedia = null;


  if(data.type === "presse") {
    allMedia = await getClient(preview).fetch(pressQuery, {
      lang: params.lang
    })
  } else if (data.type === "video") {
    allMedia = await getClient(preview).fetch(pressQuery, {
      lang: params.lang
    })
  } else if (data.type === "disque") {
    allMedia = await getClient(preview).fetch(pressQuery, {
      lang: params.lang
    })
  }


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
        allMedia,
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
  
  const paths = await sanityClient.fetch(mediaSlugsQuery)
  
  
  return {
    paths: paths.map((slug) => ({ params: { lang: splitSlug(slug), media: splitSlugAlt(slug) } })),
    fallback: true,
  }
}
