import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../components/header'
import Layout from '../../../components/layout'
import { SITE_NAME } from '../../../lib/constants'
import { previewPostQuery, postQuery, postSlugsQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../../lib/sanity.server'

import splitSlug from "../../../lib/splitSlug"

import EventHeader from '../../../components/event/event-header'
import EventBody from '../../../components/event/event-body'

export default function Post({ data = {}, preview }) {
  const router = useRouter()

  const slug = data?.post?.slug

  let post = data.post

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0,0);
    }, 0)
  }, [])


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
                  {post.title} | {SITE_NAME}
                </title>
                <meta
                  name="description"
                  content={post.content}
                />
                {post.image && (
                  <meta
                    key="ogImage"
                    property="og:image"
                    content={urlForImage(post.image)
                      .width(1200)
                      .height(627)
                      .fit('crop')
                      .url()}
                  />
                )}
              </Head>
              <EventHeader data={post} />
              <EventBody data={post} />
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `${params.lang}__saison__${params.slug}`


  let { post } = await getClient(preview).fetch(postQuery, {
    slug: slug,
  })

  if(preview) {
    post = await getClient(preview).fetch(previewPostQuery, {
      slug: slug,
    })

    post = post.post
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
        post,
        menuData,
        footerData
      },
    },
  }
}


export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postSlugsQuery)
  
  return {
    paths: paths.map((slug) => ({ params: { lang: splitSlug(slug, 0), slug: splitSlug(slug, 2) } })),
    fallback: false,
  }
}
