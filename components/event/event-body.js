import { useMemo } from "react"
import styled from "styled-components"

import Slices from "../l-ensemble/l-ensemble-slices"

import Body from "../body"

import Header from "./event-header"
import LightboxProvider from "./event-lightbox"

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 40% 40%;
  grid-template-rows: auto 1fr;
  padding: 50px 40px 20px 40px;
  width: 100%;

  @media(max-width: 1200px) {
    grid-template-columns: 20% 1fr;
  }

  @media(max-width: 990px) {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
  }
`

const ColLeft = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;
  padding-right: 40px;

  * {
    font-size: 1rem
  }

  p {
    font-family: "Barlow Condensed Regular";
  }

  strong {
    font-family: "Barlow Condensed SemiBold";
  }

  @media(max-width: 1200px) {
    grid-row: 1 / span 4;
  }

  @media(max-width: 990px) {
    order: 4;
    margin-bottom: 50px;
    padding-right: 0;
  }
`

const ColMiddleHeader = styled.div`
  grid-column: 2;
  grid-row: 1;
  padding-right: 80px;

  @media(max-width: 1200px) {
    padding-right: 0;
  }

  @media(max-width: 990px) {
    order: 1;
    padding: 0;
  }
`

const ColMiddleSlices = styled.div`
  grid-column: 2;
  grid-row: 2;
  padding-right: 80px;

  @media(max-width: 1200px) {
    grid-row: 3;
    padding-right: 0;
  }

  @media(max-width: 990px) {
    order: 3;
    padding: 0;
  }
`

const ColRight = styled.div`
  grid-column: 3;
  grid-row: 1 / span 2;

  @media(max-width: 1200px) {
    grid-column: 2;
    grid-row: 2;
  }

  @media(max-width: 990px) {
    order: 2;
    overflow: hidden;
  }
`

const Location = styled.div`
  flex-grow: 1;

  @media(max-width: 990px) {
    flex-basis: 50%;
  }
`

// Pulls every image out of a slices array, in document order, including
// images nested inside Grid slices — so the lightbox can navigate across
// all of them regardless of where they sit in the content stream.
function flattenImages(slices) {
  let images = []

  // Sanity returns null (not undefined) for an unset array field, which a
  // default parameter doesn't catch — guard explicitly instead.
  let items = slices || []

  items.forEach((slice) => {
    if(slice._type === 'image') {
      images.push(slice)
    } else if(slice._type === 'Grid') {
      slice.gridItems?.forEach((item) => {
        if(item._type === 'image') images.push(item)
      })
    }
  })

  return images
}

export default function EventBody({ data }) {

  let lightboxImages = useMemo(() => [
    ...flattenImages(data.slicesRight),
    ...flattenImages(data.slices),
  ], [data])

  return (
    <LightboxProvider images={lightboxImages}>
      <Container>
        <ColLeft>
          {data.location && (
            <Location>
              <img src="/icons/location-dot-solid-full.svg" alt="" width={20} />
              <Body content={data.location}/>
            </Location>
          )}
          <Body content={data.information} />
        </ColLeft>
        <ColMiddleHeader>
          <Header data={data} />
        </ColMiddleHeader>
        <ColRight>
          <Slices data={data.slicesRight} />
        </ColRight>
        <ColMiddleSlices>
          <Slices data={data.slices} />
        </ColMiddleSlices>
      </Container>
    </LightboxProvider>
  )
}
