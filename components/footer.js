import Link from './link'
import styled from "styled-components"
import Body from "./body"

import EmailSubscribe from "./email-subscribe"

let Container = styled.footer`
  position: relative;
  display: flex;
  padding: 20px;

  p {
   margin: 0;
  }

  > div {
    margin-right: 50px !important;
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
`


let Socials = styled.div`
  font-family: "Social Media Circled";
  font-size: 2em;

  ${ListItem} {
    margin-left: 5px;
  }
`

let Newsletter = styled.div`
  margin-left: auto !important;
  flex-grow: 1;
`




export default function Header({ data }) {

  if(data === undefined) return null;

  return (
    <Container className="border-top">
      <Col><Body content={data.textFieldOne} /></Col>
      <Col><Body content={data.textFieldTwo} /></Col>
      <Col><Body content={data.textFieldThree} /></Col>
      <Socials>
        <List>
          {data.socialItems.map(item => (
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
