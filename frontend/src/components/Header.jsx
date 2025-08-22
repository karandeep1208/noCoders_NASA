import { Globe, BarChart3, MapPin } from "lucide-react";
import Logo from "../assets/logoFinal.png";

const Header = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className=" mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="TerraForecast Logo" className="w-12 h-12" />
            <div>
              <h1 className="text-xl font-bold">TerraForecast</h1>
              <p className="text-xs text-slate-400">Space-Based Environmental Monitoring</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <Globe className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Regions</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
