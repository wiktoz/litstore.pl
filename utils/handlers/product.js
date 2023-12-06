import Product from "../../models/product"
import connect from "../db/connect"
import Category from "../../models/category";

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
    
    return Product.find({})
    .then(category => { 
        return category 
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getById = async (id) => {
    await connect()
    
    return Product.findOne({_id: id})
    .then(product => { 
        return product 
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getByCategoryId = async (id) => {
    await connect()
    
    return Product.find({category: id})
    .then(product => { 
        return product 
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getBySlug = async (slug) => {
    await connect()
    
    return Product.findOne({slug: slug})
    .then(product => { 
        return product 
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getStoreBySlug = async (slug) => {
    await connect()
    
    const product = await Product.findOne({slug: slug})

    if(product){
        return ProductItem.find({product_id: product._id})
        .then((product)=>{
            return product
        }).catch((err)=>{
            return { error: 1, errorMessage: err }
        })
    }

    return {}
}

const search = async (phrase) => {
    await connect()
    
    return Product.find({ 
        name: { $regex: phrase, '$options': 'i' }
    }).exec()
    .then(product => { 
        return product 
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

export {
    create,
    get,
    getById,
    getByCategoryId,
    getBySlug,
    search
}