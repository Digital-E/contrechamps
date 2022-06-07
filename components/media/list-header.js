import styled from "styled-components"

const Container = styled.div`
`

let Header = styled.div`
    position: relative;
    padding: 20px;

    > span {
        font-size: 7vw;
    }

    @media(min-width: 768px) {
        padding: 0 20px;

        > span {
            font-size: 7vw;
            margin: 0;
            line-height: 1.2;
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
