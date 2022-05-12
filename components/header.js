import Link from './link'
import LocaleLink from "./locale-link"
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





export default function Header({ data }) {

  if(data === undefined) return null;

  return (
    <Container>
      <div className="h6"><Link href="/">Contrechamps</Link></div>
      <Menu>
        <List>
          {data.menuItems.map(item => <ListItem><div className="h6"><Link href={item.url}>{item.label}</Link></div></ListItem>)}
        </List>
        <LanguageSwitch>
          <List>
            <ListItem><div className="h6"><LocaleLink href="/en_gb">En</LocaleLink></div></ListItem>
            <ListItem><div className="h6"><LocaleLink href="/fr">Fr</LocaleLink></div></ListItem>
          </List> 
        </LanguageSwitch>
      </Menu>
    </Container>
  )
}
