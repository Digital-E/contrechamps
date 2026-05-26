import styled from "styled-components"

import Slices from "../l-ensemble/l-ensemble-slices"

import Body from "../body"

import Header from "./event-header"

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

export default function EventBody({ data }) {

  return (
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
  )
}
