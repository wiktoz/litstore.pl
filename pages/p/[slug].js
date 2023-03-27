import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import useSWR from 'swr'
import useShoppingCart from '../../context/ShoppingCart'

import Loader from '../../components/Loader'
import Accordion from '../../components/Accordion'
import {FiChevronLeft} from 'react-icons/fi'

import Carousel from '../../components/Carousel'

const fetcher = url => fetch(url).then(r => r.json())

const ProductPage = () => {
    const [addAvailable, setAddAvailable] = useState(false)
    const [pickedOptions, setPickedOptions] = useState([])
    const [pickedProduct, setPickedProduct] = useState(null)
    const {cartQty, cartItems, cartBuyer, getItemQty, increaseQty, decreaseQty, removeFromCart} = useShoppingCart()
    const router = useRouter()
    const { slug } = router.query
    const { data: product, error: productError } = useSWR('/api/products/slug/'+slug, fetcher)
    const { data: variants, error: variantsError } = useSWR('/api/products/store/'+slug, fetcher)

    useEffect(() => {
        if(!product) return
        if(product.variant) {
            setPickedOptions([{ variant: product.variant[0]._id, option: null }])
        }
      }, [product])

    if (productError || variantsError) return "An error has occurred."
    if (!product || !variants) return <Loader />

    const handleAddToCart = (e) => {
        e.preventDefault()

        if(pickedProduct) {
            increaseQty(pickedProduct)
        }
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
        
        if(pickedOptionsNumber === product.variant.length){
            var allVariants = []
            variants.map(variant => {
                variant.options.includes(optionId) ? allVariants.push(variant._id) : ""
            })

            if(allVariants.length == 1){
                setAddAvailable(true)
                setPickedProduct(allVariants[0])
            }
            else setAddAvailable(false)
        }
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
                    <p className="text-xl font-semibold tracking-tight mb-6">{product.name}</p>
                    <div className="flex flex-row my-4 gap-2">
                        {
                            product.variant ? 
                            product.variant.map(v => {
                                return(
                                    v.options ?
                                    v.options.map(item => { 
                                        return (
                                            <div 
                                                key={item._id} 
                                                onClick={() => pickOption(v._id, item._id)} 
                                                className={"rounded-lg border border-gray-500 flex items-center justify-center w-8 h-8 hover:cursor-pointer " + (pickedOptions.map(i => { if(i.variant == v._id && i.option == item._id) return "bg-gray-500 text-white"}))}
                                            >
                                                <p className="m-auto text-xs font-semibold">{item.name}</p>
                                            </div>
                                        )
                                    }) : ""
                                )
                            }) : ""
                        }
                    </div>
                    <p>
                        {
                            pickedProduct && cartItems.find(item => item.id == pickedProduct) ?
                            <button onClick={(e) => handleAddToCart(e)} className="rounded-full bg-gray-600 text-white my-6 px-20 py-2 shadow disabled:opacity-50" disabled={true}>
                                <p className="text-sm">
                                    In Cart
                                </p>
                            </button>
                            :
                            <button onClick={(e) => handleAddToCart(e)} className="rounded-full bg-gray-600 text-white my-6 px-20 py-2 shadow disabled:opacity-50" disabled={!addAvailable}>
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