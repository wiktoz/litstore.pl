import Product from "@/models/product"
import connect from "../db/connect"
import Item from "@/models/item"
import Category from "@/models/category"
import {isValidObjectId, Types} from "mongoose"

const create = async (data: Product) => {
    await connect()
    
    return Product.create(data)
    .then(product => {
        return product
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const get = async () => {
    await connect()
    
    return Product.find({ active: true }).populate('category').exec()
    .then((product) => {
        return product
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getById = async (id: string) => {
    await connect()
    
    return Product.findOne({
        $or: [
            {_id: isValidObjectId(id) ? new Types.ObjectId(id) : undefined},
            {slug: id}
        ]
    })
    .then(product => { 
        return product 
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getByCategoryId = async (id: string) => {
    await connect()
    
    return Product.find({category: id})
    .then(product => { 
        return product 
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getBySlug = async (slug:string) => {
    await connect()
    
    return Product.findOne({slug: slug})
    .then(product => { 
        return product 
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getStoreBySlug = async (slug: string) => {
    await connect()
    
    const product = await Product.findOne({slug: slug})

    if(product){
        return Item.findOne({product_id: product._id})
        .then((product: Item)=>{
            return product
        }).catch((err)=>{
            return { error: 1, errorMessage: err }
        })
    }

    return {}
}

const search = async (phrase: string) => {
    await connect()
    
    return Product.find({ 
        name: { $regex: phrase, '$options': 'i' }
    }).exec()
    .then((product: Product[]) => {
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