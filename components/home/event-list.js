import styled from 'styled-components'

import EventListTile from "./event-list-tile"

let Container = styled.div``

let Header = styled.div`
    position: relative;

    > span {
        font-size: 14vw;
        margin: 0;
        line-height: 1;
    }
`
let List = styled.div``




export default function Component({ data, title }) {

    return (
        <Container>
            <Header className="border-top border-bottom"><span className="h1">{title}</span></Header>
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