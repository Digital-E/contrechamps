import Date from "./date"
import Time from "./time"

export default function Component({ data }) {

    return (
        <>
        <Date dateString={data.startdate}  withYear={data.enddate === null ? true : false} />
            { data.enddate !== null ? "-" : ""}
        <Date dateString={data.enddate} withYear={false} />
        <br />
        <Time timeString={data.starttime} />
            { data.endtime !== null ? "-" : ""}
        <Time timeString={data.endtime} />
        </>
    )
}