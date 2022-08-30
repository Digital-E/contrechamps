import { useEffect, useState, useRef } from 'react';

import styled from "styled-components";

import Link from "../link";

import sanitizeTag from "../../lib/sanitizeTag";

import { useRouter } from "next/router";

import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


let Container = styled.div`
    position: relative;
    z-index: 1;

    .season-filters {
        display: flex;
        border-top: var(--border-width) solid black;
        border-bottom: var(--border-width) solid black;
        background: black;
        color: white;
    }


    .season-filters > div {
        display: flex;
        padding: 0 30px;
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

    .season-filter:last-child {
        padding-right: 30px;
    }

    .season-filter:hover .season-filter__selector {
        background-color: rgb(255, 0, 0, 1);
    }

    .season-filter__selector {
        width: 13px;
        height: 13px;
        min-width: 13px;
        min-height: 13px;
        // border: var(--border-width) solid black;
        background: white;
        border-radius: 999px;
    }

    .season-filter__label {
        margin-left: 5px;
        line-height: 1;
        white-space: nowrap;
    }

    .season-filter--active .season-filter__selector  {
        background-color: red;
    }


    @media(max-width: 1260px) {
        .season-filters > div:nth-child(1) {
            padding: 0 20px;
            flex-wrap: nowrap;
            overflow: scroll;
            border-bottom: 1px solid black;
        }

        .season-filters > div:nth-child(2) {
            padding: 0 20px;
        }

        .season-filters {
            flex-direction: column;
        }
    }

    @media(max-width: 768px) {
        position: fixed;
        width: 100%;
        top: 55px;

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

let Document = styled.div`
    display: flex;
    align-items: center;
    white-space: nowrap;
`

let Archive = styled.div`
    margin-left: 2rem;
    white-space: nowrap;
`
let Wrapper = styled.div`   
    display: flex;
    margin-left: auto;

    @media(max-width: 1260px) {
        margin-left: 0;
    }
`

let initCheckSessionStorageForTag = true;

export default function Component ({ data }) {
    let filtersRef = useRef();
    let [tags, setTags] = useState([]);

    let router = useRouter();

    let scrollTriggerInstance = null;

    let init = (reset) => {

        if(reset === true) {
          if(scrollTriggerInstance !== null && scrollTriggerInstance !== undefined) {
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
                pinSpacing: false
            });

    
        } 
    }

    let initWrapper = () => {
        init(true)
    }

    useEffect(() => {

        let allTags = [];

        data.tags?.forEach((item, index) => {
            let obj = {
                selected: index === 0 ? true : false,
                tag: item.tag
            }

            allTags.push(obj)
        })

        setTags(allTags);

        if(window.innerWidth > 768) {
            setTimeout(() => {
                init();
            }, 0)
        }

        
        if(!window.matchMedia("(any-pointer:coarse)").matches) {
            window.addEventListener("resize", initWrapper)
        }
        

        initCheckSessionStorageForTag = true;

        return () => {
            window.removeEventListener("resize", initWrapper)
        }    

    }, []);

    useEffect(() => {
        // Check if URL has tag
        if(tags.length === 0 || !initCheckSessionStorageForTag) return;
        // checkSessionStorageForTag();
    }, [tags])
    

    let setFilterSessionStorage = (tag) => {
        sessionStorage.setItem('contrechamps-filter-tag', sanitizeTag(tag))
    }

    let toggleTag = (index, init) => {
        let unselectTags = tags

        unselectTags.forEach(item => item.selected = false)

        unselectTags[index].selected = true;

        setTags([...unselectTags])

        hideTiles(unselectTags[index].tag, index);

        setFilterSessionStorage(data.tags[index].tag)
    }

    let checkSessionStorageForTag = () => {
        let tag = sessionStorage.getItem('contrechamps-filter-tag');

        if(tag !== null) {
            data?.tags.forEach((item, index) => {
                if(sanitizeTag(item.tag) === tag) {
                    toggleTag(index, true);
                }
            })
        }

        initCheckSessionStorageForTag = false;
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

        // Hide Title if list empty

        document.querySelectorAll(".month-wrapper").forEach((itemOne, indexOne) => {
            let amountHidden = 0;

            let amount = itemOne.children[1].children[1].children.length

            Array.from(itemOne.children[1].children[1].children).forEach(itemTwo => {
                if(itemTwo.classList.contains("hide-tile")) {
                    amountHidden += 1;
                }
            })

            if(amount === amountHidden) {
                document.querySelectorAll(".month-wrapper")[indexOne].classList.add("hide-month-wrapper")
            } else {
                document.querySelectorAll(".month-wrapper")[indexOne].classList.remove("hide-month-wrapper")
            }

        })

    }
    
    return (
        <Container ref={filtersRef}>
            <div class="season-filters">
                <div>
                {data.tags?.map((item, index) => (
                    <div key={item._id} 
                        className={tags[index]?.selected === true ? "season-filter season-filter--active" : "season-filter"} 
                        id={sanitizeTag(item.tag)}
                        onClick={() => toggleTag(index)}
                        >
                        <div class="season-filter__selector"></div>
                        <div class="season-filter__label p">{item.tag}</div>
                    </div>
                ))}
                </div>
                <Wrapper>
                <Document>
                    <p><a href={data.documentURL} target="_blank">{data.documentLabel}</a></p>
                </Document>
                <Archive>
                    <p><Link href={`/${router.query.lang}/saison/archive`}>Archives</Link></p>
                </Archive>
                </Wrapper>
            </div>
    </Container>       
    )
}