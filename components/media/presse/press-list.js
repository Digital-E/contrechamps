import { useEffect, useState } from "react";

import PressListItem from "./press-list-item";


export default function Component({ data, isExpandable }) {
    let [showData, setShowData] = useState([]);

    useEffect(() => {
        let spliceData = JSON.parse(JSON.stringify(data)).splice(0, 3);

        setShowData(spliceData);
    }, []);

    if(isExpandable) {
        return (
            <>
            {showData.map(item => <PressListItem data={item} />)}
            </>
        )
    } else {
        return data.map(item => <PressListItem data={item} />)
    }
}