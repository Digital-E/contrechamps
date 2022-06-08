import styled from "styled-components"

const Container = styled.div``


export default function Component ({ url, label }) {
    return (
        <Container className="button">
         <a href={url} className="h4">{label}</a>
        </Container>
    )
}