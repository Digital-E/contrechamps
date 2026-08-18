import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/router"

import styled from "styled-components"
import Link from "../link"
import Body from "../body"
import Image from "../image"
import DateComponent from "../date-component"

import sanitizeTag from "../../lib/sanitizeTag"

import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from 'date-fns'
import { enGB, fr } from 'date-fns/locale'

import InclusiviteIcon from '../inclusivite-icon'

let Container = styled.div`

    .p {
    margin: 0;
    font-family: "Barlow Condensed Medium";
    font-size: 1.2rem;
    }


    .home-calendar {
        position: relative;
        flex-direction: row;
        z-index: 0;
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 20px 40px 0px 40px;
    }

    @media(max-width: 1350px) {
        .home-calendar {
            justify-content: flex-start;
            flex-direction: column;
            padding: 20px 40px 0px 40px;
        }

        .home-calendar__col-left {
            position: relative;
            width: 100%;
        }

        .home-calendar__month {
            position: static;
            width: 100% !important;
        }

        .arrow-next {
            position: absolute;
            top: 2px;
            right: 0 !important;
            left: auto;
        }

        .arrow-prev {
            position: absolute;
            top: 2px;
            right: 25px !important;
            left: auto;
        }
    }

    @media(max-width: 767px) {
        .home-calendar {
            flex-direction: column;
            padding: 20px 20px;
        }
    }


    .home-calendar__col-left {
        display: flex;
    }

    .home-calendar__col-left > div:nth-child(2) {
        // margin-left: 40px;
    }

    .home-calendar__month {
        position: relative;
        text-transform: uppercase;
        width: 11.7rem;
    }

    .home-calendar__agenda-label {
        font-family: "Barlow Condensed ExtraBold";
        font-size: 1.2rem;
        display: inline-block;
        margin-right: 10px;
    }

    .home-calendar__year {
        display: inline-block;
        margin-right: 10px;
    }

    .home-calendar__month > span:nth-child(4) {
        display: inline-block;
        // text-decoration: underline;
        position: relative;
        color: var(--color);
    }

    .arrow-next {
        position: absolute;
        right: -70px;
        top: 2px;
        z-index: 1;
        cursor: pointer;
        user-select: none;
        font-size: 1.1rem;
    }

    .arrow-prev {
        position: absolute;
        right: -45px;
        top: 2px;
        z-index: 1;
        cursor: pointer;
        user-select: none;
        font-size: 1.1rem;
    }

    .arrow-next:hover, .arrow-prev:hover {
        opacity: 0.3;
    }

    .home-calendar__day {
        position: relative;
        display: inline-block;
        padding: 0 10px;
        transition-duration: var(--transition-out);
        align-items: center;
        margin-bottom: 0px;
    }

    .home-calendar__day > span {
        text-align: center;
    }

    @media(max-width: 1350px) {
        .home-calendar__col-right {
            margin-top: 20px;
            margin-left: -5px;
        }

    }

    @media(max-width: 1100px) {
        .home-calendar__col-right {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            margin-top: 20px;
            margin-left: 0;
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
        }

        .home-calendar__col-right {
            margin-top: 20px;
            margin-left: 0;
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
            right: -1.5em;
        }

        .arrow-next::after {
            right: -3em;
        }
    }


    .home-calendar__day > span {
        display: block;
        position: relative;
        padding-bottom: 15px;
    }

    .home-calendar__day:hover {
        cursor: default;
        transition-duration: var(--transition-in);
    }

    .home-calendar__day--has-event:hover {
        cursor: pointer;
    }

    .home-calendar__event:hover .image-overlay {
        opacity: 0.6;
        // transition: var(--transition-in);
    }

    .home-calendar__day:hover > span {
        opacity: 0.5;
    }

    .home-calendar__day--has-event::after {
        content: "";
        position: absolute;
        bottom: -4px;
        left: calc(50% - 3.5px);
        transform: translateY(-50%);
        width: 7px;
        height: 7px;
        border-radius: 999px;
        background: black;
    }

    .home-calendar__day--has-two-events::before {
        content: "";
        position: absolute;
        bottom: -15px;
        left: calc(50% - 3.5px);
        transform: translateY(-50%);
        width: 7px;
        height: 7px;
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
        width: 450px;
        max-height: 600px;
        background-color: white;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 999;
        overflow: scroll;
        margin-top: -10px;
        margin-left: -50px;
    }

    .home-calendar__modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 998;
    }

    @media(min-width: 576px) {
        .home-calendar__modal {
            margin-left: 0px;
        }
    }

    @media(min-width: 992px) {
        .home-calendar__col-right > div:nth-child(n+15) .home-calendar__modal {
            margin-left: -400px;
        }
    }

    @media(max-width: 991px) and (min-width: 768px) {
        .home-calendar__event.orange {
            background: var(--orange);
        }

        .home-calendar__event.blue {
            background: var(--blue);
        }

        .home-calendar__event.green {
            background: var(--green);
        }

        .home-calendar__event.gray {
            background: var(--gray);
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

        .home-calendar__modal--show .home-calendar__modal-overlay {
            display: block;
        }
    }

    .home-calendar__modal--show .home-calendar__modal {
        display: block;
    }

    .home-calendar__event > a {
        display: flex;
        flex-direction: column;
        padding: 10px;
        color: inherit;
        transition: opacity var(--transition-out);

        :hover {
            opacity: 0.7;
            transition: opacity var(--transition-in);
        }
    }

    .home-calendar__events > div {
        margin-bottom: 40px;
    }

    .home-calendar__image {
        position: relative;
        width: 100%;
        margin-bottom: 12px;
    }

    .home-calendar__meta {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .home-calendar__information {
        display: flex;
        flex-direction: column;
    }

    .home-calendar__information time,
    .home-calendar__information p {
        font-family: "Barlow Condensed Medium";
        font-size: 1.3rem;
        line-height: 1;
        margin: 0;
    }

    .home-calendar__information > p {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        white-space: nowrap;
    }

    .home-calendar__information > p > p {
        display: inline;
    }

    .home-calendar__title {
        margin: 0;
    }

    .home-calendar__title h4 {
        font-family: "Quatorze CC Bold";
        font-size: 1.5rem;
        line-height: 1.1;
        margin: 0;
    }

    .home-calendar__mobile-trigger {
        display: contents;
        gap: 6px;
        position: relative;
        top: -1px;
    }

    .home-calendar__mobile-caret {
        display: none;
    }

    @media(max-width: 1100px) {
        .home-calendar__mobile-trigger {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            user-select: none;
        }

        .home-calendar__mobile-caret {
            display: inline;
            transition: transform 0.2s ease;
            flex-shrink: 0;
        }

        .home-calendar__mobile-caret--open {
            transform: rotate(90deg);
        }

        .home-calendar__col-right {
            display: none !important;
        }

        .home-calendar__col-right--open {
            display: grid !important;
        }
    }
`

