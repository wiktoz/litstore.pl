import SignUpForm from "../../components/SignUpForm"
import {getCsrfToken} from "next-auth/react"

const SignUp = () => {
    const getToken = async () => {
        return await getCsrfToken()
    }

    return (
        <div className='p-10'>
          <SignUpForm csrfToken={getToken}></SignUpForm>
        </div>
    )
}

export default SignUp