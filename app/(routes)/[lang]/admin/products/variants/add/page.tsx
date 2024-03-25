'use client'

import InputArray from '@/components/form/InputArray'
import { useState } from 'react'

const AddVariant = () => {
    const [options, setOptions]
        = useState<string[]>([])

    const handleSubmit = () => {
        console.log("submit")
    }

    return (
        <>
        <div className="py-2">
            <div className="md:grid md:grid-cols-1 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                    <h3 className="text-md font-medium text-gray-900">Add variants</h3>
                    <p className="mt-1 text-xs text-gray-600">
                        Each product can be sold in different variants such as: colour, size etc.
                        Add your variants and later simply pin them to products.
                    </p>
                    </div>
                </div>
                <div className="mt-5 md:col-span-1 md:mt-0">
                    <form onSubmit={handleSubmit}>
                    <div className="shadow sm:overflow-hidden sm:rounded-lg">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-12 my-2">
                                    <InputArray
                                        title="Variant Options"
                                        description="Each option in separate field. You can reshuffle options order presented to user."
                                        options={options}
                                        setOptions={setOptions}
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