import styled from 'styled-components'
import Image from "../image"
import Body from "../post-body"

let Container = styled.div``

let Header = styled.div`
    border-top: 1px solid black;
    border-bottom: 1px solid black;

    > span {
        font-size: 13.5vw;
        margin: 0;
        line-height: 1;
    }
`
let List = styled.div``

let ListItem = styled.div`
    display: flex;

    > div {
        flex-basis: 50%;
    }
`

let ColLeft = styled.div``

let ColRight = styled.div``


export default function Component({ data }) {
    console.log(data)
    return (
        <Container>
            <Header><span className="h1">Prochainement</span></Header>
            <List>
                {
                    data?.map(item => (
                        <ListItem key={item._id}>
                            <ColLeft>
                                <Image data={item.image} />
                            </ColLeft>
                            <ColRight>
                                <div>{item.title}</div>
                                <div>
                                    <div>
                                        <div>{item.startdate} – {item.enddate}</div>
                                        <div>10:00</div>
                                    </div>
                                    <div>
                                        <div><Body content={item.location} /></div>
                                    </div>
                                </div>
                            </ColRight>
                        </ListItem>
                    ))
                }
            </List>
        </Container>
    )
}