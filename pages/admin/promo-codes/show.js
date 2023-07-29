import NewInput from "../../../components/form/NewInput";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from "react-hook-form";
import {useState} from "react";
import RadioBtn from "../../../components/form/RadioBtn";
import Datepicker from "../../../components/Datepicker";

export default function ShowCodes(){
    const [code, setCode] = useState("")
    const [unit, setUnit] = useState()
    const [value, setValue] = useState(0)

    const validationSchema = Yup.object().shape({
        code: Yup.string().required('Code is required'),
        unit: Yup.string().required("Unit is required").oneOf(["cashValue", "percent"]),
        value: Yup.number().required('Value is required').test({
            name: 'max',
            exclusive: false,
            params: { },
            message: 'Max value is 100%',
            test: function (value) {
                return this.parent.unit === "percent" ? value <= 100 : true
            },
        }),
    })

    const resolver = yupResolver(validationSchema)
    const { register, handleSubmit, formState: {errors} } = useForm({resolver})
    const submitNewCode = () => {
        console.log("submitting")
    }

    return (
            <div className="py-2">
                <form onSubmit={handleSubmit(submitNewCode)}>
                    <NewInput
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
                            <NewInput
                                id="value"
                                title="Promo Value"
                                type="number"
                                value={value}
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