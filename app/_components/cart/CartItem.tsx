import useSWR from 'swr'
import Loader from '../Loader'
import {FiPlus, FiMinus, FiTrash2} from 'react-icons/fi'
import Box from '../Box'
import {fetcher} from "@/utils/helpers"
import {useShoppingCart} from "@/context/ShoppingCart";

interface Props {
    id: string,
    qty: number,
    noBtn: boolean
}

export default function CartItem({id, qty, noBtn}:Props){
    const { data : product, error } = useSWR('/api/product_item/id/'+id, fetcher)

    const { increaseQty, decreaseQty, removeFromCart } = useShoppingCart() as ShoppingCartContextType

    if (error) return "An error has occurred."
    if (!product) return <Box><Loader /></Box>

    return(
        
        <Box>
            <div className="flex flex-row items-center justify-items-center gap-6 w-full justify-between">
                <div>
                    <img src={"/img/products/"+ product.product_id.main_photo} alt={product.name} className="w-32 rounded-md"></img>
                </div>
                <div>
                    <p className="text-sm my-2 font-semibold">{product.product_id.name}</p>
                    <p className='text-xs'>{
                        product.options.map((option:VariantOption) => {
                            return <span key={option._id}>{option.variant_id.displayName} {option.name}</span>
                        })
                    }</p>
                    <p className="text-md mt-2">{product.price} <span className="text-xs">PLN</span></p>
                </div>
                { noBtn ? <div></div> :
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
                { noBtn ? <div></div> :
                <div className='mx-4 hover:cursor-pointer hover:opacity-50'>
                    <FiTrash2 onClick={() => removeFromCart(id)}/>
                </div>
                }
            </div>
        </Box>
    )
}

