import { useEffect, useState } from 'react'
import styled from 'styled-components'
import EventListTile from "./event-list-tile"

let Grid = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
    padding: 20px 40px;

    @media(max-width: 767px) {
        gap: 20px;
        padding: 0 20px;
    }
`

let Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
`

const NUM_COLS_DEFAULT = 4

function getNumCols() {
    if (typeof window === 'undefined') return NUM_COLS_DEFAULT
    if (window.innerWidth <= 600) return 1
    if (window.innerWidth <= 900) return 2
    if (window.innerWidth <= 1200) return 3
    return 4
}

export default function Component({ data }) {
    let [columns, setColumns] = useState([[], [], [], []])

    useEffect(() => {
        let valid = data.filter(item => item !== null)
        valid.sort((a, b) => {
            if (!a.startdate) return 1
            if (!b.startdate) return -1
            return a.startdate.localeCompare(b.startdate)
        })

        const n = getNumCols()
        const cols = Array.from({ length: n }, () => [])
        valid.forEach((item, i) => cols[i % n].push(item))
        setColumns(cols)
    }, [data])

    useEffect(() => {
        function handleResize() {
            const n = getNumCols()
            const valid = data.filter(item => item !== null)
            valid.sort((a, b) => {
                if (!a.startdate) return 1
                if (!b.startdate) return -1
                return a.startdate.localeCompare(b.startdate)
            })
            const cols = Array.from({ length: n }, () => [])
            valid.forEach((item, i) => cols[i % n].push(item))
            setColumns(cols)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [data])

    return (
        <Grid>
            {columns.map((col, ci) => (
                <Column key={ci}>
                    {col.map(item => (
                        <EventListTile key={item._id} data={item} />
                    ))}
                </Column>
            ))}
        </Grid>
    )
}
