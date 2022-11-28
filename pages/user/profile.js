import {useSession} from 'next-auth/react'
import SignOutButton from '../../components/SignOutButton'
import Link from 'next/link'

const UserProfile = () => {
    const { data: session, status } = useSession()
    
    return(
        <>
            {
                session && session.user.role === "admin" ? 
                <Link href="/admin">
                    Go To Admin Panel
                </Link> : ""
            }
            <SignOutButton/>
        </>
    )
}

export default UserProfile