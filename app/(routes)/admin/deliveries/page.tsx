'use client'

import useSWR from "swr"
import Loader from "@/components/Loader"
import { fetcher } from "@/utils/helpers"

export default function ShowDeliveries(){
    const { data, error } = useSWR<DeliveryInterface[]>('/api/deliveries', fetcher)
    if (error) return "An error has occurred."
    if (!data) return <Loader/>

    return(
        <>
        {
            data.map((delivery:DeliveryInterface) => {
                return(
                        <div key={delivery._id}>
                            <div className="w-24 h-24 flex items-center mx-2">
                                <img src={'/img/delivery/' + delivery.img} alt={delivery.name} />
                            </div>
                            <div className="mx-6">
                                <p className="text-gray-700 text-sm font-bold">{delivery.name}</p>
                                <div className="text-gray-500 text-sm mt-1">
                                    <p>price {delivery.price} PLN</p>
                                    <p>free from {delivery.free_from} PLN</p>
                                </div>
                            </div>
                        </div>
                )
            })
        }
        </>
    )
}