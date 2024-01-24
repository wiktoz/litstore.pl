import crypto from "crypto"
import bcrypt from "bcryptjs"

const generateToken = async () => {
    const t = crypto.randomBytes(16).toString('hex')
    return crypto.createHash('sha256').update(t).digest('hex')
}

export default generateToken