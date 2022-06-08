import { useEffect, useRef } from "react";

import styled from "styled-components"
import Link from "../link"

import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



let Container = styled.div`
    z-index: 999;

    .season-filters {
        display: flex;
        padding: 0px 30px;
        border-top: var(--border-width) solid black;
        border-bottom: var(--border-width) solid black;
        background: black;
        color: white;
    }

    .season-filter > a {
        display: flex;
        align-items: center;
        cursor: pointer;
        flex-basis: auto;
        margin-right: 40px;
    }

    @media(max-width: 767px) {
        .season-filter > a {
            display: flex;
            justify-content: center;
            margin-right: 0;
        }
    }

    .season-filter > a:hover .season-filter__selector {
        background-color: rgb(255, 0, 0, 1);
    }

    .season-filter__selector {
        width: 13px;
        height: 13px;
        // border: var(--border-width) solid black;
        background: white;
        border-radius: 999px;
    }

    .season-filter__label {
        margin-left: 5px;
        line-height: 1;
    }

    .active-link .season-filter__selector  {
        background-color: red;
    }

    .season-filter__label {
        color: white !important;
    }

    @media(max-width: 767px) {
        .season-filters {
            flex-wrap: wrap;
            padding: 0 20px;
        } 

        .season-filter {
            margin-right: 30px;
        }
    }
`


export default function Component ({ data }) {
    let filtersRef = useRef();

    let scrollTriggerInstance = null;

    let init = (reset) => {

        if(reset === true) {
          if(scrollTriggerInstance !== null) {
              if(ScrollTrigger.getById("scroll-trigger") !== undefined) {
                ScrollTrigger.getById("scroll-trigger").kill(true);
              }
          }
        }
    
        if(window.innerWidth > 989) {
            let headerHeight = document.querySelector("header").offsetHeight;

            scrollTriggerInstance = ScrollTrigger.create({
                trigger: filtersRef.current,
                id: "scroll-trigger",
                pin: filtersRef.current,
                start: `top-=${headerHeight} top`,
                end: "max",
                pinSpacing: false
            });
    
        } 
    }

    let initWrapper = () => {
        setTimeout(() => {
            init(true);
        }, 500)
    }

    useEffect(() => {


        if(window.innerWidth > 989) {
            setTimeout(() => {
                init();
            }, 500)
        }

        window.addEventListener("resize", initWrapper)

        return () => {
            window.removeEventListener("resize", initWrapper)
        }        
        

    }, []);

    return (
        <Container ref={filtersRef}>
            <div class="season-filters">
                <div class="season-filter">
                    <Link href={`/${data._lang}/media/presse`}>
                        <div class="season-filter__selector"></div>
                        <div class="season-filter__label p">Presse</div>
                    </Link>
                </div>
                <div class="season-filter">
                    <Link href={`/${data._lang}/media/videos`}>
                        <div class="season-filter__selector"></div>
                        <div class="season-filter__label p">Videos</div>
                    </Link>
                </div>
                <div class="season-filter">
                    <Link href={`/${data._lang}/media/disques`}>
                        <div class="season-filter__selector"></div>
                        <div class="season-filter__label p">Disques</div>
                    </Link>
                </div>
            </div> 
    </Container>       
    )
}