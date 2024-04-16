import {useEffect, useState, Dispatch, SetStateAction} from 'react'
import { Reorder } from "framer-motion"
import {PlusIcon, TrashIcon} from "@heroicons/react/24/outline"

interface InputArrayProps {
    title: string,
    description: string,
    options?: string[],
    setOptions?: Dispatch<SetStateAction<string[]>>
}

export interface InputArrayOption {
    id: string,
    value: string
}

const InputArray = ({title, description, options, setOptions}:InputArrayProps) => {
    const defaultState = [
        { id: crypto.randomUUID(), value: "" },
        { id: crypto.randomUUID(), value: "" }
    ]
    const optionsToInputArray = (opts:string[]) => {
        return opts.map(option => {
            return { id: crypto.randomUUID(), value: option }
        })
    }
    
    const [inputs, setInputs]
        = useState<InputArrayOption[]>(options && options.length > 0 ? optionsToInputArray(options) : defaultState)

    useEffect(() => {
        if (setOptions) {
            setOptions(inputs.map(input => input.value))
        }
    }, [inputs, setOptions])

    const changeValue = (index:number, value:string) => {
        let newInputs = [...inputs]
        newInputs[index].value = value
        setInputs(newInputs)
    }

    const removeInput = (index:number) => {
        const newInputs = inputs.slice(0, index).concat(inputs.slice(index + 1));
        setInputs(newInputs)
    }

    const addInput = () => {
        setInputs([...inputs, { id: crypto.randomUUID(), value: "" }])
    }

    return(
        <div className="col-span-12 sm:col-span-12">
            <div className={"m-1"}>
                <legend className="block text-sm text-gray-700 font-semibold">{title}</legend>
                {
                    description &&
                        <p className="text-xs text-gray-500">{description}</p>
                }
            </div>
            { inputs &&
                <Reorder.Group axis="y" values={inputs} onReorder={setInputs}>
                    {
                        inputs.map((option, index) => {
                            return(
                                <Reorder.Item className="mb-1" key={option.id} value={option}>
                                    <div className="col-span-12 sm:col-span-12 flex flex-row mt-1">
                                        <input
                                            type="text"
                                            name="options[]"
                                            defaultValue={option.value}
                                            onChange={(e) => changeValue(index, e.target.value)}
                                            className={"block w-full border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm " + (inputs.length > 2 ? "rounded-l-lg" : "rounded-lg")}
                                        />
                                        {
                                            inputs.length > 2 &&
                                            <button
                                                onClick={(e) => { e.preventDefault(); removeInput(index)}}
                                                className="p-2 text-sm font-medium text-white bg-gray-600 rounded-r-lg hover:bg-gray-500 focus:ring-0 focus:outline-none focus:ring-gray-300"
                                            >

                                                <TrashIcon width={16} height={16} />
                                                <span className="sr-only">Remove</span>
                                            </button>
                                        }
                                    </div>
                                </Reorder.Item>
                            )
                        })
                    }
                </Reorder.Group>
            }
            <button
                onClick={(e) => {e.preventDefault(); addInput()}}
                className={"px-2 rounded-lg my-2 py-1 bg-gray-600 hover:bg-gray-500 text-xs text-white flex flex-row items-center gap-1"}
            >
                <PlusIcon width={16} height={16}/>
                Add option
            </button>
        </div>
    )
}
export default InputArray