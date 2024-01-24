'use client'

import { signOut, useSession } from "next-auth/react"
import {useRouter} from "next/navigation"

export default function SignOutButton(){
    const router = useRouter()
    const { data: session, status } = useSession()

    const handleSignOut = async () => {
        const data = await signOut({redirect: false})

        return router.push("/")
    }

    if (status === "authenticated") {
        return(
            <div className="flex hover:cursor-pointer">
                <p onClick={handleSignOut}>
                    Log Out
                </p>
            </div>
        )

    }
    else{
        return null
    }

}