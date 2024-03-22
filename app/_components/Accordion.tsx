import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {VscChevronRight} from 'react-icons/vsc'

interface Props {
  title: string,
  description: string
}

const Accordion = ({ title, description }:Props) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div>
      <AnimatePresence>
        <motion.div
            className="relative flex flex-row items-center justify-between leading-7 text-sm hover:cursor-pointer transition-all z-20"
            onClick={() => setIsOpen(!isOpen)}
        >
          <p className="font-semibold">{title}</p>
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
                        key={title}
                        initial={{ opacity: 0, height:0, y:-30 }}
                        animate={{
                        opacity: 1,
                        height:"auto",
                        y:0,
                        transition: {
                            duration: 0.2,
                        },
                        }}
                        exit={{ opacity: 0, height:0, y:-30}}
                        className="my-2"
                    >
                        <p className="text-xs leading-5 border-t p-2" dangerouslySetInnerHTML={{ __html: description}}></p>
                    </motion.div>
                )
        }
      </AnimatePresence>
    </motion.div>
  );
};

export default Accordion;