'use client'

import { signIn } from "next-auth/react"
import {useRouter} from "next/navigation"
import { useState } from "react"
import Spinner from "./Spinner"
import Link from "next/link"

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const Router = useRouter()

  const handleSignIn = async (e) => {
    e.preventDefault()

    if(!email || !password) return

    setIsLoading(true)

    let options = {
      email: email,
      password: password,
      redirect: false
    }

    const response = await signIn("credentials", options)

    setMessage(null)
    if(response?.error){
      setIsLoading(false)
      setMessage(response.error)
    }
    else await Router.push('/user/profile')
  }

  return (
    <>
    <div className="flex min-h-full w-full items-center justify-center py-12 px-2 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-700 tracking-tight">
              Sign In
            </h2>
          </div>
            <input type="hidden" name="remember" defaultValue="true" />
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
                  password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                  placeholder="hasło"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href={"/auth/password/reset"} className="font-medium text-gray-600 hover:text-gray-500">
                  Forgot your password?
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
                className={"w-full group relative flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-semibold text-white focus:outline-none " + (!email || !password || isLoading ? "opacity-70 hover:cursor-default hover:bg-gray-600" : "hover:bg-gray-700")}
                onClick={(e)=>handleSignIn(e)}
              >
                {
                  isLoading ? <Spinner/> : "Sign in"
                }
              </button>
            </div>
        </div>
      </div>
    </>
  )
}


            {/*<div className="flex items-center">
              <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>*/}