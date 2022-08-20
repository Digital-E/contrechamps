import styled from "styled-components"

import Link from "../../link"

import Body from "../../body"

import Button from "../../button"

const Container = styled.div`
    position: relative;

    > a {
        display: block;
        opacity: 1;
        padding: 20px;

    
        transition: var(--transition-out);
    
        :hover {
            background: black;
            transition: var(--transition-in);
            cursor: pointer;
        }
    
        :hover {
            color: white;
        }

        .button {
            transition: border var(--transition-out);
        }

        :hover .button {
            border: 1px solid black;
            transition: border var(--transition-in);
        }

        .button a:hover {
            color: inherit;
        }
    }
`

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-end;

@media(max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;

    .button {
        margin-top: 25px;
    }
}
`


const Text = styled.div`
* {
    line-height: 1;
    margin: 10px 0;
}
`


export default function Component({ data }) {

    return (
        <Container className="border-top media-item">
            <Link href={data.slug}>
                <Wrapper>
                    <Text><Body content={data.text} /></Text>
                    <Button url={data.link} label={data.linkLabel} />
                </Wrapper>
            </Link>
        </Container>
    )
}