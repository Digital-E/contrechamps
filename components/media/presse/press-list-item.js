import styled from "styled-components"

import Date from "../../date"
import Body from "../../body"

const Container = styled.div`
    position: relative;

    > a {
        display: block;
        opacity: 1;
        padding: 0 40px 10px 40px;

        @media(max-width: 767px) {
            padding: 0 20px 10px 20px;
        }

    
        transition: var(--transition-out);
    
        :hover {
            background: rgb(237, 237, 237);
            transition: var(--transition-in);
            cursor: pointer;
        }
    
        :hover {
            color: black;
        }
    }
`

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`

const RowTop = styled.div`
    margin-bottom: 5px;

    * {
        font-family: "Barlow Condensed Regular";
        font-size: 1.3rem;
    }
`

const Text = styled.div`
    * {
        font-family: "Barlow Condensed Medium";
        line-height: 1;
        margin: 0 0 5px 0;
    }

    > *:first-child {
        font-size: 28px;
    }

    > *:first-child ~ * {
        font-size: 20px;
    }
`

const LinkOutIcon = styled.img`
    width: 22px;
    height: 22px;
    flex-shrink: 0;
`


export default function Component({ data }) {

    return (
        <Container className="media-item">
            <a href={data.pressLink || data.documentURL} target="_blank">
                <Row>
                    <div>
                        <RowTop className="p media-item__text force-courier">
                            <Date dateString={data.date} withYear={true} />
                        </RowTop>
                        <Text className="media-item__text"><Body content={data.text} /></Text>
                    </div>
                    <LinkOutIcon src="/icons/link-out.svg" alt="" />
                </Row>
            </a>
        </Container>
    )
}