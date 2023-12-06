export default function RadioBtn({title, name, description, options, value, errors, checker, setter}){
    return(
        <div className="my-4">
            <legend className="text-sm text-gray-800">
                {title}
            </legend>
            {
                description ?
                    <p className="text-sm text-gray-500">{description}</p> : ""
            }
            <div className="flex flex-row">
                {
                    options.map(option => {
                        return(
                            <div className="flex items-center px-4 py-2 bg-white first:rounded-l-lg last:rounded-r-lg border-r" key={option.id}>
                                <input
                                    { ...checker ? checker(name) : ""}
                                    id={option.id}
                                    name={name}
                                    value={option.id}
                                    type="radio"
                                    checked={value === option.id}
                                    onClick={() => setter(option.id)}
                                    className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-0 ring-0 focus:ring-opacity-0"
                                />
                                <label htmlFor={option.id} className="ml-2 block text-sm font-medium text-gray-700">
                                    {option.name}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
            <div className="text-red-600 text-xs">{ errors ? errors[name]?.message : ""}</div>
        </div>
    )
}