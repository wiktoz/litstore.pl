import SignInForm from "../../components/SignInForm"
import {getCsrfToken} from "next-auth/react"

const SignIn = () => {
  const getToken = async () => {
    return await getCsrfToken()
  }

  return (
    <div>
      <SignInForm csrfToken={getToken}></SignInForm>
    </div>
  )
}

export default SignIn