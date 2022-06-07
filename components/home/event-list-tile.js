import styled from 'styled-components'
import Image from "../image"
import Body from "../body"
import DateComponent from "../date-component"

import sanitizeTag from "../../lib/sanitizeTag"

import Link from "../link"


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
            background: black;
            transition: var(--transition-in);
            cursor: pointer;
        }
    
        :hover {
            color: white;
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
    }

    @media(max-width: 992px) {
        > a > div {
            flex-basis: auto;
        }
    }
`

let ColLeft = styled.div`
    height: calc(33.3333vw * 0.5);
    min-height: calc(33.3333vw * 0.5);

    > span {
        height: 100% !important;
        width: 100% !important;
        object-fit: cover;
        // position: absolute !important;
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

    > h1 {
        margin-bottom: 40px;
    }

    > div:nth-child(2) {
        margin-top: auto;
        display: flex;
    }

    > div:nth-child(2) > div * {
        margin: 0;
    }

    > div:nth-child(2) > div:nth-child(1) {
        flex-basis: 40%;
    }

    > div:nth-child(2) > div:nth-child(2) {
        flex-basis: 60%;
    }

    @media(max-width: 1200px) {
        padding: 0;
        margin-top: 15px;

        > h1 {
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



export default function Component({ data }) {

    let item = data;

    let tags = [];

    item.tags?.forEach(item => {
        let itemSanitized = sanitizeTag(item.label);
        tags.push(itemSanitized)
    })

    tags = tags.join(" ");

    return (
    <ListItem key={item._id} className={`border-bottom event-tile ${tags}`}>
        <Link href={item.slug}>
            <ColLeft>
                <Image data={item.image} />
            </ColLeft>
            <ColRight>
                <h1>{item.title}</h1>
                <div>
                    <div>
                        <div className="h4">
                            <DateComponent data={item} />
                        </div>
                        <div>

                        </div>
                    </div>
                    <Location className="h4">
                        <div><Body content={item.location} /></div>
                    </Location>
                </div>
            </ColRight>
        </Link>
    </ListItem>
    )
}