'use client'

import useSWR from "swr"
import ShowBox from "@/components/admin/ShowBox"
import Loader from "@/components/Loader"

const fetcher = url => fetch(url).then(r => r.json())

const ShowUsers = () => {
    const { data: users, error } = useSWR('/api/users', fetcher)

    if(error) return "An error has occurred."
    if(!users) return <Loader/>

    return(
        <div>
            {
                users.map(user => {
                    return(
                        <ShowBox
                            editLink={"/admin/users/edit/" + user._id}
                            deleteLink={"/admin/users/delete/" + user._id}
                            key={user._id}
                        >
                            <div>
                                <p className="text-gray-800 my-1">{user.email}</p>
                                <p className="text-gray-600 text-xs uppercase">{user.role}</p>
                            </div>
                        </ShowBox>
                    )
                })
            }
        </div>
    )
}

export default ShowUsers