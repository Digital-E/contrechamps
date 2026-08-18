import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Image from "../image"
import Body from "../body"
import DateComponent from "../date-component"
import Link from "../link"
import InclusiviteIcon from '../inclusivite-icon'
import sanitizeTag from "../../lib/sanitizeTag"

let Tile = styled.div`
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
    width: 100%;
    margin-bottom: 12px;
`

// Shared with OccurencesModal below, so the date/time there renders
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

const OccurencesOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`

const OccurencesModal = styled.div`
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

const OccurencesCloseButton = styled.button`
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

export default function Component({ data }) {
    let [showOccurences, setShowOccurences] = useState(false)

    useEffect(() => {
        if(!showOccurences) return

        let handleKeydown = (event) => {
            if(event.key === "Escape") setShowOccurences(false)
        }

        document.addEventListener("keydown", handleKeydown)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", handleKeydown)
            document.body.style.overflow = ""
        }
    }, [showOccurences])

    if (data === null || data === undefined) return null

    let item = data
    let tagClasses = (item.tags || []).map(t => sanitizeTag(t.label)).join(' ')
    let hasOtherOccurences = (item.occurences?.length || 0) > 1

    return (
        <Tile className={`event-tile ${tagClasses}`}>
            <Link href={item.slug}>
                {item.image && (
                    <ImageWrapper>
                        <Image data={item.image} />
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
            {showOccurences && (
                <OccurencesOverlay
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setShowOccurences(false)}
                >
                    <OccurencesModal onClick={(event) => event.stopPropagation()}>
                        <OccurencesCloseButton
                            type="button"
                            aria-label="Fermer"
                            onClick={() => setShowOccurences(false)}
                        >
                            ×
                        </OccurencesCloseButton>
                        <h4>{item.title}</h4>
                        {item.occurences.map((occurence, index) => (
                            <div className="date-meta" key={index}>
                                <DateComponent data={occurence} />
                            </div>
                        ))}
                    </OccurencesModal>
                </OccurencesOverlay>
            )}
        </Tile>
    )
}
