import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import useShoppingCart from "../context/ShoppingCart"
import useSWR from 'swr'
import Loader from './Loader'
import MobileNavbar from './MobileNavbar'
import { set } from 'react-hook-form'

const fetcher = url => fetch(url).then(r => r.json())

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cartQty } = useShoppingCart()

  const { data: categories, error } = useSWR('/api/categories/get', fetcher)

  if(error) return error
  if(!categories) return <Loader/>

  return (
    <div className="bg-white">
      

      <MobileNavbar categories={categories} open={open} setOpen={setOpen}/>

      {/* Standard Menu */}
      <header className="relative bg-white">
        <p className="flex h-7 items-center justify-center bg-gray-600 px-4 text-xs font-normal tracking-wide text-white sm:px-6 lg:px-8">
          Free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="mx-auto w-full">
          <div className="border-b border-gray-200 px-2 lg:px-6">
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
              <div className="ml-4 flex lg:ml-0">
                  <span className="sr-only">Logo</span>
                  <Link href="/">
                    <Image
                      className="h-8 w-auto align-bottom"
                      src="/img/litstore.png"
                      width="83px"
                      height="15px"
                      alt=""
                    />
                  </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-gray-600 text-gray-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-20 -mb-px flex items-center border-b-2 pt-px text-sm transition-colors duration-200 ease-out focus:outline-none'
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
                                        <div key={item.name} className="group relative text-base sm:text-sm">
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
                                      <Link href="/products">
                                        <a onClick={() => close()}>
                                          Show everything
                                        </a>
                                      </Link>
                                      </Popover.Button>
                                      {category.sections ? category.sections.map((section) => (
                                        <div key={section.name}>
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
                <div className="text-sm font-normal hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link href="/auth/signin" className="text-gray-700 hover:text-gray-800">
                    Sign in
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link href="/auth/signup" className="text-gray-700 hover:text-gray-800">
                    Create account
                  </Link>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link href="/cart" className="group -m-2 flex items-center p-2">
                    <div className="flex flex-row align-items-center hover:cursor-pointer">
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="h-full mx-2 my-auto text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartQty}</span>
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
