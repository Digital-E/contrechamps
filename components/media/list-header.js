import styled from "styled-components"

const Container = styled.div`
`

let Header = styled.div`
    position: relative;
    padding: 20px;
    text-align: center;

    > span {
        font-size: 12vw;
    }

    @media(min-width: 768px) {
        padding: 0 20px;

        > span {
            font-size: 12vw;
            margin: 0;
            line-height: 1.2;
            text-align: center;
        }
    }
`





export default function ListHeader({ data }) {
  return (
    <Container>
      <Header className=""><span className="h1">{data.title}</span></Header>
    </Container>
  )
}
