export default function Select(props){
    return(
        <div className="col-span-12">
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                {props.title}
            </label>
            <select
                id={props.id}
                name={props.id}
                autoComplete={props.autoComplete}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                defaultValue={props.value}
            >
                <option default hidden>Pick a value</option>
                {
                    props.options.map((item)=>{
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