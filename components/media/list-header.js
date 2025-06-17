import styled from "styled-components"
import Link from "../link"

const Container = styled.div`
`

let Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0 20px;
    margin-top: -1px;

    > span {
      font-size: 5rem;
      line-height: 1.2;
    }

    @media(min-width: 768px) {
        padding: 0 20px;

        > span {
            font-size: 6rem;
            margin: 0;
            line-height: 1.2;
        }
    }

    > a {
      margin-left: 1.5rem;
      // margin-top: 1rem;
      margin-top: 0.2rem;
    }

    @media(max-width: 989px) {
      // flex-direction: column;
      // align-items: flex-start;
      justify-content: space-between;

      > a {
        margin-left: 0rem;
        margin-top: 0rem;
        // margin-bottom: 1rem;
        margin-bottom: 0;
      }
    }
`





export default function ListHeader({ data, isExpandable, href }) {
  return (
    <Container>
      <Header className=""><span className="h1 border-top">{data.title}</span>{isExpandable && <Link href={href} isLast={true}>Voir tout</Link>}</Header>
    </Container>
  )
}
