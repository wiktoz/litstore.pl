interface UserInterface extends AddressInterface {
    readonly _id: string,
    email: string,
    password: string,
    role: string,
    address: [AddressInterface]
}

interface AddressInterface {
    email: string,
    name: string,
    surname: string,
    street: string,
    house: string,
    flat?: string,
    post_code: string,
    city: string
}

interface CategoryInterface {
    readonly _id: string,
    name: string,
    description: string,
    seo_description?: string,
    bg_photo?: string,
    active: boolean,
    readonly slug: string
}

interface SubcategoryInterface extends CategoryInterface {
    readonly _id: string,
    category_id: string
}

interface SubcategoryPopulatedInterface extends SubcategoryInterface {
    category_id: CategoryInterface
}

interface DeliveryInterface {
    readonly _id: string,
    name: string,
    img: string,
    price: number,
    free_from: number,
    cod: boolean,
    active: boolean,
    readonly slug: string
}

interface VariantInterface {
    readonly _id: string
    name: string,
    display_name: string,
    select_option: string,
    options: [VariantOptionInterface],
    readonly slug: string
}

interface BuyerInterface extends AddressInterface {
    user_id?: string
}

interface PromoCodeInterface {
    readonly _id: string,
    code: string,
    name: string,
    description?: string,
    categories?: string[],
    subcategories?: string[],
    products?: string[],
    date_start: string,
    date_end: string,
    unit: string,
    value: number,
    usage: {
        max: number,
        used?: number
    }
}

interface OrderInterface {
    readonly _id: string,
    buyer: BuyerInterface,
    delivery: OrderDeliveryInterface,
    items: OrderItemsInterface[],
    promo_code?: PromoCodeInterface,
    payment: {
        amount: number,
        currency: string,
        method: string,
        hash?: string,
        url?: string,
        status: string,
    },
    status: string,
    readonly createdAt: string,
    readonly updatedAt: string
}

interface OrderDeliveryInterface {
    id: string,
    price: number,
    email: string,
    name: string,
    surname: string,
    street: string,
    house: string,
    flat?: string,
    city: string,
    post_code: string
}

interface OrderItemsInterface {
    item_id: string,
    product_id: string,
    qty: number,
    price: number
}

interface VariantOptionInterface {
    readonly _id: string,
    name: string
}

interface ProductInterface {
    readonly _id: string,
    name: string,
    description: string,
    manufacturer?: string,
    category: CategoryInterface,
    subcategory: SubcategoryInterface,
    variant: [VariantInterface],
    main_photo: string,
    photos: [string],
    price: {
        min: number,
        max: number
    },
    new_badge: boolean,
    active: boolean,
    readonly slug: string
}

interface ItemInterface {
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

interface ItemPopulatedInterface {
    _id: string,
    product_id: string,
    options: [{
        variant_id: VariantInterface,
        option_id: VariantOptionInterface
    }],
    stock: number,
    unit: string,
    price: number
}

interface CartItemInterface {
    item_id: string,
    qty: number
}

interface CartBuyerInterface extends AddressInterface {
    user?: UserInterface,
    email: string
}

interface CartDeliveryInterface extends AddressInterface {
    delivery_id: string
}

interface CartInterface {
    buyer: CartBuyerInterface | null,
    delivery: CartDeliveryInterface | null,
    items: CartItemInterface[]
}

interface ShoppingCartContextType {
    cartQty: number,
    cartItems: CartItemInterface[],
    cartBuyer: CartBuyerInterface,
    cartDelivery: CartDeliveryInterface,
    setBuyer: (buyer: CartBuyerInterface) => void,
    setDelivery: (delivery: CartDeliveryInterface) => void,
    getItemQty: (id: string) => number,
    increaseQty: (id: string) => void,
    decreaseQty: (id: string) => void,
    removeFromCart: (id: string) => void
}

declare module "@auth/core" {
    interface Session {
        user: User
    }

    interface User {
        id: string,
        role: string
    }
}

declare module "@auth/core/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        id: string,
        role: string
    }
}