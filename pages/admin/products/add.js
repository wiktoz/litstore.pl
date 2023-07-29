import useSWR from 'swr'
import Select from '../../../components/form/Select'
import Textarea from '../../../components/form/Textarea'
import FileInputOrder from '../../../components/form/file-upload/FileUploadOrderFiles'
import Checkbox from '../../../components/form/Checkbox'
import Input from '../../../components/form/Input'
import axios from 'axios'
import {useRef} from 'react'
import Loader from '../../../components/Loader'

const fetcher = url => fetch(url).then(r => r.json())

export default function AddProduct(){
    const { data : categories, error: categoriesError } = useSWR('/api/categories', fetcher)
    const { data : variants, error: variantsError } = useSWR('/api/variants/get', fetcher)

    const files = useRef()

    if (categoriesError || variantsError) return "An error has occurred."
    if (!categories || !variants) return <Loader />

    const handleSubmit = (e) => {
        e.preventDefault()

        const fileArr = files.current.getFiles()
        delete fileArr.img
        delete fileArr.id

        let formData = new FormData()
        formData.append("name", e.target.name.value)
        formData.append("category", e.target.category.value)
        formData.append("variant", e.target.variant.value)
        formData.append("description", e.target.description.value.replace(/\n/g, '<br>\n'))
        formData.append("manufacturer", e.target.manufacturer.value)
        formData.append("active", e.target.active.checked)
        formData.append("new_badge", e.target.new_badge.checked)
        fileArr.forEach(file=>{
            formData.append("photos", file)
        })

        axios.post('/api/products/add', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
        })
          .then(function (response) {
            console.log(response);
            e.target.reset()
            files.current.fileRemoveAll()
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
        <div className="py-2">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-3">
                    <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">Add product</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Here you can add new products to the shop
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
                                />
                            </div>
                            <div className="col-span-4 sm:col-span-6">
                                <Input
                                    title="Manufacturer"
                                    id="manufacturer"
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
                            />
                            <p className="mt-2 text-sm text-gray-500">
                            Brief description for your product. You can use HTML tags.
                            </p>
                        </div>
                        <div className="py-5">
                            <FileInputOrder
                                id="photos"
                                title="Photos"
                                ref={files}
                            />
                        </div>
                        <div>
                            <Checkbox
                                id='active'
                                title='Active'
                                description='Decide if your product will be active'
                                checked={true}
                            />
                        </div>
                        <div>
                            <Checkbox
                                id='new_badge'
                                title='New Badge'
                                description='Decide if the "new" badge will be displayed'
                                checked={true}
                            />
                        </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-0"
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