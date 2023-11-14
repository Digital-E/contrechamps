import { useEffect } from "react"
import router, { useRouter } from "next/router"

export default function Index({}) {
    useEffect(() => {
        let lang = window.navigator.languages
        if(lang.includes('en')) {
            router.replace("/en_gb")
        } else if (lang.includes('fr')) {
            router.replace("/fr")
        } else {
            router.replace("/fr")
        }
    },[])

    return null
  }