import Subcategory from "@/models/subcategory"
import connect from "@/utils/db/connect"

const create = async (data: SubcategoryInterface) => {
    await connect()
    
    return await Subcategory.create(data)
    .then((category: CategoryInterface) => {
        return category 
    })
    .catch(err => {
        return { error: true, errorMessage: err }
    })
}

const get = async () => {
    await connect()
    
    return await Subcategory.find({active: true}).populate({
        path: "category_id"
    }).exec()
    .then((subcategory) => {
        return subcategory
    })
    .catch(err => {
        return { error: true, errorMessage: err }
    })
}

const getBySlug = async (slug: string) => {
    await connect()
    
    return await Subcategory.findOne({slug: slug})
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