import Link from "next/link"

export default function SidebarIcon({icon,title,link}){
    return(
        <Link href={link}>
        <div className="relative flex flex-row items-center justify-left bg-gray-700 rounded-lg p-2 hover:cursor-pointer hover:bg-gray-600 transition-all">
            <div className="mx-2">
                {icon}
            </div>
            <div className="text-gray-50 leading-7 text-sm">
                {title}
            </div>
        </div>
        </Link>
    )
}