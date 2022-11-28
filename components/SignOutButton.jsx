import { signOut, useSession } from "next-auth/react"
import Router from "next/router"

export default function SignOutButton(){
    const { data: session, status } = useSession()

    const handleSignOut = async () => {
        const data = await signOut({redirect: false})

        return Router.push("/")
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
        return(
            null
        )
    }

}