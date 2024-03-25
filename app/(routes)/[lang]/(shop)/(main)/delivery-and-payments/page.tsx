'use client'

import useSWR from "swr";
import {fetcher} from "@/utils/helpers";
import Loader from "@/components/Loader";

const DeliveryPayments = () => {
    const {data: deliveries, error: deliveriesError, isLoading: deliveriesLoading} = useSWR("/api/deliveries", fetcher)

    return(
        <div className={"mx-8 my-4"}>
            <div className={"text-2xl font-bold mb-4"}>
                Delivery & Payments
            </div>
            <div className={"flex flex-col gap-4 my-10"}>

                <div className={"flex flex-col"}>
                    <div className={"text-lg font-bold"}>
                        Delivery
                    </div>
                    <div className={"text-xs text-gray-500"}>
                        We provide access to many forms of delivery indicated below
                    </div>
                    <div className={"text-xs text-gray-700 mt-4 font-semibold"}>
                        All orders are shipped within 24 hours of placing the order
                    </div>
                </div>
                <div>
                    {
                        deliveriesLoading ?
                            <Loader/> :
                            deliveriesError ?
                                <div>
                                    Fetch error. We are not able to provide available deliveries now.
                                </div> :
                                !deliveries || deliveries.length === 0 ?
                                    <div>
                                        There are no available delivery methods at this moment.
                                    </div> :
                                    <div className={"flex flex-col gap-4"}>
                                        {
                                            deliveries.map((delivery: DeliveryInterface) => {
                                                return (
                                                    <div key={delivery._id}
                                                         className={"bg-gray-50 rounded-lg flex justify-between p-4 px-12 items-center"}>
                                                        <div className={"flex flex-row gap-10 items-center"}>
                                                            <div>
                                                                <img src={"/img/delivery/" + delivery.img}
                                                                     alt={delivery.name}
                                                                     className={"w-24"}/>
                                                            </div>
                                                            <div className={"text-black"}>
                                                                <div className={"font-semibold text-sm"}>
                                                                    {delivery.name}
                                                                </div>
                                                                <div>
                                                                    {
                                                                        delivery.cod ?
                                                                            <p className={"text-gray-500 text-xs"}>cash
                                                                                on
                                                                                delivery</p> :
                                                                            <p className={"text-gray-500 text-xs"}>online
                                                                                payment</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className={"flex flex-col gap-1 text-right"}>
                                                            <div className={"text-md font-semibold"}>
                                                                {delivery.price} PLN
                                                            </div>
                                                            <div className={"text-xs"}>
                                                                0 PLN for orders over {delivery.free_from} PLN
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                    }
                </div>
                <div className={"text-xs text-gray-500 my-2"}>
                    <p>Available countries of delivery:</p>
                    <p>(EU countries) Austria, Belgium, Bulgaria, Croatia, Republic of Cyprus,
                        Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Italy,
                        Latvia,
                        Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain
                        and
                        Sweden</p>
                    <p>(EFTA countries not EU members) Iceland, Liechtenstein, Norway, Switzerland</p>
                    <p>(not EFTA countries) United Kingdom, United States of America</p>
                </div>
            </div>
        </div>
    )
}

export default DeliveryPayments