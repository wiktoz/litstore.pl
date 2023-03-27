import { useSession } from "next-auth/react"
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import useShoppingCart from "../context/ShoppingCart"
import useSWR from 'swr'
import Loader from './Loader'
import MobileNavbar from './MobileNavbar'
import SignOutButton from "./SignOutButton"

const fetcher = url => fetch(url).then(r => r.json())

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cartQty } = useShoppingCart()
  const { data: session, status } = useSession()

  const { data: categories, error } = useSWR('/api/categories', fetcher)

  if(error) return error
  if(!categories) return <Loader/>

  return (
    <div className="bg-white">
      

      <MobileNavbar categories={categories} open={open} setOpen={setOpen}/>

      {/* Standard Menu */}
      <header className="relative bg-white">
        <p className="flex items-center justify-center bg-gray-700 px-4 py-3 text-xs font-normal tracking-wider text-white sm:px-6 lg:px-8">
          Free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="mx-auto w-full">
          <div className="border-b border-gray-200 p-2 lg:px-8">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <Link href="/">
              <div className="ml-4 flex lg:ml-0 hover:cursor-pointer">
                  <span className="sr-only">Logo</span>
                    <Image
                      src="/img/litstore.png"
                      className="h-4 w-auto align-bottom"
                      width="0"
                      height="0"
                      sizes="100vw"
                      alt="logo"
                    />
              </div>
              </Link>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {categories.map((category) => (
                    <Popover key={category.slug} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-gray-600 text-gray-600'
                                  : 'border-transparent text-gray-600 hover:text-gray-800 tracking-wide',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm transition-colors duration-200 ease-out focus:outline-none'
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
                            <Popover.Panel className="z-20 absolute inset-x-0 top-full text-sm text-gray-500">
                            {({ close }) => (
                              <>
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured ? category.featured.map((item) => (
                                        <div key={item.slug} className="group relative text-base sm:text-sm">
                                          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-20" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      )) : ""}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                    <Popover.Button>
                                      <Link href={"/" + category.slug} onClick={() => close()}>
                                          Show Everything
                                      </Link>
                                      </Popover.Button>
                                      {category.sections ? category.sections.map((section) => (
                                        <div key={section.slug}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )) : ""}
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

                  {navigation.pages ? navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  )) : ""}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="text-sm font-normal hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 text-gray-500">
                  { status === "authenticated" ?
                    <SignOutButton/>
                    :
                    <>
                      <Link href="/auth/signin">
                        <p className='hover:text-gray-800 hover:cursor-pointer'>
                          Sign In
                        </p>
                      </Link>
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                      <Link href="/auth/signup">
                        <p className='hover:text-gray-800 hover:cursor-pointer'>
                          Create account
                        </p>
                      </Link>
                    </>
                  }
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                </div>

                {/* Search */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link href="/search" className="flex items-center p-2">
                    <div className='flex flex-row align-items-center hover:cursor-pointer text-gray-400 hover:text-gray-600'>
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0"
                        aria-hidden="true" />
                    </div>
                  </Link>
                </div>

                {/* User Account */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link href={status === "authenticated" ? "/user/profile" : "/auth/signin" } className="flex items-center p-2">
                    <div className='flex flex-row align-items-center hover:cursor-pointer text-gray-400 hover:text-gray-600'>
                      <span className="sr-only">Profile</span>
                      <UserIcon className="h-5 w-5 flex-shrink-0"
                        aria-hidden="true" />
                    </div>
                  </Link>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link href="/cart" className="flex items-center p-2">
                    <div className="flex flex-row align-items-center hover:cursor-pointer text-gray-400 hover:text-gray-600">
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
