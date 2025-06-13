import { useRouter } from "next/router"
import { useState } from "react"
import Link from './link'
import styled from "styled-components"
import Body from "./body"

import EmailSubscribe from "./email-subscribe"

let Container = styled.footer`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: -2px;
  // margin-bottom: 30px;
  background: white;
  z-index: 1;

  p {
   margin: 0;
  }

`

let List = styled.ul`
  display: flex;
  flex-direction: row;

  li:last-child svg {
    // fill: var(--ternary-color);
    fill: rgb(171, 171, 171);
  }

  a {
    color: rgb(171, 171, 171);
  }
`

let ListItem = styled.li`
`

const Col = styled.div`
  // * {
  //   font-size: 1rem;
  // }

  margin-bottom: 25px;
`


let Socials = styled.div`

  li {
    font-family: "Social Media Circled";
    font-size: 1.5em;
    line-height: 1;
  }

  ${ListItem} {
    margin-right: 5px;
  }

  ${ListItem}:hover svg, ${ListItem}:hover {
    opacity: 0.6;
  }

  @media(max-width: 767px) {
    ${ListItem} {
      margin-left: 0;
      margin-right: 5px;
    }
  }
`

let Newsletter = styled.div`
  flex-grow: 1;

  @media(max-width: 1330px) {
    margin-left: 0;
  }
`

let Logo = styled.div`
  width: 80px;
  position: absolute;
  bottom: 30px;
  right: 15px;

  :hover {
    opacity: 0.7;
  }

  @media(max-width: 989px) {
    position: relative;
    margin-top: 30px;
    right: 0;
  }
`



export default function Header({ data }) {
  const router = useRouter();

  if(data === undefined) return null;

  return (
    <Container className="border-top force-courier">
      <Col><Body content={data?.textFieldOne} /></Col>
      <Col><Body content={data?.textFieldTwo} /></Col>
      <Col><Body content={data?.textFieldThree} /></Col>
      <Socials>
        <List>
          {data?.socialItems.map((item, index) => {
          if(index === data.socialItems.length - 1) {
            return (
              <ListItem>
                <Link href={item.url}>
                  <svg version="1.1" id="Capa_1"  width="25px" height="25px" viewBox="0 0 97.75 97.75" xmlSpace="preserve">
                  <g>
                    <path d="M48.875,0C21.882,0,0,21.882,0,48.875S21.882,97.75,48.875,97.75S97.75,75.868,97.75,48.875S75.868,0,48.875,0z
                      M64.835,70.857H12.593l20.32-43.965h52.244L64.835,70.857z"/>
                  </g>
                  </svg>
                </Link>
              </ListItem>
            )
          } else {
            return (
              <ListItem><Link href={item.url}>{item.label}</Link></ListItem>
            )
          }
          })}
        </List>
      </Socials>        
      <Newsletter>
        <EmailSubscribe data={data} />
      </Newsletter>
      <Logo>
        <Link href={`/${router.asPath.split("/")[1]}`}>
          <img src='/images/Contrechamps_Logo.png'/>
        </Link>
      </Logo>      
    </Container>
  )
}
