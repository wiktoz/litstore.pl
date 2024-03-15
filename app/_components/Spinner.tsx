import React from "react"
import { motion } from "framer-motion"

export default function Spinner() {
  return (
    <motion.span
    className="rounded-full w-5 h-5 block border border-gray-200 border-t-gray-600"
    animate={{ rotate: 360 }}
    transition={{
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
      duration: 1
    }}
    exit={{ x: -300, opacity: 0 }}
  />
  );
}