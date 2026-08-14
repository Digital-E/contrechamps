import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import DateComponent from '../date-component'
import styled from "styled-components"
import Body from "../body"
import Button from "../button"
import InclusiviteIcon from '../inclusivite-icon'
import Link from '../link'

import Orb from "../home/orb"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  @media(max-width: 990px) {
    flex-direction: column;
  }

`


const ColRight = styled.div`
  flex-basis: 100%;

  @media(max-width: 990px) {
    flex-basis: 100%;
  }
`

const Title = styled.h1`
  line-height: 1;
  width: 80%;
`

const Subtitle = styled.p`
  font-family: "Barlow Condensed Medium";
  font-size: 2rem;
  margin-top: 8px;
  margin-bottom: 0;
`

const Information = styled.div`
  display: flex;
  width: 100%;

  @media(max-width: 990px) {
    flex-wrap: wrap;
  }
`

const Date = styled.div`
  flex-basis: 30%;
  line-height: 1.2;
  font-size: 1.5em;

  * {
    margin: 0;
  }

  @media(max-width: 990px) {
  }
`

const DateInner = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 20px;

  > p {
    display: flex;
    align-items: center;
  }

  // > p > time:nth-child(1) {
  //   font-family: "Barlow Condensed Bold";
  //   font-size: 1.5em;
  // }
 
  // > p > p:nth-child(2) {
  //   font-family: "Barlow Condensed Light";
  //   font-size: 1.5em;
  // }

  // > p > time:nth-child(3), > p > time:nth-child(4) {
  //   font-family: "Barlow Condensed Regular";
  //   font-size: 1.5em;
  // }

    .datetime-left time, .datetime-left {
      font-family: "Barlow Condensed Bold";
      font-size: 1.8rem;
    }   

    p {
      font-size: 1.8rem;
    }

    .datetime-right time {
      font-family: "Barlow Condensed Regular";
      font-size: 1.8rem;
    }  
      
    > p > p:nth-child(2) {
      font-family: "Barlow Condensed Light";
      font-size: 1.8rem;
    } 
`

const TicketLinks = styled.div`
    margin-top: 30px;

    > div {
      margin-bottom: 10px;
    }

    a {
      display: inline-flex;
      align-items: center;
      min-width: 250px;
      justify-content: center;
      background: black;
      color: white !important;
      border: 1px solid black;
      padding: 0 20px;
      height: 40px;
      font-family: "Barlow Condensed Medium";
      font-size: 1.1rem;
      white-space: nowrap;
      cursor: pointer;
      margin: 0;
      text-decoration: none;
    }

    a:hover {
      background: white !important;
      color: black !important;
    }

    @media(max-width: 989px) {
      margin-bottom: 20px;
    }
`
 
const InclusiviteIconContainer = styled.div`
  margin-top: 18px;
  margin-left: 15px;

  svg {
    width: 20px;
  }
`




export default function EventHeader({ data }) {
  const router = useRouter();

  return (
    <Container>
      <ColRight>
        <Date>
          {data.occurences?.map((item, i) =>
            <DateInner key={i}>
              <DateComponent data={item} eventPage={true} />
            </DateInner>
          )}
        </Date>
        <Title>
          {
            data.pageTitle === null || data.pageTitle === undefined ?
            data.title
            :
            <Body content={data.pageTitle} />
          }
        </Title>
        {data.subtitle && <Subtitle>{data.subtitle}</Subtitle>}
        <Information className="">
          {
            data.inclusivite === true &&
            <InclusiviteIconContainer>
              <Link href={`/${router.asPath.split("/")[1]}/inclusivite/test`}>
                <InclusiviteIcon />
              </Link>
            </InclusiviteIconContainer>
          }
        </Information>
        <TicketLinks>
          <div>
            {data.ticketLink && <Button url={data.ticketLink} label={data.ticketLinkLabel} />}
          </div>
          <div>
            {data.ticketLinkTwo && <Button url={data.ticketLinkTwo} label={data.ticketLinkLabelTwo} />}
          </div>
        </TicketLinks>
      </ColRight>
    </Container>
  )
}
