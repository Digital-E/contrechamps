import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Alert from '../components/alert'
import Meta from '../components/meta'

import { useRouterScroll } from '@moxy/next-router-scroll';

export default function Layout({ preview, children }) {
  const { updateScroll } = useRouterScroll();
  let router = useRouter()

  useEffect(() => {

    updateScroll();

    setTimeout(() => {
      if(window.location.hash !== '') {
            let headerHeight = document.querySelector('header').getBoundingClientRect().height
            let filterHeight = document.querySelector('.season-filters').getBoundingClientRect().height
            let fullHeight = headerHeight + filterHeight

            window.scroll(0, document.documentElement.scrollTop - fullHeight);
            router.replace('/fr/saison', undefined, {shallow: true, scroll: false})
      }
    }, 10)
  }, []);


  return (
    <>
      <Meta />
      {/* min-h-screen */}
      <div className="layout">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
    </>
  )
}
