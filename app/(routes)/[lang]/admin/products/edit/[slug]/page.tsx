'use client'

import useSWR from 'swr'
import Select from '@/components/form/Select'
import Textarea from '@/components/form/Textarea'
import FileUpload from "@/components/form/FileUpload";
import Checkbox from '@/components/form/Checkbox'
import Input from '@/components/form/Input'
import Loader from '@/components/Loader'
import {fetcher} from "@/utils/helpers"
import {useForm} from "react-hook-form";
import {resolver} from "@/validation/schema/frontend/product"
import {useEffect, useState} from "react"

interface Photo {
    blob: string,
    name: string
}

export default function EditProduct({params}:{params: {slug: string}}){
    const { slug } = params

    const { data : categories, error: categoriesError } = useSWR<CategoryInterface[]>('/api/categories', fetcher)
    const { data : variants, error: variantsError } = useSWR<VariantInterface[]>('/api/variants', fetcher)
    const { data: product, error: productError } = useSWR<ProductInterface>('/api/products/'+slug, fetcher)
    const { data: photos, error: photosError } = useSWR<Photo[]>("/api/products/"+slug+"/photos", fetcher)

    const [description, setDescription] = useState<string>(product ? product.description : "")
    const [active, setActive] = useState<boolean>(product ? product.active : true)
    const [newBadge, setNewBadge] = useState<boolean>(product ? product.new_badge : false)

    useEffect(() => {
        if(photos){
            const f = photos.map((photo:Photo) => {
                const buffer = Buffer.from(photo.blob, 'base64');
                const blob = new Blob([buffer])
                return new File([blob], photo.name)
            })
            
            setFiles(f)
        }
    }, [photos])

    const { register, handleSubmit, formState: {errors} }
        = useForm<ProductInterface>({resolver})
    
    const [files, setFiles] = useState<File[]>([])
    
    if(categoriesError || variantsError || productError) return "An error has occurred."
    if(!product || !variants || !categories) return <Loader/>

    return (
        <div className="py-2">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-3">
                    <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Edit product</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Here you can edit products
                    </p>
                    </div>
                </div>
                <div className="mt-5 md:col-span-3 md:mt-0">
                    <form>
                    <div className="shadow overflow-hidden rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12">
                                <Input
                                    title="Name"
                                    id="name"
                                    value={product.name}
                                    checker={register}
                                    errors={errors}
                                />
                            </div>
                            <div className="col-span-4 sm:col-span-6">
                                <Input
                                    title="Manufacturer"
                                    id="manufacturer"
                                    value={product.manufacturer}
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
                                    categories ?
                                        <Select
                                            id="category"
                                            title="Category"
                                            options={categories}
                                        /> :
                                        <Loader/>
                                }
                            </div>
                            <div className={"col-span-12 sm:col-span-6"}>
                                {
                                    variants ?
                                        <Select
                                            id="variant"
                                            title="Variant"
                                            options={variants}
                                        /> :
                                        <Loader/>
                                }
                            </div>
                        </div>

                            <div className="col-span-12 py-5">
                                <Textarea
                                    id="description"
                                    title="Description"
                                    description="Describe your product"
                                    rows={6}
                                    value={product.description}
                                    setter={setDescription}
                                />
                                <p className="mt-2 text-sm text-gray-500">
                            Brief description for your product. You can use HTML tags.
                            </p>
                        </div>
                        <div className="py-5">
                            {
                                files &&
                                <FileUpload
                                    files={files}
                                    setFiles={setFiles}
                                    multiple={true}
                                />
                            }
                        </div>
                        <div>
                            <Checkbox
                                id='active'
                                title='Active'
                                description='Decide if your product will be active'
                                checked={product.active}
                                setter={setActive}
                            />
                        </div>
                        <div>
                            <Checkbox
                                id='new_badge'
                                title='New Badge'
                                description='Decide if the "new" badge will be displayed'
                                checked={product.new_badge}
                                setter={setNewBadge}
                            />
                        </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-0"
                        >
                            Edit
                        </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}