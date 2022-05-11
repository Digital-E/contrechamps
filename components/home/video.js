import { useEffect } from "react"
import styled from 'styled-components'
import Body from "../post-body"

import Plyr from 'plyr';


let Container = styled.div`
    position: relative;
    padding: 20px 20px 10px 20px;
`

let Information = styled.div`
    display: flex;
    padding-top: 20px;

    > div {
        flex-basis: 50%;
    }

    > div * {
        margin: 0;
    }
`



export default function Component({ data }) {

    let videoId = data?.video;

    useEffect(() => {
        const player = new Plyr('#player');
    },[]);

    return videoId !== null ?
    <Container className="border-bottom">
        <div class="plyr__video-embed" id="player">
            <iframe
            src={`https://player.vimeo.com/video/${videoId}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`}
            allowfullscreen
            allowtransparency
            allow="autoplay"
            ></iframe>
        </div>
        <Information>
            <div>
                <Body content={data?.textfieldone} />
            </div>
            <div>
                <Body content={data?.textfieldtwo} />
            </div>
        </Information>            
    </Container>
    :
    null
}