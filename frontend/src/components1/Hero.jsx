import React from 'react';
import { Thermometer, Waves, TreePine, Play, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-slate-800/20 opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Monitoring Earth's Future
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <Thermometer className="w-8 h-8 text-red-400" />
              <span className="text-red-400 text-sm font-medium">+2.1%</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">418.5 ppm</h3>
            <p className="text-slate-400">Global CO₂ Levels</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <Waves className="w-8 h-8 text-blue-400" />
              <span className="text-green-400 text-sm font-medium">+0.3mm/yr</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">3.4 mm/yr</h3>
            <p className="text-slate-400">Sea Level Rise</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <TreePine className="w-8 h-8 text-green-400" />
              <span className="text-red-400 text-sm font-medium">-1.2%</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">68.7%</h3>
            <p className="text-slate-400">Global Forest Cover</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;