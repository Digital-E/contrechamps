import styled from "styled-components"

import Date from "../../date"
import Body from "../../body"

const Container = styled.div`
    position: relative;

    > a {
        display: block;
        opacity: 1;
        padding: 20px;

    
        transition: var(--transition-out);
    
        :hover {
            background: var(--gray);
            transition: var(--transition-in);
            cursor: pointer;
        }
    
        :hover {
            color: black;
        }
    }
`

const RowTop = styled.div`
    display: flex;
    margin-bottom: 20px;

    > div {
        flex-basis: 50%;
    }
`

const Text = styled.div`
    * {
        line-height: 1;
        margin: 0 0 10px 0;
    }
`


export default function Component({ data }) {

    return (
        <Container className="border-top media-item">
            <a href={data.pressLink || data.documentURL} target="_blank">
                <RowTop className="p media-item__text force-courier">
                    <div>
                        <Date dateString={data.date} withYear={true} />
                    </div>
                    <div className="p">
                        {data.pressLinkLabel}
                    </div>
                </RowTop>
                <Text className="media-item__text force-courier-all"><Body content={data.text} /></Text>
            </a>
        </Container>
    )
}