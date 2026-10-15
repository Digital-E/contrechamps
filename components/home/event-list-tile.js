import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Image from "../image"
import Body from "../body"
import DateComponent from "../date-component"
import Link from "../link"
import InclusiviteIcon from '../inclusivite-icon'
import sanitizeTag from "../../lib/sanitizeTag"
import { parseVideoUrl, getYoutubeThumbnail, getEmbedSrc, fetchVimeoThumbnail } from "../../lib/video-embed"

let Tile = styled.div`
    position: relative;
    break-inside: avoid;
    display: inline-block;
    width: 100%;
    margin-bottom: 40px;

    @media(max-width: 600px) {
        margin-bottom: 30px;
    }

    a {
        display: flex;
        flex-direction: column;
        height: 100%;
        color: inherit;
        transition: opacity var(--transition-out);

        :hover {
            opacity: 0.7;
            transition: opacity var(--transition-in);
        }
    }
`

let ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 12px;
`

const VideoThumbImage = styled.img`
    display: block;
    width: 100%;
    height: auto;
`

const VideoIframe = styled.iframe`
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    border: none;
`

// The whole thumbnail is the click target (not just the icon), so this is
// a button wrapping the image rather than a small overlay control.
const VideoThumbButton = styled.button`
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;

    /* Override the global button:hover background (styles/index.css),
       which would otherwise paint over the thumbnail on hover. */
    &:hover {
        background: none !important;
    }
`

// Always-visible (not hover-gated) so touch devices can see it without
// hovering — same reasoning as the gallery badge in video-list-item.js.
// Purely decorative: the click handler lives on VideoThumbButton.
const PlayIcon = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    pointer-events: none;
    background: url('/icons/play.svg') no-repeat center center;
    background-size: contain;
`

// Matches the inline external-link affordance on the presse list
// (components/media/presse/press-list-item.js) — actualités with an
// external link don't get an image, so there's no thumbnail to badge.
// Absolutely positioned against Tile (not the text), bottom-right of the
// whole card. pointer-events: none so it stays purely decorative and
// doesn't block clicks on the underlying tile link.
const LinkOutIcon = styled.img`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 22px;
    height: 22px;
    pointer-events: none;
`

// Shared with ModalBox below, so the date/time there renders
// pixel-identical to the one shown on the tile itself.
const dateMetaStyles = css`
    time, p {
        font-size: 1.2rem;
        line-height: 1;
    }

    .date-meta {
        display: flex;
        align-items: center;
        margin: 0;
        line-height: 1;
    }

    .datetime-left {
        font-family: "Barlow Condensed Bold";
    }

    .datetime-right {
        font-family: "Barlow Condensed Regular";
    }

    .date-meta > p > p:nth-child(2) {
        font-family: "Barlow Condensed Light";
    }

    p {
        display: flex;
        margin: 0;
    }
`

let Meta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    h1, h2, h3, h4, h5, h6 {
        font-family: "Quatorze CC Bold";
        font-size: 1.5rem;
    }

    /* Actualités textVignette content can include h2-styled blocks —
       those should use Barlow Condensed Regular, not Quatorze CC Bold. */
    h2 {
        font-family: "Barlow Condensed Regular";
    }

    ${dateMetaStyles}

    .description {
        margin-top: 5px;
        font-family: "Barlow Condensed Medium";
        font-size: 1.3rem;
        line-height: 1;

        p {
            margin: 0;
        }
    }

    h3 {
    }

    .description * {
        display: inline;
    }
`

const InclusiviteIconWrapper = styled.div`
    margin-top: 8px;
`;

const OccurencesTrigger = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-left: 6px;
    border: 1px solid black;
    border-radius: 999px;
    background: white;
    color: black;
    font-size: 0.9rem;
    line-height: 1;
    padding: 0;
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
        background: black !important;
        color: white;
    }
`

// Shared overlay/modal shell, used both for the "other dates" popup and
// the video player popup below, so they look and behave like one system.
const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`

const ModalBox = styled.div`
    position: relative;
    background: white;
    max-width: 400px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    padding: 30px;

    ${dateMetaStyles}

    h4 {
        font-family: "Quatorze CC Bold";
        font-size: 1.3rem;
        margin: 0 30px 15px 0;
    }

    .date-meta {
        margin-bottom: 10px;
    }
`

const VideoModalBox = styled(ModalBox)`
    max-width: 800px;
    padding: 0;
    overflow: visible;
`

const ModalCloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: none;
    border: none;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    padding: 0;
    opacity: 1;
    transition: opacity var(--transition-out);

    /* Override the global button:hover background/color (styles/index.css)
       — this should just dim the cross on hover, not paint black. */
    &:hover {
        background: none !important;
        color: inherit;
        opacity: 0.5;
        transition: opacity var(--transition-in);
    }
`

