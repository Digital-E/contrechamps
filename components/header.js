import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Link from './link'
import LocaleLink from "./locale-link"
import Logo from "./logo"
import NestedMenu from './nested-menu'
import styled from "styled-components"

let Container = styled.header`
  position: fixed;
  width: 100%;
  z-index: 2;
  top: 0;
  left: 0;
  background: white;
  box-shadow: none;
  transition: box-shadow 0.2s ease;

  &.scrolled {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`

let Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px 40px 10px 40px;
  max-width: 1800px;
  margin: 0 auto;

  > div:nth-child(1) {
    z-index: 1;
    a { color: black !important; }
  }

  > .h4 { z-index: 2; }

  .p {
    margin: 0;
    text-transform: uppercase;
    font-family: "Barlow Condensed SemiBold";
    font-size: 1.2rem;
  }

  .active-link {
    font-family: "Barlow Condensed ExtraBold";
    opacity: 1 !important;
    color: black !important;
  }

  .nav-mobile-burger {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 30px;
    height: 35px;
    z-index: 1;
  }

  @media(max-width: 767px) {
    padding: 10px 20px;
  }

  @media(max-width: 1060px) {
    .nav-mobile-burger { display: flex; }
  }
`

let Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  top: 0;
  left: 0;
  width: 100%;
  flex-basis: 90%;

  @media(max-width: 1230px) {
    flex-basis: 80%;
  }

  @media(max-width: 1060px) {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    justify-content: flex-start;
    padding: 75px 20px 40px 20px;
    background: white;
    height: 100vh;
    height: 100dvh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    &.nav--open { display: flex; }

  }
`

/* ── Desktop flat list ── */
let DesktopList = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;

  > li { margin-right: 2.5rem; }
  > li:last-child { margin-right: 0; }

  p { font-size: 1rem; }

  @media(max-width: 1060px) { display: none; }
`

/* ── Mobile accordion wrapper ── */
let MobileMenuWrapper = styled.div`
  display: none;
  width: 100%;

  @media(max-width: 1060px) { display: block; }
`

let MobileFade = styled.div`
  display: none;

  @media(max-width: 1060px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to bottom, white 50%, transparent);
    z-index: 3;
    pointer-events: none;
  }
`

let LanguageSwitch = styled.div`
  width: fit-content;

  @media(max-width: 1060px) {
    margin-top: 20px;
  }
`


export default function Header({ data }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (data === undefined) return null

  const closeMenu = () => setMenuOpen(false)

  return (
    <Container className={[menuOpen ? "nav--open" : "", scrolled ? "scrolled" : ""].join(" ").trim()}>
      <Inner>
        <div className="p"
          onClick={() => {
            setMenuOpen(false)
            sessionStorage.setItem('contrechampsAcceptedSound', "true")
          }}>
          <Link href={`/${router.asPath.split("/")[1]}`}><Logo height={35} /></Link>
        </div>

        <div class="nav-mobile-burger" onClick={() => setMenuOpen(!menuOpen)}>
          <img src={menuOpen ? "/icons/xmark-solid-full.svg" : "/icons/bars-solid-full.svg"} alt="menu" width={35} height={35} />
        </div>

        <Menu className={menuOpen ? "nav--open" : ""}>
          <MobileFade />

          {/* Desktop: flat list, items with subItems link via item.url */}
          <DesktopList>
            {data?.menuItems.map((item, i) => (
              <li key={item._key || i} onClick={closeMenu}>
                <div className="p">
                  <Link href={item.url} isMenu={true}>{item.label}</Link>
                </div>
              </li>
            ))}
          </DesktopList>

          {/* Mobile: accordion */}
          <MobileMenuWrapper>
            <NestedMenu items={data?.menuItems} onNavigate={closeMenu} />
          </MobileMenuWrapper>

          <LanguageSwitch />
        </Menu>
      </Inner>
    </Container>
  )
}
