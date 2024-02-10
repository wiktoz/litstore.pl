import Category from "../../models/category"
import connect from "../db/connect"

const create = async (data: Category) => {
    await connect()
    
    return Category.create(data)
    .then((category: Category) => {
        return category 
    })
    .catch(err => {
        return { error: true, errorMessage: err }
    })
}

const get = async () => {
    await connect()
    
    return Category.find({active: true})
    .then((category: Category[]) => {
        return category 
    })
    .catch(err => {
        return { error: true, errorMessage: err }
    })
}

const getBySlug = async (slug: string) => {
    await connect()
    
    return Category.findOne({slug: slug})
    .then((category:Category) => {
        return category 
    })
    .catch(err => {
        return { error: true, errorMessage: err }
    })
}

export {
    create,
    get,
    getBySlug
}