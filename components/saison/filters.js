import { useEffect, useState, useRef } from 'react';

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
        flex-wrap: wrap;
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
            display: none;
        } 

        .season-filter {
            flex-basis: 100%;
        }
    }
`

let Document = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`



export default function Component ({ data }) {
    let filtersRef = useRef();
    let [tags, setTags] = useState([]);

    let scrollTriggerInstance = null;

    let init = (reset) => {

        if(reset === true) {
          if(scrollTriggerInstance !== null && scrollTriggerInstance !== undefined) {
            if(ScrollTrigger.getById("scroll-trigger") !== undefined) {
                ScrollTrigger.getById("scroll-trigger").kill(true);
            }
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

        let allTags = [];

        data.tags.forEach((item, index) => {
            let obj = {
                selected: index === 0 ? true : false,
                tag: item.tag
            }

            allTags.push(obj)
        })

        setTags(allTags);

        if(window.innerWidth > 989) {
            setTimeout(() => {
                init();
            }, 0)
        }

        window.addEventListener("resize", initWrapper)

        return () => {
            window.removeEventListener("resize", initWrapper)
        }        
        

    }, []);

    let toggleTag = (index) => {
        let unselectTags = tags

        unselectTags.forEach(item => item.selected = false)

        unselectTags[index].selected = true;

        setTags([...unselectTags])

        hideTiles(unselectTags[index].tag, index);
        
    }

    let hideTiles = (tag, index) => {

        let allEvents = document.querySelectorAll(".event-tile");

        allEvents.forEach(tile => {
            tile.classList.remove("hide-tile")
        })

        if(index === 0) return;

        let sanitizedTag = sanitizeTag(tag)


        allEvents.forEach(tile => {
            if(!tile.classList.contains(sanitizedTag)) {
                tile.classList.add("hide-tile")
            }
        })
    }


    return (
        <Container ref={filtersRef}>
            <div class="season-filters">
                {data.tags?.map((item, index) => (
                    <div key={item._id} 
                        class={tags[index]?.selected === true ? "season-filter season-filter--active" : "season-filter"} 
                        id={sanitizeTag(item.tag)}
                        onClick={() => toggleTag(index)}
                        >
                        <div class="season-filter__selector"></div>
                        <div class="season-filter__label p">{item.tag}</div>
                    </div>
                ))}
                <Document>
                    <p><a href={data.documentURL}>{data.documentLabel}</a></p>
                </Document>
            </div>
    </Container>       
    )
}