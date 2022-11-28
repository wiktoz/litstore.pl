import {MdOutlineDeleteForever} from 'react-icons/md'
import {MdOutlineModeEditOutline} from 'react-icons/md'
import {AiOutlineEye} from 'react-icons/ai'
import Link from 'next/link'

export default function ShowBox({children, showLink, editLink, deleteLink}){
    return(
        <div className="border rounded-lg p-2 my-2 w-full relative bg-white z-0">
            <div className="flex flex-row items-center justify-items-center">
                {children}
            </div>
            <div className="absolute top-0 right-0 m-2 flex flex-row text-lg">
                {showLink ?
                <Link href={showLink}>
                    <p 
                        title="Show product page"
                        className="hover:cursor-pointer hover:text-gray-400 mx-1"
                    >
                        <AiOutlineEye />
                    </p>
                </Link>
                : ""}

                {editLink ?
                <Link href={editLink}>
                    <p
                        title="Edit product"
                        className="hover:cursor-pointer hover:text-gray-400 mx-1"
                    >
                        <MdOutlineModeEditOutline />
                    </p>
                </Link>
                : ""}

                {deleteLink ?
                <Link href={deleteLink}>
                    <p
                        title="Delete product"
                        className="hover:cursor-pointer hover:text-gray-400 mx-1"
                    >
                        <MdOutlineDeleteForever />
                    </p>
                </Link>
                : ""}
                
            </div>
        </div>
    )
}