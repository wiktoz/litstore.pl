
export default function Checkbox(props){
    return(
        <div className="col-span-12">
            <div className="flex items-start mb-4">
                <div className="flex h-5 items-center">
                <input
                    id={props.id}
                    name={props.id}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-0 ring-0 focus:outline-0"
                    defaultChecked={props.checked}
                />
                </div>
                <div className="ml-3 text-sm">
                <label htmlFor={props.id} className="font-medium text-gray-700">
                    {props.title}
                </label>
                <p className="text-gray-500">{props.description}</p>
                </div>
            </div>
        </div>
    )
}