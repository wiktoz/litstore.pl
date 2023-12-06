import { useState } from "react"
import SidebarIcon from "./SidebarIcon"
import Accordion from "./Accordion"
import {BsCartCheck} from 'react-icons/bs'
import {BiStore} from 'react-icons/bi'
import {FaQuestion} from 'react-icons/fa'
import {MdSettingsSuggest} from 'react-icons/md'
import {AiFillEdit} from 'react-icons/ai'
import {MdAddCircleOutline} from 'react-icons/md'
import {BiShowAlt} from 'react-icons/bi'
import {MdContactPhone} from 'react-icons/md'
import {CgSize} from 'react-icons/cg'
import {TbTruckDelivery, TbDiscount2} from 'react-icons/tb'
import {AiOutlineMenu} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import {FiUsers} from 'react-icons/fi'
import {FaWarehouse} from 'react-icons/fa'

const buttons = [
    {
        title: "Products",
        icon: <BiStore></BiStore>,
        link: "/admin/products/show"
    },
    {
        title: "Store",
        icon: <FaWarehouse/>,
        link: "/admin/store"
    },
    {
        title: "Orders",
        icon: <BsCartCheck></BsCartCheck>,
        link: "/admin/orders/show"
    },
    {
        title: "Users",
        icon: <FiUsers></FiUsers>,
        link: "/admin/users/show"
    },
    {
        title: "Delivery Methods",
        icon: <TbTruckDelivery></TbTruckDelivery>,
        link: "/admin/deliveries/show"
    },
    {
        title: "Promo Codes",
        icon: <TbDiscount2></TbDiscount2>,
        link: "/admin/promo-codes/show"
    }
]

const accordions = [
    {
        title: "Products",
        items:  [
            {
                icon: <BiShowAlt></BiShowAlt>,
                title: "Show",
                link: "/admin/products/show"
            },
            {
                icon: <MdAddCircleOutline></MdAddCircleOutline>,
                title: "Add",
                link: "/admin/products/add"
            },
            {
                icon: <AiFillEdit></AiFillEdit>,
                title: "Edit",
                link: "/admin/products/edit"
            },
            {
                icon: <CgSize></CgSize>,
                title: "Variants",
                link: "/admin/products/variants/show"
            }
        ]
    },
    {
        title: "Categories",
        items:  [
            {
                icon: <BiShowAlt></BiShowAlt>,
                title: "Show",
                link: "/admin/categories/show"
            },
            {
                icon: <MdAddCircleOutline></MdAddCircleOutline>,
                title: "Add",
                link: "/admin/categories/add"
            },
            {
                icon: <AiFillEdit></AiFillEdit>,
                title: "Edit",
                link: "/admin/categories/edit"
            }
        ]
    },
    {
        title: "Settings",
        items:  [
            {
                icon: <MdSettingsSuggest></MdSettingsSuggest>,
                title: "Main Settings",
                link: "/admin/settings/main"
            },
            {
                icon: <MdContactPhone></MdContactPhone>,
                title: "Contact Details",
                link: "/admin/settings/contact"
            },
            {
                icon: <FaQuestion></FaQuestion>,
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

        <div className={`${isNavOpen ? "block" : "hidden"} fixed md:block md:sticky scroll overflow-auto top-0 h-screen w-80 bg-gray-800 text-white text-left shadow`}>
            <div className="mx-4 my-2 flex flex-col gap-3 relative">
                <div className="block md:hidden absolute right-0 top-2 hover:cursor-pointer">
                    <AiOutlineClose onClick={handleMenu}></AiOutlineClose>
                </div>
                <div className="text-2xl font-medium leading-6 my-4">
                    <h1>Dashboard</h1>
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