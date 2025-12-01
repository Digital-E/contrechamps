import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import Body from '../body'
import Image from '../image'
import Video from './video-slide'
import Link from '../link'

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}

const Container = styled.div`
    z-index: 0;
    position: relative;

    .flickity-page-dots {
        position: absolute;
        right: 35px;
        bottom: 30px;
        width: fit-content;
    }

    .flickity-page-dots li:only-child{
        display: none;
    }

    .flickity-page-dots .dot {
        border: 1px solid black;
        background: black;
        opacity: 1;
        width: 8px;
        height: 8px;
        margin: 0 3px;
    }

    .flickity-page-dots .dot.is-selected {
        border: 1px solid black;
        background: white;
    }
`

const Carousel = styled.div`
    outline: none !important;

    .flickity-viewport {
    }
`

const Slide = styled.div`
    display: flex;
    width: 100%;
    height: 75vh;

    > a {
        display: flex;  
        width: 100%;
        pointer-events: none;
    }

    > a:hover * {
        color: var(--black) !important;
    }

    div, img {
        // height: 100% !important;
        // width: 100% !important;
        // object-fit: cover;
    }

    @media(max-width: 989px) {
        > a {
            flex-direction: column;
        }
    }
`

const ColLeft = styled.div`
    flex-basis: 100%;
    padding: 15px 20px;

    > span {
        position: absolute;
        top: 0;
        left: 0;
        height: 100% !important;
        width: 100% !important;
        object-fit: cover !important;
    }

    img {
        object-fit: cover;
    }
`

const ColRight = styled.div`
    flex-basis: 50%;
    padding: var(--margin) var(--margin) var(--margin) 0;

    @media(max-width: 989px) {
        padding: 0 var(--margin) var(--margin) var(--margin);
    }
`


const Text = styled.div``


export default function Component ({ data }) {
    let flickity = null;
    let gallery = useRef();
    let [cellIndex, setCellIndex] = useState(0);

    let init = () => {
        if(flickity !== null) return

        flickity = new Flickity(gallery.current, {
            prevNextButtons: false,
            pageDots: true,
            selectedAttraction: 0.07,
            friction: 0.42,
            cellAlign: "center",
            percentPosition: true,
            wrapAround: true,
            autoPlay: 4000 
            // setGallerySize: false
        })

        flickity.on('change', (cellIndex) => {
            setCellIndex(cellIndex)
        })

        flickity.on('staticClick', (event, pointer, cellElement, cellIndex) => {

            if(pointer.target.className?.baseVal === "no-skip") return

            if(event.clientX < window.innerWidth / 2) {
                flickity.previous()
            } else {
                flickity.next()
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            init();
        }, 10)
    }, []);

    return (
        <Container>
            <Carousel ref={gallery} aria-live="polite" aria-label="carousel">
                {
                    data?.map((item, index) => {
                        if(item.image === null && item.videoMp4 === null) return
                            return <Slide
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${index + 1} of ${data.length}`}
                                // aria-current={selectedIndex === index ? true : false}
                            >
                                {/* <Link href={item.link}> */}
                                <a>
                                    <ColLeft>
                                        {
                                            item.image ?
                                            <Image data={item.image} />
                                            :
                                            <Video data={item} index={index} cellIndex={cellIndex} />
                                        }
                                    </ColLeft>
                                    {/* <ColRight>
                                        <Text><Body content={item.text} /></Text>
                                    </ColRight> */}
                                </a>
                                {/* </Link> */}
                            </Slide>                        
                    }
                        )
                }
            </Carousel>
        </Container>
    )
}

