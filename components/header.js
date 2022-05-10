import Link from './link'
import styled from "styled-components"

let Container = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  .p {
   margin: 0;
  }
`

let List = styled.ul`
  display: flex;
  flex-direction: row;
`

let ListItem = styled.li`
`

let Menu = styled.div`
  display: flex;

  ${ListItem} {
    margin-left: 50px;
  }
`


let LanguageSwitch = styled.div`
  margin-left: 50px;

  ${ListItem} {
    margin-left: 5px;
  }
`





export default function Header() {
  return (
    <Container>
      <div className="h6">Contrechamps</div>
      <Menu>
        <List>
          <ListItem><div className="h6"><Link href="/la-saison">Saisons</Link></div></ListItem>
          <ListItem><div className="h6"><Link href="/l-ensemble">L'ensemble</Link></div></ListItem>
          <ListItem><div className="h6"><Link href="/medias">Médias</Link></div></ListItem>
          <ListItem><div className="h6"><Link href="/editions">Editions</Link></div></ListItem>
          <ListItem><div className="h6"><Link href="/billeterie">Billetterie</Link></div></ListItem>
        </List>
        <LanguageSwitch>
          <List>
            <ListItem><div className="h6"><Link href="/la-saison">En</Link></div></ListItem>
            <ListItem><div className="h6"><Link href="/l-ensemble">Fr</Link></div></ListItem>
          </List> 
        </LanguageSwitch>
      </Menu>
    </Container>
  )
}
