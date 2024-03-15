import { motion, AnimatePresence } from "framer-motion";
import {Dispatch, ReactNode, SetStateAction} from "react";

interface Props {
    expanded: boolean,
    setExpanded: Dispatch<SetStateAction<boolean>>,
    children: ReactNode,
    header: ReactNode
}

const NewAccordion = ({ expanded, setExpanded, children, header }:Props) => {
    return (
        <>
            <motion.header
                initial={false}
                onClick={() => setExpanded(!expanded)}
            >
                {header}
            </motion.header>
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                    >
                        {children}
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    )
}

export default NewAccordion