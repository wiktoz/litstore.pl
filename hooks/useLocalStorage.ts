import { useState, useEffect } from "react"
import jsCookie from "js-cookie"

export default function useLocalStorage(key, initial){
    const [value, setValue] = useState(initial)

    useEffect(() => {
        const val = jsCookie.get(key)
        if(val) setValue(JSON.parse(val))
    }, [key])

    useEffect(() => {
        if(value !== initial)
            jsCookie.set(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}