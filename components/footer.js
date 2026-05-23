import { useRouter } from "next/router"
import Link from './link'
import styled from "styled-components"
import Body from "./body"
import EmailSubscribe from "./email-subscribe"

let Container = styled.footer`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 40px 40px;
  background: white;
  z-index: 1;
  gap: 40px;

  p {
    margin: 0;
  }

  @media(max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: 20px;
  }
`

const Col = styled.div`
  * strong {
    font-family: "Barlow Condensed SemiBold";
  }

  &:nth-child(1) > * {
    font-family: "Barlow Condensed Bold";
    font-size: 1.1rem;
  }

  &:nth-child(2) > * {
    font-family: "Barlow Condensed Regular";
    font-size: 1.1rem;
  }

  &:nth-child(3) > * {
    font-family: "Barlow Condensed Regular";
    font-size: 1.1rem;
  }

  p { margin: 0; }
`

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`

let Socials = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  li {
    font-family: "Social Media Circled";
    font-size: 1.6rem;
    line-height: 1;
    list-style: none;
  }

  li:hover {
    opacity: 0.6;
  }

  li:last-child svg {
    fill: black;
  }

  li:last-child:hover {
    opacity: 0.6;
  }
`

let Newsletter = styled.div`
  flex-shrink: 0;

  @media(max-width: 900px) {
    width: 100%;
  }
`

const RightGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  flex-shrink: 0;

  @media(max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
  }
`

export default function Footer({ data }) {
  if (data === undefined) return null

  return (
    <Container>
      <InfoGroup>
        <Col><Body content={data?.textFieldOne} /></Col>
        <Col><Body content={data?.textFieldTwo} /></Col>
        <Col><Body content={data?.textFieldThree} /></Col>
      </InfoGroup>
      <RightGroup>
        <Socials>
          <ul style={{ display: 'flex', gap: '10px', margin: 0, padding: 0 }}>
            {data?.socialItems.map((item, index) => {
              if (index === data.socialItems.length - 1) {
                return (
                  <li key={index}>
                    <Link href={item.url}>
                      <svg version="1.1" width="26px" height="26px" viewBox="0 0 97.75 97.75">
                        <g>
                          <path d="M48.875,0C21.882,0,0,21.882,0,48.875S21.882,97.75,48.875,97.75S97.75,75.868,97.75,48.875S75.868,0,48.875,0z M64.835,70.857H12.593l20.32-43.965h52.244L64.835,70.857z"/>
                        </g>
                      </svg>
                    </Link>
                  </li>
                )
              }
              return (
                <li key={index}><Link href={item.url}>{item.label}</Link></li>
              )
            })}
          </ul>
        </Socials>
        <Newsletter>
          <EmailSubscribe data={data} />
        </Newsletter>
      </RightGroup>
    </Container>
  )
}
