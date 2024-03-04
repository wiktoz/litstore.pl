import {Dispatch, SetStateAction} from "react";

interface TextareaInterface {
    id: string,
    title: string,
    description?: string,
    rows?: number,
    value: string,
    setter: Dispatch<SetStateAction<string>>
}

export default function Textarea({id, title, description, rows, value, setter}:TextareaInterface){
    return(
        <div className="col-span-12 py-2">
            <label htmlFor={id} className="block text-xs font-medium text-gray-700">
                {title}
            </label>
            <div className="mt-1">
            <textarea
                id={id}
                name={id}
                rows={rows ? rows : 3}
                className={"mt-1 block w-full rounded-lg border border-gray-300 shadow " +
                "ring-0 focus:ring-0 focus:outline-none focus:border focus:border-gray-800 sm:text-sm"}
                placeholder={description}
                defaultValue={value}
                onChange={(e) => setter(e.target.value)}
            />
            </div>
        </div>
    )
}