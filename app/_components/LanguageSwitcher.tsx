'use client'

import Flag from 'react-world-flags'
import Link from "next/link"
import {usePathname} from "next/navigation"
import {useState} from "react";

const getLocale = (path:string) => {
    return path.split('/', 2)[1]
}

const getUrl = (path:string) => {
    const i = path.indexOf("/", 1)

    return i === -1 ? "" : path.substring(i)
}

const LanguageSwitcher = () => {
    const pathname = usePathname()
    const [locale] = useState<string>(getLocale(pathname))
    const [url] = useState<string>(getUrl(pathname))

    return(
        <div className={"flex flex-col gap-1"}>
            <div className={locale === "fr" ? "hidden" : "block"}>
                <Link href={"/fr" + url} locale={"fr"} className={"flex gap-2"}>
                    <Flag code={"FR"} width={16} className={"opacity-70"}/>
                    Français
                </Link>
            </div>
            <div className={locale === "de" ? "hidden" : "block"}>
                <Link href={"/de" + url} locale={"de"} className={"flex gap-2"}>
                    <Flag code={"DE"} width={16} className={"opacity-70"}/>
                    Deutsch
                </Link>
            </div>
            <div className={locale === "en" ? "hidden" : "block"}>
                <Link href={"/en" + url} locale={"en"} className={"flex gap-2"}>
                    <Flag code={"GB"} width={16} className={"opacity-70"}/>
                    English
                </Link>
            </div>
        </div>
    )
}

export default LanguageSwitcher