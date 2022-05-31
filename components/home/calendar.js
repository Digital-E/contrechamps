import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import styled from "styled-components"
import Link from "../link"
import Body from "../body"
import Image from "../image"
import DateComponent from "../date-component"

import { parseISO, format } from 'date-fns'
import { enGB, fr } from 'date-fns/locale'

let Container = styled.div`

    .home-calendar {
        position: relative;
        flex-direction: row;
        z-index: 2;
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 15px 20px 15px 20px;
    }

    @media(max-width: 1420px) {
        .home-calendar {
            justify-content: flex-start;
            flex-direction: column;
        }
    }

    @media(max-width: 767px) {
        .home-calendar {
            flex-direction: column;
        }
    }


    .home-calendar__col-left {
        display: flex;
    }

    .home-calendar__col-left > div:nth-child(2) {
        // margin-left: 40px;
    }

    .home-calendar__month {
        text-transform: capitalize;
    }

    .home-calendar__year {
        display: inline-block;
        margin-left: 10px;
    }

    .home-calendar__month > span:nth-child(2) {
        display: inline-block;
        text-decoration: underline;
        position: relative;
        color: red;
        width: 5.5em;
    }

    .arrow-next, .arrow-prev {
        position: relative;
        cursor: pointer;
        user-select: none;
    }

    .arrow-next::after {
        content:"";
        position: absolute;
        top: -0.85em;
        right: -2.5em;
        transform: translateY(-50%) rotateZ(-90deg) scale(1.5);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid black;
    }

    .arrow-prev::after {
        content:"";
        position: absolute;
        top: 0.84em;
        right: -1.5em;
        transform: translateY(-50%) rotateZ(90deg) scale(1.5);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid black;
    }

    .arrow-prev:hover::after, .arrow-next:hover::after {
        border-top: 5px solid red;
    }

    .home-calendar__day {
        position: relative;
        display: inline-block;
        padding: 0 10px;
        transition-duration: var(--transition-out);
        align-items: center;
        margin-bottom: 20px;
    }

    .home-calendar__day > span {
        text-align: center;
    }

    @media(max-width: 1420px) {
        .home-calendar__col-right {
            margin-top: 20px;
        }
    }

    @media(max-width: 1260px) {
        .home-calendar__col-right {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            margin-top: 50px;
            padding-left: 0;
            max-width: 500px;
        }

        .home-calendar__day {
            padding: 0;
            padding-right: 0px;
            width: fit-content;
        }
    }

    

    @media(max-width: 767px) {
        .home-calendar {
            flex-wrap: wrap;
            padding: 20px;
        }

        .home-calendar__col-right {
            margin-top: 50px;
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            padding-left: 0;
            width: 100%;
        }

        .home-calendar__day {
            padding: 0;
            padding-right: 0px;
            width: fit-content;
        }

        .arrow-prev::after {
            top: 0.7em;
        }

        .arrow-next::after {
            top: -0.6em;
        }
    }


    .home-calendar__day > span {
        display: block;
        position: relative;
        padding-bottom: 10px;
    }

    .home-calendar__day:hover {
        cursor: pointer;
        transition-duration: var(--transition-in);
    }

    .home-calendar__day:hover > span {
        opacity: 0.5;
    }

    .home-calendar__day--has-event::after {
        content: "";
        position: absolute;
        bottom: -7px;
        left: calc(50% - 5px);
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: black;
    }

    .home-calendar__day--has-two-events::before {
        content: "";
        position: absolute;
        bottom: -22px;
        left: calc(50% - 5px);
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: black;
    }

    @media(max-width: 1580px) {
        .home-calendar__day--has-event::after {
            left: calc(50% - 2.5px);
            width: 5px;
            height: 5px;
            bottom: 0px;
        }

        .home-calendar__day--has-two-events::before {
            left: calc(50% - 2.5px);
            width: 5px;
            height: 5px;
            bottom: -8px;
        }
    }

    @media(max-width: 767px) {
        .home-calendar__day--has-event::after {
            left: calc(50% - 2.5px);
            width: 5px;
            height: 5px;
            bottom: 0px;
        }

        .home-calendar__day--has-two-events::before {
            left: calc(50% - 2.5px);
            width: 5px;
            height: 5px;
            bottom: -8px;
        }
    }

    .home-calendar__modal {
        display: none;
        position: absolute;
        width: 400px;
        max-height: 600px;
        border: 1px solid black;
        background-color: white;
        z-index: 1;
        overflow: scroll;
        margin-top: -10px;
        margin-left: -50px;
    }

    @media(min-width: 768px) {
        .home-calendar__col-right > div:nth-child(n+15) .home-calendar__modal {
            margin-left: -350px;
        }
    }


    @media(max-width: 767px) {
        .home-calendar__modal {
            position: fixed;
            margin-left: 0;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: calc(100vw - 40px);
        }  
    }

    .home-calendar__modal--show .home-calendar__modal {
        display: block;
    }

    .home-calendar__event {
        border-top: var(--border-width) solid black;
    }
    

    .home-calendar__event a {
        display: block;
        padding: 10px 10px;
    
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

    .home-calendar__events > div:not(:first-child) {
        border-top: 1px solid black;
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

        * {
            margin: 0;
        }
    }

    .home-calendar__information > div {
        flex-basis: 50%;
    }


    .home-calendar__title {
        margin-top: 50px;
    }

    .home-calendar__image {
        height: calc(0.5 * 400px);
    }

    .home-calendar__image img,
    .home-calendar__image span
     {
        height: 100% !important;
        width: 100% !important;
        object-fit: cover !important;
    }
`

