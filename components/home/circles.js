import { useEffect, useRef } from "react"
import styled from "styled-components"

const Container = styled.div`

    > div {
        position: relative;
        height: 25vw;
        width: 100%;
        max-width: 1800px;
        display: flex;
        z-index: 999;
    }

    @media(max-width: 1200px) {
        width: 100vw;
        overflow: hidden;
        overflow-x: scroll;

        > div {
            width: fit-content;
            height: 70vw;
        }
    }

    ::webkit-scrollbar {
        display: none;
    }
`

const Orb = styled.div`
    position: relative;
    flex-basis: 25%;
    display: flex;
    justify-content: center;
    align-items: center;

    > video {
        position: absolute;
        width: 100%;
        top: 46%;
        left: 47%;
        transform: translate(-50%, -50%) scale(1.2);
        z-index: 999;
        pointer-events: none;
    }

    @media(max-width: 1200px) {
        width: 70vw;
    }
`

const Circle = styled.div`
    height: 58%;
    width: 58%;
    background: white;
    border-radius: 999px;
    cursor: pointer;
`



export default ({ data }) => {
    let orbRef = useRef();
    let orbRefs = [];

    let togglePlay = (orb, action) => {

        let video = orb.children[0];

        if(action === "play") {
            video.play();
        } else {
            video.currentTime = 0;
            video.pause();
        }
    }

    useEffect(() => {
        orbRef.current.addEventListener("mouseenter", () => togglePlay(orbRef.current.parentNode, "play"))
        orbRef.current.addEventListener("mouseleave", () => togglePlay(orbRef.current.parentNode, "pause"))
    }, []);

    return (
        <Container>
            <div>
                <Orb>
                    <video 
                    // autoplay="true" 
                    muted="true" 
                    loop="true">
                        <source 
                        src="videos/video.mp4" 
                        type='video/mp4'/>
                        <source 
                        src="videos/video.webm" 
                        type="video/webm"/>
                    </video>
                    <Circle ref={orbRef} />
                </Orb>
                <Orb>
                    <Circle />
                </Orb>
                <Orb>
                    <Circle />
                </Orb>
                <Orb>
                    <Circle />
                </Orb>
            </div>
        </Container>
    )
}