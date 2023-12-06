import { useState } from "react"
import SearchBar from "../../../app/components/form/SearchBar"
import AdminProducts from "../../../app/components/admin/Products"

export default function ShowProduct(){
    const [searchVal, setSearchVal] = useState('')

    const handleSearch = (e) => {
        setSearchVal(e.target.value)
    }

    return (
        <div className="w-full">
            <div>
                <p className="leading-7 text-2xl font-semibold py-4">Your products</p>
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