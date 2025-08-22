/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Satellite, Globe } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLaunch = () => navigate("/dashboard");

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-nasaBlue/90 via-indigo-900/80 to-purple-900/80 backdrop-blur-md border-b border-indigo-700"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
          <div className="p-2 rounded-lg bg-nasaBlue group-hover:bg-primary/50 transition-colors shadow-md">
            <Satellite className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-bold font-orbitron text-white group-hover:text-primary transition-colors whitespace-nowrap">
            Climate Action Hub
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 flex-grow justify-center">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/"
                ? "text-primary font-semibold"
                : "text-white hover:text-primary/80"
            } whitespace-nowrap`}
          >
            Mission Home
          </Link>
          <Link
            to="/dashboard"
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/dashboard"
                ? "text-primary font-semibold"
                : "text-white hover:text-primary/80"
            } whitespace-nowrap`}
          >
            Control Center
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleLaunch}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-nasaBlue hover:from-rocketRed hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 whitespace-nowrap"
          >
            <Globe className="w-4 h-4" />
            <span>Launch Dashboard</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
