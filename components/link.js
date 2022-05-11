import Link from 'next/link'
import { useRouter } from "next/router"

const LinkComponent = ({href, children}) => {

    let router = useRouter()

    let lang = router.query.lang

    // if(lang === undefined) {
    //     lang = "en-gb"
    // }

    // if(data === null) {
    //     return <a>{ children }</a>;
    // }

    let newUrl = href;

    let split = href.split("__");

    if(split.length === 3) {
        newUrl = `/${split[0]}/${split[1]}/${split[2]}`
    }

    return (
        <Link href={newUrl} scroll={false}>
            <a className={router.asPath === newUrl ? "active-link" : ""}>{children}</a>
        </Link>
    )

}

export default LinkComponent