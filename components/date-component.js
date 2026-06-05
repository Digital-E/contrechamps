import Date from "./date"
import Time from "./time"

export default function Component({ data }) {

    data.enddate === undefined ? data.enddate = null : null;
    data.starttime === undefined ? data.starttime = null : null;
    data.endtime === undefined ? data.endtime = null : null;

    return (
        <p>
        <span className="datetime-left">
        <Date dateString={data.startdate}  withYear={data.enddate === null ? true : false} />
            { data.enddate !== null ? "-" : ""}
        <Date dateString={data.enddate} withYear={true} />
        </span>
        {data.starttime !== null && <p>&nbsp;|&nbsp;</p>}
        <span className="datetime-right">
        <Time timeString={data.starttime} />
            { data.endtime !== null ? "-" : ""}
        <Time timeString={data.endtime} />
        </span>
        </p>
    )
}