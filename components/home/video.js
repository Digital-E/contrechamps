import { useEffect } from "react"
import styled from 'styled-components'
import Body from "../body"
import Video from "../video"

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

    useEffect(() => {
        const player = new Plyr('#player');
    },[]);

    return data?.video !== null ?
    <Container className="border-bottom">
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