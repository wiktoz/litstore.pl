'use client'

import Loader from '@/components/Loader'
import SearchBar from '@/components/form/SearchBar'
import {fetcher} from "@/utils/helpers"
import Order from "@/components/admin/Order"
import Header from "@/components/admin/Header"
import useSWRInfinite from "swr/infinite"
import {ArrowPathIcon, ShoppingCartIcon} from "@heroicons/react/24/outline";


const getKey = (pageIndex:number, previousPageData:OrderInterface[]) => {
    if (previousPageData && !previousPageData.length) return null
    return `/api/orders?page=${pageIndex}&limit=10`
}

const ShowOrders = () => {
    const { data: orders, error: error, isLoading: isLoading, size, setSize }
        = useSWRInfinite<OrderInterface[]>(getKey, fetcher, { initialSize: 1 })

    const isLoadingMore =
        (size > 0 && orders && typeof orders[size - 1] === "undefined")

    const isEmpty = orders?.[0]?.length === 0;

    const isReachingEnd =
        isEmpty || (orders && orders[orders.length - 1]?.length < 10)

    const issues = orders ? orders.flat() : []


    return(
        <div className="flex flex-col gap-6">
            <div>
                <Header
                    icon={<ShoppingCartIcon width={20} height={20} />}
                    title={"Orders"}
                    desc={"Every order your customer made"}
                />
            </div>
            <div className="w-full">
                <div className="flex flex-col gap-4">
                    {
                        isLoading ?
                            <Loader/> :
                            error ?
                                <div>Error occurred.</div> :
                                orders && orders.length > 0 && orders.map((order: OrderInterface[]) => {
                                    return order.map((o: OrderInterface) => {
                                        return (
                                            <div key={o._id}>
                                                <Order order={o}/>
                                            </div>
                                        )
                                    })
                                })
                    }
                </div>
                <div>
                    {
                        !isLoading && isLoadingMore && <Loader/>
                    }
                </div>
                <div>
                    {
                        isReachingEnd ?
                            <div>You are all caught up</div> :

                            !isLoading && !isLoadingMore &&
                            <div
                                onClick={() => setSize(size + 1)}
                                className={"bg-gray-900 rounded-lg text-xs w-fit font-semibold text-gray-300 py-1 px-2 flex items-center justify-center hover:cursor-pointer my-4"}
                            >
                                <p className={"mx-1"}>Load More</p>
                                <ArrowPathIcon width={13} height={13}/>
                            </div>
                    }
                </div>
                <div>
                    <p className={"text-xs text-gray-700 my-2 mx-1"}>
                        showing {size} page(s) of {isLoadingMore ? "..." : issues.length}{" "}
                        orders{" "}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ShowOrders