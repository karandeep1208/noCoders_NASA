import { Thermometer, Waves, TreePine } from "lucide-react";

const QuickStats = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-12">
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
  );
};

export default QuickStats;