// The video modal has no white background behind the close button (the
// iframe fills the box edge-to-edge), so it needs its own backdrop to
// stay legible — same white-circle badge convention used elsewhere.
const VideoModalCloseButton = styled(ModalCloseButton)`
    top: -18px;
    right: -18px;
    width: 36px;
    height: 36px;
    border-radius: 999px;
    background: white !important;
    border: 1px solid black;

    &:hover {
        background: black !important;
        color: white;
        opacity: 1;
    }
`

export default function Component({ data }) {
    let [showOccurences, setShowOccurences] = useState(false)
    let [showVideoModal, setShowVideoModal] = useState(false)
    let [vimeoThumbnail, setVimeoThumbnail] = useState(null)

    let videoInfo = parseVideoUrl(data?.video)

    useEffect(() => {
        let anyModalOpen = showOccurences || showVideoModal
        if(!anyModalOpen) return

        let handleKeydown = (event) => {
            if(event.key === "Escape") {
                setShowOccurences(false)
                setShowVideoModal(false)
            }
        }

        document.addEventListener("keydown", handleKeydown)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", handleKeydown)
            document.body.style.overflow = ""
        }
    }, [showOccurences, showVideoModal])

    useEffect(() => {
        if(videoInfo?.provider !== 'vimeo') return

        let cancelled = false

        fetchVimeoThumbnail(data.video)
            .then((url) => { if(!cancelled) setVimeoThumbnail(url) })
            .catch(() => {})

        return () => { cancelled = true }
    }, [data?.video])

    if (data === null || data === undefined) return null

    let item = data
    let tagClasses = (item.tags || []).map(t => sanitizeTag(t.label)).join(' ')
    let hasOtherOccurences = (item.occurences?.length || 0) > 1
    let videoThumbnailSrc = videoInfo?.provider === 'youtube' ? getYoutubeThumbnail(videoInfo.id) : vimeoThumbnail

    return (
        <Tile className={`event-tile ${tagClasses}`}>
            <Link href={item.externalLink || item.slug}>
                {(item.image || videoInfo) && (
                    <ImageWrapper>
                        {videoInfo ? (
                            <VideoThumbButton
                                type="button"
                                aria-label="Lire la vidéo"
                                onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    setShowVideoModal(true)
                                }}
                            >
                                {videoThumbnailSrc
                                    ? <VideoThumbImage src={videoThumbnailSrc} alt="" />
                                    : <Image data={item.image} />}
                                <PlayIcon aria-hidden="true" />
                            </VideoThumbButton>
                        ) : (
                            <Image data={item.image} />
                        )}
                    </ImageWrapper>
                )}
                <Meta>
                    {item._type === 'post' && item.startdate && (
                        <div className="date-meta">
                            <DateComponent data={item} />
                            {hasOtherOccurences && (
                                <OccurencesTrigger
                                    type="button"
                                    aria-label="Voir les autres dates"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        setShowOccurences(true)
                                    }}
                                >
                                    <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                                        <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </OccurencesTrigger>
                            )}
                        </div>
                    )}
                    {item._type === 'post' ? (
                        <h3>{item.title}</h3>
                    ) : null}
                    {item._type === 'post' && item.description && (
                        <div className="description"><Body content={item.description} /></div>
                    )}
                    {item._type !== 'post' && item.textVignette && (
                        <Body content={item.textVignette} />
                    )}
                    {item.inclusivite && <InclusiviteIconWrapper><InclusiviteIcon /></InclusiviteIconWrapper>}
                </Meta>
            </Link>
            {item._type !== 'post' && item.externalLink && (
                <LinkOutIcon src="/icons/link-out.svg" alt="" />
            )}
            {showOccurences && (
                <ModalOverlay
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setShowOccurences(false)}
                >
                    <ModalBox onClick={(event) => event.stopPropagation()}>
                        <ModalCloseButton
                            type="button"
                            aria-label="Fermer"
                            onClick={() => setShowOccurences(false)}
                        >
                            ×
                        </ModalCloseButton>
                        <h4>{item.title}</h4>
                        {item.occurences.map((occurence, index) => (
                            <div className="date-meta" key={index}>
                                <DateComponent data={occurence} />
                            </div>
                        ))}
                    </ModalBox>
                </ModalOverlay>
            )}
            {showVideoModal && videoInfo && (
                <ModalOverlay
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setShowVideoModal(false)}
                >
                    <VideoModalBox onClick={(event) => event.stopPropagation()}>
                        <VideoModalCloseButton
                            type="button"
                            aria-label="Fermer"
                            onClick={() => setShowVideoModal(false)}
                        >
                            <svg viewBox="0 0 12 12" width="14" height="14" aria-hidden="true">
                                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </VideoModalCloseButton>
                        <VideoIframe
                            src={getEmbedSrc(videoInfo)}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        />
                    </VideoModalBox>
                </ModalOverlay>
            )}
        </Tile>
    )
}
