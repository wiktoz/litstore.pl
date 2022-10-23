import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '../../../components/Loader'
import Input from '../../../components/form/Input'

const fetcher = url => fetch(url).then(r => r.json())

export default function StoreProduct(){
    const router = useRouter()
    const {slug} = router.query

    const { data: store, error: storeError } = useSWR('/api/products/store/populate/'+slug, fetcher)
    const { data: product, error: productError } = useSWR('/api/products/slug/'+slug, fetcher)

    if(storeError || productError) return "An error occured."
    if(!store || !product) return <Loader></Loader>

    return(
        <div>
            <div>
                <p>{product.name}</p>
            </div>
            <div>
                {
                store.map((item) => {
                    return(
                        <div>
                        <Input 
                            id={item._id}
                            title={item.options.map(option => {
                                return(
                                    option.name 
                                )
                            })}
                            value={item.price ? item.price : "0"}
                        />
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}