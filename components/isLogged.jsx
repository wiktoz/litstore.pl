import { signOut, useSession } from "next-auth/react"

export default function IsLogged(){
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return(
            <div>ZALOGOWANY jako {session.user.email} <span onClick={signOut}>Wyloguj</span></div>
        )

    }
    else{
        return(
            <div>NIEZALOGOWANY!</div>
        )
    }

}