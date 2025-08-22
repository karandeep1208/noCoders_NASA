/* eslint-disable no-unused-vars */
// src/components/HeroCTA.jsx
import { motion } from "framer-motion";

const HeroCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4"
    >
      <button
        onClick={() => console.log("Navigate to Dashboard")}
        className="flex items-center space-x-2 px-6 py-3 bg-nasaBlue hover:bg-rocketRed rounded-lg font-semibold text-white shadow-lg transition-all duration-300"
      >
        <span>Explore Dashboard</span>
        <span>→</span>
      </button>

      <button
        onClick={() => console.log("View Mission Brief")}
        className="px-6 py-3 bg-card/80 hover:bg-card/95 rounded-lg font-semibold text-white shadow-lg transition-all duration-300"
      >
        View Mission Brief
      </button>
    </motion.div>
  );
};

export default HeroCTA;
