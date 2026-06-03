import Head from 'next/head'

import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { menuQuery, footerQuery, inscriptionNewsletterQuery, previewInscriptionNewsletterQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'
import Body from '../../components/body'
import NestedMenu from '../../components/nested-menu'
import styled from 'styled-components'

import {
  Container,
  ColLeft,
  MenuPin,
  ColMiddleFirst,
  ColMiddleRest,
  ColRight,
} from '../../components/l-ensemble/l-ensemble-body'

import EmailSubscribeForm from '../../components/email-subscribe-form'

const Wrapper = styled.div`
  > div {
    min-height: calc(100vh - 350px);
  }

  @media(max-width: 1200px) {

    /* ColLeft: shrink span to match the 2 actual content rows */
    > div > div:nth-child(1) {
      grid-row: 1 / span 2 !important;
    }

    /* ColRight: empty on this page, remove it from the grid entirely */
    > div > div:nth-child(3) {
      display: none;
    }

    /* ColMiddleRest: move up to row 2 since ColRight is gone */
    > div > div:nth-child(4) {
      grid-row: 2 !important;
      margin-bottom: 30px;
    }
  }
`


export default function InscriptionNewsletter({ data = {}, preview }) {
  const pageData = data.pageData
  const title = pageData?.title

  const menuItems = (() => {
    const nested = data.menuData?.menuItems?.filter(item => item.subItems?.length > 0) ?? []
    return nested.length > 0 ? [...nested[0].subItems, ...nested.slice(1)] : []
  })()

  return (
    <Layout preview={preview}>
      <Head>
        <title>{title} | {SITE_NAME}</title>
        <meta name="description" content={pageData?.content} />
      </Head>
      <Wrapper>
        <Container>
          <ColLeft>
            <MenuPin>
              <NestedMenu noUppercaseNested items={menuItems} />
            </MenuPin>
          </ColLeft>
          <ColMiddleFirst>
            <h1 className="h1">{title}</h1>
          </ColMiddleFirst>
          <ColRight />
          <ColMiddleRest>
            {pageData?.text && <Body content={pageData.text} />}
            <EmailSubscribeForm data={data.footerData} />
          </ColMiddleRest>
        </Container>
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
