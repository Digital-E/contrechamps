import { useEffect } from "react"
import styled from 'styled-components'
import Body from "../body"
import Video from "../video"

import Plyr from 'plyr';


let Container = styled.div`
    position: relative;

    .plyr--full-ui input[type=range] {
        color: white !important;
    }

    .plyr--video .plyr__control.plyr__tab-focus, .plyr--video .plyr__control:hover, .plyr--video .plyr__control[aria-expanded=true] {
        background: red !important;
    }
    }
`

let Header = styled.div`
    position: relative;
    padding: 20px;
    margin-bottom: 15px;
    
    > span {
        font-size: 13vw;
    }

    @media(min-width: 768px) {
        padding: 0 20px;

        > span {
            font-size: 13.8vw;
            margin: 0;
            text-align: center;
        }
    }
`

let Information = styled.div`
    display: flex;
    padding: 20px 20px 10px 20px;

    > div {
        flex-basis: 50%;
    }

    > div * {
        margin: 0;
    }

    @media(max-width: 767px) {
        > div:nth-child(2) {
            display: flex;
            justify-content: flex-end;
        } 
    }
`

let VideoWrapper = styled.div`
    padding: 0 20px;
`




export default function Component({ data, title }) {

    useEffect(() => {
        const player = new Plyr('#player');
    },[]);

    return data?.video !== null ?
    <Container>
        <Header className="border-bottom"><span className="h1">{title}</span></Header>
        <VideoWrapper>
            <Video data={data?.video} />
        </VideoWrapper>
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