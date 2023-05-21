import { getCsrfToken, signIn, getSession } from "next-auth/react"
import {useRouter} from "next/router"
import { useState } from "react"
import Spinner from "./Spinner"
import Link from "next/link";

export default function SignUp({ csrfToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const Router = useRouter()

  const handleSignUp = async (e) => {
    e.preventDefault()

    if(!email || !password || !repeatPassword) return

    if(password !== repeatPassword){
      setMessage("Passwords are not equal")
      return
    }

    setIsLoading(true)

    const r = await fetch('/api/register',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    })

    const response = await r.json()

    setMessage(null)
    if(response?.error){
      setIsLoading(false)
      setMessage(response.error)
    }
    else await Router.push('/user/profile')
  }

  return (
    <>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-700 tracking-tight">
              Sign Up
            </h2>
          </div>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  e-mail
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                  placeholder="e-mail"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  hasło
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                  placeholder="hasło"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  powtórz hasło
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                  placeholder="powtórz hasło"
                  value={repeatPassword}
                  onChange={e=>setRepeatPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-600">
                Rejestrując się, zgadzasz się z&nbsp;
                <Link href="/terms-and-conditions" className="text-gray-900 hover:text-gray-700">
                  Regulaminem
                </Link>
              </div>
            </div>
            { message ?
              <div className="text-red-500 text-sm">
                <p>{message}</p>
              </div>
              : ""}
            <div>
              <button
                type="submit"
                className={"w-full group relative flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-semibold text-white focus:outline-none " + (!email || !password || !repeatPassword || isLoading ? "opacity-70 hover:cursor-default hover:bg-gray-600" : "hover:bg-gray-700")}
                onClick={(e)=>handleSignUp(e)}
              >
                {
                  isLoading ? <Spinner/> : "Sign up"
                }
              </button>
            </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}


{/*<div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-gray-600 hover:text-gray-500">
                  Forgot your password?
                </a>
              </div>
  </div>*/}