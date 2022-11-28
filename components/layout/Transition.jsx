import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
    out: {
      opacity: 0,
      transition: {
        duration: 0
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
    const { asPath } = useRouter()
    return (
            <AnimatePresence
            initial={{opacity:0}}
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