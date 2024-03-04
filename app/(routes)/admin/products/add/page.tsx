'use client'

import useSWR from 'swr'
import Select from '@/components/form/Select'
import Textarea from '@/components/form/Textarea'
import Checkbox from '@/components/form/Checkbox'
import Input from '@/components/form/Input'
import Loader from '@/components/Loader'
import {fetcher} from "@/utils/helpers"
import {useState} from "react";
import FileUpload from "@/components/form/FileUpload";
import {useForm} from "react-hook-form";
import {resolver} from "@/components/validation/schema/product"

export default function AddProduct(){
    const { data : categories, error: categoriesError, isLoading: isCategoryLoading } = useSWR('/api/categories', fetcher)
    const { data : variants, error: variantsError, isLoading: isVariantLoading } = useSWR('/api/variants', fetcher)

    const [files, setFiles] = useState<File[]>([])
    const [description, setDescription] = useState<string>("")
    const [active, setActive] = useState<boolean>(true)
    const [newBadge, setNewBadge] = useState<boolean>(true)

    const { register, handleSubmit, formState: {errors} }
        = useForm<Product>({resolver})

    const submitProduct = async (data: Product) => {
        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("manufacturer", data.manufacturer ? data.manufacturer : "")
        formData.append("description", description)
        formData.append("active", active.toString())
        formData.append("new_badge", newBadge.toString())

        files.forEach((file: File) => {
            formData.append("images", file)
        })

        const res = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            body: formData
        })

        console.log(await res.json())
    }

    return (
        <>
        <div className="py-2">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-3">
                    <div className="px-2">
                        <h3 className="text-lg font-bold leading-6 text-gray-900">Add product</h3>
                        <p className="mt-1 text-xs text-gray-600">
                            Here you can add new products to the shop
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:col-span-3 md:mt-0">
                    <form action="/api/products/add" method="POST" encType="multipart/form-data" onSubmit={handleSubmit(submitProduct)}>
                    <div className="shadow overflow-hidden rounded-2xl">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12">
                                <Input
                                    title="Name"
                                    id="name"
                                    checker={register}
                                    errors={errors}
                                />
                            </div>
                            <div className="col-span-4 sm:col-span-6">
                                <Input
                                    title="Manufacturer"
                                    id="manufacturer"
                                    checker={register}
                                    errors={errors}
                                />
                            </div>

                            <div className="col-span-8 sm:col-span-6">
                                <Input 
                                    title="Manufacturer's model"
                                    id="model"
                                    checker={register}
                                    errors={errors}
                                />
                            </div>
                            <div className={"col-span-12 sm:col-span-6"}>
                            {
                                isCategoryLoading ?
                                    <Loader/> :
                                categoriesError ?
                                    <div>Fetch error</div> :
                                categories ?
                                    <Select
                                        id="category"
                                        title="Category"
                                        options={categories}
                                    /> :
                                <div>No categories to pick. Add a new category.</div>
                            }
                            </div>
                            <div className={"col-span-12 sm:col-span-6"}>
                                {
                                    isVariantLoading ?
                                        <Loader/> :
                                    variantsError ?
                                        <div>Fetch error</div> :
                                    variants ?
                                        <Select
                                            id="variant"
                                            title="Variant"
                                            options={variants}
                                        /> :
                                    <div>No variants to pick. Add a new variant.</div>
                                }
                            </div>
                        </div>

                        <div className="col-span-12 py-5">
                            <Textarea
                                id="description"
                                title="Description"
                                description="Describe your product"
                                value={description}
                                setter={setDescription}
                            />
                            <p className="mt-2 text-sm text-gray-500">
                            Brief description for your product. You can use HTML tags.
                            </p>
                        </div>
                        <div className="py-5">
                            <FileUpload files={files} setFiles={setFiles} multiple={true}/>
                        </div>
                        <div>
                            <Checkbox
                                id='active'
                                title='Active'
                                description='Decide if your product will be active'
                                checked={active}
                                setter={setActive}
                            />
                        </div>
                        <div>
                            <Checkbox
                                id='new_badge'
                                title='New Badge'
                                description='Decide if the "new" badge will be displayed'
                                checked={newBadge}
                                setter={setNewBadge}
                            />
                        </div>
                        </div>
                        <div className={"bg-gray-700 text-white text-center text-sm py-4"}>
                            <button type={"submit"}>
                                Add product
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