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
      // Only handle the month anchors coming from the calendar (e.g. #septembre-2026).
      // Filter selections use "#!tag" hashes and must be left untouched.
      let hash = window.location.hash

      if(hash !== '' && !hash.startsWith('#!')) {
            let seasonFilters = document.querySelector('.season-filters')
            if(!seasonFilters) return

            let headerHeight = document.querySelector('header').getBoundingClientRect().height
            let filterHeight = seasonFilters.getBoundingClientRect().height
            let fullHeight = headerHeight + filterHeight

            window.scroll(0, document.documentElement.scrollTop - fullHeight);

            // Keep the visitor on their current locale instead of forcing /fr.
            let lang = window.location.pathname.split('/')[1] || 'fr'
            router.replace(`/${lang}/saison`, undefined, {shallow: true, scroll: false})
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
