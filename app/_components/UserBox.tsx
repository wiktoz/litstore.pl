import {LuStar, LuUser2, LuUserCog2} from "react-icons/lu";
import Link from 'next/link'

const UserBox = ({u}:{u:UserInterface}) => {
    return(
        <div className={"rounded-2xl shadow"}>
            <div className={"flex flex-row h-full w-full"}>
                <div className={"flex items-center text-xl text-white bg-gray-700 rounded-l-2xl px-4"}>
                    {
                        u.role && u.role.toLowerCase() === "admin" ?
                            <LuStar/> : <LuUser2/>
                    }
                </div>
                <div className={"flex border border-primary h-full w-full rounded-r-2xl"}>
                    <div className={"grow p-4"}>
                        <p className={"text-primary font-semibold text-xs"}>
                            {u.email}
                        </p>
                        <p className={"text-xs font-normal mb-1"}>{u.role && u.role.toLowerCase()}</p>
                        <p className={"text-sm font-normal"}>{u.email}</p>
                    </div>
                    <div className={"hover:cursor-pointer hover:text-gray-600 text-lg flex items-center p-4"}>
                        <Link href={"/admin/user/"+u._id}>
                            <LuUserCog2/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBox