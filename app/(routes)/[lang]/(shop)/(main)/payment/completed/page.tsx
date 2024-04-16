'use client'

import useSWR from 'swr'
import Loader from '@/components/Loader'
import { useSearchParams } from 'next/navigation'
import {fetcher} from "@/utils/helpers";
import {ArrowPathIcon, CheckIcon} from "@heroicons/react/24/outline";

const getColor = (status:string) => {
    if(status === "PENDING") return "text-orange-400"
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
            <div className='my-10 w-auto'>
                <div className="text-sm py-8">
                    <p className="font-bold text-2xl mb-4">Order completed</p>
                    <div className={"flex items-center gap-1"}>
                        <CheckIcon width={14} height={14}/>
                        Order has been completed.
                    </div>
                    {order.payment.status === "SUCCESS" ?
                        <div className={"flex items-center gap-1"}>
                            <CheckIcon width={14} height={14}/>
                            Payment completed.
                        </div>
                        :
                        <div className={"flex items-center gap-1"}>
                            <ArrowPathIcon width={14} height={14}/>
                            Waiting for payment to be processed...
                        </div>
                    }
                </div>
                <div className={"flex gap-8"}>
                    <div>
                        <p className={"text-xs text-gray-700"}>order number</p>
                        <p className={"font-semibold"}>#{order._id}</p>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-700"}>placed on</p>
                        <p className={"font-semibold"}>{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-700"}>payment</p>
                        <p className={"font-semibold"}>
                            <span className={getColor(order.payment.status)}>
                                {order.payment.status}
                            </span>
                        </p>
                    </div>
                </div>
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