// let monthNames = [
//     "January", "February", "March",
//     "April", "May", "June",
//     "July", "August", "September",
//     "October", "November", "December"];

// let monthNamesFr = [
//     "Janvier", "Février", "Mars",
//     "Avril", "Mai", "Juin",
//     "Juillet", "Août", "Septembre",
//     "Octobre", "Novembre", "Décembre"];

export default function Component({ data }) {

    let router = useRouter();

    let [allMonths, setAllMonths ] = useState( [ [] ] );

    let [currentMonthIndex, setCurrentMonthIndex] = useState(0);

    let months = [];

    let startIndex = 0;
    let startIndexHasBeenSet = false;

    let endYear = 2023;
    let yearIncrement = 2020;

    useEffect(() => {
        let currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth();


        setCurrentMonthIndex(currentMonth);

        function getDaysInMonth(month, year) {
            var date = new Date(year, month, 1);

            if(
                format(parseISO(date.toISOString()), 'yyyy-LL-dd') 
                === 
                format(parseISO(new Date(currentYear, currentMonth, 1).toISOString()), 'yyyy-LL-dd')
                ) {
                startIndexHasBeenSet = true;
            }

            var days = [];
            while (date.getMonth() === month) {
              let obj = {
                  timestamp: new Date(date),
                  events: []
              }
              days.push(obj);
              date.setDate(date.getDate() + 1);
            }
            return days;
        }
        
        let getMonthsInYear = (year) => {
            let i = 0;

            while(i < 12) {
                months.push(getDaysInMonth(i, year));
                i++;

                if(!startIndexHasBeenSet) {
                    startIndex++;
                }
            }
        }


        while(yearIncrement <= endYear) {

            getMonthsInYear(yearIncrement);

            yearIncrement ++;
        }


        getMonthsInYear(currentYear);


        months.forEach((itemOne, indexOne) => {

            itemOne.forEach((itemTwo, indexTwo) => {
                data.forEach((itemThree, indexThree) => {

                    let date = parseISO(itemTwo.timestamp.toISOString())

                    if(itemThree.startdate === format(date, 'yyyy-LL-dd')) {
                        months[indexOne][indexTwo].events.push(itemThree)
                    }

                    itemThree.occurences?.forEach((itemFour) => {
                        if(itemFour.startdate === format(date, 'yyyy-LL-dd')) {
                            months[indexOne][indexTwo].events.push(itemThree)
                        }
                    })
                })
            })
        })

        // Set All Months

        setAllMonths(months);


        setCurrentMonthIndex(startIndex)


        // Add Event Listeners to Days
        setTimeout(() => {

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

        }, 0)

    },[])

    let changeMonthIndex = (action) => {

        if(action === "prev") {
            if(currentMonthIndex > 0) {
                setCurrentMonthIndex(currentMonthIndex -= 1)
            }
        } else {
            if(currentMonthIndex < allMonths.length - 1) {
                setCurrentMonthIndex(currentMonthIndex += 1)
            }
        }
    }
    


    return (
        <Container>
            <div class="home-calendar">
                <div class="home-calendar__col-left">
                <div>
                    {/* <span class="h6">{new Date().getFullYear()}</span> */}
                </div>
                <div class="home-calendar__month">
                    <div class="arrow-prev" onClick={() => changeMonthIndex("prev")}></div>
                    <span class="h5">
                        <Link href={`/${router.query.lang}/saison`}>
                            {
                                allMonths[currentMonthIndex][0] && 
                                format(parseISO(allMonths[currentMonthIndex][0].timestamp.toISOString()), 'LLLL', {locale: router.query.lang === "fr" ? fr : enGB})
                            }
                        </Link>
                    </span>
                    <span class="home-calendar__year h5">
                        {allMonths[currentMonthIndex][0] && format(parseISO(allMonths[currentMonthIndex][0].timestamp.toISOString()), 'yyyy')}
                        </span>
                    <div class="arrow-next" onClick={() => changeMonthIndex("next")}></div>
                </div>
                </div>
                <div class="home-calendar__col-right">
                    {allMonths[currentMonthIndex].map((item, index) => {

                        return (
                            <div class={`h5 home-calendar__day 
                                ${item.events.length > 0 &&'home-calendar__day--has-event'} 
                                ${item.events.length > 1 && 'home-calendar__day--has-two-events'}
                                `}>
                                <span>{index + 1}</span>
                                <div class="home-calendar__modal">
                                    <div class="home-calendar__events">
                                        {
                                            item.events.map(item => (
                                                <div class="home-calendar__event">
                                                    <Link href={item.slug}>
                                                    <div class="home-calendar__information">
                                                        <div>
                                                        <DateComponent data={item} />
                                                        </div>
                                                        <div>
                                                        <h6><Body content={item.location} /></h6>
                                                        </div>
                                                    </div>
                                                    <div class="home-calendar__title">
                                                        <h4>{item.title}</h4>
                                                    </div>
                                                    <div class="home-calendar__image"><Image data={item.image} /></div>
                                                    </Link>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Container>
    )
}