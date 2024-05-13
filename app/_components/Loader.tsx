'use client'

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  return (
      <div className={"flex items-center align-middle w-full m-2"}>
    <AnimatePresence>
    <div className="w-full m-2">
      <motion.span
        className="mx-auto rounded-full w-16 h-16 block border-2 border-gray-200 border-t-gray-600"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 2
        }}
        exit={{ x: -300, opacity: 0 }}
      />
    </div>
    </AnimatePresence>
      </div>
  );
}