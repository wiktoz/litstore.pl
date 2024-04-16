import {Dispatch, SetStateAction, useState} from "react"
import {UseFormRegister} from "react-hook-form";

interface CheckboxInterface {
    id: string,
    title: string,
    description?: string,
    checked: boolean,
    errors: { [key: string]: { message?: string } },
    checker: UseFormRegister<any>,
    setter?: Dispatch<SetStateAction<boolean>>
}

export default function Checkbox({id, checked, title, description, errors, checker, setter}:CheckboxInterface){
    const [state, setState] = useState<boolean>(checked || true)
    const changeState = () => {
        if(setter) setter(!state)
        setState(!state)
    }

    return(
        <div className="col-span-12">
            <div className="flex items-center">
                <div className="flex">
                    <input
                        {...checker ? checker(id) : ""}
                        id={id}
                        name={id}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-0 ring-0 focus:outline-0"
                        defaultChecked={checked}
                        onChange={changeState}
                    />
                </div>
                <div className="ml-2">
                    <label htmlFor={id}>
                        <p className="text-sm text-gray-700 font-semibold">{title}</p>
                        <p className="text-gray-500 text-xs">{description}</p>
                    </label>
                </div>
                <div className="text-red-600 text-xs">{errors ? errors[id]?.message : ""}</div>
            </div>
        </div>
    )
}