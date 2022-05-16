import styled from "styled-components"

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
            border: 1px solid white;
            transition: border var(--transition-in);
        }

        .button a:hover {
            color: white;
        }
    }
`

const Text = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    
    * {
        line-height: 1;
    }
`


export default function Component({ data }) {

    return (
        <Container className="border-top">
            <a href={data.link}>
                <Text><Body content={data.text} /><Button url={data.link} label={data.linkLabel} /></Text>
            </a>
        </Container>
    )
}