import useSWR from 'swr'
import Loader from '../Loader'
import {FiPlus, FiMinus, FiTrash2} from 'react-icons/fi'
import {fetcher} from "@/utils/helpers"
import {useShoppingCart} from "@/context/ShoppingCart";

interface Props {
    id: string,
    qty: number,
    noBtn: boolean
}

interface Option {
    variant_id: VariantInterface,
    option_id: VariantOptionInterface
}

export default function CartItem({id, qty, noBtn}:Props){
    const { data : item, error: itemError, isLoading: itemLoading } = useSWR(id ? '/api/items/'+id : null, fetcher)
    const { data : product, error: productError, isLoading: productLoading } = useSWR<ProductInterface>(item ? '/api/products/' + item.product_id : null, fetcher)

    const { increaseQty, decreaseQty, removeFromCart } = useShoppingCart() as ShoppingCartContextType

    return(
        
        <div className={"border-2 border-gray-50 rounded-xl"}>
            {
                itemLoading || productLoading ?
                    <Loader/> :
                itemError || productError ?
                    <div className={"text-xs text-gray-700"}>Fetch error</div> :
                !item || !product ?
                    <div className={"text-xs text-gray-700"}>Product no longer available</div> :

                    <div className="flex flex-row items-center justify-items-center gap-6 w-full justify-between p-2">
                        <div className={"flex items-center gap-6"}>
                            <div>
                                <img src={"/img/products/" + product.main_photo} alt={product.name}
                                     className="w-32 rounded"></img>
                            </div>
                            <div>
                                <p className="text-sm my-2 font-semibold">{product.name}</p>
                                <p className='text-xs'>{
                                    item.options.map((option: Option) => {
                                        return (
                                            <span key={option.option_id._id}>{option.variant_id.display_name} {option.option_id.name}</span>
                                        )
                                    })
                                }</p>
                                <p className="text-md mt-2">{item.price} <span className="text-xs">PLN</span></p>
                            </div>
                        </div>
                        {noBtn ? <div></div> :
                            <div className="flex flex-row items-center">
                                <div className="text-xs hover:cursor-pointer hover:opacity-50">
                                    <FiMinus onClick={() => decreaseQty(id)}/>
                                </div>
                                <div className="mx-4 text-lg">
                                    {qty}
                                </div>
                                <div className="text-xs hover:cursor-pointer hover:opacity-50">
                                    <FiPlus onClick={() => increaseQty(id)}/>
                                </div>
                            </div>
                        }
                        {noBtn ? <div></div> :
                            <div className='mx-4 hover:cursor-pointer hover:opacity-50'>
                                <FiTrash2 onClick={() => removeFromCart(id)}/>
                            </div>
                        }
                    </div>
            }
        </div>
    )
}

