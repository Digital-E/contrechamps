import styled from 'styled-components'

import EventListTile from "./event-list-tile"

let Container = styled.div`
    > div:last-child > div:last-child::after   {
        display: none !important;
    }
`

let Header = styled.div`
    position: relative;
    padding: 20px;

    > span {
        font-size: 12vw;
    }

    @media(min-width: 768px) {
        padding: 0 20px;

        > span {
            font-size: 12vw;
            margin: 0;
            line-height: 1;
            text-align: center;
        }
    }

    @media(min-width: 1500px) {
        > span {
            font-size: 208px;
        }
    }
    
`
let List = styled.div`
    .hide-tile {
        display: none !important;
    }
`




export default function Component({ data, title }) {

    return (
        <Container>
            {/* <Header className="border-bottom"><span className="h1">{title}</span></Header> */}
            <List>
                {
                    data?.map(item => (
                        <EventListTile data={item} />
                    ))
                }
            </List>
        </Container>
    )
}