import {useSession} from 'next-auth/react'
import SignOutButton from '../../components/SignOutButton'
import Link from 'next/link'
import useSWR from 'swr'
import AddressForm from '../../components/form/AddressForm'
import {PlusIcon} from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from 'axios'

const fetcher = url => fetch(url).then(r => r.json())

const UserProfile = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: session, status } = useSession()
    const { data: user, error } = useSWR(session ? "/api/users/" + session.user.id : null, fetcher)

    if(error) return "Error occured"
    if(!user) return "Loading..."

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
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 bg-gray-50 rounded-md p-6 font-medium text-sm">
                <div>
                    <p className="font-bold text-lg mb-2">
                        Hello, {user.email}!
                    </p>
                </div>
                {
                    session && session.user.role === "admin" ? 
                    <div>
                        <Link href="/admin">
                            Admin Panel
                        </Link>
                    </div> 
                    : ""
                }
                <div>
                    <Link href="/user/orders">
                        My Orders
                    </Link>
                </div>
                <div>
                    <SignOutButton/>
                </div>
            </div>
            <div className='grid grid-cols-6 md:grid-cols-12 gap-4'>
                <div onClick={() => setIsOpen(true)} className='h-64 rounded-md col-span-2 text-gray-700 border-2 border-dotted border-gray-500 hover:bg-gray-500 hover:border-solid hover:cursor-pointer hover:text-white'>
                    <div className="flex justify-center items-center h-full">
                        <PlusIcon className="w-8 h-8"/>
                        <p className="text-sm mx-1">Add address</p>
                    </div>
                </div>
                {
                    user && user.addresses && user.addresses.length > 0 ?
                    user.addresses.map((address) => {
                        return(
                        <div key={address._id} className='h-64 rounded-md col-span-2 text-gray-700 border border-gray-500'>
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