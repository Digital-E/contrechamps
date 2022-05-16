import { useEffect, useState } from 'react'
import { parseISO, format } from 'date-fns'
import { enGB, fr } from 'date-fns/locale'

import styled from "styled-components"
import EventList from "../home/event-list"

let Container = styled.div``

let MonthDivider = styled.div`
    font-size: 15rem;
    line-height: 1.2;
    margin: 0 auto;
    width: fit-content;
    text-transform: capitalize;
`


export default function Component ({ data }) {
    let [eventsByMonth, setEventsByMonth] = useState([]);

    let pastEvents = [];

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    useEffect(() => {
        let d = new Date();
        let currentMonth = d.getMonth();



        months.forEach(item => {
            let obj = {
                month: item,
                events: []
            }

            eventsByMonth.push(obj)
        })


        data.forEach(item => {
            let date = parseISO(item.startdate)
            let eventMonth = format(date, 'LLL');

            eventsByMonth.forEach(month => {

                if(month.events[0]) {
                    month.longMonth = format(parseISO(month.events[0]?.startdate), 'LLLL', {locale: month.events[0]?._lang === "fr" ? fr : enGB});
                } else {
                    month.longMonth = null;
                }

                if(month.month === eventMonth) {
                    month.events.push(item)
                }
            })
        })

        pastEvents = eventsByMonth.splice(0, currentMonth);

        eventsByMonth.push(...pastEvents)

        eventsByMonth = eventsByMonth.filter(item => {
            return item.events.length > 0 ? item : false
        })

        setEventsByMonth(eventsByMonth)
        
    },[]);


    return (
        <Container>
            {
                eventsByMonth.map(item => <><MonthDivider>{item.longMonth}</MonthDivider><EventList data={item.events} /></>)
            }
        </Container>       
    )
}