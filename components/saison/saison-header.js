import styled from "styled-components"
import Body from "../body"

const Container = styled.div`
  padding: 20px;

  h1 {
    line-height: 2
  }

  h2, h3, h4, h5, h6, p {
    columns: 2;
    column-gap: 40px;
  }
`





export default function EventHeader({ data }) {

  return (
    <Container>
        <Body content={data.text}/>
    </Container>
  )
}
