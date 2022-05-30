import Head from 'next/head'
import Layout from "../components/layout";
import styled from 'styled-components';

import { menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

import { SITE_NAME } from "../lib/constants"

const Container = styled.div`
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    a {
        margin-top: 25px;
    }
`


export default function Custom404({ data = {}, preview }) {
    return (
    <Layout preview={preview}>
      <Head>
        <title>{SITE_NAME} | 404 - Page Not Found</title>
      </Head>
      <Container>
          <div>
            <h2>404 - Page Not Found</h2>
            <a href="/en_gb">Go Home</a>
          </div>
      </Container>
    </Layout>
    )
  }

export async function getStaticProps({ preview = false, params }) {



    // Get Menu And Footer

    const menuData = await getClient(preview).fetch(menuQuery, {
        lang: "en_gb"
    });


    const footerData = await getClient(preview).fetch(footerQuery, {
        lang: "en_gb"
    });


    return {
        props: {
            preview,
            data: {
              menuData,
              footerData
            }
          }
    };
}