'use client'

import { useState } from "react"
import SearchBar from "@/components/form/SearchBar"
import AdminProducts from "@/components/admin/Products"
import Header from "@/components/admin/Header";
import {BuildingStorefrontIcon} from "@heroicons/react/24/outline";

export default function ShowProduct(){
    const [searchVal, setSearchVal] = useState('')

    const handleSearch = (val: string) => {
        setSearchVal(val)
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <Header
                    icon={<BuildingStorefrontIcon width={20} height={20}/>}
                    title={"Products"}
                    desc={"Manage your store products"}
                />
            </div>
            <div>
                <SearchBar 
                    handleSearch={handleSearch}
                    searchBtn={false}
                />
                <AdminProducts
                    searchVal={searchVal}
                />
            </div>
        </div>
    )
}