'use client'

import Checkbox from "@/components/form/Checkbox"
import Loader from "@/components/Loader"
import { useRouter } from "next/router"
import useSWR from 'swr'
import Input from "@/components/form/Input"
import {useState} from "react";

const fetcher = url => fetch(url).then(r => r.json())

export default function EditDelivery({params}){
    const {slug} = params

    const { data : delivery, error: deliveryError } = useSWR(slug ? '/api/deliveries/' + slug : null, fetcher)

    const [price, setPrice] = useState(delivery ? delivery.price : null)
    const [freeFrom, setFreeFrom] = useState(delivery ? delivery.freeFrom : null)
    const [active, setActive] = useState(delivery ? delivery.active : false)

    if(deliveryError) return "An error has occurred."
    if(!delivery) return <Loader/>

    const handleEditDelivery = async (e) => {
        e.preventDefault()

        const data = {
            name: e.target.name.value,
            description: e.target.description.value
        }

          const JSONdata = JSON.stringify(data)
          console.log(JSONdata)
          const endpoint = '/api/categories'
      
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSONdata,
          }
      
          const response = await fetch(endpoint, options)
          console.log(response)
    }

    return (
            <div className="py-2">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-3">
                    <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">Delivery method</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Edit delivery method
                    </p>
                    </div>
                </div>
                <div className="mt-5 md:col-span-3 md:mt-0">
                    <form action="#" method="POST" onSubmit={handleEditDelivery}>
                    <div className="shadow overflow-hidden rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-12 flex flex-row">
                                <div>
                                    <img src={'/img/delivery/' + delivery.img} width={100} alt={delivery.name}/>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-12">
                                <Input
                                    type={"number"}
                                    title="Price"
                                    id="price"
                                    value={price}
                                    setter={setPrice}
                                />
                                <Input
                                    type={"number"}
                                    title="Free from"
                                    id="freeFrom"
                                    value={freeFrom}
                                    setter={setFreeFrom}
                                />
                            </div>
                            <div className="col-span-12">
                                <Checkbox
                                    id="active"
                                    title="Active"
                                    description="Decide if this delivery method will be available for users"
                                    checked={active}
                                />
                            </div>
                        </div>
                        <div className="py-3 text-right">
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-0 focus:ring-offset-2"
                        >
                            Save
                        </button>
                        </div>
                    </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
    )
}