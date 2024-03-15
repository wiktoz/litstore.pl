'use client'

import useSWR from "swr"
import Loader from "@/components/Loader"
import {BiPlus} from 'react-icons/bi'
import ButtonLink from "@/components/admin/ButtonLink";
import {fetcher} from "@/utils/helpers";


export default function ShowVariants(){
    const { data: variants, error: variantsError, isLoading: variantsLoading} = useSWR<VariantInterface[]>('/api/variants', fetcher)

    return(
        <>
            <div className="mb-4">
                <ButtonLink
                    icon={<BiPlus/>}
                    title={"Add Variant"}
                    link="/admin/products/variants/add"
                />
            </div>
            <div>
                {
                    variantsLoading ?
                        <Loader/> :
                    variantsError ?
                        <div>
                            Fetch error
                        </div> :
                    !variants ?
                        <div>
                            No variants to show.
                        </div> :

                        <div className={"flex flex-col gap-2"}>
                            {
                                variants.map((variant:VariantInterface) => {
                                    return(
                                        <div key={variant._id} className={"border border-gray-700 rounded-xl p-4 flex flex-col gap-2"}>
                                            <div className={"text-sm"}>
                                                {variant.name}
                                            </div>
                                            <div className={"text-xs"}>
                                                {variant.display_name}
                                            </div>
                                            <div className={"flex flex-row gap-1"}>
                                                {
                                                    variant.options.map((option:VariantOptionInterface) => {
                                                        return(
                                                            <div key={option._id} className={"text-xs text-gray-500"}>
                                                                {option.name}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </>
    )
}