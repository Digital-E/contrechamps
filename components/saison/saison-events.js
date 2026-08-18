import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { parseISO, format, getMonth } from 'date-fns'
import { enGB, fr } from 'date-fns/locale'

import sanitizeTag from "../../lib/sanitizeTag"

import styled from "styled-components"
import EventList from "../home/event-list"

let Container = styled.div`
    position: relative;
    margin-top: 20px;

    > div:last-child > div:last-child::after   {
        display: none !important;
    }

    .hide-month-wrapper {
        display: none;
    }

    @media(max-width: 768px) {
        width: 100%;
        margin-top: 100px;
    }
`

let MonthWrapper = styled.div`
    &.passed-event {
        opacity: 0.3;
    }
`


let MonthDivider = styled.div`
    position: relative;
    margin: -2px auto 0 auto;
    text-align: center;
    text-transform: capitalize;
`

let InnerMonthDivider = styled.div`
    display: block;
    position: relative;
    width: fit-content;
    margin: 0 40px;

    .h2 {
        font-family: "Quatorze CC Bold";
        font-weight: bold;
        font-size: 2rem;
    }

    @media(max-width: 767px) {
        margin: 0 20px;
    }

    @media(min-width: 768px) {

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

    let router = useRouter()

    // The site header is fixed, and the filters bar pins itself directly
    // below it (see filters.js) — so the permanently-covered zone at the
    // top of the viewport is header height + filters height, not just the
    // filters alone. Measured at runtime since both vary by viewport/content.
    let [coveredHeight, setCoveredHeight] = useState(0)

    useEffect(() => {
        function measureCoveredHeight() {
            let headerEl = document.querySelector('header')
            let filtersEl = document.querySelector('.season-filters-container')
            setCoveredHeight((headerEl?.offsetHeight || 0) + (filtersEl?.offsetHeight || 0))
        }

        measureCoveredHeight()
        window.addEventListener('resize', measureCoveredHeight)
        return () => window.removeEventListener('resize', measureCoveredHeight)
    }, [])

    let d = new Date();
    let currentMonth = d.getMonth();
    let currentYear = d.getFullYear();

    let endYear = currentYear + 1;
    let yearIncrement = currentYear;

    if(currentMonth < 5) {
        yearIncrement = currentYear - 1
    }

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


    const currentDateStr = format(new Date(currentYear, currentMonth, 1), 'yyyy-LL')

    eventsByMonthArray = eventsByMonthArray.filter(item => {
        return item.events.length > 0 && item.date >= currentDateStr
    })

    // The calendar links here with ?month=yyyy-LL. That exact month might
    // not have a section (no events, or it's already in the past and got
    // filtered out above), so scroll to whichever available month is
    // chronologically closest instead of landing nowhere.
    useEffect(() => {
        let targetMonth = router.query.month
        if(!targetMonth || eventsByMonthArray.length === 0) return

        let toMonthIndex = (dateStr) => {
            let [year, month] = dateStr.split('-').map(Number)
            return year * 12 + month
        }

        let targetIndex = toMonthIndex(targetMonth)

        let closest = eventsByMonthArray.reduce((best, item) => {
            let diff = Math.abs(toMonthIndex(item.date) - targetIndex)
            return diff < best.diff ? { item, diff } : best
        }, { item: eventsByMonthArray[0], diff: Infinity })

        let id = sanitizeTag(`${closest.item.longMonth}-${closest.item.year}`)

        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
    }, [router.query.month])

    return (
        <Container>
            {
                eventsByMonthArray.map(item => {

                    let monthAndYear = `${item.longMonth}-${item.year}`

                    return (
                        <MonthWrapper className={item.passed === true ? "passed-event month-wrapper": "month-wrapper"} id={`${sanitizeTag(monthAndYear)}`} style={{ scrollMarginTop: coveredHeight + 20 }}>
                            <MonthDivider className="">
                                <InnerMonthDivider>
                                    <div className="h2">{item.longMonth} {item.year}</div>
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