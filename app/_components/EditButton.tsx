import {PencilSquareIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

const EditButton = ({link}:{link:string}) => {
    return(
        <Link href={link}>
            <div
                className={"bg-gray-800 text-white text-xs px-3 py-1 rounded-xl flex gap-2 items-center " +
                    "hover:cursor-pointer hover:opacity-90 transition-all"}>
                <PencilSquareIcon width={16} height={16}/>
                Edit
            </div>
        </Link>
    )
}

export default EditButton