import styled from "styled-components"
import Image from "../../image"
import Link from "../../link"

const Container = styled.div`
    position: relative;
    margin: 0 5px 10px 5px;

    > a {
        color: inherit;
    }


    > a > div:nth-child(1) {
        background: black;
    }

    > a img {
        transition: var(--transition-out);
    }

    > a:hover img {
        opacity: 0.5;
        transition: var(--transition-in);
    }


    ::after {
        content: '';
        position: absolute;
        opacity: 0;
        background: url('/icons/play.svg') no-repeat center center;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        pointer-events: none;
        transition: var(--transition-out);
    }

    :hover::after {
        opacity: 1;
        transition: var(--transition-in);
    }
`

const Thumbnail = styled.div`

    > span > span {
        padding-top: 56.25% !important;
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`

const Text = styled.div`
    margin-top: 5px;

    * {
        line-height: 1;
    }
`


export default function Component({ data }) {
    
    return (
        <Container>
            <Link href={data.slug}>
                <Thumbnail>
                    <Image data={data.image} />
                </Thumbnail>
                <Text className="h5">{data.title}</Text>
            </Link>
        </Container>
    )
}