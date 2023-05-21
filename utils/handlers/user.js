import User from "../../models/user"
import connect from "../connectDb"

const getByEmail = async (email) => {
    await connect()
    
    return User.findOne({email: email})
    .then(user => {
        if(user)
            return user
        return { error: 1, message: "No user with specified e-mail" }

    })
    .catch(err => {
        return { error: 1, message: "No user with specified e-mail" }
    })
}

const getById = async (id) => {
    await connect()
    
    return User.findOne({_id: id})
        .then(user => {
            return user
        })
        .catch(err => {
            return { error: 1, errorMessage: err }
        })
}

const changePassword = async (id, password) => {
    await connect()

    return User.updateOne({_id: id}, {password: password})
        .then(user => {
            if(user) return user
            return { error: 1, message: "No user with specified id" }
        })
        .catch(err => {
            return { error: 1, message: err }
        })
}

export {
    getByEmail,
    getById,
    changePassword
}