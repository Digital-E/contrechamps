import { useEffect, useState } from 'react'

import styled from 'styled-components'

import Plyr from 'plyr';

import EventListTile from "./event-list-tile"

let Container = styled.div``

let Header = styled.div`
    position: relative;
    padding: 20px;

    @media(min-width: 768px) {
        padding: 0 20px;

        > span {
            font-size: 6rem;
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

    .hide-tile-date {
        display: none;
    }
`




export default function Component({ data, title, videoData }) {
    let [allEvents, setAllEvents] = useState([])
    let [featured, setFeatured] = useState([])

    useEffect(() => {
        setTimeout(() => {
            const player = new Plyr('.player');
        }, 10)

        let featuredArray = [];

        let newData = data.map(item => {
            if(item.featured) {
                featuredArray.push(item)
                return null
            }

            return item
        })

        setFeatured(featuredArray)

        setAllEvents(newData)
    }, [data])

    return (
        <Container>
            <List>
                {
                    featured.map(item => (
                        <EventListTile data={item} />
                    ))
                }                
                {
                    allEvents.map(item => (
                        <EventListTile data={item} />
                    ))
                }
            </List>
        </Container>
    )
}