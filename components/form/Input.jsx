export default function Input(props){
    return(
        <div className="col-span-12 sm:col-span-12">
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                {props.title}
            </label>
            <input
                { ...props.register ? props.register(props.id) : ""}
                type="text"
                name={props.id}
                placeholder={props.title}
                id={props.id}
                autoComplete={props.autoComplete}
                defaultValue={props.value ? props.value : ""}
                className={"text-sm mt-1 block w-full rounded py-2 shadow-sm focus:border-gray-700 focus:ring-0 " + (props.errors ? props.errors[props.id] ? "border-red-600" : "border-gray-300" : "border-gray-300")}
            />
            <div className="text-red-600 text-xs">{ props.errors ? props.errors[props.id]?.message : ""}</div>
        </div>
    )
}

/*<label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                {props.title}
            </label>*/