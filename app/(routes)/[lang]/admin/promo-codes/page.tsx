'use client'

import Input from "@/components/form/Input"
import {useForm} from "react-hook-form"
import {useState} from "react"
import RadioBtn from "@/components/form/RadioBtn"
import Datepicker from "@/components/Datepicker"
import {resolver} from "@/validation/schema/frontend/promoCode"
import Header from "@/components/admin/Header";
import useSWR from "swr"
import {fetcher} from "@/utils/helpers";
import ErrorBox from "@/components/admin/ErrorBox";
import Checkbox from "@/components/form/Checkbox";
import {ReceiptPercentIcon} from "@heroicons/react/24/outline";
import Spinner from "@/components/Spinner";

interface PromoCode {
    code: string,
    unit: string,
    value: number
}

export default function ShowCodes(){
    const [code, setCode] = useState("")
    const [unit, setUnit] = useState("")
    const [value, setValue] = useState("0")
    const [startDate, setStartDate] = useState("")

    const { data: categories, error: categoriesError, isLoading: categoriesLoading }
        = useSWR<CategoryInterface[]>("/api/categories", fetcher)

    const { data: subcategories, error: subcategoriesError, isLoading: subcategoriesLoading }
        = useSWR<SubcategoryPopulatedInterface[]>("/api/subcategories", fetcher)

    const { register, handleSubmit, formState: {errors} }
        = useForm<PromoCode>({resolver})

    const submitNewCode = () => {
        console.log("submitting")
    }

    return (
            <div className={"flex flex-col gap-6"}>
                <div>
                    <Header
                        icon={<ReceiptPercentIcon width={20} height={20}/>}
                        title={"Create promo code"}
                        desc={"Let users get advantage from code that will reduce price of their shopping"}
                    />
                </div>

                <div className="md:col-span-3">
                    <form onSubmit={handleSubmit(submitNewCode)}>
                        <div className="shadow border overflow-hidden rounded-2xl">
                            <div className={"flex flex-col gap-4 bg-white p-6 md:p-8"}>
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
                                    <div className={"flex flex-col md:flex-row gap-4"}>
                                        <div className={"w-full md:w-1/2"}>
                                            <Datepicker
                                                title={"Start date"}
                                                setter={setStartDate}
                                            />
                                        </div>
                                        <div className={"w-full md:w-1/2"}>
                                            <Datepicker
                                                title={"End date"}
                                                setter={setStartDate}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className={"text-xs m-1 mb-2 text-gray-700"}>
                                            Categories covered
                                        </div>
                                        <div className={"flex gap-4"}>
                                            {
                                                categoriesLoading ?
                                                    <Spinner/> :
                                                    categoriesError ?
                                                        <ErrorBox/> :
                                                        !categories || categories.length === 0 ?
                                                            <div>No categories</div> :
                                                categories.map(category => {
                                                    return (
                                                        <div key={category._id}
                                                             className={"border border-gray-300 rounded-lg w-fit px-4 py-2"}>
                                                            <Checkbox id={category._id} title={category.name}
                                                                      checked={false} errors={errors}
                                                                      checker={register}/>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div className={"text-xs m-1 mb-2 text-gray-700"}>
                                            Subcategories covered
                                        </div>
                                        <div className={"flex gap-4"}>
                                            {
                                                subcategoriesLoading ?
                                                    <Spinner/> :
                                                    subcategoriesError ?
                                                        <ErrorBox/> :
                                                        !subcategories || subcategories.length === 0 ?
                                                            <div>No categories</div> :
                                                subcategories.map(subcategory => {
                                                    return (
                                                        <div key={subcategory._id}
                                                             className={"border border-gray-300 rounded-lg w-fit px-4 py-2"}>
                                                            <Checkbox id={subcategory._id}
                                                                      title={subcategory.category_id.name + " > " + subcategory.name}
                                                                      checked={false} errors={errors}
                                                                      checker={register}/>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                            </div>
                            <div className={"bg-gray-700 text-white text-center text-xs py-3 font-medium"}>
                                <button type={"submit"} className={"w-full hover:cursor-pointer"}>
                                    Add Code
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
}