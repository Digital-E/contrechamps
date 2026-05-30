import { useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"

import Slices from "./l-ensemble-slices"
import NestedMenu from "../nested-menu"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  margin-top: 100px;

  @media(max-width: 1200px) {
    flex-wrap: wrap;
  }

  @media(max-width: 767px) {
    flex-wrap: wrap;
    margin-top: 20px;
    padding: 0 20px;
  }
`

const ColLeft = styled.div`
  flex-basis: 20%;
  padding-right: 40px;

  > div *:nth-child(1) {
    margin-top: 0px !important;
  }

  @media(max-width: 767px) {
    flex-basis: 100%;
    margin-bottom: 50px;
    order: 4;
  }
`

const MenuPin = styled.div`
  @media(min-width: 990px) {
    position: sticky;
    top: 110px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    overscroll-behavior: contain;
  }
`

const ColMiddle = styled.div`
  flex-basis: 40%;
  padding-right: 80px;

  @media(max-width: 1200px) {
    flex: 1;
    padding-right: 0;
  }

  @media(max-width: 767px) {
    flex-basis: 100%;
    order: 1;
    padding: 0;
  }
`

const ColRight = styled.div`
  flex-basis: 40%;

  @media(max-width: 1200px) {
    flex-basis: 80%;
    margin-left: 20%;
  }

  @media(max-width: 767px) {
    flex-basis: 100%;
    margin-left: 0;
    width: calc(100vw - 40px);
    overflow: hidden;
    order: 3;
  }
`

export default function Component({ data, menuData, mainMenuData, slug }) {
  const router = useRouter()

  useEffect(() => {
    const onRouteComplete = () => setTimeout(() => window.scrollTo(0, 0), 0)
    onRouteComplete()
    router.events.on('routeChangeComplete', onRouteComplete)
    return () => router.events.off('routeChangeComplete', onRouteComplete)
  }, [])

  return (
    <Container className={((slug === "infos-pratiques") || (slug === "l-equipe") || (slug === "soutiens-and-partenaires") || (slug === "billetterie-et-abonnement") || (slug === "le-comite") || (slug === "devenir-membre")) && ""}>
      <ColLeft>
        <MenuPin>
          <NestedMenu noUppercaseNested items={(() => {
            const nested = mainMenuData?.menuItems?.filter(item => item.subItems?.length > 0) ?? []
            return nested.length > 0 ? [...nested[0].subItems, ...nested.slice(1)] : []
          })()} />
        </MenuPin>
      </ColLeft>
      <ColMiddle>
        <Slices data={data?.slices} />
      </ColMiddle>
      <ColRight>
        <Slices data={data?.slicesRight} />
      </ColRight>
    </Container>
  )
}
