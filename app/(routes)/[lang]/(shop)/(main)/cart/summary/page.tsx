'use client'

import useSWR from 'swr'
import SummaryBox from '@/components/cart/SummaryBox'
import Loader from '@/components/Loader'
import { useShoppingCart } from '@/context/ShoppingCart'
import Cart from '@/components/cart/Cart'
import axios from 'axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {fetcher} from "@/utils/helpers";
import {DocumentTextIcon, TruckIcon, ShoppingBagIcon} from '@heroicons/react/24/outline'
import InvoiceDeliverySummary from "@/components/InvoiceDeliverySummary";

const CartSummary = () => {
    const router = useRouter()
    const {cartItems,cartDelivery, cartBuyer} = useShoppingCart() as ShoppingCartContextType

    useEffect(() => {
        if(!cartBuyer.name || !cartItems || cartItems.length === 0)
            router.push('/cart/delivery')
    })

    const handlePay = () => {
        axios.post('/api/payments/pay', {
            cart: {
                items: cartItems,
                delivery: cartDelivery,
                buyer: cartBuyer
            }
        },{headers: { "Content-Type": "application/json" }})
        .then((response) => {
            console.log(response.data)

            if(response.data.url)
                return window.location.href = response.data.url
        })
        .catch((err) => console.log(err))
    }

    return(
        <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="w-full lg:w-2/3 flex px-4 flex-col gap-8">
                <section className='flex flex-row justify-between gap-4 my-4'>
                    <div className="w-1/3">
                        <p className="font-bold mb-4 text-gray-800">1. Delivery</p>
                        <div className='w-full h-1 rounded bg-gray-800'></div>
                    </div>
                    <div className="w-1/3">
                        <p className="font-bold mb-4 text-gray-800">2. Summary</p>
                        <div className='w-full h-1 rounded bg-gray-800'></div>
                    </div>
                    <div className="w-1/3">
                        <p className="text-gray-300 mb-4">3. Payment</p>
                        <div className='w-full h-1 rounded bg-gray-300'></div>
                    </div>
                </section>
                <section>
                    <InvoiceDeliverySummary
                        buyer={cartBuyer}
                        delivery={cartDelivery}
                        editable={true}
                    />
                </section>
                <section>
                    <div className={"flex flex-row px-1 py-2 items-center gap-1"}>
                        <div className={"font-bold text-gray-700 flex items-center gap-1"}>
                            <ShoppingBagIcon width={16} height={16}/>
                            Bag
                        </div>
                        <div className={"text-xs text-gray-500 hover:cursor-pointer"}>
                            (edit)
                        </div>
                    </div>
                    <div className='w-full'>
                        <Cart noBtn={true}/>
                    </div>
                </section>
            </div>
            <div className="w-full lg:w-1/3">
                <SummaryBox
                    previousStep={() => router.push("/cart/delivery")}
                    nextStep={handlePay}
                    nextStepTitle="Order & Pay"
                />
            </div>
        </div>
    )
}
export default CartSummary