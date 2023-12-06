import { useState } from 'react'
import SearchBar from '../app/components/form/SearchBar'
import ProductsSearch from '../app/components/ProductsSearch'

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
            <div className='mt-6 mb-2 font-semibold text-sm'>
                {
                searchVal ?
                    ("Search results for phrase: " + searchVal)
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