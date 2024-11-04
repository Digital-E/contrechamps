import { useEffect, useState } from "react";
import styled from "styled-components"
import VideoListItem from "./video-list-item";


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


export default function Component({ data, isExpandable, isPhoto }) {
    let [showData, setShowData] = useState([]);

    useEffect(() => {
        if(data) {
            let spliceData = JSON.parse(JSON.stringify(data)).splice(0, 3);

            setShowData(spliceData);
        }
    }, []);

    if(isExpandable) {
        return (
            <Container className="border-top">
                {showData?.map(item => <VideoListItem data={item} isPhoto={isPhoto} />)}
            </Container>
        )
    } else {
        return (
            <Container className="border-top">
                {data?.map(item => <VideoListItem data={item} isPhoto={isPhoto} />)}
            </Container>
        )
    }
}