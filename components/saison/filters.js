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
    // background: white,

    .season-filters {
        display: flex;
        // border-top: var(--border-width) solid black;
        // border-bottom: var(--border-width) solid black;
        background: white;
        color: white;
        padding: 5px 0;
    }

    .season-filters > div > div:nth-child(2) > .season-filter__selector {
        background-color: var(--orange);
    }

    .season-filters > div > div:nth-child(4) > .season-filter__selector {
        background-color: var(--blue);
    }   

    .season-filters > div > div:nth-child(5) > .season-filter__selector {
        background-color: var(--green);
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

    @media(min-width: 990px) {
        .season-filter:last-child {
            padding-right: 30px;
        }
    }

    .season-filter:hover .season-filter__selector {
        // background-color: rgb(255, 0, 0, 1);
    }

    .season-filter:hover .season-filter__label {
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

    .season-filter--active .season-filter__label  {
        font-family: "Barlow Condensed ExtraBold";
    }


    @media(max-width: 1260px) {
        .season-filters > div:nth-child(1) {
            padding: 0 40px;
            flex-wrap: nowrap;
            overflow: scroll;
            // border-bottom: 1px solid black;
        }

        .season-filters > div:nth-child(2) {
            padding: 0 40px;
        }

        .season-filters {
            flex-direction: column;
        }
    }

    @media(max-width: 768px) {
        position: fixed;
        width: 100%;
        top: 55px;
        padding: 0 0px;

        .season-filters > div:nth-child(1) {
            padding: 0 20px;
        }

        .season-filters::after {
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            height: 35px;
            width: 30px;
            // background: linear-gradient(90deg, transparent 0%, var(--ternary-color) 90%);
            background: linear-gradient(90deg, transparent 0%, white 90%);
            z-index: 999;
        }

        .season-filters > div:nth-child(2) {
            display: none;
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
    flex-wrap: nowrap !important;
    align-items: flex-start;
    margin-left: auto;
    color: black;

    p {
        font-family: "Barlow Condensed Medium";
        font-size: 1.1rem;
    }

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
        setTimeout(() => {
            checkSessionStorageForTag()
        }, 10)   
    }, [router])

    useEffect(() => {
        // Check if URL has tag
        if(tags.length === 0 || !initCheckSessionStorageForTag) return;
        checkSessionStorageForTag();
    }, [tags])
    

    let setFilterSessionStorage = (tag) => {

        if(tag === "Toute la saison") return  window.location.hash = ``
        
        window.location.hash = `#!${sanitizeTag(tag)}`

        // sessionStorage.setItem('contrechamps-filter-tag', sanitizeTag(tag))
    }

    let toggleTag = (index, init) => {
        let unselectTags = tags

        unselectTags.forEach(item => item.selected = false)

        if(unselectTags[index] === undefined) return;

        unselectTags[index].selected = true;

        setTags([...unselectTags])

        hideTiles(unselectTags[index].tag, index);

        setFilterSessionStorage(data.tags[index].tag)
    }

    let checkSessionStorageForTag = () => {
        // let tag = sessionStorage.getItem('contrechamps-filter-tag');
        let tag = window.location.hash.split("#!")[1]

        if(tag !== null && tag !== undefined) {
            data?.tags.forEach((item, index) => {
                if(sanitizeTag(item.tag) === tag) {
                    toggleTag(index, true);
                    setTimeout(() => {
                        if(item.tag === "Toute la saison") return
                        window.location.hash = `#!${sanitizeTag(item.tag)}`
                    }, 10)                    
                }
            })
        } else {
            toggleTag(0, true);
        }
    

        initCheckSessionStorageForTag = false;
    }

    let hideTiles = (tag, index) => {

        let allEvents = document.querySelectorAll(".event-tile");

        allEvents.forEach(tile => {
            tile.classList.remove("hide-tile")
        })

        document.querySelectorAll(".month-wrapper").forEach(item => {
            item.classList.remove("hide-month-wrapper")
        })

        if(index === 0) return;

        let sanitizedTag = sanitizeTag(tag)


        allEvents.forEach(tile => {
            if(!tile.classList.contains(sanitizedTag)) {
                tile.classList.add("hide-tile")
            }
        })

        // Hide month header if all tiles in it are hidden
        document.querySelectorAll(".month-wrapper").forEach(monthEl => {
            const tiles = Array.from(monthEl.querySelectorAll(".event-tile"))
            const allHidden = tiles.length > 0 && tiles.every(t => t.classList.contains("hide-tile"))
            monthEl.classList.toggle("hide-month-wrapper", allHidden)
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