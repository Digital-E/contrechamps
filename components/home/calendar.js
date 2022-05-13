import { useEffect } from "react"
import styled from "styled-components"

let Container = styled.div`
    .home-calendar {
        position: relative;
        z-index: 2;
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 15px 30px;
    }


    .home-calendar__col-left {
        display: flex;
        align-items: center;
    }

    .home-calendar__col-left > div:nth-child(2) {
        margin-left: 40px;
    }

    .home-calendar__month {
        color: red;
    }

    .home-calendar__col-right {
        margin-top: 7px;
        padding-left: 40px;
    }

    .home-calendar__day {
        display: inline-block;
        padding: 0 10px;
        transition-duration: var(--transition-out);
        align-items: center;
    }

    @media(max-width: 767px) {
        .home-calendar {
            flex-wrap: wrap;
            padding: 15px;
        }

        .home-calendar__col-right {
            margin-top: 15px;
        }

        .home-calendar__day {
            padding: 0;
            padding-right: 14px;
        }
    }

    .home-calendar__day > span {
        display: block;
        position: relative;
        padding-bottom: 10px;
    }

    .home-calendar__modal--show > span::after {
        content:"";
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid black;
    }

    .home-calendar__day:hover {
        cursor: pointer;
        transition-duration: var(--transition-in);
    }

    .home-calendar__day:hover > span {
        opacity: 0.5;
    }

    .home-calendar__day--has-event {
        text-decoration: underline;
    }

    .home-calendar__modal {
        display: none;
        position: absolute;
        margin-left: -400px;
        width: 500px;
        border: 1px solid black;
        padding: 15px 10px;
        background-color: white;
        z-index: 1;
    }

    @media(max-width: 767px) {
        .home-calendar__modal {
            margin-left: 0;
            left: 15px;
            width: calc(100% - 30px);
        }  
    }

    .home-calendar__modal--show .home-calendar__modal {
        display: block;
    }

    .home-calendar__event {
        border-top: var(--border-width) solid black;
    }

    .home-calendar__event:hover {
        // opacity: 0.6;
    }

    .home-calendar__events > div:not(:first-child) {
        margin-top: 15px;
    }

    .home-calendar__date {
        margin-bottom: 5px;
    }

    .home-calendar__information {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 5px 0;
    }

    .home-calendar__information > div {
        flex-basis: 50%;
    }


    .home-calendar__title {
        margin-top: 50px;
    }
`


export default function Component({ data }) {

    useEffect(() => {
        // Duplicate Dates

        let homeCalendarDays = 31;
        let homeCalendarColRight = document.querySelector(".home-calendar__col-right")

        for(let i=2; i < homeCalendarDays + 1; i++) {
            let newHomeCalendarDayNode = homeCalendarColRight.children[0].cloneNode(true);
            if(i % 3 === 0) {
                newHomeCalendarDayNode.classList.add("home-calendar__day--has-event")
            }

            newHomeCalendarDayNode.children[0].innerText = i;

            newHomeCalendarDayNode.HTML = newHomeCalendarDayNode;
            homeCalendarColRight.appendChild(newHomeCalendarDayNode, homeCalendarColRight.children[0]);
        }

        document.querySelector(".home-calendar__col-right").children

        // Show Modal if Date Hovered

        let allHomeCalendarDays = document.querySelector(".home-calendar__col-right").children;

        let toggleModalVisible = (item) => {
            if(item.classList.contains("home-calendar__day--has-event")) {
                if(item.classList.contains("home-calendar__modal--show")) {
                item.classList.remove("home-calendar__modal--show")
                } else {
                    item.classList.add("home-calendar__modal--show")
                }
            }
        }

        Array.from(allHomeCalendarDays).forEach(item => {
            item.addEventListener("mouseenter", () => toggleModalVisible(item));
            item.addEventListener("mouseleave", () => toggleModalVisible(item));
        })
        
    }, []);

    return (
        <Container>
            <div class="home-calendar">
                <div class="home-calendar__col-left">
                <div>
                    <span class="h6">Agenda</span>
                </div>
                <div class="home-calendar__month">
                    <span class="h6">Avril</span>
                </div>
                </div>
                <div class="home-calendar__col-right">
                    <div class="h6 home-calendar__day">
                        <span>1</span>
                        <div class="home-calendar__modal">
                            {/* <div class="home-calendar__date"><h6>16.04.2022</h6></div> */}
                            <div class="home-calendar__events">
                                <div class="home-calendar__event">
                                    <a href="">
                                    <div class="home-calendar__information">
                                        <div>
                                        <h6>03.07.2022</h6>
                                        <h6>18:00</h6>
                                        </div>
                                        <div>
                                        <h6>Musée d'Art et d'histoire</h6>
                                        </div>
                                    </div>
                                    <div class="home-calendar__title">
                                        <h4>A Jeudi au MAH</h4>
                                    </div>
                                    <div class="home-calendar__image"><img src="../images/cal.png"/></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}