import useSWR from "swr";
import {fetcher, formatPrice} from "@/utils/helpers";
import Loader from "@/components/Loader";
import ErrorBox from "@/components/admin/ErrorBox";
import Image from "next/image";

interface Props {
    item: OrderItemsInterface
}

const Item = ({item}:Props) => {
    const { data: product, error: productError, isLoading: productLoading }
        = useSWR(item.product_id ? "/api/products/" + item.product_id : null, fetcher)


    return(
        <div className={"m-2 rounded-xl"}>
            {
                productLoading ?
                    <div className={"flex flex-row gap-6 items-center"}>
                        <div className={"w-20 bg-gray-100 h-28 rounded-lg"}>

                        </div>
                        <div className={"flex flex-col gap-2 self-center"}>
                            <div className={"flex flex-col gap-2"}>
                                <div className={"text-xs text-gray-500 flex gap-1 w-12 h-4 bg-gray-100 rounded-lg"}>
                                </div>
                                <div className={"font-medium text-sm w-24 h-3 bg-gray-50 rounded-lg"}>
                                </div>
                            </div>
                            <div className={"text-xs font-semibold w-14 h-3 bg-gray-50 rounded-lg"}>

                            </div>
                        </div>
                    </div>
             :
                productError ?
                    <ErrorBox/> :
                !product ?
                    <div className={"text-xs"}>
                        No item found
                    </div> :

                <div className={"flex flex-row gap-6 items-center"}>
                    <div>
                        <Image
                            src={"/img/products/" + product.main_photo}
                            alt={product.name}
                            width={70}
                            height={200}
                            className={"rounded"}
                        />
                    </div>
                    <div className={"flex flex-col gap-2 self-center"}>
                        <div>
                            <div className={"text-xs text-gray-500 flex gap-1"}>
                                <div>
                                    {product.manufacturer}
                                </div>
                            </div>
                            <div className={"font-medium text-sm"}>
                                {product.name}
                            </div>
                        </div>
                        <div className={"text-xs font-semibold"}>
                            {item.qty} x {formatPrice(item.price)}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Item