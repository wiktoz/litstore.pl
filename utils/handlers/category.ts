import Category from "../../models/category"
import connect from "../db/connect"

const create = async (data) => {
    await connect()
    
    return Category.create(data)
    .then(category => { 
        return category 
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const get = async () => {
    await connect()
    
    return Category.find({active: true})
    .then(category => { 
        return category 
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getBySlug = async (slug) => {
    await connect()
    
    return Category.findOne({slug: slug})
    .then(category => { 
        return category 
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

export {
    create,
    get,
    getBySlug
}