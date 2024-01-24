import useSWR from "swr"
import Loader from '../Loader'
import ShowBox from "./ShowBox"

const fetcher = url => fetch(url).then(r => r.json())

export default function AdminProducts({searchVal}){
    const { data, error, isLoading } = useSWR(searchVal ? `/api/products/search/${searchVal}` : '/api/products', fetcher)
    if (error) return "An error has occurred."

    return(
        <>
        {
            isLoading ?
                <Loader/> :
            error ?
                <div>Error occured. Try again later.</div> :
            !data ?
                <div>No products</div> :

            data.map(product => {
                return(
                    <ShowBox
                        key={product.slug}
                        showLink={'/' + product.slug}
                        editLink={'/admin/products/edit/' + product.slug}
                        deleteLink={'/admin/products/delete/' + product.slug}
                    >
                        <div className="w-24">
                            <img src={'/img/products/' + product.main_photo} />
                        </div>
                        <div className="mx-6">
                            {product.new_badge ?
                                <p className="text-gray-400 text-xs">NEW</p>
                                : ""
                            }
                            <p className="text-gray-700 text-md">{product.name}</p>
                        </div>
                    </ShowBox>
                )
            })
        }
        </>
    )
}