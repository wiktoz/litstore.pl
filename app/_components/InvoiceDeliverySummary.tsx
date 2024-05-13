import {DocumentTextIcon, TruckIcon} from "@heroicons/react/24/outline"
import useSWR from "swr"
import {fetcher} from "@/utils/helpers"
import Image from "next/image"
import Loader from "@/components/Loader";
import ErrorBox from "@/components/admin/ErrorBox";
import Link from "next/link";

interface Props {
    buyer: CartBuyerInterface,
    delivery: CartDeliveryInterface,
    editable: boolean
}

const InvoiceDeliverySummary = ({buyer, delivery, editable}:Props) => {
    const { data: d, error: error, isLoading: dLoading } = useSWR<DeliveryInterface>('/api/deliveries/'+delivery.delivery_id, fetcher)

    return (
        <div className={"flex flex-col md:flex-row gap-8"}>
            <div>
                <div className={"flex flex-row px-1 py-2 items-center gap-1"}>
                    <div className={"font-bold text-gray-700 flex items-center gap-1"}>
                        <DocumentTextIcon width={16} height={16}/>
                        Invoice
                    </div>
                    { editable &&
                        <div className={"text-xs text-gray-500 hover:cursor-pointer"}>
                            <Link href={"/cart/delivery"}>
                                (edit)
                            </Link>
                        </div>
                    }
                </div>
                <div className="text-gray-700 flex flex-col text-sm p-2 rounded-lg">
                    <p className={"font-medium mb-0.5"}>{buyer.name} {buyer.surname}</p>
                    <p>{buyer.street}</p>
                    <p>{buyer.post_code} {buyer.city}</p>
                </div>
            </div>
            <div>
                <div className={"flex flex-row px-1 py-2 items-center gap-1"}>
                    <div className={"font-bold text-gray-700 flex items-center gap-1"}>
                        <TruckIcon width={16} height={16}/>
                        Delivery
                    </div>
                    { editable &&
                        <div className={"text-xs text-gray-500 hover:cursor-pointer"}>
                            <Link href={"/cart/delivery"}>
                                (edit)
                            </Link>
                        </div>
                    }
                </div>
                {
                    dLoading ?
                        <Loader/> :
                    error ?
                        <ErrorBox/> :
                    !d ?
                        <ErrorBox/> :
                        <div className='items-center rounded-lg text-gray-700 text-sm grow p-2'>
                            <div className={"items-center flex gap-4 divide-x"}>
                                <div className='flex flex-col'>
                                    <div>
                                        <Image
                                            className='min-h-10 max-h-16 w-auto max-w-20'
                                            src={"/img/delivery/" + d.img}
                                            alt={d.name}
                                            width={0}
                                            height={0}
                                        />
                                    </div>
                                    <div className={"flex gap-1.5 font-medium items-center"}>
                                        <div>
                                            {d.name}
                                        </div>
                                        <div className='font-normal text-xs'>
                                            (+{d.price} PLN)
                                        </div>
                                    </div>
                                </div>
                                <div className={"pl-4"}>
                                    <p className={"font-medium mb-0.5"}>{delivery.name} {delivery.surname}</p>
                                    <p>{delivery.street}</p>
                                    <p>{delivery.post_code} {delivery.city}</p>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default InvoiceDeliverySummary