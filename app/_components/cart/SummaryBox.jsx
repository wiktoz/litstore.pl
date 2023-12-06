import Link from 'next/link'
import useShoppingCart from '/app/_context/ShoppingCart'
import useSWR from 'swr'
import Loader from '../Loader'

const fetcher = url => fetch(url).then(r => r.json())

const formatPrice = (price) => {
    return Intl.NumberFormat('pl', {style:'currency', currency:'PLN'}).format(price)
}

const SummaryBox = ({previousStep, buttonTitle, buttonLink, buttonOnClick}) => {
    const {cartDelivery, cartItems} = useShoppingCart()

    const deliveryUrl = cartDelivery.id ? '/api/deliveries/'+cartDelivery.id : null
    
    const {data: products, error: productsError} = useSWR('/api/product_item', fetcher)
    const {data: delivery, error: deliveryError} = useSWR(deliveryUrl, fetcher)

    if(productsError || deliveryError) return "An error has occurred."
    if(!products) return "No products"
    
    const calcProductsTotal = () => {
        return cartItems.reduce((total, cartItem) => {
            const item = products.find(i => i._id === cartItem.id)
            return total + (item?.price || 0) * cartItem.qty
        }, 0)
    }

    const calcDeliveryTotal = () => {
        if(!delivery) return 0
        const productsTotal = calcProductsTotal()

        if(productsTotal >= delivery.freeFrom) return 0
        else return delivery.price
    }

    return(
        <div className="my-4 md:mx-4 md:my-0 md:mb-4 rounded h-full relative">
            <div className="flex flex-col justify-between sticky top-5 bg-gray-100 p-4 rounded">
                <p className="text-lg font-bold text-gray-800 tracking-tight">Podsumowanie</p>
                <div className="text-sm py-10 text-gray-600">
                    <div className='flex flex-row justify-between'>
                        <p>Products</p>
                        <p>{formatPrice(calcProductsTotal())}</p>
                    </div>
                    {cartDelivery && cartDelivery.id ?
                    <div className='flex flex-row justify-between'>
                        <p>Delivery</p>
                        <p>{formatPrice(calcDeliveryTotal())}</p>
                    </div>
                    :""}
                    <div className="block" aria-hidden="true">
                        <div className="py-5">
                            <div className="border-t border-gray-200" />
                        </div>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <p>Total</p>
                        <p>{formatPrice(calcProductsTotal() + calcDeliveryTotal())}</p>
                    </div>
                </div>
                {previousStep ?
                <Link href={previousStep}>
                    <p className='text-xs text-gray-400 mb-4 hover:cursor-pointer hover:text-gray-500'>Go Back To Previus Step</p>
                </Link>
                : ""}
                {buttonLink ? 
                <Link href={buttonLink}>
                        <button
                            className="w-full inline-flex justify-center rounded border border-transparent bg-gray-700 p-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-0 focus:ring-offset-2"
                        >
                            {buttonTitle}
                        </button>
                </Link>
                :
                <button
                    className="w-full inline-flex justify-center rounded border border-transparent bg-gray-700 p-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-0 focus:ring-offset-2"
                    onClick={buttonOnClick}
                >
                    {buttonTitle}
                </button>
                }
            </div>
        </div>
    )
}

export default SummaryBox