'use client'

import useSWR from "swr"

import Loader from "@/components/Loader"
import Products from "@/components/Products"
import {fetcher} from "@/utils/helpers"

const CategoryProducts = ({params}: {params: { category: string }}) => {
    const { data: category, error: categoryError } = useSWR<CategoryInterface>(params.category ? "/api/categories/"+params.category : null, fetcher)
    const { data: products, error: productsError, isLoading: isProductLoading } = useSWR<ProductInterface[]>(category ? "/api/products/category/"+category._id : null, fetcher)

    if(categoryError || productsError) return "no category"
    if(!category || !products) return <Loader/>

    return(
        <div>
            <div className="mt-4 mb-8">
                <h1 className="text-xl font-bold tracking-tighter text-gray-900">{category.name}</h1>
                <p className="text-xs mt-1 text-gray-500">{category.description}</p>
            </div>

            <Products products={products} error={productsError} isLoading={isProductLoading} />
        </div>
    )
}

export default CategoryProducts