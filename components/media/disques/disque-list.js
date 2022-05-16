import DisqueListItem from "./disque-list-item"

export default function Component({ data }) {
    return data.map(item => <DisqueListItem data={item} />)
}