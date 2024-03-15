import useSWR from "swr"
import Loader from '../Loader'
import Product from '@/components/admin/Product'
import {fetcher} from "@/utils/helpers"

export default function AdminProducts({searchVal}:{searchVal: string}){
    const { data, error, isLoading } = useSWR(searchVal ? `/api/products/search/${searchVal}` : '/api/products', fetcher)
    if (error) return "An error has occurred."

    return(
        <>
        {
            isLoading ?
                <Loader/> :
            error ?
                <div>Error occurred. Try again later.</div> :
            !data ?
                <div>No products</div> :

            <div className={"flex flex-col gap-2 my-4"}>
                {
                    data.map((p:ProductInterface) => {
                        return(
                            <div key={p.slug}>
                                <Product product={p}/>
                            </div>
                        )
                    })
                }
            </div>
        }
        </>
    )
}