import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import ErrorPage from 'next/error'
import Header from '../../../components/header'
import Layout from '../../../components/layout'
import { SITE_NAME } from '../../../lib/constants'
import { previewActualiteBySlugQuery, actualiteBySlugQuery, actualiteSlugsQuery, menuQuery, footerQuery } from '../../../lib/queries'
import { sanityClient, getClient, overlayDrafts } from '../../../lib/sanity.server'

import splitSlug from "../../../lib/splitSlug"

import Body from "../../../components/body"
import EventHeader from '../../../components/event/event-header'
import EventBody from '../../../components/event/event-body'

import InclusiviteIcon from '../../../components/inclusivite-icon'
import Link from '../../../components/link'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 100px;
  
  @media(max-width: 767px) {
    flex-wrap: wrap;
    margin-top: 20px;
  }
`

const VignetteWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;

  > div:nth-child(1) {
    flex-basis: 30%
  }

  > div:nth-child(2) {
    flex-basis: 70%
  }

  @media(max-width: 989px) {
    > div:nth-child(1) {
      flex-basis: 0
    }
  }
`


const Vignette = styled.div`
  margin-bottom: 20px;

  @media(max-width: 989px) {
  };
`
const InclusiviteIconContainer = styled.div`
  margin: 20px 0;
  width: fit-content;

  svg {
    width: 20px;
  }
`


export default function Actualite({ data = {}, preview }) {
  const router = useRouter()

  const slug = data?.actualite?.slug


  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  let actualite = data.actualite

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0,0);
    }, 10)
  }, [])


  return (
    <Layout preview={preview}>
        <Header />
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
              <Head>
                <title>
                  {actualite.title} | {SITE_NAME}
                </title>
                <meta
                  name="description"
                  content={actualite.content}
                />
              </Head>
              <Container>              
                  <VignetteWrapper>
                  <div></div>
                  <Vignette>
                    {
                      actualite.inclusivite === true &&
                      <InclusiviteIconContainer>
                        <Link href={`/${router.asPath.split("/")[1]}/inclusivite/test`}>
                          <InclusiviteIcon />
                        </Link>
                      </InclusiviteIconContainer>
                    }                      
                    <Body content={actualite.textVignette} />
                  </Vignette>
                  </VignetteWrapper>
                <EventBody data={actualite} />
              </Container>              
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `${params.lang}__actualites__${params.slug}`


  // const { actualite, moreactualites } = await getClient(preview).fetch(actualiteQuery, {
  //   slug: slug,
  // })

  let actualite = await getClient(preview).fetch(actualiteBySlugQuery, { slug: slug })

  if(preview) {
    actualite = await getClient(preview).fetch(previewActualiteBySlugQuery, {
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
        actualite,
        menuData,
        footerData
      },
    },
  }
}


export async function getStaticPaths() {
  const paths = await sanityClient.fetch(actualiteSlugsQuery)
  
  return {
    paths: paths.map((slug) => ({ params: { lang: splitSlug(slug, 0), slug: splitSlug(slug, 2) } })),
    fallback: false,
  }
}
