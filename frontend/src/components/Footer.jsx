import { FaGithub, FaTwitter, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f1323] text-gray-300 w-full mt-auto">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About / Description */}
        <div className="space-y-4">
          <h2 className="text-white font-semibold text-lg flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center">🌐</span> <span></span>
            Climate Action Hub
          </h2>
          <p className="text-gray-400 text-sm">
            Empowering sustainable development through NASA satellite data and real-time Earth observation technologies.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-3 mt-2">
            <a href="#" className="p-2 bg-[#1a1f38] rounded-lg hover:bg-blue-800 transition-colors">
              <FaGithub />
            </a>
            <a href="#" className="p-2 bg-[#1a1f38] rounded-lg hover:bg-blue-800 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-[#1a1f38] rounded-lg hover:bg-blue-800 transition-colors">
              <FaGlobe />
            </a>
          </div>
        </div>

        {/* Mission Links */}
        <div className="space-y-2">
          <h3 className="text-white font-semibold text-lg">Mission</h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Home Base</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Control Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">SDG Orbit</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Capabilities</a></li>
          </ul>
        </div>

        {/* Partners Links */}
        <div className="space-y-2">
          <h3 className="text-white font-semibold text-lg">Partners</h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li><a href="https://www.nasa.gov/" target="_blank" className="hover:text-white transition-colors">NASA</a></li>
            <li><a href="https://sdgs.un.org/" target="_blank" className="hover:text-white transition-colors">UN SDGs</a></li>
            <li><a href="https://earthdata.nasa.gov/" target="_blank" className="hover:text-white transition-colors">Earth Data</a></li>
            <li><a href="https://climate.nasa.gov/" target="_blank" className="hover:text-white transition-colors">Climate Change</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-4"></div>

      {/* Copyright */}
      <div className="container mx-auto px-6 py-4 text-center text-gray-500 text-sm">
        © 2024 Climate Action Hub. Powered by NASA Earth Science Data. Built for sustainable development.
      </div>
    </footer>
  );
};

export default Footer;
