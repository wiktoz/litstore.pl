import {UseFormRegister} from "react-hook-form";

interface Option {
    id: string,
    name: string
}

interface RadioInterface {
    title: string,
    name: string,
    description?: string,
    options: Option[],
    value?: string,
    errors: { [key: string]: { message?: string } },
    checker: UseFormRegister<any>,
    setter: (value: string) => void,
}

export default function RadioBtn({title, name, description, options, value, errors, checker, setter}:RadioInterface){
    return(
        <div>
            <legend className="text-xs text-gray-700 mx-1">
                {title}
            </legend>
            {
                description &&
                    <p className="text-xs text-gray-500">{description}</p>
            }
            <div className="flex flex-row my-1">
                {
                    options.map((option:Option) => {
                        return(
                            <div className="flex items-center px-4 py-2 bg-white first:rounded-l-lg last:rounded-r-lg border border-gray-300 border-l-0 first:border" key={option.id}>
                                <input
                                    { ...checker ? checker(name) : ""}
                                    id={option.id}
                                    name={name}
                                    value={option.id}
                                    type="radio"
                                    checked={value === option.id}
                                    onClick={() => setter(option.id)}
                                    className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-0 ring-0 focus:ring-opacity-0"
                                />
                                <label htmlFor={option.id} className="ml-2 block text-sm font-medium text-gray-700">
                                    {option.name}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
            <div className="text-red-600 text-xs">{ errors ? errors[name]?.message : ""}</div>
        </div>
    )
}