'use client'

import { motion, AnimatePresence } from "framer-motion";
import {Dispatch, ReactNode, SetStateAction, useState} from "react";
import {VscChevronRight} from "react-icons/vsc";

interface Props {
    expanded?: boolean,
    setExpanded?: Dispatch<SetStateAction<boolean>>,
    children: ReactNode,
    header: ReactNode
}

const ComponentAccordion = ({ expanded, setExpanded, children, header }:Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(expanded || false)

    const changeState = () => {
        if(setExpanded) setExpanded(!isOpen)
        setIsOpen(!isOpen)
    }

    return (
        <motion.div>
            <AnimatePresence>
                <motion.div
                    className="relative flex flex-row items-center justify-between leading-7 text-sm hover:cursor-pointer transition-all z-20"
                    onClick={() => changeState()}
                >
                    <p className="font-semibold text-sm text-gray-700">{header}</p>
                    <motion.div
                        animate={{
                            rotate: isOpen ? 90 : 0
                        }}
                        className="leading-7 text-sm mr-2"
                    >
                        <VscChevronRight></VscChevronRight>
                    </motion.div>
                </motion.div>

                {isOpen && (
                    <motion.div
                        initial={{opacity: 0, height: 0, y: -30}}
                        animate={{
                            opacity: 1,
                            height: "auto",
                            y: 0,
                            transition: {
                                duration: 0.2,
                            },
                        }}
                        exit={{opacity: 0, height: 0, y: -30}}
                        className="my-2"
                    >
                        {children}
                    </motion.div>
                )
                }
            </AnimatePresence>
        </motion.div>
    )
}

export default ComponentAccordion