const Blank = styled.div``

const InclusiviteIconContainer = styled.div`
    margin-top: 5px !important;
`

const Pastille = styled.div`
    display: ${props => props.backgroundColor === "--gray" && "none" };
    width: 13px;
    height: 13px;
    min-width: 13px;
    min-height: 13px;
    border: 1px solid black;
    background: white;
    border-radius: 999px;
    margin-bottom: 5px !important;
    background: var(${props => (props.backgroundColor)});
`

const ImageOverlay = styled.div`
    position: absolute;
    // transition: var(--transition-out);
    z-index: 1;
    opacity: 0;
    height: 100%;
    width: 100%;
    background: var(${props => (props.backgroundColor !== "--gray" && props.backgroundColor)});
`

export default function Component({ data = [] }) {

    let router = useRouter();
    let locale = router.query.lang === "fr" ? fr : enGB;

    // The visible month. Left null until mount so the very first render
    // (server + hydration) stays a no-op, exactly like before.
    let [currentMonthDate, setCurrentMonthDate] = useState(null);

    let [mobileOpen, setMobileOpen] = useState(false);

    // Date-key ('yyyy-LL-dd') of the day whose modal is currently open.
    let [activeDayKey, setActiveDayKey] = useState(null);

    let minMonth = new Date(2022, 0, 1);
    let maxMonth = new Date(new Date().getFullYear() + 2, 11, 1);

    // Index every event occurence once, keyed by date. This replaces the old
    // approach of re-scanning the entire dataset (and every occurence) for
    // every single day of every month from 2022 through next-year+2 — that
    // was O(years x days x events) done eagerly on mount. Now it's a single
    // O(events) pass, memoized, and month switches are just map lookups.
    let eventsByDate = useMemo(() => {
        let map = new Map();

        data.forEach((item) => {
            item.occurences?.forEach((occurence, index) => {
                if (!occurence.startdate) return;

                let list = map.get(occurence.startdate);
                if (!list) {
                    list = [];
                    map.set(occurence.startdate, list);
                }

                list.push({ ...item, index });
            });
        });

        return map;
    }, [data]);

    // Only build the currently visible month's days, on demand.
    let { days, blanks } = useMemo(() => {
        if (!currentMonthDate) return { days: [], blanks: [] };

        let start = startOfMonth(currentMonthDate);
        let end = endOfMonth(currentMonthDate);

        let monthDays = eachDayOfInterval({ start, end }).map((date) => {
            let key = format(date, 'yyyy-LL-dd');

            return {
                timestamp: date,
                key,
                events: eventsByDate.get(key) || [],
            };
        });

        let dayIndex = getDay(start); // 0 (Sun) - 6 (Sat)
        let prefixCount = dayIndex === 0 ? 6 : dayIndex - 1; // week starts Monday

        return {
            days: monthDays,
            blanks: Array.from({ length: prefixCount }),
        };
    }, [currentMonthDate, eventsByDate]);

    useEffect(() => {
        setCurrentMonthDate(startOfMonth(new Date()));
    }, []);

    let changeMonthIndex = (action) => {
        setActiveDayKey(null);

        setCurrentMonthDate((prev) => {
            if (!prev) return prev;

            let next = action === "prev" ? subMonths(prev, 1) : addMonths(prev, 1);

            if (next < minMonth || next > maxMonth) return prev;

            return next;
        });
    }

    const backgroundColorFunc = (item) => {

        let colorVar = "gray";
        let alreadyHasColor = false

        item.tags?.forEach(item => {
            if(alreadyHasColor) return true

            if(sanitizeTag(item.label) === "abonnement" || sanitizeTag(item.label) === "subscription") {
                colorVar = "orange"
                alreadyHasColor = true
            } else if (sanitizeTag(item.label) === "tournee" || sanitizeTag(item.label) ===  "tour") {
                colorVar = "blue"
                alreadyHasColor = true
            } else if (sanitizeTag(item.label) === "tout-public" || sanitizeTag(item.label) ===  "all-audiences") {
                colorVar = "green"
                alreadyHasColor = true
            }
        })

        return colorVar
    }

    const backgroundColorFuncPastille = (item) => {

        let colorVar = "--gray";
        let alreadyHasColor = false

        item.tags?.forEach(item => {
            if(alreadyHasColor) return true

            if(sanitizeTag(item.label) === "abonnement" || sanitizeTag(item.label) === "subscription") {
                colorVar = "--orange"
                alreadyHasColor = true
            } else if (sanitizeTag(item.label) === "tournee" || sanitizeTag(item.label) ===  "tour") {
                colorVar = "--blue"
                alreadyHasColor = true
            } else if (sanitizeTag(item.label) === "tout-public" || sanitizeTag(item.label) ===  "all-audiences") {
                colorVar = "--green"
                alreadyHasColor = true
            }
        })

        return colorVar
    }



    return (
        <Container>
            <div class="home-calendar" style={{ zIndex: activeDayKey !== null ? 999 : 0 }}>
                <div class="home-calendar__col-left">
                <div>
                    {/* <span class="h6">{new Date().getFullYear()}</span> */}
                </div>
                <div class="home-calendar__month">
                    <i class="fa-solid fa-circle-chevron-left arrow-prev" onClick={() => changeMonthIndex("prev")}></i>
                    <i class="fa-solid fa-circle-chevron-right arrow-next" onClick={() => changeMonthIndex("next")}></i>
                    <span class="home-calendar__mobile-trigger" onClick={() => setMobileOpen(!mobileOpen)}>
                        <img
                            class={`home-calendar__mobile-caret ${mobileOpen ? "home-calendar__mobile-caret--open" : ""}`}
                            src="/icons/caret-right-solid-full.svg"
                            alt=""
                            width={8}
                        />
                        <Link href={`/${router.query.lang}/saison`}>
                            <span class="home-calendar__agenda-label">AGENDA</span>
                        </Link>
                    </span>
                    <span class="home-calendar__year p">
                        {currentMonthDate && format(currentMonthDate, 'yyyy')}
                    </span>
                    <span class="p">
                        <Link href={`/${router.query.lang}/saison${currentMonthDate ? `?month=${format(currentMonthDate, 'yyyy-LL')}#${sanitizeTag(format(currentMonthDate, 'LLLL-yyyy', { locale }))}` : ''}`}>
                            {currentMonthDate && format(currentMonthDate, 'LLLL', { locale })}
                        </Link>
                    </span>
                </div>
                </div>
                <div class={`home-calendar__col-right ${mobileOpen ? "home-calendar__col-right--open" : ""}`}>
                    {
                        blanks.map((_, blankIndex) => <Blank key={`blank-${blankIndex}`} />)
                    }
                    {days.map((day, index) => {
                        let isActive = activeDayKey === day.key;
                        let hasEvents = day.events.length > 0;

                        return (
                            <div
                                key={day.key}
                                class={`p home-calendar__day
                                    ${hasEvents ? 'home-calendar__day--has-event' : ''}
                                    ${day.events.length > 1 ? 'home-calendar__day--has-two-events' : ''}
                                    ${isActive ? 'home-calendar__modal--show' : ''}
                                    `}
                                onMouseEnter={() => {
                                    if(hasEvents && window.innerWidth > 768) setActiveDayKey(day.key)
                                }}
                                onMouseLeave={() => {
                                    if(window.innerWidth > 768) setActiveDayKey(null)
                                }}
                            >
                                <span
                                    onClick={() => {
                                        if(hasEvents && window.innerWidth <= 768) setActiveDayKey(isActive ? null : day.key)
                                    }}
                                >{index + 1}</span>
                                <div class="home-calendar__modal-overlay" onClick={() => setActiveDayKey(null)}></div>
                                <div class="home-calendar__modal">
                                    <div class="home-calendar__events">
                                        {
                                            day.events.map((item, eventIndex) => (
                                                <div key={eventIndex} class={`home-calendar__event ${backgroundColorFunc(item)}`}>
                                                    <Link href={item.slug}>
                                                        {item.image && (
                                                            <div class="home-calendar__image">
                                                                <Image data={item.image} />
                                                            </div>
                                                        )}
                                                        <div class="home-calendar__meta">
                                                            <div class="home-calendar__information">
                                                                {item.occurences && <DateComponent data={item.occurences[item.index]} />}
                                                                {item.inclusivite && (
                                                                    <InclusiviteIconContainer>
                                                                        <InclusiviteIcon />
                                                                    </InclusiviteIconContainer>
                                                                )}
                                                            </div>
                                                            <div class="home-calendar__title">
                                                                <h4>{item.title}</h4>
                                                            </div>
                                                        </div>
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
