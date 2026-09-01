import styled from "styled-components"
import Image from "../../image"
import Link from "../../link"

const Thumbnail = styled.div`
    position: relative;

    > span > span {
        padding-top: 56.25% !important;
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    ::after {
        display: ${props => props.isPhoto ? 'none' : 'block'};
        content: '';
        position: absolute;
        opacity: 0;
        background: url('/icons/play.svg') no-repeat center center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        pointer-events: none;
        transition: var(--transition-out);
    }
`

const Container = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 40px;

    @media(max-width: 600px) {
        margin-bottom: 30px;
    }

    > a {
        color: inherit;
    }


    > a > div:nth-child(1) {
        background: white;
    }

    > a img {
        transition: var(--transition-out);
    }

    /* Lighten the image on hover, matching the home tiles: the thumbnail
       sits on white, so dropping the image's opacity fades it toward white. */
    > a:hover img {
        opacity: 0.7;
        transition: var(--transition-in);
    }

    :hover ${Thumbnail}::after {
        opacity: 1;
        transition: var(--transition-in);
    }
`

const Text = styled.div`
    font-family: "Barlow Condensed Medium";
    font-size: 1.3rem;
    margin-top: 5px;

    * {
        line-height: 1;
    }
`

// Always-visible (not hover-gated, unlike the play icon) so touch devices
// can see it too — signals this photo tile opens a gallery of images
// rather than a single one.
const GalleryBadge = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: 1px solid black;
    border-radius: 999px;
    background: white;
    color: black;

    svg {
        display: block;
    }
`


export default function Component({ data, isPhoto }) {

    return (
        <Container className="force-courier">
            <Link href={data.slug?.current || data.slug}>
                <Thumbnail isPhoto={isPhoto}>
                    <Image data={data.image} />
                    {isPhoto && data.hasGallery && (
                        <GalleryBadge aria-hidden="true">
                            <svg viewBox="0 0 16 16" width="10" height="10">
                                <rect x="1" y="1" width="9" height="9" rx="1" fill="white" stroke="currentColor" strokeWidth="1.3" />
                                <rect x="6" y="6" width="9" height="9" rx="1" fill="white" stroke="currentColor" strokeWidth="1.3" />
                            </svg>
                        </GalleryBadge>
                    )}
                </Thumbnail>
                <Text className="p">{data.title}</Text>
            </Link>
        </Container>
    )
}