import Token from "@/models/token"
import connect from "@/utils/db/connect"
import User from "@/models/user"

const create = async (data:any) => {
    await connect()

    return Token.create(data)
        .then(token => {
            return token
        })
        .catch(err => {
            return { error: 1, errorMessage: err }
        })
}

const isValid = async (id:string, token:string) => {
    await connect()

    return Token.findOne({ userId: id, token: token})
        .then(t => {
            if(t) return { valid: true }
            return { error: 1, valid: false, message: "Token is not valid" }
        })
        .catch(err => {
            return { error: 1, valid: false, message: "Token is not valid" }
        })
}

const remove = async (id:string, token:string) => {
    await connect()

    return Token.deleteOne({userId: id, token: token})
        .then(token => {
            return { message: "Successfully removed" }
        })
        .catch(err => {
            return { error: 1, message: "Token not found" }
        })
}

export {
    create,
    isValid,
    remove
}