import Link from "next/link"
import useSWR from "swr"
import Loader from "../components/Loader"
const fetcher = url => fetch(url).then(r => r.json())

const Products = () => {
    const { data, error } = useSWR('/api/products/get', fetcher)

    if (error) return "An error has occurred."
    if (!data) return <Loader />

    return(
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {
                data.map((product, index)=>{
                    return(
                        <Link href={"/" + product.slug} key={product.slug}>
                            <div className="rounded border hover:cursor-pointer">
                                <img src={"/img/products/" + product.main_photo}/>
                                <p className="text-sm text-center font-light m-2 my-6">{product.name}</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Products