import { useEffect, useRef } from 'react';

import styled from "styled-components";

import sanitizeTag from "../../lib/sanitizeTag"

import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


let Container = styled.div`
    z-index: 999;

    .season-filters {
        display: flex;
        padding: 10px 30px;
        border-top: var(--border-width) solid black;
        border-bottom: var(--border-width) solid black;
        background: black;
        color: white;
    }

    .season-filter {
        display: flex;
        align-items: center;
        cursor: pointer;
        flex-basis: auto;
        margin-right: 50px;
    }

    .season-filter:hover .season-filter__selector {
        background-color: rgb(255, 0, 0, 1);
    }

    .season-filter__selector {
        width: 20px;
        height: 20px;
        // border: var(--border-width) solid black;
        background: white;
        border-radius: 999px;
    }

    .season-filter__label {
        margin-left: 5px;
        line-height: 1;
    }

    .season-filter--active .season-filter__selector  {
        background-color: red;
    }

    @media(max-width: 767px) {
        .season-filters {
            flex-wrap: wrap;
            padding: 15px;
        } 

        .season-filter {
            flex-basis: 33.3333%;
        }
    }
`

let scrollTriggerInstance = null;

export default function Component ({ data }) {
    let filtersRef = useRef();

    let init = (reset) => {

        if(reset === true) {
          if(scrollTriggerInstance !== null) {
              ScrollTrigger.getById("scroll-trigger").kill(true);
          }
        }
    
        if(window.innerWidth > 989) {
    
            scrollTriggerInstance = ScrollTrigger.create({
                trigger: filtersRef.current,
                id: "scroll-trigger",
                pin: filtersRef.current,
                start: "top top",
                end: "max",
                pinSpacing: false
            });
    
        } 
    }

    let initWrapper = () => {
        init(true)
    }

    useEffect(() => {


        if(window.innerWidth > 989) {
            init();
        }

        window.addEventListener("resize", initWrapper)

        return () => {
            window.removeEventListener("resize", initWrapper)
        }        
        

    }, []);

    return (
        <Container ref={filtersRef}>
            <div class="season-filters">
                {data.tags?.map((item, index) => (
                    <div key={item._id} class={index === 0 ? "season-filter season-filter--active" : "season-filter"} id={sanitizeTag(item.tag)}>
                        <div class="season-filter__selector"></div>
                        <div class="season-filter__label p">{item.tag}</div>
                    </div>
                ))}
                {/* <div class="season-filter season-filter--active">
                    <div class="season-filter__selector"></div>
                    <div class="season-filter__label p">Toute la saison</div>
                </div>
                <div class="season-filter">
                    <div class="season-filter__selector"></div>
                    <div class="season-filter__label p">Spectacles</div>
                </div>
                <div class="season-filter">
                    <div class="season-filter__selector"></div>
                    <div class="season-filter__label p">En famille</div>
                </div>
                <div class="season-filter">
                    <div class="season-filter__selector"></div>
                    <div class="season-filter__label p">Petites conférences</div>
                </div> */}
            </div> 
    </Container>       
    )
}