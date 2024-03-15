'use client'

import ResetPasswordForm from "@/components/ResetPasswordForm"
import {useSession} from "next-auth/react"
import Loader from "@/components/Loader";
import { useRouter } from 'next/navigation'

const ResetPassword = () => {
    const router = useRouter()
    const { data: session, status } = useSession()

    if(status === "loading") return <Loader/>
    if(status === "authenticated") return router.push("/user/profile")

    return (
        <div className='p-10'>
            <ResetPasswordForm/>
        </div>
    )
}

export default ResetPassword