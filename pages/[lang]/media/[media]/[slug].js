import styled from "styled-components"
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../../components/header'
import Layout from '../../../../components/layout'
import { SITE_NAME } from '../../../../lib/constants'
import { allMediaSlugsQuery, previewMediaQuery, mediaQuery, menuQuery, footerQuery } from '../../../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../../../lib/sanity.server'

import splitSlug from "../../../../lib/splitSlug"

import MediaHeader from "../../../../components/media/media-page/media-header"
import Slices from '../../../../components/l-ensemble/l-ensemble-slices'

const SlicesWrapper = styled.div`
    padding: 0 20px;
    width: 70%;
    margin: 0 auto 100px auto;

    @media(max-width: 1200px) {
        width: 100%;
      }
`


export default function Post({ data = {}, preview }) {
  const router = useRouter()

  const slug = data?.data?.slug


  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  data = data.data

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
              <MediaHeader data={data} />
              <SlicesWrapper>
                <Slices data={data.slices} />
              </SlicesWrapper>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `${params.lang}__media__${params.media}__${params.slug}`


  let data = await getClient(preview).fetch(mediaQuery, {
    slug: slug,
  })

  if(preview) {
    data = await getClient(preview).fetch(previewMediaQuery, {
      slug: slug,
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
        menuData,
        footerData
      },
    },
  }
}


export async function getStaticPaths() {
  const paths = await sanityClient.fetch(allMediaSlugsQuery)
  
  return {
    paths: paths.map((slug) => ({ params: { lang: splitSlug(slug, 0), media: splitSlug(slug, 2), slug: splitSlug(slug, 3) } })),
    fallback: false,
  }
}
