'use client'

export default function AddCategory(){

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

                </div>
            </div>
    )
}