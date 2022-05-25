import { useState } from "react"
import Link from './link'
import LocaleLink from "./locale-link"
import styled from "styled-components"

let Container = styled.header`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 999;
  top: 0;


  max-width: 1800px;

  > .h4 {
    z-index: 2;
  }

  @media(min-width: 768px) and (max-width: 1300px) {
    .h4 {
      font-size: 1rem !important;
    }
  }

  .p {
   margin: 0;
  }

  .nav-mobile-burger {
    display: none;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    width: 30px;
    height: 35px;
    z-index: 1;
}

.nav-mobile-burger > div {
    height: 1px;
    width: 30px;
    background-color: black;
    margin: 3px 0px;
}

&.nav--open .nav-mobile-burger > div:nth-child(1) {
    position: absolute;
    transform: rotateZ(45deg);
    transform-origin: center center;
}

&.nav--open .nav-mobile-burger > div:nth-child(2) {
    position: absolute;
    transform: rotateZ(-45deg);
    transform-origin: center center;
}

&.nav--open .nav-mobile-burger > div:nth-child(3) {
    display: none;
}

@media(max-width: 767px) {
  background: white;
  
  .nav-mobile-burger {
    display: flex;
  }
}

`

let List = styled.ul`
  display: flex;
  flex-direction: row;

  width: 100%;
  display: flex;
  justify-content: space-around;

  @media(min-width: 768px) and (max-width: 1300px) {
    .h4 {
      font-size: 1rem !important;
    }
  }
`

let ListItem = styled.li`
`

let Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  top: 0;
  left: 0;
  width: 100%;
  flex-basis: 70%;
  max-width: 1100px;
  

  ${ListItem} {
    margin-left: 0;
  }

  @media(max-width: 767px) {
    display: none;
    position: absolute;
    flex-direction: column;
    padding: 75px 20px 20px 20px;
    border-bottom: 1px solid black;
    background: white;

    ${ListItem} {
      margin-left: 0px;
    }

    > ul {
      flex-direction: column;
    }

    &.nav--open {
      display: flex;
    }
  }
`


let LanguageSwitch = styled.div`
  margin-left: 80px;
  width: fit-content;

  ${ListItem} {
    margin-left: 15px;
  }


  @media(max-width: 767px) {
    margin-left: 0;
    margin-top: 20px;

    ${ListItem} {
      margin-left: 0;
      margin-right: 10px;
    }
  }
`





export default function Header({ data }) {
  let [menuOpen, setMenuOpen] = useState(false);

  if(data === undefined) return null;


  return (
    <Container className={menuOpen ? "nav--open" : ""}>
      <div className="h4" onClick={() => setMenuOpen(false)}><Link href="/">Contrechamps</Link></div>
      <div class="nav-mobile-burger" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Menu className={menuOpen ? "nav--open" : ""}>
        <List>
          {data.menuItems.map(item => <ListItem key={item._id}  onClick={() => setMenuOpen(false)} ><div className="h4"><Link href={item.url} isMenu={true}>{item.label}</Link></div></ListItem>)}
        </List>
        <LanguageSwitch>
          <List>
            <ListItem><div className="h4"><LocaleLink href="/en_gb">En</LocaleLink></div></ListItem>
            <ListItem><div className="h4"><LocaleLink href="/fr">Fr</LocaleLink></div></ListItem>
          </List> 
        </LanguageSwitch>
      </Menu>
    </Container>
  )
}
