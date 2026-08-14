import styled from "styled-components"

import Image from "../image"
import { useLightbox } from "./event-lightbox"

const Trigger = styled.button`
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    text-align: inherit;
    cursor: pointer;

    /* Override the global button:hover background/color (styles/index.css)
       — this button should just dim its image on hover, not paint black
       or turn the caption white. */
    &:hover {
        background: none !important;
        color: inherit;
    }

    img {
        transition: opacity var(--transition-out);
    }

    &:hover img {
        opacity: 0.7;
        transition: opacity var(--transition-in);
    }
`

export default function LightboxImage({ data, hasCaption }) {
    let lightbox = useLightbox()

    if(!lightbox) return <Image data={data} hasCaption={hasCaption} />

    return (
        <Trigger type="button" onClick={() => lightbox.openLightbox(data)} aria-label="Agrandir l'image">
            <Image data={data} hasCaption={hasCaption} />
        </Trigger>
    )
}
