import { useEffect, useRef } from "react";

import styled from "styled-components"
import Link from "../link"

import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



let Container = styled.div`
    position: relative;
    z-index: 1;

    .season-filters {
        display: flex;
        background: white;
        color: white;
        padding: 5px 0;
    }

    .season-filters > div {
        display: flex;
        padding: 0 40px;
        flex-wrap: wrap;
        margin-top: -1px;
    }

    .season-filter {
        display: flex;
        align-items: center;
        cursor: pointer;
        flex-basis: auto;
        margin-right: 30px;
    }

    .season-filter > a:hover .season-filter__label {
        color: var(--secondary-color);
    }

    .season-filter__selector {
        display: none;
    }

    .season-filter__label {
        font-family: "Barlow Condensed Medium";
        line-height: 1;
        white-space: nowrap;
    }

    .active-link .season-filter__label {
        font-family: "Barlow Condensed ExtraBold";
    }

    @media(max-width: 768px) {
        position: fixed;
        width: 100%;
        top: 55px;

        .season-filters > div {
            padding: 0 20px;
            flex-wrap: nowrap;
            overflow: scroll;
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
            <div class="season-filters force-courier">
                <div>
                <div class="season-filter">
                    <Link href={`/${data._lang}/media/all`}>
                        <div class="season-filter__label p">Tout</div>
                    </Link>
                </div>                
                <div class="season-filter">
                    <Link href={`/${data._lang}/media/presse`}>
                        <div class="season-filter__label p">Presse</div>
                    </Link>
                </div>
                <div class="season-filter">
                    <Link href={`/${data._lang}/media/videos`}>
                        <div class="season-filter__label p">Videos</div>
                    </Link>
                </div>
                <div class="season-filter">
                    <Link href={`/${data._lang}/media/photos`}>
                        <div class="season-filter__label p">Photos</div>
                    </Link>
                </div>                  
                <div class="season-filter">
                    <Link href={`/${data._lang}/media/disques`}>
                        <div class="season-filter__label p">Disques</div>
                    </Link>
                </div>              
                </div>
            </div> 
    </Container>       
    )
}