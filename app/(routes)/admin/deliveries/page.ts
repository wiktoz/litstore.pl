'use client'

import useSWR from "swr"
import Loader from "@/components/Loader"
import ShowBox from "@/components/admin/ShowBox"

const fetcher = url => fetch(url).then(r => r.json())

export default function ShowDeliveries(){
    const { data, error } = useSWR('/api/deliveries', fetcher)
    if (error) return "An error has occurred."
    if (!data) return <Loader/>

    return(
        <>
        {
            data.map(delivery => {
                return(
                    <ShowBox
                        key={delivery.slug}
                        editLink={'/admin/deliveries/edit/' + delivery.slug}
                        deleteLink={'/admin/deliveries/delete/' + delivery.slug}
                    >
                        <div className="w-24 h-24 flex items-center mx-2">
                            <img src={'/img/delivery/' + delivery.img} />
                        </div>
                        <div className="mx-6">
                            <p className="text-gray-700 text-sm font-bold">{delivery.name}</p>
                            <div className="text-gray-500 text-sm mt-1">
                                <p>price {delivery.price} PLN</p>
                                <p>free from {delivery.freeFrom} PLN</p>
                            </div>
                        </div>
                    </ShowBox>
                )
            })
        }
        </>
    )
}