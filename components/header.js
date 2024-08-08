import { useRouter } from "next/router"
import { useState } from "react"
import Link from './link'
import InclusiviteIcon from './inclusivite-icon'
import LocaleLink from "./locale-link"
import styled from "styled-components"

let Container = styled.header`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  z-index: 2;
  top: 0;


  max-width: 1800px;

  > .h4 {
    z-index: 2;
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

@media(max-width: 1060px) {
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
  justify-content: flex-start;

  @media(min-width: 1061px) {
    align-items: center;
  }

  @media(min-width: 768px) and (max-width: 1300px) {
    // .h4 {
    //   font-size: 1rem !important;
    // }
  }
`

let ListItem = styled.li`
  &&:last-child {
      // margin-left: auto;
      // margin-right: 0;
  }
`

let Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  top: 0;
  left: 0;
  width: 100%;
  flex-basis: 70%;
  // max-width: 1100px;

  > ul:nth-child(1) > li {
    margin-right: 3rem;
  }
  

  ${ListItem} {
    margin-left: 0;
  }

  @media(max-width: 1060px) {
    display: none;
    position: absolute;
    flex-direction: column;
    padding: 75px 20px 20px 20px;
    background: white;

    ${ListItem} {
      margin-left: 0px;
      margin-bottom: 10px;
    }

    > ul {
      flex-direction: column;
    }

    &.nav--open {
      display: flex;
    }
  }

  @media(max-width: 1230px) {
    flex-basis: 80%;
  }
`


let LanguageSwitch = styled.div`
  margin-left: 80px;
  width: fit-content;

  ${ListItem} {
    margin-left: 15px;
  }


  @media(max-width: 1060px) {
    margin-left: 0;
    margin-top: 20px;

    ${ListItem} {
      margin-left: 0;
      margin-right: 10px;
    }
  }

  // li:last-child {
  //   margin-left: 25px;
  // }
`





export default function Header({ data }) {
  let [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  if(data === undefined) return null;


  return (
    <Container className={menuOpen ? "nav--open" : ""}>
      <div className="p" 
        onClick={() => {
          setMenuOpen(false);
          sessionStorage.setItem('contrechampsAcceptedSound', "true");
          }}>
          <Link href={`/${router.asPath.split("/")[1]}`}>Contrechamps</Link>
      </div>
      <div class="nav-mobile-burger" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Menu className={menuOpen ? "nav--open" : ""}>
        <List>
          {
          data?.menuItems.map((item, index) => {
            // let isLast = index === data.menuItems.length - 1 ? true : false
            let isLast = false
            return <ListItem key={item._id}  onClick={() => setMenuOpen(false)} ><div className="p"><Link href={item.url} isMenu={true} isLast={isLast}>{item.label}</Link></div></ListItem>
          })
          }
        </List>
        <LanguageSwitch>
          <List>
            <ListItem><div className="p"><LocaleLink href="/fr">Fr</LocaleLink></div></ListItem>
            <ListItem><div className="p"><LocaleLink href="/en_gb">En</LocaleLink></div></ListItem>
            {/* <ListItem>
              <Link href={`/${router.asPath.split("/")[1]}/inclusivite/test`}>
                <InclusiviteIcon />            
              </Link>
            </ListItem>             */}
          </List> 
        </LanguageSwitch>
      </Menu>
    </Container>
  )
}
