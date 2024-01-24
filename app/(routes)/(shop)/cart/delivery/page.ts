'use client'

import SummaryBox from '@/components/cart/SummaryBox'
import useShoppingCart from '/app/_context/ShoppingCart'
import AddressForm from '@/components/form/AddressForm'
import { useState, useRef } from 'react'
import DeliveryBox from '@/components/cart/delivery/DeliveryBox'

const CartDelivery = () => {
    const deliveryBox = useRef()
    const {cartBuyer, setBuyer, setDelivery} = useShoppingCart()
    const [addressPicked, setAddressPicked] = useState(!!cartBuyer.name)

    const handleAddressData = (data) => {
        setBuyer(data)
        setAddressPicked(true)
        deliveryBox.current?.scrollIntoView({behavior: 'smooth'})
    }

    return(
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8 px-4">
                <section className='flex flex-row justify-between gap-4 mb-10'>
                    <div className="w-1/3">
                        <p className="font-bold mb-4">1. Delivery</p>
                        <div className='w-full h-1 rounded bg-gray-800'></div>
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
                <section className={"shadow rounded p-4 " + (addressPicked ? "opacity-50" : "")}>
                    
                    <div className='w-full'>
                        <AddressForm
                            name={cartBuyer.name ? cartBuyer.name : ""}
                            surname={cartBuyer.surname ? cartBuyer.surname : ""} 
                            email={cartBuyer.email ? cartBuyer.email : ""} 
                            street={cartBuyer.street ? cartBuyer.street : ""} 
                            postcode={cartBuyer.postcode ? cartBuyer.postcode : ""}  
                            city={cartBuyer.city ? cartBuyer.city : ""} 
                            submitData={handleAddressData}
                            disabled={addressPicked}
                        />
                    </div>
                </section>
                <div className="py-6">
                </div>
                <section ref={deliveryBox} className="shadow rounded p-8">
                    <div className="py-2">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">Delivery Method</h3>
                    <p className="mt-1 text-sm text-gray-600">Pick method which your products will be shipped to you</p>
                    </div>
                    <DeliveryBox />
                </section>
            </div>
            <div className="col-span-12 md:col-span-4">
                <SummaryBox
                    previousStep="/cart"
                    buttonLink="/cart/summary"
                    buttonTitle="Dalej"
                />
            </div>
        </div>
    )
}
export default CartDelivery