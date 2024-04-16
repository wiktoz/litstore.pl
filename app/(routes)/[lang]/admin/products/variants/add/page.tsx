'use client'

import InputArray from '@/components/form/InputArray'
import { useState } from 'react'
import Header from "@/components/admin/Header";
import {Squares2X2Icon} from "@heroicons/react/24/outline";

const AddVariant = () => {
    const [options, setOptions]
        = useState<string[]>([])

    const handleSubmit = () => {
        console.log("submit")
    }

    return (
        <div className={"flex flex-col gap-6"}>
            <div>
                <Header
                    icon={<Squares2X2Icon width={20} height={20}/>}
                    title={"Create Product Variant"}
                    desc={"Quickly insert your products using variants such as size, color etc."}
                />
            </div>

            <div className="md:col-span-3">
                <form onSubmit={handleSubmit}>
                    <div className="shadow border overflow-hidden rounded-2xl">
                        <div className={"flex flex-col gap-4 bg-white p-6 md:p-8"}>
                            <InputArray
                                title="Options"
                                description="Each option in separate field. You can reshuffle options order presented to user."
                                options={options}
                                setOptions={setOptions}
                            />
                        </div>
                        <div className={"bg-gray-700 text-white text-center text-xs py-3 font-medium"}>
                            <button type={"submit"} className={"w-full hover:cursor-pointer"}>
                                Create Variant
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddVariant