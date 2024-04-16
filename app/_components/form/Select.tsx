interface SelectInterface {
    id: string,
    title: string,
    autoComplete?: string,
    value?: string,
    options: VariantOptionInterface[]
}

export default function Select({id, title, autoComplete, value, options}:SelectInterface){
    return(
        <div className="col-span-12">
            <label htmlFor={id} className="block text-xs text-gray-700 px-1">
                {title}
            </label>
            <select
                id={id}
                name={id}
                autoComplete={autoComplete}
                className="text-gray-900 text-sm my-1 block w-full rounded-lg border border-gray-300 p-2 px-3 shadow-sm focus:border-gray-500 focus:outline-none ring-0 focus:ring-0"
                defaultValue={value}
            >
                <option hidden className={"text-gray-500"}>{title}</option>
                {
                    options.map((item: VariantOptionInterface) => {
                        return(
                            <option 
                                value={item._id} 
                                key={item._id} 
                            >
                                {item.name}
                            </option>
                        )
                    })                
                }
            </select>
        </div>
    )
}