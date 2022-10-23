import useSWR from "swr"
import Loader from '../Loader'
import ShowBox from "./ShowBox"

const fetcher = url => fetch(url).then(r => r.json())

export default function AdminProducts({searchVal}){
    const { data, error } = useSWR(searchVal ? `/api/products/search/${searchVal}` : '/api/products/get', fetcher)
    if (error) return "An error has occurred."
    if (!data) return <Loader></Loader>

    return(
        <>
        {
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