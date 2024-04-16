import useSWR from "swr"
import Loader from '../Loader'
import Product from '@/components/admin/Product'
import {fetcher} from "@/utils/helpers"
import ErrorBox from "@/components/admin/ErrorBox";

export default function AdminProducts({searchVal}:{searchVal: string}){
    const { data, error, isLoading } = useSWR(searchVal ? `/api/products/search/${searchVal}` : '/api/products', fetcher)

    return(
        <>
        {
            isLoading ?
                <Loader/> :
            error ?
                <ErrorBox/> :
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