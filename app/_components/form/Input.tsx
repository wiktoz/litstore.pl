'use client'

import {useState} from "react"
import {UseFormRegister, UseFormSetValue} from "react-hook-form";

interface Props {
    id: string,
    title: string,
    type?: string,
    value?: string,
    autoComplete?: string,
    errors: { [key: string]: { message?: string } },
    checker: UseFormRegister<any>,
    setter?: (value: string) => void,
    setValue?: UseFormSetValue<any>
}

const Input = ({id, title, type, value, autoComplete, errors, checker, setter}:Props) => {
    const [currentValue, setCurrentValue] = useState(value || "")

    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-xs text-gray-700 px-1">
                {title}
            </label>
            <input
                { ...checker ? checker(id) : ""}
                type={type ? type : "text"}
                id={id}
                name={id}

                autoComplete={autoComplete ? autoComplete : "off"}
                value={currentValue}
                onChange={ e => {
                    setCurrentValue(e.target.value)
                    if(setter) setter(e.target.value)
                }}
                className={"w-full my-1 p-2 px-3 border border-gray-300 text-gray-900 text-sm rounded-md " +
                    "focus:outline-none focus:border focus:border-gray-800 block ring-0 focus:ring-0 " +
                    (errors ? errors[id] ? "border-red-600" : "border-gray-300" : "border-gray-300")}
            />
            <div className="text-red-600 text-xs">{ errors ? errors[id]?.message : ""}</div>
        </div>
    )
}

export default Input