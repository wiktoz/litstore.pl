const Button = ({icon, title, onClick}) => {
    const click = (e) => {
        e.preventDefault()
        if(onClick) onClick()
    }

    return(
        <button
            className='my-2 flex flex-row items-center rounded-lg border border-transparent bg-gray-400 py-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-0'
            onClick={click}>
            {icon}
            <span className="mx-1">{title}</span>
        </button>
    )
}

export default Button