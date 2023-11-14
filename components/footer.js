import Link from './link'
import styled from "styled-components"
import Body from "./body"

import EmailSubscribe from "./email-subscribe"

let Container = styled.footer`
  position: relative;
  display: flex;
  padding: 20px;
  margin-top: -1px;

  p {
   margin: 0;
  }

  > div:not(:last-child) {
    margin-right: 50px !important;
  }

  @media(max-width: 1330px) {
    flex-direction: column;

    > div {
      margin-right: 0px !important;
    }
  }
`

let List = styled.ul`
  display: flex;
  flex-direction: row;
`

let ListItem = styled.li`
`

const Col = styled.div`
  * {
    font-size: 1rem;
  }

  @media(max-width: 1330px) {
    margin-bottom: 25px;
  }
`


let Socials = styled.div`
  font-family: "Social Media Circled";
  font-size: 1.5em;

  ${ListItem} {
    margin-left: 5px;
  }

  @media(max-width: 767px) {
    ${ListItem} {
      margin-left: 0;
      margin-right: 5px;
    }
  }
`

let Newsletter = styled.div`
  margin-left: auto;
  flex-grow: 1;

  @media(max-width: 1330px) {
    margin-left: 0;
  }
`




export default function Header({ data }) {

  if(data === undefined) return null;

  return (
    <Container className="border-top">
      <Col><Body content={data?.textFieldOne} /></Col>
      <Col><Body content={data?.textFieldTwo} /></Col>
      <Col><Body content={data?.textFieldThree} /></Col>
      <Socials>
        <List>
          {data?.socialItems.map(item => (
            <ListItem><Link href={item.url}>{item.label}</Link></ListItem>
          ))}
        </List>
      </Socials>        
      <Newsletter>
        <EmailSubscribe data={data} />
      </Newsletter>
    </Container>
  )
}
