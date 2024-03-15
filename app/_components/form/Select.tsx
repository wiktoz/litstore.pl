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
            <label htmlFor={id} className="block text-xs font-medium text-gray-700">
                {title}
            </label>
            <select
                id={id}
                name={id}
                autoComplete={autoComplete}
                className="text-sm bg-gray-50 my-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500"
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