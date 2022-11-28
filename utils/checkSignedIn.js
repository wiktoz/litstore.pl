import { getToken } from "next-auth/jwt"

const isSignedIn = async (req, res) => {
    const token = await getToken({ req })
  
    if (token) return true
    return false
}

export default isSignedIn