import { useEffect } from 'react'
import Alert from '../components/alert'
import Meta from '../components/meta'

import { useRouterScroll } from '@moxy/next-router-scroll';

export default function Layout({ preview, children }) {
  const { updateScroll } = useRouterScroll();

  useEffect(() => {
    // setTimeout(() => {
    //   if(window.location.hash) {
    //     let hashElement = document.querySelector(window.location.hash)

    //     if(hashElement) {
    //         // window.scrollTo(0, 0);
    //         // window.scrollTo({left: 0, top: hashElement.getBoundingClientRect().top - 100})
    //         updateScroll();
    //         // history.replaceState(null, null, ' ');
    //         // history.replaceState("", "", location.pathname)
    //         // history.pushState("", document.title, window.location.pathname);

    //     }

    //     } else {
    //       updateScroll();
    //     }
    // }, 0)
    updateScroll();
  }, []);

  return (
    <>
      <Meta />
      <div className="min-h-screen layout">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
    </>
  )
}
