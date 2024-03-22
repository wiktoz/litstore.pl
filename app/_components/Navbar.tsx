'use client'

import {useSession} from "next-auth/react"
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useShoppingCart } from "@/context/ShoppingCart"
import useSWR from 'swr'
import MobileNavbar from '@/components/MobileNavbar'
import SignOutButton from "@/components/SignOutButton"
import Spinner from "@/components/Spinner"
import { fetcher } from "@/utils/helpers"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const {cartQty} = useShoppingCart() as ShoppingCartContextType
  const { data: session, status } = useSession()

  const { data: categories, error: error, isLoading: isCategoryLoading } = useSWR<CategoryInterface[]>('/api/categories', fetcher)

  return (
    <div className={"bg-black text-gray-200 " + (open ? "bg-opacity-60" : "bg-opacity-30")}>
      <MobileNavbar categories={categories ? categories : []} open={open} setOpen={setOpen}/>

      {/* Standard Menu */}
      <header className="relative">

        <nav aria-label="Top" className="mx-auto w-full">
          <div className="p-2 lg:px-8">
            <div className="flex h-12 items-center">
              <button
                type="button"
                className="rounded-md p-2 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <Link href="/">
              <div className="mx-4 flex lg:ml-0 hover:cursor-pointer">
                  <span className="sr-only">Logo</span>
                    <Image
                      src="/img/litstore.png"
                      className="h-5 w-auto align-bottom opacity-80"
                      width="0"
                      height="0"
                      sizes="100vw"
                      alt="logo"
                    />
              </div>
              </Link>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8 items-center">
                  {
                    isCategoryLoading ?
                        <Spinner/> :
                    categories && categories.length > 0 &&
                    categories.map((category: CategoryInterface) => (
                    <Popover key={category.slug} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={"tracking-wide py-1 " + classNames(
                                open
                                  ? 'border-gray-300'
                                  : 'border-transparent hover:text-gray-400 ',
                                'relative z-10 flex items-center border-b text-sm transition-colors duration-200 ease-out focus:outline-none'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="z-20 absolute inset-x-0 top-full text-sm bg-black bg-opacity-60">
                            {({ close }) => (
                              <>
                              <div className="absolute inset-0 top-1/2 shadow" aria-hidden="true" />
                              <div className="relative">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                    <Popover.Button>
                                      <Link href={"/" + category.slug} onClick={() => close()}>
                                          Show Everything
                                      </Link>
                                      </Popover.Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              </>
                            )}
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="text-sm font-normal hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  { status === "authenticated" ?
                    <SignOutButton/>
                    :
                    <>
                      <Link href={"/auth/signin"}>
                        <p className='hover:text-gray-400 hover:cursor-pointer'>
                          Sign In
                        </p>
                      </Link>
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                      <Link href={"/auth/signup"}>
                        <p className='hover:text-gray-400 hover:cursor-pointer'>
                          Create account
                        </p>
                      </Link>
                    </>
                  }
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                </div>

                {/* Search */}
                <div className="ml-2 flow-root lg:ml-4">
                  <Link href={"/search"} className="flex items-center p-2">
                    <div className='flex flex-row align-items-center hover:cursor-pointer hover:text-gray-400'>
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0"
                        aria-hidden="true" />
                    </div>
                  </Link>
                </div>

                {/* User Account */}
                <div className="ml-2 flow-root lg:ml-4">
                  <Link href={status === "authenticated" ? "/user/profile" : "/auth/signin" } className="flex items-center p-2">
                    <div className='flex flex-row align-items-center hover:cursor-pointer hover:text-gray-400'>
                      <span className="sr-only">Profile</span>
                      <UserIcon className="h-5 w-5 flex-shrink-0"
                        aria-hidden="true" />
                    </div>
                  </Link>
                </div>

                {/* Cart */}
                <div className="ml-2 flow-root lg:ml-4">
                  <Link href={"/cart"} className="flex items-center p-2">
                    <div className="flex flex-row align-items-center hover:cursor-pointer hover:text-gray-400">
                      <ShoppingBagIcon
                        className="h-5 w-5 flex-shrink-0 "
                        aria-hidden="true"
                      />
                      <span className="mx-1 h-full my-auto text-sm font-medium">{cartQty}</span>
                      <span className="sr-only">items in cart, view bag</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
