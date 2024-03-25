'use client'

import useSWR from "swr"
import Loader from "@/components/Loader"
import {fetcher} from "@/utils/helpers";

export default function ShowCategories(){
    const { data, error } = useSWR('/api/categories', fetcher)
    if (error) return "An error has occurred."
    if (!data) return <Loader></Loader>

    return(
        <>
        {
            data.map((category:CategoryInterface) => {
                return(
                    <div
                        key={category.slug}
                    >
                        <div>
                            <div className="w-24">
                                <img src={'/img/categories/' + category.bg_photo} alt={category.name} />
                            </div>
                            <div className="mx-6">
                                <p className="text-gray-700 text-md">{category.name}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </>
    )
}