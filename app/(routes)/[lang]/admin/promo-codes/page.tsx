'use client'

import Input from "@/components/form/Input"
import {useForm} from "react-hook-form"
import {useState} from "react"
import RadioBtn from "@/components/form/RadioBtn"
import Datepicker from "@/components/Datepicker"
import {resolver} from "@/validation/schema/frontend/promoCode"

interface PromoCode {
    code: string,
    unit: string,
    value: number
}

export default function ShowCodes(){
    const [code, setCode] = useState("")
    const [unit, setUnit] = useState("")
    const [value, setValue] = useState("0")

    const { register, handleSubmit, formState: {errors} }
        = useForm<PromoCode>({resolver})

    const submitNewCode = () => {
        console.log("submitting")
    }

    return (
            <div className="py-2">
                <form onSubmit={handleSubmit(submitNewCode)}>
                    <Input
                        id="code"
                        title="Promo Code"
                        type="text"
                        value={code}
                        errors={errors}
                        checker={register}
                        setter={setCode}
                    />
                    <RadioBtn
                        title="Unit"
                        name="unit"
                        options={[{id: "percent", name: "%"}, {id: "cashValue", name: "PLN"}]}
                        value={unit}
                        errors={errors}
                        checker={register}
                        setter={setUnit}
                    />
                    {
                        unit ?
                            <Input
                                id="value"
                                title="Promo Value"
                                type="number"
                                value={value.toString()}
                                errors={errors}
                                checker={register}
                                setter={setValue}
                            />
                            : ""
                    }
                    <Datepicker/>
                    <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded-lg">Submit</button>
                </form>
            </div>
    )
}