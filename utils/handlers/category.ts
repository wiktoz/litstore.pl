import Category from "@/models/category"
import connect from "@/utils/db/connect"

const create = async (data: CategoryInterface) => {
    await connect()
    
    return await Category.create(data)
    .then((category: CategoryInterface) => {
        return category 
    })
    .catch(err => {
        return { error: true, errorMessage: err }
    })
}

const get = async () => {
    await connect()
    
    return await Category.find({active: true}).exec()
    .then((category:CategoryInterface[]) => {
        return category 
    })
    .catch(err => {
        return { error: true, errorMessage: err }
    })
}

const getBySlug = async (slug: string) => {
    await connect()
    
    return await Category.findOne({slug: slug})
    .then((category:CategoryInterface) => {
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