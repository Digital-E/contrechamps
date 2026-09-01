import styled from "styled-components"

import Image from "../../image"
import Link from "../../link"

const Thumbnail = styled.div`
    position: relative;

    > span > span {
        padding-top: 100% !important;
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
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
`

const Text = styled.div`
    font-family: "Barlow Condensed Medium";
    font-size: 1.3rem;
    margin-top: 5px;

    * {
        line-height: 1;
    }
`


export default function Component({ data }) {

    return (
        <Container className="force-courier">
            <Link href={data.slug?.current || data.slug}>
                <Thumbnail>
                    <Image data={data.image} />
                </Thumbnail>
                {data.title && <Text className="p">{data.title}</Text>}
            </Link>
        </Container>
    )
}
