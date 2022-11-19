import {useSession, signOut} from 'next-auth/react'
import { useEffect } from 'react'

const UserProfile = () => {
    const { data: session, status } = useSession()
    
    useEffect(()=>{
        console.log(session)
    })

    if (status === "authenticated") {
        return(
            <div>ZALOGOWANY jako {session.user.email} {session.user.role}<span onClick={signOut}>Wyloguj</span></div>
        )

    }
    else{
        return(
            <div>NIEZALOGOWANY!</div>
        )
    }

}

export default UserProfile