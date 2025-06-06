import styled from "styled-components"

import Slices from "../l-ensemble/l-ensemble-slices"

import Body from "../body"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100%;

  @media(max-width: 990px) {
    flex-wrap: wrap;
  }
`

const ColLeft = styled.div`
  flex-basis: 30%;
  padding-right: 20px;

  p {
    font-family: "Courier";
  }

  @media(max-width: 990px) {
    flex-basis: 100%;
    margin-top: 50px;
  }
`

const ColRight = styled.div`
  flex-basis: 70%;

  @media(max-width: 990px) {
    flex-basis: 100%;
    order: -1;
  }
`

const SliceWrapper = styled.div`
    margin: 30px 0;

    &.double-col * {
        columns: 2;
        column-gap: 50px;
    }
`


export default function EventHeader({ data }) {

  return (
    <Container>
      <ColLeft>
        <Body content={data.information} />
      </ColLeft>
      <ColRight>
        <Slices data={data.slices} />
      </ColRight>
    </Container>
  )
}
