import TextareaOnCheckbox from "../../../components/form/TextareaOnCheckbox"
import Checkbox from "../../../components/form/Checkbox"
import Textarea from "../../../components/form/Textarea"

export default function AddCategory(){
    const handleAddCategory = async (e) => {
        e.preventDefault()

        const data = {
            name: e.target.name.value,
            description: e.target.description.value
        }

          const JSONdata = JSON.stringify(data)
          console.log(JSONdata)
          const endpoint = '/api/categories/create'
      
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSONdata,
          }
      
          const response = await fetch(endpoint, options)
      
          const result = await response.json()
    }

    return (
            <div className="py-2">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Create a new category</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Categories are used to group products. After all you will be able to add products into existing categories.
                    </p>
                    </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" method="POST" onSubmit={handleAddCategory}>
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-12">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="given-name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Category name"
                                />
                            </div>

                            <Textarea 
                                id="description"
                                title="Description"
                                description="Describe what customers can find in your category"
                            />
                            <TextareaOnCheckbox
                                id="isSeoDescription" 
                                title="Add another description for SEO" 
                                description="If you need a different description for SEO check this box, otherwise leave it unchecked." 
                                checked={false}
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