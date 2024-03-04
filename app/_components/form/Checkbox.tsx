import {Dispatch, SetStateAction} from "react"

interface CheckboxInterface {
    id: string,
    title: string,
    description?: string,
    checked: boolean,
    setter: Dispatch<SetStateAction<boolean>>
}

export default function Checkbox({id, checked, title, description, setter}:CheckboxInterface){
    const changeState = () => {
        setter(!checked)
    }

    return(
        <div className="col-span-12">
            <div className="flex mb-4 items-center">
                <div className="flex h-5 ">
                    <input
                        id={id}
                        name={id}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-0 ring-0 focus:outline-0"
                        defaultChecked={checked}
                        onChange={changeState}
                    />
                </div>
                <div className="ml-2">
                    <label htmlFor={id} >
                        <p className="text-sm text-gray-700 font-semibold">{title}</p>
                        <p className="text-gray-500 text-xs">{description}</p>
                    </label>
                </div>
            </div>
        </div>
    )
}