'use client'

import useSWR from "swr"

import Loader from "@/components/Loader"
import Products from "@/components/Products"
import {fetcher} from "@/utils/helpers"

const SubcategoryProducts = ({params}: {params: { category: string, subcategory:string }}) => {
    const { data: category, error: categoryError } = useSWR<CategoryInterface>(params.category ? "/api/categories/"+params.category : null, fetcher)
    const { data: subcategory, error: subcategoryError } = useSWR<SubcategoryPopulatedInterface>(params.subcategory ? "/api/subcategories/"+params.subcategory : null, fetcher)
    const { data: products, error: productsError, isLoading: isProductLoading } = useSWR<ProductInterface[]>(subcategory ? "/api/products/subcategory/"+subcategory._id : null, fetcher)

    if(subcategoryError || productsError || categoryError) return "no category"
    if(!subcategory || !products || !category) return <Loader/>

    return(
        <div>
            <div className="mt-4 mb-8">
                <p className={"text-xs text-gray-600 mb-4"}>{category.name} &gt; {subcategory.name}</p>
                <h1 className="text-2xl font-bold tracking-tighter text-gray-900">{subcategory.name}</h1>
                <p className="text-sm mt-1 text-gray-500">{subcategory.description}</p>
            </div>

            <Products products={products} error={productsError} isLoading={isProductLoading} />
        </div>
    )
}

export default SubcategoryProducts