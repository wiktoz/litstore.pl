import useSWR from 'swr'
import SummaryBox from '../../components/cart/SummaryBox'
import Loader from '../../components/Loader'
import useShoppingCart from '../../context/ShoppingCart'
import AddressForm from '../../components/form/AddressForm'
import Cart from '../../components/cart/Cart'
import axios from 'axios'

const fetcher = url => fetch(url).then(r => r.json())

const CartSummary = () => {
    const {cartItems,cartDelivery, cartBuyer} = useShoppingCart()
    const { data: delivery, error } = useSWR('/api/deliveries/'+cartDelivery.id, fetcher)

    if(error) return error
    if(!delivery) return <Loader />

    const handlePay = () => {
        axios.post('/api/pay', {
            cartItems: cartItems
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
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
                        <p className="font-bold mb-4">2. Summary</p>
                        <div className='w-full h-1 rounded bg-gray-800'></div>
                    </div>
                    <div className="w-1/3">
                        <p className="text-gray-300 mb-4">3. Payment</p>
                        <div className='w-full h-1 rounded bg-gray-300'></div>
                    </div>
                </section>
                <section className='grid grid-cols-12 rounded my-4 bg-gray-50 text-gray-700 text-sm'>
                    <div className="col-span-6 px-6 py-10">
                        <p className='font-bold mb-2'>Invoice data</p>
                        <p>{cartBuyer.name} {cartBuyer.surname}</p>
                        <p>{cartBuyer.street}</p>
                        <p>{cartBuyer.postcode} {cartBuyer.city}</p>
                    </div>
                    <div className='col-span-6 flex flex-row items-center'>
                        <div>
                        </div>
                        <div className="px-6">
                            <p className='font-bold mb-2'>Delivery method <span className='font-normal text-xs'>(+{delivery.price} PLN)</span></p>
                            <img className='w-24 my-4' src={"/img/delivery/" + delivery.img} />
                        </div>
                    </div>
                </section>
                <section> 
                    <div className='w-full'>
                        <Cart/>
                    </div>
                </section>
                <div className="block" aria-hidden="true">
                <div className="py-5">
                <div className="border-t border-gray-200" />
                </div>
                </div>
                <section>
                    
                </section>
            </div>
            <div className="col-span-12 md:col-span-4">
                <SummaryBox
                    previousStep="/cart/delivery"
                    buttonLink="#"
                    buttonTitle="Zapłać"
                />
                <button className="bg-gray-700 py-4 px-10 text-white" onClick={handlePay}>Pay</button>
            </div>
        </div>
    )
}
export default CartSummary