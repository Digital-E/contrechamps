import DateComponent from '../../date-component'
import styled from "styled-components"
import Body from "../../body"
import Button from "../../button"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 70%;

  margin: 0 auto;

  @media(max-width: 1200px) {
    width: 100%;
  }
`

const ColLeft = styled.div`
  flex-basis: 30%;
`

const ColRight = styled.div`
  flex-basis: 100%;
`

const Title = styled.h1`
  line-height: 1;
  width: 80%;
`

const Information = styled.div`
  display: flex;
  width: 100%;
  margin-top: 50px;
`

const Date = styled.div`
  flex-basis: 30%;
  line-height: 1.2;
  font-size: 1.8em;

  * {
    margin: 0;
  }
`

const Location = styled.div`
  flex-grow: 1;

  * {
    font-size: 1.8em;
    margin: 0;
    line-height: 1.2;
  }
`




export default function EventHeader({ data }) {

  return (
    <Container>
      {/* <ColLeft></ColLeft> */}
      <ColRight>
        <Title>{data.title}</Title>
        <Information>
          {/* <Date className="h4">
            <DateComponent data={data} />
          </Date>
          <Location>
            <Body content={data.location}/>
          </Location> */}
          <div>
            {
                data.ticketLinkLabel ?
                <Button url={data.ticketLink} label={data.ticketLinkLabel} />
                :
                null
            }
          </div>
        </Information>
      </ColRight>
    </Container>
  )
}
