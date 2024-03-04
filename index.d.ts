
interface User {
    _id: string,
    email: string,
    password: string,
    role: string,
    billingAddress: Address,
    addresses: [Address]
}

interface Address {
    email: string,
    name: string,
    surname: string,
    street: string,
    house: string,
    flat?: string,
    post_code: string,
    city: string
}

interface Category {
    _id: string,
    name: string,
    description: string,
    seo_description?: string,
    bg_photo?: string,
    active: boolean,
    slug: string
}

interface Subcategory extends Category {
    _id: string,
    category_id: string
}

interface Delivery {
    _id: string,
    name: string,
    img: string,
    price: number,
    free_from: number,
    cod: boolean,
    active: boolean,
    slug: string
}

interface Variant {
    _id: string
    name: string,
    displayName: string,
    selectOption: string,
    options: [VariantOption],
    slug: string
}

interface Buyer extends Address {
    user_id?: string
}

interface PromoCode {
    code: string,
    name: string,
    description?: string,
    date_start: string,
    date_end: string,
    unit: string,
    value: number,
    usage: {
        max: number,
        used?: number
    }
}

interface Order {
    _id: string,
    buyer: Buyer,
    delivery: Delivery,
    items: [{
        item: Item,
        product: Product,
        qty: number,
    }],
    promo_code?: PromoCode,
    payment: {
        amount: number,
        method: string,
        hash: string,
        url: string,
        status: string,
    },
    status: string,
    date: string
}

interface VariantOption {
    _id: string,
    name: string
}

interface Product {
    _id: string,
    name: string,
    description: string,
    manufacturer?: string,
    category: Category,
    subcategory: Subcategory,
    variant: [Variant],
    main_photo: string,
    photos: [string],
    new_badge: boolean,
    active: boolean,
    slug: string
}

interface Item {
    _id: string,
    product_id: string,
    options: [{
        variant_id: string,
        option_id: string
    }],
    stock: number,
    unit: string,
    price: number
}

interface CartItem {
    item_id: string,
    qty: number
}

interface CartBuyer extends Address, Personal {
    user?: User,
    email: string
}

interface CartDelivery extends Address {
    delivery_id: string
}

interface Cart {
    buyer: CartBuyer | null,
    delivery: CartDelivery | null,
    items: CartItem[]
}

interface ShoppingCartContextType {
    cartQty: number,
    cartItems: CartItem[],
    cartBuyer: CartBuyer,
    cartDelivery: CartDelivery,
    setBuyer: (buyer: CartBuyer) => void,
    setDelivery: (delivery: CartDelivery) => void,
    getItemQty: (id: string) => number,
    increaseQty: (id: string) => void,
    decreaseQty: (id: string) => void,
    removeFromCart: (id: string) => void
}