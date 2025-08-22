/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const HeroTitle = () => {
  return (
    <motion.h1
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-5xl md:text-6xl font-bold font-orbitron"
    >
      Climate Action Hub
    </motion.h1>
  );
};

export default HeroTitle;
