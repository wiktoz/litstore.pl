import {Schema} from "mongoose";

interface User {
    name: string,
    surname: string,
    address: Address
}

interface Address {
    street: string,
    house: string,
    flat: string,
    post_code: string,
    city: string
}

interface Category {
    name: string,
    description: string,
    seo_description?: string,
    bg_photo?: string,
    active: boolean,
    slug: string
}

interface Subcategory extends Category {
    category_id: string
}

interface Delivery {
    name: string,
    img: string,
    price: number,
    free_from: number,
    cod: boolean,
    active: boolean,
    slug: string
}

interface Product {
    name: string,
    description: string,
    manufacturer?: string,
    category: Category,
    subcategory: Subcategory,
    variant: [string],
    main_photo: string,
    photos: [string],
    new_badge: boolean,
    active: boolean,
    slug: string
}

interface Item {
    product_id: string,
    options: [],
    stock: {type: Number, default: 0},
    unit: {type: String, default: "szt." },
    price
}