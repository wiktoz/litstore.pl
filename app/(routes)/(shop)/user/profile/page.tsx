'use client'

import Link from 'next/link'
import useSWR from 'swr'
import AddressForm from '@/components/form/AddressForm'
import {PlusIcon} from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from 'axios'
import Loader from '@/components/Loader'
import {fetcher} from "@/utils/helpers"
import {useSession} from "next-auth/react"

const UserProfile = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: session, status } = useSession()
    const { data: user, error: errorUser } = useSWR(session && session.user ? "/api/users/" + session.user.id : null, fetcher)

    if(errorUser ) return <Loader/>
    if(!user ) return <Loader/>

    const addAddress = async (data: AddressInterface) => {
        const endpoint = session && session.user ? '/api/users/edit/'+session.user.id+'/addAddress' : ''

        axios.post(endpoint, data).then(response => {
            setIsOpen(false)
            if(response.data.success) console.log("success")
            else console.log("error")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={"grid grid-cols-1 gap-2"}>
                <div className="flex flex-col gap-6 bg-gray-50 rounded-md p-6 font-medium text-sm">
                    <div>
                        <p className="font-bold text-lg mb-2">
                            Moje konto
                        </p>
                    </div>
                    <div>
                        <p className="mb-2">Moje zakupy</p>
                        <Link href={"/user/orders"}>
                            <p className="text-sm font-light">Zamówienia</p>
                        </Link>
                    </div>
                    <div>
                        <p className="mb-1">Ustawienia</p>
                        <Link href={"/user/orders"}>
                            <p className="text-sm font-light">Dane</p>
                        </Link>
                        <Link href={"/user/orders"}>
                            <p className="text-sm font-light">Adresy do wysyłki</p>
                        </Link>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-4'>
                    <div onClick={() => setIsOpen(true)} className='rounded-md col-span-2 py-4 text-gray-700 border
                     border-gray-500 hover:bg-gray-500 hover:border-solid hover:cursor-pointer hover:text-white'>
                        <div className="flex justify-center items-center h-full">
                            <PlusIcon className="w-4 h-4"/>
                            <p className="text-xs mx-1">Dodaj adres</p>
                        </div>
                    </div>
                    {
                        user && user.addresses && user.addresses.length > 0 ?
                            user.addresses.map((address:AddressInterface) => {
                                return(
                                    <div key={"22"} className='py-2 rounded-md col-span-2 text-gray-700 border border-gray-500'>
                                        <div className="flex flex-col justify-center h-full p-2">
                                            <p className="text-sm font-bold mx-1 mb-2">{address.name} {address.surname}</p>
                                            <p className="text-sm mx-1">{address.street}</p>
                                            <p className="text-sm mx-1">{address.post_code} {address.city}</p>
                                        </div>
                                    </div>
                                )
                            })
                            : ""
                    }
                </div>
            </div>
            <div className='flex flex-col gap-4 col-span-1 md:col-span-2 py-4'>
                <p className={"text-sm font-semibold"}>Moje zamówienia</p>

            </div>
            <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <AddressForm 
                    title="Add address"
                    description="Enter your details. You will be able to choose convenient data on every checkout with just one click"
                    submitData={addAddress}
                    city={""}
                    post_code={""}
                    street={""}
                    house={""}
                    flat={""}
                    name={""}
                    surname={""}
                    email={""}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
        </div>
    )
}

export default UserProfile