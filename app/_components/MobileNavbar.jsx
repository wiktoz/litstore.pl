import { Fragment } from 'react'
import { Dialog, Tab, Transition } from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import Link from 'next/link'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const MobileNavbar = ({categories,open,setOpen}) => {
    return(
      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8 px-4">
                    {categories && categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected ? 'text-gray-600 border-gray-600' : 'text-gray-900 border-transparent',
                            'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base'
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels>
                  {categories && categories.map((category) => (
                    <Tab.Panel key={category.name} className="w-full space-y-10 px-4 pt-4 pb-4 font-semibold">
                      <div className="grid grid-cols-2 gap-x-4 w-full">
                        <Link href={"/"+category.slug} onClick={() => setOpen(false)}>Show All</Link>
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                <div className="flow-root">
                  <Link href="/auth/signin" onClick={() => setOpen(false)} className="-m-2 block p-2 text-gray-900">
                    Sign in
                  </Link>
                </div>
                <div className="flow-root">
                  <Link href="/auth/signup" onClick={() => setOpen(false)} className="-m-2 block p-2 text-gray-900">
                    Create account
                  </Link>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
    )
}

export default MobileNavbar