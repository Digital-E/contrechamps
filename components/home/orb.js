import { useState, useRef, useEffect } from "react"
import styled from "styled-components"

import Bowser from "bowser";

import Body from "../body"

const Orb = styled.div`
    position: relative;
    flex-basis: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 0;

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
    opacity: 0;

    max-width: calc(1800px / 4);
    max-height: calc(1800px / 4);

`

const Text = styled.div`
    position: absolute;
    bottom: 1.5vw;
    opacity: 0;
    transition-duration: 0.3s;
    padding: 0 20px;
    width: 100%;

    &.hovered {
        opacity: 1;
        transition-duration: 0.5s;
    }

    * {
        margin: 0;
        word-break: break-word;
    }

    @media(max-width: 1199px) {
        bottom: 0;

        * {
            font-size: 0.8rem;
        }
    }
`




export default ({ data, index }) => {
    let orbRef = useRef();
    let orbWrapperRef = useRef();
    let [isHovered, setIsHovered] = useState(false);

    let togglePlay = (orb, action) => {

        let video = orb.children[0];

        let circlesContainer = document.querySelector(".circles-container");

        if(action === "play") {
            video.play();
            video.muted = false;
            if(circlesContainer) {
                circlesContainer.style.zIndex = "999999";
            }
            orbWrapperRef.current.style.zIndex = "999999";
        } else {
            video.currentTime = 0;
            video.pause();
            if(circlesContainer) {
                circlesContainer.style.zIndex = "0";
            }
            orbWrapperRef.current.style.zIndex = "0";
        }
    }

    useEffect(() => {

        const browser = Bowser.getParser(window.navigator.userAgent).getBrowser();

        // Hide Circles if Safari version is lower or eqaul to 14.1

        if(browser.name === "Safari" && browser.version <= 14.1) {
            orbWrapperRef.current.style.display = "none";
            if(document.querySelector(".circles-container")) {
                document.querySelector(".circles-container").style.height = "5vw";
            }

            if(document.querySelector(".event-header__col-left")) {
                document.querySelector(".event-header__col-left").style.height = "0";
            }
        }
    }, []);

    let loadedData = () => {
        // Load Circles
        orbRef.current.parentNode.children[0].play();

        orbRef.current.parentNode.children[0].pause();
        orbRef.current.parentNode.children[0].currentTime = 0;
    }

    return (
        <Orb ref={orbWrapperRef}>
            <video 
            muted="true"
            preload={true}
            // autoPlay="true"
            playsInline="true"
            onLoadStart={() => loadedData()}
            // loop="true"
            >
                <source 
                src={data.videoMp4} 
                type='video/mp4; codecs="hvc1"'
                />
                <source 
                src={data.videoWebM}
                type="video/webm"/>
            </video>
            <Circle ref={orbRef}
                onClick={() => {
                    togglePlay(orbRef.current.parentNode, "play")
                    setIsHovered(true)
                }}             
                onMouseEnter={() => {
                    togglePlay(orbRef.current.parentNode, "play")
                    setIsHovered(true)
                }}
                onMouseLeave={() => {
                    togglePlay(orbRef.current.parentNode, "pause")
                    setIsHovered(false)
                }}
                onTouchStart={() => {
                    togglePlay(orbRef.current.parentNode, "play")
                    setIsHovered(true)
                }}
            />
            <Text className={isHovered ? "hovered" : ""}>
                <Body content={data.label} />
            </Text>
        </Orb>
    )
}