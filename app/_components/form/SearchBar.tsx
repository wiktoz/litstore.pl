interface Props {
    handleSearch: (searchValue: string) => void,
    searchBtn: boolean
}

export default function SearchBar({handleSearch, searchBtn}:Props){
    return(
        <div className="flex items-center w-full">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input onChange={(e) => handleSearch(e.target.value)} type="text" id="simple-search" className={"shadow border border-white text-gray-900 text-sm focus:ring-0 focus:border-gray-500 block w-full pl-8 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + (searchBtn ? "rounded-l-xl" : "rounded-xl")} placeholder="Search" required />
            </div>
            {searchBtn ?
            <button type="submit" className="p-2.5 text-sm font-medium text-white bg-gray-600 rounded-r-xl border border-gray-700 hover:bg-gray-800 focus:ring-0 focus:outline-none focus:ring-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only">Search</span>
            </button>
            : ""
            }
        </div>
    )
}