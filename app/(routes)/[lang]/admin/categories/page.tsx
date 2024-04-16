'use client'

import useSWR from "swr"
import Loader from "@/components/Loader"
import {fetcher} from "@/utils/helpers";
import Accordion from "@/components/Accordion";
import EditButton from "@/components/EditButton";
import ComponentAccordion from "@/components/ComponentAccordion";

export default function ShowCategories(){
    const { data, error } = useSWR('/api/categories', fetcher)
    if (error) return "An error has occurred."
    if (!data) return <Loader></Loader>

    return(
        <div className={"flex flex-col gap-2"}>
        {
            data.map((category:CategoryInterface) => {
                return(
                    <div
                        key={category._id}
                        className={"p-4 shadow bg-white rounded-xl"}
                    >
                        <div className={"flex flex-row justify-between items-center"}>
                            { category.bg_photo &&
                                <div className="w-24">
                                    <img src={'/img/categories/' + category.bg_photo} alt={category.name} />
                                </div>
                            }
                            <div className="mx-6 w-full">
                                <p className="text-gray-700 text-md">{category.name}</p>
                                <ComponentAccordion header={"description"}>
                                    <div className={"text-xs"}>
                                        {category.description}
                                    </div>
                                </ComponentAccordion>
                            </div>
                            <div>
                                <EditButton link={"/admin/categories/edit/" + category.slug}/>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}