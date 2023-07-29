const NewInput = ({id, title, type, value, autoComplete, errors, checker, setter}) => {
    return (
        <div className="col-span-12 sm:col-span-12">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {title}
            </label>
            <input
                { ...checker ? checker(id) : ""}
                type={type}
                id={id}
                name={id}
                placeholder={title}
                autoComplete={autoComplete ? autoComplete : ""}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className={"text-sm mt-1 block w-full rounded-lg py-2 shadow-sm focus:border-gray-700 focus:ring-0 " + (errors ? errors[id] ? "border-red-600" : "border-gray-300" : "border-gray-300")}
            />
            <div className="text-red-600 text-xs">{ errors ? errors[id]?.message : ""}</div>
        </div>
    )
}

export default NewInput