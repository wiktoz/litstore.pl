'use client'

import SummaryBox from '@/components/cart/SummaryBox'
import {useShoppingCart} from '@/context/ShoppingCart'
import AddressForm from '@/components/form/AddressForm'
import { useState } from 'react'
import DeliveryBox from '@/components/cart/delivery/DeliveryBox'
import {useRouter} from "next/navigation";

const CartDelivery = () => {
    const router = useRouter()
    const {setBuyer, cartBuyer, setDelivery, cartDelivery} = useShoppingCart() as ShoppingCartContextType

    const [isBuyer, setIsBuyer] = useState<boolean>(!!cartBuyer.name)
    const [isDelivery, setIsDelivery] = useState<boolean>(!!cartDelivery.delivery_id)

    const handleAddressData = (data: CartBuyerInterface) => {
        setBuyer(data)
        setIsBuyer(true)
    }

    const handleDeliveryData = (data: CartDeliveryInterface) => {
        setDelivery(data)
        setIsDelivery(true)
    }

    return(
        <div className="flex gap-4 w-full">
            <div className="w-2/3 flex flex-col gap-4 grow">
                <section className='flex flex-row justify-between gap-4 p-4 pb-0'>
                    <div className="w-1/3">
                        <p className="font-bold mb-4 text-gray-700 ">1. Delivery</p>
                        <div className='w-full h-1 rounded bg-gray-700'></div>
                    </div>
                    <div className="w-1/3">
                        <p className="text-gray-300 mb-4">2. Summary</p>
                        <div className='w-full h-1 rounded bg-gray-300'></div>
                    </div>
                    <div className="w-1/3">
                        <p className="text-gray-300 mb-4">3. Payment</p>
                        <div className='w-full h-1 rounded bg-gray-300'></div>
                    </div>
                </section>
                <section className={"p-4 relative"}>
                    <div className={"flex flex-col py-4 gap-1"}>
                        <div className={"font-bold text-gray-700"}>
                            Invoice
                        </div>
                        <div className={"text-xs text-gray-500 hover:cursor-pointer"}>
                            Fill in the details for which the invoice will be issued
                        </div>
                    </div>
                    <div className={"bg-gray-50 p-8 rounded-lg"}>
                        <AddressForm
                            name={cartBuyer.name ? cartBuyer.name : ""}
                            surname={cartBuyer.surname ? cartBuyer.surname : ""}
                            email={cartBuyer.email ? cartBuyer.email : ""}
                            street={cartBuyer.street ? cartBuyer.street : ""}
                            house={cartBuyer.house ? cartBuyer.house : ""}
                            flat={cartBuyer.flat ? cartBuyer.flat : ""}
                            post_code={cartBuyer.post_code ? cartBuyer.post_code : ""}
                            city={cartBuyer.city ? cartBuyer.city : ""}
                            submitData={handleAddressData}
                            disableOnSave={true}
                            dataLocked={isBuyer}
                        />
                    </div>
                </section>
                <section className={"rounded px-4"}>
                    <div className={"flex flex-col py-4 gap-1"}>
                        <div className={"font-bold text-gray-700"}>
                            Delivery
                        </div>
                        <div className={"text-xs text-gray-500 hover:cursor-pointer"}>
                            Select your delivery method
                        </div>
                    </div>
                    <DeliveryBox
                        submitData={handleDeliveryData}
                    />
                </section>
            </div>
            <div className="w-1/3">
                <SummaryBox
                    previousStep={() => router.push('/cart')}
                    nextStep={() => router.push('/cart/summary')}
                    nextStepTitle={"Dalej"}
                    nextStepActive={isBuyer && isDelivery}
                />
            </div>
        </div>
    )
}
export default CartDelivery