import Link from 'next/link'
import Loader from "@/components/Loader"

interface Props {
    products: ProductInterface[],
    error: string,
    isLoading: boolean,
    size?: string
}

const Products = ({products, error, isLoading, size}:Props) => {
    return(
        <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 " + (size === "small" ? "md:grid-cols-6" : "md:grid-cols-4")}>
            {
                isLoading ?
                    <Loader/> :
                error ?
                    <div>Error: {JSON.stringify(error)}</div> :
                products && products.length > 0 ?
                products.map((product)=>{
                    return(
                        <Link href={"/p/" + product.slug} key={product.slug}>
                            <div className="rounded-md shadow hover:cursor-pointer relative h-full overflow-hidden">
                                {
                                    product.new_badge ? 
                                    <div className="bg-gray-900 absolute top-0 right-0 rounded-tr-md rounded-bl-md">
                                        <p className="text-white text-xs px-2 py-0.5 tracking-tight">new</p>
                                    </div> : ""
                                }
                                <div className="h-full flex flex-col">
                                    <div className="flex rounded-t-md">
                                        <img src={"/img/products/" + product.main_photo} alt={product.name}
                                        className={"overflow-hidden"}
                                        />
                                    </div>

                                    <div className='m-4'>
                                        <p className="text-xs font-semibold text-gray-400 mb-1">{product.manufacturer}</p>
                                        <p className="text-sm font-light text-gray-700">{product.name}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
                : 
                <p className="text-xs font-semibold my-4">No products</p>
            }
        </div>
    )
}

export default Products