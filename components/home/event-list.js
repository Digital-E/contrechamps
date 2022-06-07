import { useEffect } from 'react'

import styled from 'styled-components'

import Plyr from 'plyr';

import EventListTile from "./event-list-tile"

let Container = styled.div``

let Header = styled.div`
    position: relative;
    padding: 20px;

    > span {
        font-size: 6rem;
    }

    @media(min-width: 768px) {
        padding: 0 20px;

        > span {
            line-height: 1.2;
        }
    }
    
`
let List = styled.div`
    display: flex;
    flex-wrap: wrap;

    .hide-tile {
        display: none !important;
    }
`




export default function Component({ data, title, videoData }) {

    useEffect(() => {
        const player = new Plyr('.player');
    }, []);

    console.log(videoData)

    return (
        <Container>
            <Header className="border-bottom border-top"><span className="h1">{title}</span></Header>
            <List>
                {
                    (videoData?.video !== null && videoData !== undefined) && <EventListTile data={videoData} isVideo={true} />
                }
                {
                    data?.map(item => (
                        <EventListTile data={item} />
                    ))
                }
            </List>
        </Container>
    )
}