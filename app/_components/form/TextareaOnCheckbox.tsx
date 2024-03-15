import { useState } from "react"

interface Props {
    id: string,
    title: string,
    description: string,
    checked: boolean,
    inputId: string,
    inputTitle: string,
    inputDescription: string
}

export default function TextareaOnCheckbox({id, title, description, checked, inputId, inputTitle, inputDescription}:Props){
    const [open, setOpen] = useState<boolean>(checked)

    const handleChange = () => {
        setOpen(!open)
    }

    return(
        <div className="py-5 col-span-12">
            <div className="flex items-start mb-4">
                <div className="flex h-5 items-center">
                <input
                    id={id}
                    name={id}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-0 ring-0 focus:outline-0"
                    onChange={handleChange}
                    checked={checked}
                />
                </div>
                <div className="ml-3 text-sm">
                <label htmlFor={id} className="font-medium text-gray-700">
                    {title}
                </label>
                <p className="text-gray-500">{description}</p>
                </div>
            </div>
            <div className={`${checked ? "block" : "hidden"}`}>
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
                    {inputTitle}
                </label>
                <div className="mt-1">
                <textarea
                    id={inputId}
                    name={inputId}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={inputDescription}
                    defaultValue={''}
                />
                </div>
        </div>
    </div>
    )
}