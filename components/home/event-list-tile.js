import styled from 'styled-components'
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

let Meta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    h1, h2, h3, h4, h5, h6 {
        font-family: "Quatorze CC Bold";
        font-size: 1.5rem;
    }

    time,p {
        font-family: "Barlow Condensed Medium";
        font-size: 1.3rem;
        line-height: 1;
    }

    .date-meta {
        margin: 0;
        line-height: 1;
    }

    .date-meta > p > pnth-child(2) {
        font-family: "Barlow Condensed Light";
    }
    
    // .date-meta > p > time:nth-child(3), .date-meta > p > time:nth-child(4) {
    //     font-family: "Barlow Condensed Regular";
    // }

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

    p {
        display: flex;
        margin: 0;
    }
`

const InclusiviteIconWrapper = styled.div`
    margin-top: 8px;
`;

export default function Component({ data }) {
    if (data === null || data === undefined) return null

    let item = data
    let tagClasses = (item.tags || []).map(t => sanitizeTag(t.label)).join(' ')

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
        </Tile>
    )
}
