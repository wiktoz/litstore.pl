import { useState, useEffect } from "react"

export default function TextareaOnCheckbox(props){
    const [checked, setChecked] = useState(props.checked)

    const handleChange = () => {
        setChecked(!checked)
    }

    return(
        <div className="py-5 col-span-12">
            <div className="flex items-start mb-4">
                <div className="flex h-5 items-center">
                <input
                    id={props.id}
                    name={props.id}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-0 ring-0 focus:outline-0"
                    onChange={handleChange}
                    checked={checked}
                />
                </div>
                <div className="ml-3 text-sm">
                <label htmlFor={props.id} className="font-medium text-gray-700">
                    {props.title}
                </label>
                <p className="text-gray-500">{props.description}</p>
                </div>
            </div>
            <div className={`${checked ? "block" : "hidden"}`}>
                <label htmlFor={props.inputId} className="block text-sm font-medium text-gray-700">
                    {props.inputTitle}
                </label>
                <div className="mt-1">
                <textarea
                    id={props.inputId}
                    name={props.inputId}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={props.inputDescription}
                    defaultValue={''}
                />
                </div>
        </div>
    </div>
    )
}