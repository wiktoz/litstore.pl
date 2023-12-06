import Link from 'next/link'

const formatPrice = (amount) => {
    return Intl.NumberFormat('pl', {style:'currency', currency:'PLN'}).format(amount)
}

const ProductsOrder = ({products, size}) => {
    return(
        <div className={"flex flex-col w-full"}>
            {
                products && products.length > 0 ?
                products.map((product, index)=>{
                    return(
                            <div className="mx-auto rounded-md border flex flex-row w-full p-4 my-2" key={product._id+index}>
                                <div>
                                    <img src={"/img/products/" + product.main_photo} className="rounded w-32"/>
                                </div>
                                <div className='m-8 my-auto'>
                                    <p className="text-xs font-semibold text-gray-400 mb-1">{product.producer}</p>
                                    <p className="text-sm font-normal text-gray-700">{product.name}</p>
                                </div>
                                <div className="mx-auto my-auto">
                                    <span>{formatPrice(product.price)}</span>
                                    <span className='mx-4 text-xs'>x</span>
                                    <span>
                                        {product.qty}
                                    </span>
                                    <span className="text-xs ml-1">
                                        {product.unit}
                                    </span>
                                </div>
                            </div>
                    )
                })
                : 
                <p className="text-xs font-semibold my-4">No products</p>
            }
        </div>
    )
}

export default ProductsOrder