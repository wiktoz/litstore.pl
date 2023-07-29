import RadioBtn from '../../../../components/form/RadioBtn'
import Input from '../../../../components/form/Input'
import axios from 'axios'
import InputArray from '../../../../components/form/InputArray'
import { useRef } from 'react'
import {BiAddToQueue} from 'react-icons/bi'
import Button from "../../../../components/admin/Button";

const AddVariant = () => {
    const inputArray = useRef()

    const addOption = () => {
        inputArray.current.addInput()
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let data = {
            name: e.target.name.value,
            displayName: e.target.displayName.value,
            selectOption: e.target.selectOption.value,
            options: inputArray.current.getValues()
        }

        axios.post('/api/variants/add', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
          .then(function (response) {
            console.log(response)
            e.target.reset()
            inputArray.current.removeAll()
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
        <div className="py-2">
            <div className="md:grid md:grid-cols-1 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add variants</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Each product can be sold in different variants such as: colour, size etc.
                        Add your variants and later simply pin them to products.
                    </p>
                    </div>
                </div>
                <div className="mt-5 md:col-span-1 md:mt-0">
                    <form action="/api/variants/add" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="shadow sm:overflow-hidden sm:rounded-lg">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-12 sm:col-span-6">
                                    <Input
                                        title="Name"
                                        id="name"
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <Input
                                        title="Display Name"
                                        id="displayName"
                                    />
                                </div>
                                <div className="col-span-12 my-2">
                                    <RadioBtn 
                                        title="Select Option"
                                        name="selectOption"
                                        description="Decide how user will pick this variant"
                                        options={[{id: "select", name: "Select List"}, {id: "btn", name: "Radio Button"}]}
                                    />
                                </div>
                                <div className="col-span-12 my-2">
                                    <InputArray 
                                        title="Options"
                                        description="Type each option into separate field. Later on you can order options in which they will appear for the users." 
                                        ref={inputArray} 
                                    />
                                    <Button
                                        onClick={addOption}
                                        icon={<BiAddToQueue/>}
                                        title={"Add Option"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-lg border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-0"
                        >
                            Add
                        </button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>

            </>
    )
}

export default AddVariant