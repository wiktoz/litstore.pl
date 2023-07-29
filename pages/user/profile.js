import {useSession} from 'next-auth/react'
import SignOutButton from '../../components/SignOutButton'
import Link from 'next/link'
import useSWR from 'swr'
import AddressForm from '../../components/form/AddressForm'
import {PlusIcon} from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from 'axios'
import Loader from '../../components/Loader'

const fetcher = url => fetch(url).then(r => r.json())

const UserProfile = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: session, status } = useSession()
    const { data: user, errorUser } = useSWR(session ? "/api/users/" + session.user.id : null, fetcher)
    const { data: orders, errorOrders } = useSWR(session ? "/api/orders/user/" + session.user.id : null, fetcher)

    if(errorUser || errorOrders) return <Loader/>
    if(!user || !orders) return <Loader/>

    const addAddress = async (data) => {
        const endpoint = '/api/users/edit/'+session.user.id+'/addAddress'

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
            <div className="flex flex-col gap-6 bg-gray-50 rounded-md p-6 font-medium text-sm col-span-2 md:col-span-1">
                <div>
                    <p className="font-bold text-lg mb-2">
                        Moje konto
                    </p>
                </div>
                {
                    session && session.user.role === "admin" ? 
                    <div>
                        <Link href="/admin">
                            Panel administratora
                        </Link>
                    </div> 
                    : ""
                }
                <div>
                    <p className="mb-2">Moje zakupy</p>
                    <Link href="/user/orders">
                        <p className="text-sm font-light">Zamówienia</p>
                    </Link>
                </div>
                <div>
                    <p className="mb-1">Ustawienia</p>
                    <Link href="/user/orders">
                        <p className="text-sm font-light">Dane</p>
                    </Link>
                    <Link href="/user/orders">
                        <p className="text-sm font-light">Adresy do wysyłki</p>
                    </Link>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-1 gap-4 col-span-2'>
                <p>Moje zamówienia</p>
                {orders?.map((order) => {
                    return(
                        order.items.map((item) => {
                            return(
                                <div key={item._id}>
                                    <img
                                        className="w-16"
                                        src={"/img/products/" + item.main_photo}
                                        alt={item.name}
                                    />
                                        <p key={item._id}>{item.name}</p>
                                </div>

                            )
                        })

                    )
                })}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-1 gap-4 col-span-2'>
                <div onClick={() => setIsOpen(true)} className='rounded-md col-span-2 py-4 text-gray-700 border-2 border-dotted border-gray-500 hover:bg-gray-500 hover:border-solid hover:cursor-pointer hover:text-white'>
                    <div className="flex justify-center items-center h-full">
                        <PlusIcon className="w-4 h-4"/>
                        <p className="text-sm mx-1">Add address</p>
                    </div>
                </div>
                {
                    user && user.addresses && user.addresses.length > 0 ?
                    user.addresses.map((address) => {
                        return(
                        <div key={address._id} className='py-2 rounded-md col-span-2 text-gray-700 border border-gray-500'>
                            <div className="flex flex-col justify-center h-full p-2">
                                <p className="text-sm font-bold mx-1 mb-2">{address.name} {address.surname}</p>
                                <p className="text-sm mx-1">{address.street}</p>
                                <p className="text-sm mx-1">{address.postcode} {address.city}</p>
                            </div>
                        </div>
                        )
                    })
                    : ""
                }
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