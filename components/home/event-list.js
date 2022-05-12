import styled from 'styled-components'
import Image from "../image"
import Body from "../body"
import DateComponent from "../date-component"

import Link from "../link"

let Container = styled.div``

let Header = styled.div`
    position: relative;

    > span {
        font-size: 13.5vw;
        margin: 0;
        line-height: 1;
    }
`
let List = styled.div``

let ListItem = styled.div`
    position: relative;

    > a {
        display: flex;
        padding: 10px 20px;
        opacity: 1;
    
        > div {
            flex-basis: 50%;
        }
    
        transition: var(--transition-out);
    
        :hover {
            background: black;
            transition: var(--transition-in);
            cursor: pointer;
        }
    
        :hover {
            color: white;
        }
    }
`

let ColLeft = styled.div``

let ColRight = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;

    > div:nth-child(2) {
        margin-top: auto;
        display: flex;
    }

    > div:nth-child(2) > div * {
        margin: 0;
    }

    > div:nth-child(2) > div:nth-child(1) {
        flex-basis: 40%;
    }

    > div:nth-child(2) > div:nth-child(2) {
        flex-basis: 60%;
    }
`


export default function Component({ data, title }) {

    return (
        <Container>
            <Header className="border-top border-bottom"><span className="h1">{title}</span></Header>
            <List>
                {
                    data?.map(item => (
                        <ListItem key={item._id} className="border-bottom">
                            <Link href={item.slug}>
                                <ColLeft>
                                    <Image data={item.image} />
                                </ColLeft>
                                <ColRight>
                                    <div>{item.title}</div>
                                    <div>
                                        <div>
                                            <div>
                                                <DateComponent data={item} />
                                            </div>
                                            <div>

                                            </div>
                                        </div>
                                        <div>
                                            <div><Body content={item.location} /></div>
                                        </div>
                                    </div>
                                </ColRight>
                            </Link>
                        </ListItem>
                    ))
                }
            </List>
        </Container>
    )
}