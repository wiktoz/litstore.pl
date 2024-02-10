import { useShoppingCart } from '@/context/ShoppingCart'
import {fetcher, formatPrice} from "@/utils/helpers"
import useSWR from 'swr'

interface Props {
    previousStep?: () => void,
    nextStep: () => void,
    nextStepTitle: string
}

const SummaryBox = ({previousStep, nextStep, nextStepTitle}:Props) => {
    const {cartDelivery, cartItems, removeFromCart} = useShoppingCart() as ShoppingCartContextType

    const deliveryUrl = cartDelivery.delivery_id ? '/api/deliveries/'+cartDelivery.delivery_id : null
    
    const {data: products, error: productsError} = useSWR<Item[]>('/api/product_item', fetcher)
    const {data: delivery, error: deliveryError} = useSWR<Delivery>(deliveryUrl, fetcher)

    if(productsError || deliveryError) return "An error has occurred."
    if(!products) return "No products"

    const calcProductsTotal = () => {
        return cartItems.reduce((total: number, cartItem: CartItem) => {
            const item = products.find(i => i._id === cartItem.item_id)

            if(!item)
                removeFromCart(cartItem.item_id) // if item not found in db remove from cart

            return total + (item ? item.price : 0) * cartItem.qty
        }, 0)
    }

    const calcDeliveryTotal = () => {
        if(!delivery)
            return 0

        const productsTotal = calcProductsTotal()

        if(productsTotal >= delivery.free_from)
            return 0

        return delivery.price
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
                    {cartDelivery && cartDelivery.delivery_id ?
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
                {
                    previousStep &&
                    <div onClick={previousStep}>
                        <p className='text-xs text-gray-400 mb-4 hover:cursor-pointer hover:text-gray-500'>Go Back To Previus Step</p>
                    </div>
                }
                {
                    nextStep &&
                    <button
                        className="w-full inline-flex justify-center rounded border border-transparent bg-gray-700 p-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-0 focus:ring-offset-2"
                        onClick={nextStep}
                    >
                        {nextStepTitle}
                    </button>
                }
            </div>
        </div>
    )
}

export default SummaryBox