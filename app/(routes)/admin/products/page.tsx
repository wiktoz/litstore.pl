'use client'

import { useState } from "react"
import SearchBar from "@/components/form/SearchBar"
import AdminProducts from "@/components/admin/Products"

export default function ShowProduct(){
    const [searchVal, setSearchVal] = useState('')

    const handleSearch = (val: string) => {
        setSearchVal(val)
    }

    return (
        <div className="w-full">
            <div className={"my-4"}>
                <p className="text-lg font-bold">Products</p>
                <p className={"text-xs text-gray-500"}>
                    Preview, edit and search for available products in your shop
                </p>
            </div>
            <div>
                <SearchBar 
                    handleSearch={handleSearch}
                    searchBtn={false}
                />
            </div>
            <AdminProducts searchVal={searchVal}/>
        </div>
    )
}