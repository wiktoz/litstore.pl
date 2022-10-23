import { useState, forwardRef, useImperativeHandle} from 'react'
import { Reorder } from "framer-motion"
import {FaTimes} from 'react-icons/fa'

const InputArray = forwardRef((props, ref) => {
    const defaultState = [{id: 'idval0', value: ''},{id: 'idval1', value: ''}]
    const [options, setOptions] = useState(defaultState)

    const changeValue = (i, e) => {
        options[i].value = e.target.value
    }

    const addInput = () => {
        setOptions([...options, {id: 'idval'+options.length, value: ''}])
    }

    const removeInput = (id, e) => {
        e.preventDefault()
        setOptions(options.filter(item => item.id !== id))
    }

    const removeAll = () => {
        setOptions(defaultState)
    }

    useImperativeHandle(ref, () => ({
        getValues: () => {
            return options
        },
        addInput: () => {
            return addInput()
        },
        removeAll: () => {
            return removeAll()
        }
    }))

    return(
        <div className="col-span-12 sm:col-span-12">
            <div>
                <legend className="contents text-base font-medium text-gray-900">{props.title}</legend>
                {
                props.description ?
                    <p className="text-sm text-gray-500">{props.description}</p> : ""
                }
            </div>
            { options ?
                <Reorder.Group axis="y" className="flex flex-col my-1" values={options} onReorder={setOptions}>
                    {options.map((option, index) => (
                        <Reorder.Item className="mb-1" key={option.id} value={option}>
                            <div className="col-span-12 sm:col-span-12 flex flex-row mt-1">
                                <input
                                    type="text"
                                    name="options[]"
                                    id={option.id}
                                    defaultValue={option.value}
                                    onChange={(e) => changeValue(index, e)}
                                    className={"block w-full border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm " + (options.length > 2 ? "rounded-l-lg" : "rounded-lg")}
                                />
                                { options.length > 2 ?
                                <button onClick={(e) => removeInput(option.id, e)} className="p-2 text-sm font-medium text-white bg-gray-400 rounded-r-lg hover:bg-gray-600 focus:ring-0 focus:outline-none focus:ring-gray-300">
                                    <FaTimes />
                                    <span className="sr-only">Remove</span>
                                </button> : ""
                                }
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group> : ""
            }
        </div>
    )
})

export default InputArray