'use client'

import { useState } from 'react'
import SearchBar from '@/components/form/SearchBar'
import ProductsSearch from '@/components/ProductsSearch'

const Search = () => {
    const [searchVal, setSearchVal] = useState('')

    const handleSearch = (e) => {
        setSearchVal(e.target.value)
    }

    return(
        <div className='my-8'>
            <SearchBar 
                handleSearch={handleSearch}
                searchBtn={false}
            />
            <div className='mt-6 mb-2'>
                {
                searchVal ?
                    <div>
                        <span className={"text-sm"}>Search results for phrase: </span>
                        <span className={"font-semibold text-md"}>{searchVal}</span>
                    </div>
                        :""
                }
            </div>
            <div className='my-4'>
                <ProductsSearch searchVal={searchVal} size="small"/>
            </div>
        </div>
    )
}

export default Search