'use client'

import {ReactElement, useState} from "react"
import SidebarIcon from "./SidebarIcon"
import Accordion from "./Accordion"
import {AiOutlineMenu} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'

import {
    ReceiptPercentIcon,
    BuildingStorefrontIcon,
    RectangleStackIcon,
    ShoppingCartIcon,
    UsersIcon,
    TruckIcon,
    Squares2X2Icon,
    PlusCircleIcon,
    EyeIcon,
    PencilSquareIcon,
    QuestionMarkCircleIcon,
    Cog8ToothIcon,
    PhoneIcon

} from "@heroicons/react/24/outline"
import Image from "next/image";
import Link from "next/link"

const buttons:Button[] = [
    {
        title: "Products",
        icon: <BuildingStorefrontIcon className="h-5 w-5"/>,
        link: "/admin/products"
    },
    {
        title: "Store",
        icon: <RectangleStackIcon className="h-5 w-5"/>,
        link: "/admin/store"
    },
    {
        title: "Orders",
        icon: <ShoppingCartIcon className="h-5 w-5"/>,
        link: "/admin/orders"
    },
    {
        title: "Users",
        icon: <UsersIcon className="h-5 w-5"/>,
        link: "/admin/users"
    },
    {
        title: "Delivery Methods",
        icon: <TruckIcon className="h-5 w-5"/>,
        link: "/admin/deliveries"
    },
    {
        title: "Promo Codes",
        icon: <ReceiptPercentIcon className="h-5 w-5"/>,
        link: "/admin/promo-codes"
    }
]

interface Button {
    icon: ReactElement,
    title: string,
    link: string
}
interface AccordionType {
    title: string,
    items: Button[]
}

const accordions: AccordionType[] = [
    {
        title: "Products",
        items:  [
            {
                icon: <EyeIcon className="h-5 w-5"/>,
                title: "Show",
                link: "/admin/products"
            },
            {
                icon: <PlusCircleIcon className="h-5 w-5"/>,
                title: "Add",
                link: "/admin/products/add"
            },
            {
                icon: <Squares2X2Icon className="h-5 w-5"/>,
                title: "Variants",
                link: "/admin/products/variants"
            }
        ]
    },
    {
        title: "Categories",
        items:  [
            {
                icon: <EyeIcon className="h-5 w-5"/>,
                title: "Show",
                link: "/admin/categories"
            },
            {
                icon: <PlusCircleIcon className="h-5 w-5"/>,
                title: "Add",
                link: "/admin/categories/add"
            }
        ]
    },
    {
        title: "Settings",
        items:  [
            {
                icon: <Cog8ToothIcon className="h-5 w-5"/>,
                title: "Main Settings",
                link: "/admin/settings/main"
            },
            {
                icon: <PhoneIcon className="h-5 w-5"/>,
                title: "Contact Details",
                link: "/admin/settings/contact"
            },
            {
                icon: <QuestionMarkCircleIcon className="h-5 w-5"/>,
                title: "FAQ",
                link: "/admin/settings/faq"
            }
        ]
    }
]

export default function Sidebar(){
    const [isNavOpen, setIsNavOpen] = useState(false);
    const handleMenu = () =>{
        setIsNavOpen(!isNavOpen)
    }

    return(
        <>
        <div className={`${isNavOpen ? "block" : "hidden"} md:hidden opacity-60 bg-black w-screen h-screen fixed top-0 left-0`}></div>
        <div className={`${isNavOpen ? "hidden" : "block"} z-20 block md:hidden w-full sticky top-0 h-16 bg-gray-800 text-white items-center`}>
            <div className={"flex flex-row items-center justify-between h-full"}>
                <div className={"mx-4"}>
                    <Link href={"/admin"} className={"w-auto"}>
                        <Image
                            src="/img/litstore.png"
                            className="h-5 w-auto align-bottom opacity-80"
                            width="0"
                            height="0"
                            sizes="100vw"
                            alt="logo"
                        />
                    </Link>
                </div>
                <div
                    className="flex flex-row items-center justify-end h-full">
                    <div>
                        <AiOutlineMenu
                            className="font-thin text-2xl hover:cursor-pointer mx-4"
                            onClick={handleMenu}
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className={`${isNavOpen ? "block" : "hidden"} fixed md:block md:sticky scroll overflow-auto top-0 h-screen w-80 bg-gray-800 text-white text-left shadow`}>
            <div className="mx-4 my-2 flex flex-col gap-3 relative">
                <div className="block md:hidden absolute right-0 top-2 hover:cursor-pointer">
                    <AiOutlineClose onClick={handleMenu}></AiOutlineClose>
                </div>
                <div className="text-xl font-bold leading-6 my-4 mx-1">
                    <Link href={"/admin"} className={"w-auto"}>
                        <Image
                            src="/img/litstore.png"
                            className="h-5 w-auto align-bottom opacity-80"
                            width="0"
                            height="0"
                            sizes="100vw"
                            alt="logo"
                        />
                    </Link>
                </div>
                {
                    buttons.map((item, index)=>{
                        return(
                            <SidebarIcon
                                title={item.title}
                                icon={item.icon}
                                link={item.link}
                                key={item.title+index}
                            />
                        )
                    })
                }
                {
                    accordions.map((item, index)=>{
                        return(
                            <Accordion
                                title={item.title}
                                items={item.items}
                                key={item.title+index}
                            />
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}