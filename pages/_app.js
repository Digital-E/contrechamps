import '../styles/index.css'
import Header from '../components/header'
import Footer from '../components/footer'

function MyApp({ Component, pageProps, router }) {

  return (
    <>
      <Header data={pageProps.data?.menuData} />
      <Component {...pageProps} />
      <Footer data={pageProps.data?.footerData}/>
    </>
  )
}

export default MyApp
