'use client'

import {useEffect, useState} from 'react'

import useSWR from 'swr'
import {useShoppingCart} from '@/context/ShoppingCart'

import Loader from '@/components/Loader'
import Accordion from '@/components/Accordion'
import {FiChevronLeft} from 'react-icons/fi'

import Carousel from '@/components/Carousel'
import {fetcher} from "@/utils/helpers"
import {useRouter} from "next/navigation"
import Spinner from "@/components/Spinner"

import OptionSelect from "@/components/OptionSelect"

interface Option {
    variant_id?: string,
    option_id?: string
}

const ProductPage = ({params}:{params: {product: string}}) => {
    const router = useRouter()
    const [addAvailable, setAddAvailable] = useState(false)
    const [pickedOptions, setPickedOptions] = useState<Option[]>([])
    const [pickedProduct, setPickedProduct] = useState<ItemInterface>()
    const {cartItems, increaseQty} = useShoppingCart() as ShoppingCartContextType

    const [photos, setPhotos] = useState<string[]>()

    const { data: product, error: productError, isLoading: isProductLoading } = useSWR<ProductInterface>(params.product ? '/api/products/'+params.product : null, fetcher)
    const { data: items, error: itemsError, isLoading: itemsLoading } = useSWR<ItemInterface[]>(product ? '/api/items/product/'+product._id : null, fetcher)
    const { data: variants, error: variantsError, isLoading: variantsLoading } = useSWR<VariantInterface[]>(product && product?.variant.length > 0 ? '/api/variants/'+product.variant : null, fetcher)

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

    const getMaxPrice = (itemsList:ItemInterface[]) => {
        return Math.max(...itemsList?.map((i) => i.price))
    }

    const getMinPrice = (itemsList:ItemInterface[]) => {
        return Math.min(...itemsList?.map((i) => i.price))
    }

    const printPrice = (itemsList:ItemInterface[]) => {
        let max = getMaxPrice(itemsList)
        let min = getMinPrice(itemsList)

        if(min === max) return min

        return min + " - " + max
    }

    function isSubarray(itemOpt:Option[], pickedOpt:Option[]) {
        return pickedOpt.every((subElem: Option) =>
            itemOpt.some((arrElem: Option) =>
                arrElem.variant_id === subElem.variant_id && arrElem.option_id === subElem.option_id
            )
        );
    }

    const pickOption = async (variant_id: string, option_id: string) => {
        if(!items) return

        const optionsRemoved = pickedOptions.filter(option => option.variant_id !== variant_id)

        const options = [...optionsRemoved, {
            variant_id: variant_id,
            option_id: option_id
        }]
        setPickedOptions(options)

        const filteredItems = items.filter((item:ItemInterface) => isSubarray(item.options, options))

        if(filteredItems.length === 1){
            setPickedProduct(filteredItems[0])
            setAddAvailable(true)
        }
        else{
            setPickedProduct(undefined)
            setAddAvailable(false)
        }
    }

    const checkStock = (variant_id:string, option_id:string) => {
        if(!items)
            return 0

        const filteredItems = items.filter(item => {
            return item.options.some(option => option.variant_id === variant_id && option.option_id === option_id)
        })

        return filteredItems.reduce((acc, item) => acc + item.stock, 0);
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
        <div className="grid grid-cols-1 md:grid-cols-2 items-center p-8 lg:px-16 lg:py-6">
            <div className="px-6 flex flex-row items-center text-gray-300 text-xs my-4 md:hidden hover:cursor-pointer" onClick={() => router.back()}>
                <FiChevronLeft></FiChevronLeft>
                <p className="mx-2">Go Back To Products</p>
            </div>
            <div className="w-full px-6 md:mx-0 self-start">
                {
                    photos ?
                        <Carousel items={photos}/> :
                        <Loader/>
                }
            </div>
            <div className="text-left w-full h-full flex flex-col justify-between px-6">
                <div className="items-center text-gray-300 text-xs my-4 hidden md:flex hover:cursor-pointer"
                     onClick={() => router.back()}>
                    <FiChevronLeft></FiChevronLeft>
                    <p className="mx-2">Go Back To Products</p>
                </div>
                <div className="my-6">
                    <div className={"my-6"}>
                    <div>
                    {
                        isProductLoading ?
                            <>
                                <div
                                    className="animate-pulse font-semibold text-gray-400 mb-2 bg-gray-200 w-24 h-3 rounded-xl"></div>
                                <div
                                    className="animate-pulse font-semibold tracking-tight mb-4 bg-gray-200 w-64 h-6 rounded-xl"></div>
                            </> :
                            !product ?
                                <p>Cannot find product</p> :
                                <>
                                    <p className="text-xs text-gray-400 mb-2">{product.manufacturer}</p>
                                    <p className="text-lg font-bold tracking-tight mb-4">{product.name}</p>
                                </>
                    }
                    </div>
                    <div className="text-md text-gray-800 my-4">
                        {
                            itemsLoading || !items ?
                                <Spinner/> :
                            items.length === 0 ?
                                <div className={"text-sm text-gray-500"}>Currently not available</div> :
                                <div className={"flex flex-row gap-1 items-center"}>
                                    <div className={"font-medium font-2xl"}>
                                        {
                                            pickedProduct ? pickedProduct.price : printPrice(items)
                                        }
                                    </div>
                                    <div className="text-xs">PLN</div>
                                </div>
                        }
                    </div>
                    </div>
                    <div>
                        {
                            variantsLoading ?
                                <div
                                    className="text-xl font-semibold tracking-tight mb-4 bg-gray-200 w-64 h-6 rounded-xl"></div> :
                                variants &&
                                <div className={"w-full lg:w-1/2"}>
                                    {
                                        variants.map((variant: VariantInterface) => {
                                        return (
                                            <div key={variant._id}>
                                                <div className={"flex gap-2"}>
                                                    <OptionSelect
                                                        variant={variant._id}
                                                        options={variant.options}
                                                        pickOption={pickOption}
                                                        checkStock={checkStock}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className={"my-4"}>
                        {
                            addAvailable ?
                                pickedProductAvailability() : null
                        }
                    </div>
                    <div className={"font-semibold w-full lg:w-1/2"}>
                        {
                            items && items.length > 0 ?
                            pickedProduct && cartItems && cartItems.find(item => item.item_id === pickedProduct._id) ?
                                <button
                                    className="rounded-lg bg-black text-white py-2 shadow disabled:opacity-50 w-full"
                                    disabled={true}>
                                    <p className="text-sm">
                                        In Bag
                                    </p>
                                </button>
                                :
                                <button onClick={() => handleAddToCart()}
                                    className="rounded-lg bg-black text-white py-2 shadow disabled:opacity-50 w-full"
                                    disabled={!addAvailable}>
                                    <p className="text-sm">
                                        Add To Bag
                                    </p>
                                </button> : ""
                        }
                    </div>
                    <div className={"flex flex-col gap-2 my-8"}>
                        <Accordion
                            title="Description"
                            description={product ? product?.description : ""}
                        />
                        <Accordion
                            title="Delivery"
                            description={"Free ship worldwide from $100"}
                        />
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}


export default ProductPage
