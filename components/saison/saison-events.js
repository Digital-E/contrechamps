import { useEffect, useState } from 'react'
import { useRouter } from "next/router"

import { parseISO, format, getMonth } from 'date-fns'
import { enGB, fr } from 'date-fns/locale'

import sanitizeTag from "../../lib/sanitizeTag"

import styled from "styled-components"
import EventList from "../home/event-list"

let Container = styled.div`
    position: relative;

    > div:last-child > div:last-child::after   {
        display: none !important;
    }

    > div > div:nth-child(2) > div:nth-child(1) {
        display: none !important;
    }

    .hide-month-wrapper {
        display: none;
    }

`

let MonthWrapper = styled.div`
    &.passed-event {
        opacity: 0.3;
    }
`


let MonthDivider = styled.div`
    position: relative;
    margin: -1px auto 0 auto;
    text-align: center;
    text-transform: capitalize;
`

let InnerMonthDivider = styled.div`
    display: block;
    position: relative;
    width: fit-content;
    // margin: 0 auto;
    margin: 0 20px;

    > .h1 {
        line-height: 1.2;
    }

    @media(min-width: 768px) {
        > .h1 {
            font-size: 6rem;
        }

        .year {
            position: absolute;
            right: -70px;
            top: 20px;
        }
    }

    @media(max-width: 767px) {
        padding: 10px 0;
    }
`



export default function Component ({ data }) {
    let [eventsByMonth, setEventsByMonth] = useState([]);

    let pastEvents = [];

    useEffect(() => {
        let d = new Date();
        let currentMonth = d.getMonth();
        let currentYear = d.getFullYear();

        let endYear = currentYear + 1;
        let yearIncrement = currentYear - 1;

        let eventsByMonthArray = [];

        function getDate(month, year) {
            var date = new Date(year, month, 1);

            return format(parseISO(date.toISOString()), 'yyyy-LL');
        }


        let getMonthsInYear = (year) => {
            let i = 0;

            while(i < 12) {
                let obj = {
                    date: getDate(i, year),
                    events: []
                }

                eventsByMonthArray.push(obj);

                i++;
            }
        }

        while(yearIncrement <= endYear) {

            getMonthsInYear(yearIncrement);

            yearIncrement ++;
        }


        data.forEach(item => {
            let date = parseISO(item.startdate)
            let eventMonth = date.toString() !== "Invalid Date" ? format(date, 'yyyy-LL') : null;


            eventsByMonthArray.forEach((month) => {

                if(month.date === eventMonth) {
                    month.events.push(item)
                }

                if(month.events.length > 0) {
                    month.longMonth = format(parseISO(month.events[0]?.startdate), 'LLLL', {locale: month.events[0]?._lang === "fr" ? fr : enGB});
                    month.year = format(parseISO(month.events[0]?.startdate), 'yyyy')
                }
            })
        })


        let pastEventsSpliceIndex = 0;

        eventsByMonthArray.forEach((item, index) => {
            if(item.date === getDate(currentMonth, currentYear)) {
                pastEventsSpliceIndex = index;
            }
        });

        let prePastEvents = eventsByMonthArray.splice(0, pastEventsSpliceIndex);

        let pastEvents = prePastEvents.map(item => {
            let obj = item;
            obj.passed = true;
            return obj;
        });

        // eventsByMonthArray.push(...pastEvents)

        eventsByMonthArray = eventsByMonthArray.filter(item => {
            return item.events.length > 0 ? item : false
        })

        setEventsByMonth([...eventsByMonthArray]);
        
    },[]);

    useEffect(() => {
        setTimeout(() => {
            if(window.location.hash) {
                let hashElement = document.querySelector(window.location.hash)

                if(hashElement) {
                    window.scrollTo({left: 0, top: hashElement.getBoundingClientRect().top - 80})
                }
            }
        }, 0)

    }, []);


    return (
        <Container>
            {
                eventsByMonth.map(item => {

                    let monthAndYear = `${item.longMonth}-${item.year}`

                    return (
                        <MonthWrapper className={item.passed === true ? "passed-event month-wrapper": "month-wrapper"} id={`${sanitizeTag(monthAndYear)}`}>
                            <MonthDivider className="border-top border-bottom">
                                <InnerMonthDivider>
                                    <div className="h1">{item.longMonth}</div>
                                    {/* <div className="p year">{item.year}</div> */}
                                </InnerMonthDivider>
                            </MonthDivider>
                            <EventList data={item.events}  />
                        </MonthWrapper>
                    )
                }
                )
            }
        </Container>       
    )
}