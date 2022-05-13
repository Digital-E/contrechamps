import { parseISO, format } from 'date-fns'

export default function Time({ timeString }) {

  if(timeString === null) return null;

  const date = parseISO(timeString)


  return <time dateTime={timeString}>{format(date, 'hh.mm')}</time>
}
