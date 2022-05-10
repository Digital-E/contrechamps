import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Intro from '../../components/intro'
import Header from '../../components/header'
import Layout from '../../components/layout'
import { CMS_NAME } from '../../lib/constants'
import { indexQuery, homeQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient, overlayDrafts } from '../../lib/sanity.server'


// Components
import News from "../../components/home/news"

export default function Index({ data = {}, preview }) {
  // const heroPost = allPosts[0]
  // const morePosts = allPosts.slice(1)
  const router = useRouter()

  const slug = data?.homeData?.slug

  console.log(data)

  const {
    data: { homeData },
  } = usePreviewSubscription(homeQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }


  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.title}</title>
          <meta
          name="description"
          content={homeData?.content}
          />
        </Head>
        <Header />
        <News data={data.news} />
        {/* <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container> */}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {
  // const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  // return {
  //   props: { allPosts, preview },
  // }

  let slug = params.lang

  const homeData = await getClient(preview).fetch(homeQuery, {
    slug: slug,
  })

  const news = await getClient(preview).fetch(indexQuery, {
    slug: slug === "en_gb" ? "en_GB" : "fr"
  });


  return {
    props: {
      preview,
      data: {
        homeData,
        news
      }
    }
  }
}

export async function getStaticPaths() {
  const paths = ['fr', 'en_GB'];

  return {
    paths: paths.map((lang) => ({ params: { lang } })),
    fallback: true,
  }
}
