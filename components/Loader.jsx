import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const spinTransition = {
  repeatType: Infinity,
  ease: "linear",
  duration: 1
};

export default function Loader() {
  return (
    <AnimatePresence>
    <div className="w-full my-16">
      <motion.span
        className="mx-auto rounded-full w-24 h-24 block border-2 border-gray-200 border-t-gray-600"
        animate={{ rotate: 360 }}
        transition={spinTransition}
        exit={{ x: -300, opacity: 0 }}
      />
    </div>
    </AnimatePresence>
  );
}