import { useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"

import Slices from "./l-ensemble-slices"
import NestedMenu from "../nested-menu"

export const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 40% 40%;
  grid-template-rows: auto 1fr;
  padding: 0 40px;
  margin-top: 100px;

  @media(max-width: 1200px) {
    grid-template-columns: 20% 1fr;
  }

  @media(max-width: 1060px) {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const ColLeft = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;
  padding-right: 40px;

  > div *:nth-child(1) {
    margin-top: 0px !important;
  }

  @media(max-width: 1200px) {
    grid-row: 1 / span 4;
  }

  @media(max-width: 1060px) {
    order: 4;
    margin-bottom: 50px;
    padding-right: 0;
  }
`

export const MenuPin = styled.div`
  @media(min-width: 1060px) {
    position: sticky;
    top: 110px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    overscroll-behavior: contain;
  }
`

export const ColMiddleFirst = styled.div`
  grid-column: 2;
  grid-row: 1;
  padding-right: 80px;

  @media(max-width: 1200px) {
    padding-right: 0;
  }

  @media(max-width: 1060px) {
    order: 1;
    padding: 0;
  }
`

export const ColMiddleRest = styled.div`
  grid-column: 2;
  grid-row: 2;
  padding-right: 80px;

  @media(max-width: 1200px) {
    grid-row: 3;
    padding-right: 0;
  }

  @media(max-width: 1060px) {
    order: 3;
    padding: 0;
  }
`

export const ColRight = styled.div`
  grid-column: 3;
  grid-row: 1 / span 2;

  @media(max-width: 1200px) {
    grid-column: 2;
    grid-row: 2;
  }

  @media(max-width: 1060px) {
    order: 2;
    overflow: hidden;
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

  const firstSlice = data?.slices?.slice(0, 1)
  const restSlices = data?.slices?.slice(1)

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
      <ColMiddleFirst>
        <Slices data={firstSlice} />
      </ColMiddleFirst>
      <ColRight>
        <Slices data={data?.slicesRight} />
      </ColRight>
      <ColMiddleRest>
        <Slices data={restSlices} />
      </ColMiddleRest>
    </Container>
  )
}
