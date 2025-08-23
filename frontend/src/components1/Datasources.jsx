import React from 'react';
import { Satellite, Globe, Waves, TrendingUp } from 'lucide-react';

const DataSources = () => {
  return (
    <section className="py-16 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Trusted Data Sources</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our platform integrates with leading space agencies to provide accurate,
            real-time environmental monitoring data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Satellite className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold mb-2">NASA EarthData API</h4>
            <p className="text-slate-400 mb-4">
              Temperature, rainfall, greenhouse gas levels, and climate prediction data
              for comprehensive environmental monitoring.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 text-sm font-medium">Connected</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold mb-2">ISRO Bhuvan</h4>
            <p className="text-slate-400 mb-4">
              India-specific land use maps, forest monitoring, and urbanization tracking.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 text-sm font-medium">Connected</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Waves className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold mb-2">ESA Copernicus</h4>
            <p className="text-slate-400 mb-4">
              Sentinel satellite data for deforestation, land degradation, and marine health.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 text-sm font-medium">Connected</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataSources;