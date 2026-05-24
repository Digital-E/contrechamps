import { useEffect, useState } from "react";
import styled from "styled-components"
import VideoListItem from "./video-list-item";


const Container = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px 40px;

    @media(max-width: 990px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media(max-width: 767px) {
        grid-template-columns: 1fr;
        padding: 20px;
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