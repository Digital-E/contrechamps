import Link from "./link"
import styled from "styled-components"

const Container = styled.div`
    border: 1px solid black;
    border-radius: 999px;
    padding: 0.1em 0.7em;
`


export default function Component ({ url, label }) {
    return (
        <Container>
         <a href={url} className="h4">{label}</a>
        </Container>
    )
}