import styled from "styled-components"

import EmailSubscribeForm from "./email-subscribe-form"


const Container = styled.div`

`;

const EmailSubscribe = ({ data }) => {
    return (
        <Container>
            <div>
                <EmailSubscribeForm data={data}/>
            </div>
        </Container>
    )
}

export default EmailSubscribe

