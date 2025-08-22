/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Satellite, Globe } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLaunch = () => navigate("/dashboard");

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 16 }}
      className="
        fixed top-0 left-0 w-full z-50
        bg-black/50 backdrop-blur-lg
        border-b border-emerald-500/20
        shadow-[0_6px_32px_0_rgba(16,185,129,0.09)]
        transition-all
      "
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
          <span className="text-lg font-bold font-orbitron text-blue-600 group-hover:text-blue-300 transition-colors whitespace-nowrap tracking-wider shadow-sm">
            Climate Action Hub
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8 flex-grow justify-center">
          <NavLinkItem label="Mission Home" to="/" active={location.pathname === "/"} />
          <NavLinkItem label="Control Center" to="/dashboard" active={location.pathname === "/dashboard"} />
        </div>

        {/* CTA Button */}
        <button
          onClick={handleLaunch}
          className="flex items-center space-x-2 px-4 py-2 
            bg-gradient-to-r from-blue-500 via-blue-400 to-blue-700
            hover:from-blue-700  hover:via-blue-400 hover:to-blue-500
            text-white font-semibold rounded-xl shadow-xl
            transition-all duration-300 whitespace-nowrap
            backdrop-blur-sm"
        >
          <Globe className="w-4 h-4" />
          <span>Launch Dashboard</span>
        </button>
      </div>
    </motion.nav>
  );
};

function NavLinkItem({ label, to, active }) {
  return (
    <Link
      to={to}
      className={`
        relative px-2 py-1 text-sm font-medium transition-all
        duration-200 cursor-pointer
        ${active
          ? "text-blue-500 font-semibold"
          : "text-white hover:text-blue-300"
        }
      `}
    >
      <span>{label}</span>
      {/* Animated underline */}
      <span
        className={`absolute left-0 -bottom-1 h-0.5 rounded-full transition-all duration-300
          ${active
            ? "w-full bg-blue-400/80 shadow-[0_2px_8px_0_rgba(16,185,129,0.35)]"
            : "w-0 bg-emerald-400/40"
          }
          group-hover:w-full
        `}
      />
    </Link>
  );
}

export default Navbar;
