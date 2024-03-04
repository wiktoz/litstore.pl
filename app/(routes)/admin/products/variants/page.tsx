'use client'

import useSWR from "swr"
import Loader from "@/components/Loader"
import ShowBox from "@/components/admin/ShowBox"
import {BiPlus} from 'react-icons/bi'
import ButtonLink from "@/components/admin/ButtonLink";
import {fetcher} from "@/utils/helpers";


export default function ShowVariants(){
    const { data, error } = useSWR('/api/variants', fetcher)
    if (error) return "An error has occurred."
    if (!data) return <Loader></Loader>

    return(
        <>
            <div className="mb-4">
                <ButtonLink
                    icon={<BiPlus/>}
                    title={"Add Variant"}
                    link="/admin/products/variants/add"
                />
            </div>
        {
            data.map((variant:Variant) => {
                return(
                    <ShowBox
                        key={variant.slug}
                        showLink={"#"}
                        editLink={'/admin/products/variants/edit/' + variant.slug}
                        deleteLink={'/admin/products/variants/delete/' + variant.slug}
                    >
                        <div className="flex flex-col">
                        <div className="mx-1">
                            <p className="text-gray-700 text-md mb-2">{variant.name}</p>
                            <p className="text-gray-500 text-sm">{variant.displayName}</p>
                        </div>
                        <div className="flex flex-row">
                            {
                                variant.options.map(option => {
                                    return(
                                        <p className="m-1 p-2 bg-gray-100 text-xs" key={option._id}>
                                            {option.name}
                                        </p>
                                    )
                                })
                            }
                        </div>
                        </div>
                    </ShowBox>
                )
            })
        }
        </>
    )
}