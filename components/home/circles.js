import { useEffect, useState, useRef } from "react"
import styled from "styled-components"

import Orb from "./orb"

import _ from "lodash"

const Container = styled.div`
    position: relative;
    z-index: 0;

    @media(min-width: 1200px) {
        height: 24vw;
        margin-top: -3vw;
    }

    > div {
        position: relative;
        height: 25vw;
        width: 100%;
        display: flex;
        z-index: 999;
    }

    @media(min-width: 1800px) {
        height: fit-content;

        > div {
            height: calc(1800px / 4);
        }
    }

    @media(max-width: 1199px) {

        > div {
            width: fit-content;
            height: auto;
            flex-wrap: wrap;
        }

        margin-top: -7vw;
    }

    -ms-overflow-style: none;

    overflow: -moz-scrollbars-none;

    ::-webkit-scrollbar {
        display: none;
    }
`



export default ({ data }) => {

    let [allOrbs, setAllOrbs] = useState([]);

    useEffect(() => {
        let shuffleOrbs = _.shuffle(data)
        let fourOrbs = shuffleOrbs.splice(0,4);
        
        setAllOrbs([...fourOrbs]);
    }, []);

    return (
        <Container className="circles-container">
            <div>
                {allOrbs.map(item => <Orb key={item._key} data={item} />)}
            </div>
        </Container>
    )
}