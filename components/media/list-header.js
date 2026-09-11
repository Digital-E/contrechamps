import styled from "styled-components"
import Link from "../link"

const Container = styled.div`
`

let Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    > div {
      font-family: "Quatorze CC Bold";
      font-weight: bold;
      font-size: 2rem;
      line-height: 1.2;
    }

    @media(min-width: 768px) {
        padding: 20px 40px;

        > div {
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
      padding: 20px 20px;

      > div {
      }
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
  let label = data._lang === "fr" ? "Voir tout" : "See all"

  return (
    <Container>
      <Header className=""><div className="h2">{data.title}</div>{isExpandable && <Link href={href} isLast={true}>{label}</Link>}</Header>
    </Container>
  )
}
