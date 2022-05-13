import PressListItem from "./press-list-item"

export default function Component({ data }) {
    return data.map(item => <PressListItem data={item} />)
}