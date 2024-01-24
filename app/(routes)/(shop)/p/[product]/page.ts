'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import useSWR from 'swr'
import useShoppingCart from '/app/_context/ShoppingCart'

import Loader from '@/components/Loader'
import Accordion from '@/components/Accordion'
import {FiChevronLeft} from 'react-icons/fi'

import Carousel from '@/components/Carousel'

const fetcher = url => fetch(url).then(r => r.json())

const ProductPage = ({params}) => {
    const [addAvailable, setAddAvailable] = useState(false)
    const [pickedOptions, setPickedOptions] = useState([])
    const [pickedProduct, setPickedProduct] = useState(null)
    const {cartQty, cartItems, cartBuyer, getItemQty, increaseQty, decreaseQty, removeFromCart} = useShoppingCart()
    const { data: product, error: productError } = useSWR(params.product ? '/api/products/slug/'+params.product : null, fetcher)
    const { data: variants, error: variantsError } = useSWR(params.product ? '/api/products/store/populate/'+params.product : null, fetcher)

    useEffect(() => {
        console.log("P:" + product)
        console.log("V:" + variants)
        if(!product) return
        if(product.variant) {
            setPickedOptions([{ variant: product.variant[0]._id, option: null }])
        }
      }, [product, variants])

    if (productError || variantsError) return "An error has occurred."
    if (!product || !variants) return <Loader />

    const handleAddToCart = (e) => {
        e.preventDefault()

        if(pickedProduct) {
            increaseQty(pickedProduct._id)
        }
    }

    const getMaxPrice = () => {
        return Math.max(...variants?.map((i) => i.price))
    }

    const getMinPrice = () => {
        return Math.min(...variants?.map((i) => i.price))
    }

    const printPrice = () => {
        let max = getMaxPrice()
        let min = getMinPrice()

        if(min === max) return min

        return min + " - " + max
    }

    const pickOption = async (variantId, optionId) => {
        let pickedOptionsNumber = 0
        setPickedOptions(pickedOptions.map(item => {
            if(item.option) pickedOptionsNumber += 1
            if(item.variant === variantId) {
                if(!item.option) pickedOptionsNumber += 1
                return {...item, option: optionId}
            }
            else return item
        }))

        /*
        *
        * Check if all available variants are picked
        *
        * */
        if(pickedOptionsNumber === product.variant.length){
            console.log("here")
            let allVariants = []
            console.log(variants)
            console.log(optionId)
            variants.map(variant => {
                variant.options.map(option => option._id === optionId ? allVariants.push(variant) : null)
            })

            console.log(allVariants)

            if(allVariants.length === 1){
                setAddAvailable(true)
                setPickedProduct(allVariants[0])
            }
            else setAddAvailable(false)
        }
    }

    const pickedProductAvailability = () => {
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

    const convertPickOptions = () => {
        const variant = product.variant[0].options
        const stock = variants
        return variant.map(variant => ({...variant, ...stock.find(stock => variant._id === stock.options[0]._id)}))
    }

    const photos = ["/img/products/"+product.main_photo, ...product.photos.map(photo => "/img/products/"+photo)]

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="mx-auto px-8 md:mx-0">
                <Carousel items={photos} />
            </div>
            <div className="text-left w-full h-full flex flex-col justify-between px-6">
                <div className="flex flex-row items-center text-gray-300 text-xs my-4" onClick={() => router.back()}>
                    <FiChevronLeft></FiChevronLeft> 
                    <p className="mx-2">Go Back To Products</p>
                </div>
                <div className="my-2">
                    <p className="text-xs font-semibold text-gray-400 mb-2">{product.producer}</p>
                    <p className="text-xl font-semibold tracking-tight mb-4">{product.name}</p>
                    <p className="text-lg font-semibold text-gray-700 mb-6">
                        {
                            addAvailable ?
                                <span>{pickedProduct.price} <span className="text-sm">PLN</span></span>
                                :
                                <span>{printPrice()} <span className="text-sm">PLN</span></span>
                        }
                    </p>
                    <div className="flex flex-row my-4 gap-2">
                        {
                            convertPickOptions().map(variant => {
                                    return (
                                        <div
                                            key={variant.options[0]._id}
                                            onClick={variant.stock === 0 ? null : () => pickOption(variant.variant_id, variant.options[0]._id)}
                                            className={"rounded-lg border border-gray-500 flex items-center justify-center hover:cursor-pointer "
                                                + (pickedOptions.map(i => { if(i.variant === variant.variant_id && i.option === variant.options[0]._id) return "bg-gray-500 text-white "}))
                                                + (variant.stock === 0 ? "opacity-50": "")
                                            }
                                        >
                                            <p className="m-auto text-xs font-semibold text-center p-2">{variant.name}</p>
                                        </div>
                                    )
                            })
                        }
                    </div>
                    <div>
                        {
                            addAvailable ?
                                pickedProductAvailability() : null
                        }
                    </div>
                    <p>
                        {
                            pickedProduct && cartItems && cartItems.find(item => item.id === pickedProduct._id) ?
                            <button onClick={(e) => handleAddToCart(e)} className="rounded-2xl bg-gray-600 text-white my-6 px-20 py-2 shadow disabled:opacity-50 w-full md:w-auto" disabled={true}>
                                <p className="text-sm">
                                    In Cart
                                </p>
                            </button>
                            :
                            <button onClick={(e) => handleAddToCart(e)} className="rounded-2xl bg-gray-600 text-white my-6 px-20 py-2 shadow disabled:opacity-50 w-full md:w-auto" disabled={!addAvailable}>
                                <p className="text-sm">
                                    Add to Cart
                                </p>
                            </button>
                        }
                    </p>
                    <Accordion
                        title="Description" 
                        description={product.description}
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