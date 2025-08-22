import { Globe, BarChart3, MapPin } from "lucide-react";
import Logo from "../assets/logoFinal.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between h-16 px-6 md:px-10
                      bg-black/40 backdrop-blur-xl rounded-2xl shadow-md transition-all duration-300">
        <div className="flex items-center space-x-3 rounded-2xl px-3 py-1">
          <img src={Logo} alt="TerraForecast Logo" className="w-12 h-12 rounded-xl" />
          <div>
            <h1 className="text-xl font-bold">TerraForecast</h1>
            <p className="text-xs text-slate-400">Space-Based Environmental Monitoring</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6 rounded-xl px-2 py-1">
          <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors font-medium">
            <Globe className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors font-medium">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors font-medium">
            <MapPin className="w-4 h-4" />
            <span>Regions</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-semibold">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
