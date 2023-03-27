import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import Select from '../../../../components/form/Select'
import Textarea from '../../../../components/form/Textarea'
import FileInputOrder from '../../../../components/form/file-upload/FileUploadOrderFiles'
import Checkbox from '../../../../components/form/Checkbox'
import Input from '../../../../components/form/Input'
import axios from 'axios'
import {useRef} from 'react'
import Loader from '../../../../components/Loader'
import parse from 'html-react-parser'

const fetcher = url => fetch(url).then(r => r.json())

export default function EditProduct(){
    const router = useRouter()
    const { mutate } = useSWRConfig()
    const { slug } = router.query

    const files = useRef()

    const { data : categories, error: categoriesError } = useSWR('/api/categories', fetcher)
    const { data : variants, error: variantsError } = useSWR('/api/variants/get', fetcher)
    const { data: product, error: productError } = useSWR('/api/products/slug/'+slug, fetcher)
    
    if(categoriesError || variantsError || productError) return "An error has occured."
    if(!product || !variants || !categories) return <Loader/>

    var defaultFiles = []
    defaultFiles.push({id: product.main_photo, name: product.main_photo, img: '/img/products/'+product.main_photo, uploaded: true})
    
    product.photos.forEach(photo => {
        defaultFiles.push({id: photo, img: '/img/products/'+photo, name: photo, uploaded: true})
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const fileArr = files.current.getFiles()
        delete fileArr.img
        delete fileArr.id

        let formData = new FormData()
        formData.append("id", slug)
        formData.append("name", e.target.name.value)
        formData.append("category", e.target.category.value)
        formData.append("description", e.target.description.value)
        formData.append("manufacturer", e.target.manufacturer.value)
        formData.append("active", e.target.active.checked)
        formData.append("new_badge", e.target.new_badge.checked)
        fileArr.forEach(file=>{
            formData.append("photos", JSON.stringify(file))
            if(!file.uploaded)
            formData.append("photos", file)
        })

        axios.post('/api/products/edit', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
        })
        .then(function (response) {
            e.target.reset()
            files.current.fileRemoveAll()
            console.log(slug)
            mutate('/api/products/slug/'+response.data.slug)
            router.push('/admin/products/edit/'+response.data.slug)
        })
        .catch(function (error) {
            console.log(error);
        })
    }

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
                    <form action="/api/products/add" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12">
                                <Input
                                    title="Name"
                                    id="name"
                                    value={product.name}
                                />
                            </div>
                            <div className="col-span-4 sm:col-span-6">
                                <Input
                                    title="Manufacturer"
                                    id="manufacturer"
                                    value={product.producer}
                                />
                            </div>

                            <div className="col-span-8 sm:col-span-6">
                                <Input 
                                    title="Manufacturer's model"
                                    id="model"
                                    
                                />
                            </div>

                            <Select
                                id="category"
                                title="Category"
                                options={categories}
                                value={product.category}
                            />

                            <Select
                                id="variant"
                                title="Variant"
                                options={variants}
                            />
                        </div>

                        <div className="col-span-12 py-5">
                            <Textarea
                                id="description"
                                title="Description"
                                description="Describe your product"
                                rows={6}
                                value={product.description}
                            />
                            <p className="mt-2 text-sm text-gray-500">
                            Brief description for your product. You can use HTML tags.
                            </p>
                        </div>
                        <div className="py-5">
                            <FileInputOrder
                                id="photos"
                                title="Photos"
                                files={defaultFiles}
                                ref={files}
                            />
                        </div>
                        <div>
                            <Checkbox
                                id='active'
                                title='Active'
                                description='Decide if your product will be active'
                                checked={product.active}
                            />
                        </div>
                        <div>
                            <Checkbox
                                id='new_badge'
                                title='New Badge'
                                description='Decide if the "new" badge will be displayed'
                                checked={product.new_badge}
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