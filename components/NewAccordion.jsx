import { motion, AnimatePresence } from "framer-motion";

const NewAccordion = ({ expanded, setExpanded, children, header }) => {
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