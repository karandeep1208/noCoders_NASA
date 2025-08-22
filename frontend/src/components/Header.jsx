import Logo from "../assets/logoFinal.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between h-16 px-6 md:px-10
                      bg-black/40 backdrop-blur-xl shadow-md transition-all duration-300">
        <div className="flex items-center space-x-3 px-3 py-1">
          <img src={Logo} alt="TerraForecast Logo" className="w-12 h-12" />
          <div>
            <h1 className="text-xl font-bold">TerraForecast</h1>
            <p className="text-xs text-slate-400">Space-Based Environmental Monitoring</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6 px-2 py-1">
          <button className="hover:text-blue-400 transition-colors font-medium">
            Dashboard
          </button>
          <button className="hover:text-blue-400 transition-colors font-medium">
            Analytics
          </button>
          <button className="hover:text-blue-400 transition-colors font-medium">
            Regions
          </button>
          <button className="bg-blue-800 hover:bg-blue-700 px-4 py-2 font-semibold rounded-md">
  Get Started
</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
