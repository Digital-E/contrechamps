import '../styles/index.css'
import 'plyr/dist/plyr.css'
import '../styles/flickity.css'

import { useEffect } from 'react'

import Body from "../components/body"
import CookieConsent from "react-cookie-consent"

import Header from '../components/header'
import Footer from '../components/footer'

import { RouterScrollProvider } from '@moxy/next-router-scroll';


function MyApp({ Component, pageProps, router }) {

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#__next").style.opacity = 1
    }, 250)

    document.documentElement.style.setProperty('--background-colour', `rgba(${pageProps.data?.menuData?.backgroundColor?.rgb.r},${pageProps.data?.menuData?.backgroundColor?.rgb.g}, ${pageProps.data?.menuData?.backgroundColor?.rgb.b}, ${pageProps.data?.menuData?.backgroundColor?.rgb.a})`);

    // document.documentElement.style.setProperty('--color', `rgba(${pageProps.data?.menuData?.color?.rgb.r},${pageProps.data?.menuData?.color?.rgb.g}, ${pageProps.data?.menuData?.color?.rgb.b}, ${pageProps.data?.menuData?.color?.rgb.a})`);
    document.documentElement.style.setProperty('--color', `black`);

    document.documentElement.style.setProperty('--secondary-color', `rgba(${pageProps.data?.menuData?.secondaryColor?.rgb.r},${pageProps.data?.menuData?.secondaryColor?.rgb.g}, ${pageProps.data?.menuData?.secondaryColor?.rgb.b}, ${pageProps.data?.menuData?.secondaryColor?.rgb.a})`);

    document.documentElement.style.setProperty('--ternary-color', `rgba(${pageProps.data?.menuData?.ternaryColor?.rgb.r},${pageProps.data?.menuData?.ternaryColor?.rgb.g}, ${pageProps.data?.menuData?.ternaryColor?.rgb.b}, ${pageProps.data?.menuData?.ternaryColor?.rgb.a})`);

  },[])

  return (
    <>
      <Header data={pageProps.data?.menuData} />
      <CookieConsent
        buttonText={pageProps.data?.menuData?.cookieaccept}
        declineButtonText={pageProps.data?.menuData?.cookierefuse}
        enableDeclineButton
        cookieName={"ContrechampsCHCookieConsent"}
        onAccept={() => {
          // gtag('consent', 'update', {
          //   'analytics_storage': 'granted'
          // });
        }}
        onDecline={() => {}}
        >
        <Body content={pageProps.data?.menuData?.cookietext} />
      </CookieConsent>
      <RouterScrollProvider>     
        <Component {...pageProps} />
      </RouterScrollProvider> 
      <Footer data={pageProps.data?.footerData}/>
    </>
  )
}

export default MyApp
