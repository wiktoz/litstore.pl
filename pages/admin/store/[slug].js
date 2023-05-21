import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '../../../components/Loader'
import Input from '../../../components/form/Input'
import axios from 'axios'
import {useEffect, useState} from "react"

const fetcher = url => fetch(url).then(r => r.json())

export default function StoreProduct(){
    const [stock, setStocks] = useState({})
    const router = useRouter()
    const {slug} = router.query

    const { data: store, error: storeError } = useSWR('/api/products/store/populate/'+slug, fetcher)
    const { data: product, error: productError } = useSWR('/api/products/slug/'+slug, fetcher)

    useEffect(()=> {
        // effect on page load, no deps to run only once
        const stocks = store?.map(p => ({
                _id: p._id,
                options: p.options?.map(o => o.name),
                price: p.price,
                stock: p.stock,
                unit: p.unit
        }))
        setStocks(stocks)
    },[])

    /*
        stock: {
            _id: itemId,
            price: itemPrice,
            stock: itemStock,
        }
     */

    if(storeError || productError) return "An error occurred."
    if(!store || !product) return <Loader/>

    const postData = async (e) => {
        e.preventDefault()

        const inputs = Array.from(e.target)
        const insertData = inputs.map(item => {
            if(item.id) return {_id: item.id, price: parseFloat(item.value)}
        }).filter(notUndefined => notUndefined !== undefined)

        axios.post('/api/product_item/update', JSON.stringify(insertData), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
    }


    return(
        <div>
            <div>
                <p className='mb-4 font-bold text-xl text-gray-800m'>{product.name}</p>
            </div>
            <div>
                <form onSubmit={postData}>
                {
                store.map((item) => {
                    return(
                        <div key={item._id}>
                            <Input
                                product-id={item._id}
                                title={item.options.map(option => {
                                    return(
                                        option.name
                                    )
                                })}
                                value={item.price ? item.price : "0"}
                            />
                            <Input
                                product-id={item._id}
                                name="stock[]"
                            />
                        </div>
                    )
                })
            }
            <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    )
}