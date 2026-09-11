import Link from 'next/link'
import { useRouter } from "next/router"

const LinkComponent = ({href, children, isMenu, isSubSubPage, isLast}) => {

    // Check if link is URL

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    let isURL = href?.match(regex) !== null ? true : false

    let router = useRouter()

    let newUrl = (href !==  null && href !== undefined )  ? href : "/";

    let split = (href !==  null && href !== undefined ) && href.split("__");

    // Refactor Link if it has underscores

    if(split.length > 1 && href !== null) {

        newUrl = `/${split.join("/")}`

    }


    // Set Link as Active if on Sub Page

    // Only these top-level sections should stay highlighted while on any of their sub-pages
    let sectionsWithSubPageHighlight = ["saison", "media"];

    let splitLink = newUrl.split("/");
    let splitRouterLink = router.asPath.split("/")[2];
    let subPageIsActive = false;

    if(splitLink[2] === splitRouterLink && isMenu && sectionsWithSubPageHighlight.includes(splitLink[2])) {
        subPageIsActive = true;
    }

    // Set Link as Active if on Sub Sub Page

    splitLink = newUrl.split("/");
    splitRouterLink = router.asPath.split("/")[3];

    if(splitLink[3] === splitRouterLink && isSubSubPage) {
        subPageIsActive = true;
    }


    return (
        <Link href={newUrl} prefetch={false}>
            <a target={isURL ? "_blank" : undefined} className={router.asPath === newUrl ? `active-link ${isLast ? "button" : ""}` : subPageIsActive ? `active-link ${isLast ? "button" : ""}` : `${isLast ? "button" : ""}`}>{children}</a>
        </Link>
    )

}

export default LinkComponent