import Head from 'next/head'
import styled from 'styled-components'

import Layout from '../../components/layout'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { SITE_NAME } from '../../lib/constants'
import { menuQuery, footerQuery, inscriptionNewsletterQuery, previewInscriptionNewsletterQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'
import Body from '../../components/body'

import EmailSubscribeForm from '../../components/email-subscribe-form'

const Wrapper = styled.div`
  padding: 60px 20px 60px 20px;
  width: 100%;
  margin: 0 auto;

  @media(max-width: 1200px) {
    width: 100%;
  }

  > div:last-child {
    margin-top: 50px !important;
  }
`

const Title = styled.h1`
  margin-bottom: 10px;
`

export default function InscriptionNewsletter({ data = {}, preview }) {
  const pageData = data.pageData
  const title = pageData?.title


  return (
    <Layout preview={preview}>
      <Head>
        <title>{title} | {SITE_NAME}</title>
        <meta name="description" content={pageData?.content} />
      </Head>
      <Header data={data.menuData} />
      <Wrapper>
        <Title className="h1">{title}</Title>
        {pageData?.text && <Body content={pageData.text} />}
        <EmailSubscribeForm data={data.footerData} />
      </Wrapper>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const slug = `${params.lang}__inscription-newsletter`

  const pageData = preview
    ? await getClient(preview).fetch(previewInscriptionNewsletterQuery, { slug })
    : await getClient(preview).fetch(inscriptionNewsletterQuery, { slug })

  const menuData = await getClient(preview).fetch(menuQuery, {
    lang: params.lang,
  })

  const footerData = await getClient(preview).fetch(footerQuery, {
    lang: params.lang,
  })

  return {
    props: {
      preview,
      data: {
        pageData,
        menuData,
        footerData,
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = ['fr', 'en_gb']

  return {
    paths: paths.map((lang) => ({ params: { lang } })),
    fallback: false,
  }
}
