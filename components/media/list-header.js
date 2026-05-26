import styled from "styled-components"
import Link from "../link"

const Container = styled.div`
`

let Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0 40px;

    > span {
      font-size: 2rem;
      line-height: 1.2;
    }

    @media(min-width: 768px) {
        padding: 0 40px;

        > span {
            font-size: 2rem;
            margin: 0;
            line-height: 1.2;
        }
    }

    > a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: black;
      color: white !important;
      border: 1px solid black;
      padding: 0 20px;
      height: 40px;
      font-family: "Barlow Condensed Medium";
      font-size: 1.1rem;
      white-space: nowrap;
      text-decoration: none;
      margin-left: 1.5rem;
    }

    > a:hover {
      background: white !important;
      color: black !important;
    }

    @media(max-width: 767px) {
      padding: 0 20px;
    }

    @media(max-width: 989px) {
      justify-content: space-between;

      > a {
        margin-left: 0rem;
        margin-top: 0rem;
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
