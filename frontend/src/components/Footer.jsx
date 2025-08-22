import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Logo from "../assets/logoFinal.png";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Left: Logo + Text */}
          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <img src={Logo} alt="TerraForecast Logo" className="w-12 h-12" />
            <div>
              <h1 className="text-lg font-bold">TerraForecast</h1>
              <p className="text-xs text-slate-400">
                Space-Based Environmental Monitoring
              </p>
            </div>
          </div>

          {/* Middle: Navigation Links */}
          <nav className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Dashboard
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Regions
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Contact
            </a>
          </nav>

          {/* Right: Social Media */}
          <div className="flex justify-center md:justify-end space-x-5">
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:info@terraforecast.com" className="hover:text-blue-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} TerraForecast. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
