import useSWR from "swr";
import Spinner from "@/components/Spinner"
import {
    ExclamationCircleIcon,
    CheckIcon, PencilSquareIcon, EyeIcon, Square2StackIcon
} from "@heroicons/react/24/outline"

import Image from "next/image";
import Link from "next/link";
import {fetcher} from "@/utils/helpers";

const Product = ({product}:{product:ProductInterface}) => {
    const { data: items, error: itemsError, isLoading: itemsLoading}
        = useSWR("/api/items/product/" + product._id, fetcher)

    return(
        <div className={"flex border shadow p-4 rounded-2xl justify-between bg-white"}>
            <div className={"flex flex-row gap-4"}>
                <div>
                    <Image
                        src={"/img/products/" + product.main_photo}
                        alt={product.name}
                        width={100}
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
                            {
                                product.new_badge &&
                                    <div className={"text-white bg-gray-700 text-xs rounded px-1"} style={{fontSize: 10}}>
                                        new
                                    </div>
                            }
                        </div>
                        <div className={"font-medium"}>
                            {product.name}
                        </div>
                    </div>
                    <div>
                        {
                            product.active &&
                            <div className={"text-xs flex items-center text-gray-600 gap-0.5"}>
                                <CheckIcon width={12} height={12}/>
                                active
                            </div>
                        }
                    </div>
                    <div>
                        {
                            itemsLoading ?
                                <Spinner/> :
                            itemsError ?
                                <div className={"text-gray-800 text-xs"}>
                                Failed fetching data
                                </div> :
                            !items ?
                                <div className={"text-xs flex items-center text-red-600 gap-0.5"}>
                                    <ExclamationCircleIcon width={16} height={16}/>
                                    No items to sell
                                </div> :
                            items.length === 0 ?
                                <div className={"text-xs flex items-center text-red-600 gap-0.5"}>
                                    <ExclamationCircleIcon width={16} height={16}/>
                                    No items to sell
                                </div> :
                                <div className={"text-xs text-gray-600"}>
                                    {items.length} variants
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className={"flex flex-col gap-2 self-center"}>
                <div>
                    <Link href={"/admin/products/items/" + product.slug}>
                        <div
                            className={"text-xs flex items-center justify-end text-gray-800 hover:text-gray-400 gap-1"}>
                            items
                            <Square2StackIcon width={16} height={16}/>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link href={"/admin/products/edit/" + product.slug}>
                        <div
                            className={"text-xs flex items-center justify-end text-gray-800 hover:text-gray-400 gap-1"}>
                            edit
                            <PencilSquareIcon width={16} height={16}/>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link href={"/p/" + product.slug}>
                        <div
                            className={"text-xs flex items-center justify-end text-gray-800 hover:text-gray-400 gap-1"}>
                            preview
                            <EyeIcon width={16} height={16}/>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Product