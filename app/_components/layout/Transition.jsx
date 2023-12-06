'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {usePathname} from "next/navigation"

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

const Transition = ({ children }) => {
    const pathname = usePathname()

    return (
            <AnimatePresence
            initial={{opacity: 0}}
            mode='wait'
            >
            <motion.div
            key={pathname}
            variants={variants}
            animate="in"
            initial="out"
            exit="out"
            className="w-full"
            >
                {children}
            </motion.div>
            </AnimatePresence>
        );
};

export default Transition;