'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {usePathname} from "next/navigation"
import {ReactNode} from "react";

const variants = {
    out: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    in: {
        opacity: 1,
        transition: {
          duration: 0.6,
        }
      }
  };

const Transition = ({ children }: {children:ReactNode}) => {
    const pathname = usePathname()

    return (
            <AnimatePresence>
                <motion.div
                key={pathname}
                variants={variants}
                animate="in"
                exit="out"
                className="w-full"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        );
};

export default Transition;