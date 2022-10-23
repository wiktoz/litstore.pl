export default function RadioBtn({title, name, description, options}){
    return(
        <div>
            <legend className="font-medium text-gray-900">{title}</legend>
            {
                description ?
                    <p className="text-sm text-gray-500">{description}</p> : ""
            }
            <div className="mt-4 space-y-4">
                {
                    options.map(option => {
                        return(
                            <div className="flex items-center" key={option.id}>
                                <input
                                id={option.id}
                                name={name}
                                value={option.id}
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-0"
                                />
                                <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                                    {option.name}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}