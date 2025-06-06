import styled from "styled-components"
import Body from "../body"

const Container = styled.div`
  position: relative;
  padding: 20px;
  // display: ${props => props.hideOnMobile ? "none" : "block"};
  display: none;


  h2, h3, h4, h5, h6, p {
    columns: 1;
    column-gap: 40px;
  }

  @media(min-width: 768px) {
    display: block;

    // &.border-bottom::after {
    //   display: none;
    // }

    h2, h3, h4, h5, h6, p {
      columns: 2;
    }
  }
`





export default function EventHeader({ data, withBorder, hideOnMobile }) {

  return (
    <Container className={withBorder ? `border-bottom`: ''} hideOnMobile={hideOnMobile}>
        <Body content={data.text}/>
    </Container>
  )
}
