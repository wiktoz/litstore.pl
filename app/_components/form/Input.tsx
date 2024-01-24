'use client'

import {useState} from "react"

const Input = ({id, title, type, value, autoComplete, errors, checker, setter}) => {
    const [currentValue, setCurrentValue] = useState(value || "")

    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {title}
            </label>
            <input
                { ...checker ? checker(id) : ""}
                type={type}
                id={id}
                name={id}
                placeholder={title}
                autoComplete={autoComplete ? autoComplete : ""}
                value={currentValue}
                onChange={ e => {
                    setCurrentValue(e.target.value)
                    if(setter) setter(e.target.value)
                }}
                className={"w-full my-2 p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
                    "focus:outline-none focus:border focus:border-gray-800 block ring-0 focus:ring-0 " +
                    (errors ? errors[id] ? "border-red-600" : "border-gray-300" : "border-gray-300")}
            />
            <div className="text-red-600 text-xs">{ errors ? errors[id]?.message : ""}</div>
        </div>
    )
}

export default Input