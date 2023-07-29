import SignUpForm from "../../components/SignUpForm"
import {getCsrfToken} from "next-auth/react"

const SignUp = () => {
    const getToken = async () => {
        return await getCsrfToken()
    }

    return (
        <div>
          <SignUpForm csrfToken={getToken}></SignUpForm>
        </div>
    )
}

export default SignUp