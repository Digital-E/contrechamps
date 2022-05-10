import Link from './link'
import styled from "styled-components"

import EmailSubscribe from "./email-subscribe"

let Container = styled.footer`
  display: flex;
  padding: 20px;

  .p {
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


export default function Header() {
  return (
    <Container>
      <div className="p">Contrechamps</div>
      <div className="p">Ensemble Genevois <br/> Contemporain <br/> et de Création</div>
      <div className="p">8 rue de la Coulouvrenière <br/> 1204 Genève <br/> +41 22 329 24 00</div>
      <Socials>
        <List>
          <ListItem><Link href="/la-saison">Q</Link></ListItem>
          <ListItem><Link href="/l-ensemble">E</Link></ListItem>
          <ListItem><Link href="/medias">D</Link></ListItem>
          <ListItem><Link href="/editions">C</Link></ListItem>
          <ListItem><Link href="/billeterie">M</Link></ListItem>
        </List>
      </Socials>        
      <Newsletter>
        <EmailSubscribe data={""} />
      </Newsletter>
    </Container>
  )
}
