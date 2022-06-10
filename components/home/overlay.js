import { useEffect, useState, useRef } from "react"
import styled from "styled-components"

import { useRouter } from "next/router";

import Button from "../button";

const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    background: black;
    z-index: 99999;
    top: 0;
    left: 0;

    &.hide {
        display: none;
    }
    
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;

    > div:nth-child(1) {
        margin-bottom: 40px;
    }

    > div:nth-child(2) {
        display: flex;
        flex-direction: row;
    }

    > div:nth-child(2) span {
        border-bottom: 1px solid white;
        cursor: pointer;
    }
`




export default ({ data }) => {
    let router = useRouter();
    let [hasClicked, setHasClicked] = useState(false);

    useEffect(() => {

        if(sessionStorage.getItem('contrechampsAcceptedSound') === "true") {
            setHasClicked(true);
        }

        window.onbeforeunload = function(){
            sessionStorage.removeItem('contrechampsAcceptedSound');
        }

    },[]);

    let toggleHasClicked = () => {
        setHasClicked(true);
        sessionStorage.setItem('contrechampsAcceptedSound', "true");

        let video = document.querySelector("video");
        video.play();
        video.pause();
    }

    return (
        <Container className={hasClicked && "hide"} onClick={() => toggleHasClicked()}>
            <Wrapper>
                <div><h1>Contrechamps</h1></div>
                <div>
                    {
                        router.query.lang === "fr" ?
                        <div>
                            <p>Ce site utilise le son.&nbsp; <span>Entrer</span></p>
                        </div>
                        :
                        <div>
                            <p>This website uses sound.&nbsp; <span>Enter</span></p>
                        </div>
                    }
                </div>
            </Wrapper>
        </Container>
    )
}