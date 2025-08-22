import { Play, Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/earth.mp4"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Optional: Semi-transparent overlay for readability */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          Monitoring Earth's Future
        </h2>
        <p className="text-xl text-slate-200 max-w-3xl mb-8 text-center">
          Leverage space agency APIs to track human development impact on environment through 
          SDGs 13, 14, and 15. Real-time satellite data for climate action and sustainability.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg transition-all transform hover:scale-105 flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Start Monitoring</span>
          </button>
          <button className="border border-slate-600 hover:border-slate-500 px-8 py-3 rounded-lg transition-all hover:bg-slate-800 flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download Data</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
