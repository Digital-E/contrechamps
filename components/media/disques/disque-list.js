import { useEffect, useState } from "react";

import DisqueListItem from "./disque-list-item";


export default function Component({ data, isExpandable }) {
    let [showData, setShowData] = useState([]);

    useEffect(() => {
        if(data) {
            let spliceData = JSON.parse(JSON.stringify(data)).splice(0, 3);

            setShowData(spliceData);
        }
    }, []);

    if(isExpandable) {
        return (
            <>
            {showData?.map(item => <DisqueListItem data={item} />)}
            </>
        )
    } else {
        return data?.map(item => <DisqueListItem data={item} />)
    }
}