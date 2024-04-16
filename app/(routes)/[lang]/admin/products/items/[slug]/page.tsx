'use client'

import useSWR from "swr";
import {fetcher} from "@/utils/helpers";
import Loader from "@/components/Loader";
import Image from "next/image";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import EditButton from "@/components/EditButton";

export default function ProductItems({params}:{params: {slug: string}}) {
    const {slug} = params

    const { data: items, error: itemsError, isLoading: itemsLoading }
        = useSWR<ItemPopulatedInterface[]>(slug ? "/api/items/product/" + slug + "/populate" : null, fetcher)

    const { data: product, error: productError, isLoading: productLoading }
        = useSWR<ProductInterface>(slug ? "/api/products/" + slug : null, fetcher)

    return(
        <div>
            <div>
                {
                    productLoading ?
                        <Loader/> :
                    productError ?
                        <div>Fetch error</div> :
                    !product ?
                        <div>No product</div> :

                        <div
                            className={"flex flex-row items-center gap-6 my-2 shadow rounded-xl bg-white overflow-hidden"}>
                            <div>
                                <Image
                                    src={"/img/products/" + product.main_photo}
                                    className="h-64 w-auto align-bottom"
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    alt="logo"
                                />
                            </div>
                            <div className={"grow"}>
                                <div>
                                    <div className={"text-xs text-gray-500 flex gap-1"}>
                                        <div>
                                            {product.manufacturer}
                                        </div>
                                        {
                                            product.new_badge &&
                                            <div className={"text-white bg-gray-700 text-xs rounded px-1"}
                                                 style={{fontSize: 10}}>
                                                new
                                            </div>
                                        }
                                    </div>
                                    <div className={"font-medium"}>
                                        {product.name}
                                    </div>
                                </div>
                                <div className={"text-xs"}>
                                    {product.active ? "active" : "not active"}
                                </div>
                            </div>
                            <div className={"p-4"}>
                                <EditButton link={"/admin/products/edit/" + product.slug}/>
                            </div>
                        </div>
                }
            </div>
            <div>
                {
                    itemsLoading ?
                        <Loader/> :
                        itemsError ?
                            <div>Fetch error</div> :
                            !items ?
                                <div>No product</div> :

                                <div className={"flex flex-col gap-2"}>
                                {
                            items.map((item: ItemPopulatedInterface) => {
                                return (
                                    <div key={item._id} className={"shadow rounded-xl p-4 bg-white flex gap-6 justify-between items-center"}>
                                        <div className={"flex flex-col gap-2"}>
                                            <div>
                                                {
                                                    item.options.map(option => {
                                                        return(
                                                            <div key={option.option_id._id}>
                                                                <div className={"font-semibold text-xs"}>
                                                                    {option.variant_id.display_name}
                                                                </div>
                                                                <div className={"text-sm"}>
                                                                    {option.option_id.name}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div>
                                                <div className={"font-semibold text-xs"}>
                                                    stock
                                                </div>
                                                <div className={"text-sm"}>
                                                    {item.stock} {item.unit}
                                                </div>
                                            </div>
                                            <div>
                                                <div className={"font-semibold text-xs"}>
                                                    price
                                                </div>
                                                <div className={"text-sm"}>
                                                    {item.price} {"PLN"}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={"bg-gray-800 text-white text-xs px-3 py-1 rounded-xl flex gap-2 items-center"}>
                                                <PencilSquareIcon width={16} height={16} />
                                                Edit
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}