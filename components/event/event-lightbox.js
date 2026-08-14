import { createContext, useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Keyboard, Zoom, Thumbs } from "swiper/modules"

import { urlForImage } from "../../lib/sanity"

const LightboxContext = createContext(null)

export function useLightbox() {
    return useContext(LightboxContext)
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.92);

    .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .swiper-zoom-container img {
        max-width: 90vw;
        max-height: 85vh;
        width: auto;
        height: auto;
        object-fit: contain;
    }

    .swiper-button-next, .swiper-button-prev {
        color: white;
    }

    figure {
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    figcaption {
        color: white;
        font-family: "Barlow Condensed Medium";
        font-size: 1.1rem;
        margin-top: 15px;
        text-align: center;
    }

    @media(max-width: 767px) {
        .swiper-button-next, .swiper-button-prev {
            display: none;
        }
    }
`

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const MainSwiperArea = styled.div`
    flex: 1;
    min-height: 0;

    .swiper {
        width: 100%;
        height: 100%;
    }
`

const ThumbsSwiperArea = styled.div`
    flex-shrink: 0;
    height: 90px;
    padding: 10px 20px;
    box-sizing: border-box;

    /* Swiper's own base CSS already centers .swiper with auto margins —
       forcing it to width:100% (as we do for the main gallery swiper)
       defeats that, since a full-width, un-centered flex row just sits at
       one edge whenever it doesn't have enough thumbnails to fill it.
       Shrinking to content width (capped at the strip's width) lets that
       built-in centering take over, and Swiper's own horizontal
       scrolling still works normally once there are enough thumbnails to
       hit the cap. */
    .swiper {
        width: fit-content;
        max-width: 100%;
        height: 100%;
    }

    .swiper-slide {
        width: 90px;
        height: 100%;
        opacity: 0.5;
        cursor: pointer;
        transition: opacity var(--transition-out);
    }

    .swiper-slide:hover {
        opacity: 0.8;
        transition: opacity var(--transition-in);
    }

    .swiper-slide-thumb-active {
        opacity: 1;
        outline: 2px solid white;
        outline-offset: -2px;
    }

    .swiper-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media(max-width: 767px) {
        display: none;
    }
`

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2;
    background: transparent;
    border: none;
    color: white;
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
    padding: 10px;
`

export default function LightboxProvider({ images = [], children }) {
    let [activeIndex, setActiveIndex] = useState(null)
    let [thumbsSwiper, setThumbsSwiper] = useState(null)

    let openLightbox = (image) => {
        let index = images.findIndex((item) => item._key === image?._key)
        setActiveIndex(index > -1 ? index : 0)
    }

    let closeLightbox = () => setActiveIndex(null)

    useEffect(() => {
        if(activeIndex === null) return

        let handleKeydown = (event) => {
            if(event.key === "Escape") closeLightbox()
        }

        document.addEventListener("keydown", handleKeydown)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", handleKeydown)
            document.body.style.overflow = ""
        }
    }, [activeIndex])

    return (
        <LightboxContext.Provider value={{ openLightbox }}>
            {children}
            {activeIndex !== null && (
                <Overlay role="dialog" aria-modal="true" onClick={closeLightbox}>
                    <CloseButton onClick={closeLightbox} aria-label="Fermer">×</CloseButton>
                    <Content onClick={(event) => event.stopPropagation()}>
                        <MainSwiperArea>
                            <Swiper
                                modules={[Navigation, Keyboard, Zoom, Thumbs]}
                                navigation
                                keyboard={{ enabled: true }}
                                zoom
                                loop={images.length > 1}
                                initialSlide={activeIndex}
                                thumbs={{ swiper: thumbsSwiper }}
                            >
                                {images.map((image) => (
                                    <SwiperSlide key={image._key}>
                                        <figure>
                                            <div className="swiper-zoom-container">
                                                <img src={urlForImage(image).width(1600).url()} alt={image.caption || ""} />
                                            </div>
                                            {image.caption && <figcaption>{image.caption}</figcaption>}
                                        </figure>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </MainSwiperArea>
                        {images.length > 1 && (
                            <ThumbsSwiperArea>
                                <Swiper
                                    modules={[Thumbs]}
                                    onSwiper={setThumbsSwiper}
                                    watchSlidesProgress
                                    slidesPerView="auto"
                                    spaceBetween={10}
                                >
                                    {images.map((image) => (
                                        <SwiperSlide key={image._key}>
                                            <img src={urlForImage(image).width(160).height(120).fit('crop').url()} alt="" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </ThumbsSwiperArea>
                        )}
                    </Content>
                </Overlay>
            )}
        </LightboxContext.Provider>
    )
}
