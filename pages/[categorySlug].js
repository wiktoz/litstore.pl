import { useRouter } from "next/router"
import useSWR from "swr"

import Loader from "../components/Loader"
import Products from "../components/Products"

const fetcher = url => fetch(url).then(r => r.json())

const CategoryProducts = () => {
    const router = useRouter()
    const { categorySlug } = router.query

    const { data: category, error: categoryError } = useSWR("/api/categories/get/"+categorySlug, fetcher)
    const { data: products, error: productsError } = useSWR(category ? "/api/products/categoryId/"+category._id : null, fetcher)

    if(categoryError || productsError) return ""
    if(!category || !products) return <Loader/>

    return(
        <div>
            <div className="mt-4 mb-8">
                <h1 className="text-xl uppercase font-bold tracking-tighter">{category.name}</h1>
                <p className="text-xs mt-1 text-gray-500">{category.description}</p>
            </div>

            <Products products={products} />
        </div>
    )
}

export default CategoryProducts