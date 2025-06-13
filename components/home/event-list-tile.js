import styled from 'styled-components'
import Image from "../image"
import Body from "../body"
import DateComponent from "../date-component"
import Video from "../video"

import sanitizeTag from "../../lib/sanitizeTag"

import Link from "../link"

import InclusiviteIcon from '../inclusivite-icon'



let ListItem = styled.div`
    position: relative;
    flex-basis: 33.3333%;


    > a {
        display: flex;
        flex-direction: column;
        padding: 15px 20px;
        opacity: 1;
        height: 100%;
    
        > div {
            flex-basis: auto;
        }
    
        transition: var(--transition-out);
    
        :hover {
            background: var(${props => (props.backgroundColor)});
            transition: var(--transition-in);
            cursor: pointer;
            color: black;
        }

        :hover .image-overlay {
            opacity: 0.6;
            transition: var(--transition-in);
        }

        :hover svg path {
            fill: black;
        }
    }

    @media(max-width: 1200px) {
        flex-basis: 50%;

        > a {
            flex-direction: column;
        }
    }

    @media(max-width: 992px) {
        flex-basis: 100%;

        > a > div {
            flex-basis: auto;
        }     
            
        background: var(${props => (props.backgroundColor)});
    }
`

let ColLeft = styled.div`
    position: relative;
    height: calc(33.3333vw * 0.5);
    min-height: calc(33.3333vw * 0.5);

    > div, > span, > a > div, > a > span {
        height: 100% !important;
    }

    img {
        object-fit: cover;
    }

    @media(max-width: 1200px) {
        height: calc(50vw * 0.5);
        min-height: calc(50vw * 0.5);
    }

    @media(max-width: 992px) {
        height: calc(100vw * 0.5);
        min-height: calc(100vw * 0.5);
    }
`

let ColRight = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    height: 100%;
    margin-top: 15px;

    > a {
        height: 100%;
        display: flex;
        flex-direction: column;        
    }

    > a:hover {
        color: black !important;
    }    

    > a > h1 {
        margin-bottom: 40px;
    }

    > a > div:nth-child(2) {
        margin-top: auto;
        display: flex;
    }

    > a > div:nth-child(2) .p, > a > div:nth-child(2) p {
        margin: 0;
    }

    > a > div:nth-child(2) > div:nth-child(1) {
        display: flex;
        flex-basis: 40%;
    }

    > a > div:nth-child(2) > div:nth-child(1) > div {
        margin-top: auto;
    }

    > a > div:nth-child(2) > div:nth-child(2) {
        flex-basis: 60%;
    }

    @media(max-width: 1200px) {
        padding: 0;
        margin-top: 15px;

        > a > h1 {
            margin-bottom: 20px;
        }
    }
`

const Location = styled.div`
    * {
        font-size: inherit;
        margin: 0;
        line-height: 1.2;
    }
`

const Vignette = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 300px;
}
`

const InclusiviteIconContainer = styled.div`
    margin-top: 5px !important;
`

const InclusiviteIconContainerVignette = styled.div`
    margin-top: auto !important;
`

const Pastille = styled.div`
    display: ${props => props.backgroundColor === "--gray" && "none" };
    width: 13px;
    height: 13px;
    min-width: 13px;
    min-height: 13px;
    border: 1px solid black;
    background: white;
    border-radius: 999px;
    margin-bottom: 5px;
    background: var(${props => (props.backgroundColor)});
`

const ImageOverlay = styled.div`
    position: absolute;
    transition: var(--transition-out);
    z-index: 1;
    opacity: 0;    
    height: 100%;
    width: 100%;
    background: var(${props => (props.backgroundColor !== "--gray" && props.backgroundColor)});
`



export default function Component({ data, isVideo }) {

    if(data === null) return null

    let item = data;

    let tags = [];

    item.tags?.forEach(item => {
        let itemSanitized = sanitizeTag(item.label);
        tags.push(itemSanitized)
    })

    tags = tags.join(" ");

    const backgroundColorFunc = (item) => {

        let colorVar = "--gray";

        item.tags.forEach(item => {
            if(item.label === "Abonnement") {
                colorVar = "--orange"
            } else if (item.label === "Tournée") {
                colorVar = "--blue"
            } else if (item.label === "Tout Public") {
                colorVar = "--green"
            }
        })

        return colorVar
    }


    return (
    <ListItem key={item._id} className={`border-bottom event-tile ${tags}`} backgroundColor={backgroundColorFunc(item)}>
        <a>
            {
                (item.image === 'post' || item.image !== null || item.video !== null) ?
                <ColLeft>
                <ImageOverlay className="image-overlay" backgroundColor={backgroundColorFunc(item)} />
                {
                    item.video ?
                    <Video data={item?.video} />
                    :
                    <Link href={item.slug}>
                        <Image data={item.image} />
                    </Link>
                }
                </ColLeft>
                :
                null
            }
            <ColRight>
                <Link href={item.slug}>
                {
                item._type === 'post' ?
                    <>
                        <h1>
                            {item.title}
                        </h1>
                        <div>
                            <div>
                                <div className={`p home-tile-date force-courier ${item.location === null ? 'hide-tile-date force-courier' : ''}`}>
                                    <Pastille backgroundColor={backgroundColorFunc(item)} />
                                    <DateComponent data={item} />
                                    {
                                        item.inclusivite && 
                                        <InclusiviteIconContainer>
                                            <InclusiviteIcon />
                                        </InclusiviteIconContainer>
                                    }
                                </div>
                                <div>

                                </div>
                            </div>
                            <Location className="p force-courier">
                                <div><Body content={item.location} /></div>
                            </Location>
                        </div>
                    </>
                    :
                    <Vignette>
                        <Body content={item.textVignette} />
                        {
                            item.inclusivite && 
                            <InclusiviteIconContainerVignette>
                                <InclusiviteIcon />
                            </InclusiviteIconContainerVignette>  
                        }                      
                    </Vignette>
                }
                </Link>
            </ColRight>
        </a>
    </ListItem>
    )
}