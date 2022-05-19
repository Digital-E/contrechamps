import '../styles/index.css'

import Body from "../components/body"
import CookieConsent from "react-cookie-consent"

import Header from '../components/header'
import Footer from '../components/footer'

function MyApp({ Component, pageProps, router }) {

  return (
    <>
      <Header data={pageProps.data?.menuData} />
      <CookieConsent
        buttonText={pageProps.data?.menuData.cookieaccept}
        declineButtonText={pageProps.data?.menuData.cookierefuse}
        enableDeclineButton
        cookieName={"ContrechampsCHCookieConsent"}
        onAccept={() => {
          // gtag('consent', 'update', {
          //   'analytics_storage': 'granted'
          // });
        }}
        onDecline={() => {}}
        >
          <Body content={pageProps.data?.menuData.cookietext} />
      </CookieConsent>      
      <Component {...pageProps} />
      <Footer data={pageProps.data?.footerData}/>
    </>
  )
}

export default MyApp
