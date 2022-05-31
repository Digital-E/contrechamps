import { useEffect } from 'react'
import styled from 'styled-components'
import Body from "../body"
import Video from "../video"
import Plyr from 'plyr';

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

let ListItem = styled.div`
    position: relative;

    display: flex;
    padding: 15px 20px;
    opacity: 1;

    > div {
        flex-basis: 50%;
    }

    transition: var(--transition-out);

    :hover {
        background: black;
        transition: var(--transition-in);
    }

    :hover {
        color: white;
    }


    @media(max-width: 1200px) {
        flex-direction: column;
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

    @media(max-width: 1200px) {
        padding: 0;
        margin-top: 15px;

        > h1 {
            margin-bottom: 20px;
        }
    }
`

const Location = styled.div`
    * {
        font-size: inherit;
        margin: 0;
        line-height: 1.2;
    }
`



export default function Component({ data, title }) {

    let item = data;


    useEffect(() => {
        const player = new Plyr('.player');
    },[]);


    return item?.video !== null ? (
    <>
    <Header className="border-bottom border-top"><span className="h1">{title}</span></Header>
    <ListItem key={item?._id} className="border-bottom">
            <ColLeft>
                <Video data={item?.video} />
            </ColLeft>
            <ColRight>
                <h1>{item?.title}</h1>
                <div>
                    <div>
                        <div className="h4">
                            <Body content={item?.textfieldone} />
                        </div>
                        <div>

                        </div>
                    </div>
                    <Location className="h4">
                        <div><Body content={item?.textfieldtwo} /></div>
                    </Location>
                </div>
            </ColRight>
    </ListItem>
    </>
    )
    :
    null
}