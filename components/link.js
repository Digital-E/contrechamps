import Link from 'next/link'
import { useRouter } from "next/router"

const LinkComponent = ({href, children}) => {

    let router = useRouter()

    let newUrl = href !== null ? href : "/";

    let split = href !== null && href.split("__");

    if(split.length === 3 && href !== null) {

        newUrl = `/${split[0]}/${split[1]}/${split[2]}`

    } else if (split.length === 4 && href !== null) {

        newUrl = `/${split[0]}/${split[1]}/${split[2]}/${split[3]}`
        
    }


    return (
        <Link href={newUrl} scroll={false}>
            <a className={router.asPath === newUrl ? "active-link" : ""}>{children}</a>
        </Link>
    )

}

export default LinkComponent