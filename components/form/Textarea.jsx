export default function Textarea(props){
    return(
        <div className="col-span-12 py-2">
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                {props.title}
            </label>
            <div className="mt-1">
            <textarea
                id={props.id}
                name={props.id}
                rows={props.rows ? props.rows : 3}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={props.description}
                defaultValue={props.value ? props.value : ""}
            />
            </div>
        </div>
    )
}