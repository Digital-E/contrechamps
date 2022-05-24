import Link from 'next/link'
import { useRouter } from "next/router"

const LinkComponent = ({href, children, isMenu, isSubSubPage}) => {

    let router = useRouter()

    let newUrl = (href !==  null && href !== undefined )  ? href : "/";

    let split = (href !==  null && href !== undefined ) && href.split("__");

    // Refactor Link if it has underscores

    if(split.length === 3 && href !== null) {

        newUrl = `/${split[0]}/${split[1]}/${split[2]}`

    } else if (split.length === 4 && href !== null) {

        newUrl = `/${split[0]}/${split[1]}/${split[2]}/${split[3]}`
        
    }


    // Set Link as Active if on Sub Page

    let splitLink = (href !==  null && href !== undefined ) && href.split("/");
    let splitRouterLink = router.asPath.split("/")[2];
    let subPageIsActive = false;

    if(splitLink[2] === splitRouterLink && isMenu) {
        subPageIsActive = true;
    }

    // Set Link as Active if on Sub Sub Page

    splitLink = (href !==  null && href !== undefined ) && href.split("/");
    splitRouterLink = router.asPath.split("/")[3];
    subPageIsActive = false;


    if(splitLink[3] === splitRouterLink && isSubSubPage) {
        subPageIsActive = true;
    }


    return (
        <Link href={newUrl} scroll={true}>
            <a className={router.asPath === newUrl ? "active-link" : subPageIsActive ? "active-link" : ""}>{children}</a>
        </Link>
    )

}

export default LinkComponent