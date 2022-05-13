import styled from "styled-components"
import Body from "../body"

const Container = styled.div`
  font-size: 13rem;
  line-height: 1.2;
  margin: 0 auto;
  width: fit-content;
  text-transform: capitalize;
`





export default function ListHeader({ data }) {
  return (
    <Container>
      {data.title}
    </Container>
  )
}
