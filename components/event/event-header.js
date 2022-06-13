import DateComponent from '../date-component'
import styled from "styled-components"
import Body from "../body"
import Button from "../button"

import Orb from "../home/orb"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  @media(max-width: 990px) {
    flex-direction: column;
  }
`

const ColLeft = styled.div`
  display: flex;
  flex-basis: 30%;
  height: ${props => props.hasVideo ? "18vw" : "auto"};

  > div {
    flex-basis: 70%;
  }

  > div > div:nth-child(3) {
    bottom: -1vw;
    padding: 0;
  }

  @media (max-width: 1199px) {
    > div {
      width: auto !important;
      height: auto !important;
      top: 4vw;
    }
  }


  @media(max-width: 990px) {
    flex-basis: auto;
    height: ${props => props.hasVideo ? "60vw" : "auto"};

    > div {
      top: -10vw;
    }

    > div > div:nth-child(2) {
      position: relative;
      left: -13vw;
    }

    > div > video {
      left: 30%
    }
  }
`

const ColRight = styled.div`
  flex-basis: 70%;

  @media(max-width: 990px) {
    flex-basis: 100%;
  }
`

const Title = styled.h1`
  line-height: 1;
  width: 80%;
`

const Information = styled.div`
  display: flex;
  width: 100%;
  margin-top: 50px;

  @media(max-width: 990px) {
    flex-wrap: wrap;
  }
`

const Date = styled.div`
  flex-basis: 30%;
  line-height: 1.2;
  font-size: 1.8em;
  margin-top: 10px;

  * {
    margin: 0;
  }

  @media(max-width: 990px) {
    flex-basis: 50%;
    margin-bottom: 50px;
  }

  // > div:not(:last-child)::after {
  //   position: absolute;
  //   bottom: -10px;
  //   left: 0;
  //   content: "";
  //   height: 1px;
  //   width: 20px;
  //   background-color: black;
  // }
`

const Location = styled.div`
  flex-grow: 1;

  @media(max-width: 990px) {
    flex-basis: 50%;
  }
`

const DateInner = styled.div`
  position: relative;
  margin-bottom: 20px;
`




export default function EventHeader({ data }) {

  console.log(data.videoMp4)

  return (
    <Container>
      <ColLeft hasVideo={data.videoMp4 === null ? false : true}>
        <Orb data={data}/>
      </ColLeft>
      <ColRight>
        <Title>{data.title}</Title>
        <Information>
          <Date className="h4">
            <DateInner>
              <DateComponent data={data} />
            </DateInner>
            {data.occurences?.map(item => 
              <>
                  <DateInner>
                    <DateComponent data={item} />
                  </DateInner>
                </>) }
          </Date>
          <Location>
            <Body content={data.location}/>
          </Location>
          <div>
            {data.ticketLink && <Button url={data.ticketLink} label={data.ticketLinkLabel} />}
          </div>
        </Information>
      </ColRight>
    </Container>
  )
}
