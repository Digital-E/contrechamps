import styled from "styled-components"
import Body from "../body"

const Container = styled.div`
  position relative;
  font-size: 13rem;
  line-height: 1.2;
  text-transform: capitalize;

  > span {
    display: block;
    margin: 0 auto;
    width: fit-content;
  }
`





export default function ListHeader({ data }) {
  return (
    <Container>
      <span>{data.title}</span>
    </Container>
  )
}
