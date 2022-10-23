import { useRouter } from 'react'
import useSWR from 'swr'
import Loader from '../../../components/Loader'

const fetcher = url => fetch(url).then(r => r.json())

export default function Store(){
    return(
        <div>
            TODO
        </div>
    )
}