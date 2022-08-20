import styled from "styled-components"
import Link from "../link"

const Container = styled.div`
`

let Header = styled.div`
    display: flex;
    align-items: center;
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
      margin-top: 1rem;
    }
`





export default function ListHeader({ data, isExpandable, href }) {
  return (
    <Container>
      <Header className=""><span className="h1 border-top">{data.title}</span>{isExpandable && <Link href={href} isLast={true}>Voir tout</Link>}</Header>
    </Container>
  )
}
