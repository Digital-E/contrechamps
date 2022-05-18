import { useEffect, useState } from 'react'
import { parseISO, format } from 'date-fns'
import { enGB, fr } from 'date-fns/locale'

import styled from "styled-components"
import EventList from "../home/event-list"

let Container = styled.div`
    position: relative;

    > div:nth-child(even) > div:nth-child(1) {
        display: none;
    }

    > div:last-child > div:nth-child(2) > div:last-child::after   {
        display: none !important;
    }
`

let MonthDivider = styled.div`
    position: relative;
    margin: 0 auto;
    text-align: center;
    text-transform: capitalize;

    > div {
        line-height: 1.2;
    }

    @media(min-width: 768px) {
        > div {
            font-size: 15rem;
        }
    }

`


export default function Component ({ data }) {
    let [eventsByMonth, setEventsByMonth] = useState([]);

    let pastEvents = [];

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    useEffect(() => {
        let d = new Date();
        let currentMonth = d.getMonth();

        let eventsByMonthArray = [];



        months.forEach(item => {
            let obj = {
                month: item,
                events: []
            }

            eventsByMonthArray.push(obj)

        })



        data.forEach(item => {
            let date = parseISO(item.startdate)
            let eventMonth = format(date, 'LLL');

            eventsByMonthArray.forEach((month) => {

                if(month.month === eventMonth) {
                    month.events.push(item)
                }

                if(month.events.length > 0) {
                    month.longMonth = format(parseISO(month.events[0]?.startdate), 'LLLL', {locale: month.events[0]?._lang === "fr" ? fr : enGB});
                }
            })
        })

        pastEvents = eventsByMonthArray.splice(0, currentMonth);

        eventsByMonthArray.push(...pastEvents)

        eventsByMonthArray = eventsByMonthArray.filter(item => {
            return item.events.length > 0 ? item : false
        })

        setEventsByMonth([...eventsByMonthArray]);
        
    },[]);


    return (
        <Container>
            {
                eventsByMonth.map(item => <><MonthDivider className="border-bottom"><div className="h1">{item.longMonth}</div></MonthDivider><EventList data={item.events}  /></>)
            }
        </Container>       
    )
}