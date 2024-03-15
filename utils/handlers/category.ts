import Category from "@/models/category"
import connect from "@/utils/db/connect"
import {boolean, object, string, Schema} from "yup";

const create = async (data: CategoryInterface) => {
    /*const schema: Schema<CategoryInterface> = object().shape({
        _id: string(),
        slug: string(),
        name: string().required().min(1).max(25),
        description: string(),
        seo_description: string(),
        bg_photo: string(),
        active: boolean()
    })
*/
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
    
    return await Category.find().exec()
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