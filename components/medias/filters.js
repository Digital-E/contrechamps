import styled from "styled-components"
import Link from "../link"

let Container = styled.div`
    .season-filters {
        display: flex;
        padding: 10px 30px;
        border-top: var(--border-width) solid black;
        border-bottom: var(--border-width) solid black;
        background: black;
        color: white;
    }

    .season-filter > a {
        display: flex;
        align-items: center;
        cursor: pointer;
        flex-basis: auto;
        margin-right: 50px;
    }

    .season-filter > a:hover .season-filter__selector {
        background-color: rgb(255, 0, 0, 1);
    }

    .season-filter__selector {
        width: 20px;
        height: 20px;
        // border: var(--border-width) solid black;
        background: white;
        border-radius: 999px;
    }

    .season-filter__label {
        margin-left: 5px;
        line-height: 1;
    }

    .active-link .season-filter__selector  {
        background-color: red;
    }

    .season-filter__label {
        color: white !important;
    }

    @media(max-width: 767px) {
        .season-filters {
            flex-wrap: wrap;
            padding: 15px;
        } 

        .season-filter {
            flex-basis: 33.3333%;
        }
    }
`


export default function Component ({ data }) {

    return (
        <Container>
            <div class="season-filters">
                <div class="season-filter">
                    <Link href="/fr/medias/presse">
                        <div class="season-filter__selector"></div>
                        <div class="season-filter__label p">Presse</div>
                    </Link>
                </div>
                <div class="season-filter">
                    <Link href="/fr/medias/videos">
                        <div class="season-filter__selector"></div>
                        <div class="season-filter__label p">Videos</div>
                    </Link>
                </div>
                <div class="season-filter">
                    <Link href="/fr/medias/disques">
                        <div class="season-filter__selector"></div>
                        <div class="season-filter__label p">Disques</div>
                    </Link>
                </div>
            </div> 
    </Container>       
    )
}