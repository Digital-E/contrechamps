import { useEffect } from 'react'
import Alert from '../components/alert'
import Meta from '../components/meta'

import { useRouterScroll } from '@moxy/next-router-scroll';

export default function Layout({ preview, children }) {
  const { updateScroll } = useRouterScroll();

  useEffect(() => {
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
