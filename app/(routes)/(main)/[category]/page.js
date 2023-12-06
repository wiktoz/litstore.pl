'use client'

import useSWR from "swr"

import Loader from "/app/_components/Loader"
import Products from "/app/_components/Products"

const fetcher = url => fetch(url).then(r => r.json())

const CategoryProducts = ({params}) => {
    const { data: category, error: categoryError } = useSWR(params.category ? "/api/categories/slug/"+params.category : null, fetcher)
    const { data: products, error: productsError } = useSWR(category ? "/api/products/category/"+category._id : null, fetcher)

    if(categoryError || productsError) return <Loader/>
    if(!category || !products) return <Loader/>

    return(
        <div>
            <div className="mt-4 mb-8">
                <h1 className="text-xl uppercase font-bold tracking-tighter text-gray-700">{category.name}</h1>
                <p className="text-xs mt-1 text-gray-500">{category.description}</p>
            </div>

            <Products products={products} />
        </div>
    )
}

export default CategoryProducts