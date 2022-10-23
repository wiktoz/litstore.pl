import useSWR from 'swr'
import Loader from '../../components/Loader'
import {FiPlus, FiMinus, FiTrash2} from 'react-icons/fi'
import Box from '../Box'

const fetcher = url => fetch(url).then(r => r.json())

export default function CartItem({id, qty, handleIncrease, handleDecrease, handleRemove}){
    const { data : product, error } = useSWR('/api/product_item/id/'+id, fetcher)
    if (error) return "An error has occurred."
    if (!product) return <Box><Loader /></Box>

    return(
        
        <Box>
            <div className="flex flex-row items-center justify-items-center gap-6 w-full justify-between">
                <div>
                    <img src={"/img/products/"+ product.product_id.main_photo} className="w-32"></img>
                </div>
                <div>
                    <p className="text-sm my-2 font-medium">{product.product_id.name}</p>
                    <p className='text-xs'>{
                        product.options.map(option => {
                            return <span key={option._id}>{option.variant_id.displayName} {option.name}</span>
                        })
                    }</p>
                    <p className="text-sm mt-2">{product.price} <span className="text-xs">PLN</span></p>
                </div>
                <div className="flex flex-row items-center">
                    <div className="text-xs hover:cursor-pointer hover:opacity-50">
                        <FiMinus onClick={(e) => handleDecrease(e, id)}/>
                    </div>
                    <div className="mx-4 text-lg">
                        {qty}
                    </div>
                    <div className="text-xs hover:cursor-pointer hover:opacity-50">
                        <FiPlus onClick={(e) => handleIncrease(e, id)}/>
                    </div>
                </div>
                <div className='mx-4 hover:cursor-pointer hover:opacity-50'>
                    <FiTrash2 onClick={(e) => handleRemove(e, id)}/>
                </div>
            </div>
        </Box>
    )
}

