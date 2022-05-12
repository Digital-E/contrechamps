import Link from './link'
import styled from "styled-components"
import Body from "./post-body"

import EmailSubscribe from "./email-subscribe"

let Container = styled.footer`
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
    <Container>
      <div><Body content={data.textFieldOne} /></div>
      <div><Body content={data.textFieldTwo} /></div>
      <div><Body content={data.textFieldThree} /></div>
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
