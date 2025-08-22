import { motion } from "framer-motion";

const HeroDescription = () => (
  <motion.p
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="text-lg md:text-xl text-foreground/80"
  >
    Explore the connection between Climate (SDG 13), Ocean Life (SDG 14), Life on Land (SDG 15), and Zero Hunger (SDG 2) through real-time NASA satellite data and Earth observations.
  </motion.p>
);

export default HeroDescription;
