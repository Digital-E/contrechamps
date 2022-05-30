import Head from 'next/head'

import styled from "styled-components"

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../components/header'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { legalQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'

import MediaHeader from "../../components/media/media-page/media-header"
import Body from "../../components/body"

const Wrapper = styled.div`
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

  data = data?.data;


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
                  {data.title} | {SITE_NAME}
                </title>
              </Head>
              <MediaHeader data={data} />
              <Wrapper>
                <Body content={data.text} />
              </Wrapper>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `${params.lang}__legal`


  const data = await getClient(preview).fetch(legalQuery, {
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
        data,
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
