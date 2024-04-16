'use client'

import useSWR from "swr"
import Loader from "@/components/Loader"
import { fetcher } from "@/utils/helpers"
import EditButton from "@/components/EditButton";

export default function ShowDeliveries(){
    const { data, error } = useSWR<DeliveryInterface[]>('/api/deliveries', fetcher)
    if (error) return "An error has occurred."
    if (!data) return <Loader/>

    return(
        <div className={"flex flex-col gap-2"}>
        {
            data.map((delivery:DeliveryInterface) => {
                return(
                        <div key={delivery._id} className={"flex flex-row gap-4 py-4 items-center bg-white shadow rounded-xl justify-between"}>
                            <div className={"flex items-center"}>
                                <div className="w-24 h-24 flex items-center mx-4 px-4">
                                    <img src={'/img/delivery/' + delivery.img} alt={delivery.name} />
                                </div>
                                <div className="mx-6">
                                    <p className="text-gray-800 text-sm font-semibold">
                                        {delivery.name}
                                    </p>
                                    <div className="text-gray-500 text-xs">
                                        <p>price {delivery.price} PLN</p>
                                        <p>free from {delivery.free_from} PLN</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"px-4"}>
                                <EditButton link={"/admin/deliveries/edit/" + delivery.slug}/>
                            </div>
                        </div>
                )
            })
        }
        </div>
    )
}