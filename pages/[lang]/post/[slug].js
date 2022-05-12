import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../components/header'
import Layout from '../../../components/layout'
import { CMS_NAME } from '../../../lib/constants'
import { postQuery, postSlugsQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../../lib/sanity.server'

import EventHeader from '../../../components/event/event-header'
import EventBody from '../../../components/event/event-body'

export default function Post({ data = {}, preview }) {
  const router = useRouter()

  const slug = data?.post?.slug

  const {
    data: { post, morePosts },
  } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })


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
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
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

  let slug = `${params.lang}__post__${params.slug}`

  const { post, morePosts } = await getClient(preview).fetch(postQuery, {
    slug: slug,
  })

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
        morePosts: overlayDrafts(morePosts),
        menuData,
        footerData
      },
    },
  }
}

let splitSlug = (slug) => {
  return slug.split("__")[0]
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postSlugsQuery)

  console.log(paths)
  
  return {
    paths: paths.map((slug) => ({ params: { lang: splitSlug(slug), slug: splitSlug(slug) } })),
    fallback: true,
  }
}
