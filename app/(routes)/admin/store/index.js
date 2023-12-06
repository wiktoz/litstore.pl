import { useRouter } from 'react'
import useSWR from 'swr'
import Loader from '../../../app/components/Loader'

const fetcher = url => fetch(url).then(r => r.json())

export default function Store(){
    return(
        <div>
            TODO
        </div>
    )
}