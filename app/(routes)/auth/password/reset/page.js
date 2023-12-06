import ResetPasswordForm from "../../app/components/ResetPasswordForm"
import {getCsrfToken, useSession} from "next-auth/react"
import {useRouter} from "next/router";
import Loader from "../../app/components/Loader";

const ResetPassword = () => {
    const { data: session, status } = useSession()
    const Router = useRouter()

    if(status === "loading") return <Loader/>
    if(status === "authenticated") return Router.push("/user/profile")

    const getToken = async () => {
        return await getCsrfToken()
    }

    return (
        <div className='p-10'>
            <ResetPasswordForm csrfToken={getToken}></ResetPasswordForm>
        </div>
    )
}

export default ResetPassword