import styled from "styled-components"

import Slices from "../l-ensemble/l-ensemble-slices"

import Body from "../body"

import Header from "./event-header"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 40px 20px 40px;
  width: 100%;

  @media(max-width: 1200px) {
    flex-wrap: wrap;
  }

  @media(max-width: 990px) {
    flex-wrap: wrap;
    padding-left: 20px;
    padding-right: 20px;
  }
`

const ColLeft = styled.div`
  flex-basis: 20%;
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

  @media(max-width: 990px) {
    flex-basis: 100%;
    margin-bottom: 50px;
    order: 2;
  }
`

const ColMiddle = styled.div`
  flex-basis: 40%;
  padding-right: 80px;

  @media(max-width: 1200px) {
    flex: 1;
    padding-right: 0;
  }

  @media(max-width: 990px) {
    flex-basis: 100%;
    order: 1;
    padding: 0;
  }
`

const ColRight = styled.div`
  flex-basis: 40%;

  @media(max-width: 1200px) {
    flex-basis: 100%;
  }

  @media(max-width: 990px) {
    flex-basis: 100%;
    order: 3;
  }

  @media(max-width: 767px) {
    width: calc(100vw - 40px);
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
      <ColMiddle>
        <Header data={data} />
        <Slices data={data.slices} />
      </ColMiddle>
      <ColRight>
        <Slices data={data.slicesRight} />
      </ColRight>
    </Container>
  )
}
