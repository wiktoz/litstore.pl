import Link from "next/link";

const ButtonLink = ({icon, title, link}) => {
    return(
        <Link
            href={link}
        >
        <button
            className='w-auto my-2 flex flex-row items-center rounded-lg border border-transparent bg-gray-400 py-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-0'
        >
            {icon}
            <span className="mx-1">{title}</span>
        </button>
        </Link>
    )
}

export default ButtonLink