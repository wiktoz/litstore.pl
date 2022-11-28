import React from "react"
import { motion } from "framer-motion"

const spinTransition = {
  repeatType: Infinity,
  ease: "linear",
  duration: 1
};

export default function Spinner() {
  return (
    <motion.span
    className="mx-auto rounded-full w-5 h-5 block border-2 border-gray-200 border-t-gray-600"
    animate={{ rotate: 360 }}
    transition={spinTransition}
  />
  );
}