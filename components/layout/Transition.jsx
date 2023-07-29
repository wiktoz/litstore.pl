import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import {useState} from "react";

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
    const router = useRouter()
    const asPath = useState(router.asPath)

    return (
            <AnimatePresence
            initial={{opacity: 0}}
            mode='wait'
            >
            <motion.div
            key={asPath}
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