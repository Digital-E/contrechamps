import styled from "styled-components"
import Image from "../image"

const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`

const LogoItem = styled.a`
    display: block;
    width: calc(25% - 15px);
    height: 100px;
    position: relative;
    transition: opacity var(--transition-out);

    > span {
        position: absolute !important;
        inset: 0 !important;
        padding: 0 !important;
    }

    img {
        object-fit: contain !important;
        width: 100% !important;
        height: 100% !important;
    }

    :hover {
        opacity: 0.6;
        transition: opacity var(--transition-in);
    }

    @media(max-width: 990px) {
        width: calc(33.333% - 14px);
    }

    @media(max-width: 600px) {
        width: calc(50% - 10px);
    }
`

export default function LogoGrid({ data }) {
    if (!data?.logos?.length) return null

    return (
        <Grid>
            {data.logos.map((item, i) => (
                <LogoItem
                    key={item._key || i}
                    href={item.url || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {item.image?.asset && <Image data={item.image} />}
                </LogoItem>
            ))}
        </Grid>
    )
}
