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

    return (
        <Link href={href} scroll={false}>
            <a className={router.asPath === href ? "active-link" : ""}>{children}</a>
        </Link>
    )

}

export default LinkComponent