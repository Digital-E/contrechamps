import { useEffect, useRef } from "react";

import styled from "styled-components"
import Link from "../link"

import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



let Container = styled.div`
    z-index: 1;

    .season-filters {
        position: relative;
        display: flex;
        border-top: var(--border-width) solid black;
        border-bottom: var(--border-width) solid black;
        background: black;
        color: white;
    }

    

    .season-filters > div {
        display: flex;
        padding: 0px 30px;
    }

    .season-filter {
        margin-right: 40px;
    }

    .season-filter > a {
        display: flex;
        align-items: center;
        cursor: pointer;
        flex-basis: auto;
    }

    .season-filter:last-child {
        padding-right: 30px;
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

    @media(max-width: 768px) {
        position: fixed;
        width: 100%;
        top: 55px;

        .season-filters > div {
            flex-wrap: wrap;
            padding: 0 20px;
            flex-wrap: nowrap;
            overflow: scroll;
        } 

        .season-filter {
            margin-right: 30px;
        }

        .season-filters::after {
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            height: 35px;
            width: 30px;
            background: linear-gradient(90deg, transparent 0%, white 90%);
            z-index: 999;
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
    
        if(window.innerWidth > 768) {
            let headerHeight = document.querySelector("header").offsetHeight;

            scrollTriggerInstance = ScrollTrigger.create({
                trigger: filtersRef.current,
                id: "scroll-trigger",
                pin: filtersRef.current,
                start: `top-=${headerHeight} top`,
                end: "max",
                pinSpacing: false,
                resize: window.matchMedia("(any-pointer:coarse)").matches ? false : true
            });
    
        } 
    }

    let initWrapper = () => {
        setTimeout(() => {
            init(true);
        }, 500)
    }

    useEffect(() => {


        if(window.innerWidth > 768) {
            setTimeout(() => {
                init();
            }, 500)
        }

        if(!window.matchMedia("(any-pointer:coarse)").matches) {
            window.addEventListener("resize", initWrapper)
        }

        return () => {
            window.removeEventListener("resize", initWrapper)
        }        
        

    }, []);

    return (
        <Container ref={filtersRef}>
            <div class="season-filters">
                <div>
                <div class="season-filter">
                    <Link href={`/${data._lang}/media/all`}>
                        <div class="season-filter__selector"></div>
                        <div class="season-filter__label p">Tout</div>
                    </Link>
                </div>                
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
                    <Link href={`/${data._lang}/media/photos`}>
                        <div class="season-filter__selector"></div>
                        <div class="season-filter__label p">Photos</div>
                    </Link>
                </div>                  
                <div class="season-filter">
                    <Link href={`/${data._lang}/media/disques`}>
                        <div class="season-filter__selector"></div>
                        <div class="season-filter__label p">Disques</div>
                    </Link>
                </div>              
                </div>
            </div> 
    </Container>       
    )
}