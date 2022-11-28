import SignUpForm from "../../components/SignUpForm"
import { getCsrfToken, getSession } from "next-auth/react"

export default function Home() {
  return (
    <div className='p-10'>
      <SignUpForm></SignUpForm>
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
