import styled from "styled-components"
import PressListItem from "./video-list-item"

const Container = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 20px 15px;

    > div {
        flex-basis: calc(33.3333% - 10px);
    }

    @media(max-width: 767px) {
        > div {
            flex-basis: 100%;
        }  
    }
`


export default function Component({ data }) {
    return (
        <Container className="border-top">
            { data.map(item => <PressListItem data={item} />) }
        </Container>
    )
}