import { useState, useRef } from "react"
import styled from "styled-components"

const Orb = styled.div`
    position: relative;
    flex-basis: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > video {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(6.7);
        z-index: 999;
        pointer-events: none;
    }

    @media(max-width: 1199px) {
        width: 50vw !important;
        height: 50vw !important;
        flex-basis: auto;
        margin-top: -4vw;
    }
`

const Circle = styled.div`
    width: 58%;
    height: 58%;
    background: white;
    border-radius: 999px;
    cursor: pointer;

    max-width: calc(1800px / 4);
    max-height: calc(1800px / 4);

`

const Text = styled.div`
    position: absolute;
    bottom: 1.5vw;
    opacity: 0;
    transition-duration: 0.3s;
    padding: 0 20px;

    &.hovered {
        opacity: 1;
        transition-duration: 0.5s;
    }

    * {
        margin: 0;
    }

    @media(max-width: 1199px) {
        bottom: 0;

        * {
            font-size: 0.8rem;
        }
    }
`




export default ({ data }) => {
    let orbRef = useRef();
    let [isHovered, setIsHovered] = useState(false);

    let togglePlay = (orb, action) => {

        let video = orb.children[0];

        if(action === "play") {
            video.play();
            document.querySelector(".circles-container").style.zIndex = "999999";
        } else {
            video.currentTime = 0;
            video.pause();
            document.querySelector(".circles-container").style.zIndex = "0";
        }
    }

    return (
        <Orb>
            <video 
            loop="true">
                <source 
                src="videos/video1.mp4" 
                type='video/mp4; codecs="hvc1"'
                />
                <source 
                src="videos/video1.webm" 
                type="video/webm"/>
            </video>
            <Circle ref={orbRef} 
                onMouseEnter={() => {
                    togglePlay(orbRef.current.parentNode, "play")
                    setIsHovered(true)
                }}
                onMouseLeave={() => {
                    togglePlay(orbRef.current.parentNode, "pause")
                    setIsHovered(false)
                }}
            />
            <Text className={isHovered ? "hovered" : ""}>
                <p>Heinz Holliger<br/>song1_nocturne_titre.wav</p>
            </Text>
        </Orb>
    )
}