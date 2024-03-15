'use client'

import useSWR from "swr"
import Loader from "@/components/Loader"
import { fetcher } from "@/utils/helpers"
import UserBox from "@/components/UserBox";

const ShowUsers = () => {
    const { data: users, error } = useSWR('/api/users', fetcher)

    if(error) return "An error has occurred."
    if(!users) return <Loader/>

    return(
        <div className={"flex flex-col gap-2"}>
            {
                users.map((user:UserInterface) => {
                    return(
                        <div key={user._id}>
                            <UserBox u={user}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ShowUsers