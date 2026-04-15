import Head from 'next/head'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Layout from '../../components/layout'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { SITE_NAME } from '../../lib/constants'
import { menuQuery, footerQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'

import EmailSubscribeForm from '../../components/email-subscribe-form'

const Wrapper = styled.div`
  padding: 60px 20px 60px 20px;
  width: 100%;
  margin: 0 auto;

  @media(max-width: 1200px) {
    width: 100%;
  }
`

const Title = styled.h1`
  margin-bottom: 10px;
`

export default function InscriptionNewsletter({ data = {}, preview }) {
  const router = useRouter()
  const lang = router.query.lang

  const title = lang === 'en_gb' ? 'Newsletter Sign Up' : 'Inscription à la newsletter'

  return (
    <Layout preview={preview}>
      <Head>
        <title>{title} | {SITE_NAME}</title>
      </Head>
      <Header data={data.menuData} />
      <Wrapper>
        <Title className="h1">{title}</Title>
        <p>Inscrivez-vous à notre newsletter pour recevoir les dernières actualités.</p>
        <EmailSubscribeForm data={data.footerData} />
      </Wrapper>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
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
