import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  show: boolean;
}

const Collapse: React.FC<Props> = ({ show, children }) => (
  <AnimatePresence>
    {show && (
      <motion.section
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.section>
    )}
  </AnimatePresence>
);

export default Collapse;
