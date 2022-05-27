import { useEffect, useState } from 'react'
import { useRouter } from "next/router"

import { parseISO, format, getMonth } from 'date-fns'
import { enGB, fr } from 'date-fns/locale'

import styled from "styled-components"
import EventList from "../home/event-list"

let Container = styled.div`
    position: relative;

    // > div:nth-child(even) > div:nth-child(1) {
    //     display: none;
    // }

    > div:last-child > div:nth-child(2) > div:last-child::after   {
        display: none !important;
    }

    > div > div:nth-child(2) > div:nth-child(1) {
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
    margin: 0 auto;
    text-align: center;
    text-transform: capitalize;
`

let InnerMonthDivider = styled.div`
    display: block;
    position: relative;
    width: fit-content;
    margin: 0 auto;

    > .h1 {
        line-height: 1.2;
    }

    @media(min-width: 768px) {
        > .h1 {
            font-size: 15rem;
        }

        .year {
            position: absolute;
            right: -70px;
            top: 40px;
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
            let eventMonth = format(date, 'yyyy-LL');


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

        eventsByMonthArray.push(...pastEvents)

        eventsByMonthArray = eventsByMonthArray.filter(item => {
            return item.events.length > 0 ? item : false
        })

        setEventsByMonth([...eventsByMonthArray]);
        
    },[]);


    return (
        <Container>
            {
                eventsByMonth.map(item => {
                    return (
                        <MonthWrapper className={item.passed === true && "passed-event"}>
                            <MonthDivider className="border-bottom">
                                <InnerMonthDivider>
                                    <div className="h1">{item.longMonth}</div>
                                    <div className="p year">{item.year}</div>
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