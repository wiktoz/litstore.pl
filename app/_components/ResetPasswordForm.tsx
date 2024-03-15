'use client'

import axios from 'axios'
import { useState } from "react"
import Spinner from "@/components/Spinner"

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string>("")

  const handleResetPassword = async () => {
    setIsLoading(true)

    await axios.post("/api/auth/password/reset", {
      email: email
    })
    .then(function (response) {
        if(response.data?.error)
          setMessage(response.data?.message)
        else setSuccess(true)
    })
    .catch(function (error) {
      setMessage("Connection error. Try again later.")
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {
        success ?
            <div className="text-xs text-gray-500">
              <h2 className="text-lg font-bold text-gray-700 tracking-tight uppercase">
                Success!
              </h2>
              <p className="text-sm">We have sent a link to your e-mail. Open it to set a new password.</p>
              <p className="pt-2">You can safely close this tab.</p>
            </div>
          :
          <div className="w-full max-w-md space-y-4">
          <div>
            <h2 className="text-lg font-bold text-gray-700 tracking-tight uppercase">
              Reset Password
            </h2>
            <div className="text-xs text-gray-500">
              <p>In order to change password enter e-mail attached to your account.</p>
              <p>We will send a link to reset your password.</p>
            </div>
          </div>
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
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="e-mail"
                  value={email}
                  onChange={e=> setEmail(e.target.value)}
                />
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
                  className={"w-full group relative flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-semibold text-white focus:outline-none " + (!email || isLoading ? "opacity-70 hover:cursor-default hover:bg-gray-600" : "hover:bg-gray-700")}
                  onClick={(e) => {e.preventDefault(); handleResetPassword()}}
              >
                {
                  isLoading ? <Spinner/> : "Reset password"
                }
              </button>
            </div>
        </div>
      }
      </div>
    </>
  )
}

export default ResetPasswordForm