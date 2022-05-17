import styled from "styled-components"
import Body from "../body"

const Container = styled.div`
  position: relative;
  padding: 20px;


  h2, h3, h4, h5, h6, p {
    columns: 2;
    column-gap: 40px;
  }

  @media(min-width: 768px) {
    &.border-bottom::after {
      display: none;
    }
  }
`





export default function EventHeader({ data }) {

  return (
    <Container className="border-bottom">
        <Body content={data.text}/>
    </Container>
  )
}
