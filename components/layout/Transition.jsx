import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
    out: {
      opacity: 0,
      y: 40,
      transition: {
        duration: 0.5
      }
    },
    in: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.3
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