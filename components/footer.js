import Link from './link'
import styled from "styled-components"
import Body from "./body"

import EmailSubscribe from "./email-subscribe"

let Container = styled.footer`
  position: relative;
  display: flex;
  padding: 20px;
  margin-top: -4px;

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

  li:last-child svg {
    fill: var(--ternary-color);
  }
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

  ${ListItem}:hover svg {
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
    </Container>
  )
}
