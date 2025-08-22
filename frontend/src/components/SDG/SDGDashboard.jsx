import { Globe, RefreshCw, Layers, Settings } from "lucide-react";
import SDGSelector from "./SDGSelector";
import SDGMetrics from "./SDGMetrics";
import RecentUpdates from "./RecentUpdates";

const SDGDashboard = ({ activeSDG, setActiveSDG, selectedRegion, setSelectedRegion }) => {
  const sdgData = {
    '13': {
      title: "Climate Action",
      description: "Monitor temperature anomalies, rainfall patterns, and CO₂ levels",
      metrics: [
        { label: "Global Temperature", value: "+1.2°C", change: "+0.1°C" },
        { label: "CO₂ Levels", value: "421 ppm", change: "+2.3 ppm" },
        { label: "Rainfall Anomaly", value: "-15%", change: "-5%" },
      ],
      color: "bg-gradient-to-br from-red-500 to-orange-500",
    },
    '14': {
      title: "Life Below Water",
      description: "Track ocean temperature, sea-level rise, and marine ecosystem health",
      metrics: [
        { label: "Ocean Temperature", value: "+0.8°C", change: "+0.2°C" },
        { label: "Sea Level Rise", value: "3.4 mm/yr", change: "+0.1 mm/yr" },
        { label: "Chlorophyll-a", value: "0.45 mg/m³", change: "-0.05 mg/m³" },
      ],
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    '15': {
      title: "Life on Land",
      description: "Monitor forest cover, land degradation, and biodiversity hotspots",
      metrics: [
        { label: "Forest Cover Loss", value: "-1.2%", change: "-0.3%" },
        { label: "Land Degradation", value: "24%", change: "+1.1%" },
        { label: "Biodiversity Index", value: "0.72", change: "-0.05" },
      ],
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Sustainable Development Goals Tracking</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Monitor progress across climate action, marine ecosystems, and terrestrial biodiversity 
            using real-time satellite data from NASA, ISRO, and ESA.
          </p>
        </div>

        <SDGSelector sdgData={sdgData} activeSDG={activeSDG} setActiveSDG={setActiveSDG} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl p-6 h-96 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold">Global {sdgData[activeSDG].title} Overview</h4>
                <div className="flex items-center space-x-2">
                  <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm"
                  >
                    <option value="global">Global</option>
                    <option value="north-america">North America</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="africa">Africa</option>
                  </select>
                  <button className="p-2 hover:bg-slate-700 rounded">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded">
                    <Layers className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="absolute inset-6 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-16 h-16 text-slate-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-slate-400">Interactive Earth Visualization</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Powered by NASA Earthdata, ISRO Bhuvan & ESA Copernicus APIs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-6">
            <SDGMetrics sdgData={sdgData} activeSDG={activeSDG} />
            <RecentUpdates />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SDGDashboard;
