import useSWR from "swr";
import {fetcher, formatPrice} from "@/utils/helpers";
import ErrorBox from "@/components/admin/ErrorBox";
import Image from "next/image";
import Spinner from "@/components/Spinner";

interface Props {
    itemData: OrderItemsInterface
}

const Item = ({itemData}:Props) => {
    const { data: product, error: productError, isLoading: productLoading }
        = useSWR<ProductInterface>(itemData.product_id ? "/api/products/" + itemData.product_id : null, fetcher)

    const { data: item, error: itemError, isLoading: itemLoading }
        = useSWR<ItemPopulatedInterface>(itemData.item_id ? "/api/items/" + itemData.item_id : null, fetcher)


    return(
        <div className={"rounded-xl shadow overflow-hidden"}>
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
                        />
                    </div>
                    <div className={"flex flex-col gap-2 self-center justify-between grow"}>
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
                        <div className={"text-xs"}>
                            {
                                itemLoading ?
                                    <Spinner/> :
                                itemError ?
                                    <ErrorBox/> :
                                !item ?
                                    <div className={"text-xs"}>
                                        No item found
                                    </div>  :
                                <div className={"flex gap-2"}>
                                    {
                                        item.options.map(option => {
                                            return(
                                                <div key={item._id + option.option_id._id} className={"flex gap-1"}>
                                                    <div>
                                                        {option.variant_id.display_name}
                                                    </div>
                                                    <div className={"font-semibold"}>
                                                        {option.option_id.name}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className={"text-sm flex mx-4"}>
                        {itemData.qty} {item?.unit}
                    </div>
                </div>
            }
        </div>
    )
}

export default Item