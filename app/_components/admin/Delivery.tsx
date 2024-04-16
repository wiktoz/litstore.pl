import useSWR from "swr";
import {fetcher} from "@/utils/helpers";
import Loader from "@/components/Loader";
import ErrorBox from "@/components/admin/ErrorBox";
import Image from "next/image";

const Delivery = ({d}:{d: OrderDeliveryInterface}) => {
    const { data: delivery, error: deliveryError, isLoading: deliveryLoading} 
        = useSWR<DeliveryInterface>("/api/deliveries/" + d.id, fetcher)
    
    return (
        <div className={"rounded-xl shadow py-4 px-6"}>
            {
                deliveryLoading ?
                    <Loader/> :
                deliveryError ?
                    <ErrorBox/> :
                !delivery ?
                <div className={"text-xs"}>
                    No delivery type found
                </div> :
                    
                <div className={"flex gap-8 items-center"}>
                    <div>
                        <Image
                            src={"/img/delivery/" + delivery.img}
                            alt={delivery.name}
                            width={70}
                            height={200}
                            className={"rounded"}
                        />
                    </div>
                    <div className={"text-xs text-gray-900"}>
                        <p className={"font-semibold"}>{d.name} {d.surname}</p>
                        <p>{d.street} {d.house}</p>
                        <p>{d.post_code} {d.city}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Delivery