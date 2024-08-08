import styled from "styled-components"

const Container = styled.div``


export default function Component ({ url, label }) {
    return (
        <Container>
            <a href={url} className="p button" target="_blank">{label}</a>
        </Container>
    )
}