import useSWR from "swr"
import Loader from "./Loader"
import Products from "./Products"

const fetcher = url => fetch(url).then(r => r.json())

export default function ProductsSearch({searchVal, size}){
    const { data, error } = useSWR(searchVal ? `/api/products/search/${searchVal}` : '/api/products', fetcher)
    if (error) return "An error has occurred."
    if (!data) return <Loader></Loader>

    return(
        <>
        {
            <Products products={data} size={size}/>
        }
        </>
    )
}