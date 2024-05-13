import { useShoppingCart } from '@/context/ShoppingCart'
import {fetcher, formatPrice} from "@/utils/helpers"
import useSWR from 'swr'

interface Props {
    previousStep?: () => void,
    nextStep: () => void,
    nextStepTitle: string,
    nextStepActive?: boolean
}

const SummaryBox = ({previousStep, nextStep, nextStepTitle, nextStepActive = true}:Props) => {
    const {cartDelivery, cartItems, removeFromCart} = useShoppingCart() as ShoppingCartContextType

    const deliveryUrl = cartDelivery && cartDelivery.delivery_id ? '/api/deliveries/'+cartDelivery.delivery_id : null
    
    const {data: items, error: itemsError, isLoading: itemsLoading} = useSWR<ItemInterface[]>('/api/items', fetcher)
    const {data: delivery, error: deliveryError, isLoading: deliveryLoading} = useSWR<DeliveryInterface>(deliveryUrl, fetcher)

    const calcProductsTotal = () => {
        if(!items || !cartItems)
            return 0

        return cartItems.reduce((total: number, cartItem: CartItemInterface) => {
            const item = items.find(i => i._id === cartItem.item_id)

            if(!item)
                removeFromCart(cartItem.item_id) // if item not found in db remove from cart

            return total + (item ? item.price : 0) * cartItem.qty
        }, 0)
    }

    const calcDeliveryTotal = () => {
        if(!delivery)
            return 0

        const itemsTotal = calcProductsTotal()

        if(itemsTotal >= delivery.free_from)
            return 0

        return delivery.price
    }


    return(
        <div className="my-4 md:mx-4 md:my-0 md:mb-4 rounded h-full relative">
            <div className="flex flex-col justify-between sticky top-20 bg-gray-50 px-8 py-6 rounded-lg">
                <div className={"flex flex-row py-2 items-center gap-1"}>
                    <div className={"font-bold text-gray-700"}>
                        Summary
                    </div>
                </div>
                <div className="text-sm py-6 text-gray-600 flex flex-col gap-1">
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
                    nextStepActive ?
                        <button
                            className="w-full inline-flex justify-center rounded-lg border border-transparent bg-gray-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-0 focus:ring-offset-2"
                            onClick={nextStep}
                        >
                            {nextStepTitle}
                        </button>
                        :
                        <button
                            className="hover:cursor-default opacity-50 w-full inline-flex justify-center rounded-lg border border-transparent bg-gray-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-0 focus:ring-offset-2"
                        >
                            {nextStepTitle}
                        </button>
                }
            </div>
        </div>
    )
}

export default SummaryBox