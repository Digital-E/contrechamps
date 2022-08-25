import styled from "styled-components"
import Body from "../body"

const Container = styled.div`
  position: relative;
  display: none;


  h2, h3, h4, h5, h6, p {
    columns: 1;
    column-gap: 40px;
  }

  @media(min-width: 768px) {
    display: block;
    padding: 20px;

    &.border-bottom::after {
      display: none;
    }

    h2, h3, h4, h5, h6, p {
      columns: 2;
    }
  }
`





export default function EventHeader({ data, withBorder }) {

  return (
    <Container className={withBorder ? `border-bottom`: ''}>
        <Body content={data.text}/>
    </Container>
  )
}
