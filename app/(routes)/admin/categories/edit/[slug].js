import TextareaOnCheckbox from "../../../../app/components/form/TextareaOnCheckbox"
import Checkbox from "../../../../app/components/form/Checkbox"
import Textarea from "../../../../app/components/form/Textarea"
import Loader from "../../../../app/components/Loader"
import { useRouter } from "next/router"
import useSWR from 'swr'
import Input from "../../../../app/components/form/Input"

const fetcher = url => fetch(url).then(r => r.json())

export default function EditCategory(){
    const router = useRouter()
    const { slug } = router.query

    const { data : category, error: categoryError } = useSWR(slug ? '/api/categories/' + slug : null, fetcher)

    if(categoryError) return "An error has occurred."
    if(!category) return <Loader/>

    const handleAddCategory = async (e) => {
        e.preventDefault()

        const data = {
            name: e.target.name.value,
            description: e.target.description.value
        }

          const JSONdata = JSON.stringify(data)
          console.log(JSONdata)
          const endpoint = '/api/categories'
      
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSONdata,
          }
      
          const response = await fetch(endpoint, options)
          console.log(response)
    }

    return (
            <div className="py-2">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-3">
                    <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Edit category {category.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Edit category name, description or display settings.
                    </p>
                    </div>
                </div>
                <div className="mt-5 md:col-span-3 md:mt-0">
                    <form action="#" method="POST" onSubmit={handleAddCategory}>
                    <div className="shadow overflow-hidden rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-12">
                                <Input
                                    title="Name"
                                    id="name"
                                    value={category.name}
                                />
                            </div>

                            <Textarea 
                                id="description"
                                title="Description"
                                description="Describe what customers can find in your category"
                                value={category.description}
                            />
                            <TextareaOnCheckbox
                                id="isSeoDescription" 
                                title="Add another description for SEO" 
                                description="If you need a different description for SEO check this box, otherwise leave it unchecked." 
                                checked={category?.seo_description}
                                inputId="seoDescription"
                                inputTitle="SEO Description"
                                inputDescription="Your SEO Description"
                            />
                            <div className="col-span-12">
                            <Checkbox
                                id="active" 
                                title="Active"
                                description="Decide if this category will be available for users"
                                checked={true}
                            />
                            <Checkbox
                                id="displayInNavbar" 
                                title="Display In Navbar"
                                description="Decide if this category will be displayed in navbar"
                                checked={true}
                            />
                            <Checkbox
                                id="displayInFooter" 
                                title="Display In Footer"
                                description="Decide if this category will be displayed in footer"
                                checked={true}
                            />
                            </div>
                        </div>
                        <div className="py-3 text-right">
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-0 focus:ring-offset-2"
                        >
                            Save
                        </button>
                        </div>
                    </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
    )
}