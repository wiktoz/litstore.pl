import Link from 'next/link'
import Loader from "./Loader";

const Products = ({products, size, error}) => {
    if(error) return "Cannot load products. Try again later."
    if(!products) return <Loader/>

    return(
        <div className={"grid grid-cols-2 gap-4 " + (size === "small" ? "md:grid-cols-6" : "md:grid-cols-4")}>
            {
                products && products.length > 0 ?
                products.map((product)=>{
                    return(
                        <Link href={"/p/" + product.slug} key={product.slug}>
                            <div className="rounded-md border hover:cursor-pointer relative h-full">
                                {
                                    product.new_badge ? 
                                    <div className="bg-gray-700 absolute top-0 right-0 rounded-tr-md rounded-bl-md">
                                        <p className="text-white text-xs px-2 py-1 tracking-tight">new</p>
                                    </div> : ""
                                }
                                <div className="h-full flex flex-col justify-between">
                                    <div className="grow flex justify-center">
                                        <div className="my-auto">
                                            <img src={"/img/products/" + product.main_photo}/>
                                        </div>
                                    </div>

                                    <div className='m-2 my-4'>
                                        <p className="text-xs font-semibold text-gray-400 mb-1">{product.producer}</p>
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