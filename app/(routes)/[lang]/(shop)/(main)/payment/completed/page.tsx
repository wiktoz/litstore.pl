'use client'

import useSWR from 'swr'
import Loader from '@/components/Loader'
import { useSearchParams } from 'next/navigation'
import {fetcher} from "@/utils/helpers";

const getColor = (status:string) => {
    if(status === "PENDING") return "text-orange-500"
    if(status === "SUCCESS") return "text-green-500"
    if(status === "FAILURE") return "text-red-800"
    return "text-black"
}

const formatDate = (date:string) => {
    return new Date(date).toLocaleString("pl-PL", {dateStyle: 'medium', timeStyle: 'short'});
}

const PaymentCompleted = () => {
    const params = useSearchParams()
    const OrderID = params.get('OrderID')
    const ServiceID = params.get('ServiceID')
    const Hash = params.get('Hash')
    const endpoint = '/api/orders/' + OrderID + '?ServiceID=' + ServiceID + '&Hash=' + Hash
    const { data: order, error} = useSWR(OrderID && ServiceID && Hash ? endpoint : null, fetcher)

    if(error) return JSON.stringify(error)
    if(!order) return <Loader />

    return(
        <div>
            <div className='my-10 text-center w-auto'>
                <p className="font-bold text-3xl mb-2">Order completed</p>
                <div className="text-sm mb-8">
                    <p>
                        Your order #{order._id} has been completed.
                    </p>
                    { order?.payment.status === "SUCCESS" ?
                        <p>
                            Payment completed.
                        </p>
                        :
                        <p>
                            Waiting for payment to be processed.
                        </p>
                    }
                </div>
                <p className='text-right text-xs'>
                    Order placed
                    <span className='ml-1'>
                        {formatDate(order.createdAt)}
                    </span>
                </p>
                <p className="text-sm mb-4 text-right">
                    <span className='mr-1 text-xs'>
                        payment
                    </span>
                    <span className={"font-bold " + getColor(order?.payment.status)}>
                        {order?.payment.status}
                    </span>
                </p>
            </div>
            <section className='grid grid-cols-12 rounded my-4 bg-gray-50 text-gray-700 text-sm'>
                    <div className="col-span-6 px-6 py-10">
                        <p className='font-bold mb-2'>Invoice data</p>
                        <p>{order?.buyer.name} {order?.buyer.surname}</p>
                        <p>{order?.buyer.street}</p>
                        <p>{order?.buyer.postcode} {order?.buyer.city}</p>
                    </div>
                    <div className='col-span-6 flex flex-row items-center'>
                        <div className="px-6">
                            <p className='font-bold mb-2'>Delivery method <span className='font-normal text-xs'>(+{order?.delivery?.price} PLN)</span></p>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className='w-24 my-4' src={"/img/delivery/" + order?.delivery?.id.img}  alt="delivery company"/>
                        </div>
                    </div>
                </section>
        </div>
    )
}

export default PaymentCompleted