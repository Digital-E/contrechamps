import { useEffect, useState } from "react";
import styled from "styled-components"
import VideoListItem from "./video-list-item";

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

function getPreviewCount() {
    if (typeof window === 'undefined') return 4
    return window.innerWidth <= 767 ? 3 : 4
}

function distribute(data, isExpandable) {
    let source = isExpandable ? (data || []).slice(0, getPreviewCount()) : (data || [])
    let valid = source.filter(item => item !== null)

    const n = getNumCols()
    const cols = Array.from({ length: n }, () => [])
    valid.forEach((item, i) => cols[i % n].push(item))
    return cols
}

export default function Component({ data, isExpandable, isPhoto }) {
    let [columns, setColumns] = useState([[], [], [], []])

    useEffect(() => {
        setColumns(distribute(data, isExpandable))
    }, [data, isExpandable])

    useEffect(() => {
        function handleResize() {
            setColumns(distribute(data, isExpandable))
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [data, isExpandable])

    return (
        <Grid>
            {columns.map((col, ci) => (
                <Column key={ci}>
                    {col.map(item => (
                        <VideoListItem key={item.slug} data={item} isPhoto={isPhoto} />
                    ))}
                </Column>
            ))}
        </Grid>
    )
}
