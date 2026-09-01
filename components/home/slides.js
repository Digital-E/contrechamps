import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
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
        position: static;
        width: 100%;
        margin-top: 10px;
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

    .flickity-prev-next-button {
        background: white;
        border: 1px solid black;
        width: 36px;
        height: 36px;
    }

    .flickity-prev-next-button.previous { left: 20px; }
    .flickity-prev-next-button.next { right: 20px; }

    .flickity-prev-next-button:hover {
        background: black;
    }

    .flickity-button-icon {
        fill: black;
    }

    .flickity-prev-next-button .flickity-button-icon {
        left: 25%;
        top: 25%;
        width: 50%;
        height: 50%;
    }

    .flickity-prev-next-button:hover .flickity-button-icon {
        fill: white;
    }

    @media(max-width: 989px) {
        .flickity-prev-next-button {
            display: none;
        }
    }

    @media(min-width: 990px) {
        .flickity-prev-next-button {
            opacity: 0;
            pointer-events: none;
            transition: opacity var(--transition-out);
        }

        ${props => props.showArrows && `
            .flickity-prev-next-button {
                opacity: 1;
                pointer-events: auto;
                transition: opacity var(--transition-in);
            }
        `}

        /* Resting the cursor on an arrow produces no mousemove events, so
           the idle timer alone would hide it out from under the pointer.
           Keep BOTH arrows visible (not just the hovered one) whenever
           either is hovered, regardless of the timer/showArrows state. */
        &:has(.flickity-prev-next-button:hover) .flickity-prev-next-button {
            opacity: 1;
            pointer-events: auto;
        }
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

    > a {
        display: flex;
        width: 100%;
        pointer-events: none;
    }

    > a:hover * {
        color: var(--black) !important;
    }

    @media(max-width: 989px) {
        > a {
            flex-direction: column;
        }
    }

    /* The anchor itself has pointer-events: none (Flickity handles the
       click), so the cursor has to be set here on desktop, where clicks
       navigate the slide instead of just paging the carousel. */
    @media(min-width: 990px) {
        cursor: ${props => props.hasUrl ? 'pointer' : 'default'};
    }
`

const ColLeft = styled.div`
    flex-basis: 100%;
    padding: 0px 0px;

    img {
        object-fit: contain !important;
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

const MobileOnly = styled.div`
    display: none;
    @media(max-width: 989px) {
        display: block;
    }
`

const DesktopOnly = styled.div`
    display: block;
    @media(max-width: 989px) {
        display: ${({ hasMobileAlt }) => hasMobileAlt ? 'none' : 'block'};
    }
`


const IMAGE_SLIDE_DURATION = 4000;

// Safety net only: video slides normally advance via onEnded once the video
// has actually played through. This just guarantees the carousel never gets
// stuck on a slide if a video fails to fire 'ended' (blocked autoplay, load
// error, etc).
const VIDEO_SLIDE_FALLBACK_DURATION = 20000;

// How long the mouse can sit still over the slider before the arrows hide
// again — they should only show while the mouse is actually moving.
const ARROW_IDLE_TIMEOUT = 1200;

// How long after the user last interacted with the slider (drag, arrow
// click, dot click, link click...) before auto-advance resumes on its own.
const RESUME_AUTOPLAY_AFTER = 4000;

export default function Component ({ data }) {
    let router = useRouter();
    let flickityRef = useRef(null);
    let gallery = useRef();
    let advanceTimeoutRef = useRef(null);
    // Once the user touches the slider (drag, tap, dot click, link click...)
    // auto-advance pauses, then resumes on its own after a period with no
    // further interaction.
    let hasInteractedRef = useRef(false);
    let resumeTimeoutRef = useRef(null);
    let [cellIndex, setCellIndex] = useState(0);
    let [showArrows, setShowArrows] = useState(false);
    let arrowsTimeoutRef = useRef(null);

    const handleSliderMouseMove = () => {
        setShowArrows(true)

        if(arrowsTimeoutRef.current) clearTimeout(arrowsTimeoutRef.current)
        arrowsTimeoutRef.current = setTimeout(() => {
            setShowArrows(false)
        }, ARROW_IDLE_TIMEOUT)
    }

    const handleSliderMouseLeave = () => {
        if(arrowsTimeoutRef.current) {
            clearTimeout(arrowsTimeoutRef.current)
            arrowsTimeoutRef.current = null
        }
        setShowArrows(false)
    }

    const clearAdvanceTimer = () => {
        if(advanceTimeoutRef.current) {
            clearTimeout(advanceTimeoutRef.current)
            advanceTimeoutRef.current = null
        }
    }

    const clearResumeTimer = () => {
        if(resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current)
            resumeTimeoutRef.current = null
        }
    }

    const markInteracted = () => {
        hasInteractedRef.current = true
        clearAdvanceTimer()

        // Every fresh interaction pushes this back out, so auto-advance
        // only resumes once the user has actually left the slider alone.
        clearResumeTimer()
        resumeTimeoutRef.current = setTimeout(() => {
            hasInteractedRef.current = false
            scheduleAdvanceForSlide(flickityRef.current?.selectedIndex ?? 0)
        }, RESUME_AUTOPLAY_AFTER)
    }

    // Images advance on a fixed timer. Videos advance themselves (via
    // onEnded, see handleVideoEnded) once they've played fully — this timer
    // only acts as a fallback for them.
    const scheduleAdvanceForSlide = (slideIndex) => {
        clearAdvanceTimer()

        if(hasInteractedRef.current) return

        let item = data?.[slideIndex]
        if(!item) return

        let duration = item.image ? IMAGE_SLIDE_DURATION : VIDEO_SLIDE_FALLBACK_DURATION

        advanceTimeoutRef.current = setTimeout(() => {
            flickityRef.current?.next()
        }, duration)
    }

    const handleVideoEnded = () => {
        clearAdvanceTimer()
        if(hasInteractedRef.current) return
        flickityRef.current?.next()
    }

    let init = () => {
        if(flickityRef.current !== null) return

        flickityRef.current = new Flickity(gallery.current, {
            prevNextButtons: true,
            pageDots: true,
            selectedAttraction: 0.07,
            friction: 0.42,
            cellAlign: "center",
            percentPosition: true,
            wrapAround: true,
            autoPlay: false,
            setGallerySize: true
        })

        flickityRef.current.on('change', (cellIndex) => {
            setCellIndex(cellIndex)
            scheduleAdvanceForSlide(cellIndex)
        })

        flickityRef.current.on('staticClick', (event, pointer, cellElement, cellIndex) => {

            if(pointer.target.className?.baseVal === "no-skip") return
            if(pointer.target.closest?.('.flickity-prev-next-button')) return

            let slideUrl = data?.[cellIndex]?.url

            if(slideUrl) {
                if(/^https?:\/\//i.test(slideUrl)) {
                    window.open(slideUrl, '_blank')
                } else {
                    router.push(slideUrl)
                }
                return
            }

            // Desktop navigates with the prev/next arrow buttons instead of
            // tapping the left/right half of the slide. Mobile (no arrows,
            // per the CSS above) keeps the tap zones.
            if(window.innerWidth > 989) return

            if(event.clientX < window.innerWidth / 2) {
                flickityRef.current.previous()
            } else {
                flickityRef.current.next()
            }
        })

        scheduleAdvanceForSlide(flickityRef.current.selectedIndex || 0)
    }

    const handleVideoReady = () => {
        flickityRef.current?.resize()
    }

    useEffect(() => {
        setTimeout(() => {
            init();
            setTimeout(() => flickityRef.current?.resize(), 100)
        }, 10)

        let galleryEl = gallery.current
        galleryEl?.addEventListener('pointerdown', markInteracted)

        return () => {
            clearAdvanceTimer()
            clearResumeTimer()
            if(arrowsTimeoutRef.current) clearTimeout(arrowsTimeoutRef.current)
            galleryEl?.removeEventListener('pointerdown', markInteracted)
        }
    }, []);

    return (
        <Container showArrows={showArrows} onMouseMove={handleSliderMouseMove} onMouseLeave={handleSliderMouseLeave}>
            <Carousel ref={gallery} aria-live="polite" aria-label="carousel">
                {
                    data?.map((item, index) => {
                        if(item.image === null && item.videoMp4 === null) return
                            return <Slide
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${index + 1} of ${data.length}`}
                                hasUrl={!!item.url}
                                // aria-current={selectedIndex === index ? true : false}
                            >
                                {
                                    (() => {
                                        const slideContent = (
                                            <ColLeft>
                                                {
                                                    item.image ?
                                                    <>
                                                        {item.imageMobile && (
                                                            <MobileOnly><Image data={item.imageMobile} /></MobileOnly>
                                                        )}
                                                        <DesktopOnly hasMobileAlt={!!item.imageMobile}>
                                                            <Image data={item.image} />
                                                        </DesktopOnly>
                                                    </>
                                                    :
                                                    <Video data={item} index={index} cellIndex={cellIndex} slideCount={data.length} onReady={handleVideoReady} onEnded={handleVideoEnded} />
                                                }
                                            </ColLeft>
                                        )

                                        return item.url ?
                                            <Link href={item.url}>{slideContent}</Link>
                                            :
                                            <a>{slideContent}</a>
                                    })()
                                }
                                {/* <ColRight>
                                    <Text><Body content={item.text} /></Text>
                                </ColRight> */}
                            </Slide>                        
                    }
                        )
                }
            </Carousel>
        </Container>
    )
}

