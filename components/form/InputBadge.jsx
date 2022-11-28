export default function InputBadge(props){
    return(
        <div className="col-span-3 sm:col-span-2">
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                {props.title}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                {props.badge}
                </span>
                <input
                type="text"
                name={props.id}
                id={props.id}
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={props.placeholder}
                />
            </div>
        </div>
    )
}