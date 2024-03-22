"use client"

import Slider from "@/components/Slider"
import Products from "@/components/Products"
import useSWR from "swr"
import { fetcher } from "@/utils/helpers"

export default function Home() {
  const { data: products, error, isLoading } = useSWR("/api/products", fetcher)

  return (
    <>
      <div>
        <Slider/>
      </div>
        <div className={"p-8"}>
            <p className="text-3xl font-bold tracking-tight my-8">
                <span className="bg-gray-900 text-white pl-4 pr-1">New</span>
                <span className="text-gray-900">Arrivals</span>
            </p>
            <Products products={products} error={error} isLoading={isLoading} size="small"/>
            <div className="mt-10 flex">
                <p className="text-xs text-gray-300 font-light w-2/5">
                    LitStore is registered trademark. This is a demonstrative version for e-commerce software. All
                    products are not for sale.
                    Sample products names, brands and photos are taken from website misbhv.com and are own by MISBHV sp.
                    z o.o.
                </p>
            </div>
        </div>
    </>
  )
}
