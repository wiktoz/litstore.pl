import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {VscChevronRight} from 'react-icons/vsc'
import SidebarIcon from "./SidebarIcon";

const Accordion = ({ title, items }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div>
      <AnimatePresence>
        <motion.div
          className="relative flex flex-row items-center justify-left p-2 bg-gray-800 text-gray-100 leading-7 text-sm hover:cursor-pointer transition-all z-20"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div 
          animate={{
            rotate: isOpen ? 90 : 0
          }}
          className="text-gray-50 leading-7 text-sm mr-1"
          >
            <VscChevronRight></VscChevronRight>
          </motion.div>
          {title}
        </motion.div>

        {isOpen && (
            items.map((item,index)=>{
                return(
                    <motion.div
                        key={item.title+index}
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
                        className="text-white my-2"
                    >
                        <SidebarIcon
                            icon={item.icon}
                            title={item.title}
                            link={item.link}
                        />
                    </motion.div>
                )
            })
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Accordion;