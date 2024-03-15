import useSWR from "swr"
import Loader from "./Loader"
import Products from "./Products"
import {fetcher} from "@/utils/helpers";

interface Props {
    searchVal: string,
    size: string
}

export default function ProductsSearch({searchVal, size}:Props){
    const { data, error, isLoading } = useSWR<ProductInterface[]>(searchVal ? `/api/products/search/${searchVal}` : '/api/products', fetcher)
    if (error) return "An error has occurred."
    if (!data) return <Loader></Loader>

    return(
        <>
        {
            <Products
                products={data}
                size={size}
                error={error}
                isLoading={isLoading}
            />
        }
        </>
    )
}