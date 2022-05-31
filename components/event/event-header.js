import DateComponent from '../date-component'
import styled from "styled-components"
import Body from "../body"
import Button from "../button"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`

const ColLeft = styled.div`
  flex-basis: 30%;

  @media(max-width: 990px) {
    flex-basis: 0;
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

  * {
    margin: 0;
  }

  @media(max-width: 990px) {
    flex-basis: 50%;
    margin-bottom: 50px;
  }

  > div:not(:last-child)::after {
    position: absolute;
    bottom: -10px;
    left: 0;
    content: "";
    height: 1px;
    width: 20px;
    background-color: black;
  }
`

const Location = styled.div`
  flex-grow: 1;

  // * {
  //   font-size: 1.8em;
  //   margin: 0;
  //   line-height: 1.2;
  // }

  @media(max-width: 990px) {
    flex-basis: 50%;
  }
`

const DateInner = styled.div`
  position: relative;
  margin-bottom: 20px;
`





export default function EventHeader({ data }) {

  return (
    <Container>
      <ColLeft></ColLeft>
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
