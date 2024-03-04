'use client'

import {useEffect, useState} from 'react'

import useSWR from 'swr'
import { useShoppingCart } from '@/context/ShoppingCart'

import Loader from '@/components/Loader'
import Accordion from '@/components/Accordion'
import {FiChevronLeft} from 'react-icons/fi'

import Carousel from '@/components/Carousel'
import {fetcher} from "@/utils/helpers"
import {useRouter} from "next/navigation"

interface Option {
    variant_id?: string,
    option_id?: string
}

const ProductPage = ({params}:{params: {product: string}}) => {
    const router = useRouter()
    const [addAvailable, setAddAvailable] = useState(false)
    const [pickedOptions, setPickedOptions] = useState<Option[]>([])
    const [pickedProduct, setPickedProduct] = useState<Item>()
    const {cartItems, increaseQty} = useShoppingCart() as ShoppingCartContextType

    const [photos, setPhotos] = useState<string[]>()

    const { data: product, error: productError, isLoading: isProductLoading } = useSWR<Product>(params.product ? '/api/products/'+params.product : null, fetcher)
    const { data: items, error: itemsError, isLoading: isItemLoading } = useSWR<Item[]>(product ? '/api/items/product/'+product._id : null, fetcher)

    useEffect(() => {
        if(product){
            setPhotos(["/img/products/"+product.main_photo, ...product.photos.map(photo => "/img/products/"+photo)])
        }
    }, [product]);

    const handleAddToCart = () => {
        if(pickedProduct) {
            increaseQty(pickedProduct._id)
        }
    }

    const getMaxPrice = () => {
        if(!items) return
        return Math.max(...items?.map((i) => i.price))
    }

    const getMinPrice = () => {
        if(!items) return
        return Math.min(...items?.map((i) => i.price))
    }

    const printPrice = () => {
        if(!items || items.length == 0)
            return "Currently not available"

        let max = getMaxPrice()
        let min = getMinPrice()

        if(min === max) return min

        return min + " - " + max
    }

    const pickOption = async (variantId: string, optionId: string) => {
        if(!items) return
        setPickedOptions([...pickedOptions, {
            variant_id: variantId,
            option_id: optionId
        }])

        const picked = items.filter((item: Item) => item.options == pickedOptions)

        if(picked.length === 1){
            setPickedProduct(picked[0])
            setAddAvailable(true)
        }
        else{
            setPickedProduct(undefined)
            setAddAvailable(false)
        }
    }

    const pickedProductAvailability = () => {
        if(!pickedProduct)
            return

        if(pickedProduct.stock === 0)
            return <div className="flex flex-row text-xs items-center gap-2">
                <div className="rounded-full w-2 h-2 bg-red-400"></div>
                <div className="text-gray-500">Unavailable</div>
            </div>
        if(pickedProduct.stock < 20)
            return <div className="flex flex-row text-xs items-center gap-2">
                <div className="rounded-full w-2 h-2 bg-orange-400"></div>
                <div className="text-gray-500">Low availability</div>
            </div>
        return <div className="flex flex-row text-xs items-center gap-2">
            <div className="rounded-full w-2 h-2 bg-green-400"></div>
            <div className="text-gray-500">In stock</div>
        </div>
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="mx-auto px-8 md:mx-0">
                {
                    photos ?
                        <Carousel items={photos} /> :
                        <Loader/>
                }
            </div>
            <div className="text-left w-full h-full flex flex-col justify-between px-6">
                <div className="flex flex-row items-center text-gray-300 text-xs my-4" onClick={() => router.back()}>
                    <FiChevronLeft></FiChevronLeft> 
                    <p className="mx-2">Go Back To Products</p>
                </div>
                <div className="my-2">
                    {
                        isProductLoading ?
                            <>
                                <div className="text-xs font-semibold text-gray-400 mb-2 bg-gray-200 w-24 h-3 rounded-xl"></div>
                                <div className="text-xl font-semibold tracking-tight mb-4 bg-gray-200 w-64 h-6 rounded-xl"></div>
                            </> :
                        !product ?
                            <p>Cannot find product</p> :
                        <>
                            <p className="text-xs font-semibold text-gray-400 mb-2">{product.manufacturer}</p>
                            <p className="text-xl font-semibold tracking-tight mb-4">{product.name}</p>
                        </>
                    }
                    <p className="text-sm font-semibold text-gray-800 my-4">
                        {
                            addAvailable ?
                                <span>{pickedProduct?.price} <span className="text-sm">PLN</span></span>
                                :
                                <span>{printPrice()}</span>
                        }
                    </p>
                    <div>
                        {
                            addAvailable ?
                                pickedProductAvailability() : null
                        }
                    </div>
                    <p>
                        {
                            pickedProduct && cartItems && cartItems.find(item => item.item_id === pickedProduct._id) ?
                            <button className="rounded-2xl bg-gray-600 text-white my-6 px-20 py-2 shadow disabled:opacity-50 w-full md:w-auto" disabled={true}>
                                <p className="text-sm">
                                    In Cart
                                </p>
                            </button>
                            :
                            <button onClick={() => handleAddToCart()} className="rounded-2xl bg-gray-600 text-white my-6 px-20 py-2 shadow disabled:opacity-50 w-full md:w-auto" disabled={!addAvailable}>
                                <p className="text-sm">
                                    Add to Cart
                                </p>
                            </button>
                        }
                    </p>
                    <Accordion
                        title="Description" 
                        description={product ? product?.description : ""}
                    />
                    <Accordion
                        title="Delivery" 
                        description={"Free ship worldwide from $100"}
                    />
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default ProductPage