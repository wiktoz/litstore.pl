import axios from 'axios'
import { useState } from "react"
import Spinner from "./Spinner"
import {useRouter} from "next/router"

const ChangePasswordForm = ({ csrfToken, id, token }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [message, setMessage] = useState(null)

    const Router = useRouter()

    const handleChangePassword = async (e) => {
        e.preventDefault()

        if(!password || !repeatPassword) return

        if(password !== repeatPassword){
            setMessage("Passwords are not equal")
            return
        }

        setIsLoading(true)

        axios.post("/api/users/edit/" + id + "/changePassword/" + token, {
            password: password
        }).then((response) => {
            if(response.data?.error)
                setMessage(response.data.message)
            else Router.push("/auth/signin")
        }).catch((error) => {
            setMessage("Connection error. Try again later.")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-700 tracking-tight">
                            Change Password
                        </h2>
                    </div>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="password" className="sr-only">
                                nowe hasło
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                placeholder="nowe hasło"
                                value={password}
                                onChange={e=> setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                powtórz nowe hasło
                            </label>
                            <input
                                id="password2"
                                name="password2"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                placeholder="powtórz nowe hasło"
                                value={repeatPassword}
                                onChange={e=> setRepeatPassword(e.target.value)}
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
                            className={"w-full group relative flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-semibold text-white focus:outline-none " + (!password || !repeatPassword || isLoading ? "opacity-70 hover:cursor-default hover:bg-gray-600" : "hover:bg-gray-700")}
                            onClick={(e) => handleChangePassword(e)}
                        >
                            {
                                isLoading ? <Spinner/> : "Change password"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePasswordForm