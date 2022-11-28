import SignInForm from "../../components/SignInForm"
import { getCsrfToken, getSession } from "next-auth/react"

export default function Home({csrfToken}) {
  return (
    <div className='p-10'>
      <SignInForm csrfToken={csrfToken}></SignInForm>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: { destination: "/user/profile" },
    }
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}