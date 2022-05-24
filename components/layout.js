import Alert from '../components/alert'
import Meta from '../components/meta'

export default function Layout({ preview, children }) {
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
