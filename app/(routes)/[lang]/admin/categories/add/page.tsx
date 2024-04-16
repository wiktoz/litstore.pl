'use client'

import Input from "@/components/form/Input"
import {resolver} from "@/validation/schema/frontend/category"
import {useForm} from "react-hook-form"
import Textarea from "@/components/form/Textarea";
import Checkbox from "@/components/form/Checkbox";

export default function AddCategory(){
    const { register, handleSubmit, formState: {errors} }
        = useForm<CategoryInterface>({resolver})

    const submitCategory = async (data: CategoryInterface) => {
        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("description", data.description ? data.description : "")
        formData.append("seo_description", data.seo_description ? data.seo_description : "")
        formData.append("active", data.active ? data.active.toString() : "true")

        console.log(data)

        /*const res = await fetch("http://localhost:3000/api/categories", {
            method: "POST",
            body: formData
        })*/
    }

    return (
            <div className="py-2">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-3">
                    <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Create a new category</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Categories are used to group products. After all you will be able to add products into existing categories.
                    </p>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit(submitCategory)}>
                    <Input
                        id={"name"}
                        title={"name"}
                        errors={errors}
                        checker={register}
                    />
                    <Textarea
                        id={"description"}
                        title={"description"}
                        checker={register}
                        errors={errors}
                    />
                    <Checkbox
                        id={"active"}
                        title={"Active"}
                        description={"Decide if this category will be displayed for users"}
                        checked={true}
                        checker={register}
                        errors={errors}
                    />
                        <button type={"submit"}>
                            Add
                        </button>
                    </form>
                </div>
                </div>
            </div>
    )
}