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
    opacity: 0;
    transition: opacity 0.3s;
    user-select: none;

    &&.reveal-orb {
        opacity: 1 !important;
        transition: opacity 1s;
    }

    > video {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        // transform: translate(-50%, -50%) scale(6.7);
        transform: translate(-50%, -50%) scale(3.7);
        z-index: 999;
        pointer-events: none;
        transition: opacity 0.3s;
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
    user-select: none;
    color: var(--ternary-color);

    &.hovered {
        opacity: 1;
        transition-duration: 0.5s;
    }

    * {
        margin: 0;
        word-break: break-word;
        font-size: 0.8rem;
    }

    @media(max-width: 1199px) {
        bottom: 0;

        * {
            font-size: 0.5rem;
        }
    }
`




export default ({ data, index }) => {
    let orbRef = useRef();
    let orbWrapperRef = useRef();
    let [isHovered, setIsHovered] = useState(false);
  

    let togglePlay = (orb, action) => {

        if(window.innerWidth < 990) return;

        let video = orb.children[0];

        let circlesContainer = document.querySelector(".circles-container");

        if(action === "play") {
            setIsHovered(true)
            video.play();

            if(circlesContainer) {
                circlesContainer.style.zIndex = "999999";
            }
            orbWrapperRef.current.style.zIndex = "999999";
        } else {
            setIsHovered(false)
            video.currentTime = 0;
            video.pause();
            if(circlesContainer) {
                circlesContainer.style.zIndex = "0";
            }
            orbWrapperRef.current.style.zIndex = "0";
        }
    }

    let isAtLeastOneVideoPlaying = () => {
        let atLeastOne = false;

        document.querySelectorAll(".orb-video").forEach(item => {
            let video = item.children[0];
            if(!!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)) atLeastOne = true
        })

        return atLeastOne
    }

    let togglePlayMobile = (orb) => {

        let video = orb.children[0];

        let circlesContainer = document.querySelector(".circles-container");
        let eventHeaderColLeft = document.querySelector(".event-header__col-left");

        // Mute All Videos
        document.querySelectorAll(".orb-video").forEach(item => item.children[0].muted = true);


        if(isHovered) {
            video.currentTime = 0;
            video.pause();
            if(circlesContainer) {
                if(!isAtLeastOneVideoPlaying()) {
                    circlesContainer.style.zIndex = "0";
                }
            }
            if(eventHeaderColLeft) {
                eventHeaderColLeft.style.zIndex = "0";
            }
            orbWrapperRef.current.style.zIndex = "0";

            setIsHovered(false)

            window.removeEventListener("click", pauseAllOrbs);
        } else {
            video.play();
            if(circlesContainer) {
                circlesContainer.style.zIndex = "999999";
            }
            if(eventHeaderColLeft) {
                eventHeaderColLeft.style.zIndex = "999999";
            }
            orbWrapperRef.current.style.zIndex = "20";

            setIsHovered(true)

            // Listen For click away from orb and Pause All
            window.addEventListener("click", pauseAllOrbs);
        }

        // Unmute All Videos
        if(document.querySelector(".sound-on")) {
            document.querySelectorAll(".orb-video").forEach(item => item.children[0].muted = false);
        }        
    }

    let pauseAllOrbs = (e) => {       
        if (
            !e.target.classList.contains("orb-circle") 
            &&
            !e.target.classList.contains("sound-icon")
            &&
            !e.target.parentElement?.classList.contains("sound-icon")
            &&
            !e.target.parentElement?.parentElement?.classList.contains("sound-icon")
            &&
            e.target.parentElement !== null
            ) {
            document.querySelectorAll(".orb-video").forEach(item => {
                item.children[0].pause()
                item.children[0].currentTime = 0;
                // document.querySelector(".orb-video").style.zIndex = "0";
                setIsHovered(false)
            });

            if(document.querySelector(".circles-container")) {
                document.querySelector(".circles-container").style.zIndex = "0";
            }
            if(document.querySelector(".event-header__col-left")) {
                document.querySelector(".event-header__col-left").style.zIndex = "0";
            }
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

        if(orbWrapperRef.current.children[0].readyState >= 2) {
            revealOrb();
        }
    }, []);

    let loadedData = () => {
        // Load Circles
        orbRef.current.parentNode.children[0].play();

        orbRef.current.parentNode.children[0].pause();
        orbRef.current.parentNode.children[0].currentTime = 0;

    }

    let revealOrb = () => {
        setTimeout(() => {
            orbWrapperRef.current.classList.add("reveal-orb");
        }, 100)
    }


    return (
        <Orb ref={orbWrapperRef} className="orb-video">
            <video 
            muted="true"
            preload={true}
            onPause={() => setIsHovered(false)}
            onEnded={() => togglePlay(orbRef.current.parentNode, "play")}
            // autoPlay="true"
            playsInline="true"
            onLoadStart={() => loadedData()}
            onLoadedData={() => revealOrb()}
            // loop="true"
            >
                <source 
                src={`${data.videoMp4}#t=0.001`} 
                type='video/mp4; codecs="hvc1"'
                />
                <source 
                src={`${data.videoWebM}#t=0.001`}
                type="video/webm"/>
            </video>
            <Circle ref={orbRef}
                className="orb-circle"
                // onClick={() => {
                //     togglePlay(orbRef.current.parentNode, "play")
                // }}             
                onMouseEnter={() => {
                    togglePlay(orbRef.current.parentNode, "play")
                }}
                onMouseLeave={() => {
                    togglePlay(orbRef.current.parentNode, "pause")
                }}
                onTouchStart={() => {
                    togglePlayMobile(orbRef.current.parentNode)
                }}
            />
            <Text className={isHovered ? "hovered" : ""}>
                <Body content={data.label} />
            </Text>
        </Orb>
    )
}