'use client'

import useSWR from 'swr'
import Select from '@/components/form/Select'
import Textarea from '@/components/form/Textarea'
import Checkbox from '@/components/form/Checkbox'
import Input from '@/components/form/Input'
import {fetcher} from "@/utils/helpers"
import {useState} from "react";
import FileUpload from "@/components/form/FileUpload";
import {useForm} from "react-hook-form";
import {resolver} from "@/validation/schema/frontend/product"
import Header from "@/components/admin/Header";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import Spinner from "@/components/Spinner";

export default function AddProduct(){
    const { data : categories, error: categoriesError, isLoading: isCategoryLoading } = useSWR('/api/categories', fetcher)
    const { data : variants, error: variantsError, isLoading: isVariantLoading } = useSWR('/api/variants', fetcher)

    const [files, setFiles] = useState<File[]>([])
    const [description, setDescription] = useState<string>("")
    const [active, setActive] = useState<boolean>(true)
    const [newBadge, setNewBadge] = useState<boolean>(true)

    const { register, handleSubmit, formState: {errors} }
        = useForm<ProductInterface>({resolver})

    const submitProduct = async (data: ProductInterface) => {
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
    }

    return (
        <>
        <div className="pb-2">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-3">
                    <Header
                        icon={<PlusCircleIcon width={20} height={20} />}
                        title={"Create Product"}
                        desc={"Here you can add new products to the shop"}
                    />
                </div>
                <div className="mt-5 md:col-span-3 md:mt-0">
                    <form onSubmit={handleSubmit(submitProduct)}>
                    <div className="shadow border overflow-hidden rounded-2xl">
                        <div className="space-y-6 bg-white p-6 md:p-8">
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
                                    <Spinner/> :
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
                                        <Spinner/> :
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
                                checker={register}
                                errors={errors}
                            />
                            <p className="text-xs px-1 text-gray-500">
                                Brief description for your product. You can use HTML tags.
                            </p>
                        </div>
                        <div className="py-4">
                            <FileUpload
                                title={"Images"}
                                files={files}
                                setFiles={setFiles}
                                multiple={true}
                            />
                        </div>
                            <div className={"mx-1 flex flex-col gap-4"}>
                            <div>
                                <Checkbox
                                    id='active'
                                    title='Active'
                                    description='Decide if your product will be active'
                                    checked={active}
                                    setter={setActive}
                                    checker={register}
                                    errors={errors}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    id='new_badge'
                                    title='New Badge'
                                    description='Decide if the "new" badge will be displayed'
                                    checked={newBadge}
                                    setter={setNewBadge}
                                    checker={register}
                                    errors={errors}
                                />
                            </div>
                            </div>
                        </div>
                        <div className={"bg-gray-700 text-white text-center text-xs py-3 font-medium"}>
                            <button type={"submit"} className={"w-full hover:cursor-pointer"}>
                                Create Product
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