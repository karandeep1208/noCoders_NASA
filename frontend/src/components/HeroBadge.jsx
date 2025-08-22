/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const HeroBadge = () => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="inline-block bg-nasaBlue/30 px-3 py-1 rounded-full text-sm font-semibold uppercase"
    >
      NASA-Powered Mission Control
    </motion.span>
  );
};

export default HeroBadge;
