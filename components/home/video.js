import { useEffect } from "react"
import styled from 'styled-components'
import Body from "../body"
import Video from "../video"

import Plyr from 'plyr';


let Container = styled.div`
    position: relative;
    padding: 20px 20px 10px 20px;

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

    > span {
        font-size: 14vw;
        margin: 0;
        line-height: 1;
    }
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



export default function Component({ data, title }) {

    useEffect(() => {
        const player = new Plyr('#player');
    },[]);

    return data?.video !== null ?
    <Container className="border-bottom">
        <Header><span className="h1">{title}</span></Header>
        <Video data={data?.video} />
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