import {Dispatch, SetStateAction, useState} from "react";
import {UseFormRegister} from "react-hook-form";

interface TextareaInterface {
    id: string,
    title: string,
    description?: string,
    rows?: number,
    value?: string,
    errors: { [key: string]: { message?: string } },
    checker: UseFormRegister<any>
    setter?: Dispatch<SetStateAction<string>>
}

export default function Textarea({id, title, description, rows, value, checker, errors, setter}:TextareaInterface){
    const [currentValue, setCurrentValue] = useState<string>(value || "")

    return(
        <div className="col-span-12 py-2">
            <label htmlFor={id} className="block text-xs text-gray-700 px-1">
                {title}
            </label>
            <div className="mt-1">
                <textarea
                    {...checker ? checker(id) : ""}
                    id={id}
                    name={id}
                    rows={rows ? rows : 3}
                    placeholder={description}
                    value={currentValue}
                    onChange={e => {
                        setCurrentValue(e.target.value)
                        if (setter) setter(e.target.value)
                    }}
                    className={"w-full my-1 p-2 px-3 border border-gray-300 text-gray-900 text-sm rounded-lg " +
                        "focus:outline-none focus:border focus:border-gray-800 block ring-0 focus:ring-0 " +
                        (errors ? errors[id] ? "border-red-600" : "border-gray-300" : "border-gray-300")}
                />
                <div className="text-red-600 text-xs">{errors ? errors[id]?.message : ""}</div>
            </div>
        </div>
    )
}