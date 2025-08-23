import React from 'react';
import { Globe, RefreshCw, Layers, Settings, AlertCircle, BarChart3, MapPin } from 'lucide-react';

const ClimateVisualization = ({ 
  data, 
  loading, 
  error, 
  selectedRegion, 
  onRegionChange,
  selectedSDG,
  sdgConfig 
}) => {
  const renderVisualizationContent = () => {
    if (error) {
      return (
        <div className="absolute inset-6 bg-slate-700 rounded-lg flex items-center justify-center">
          <div className="text-center text-red-400">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            <p>Error loading data</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="absolute inset-6 bg-slate-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-spin" />
            <p className="text-slate-400">Loading climate data...</p>
            <p className="text-sm text-slate-500 mt-2">Analyzing {sdgConfig.parameters}</p>
          </div>
        </div>
      );
    }

    if (data) {
      return (
        <div className="absolute inset-6 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg p-4">
          <div className="h-full flex flex-col">
            <h5 className="text-lg font-semibold mb-4">Climate Analysis Results</h5>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="bg-slate-600/50 rounded p-4">
                <h6 className="text-sm font-semibold mb-2 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Historical Trends
                </h6>
                {/* Historical data visualization would go here */}
                <div className="text-xs text-slate-400 mt-4">
                  Analyzing: {sdgConfig.parameters}
                </div>
              </div>
              <div className="bg-slate-600/50 rounded p-4">
                <h6 className="text-sm font-semibold mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Future Projections
                </h6>
                {/* Prediction visualization would go here */}
                {data.data?.predictions && (
                  <div className="text-xs text-green-400 mt-4">
                    Predictions generated successfully
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="absolute inset-6 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400">Select parameters and generate predictions</p>
          <p className="text-sm text-slate-500 mt-2">
            Analyzing: {sdgConfig.parameters}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {sdgConfig.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 h-96 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-semibold">SDG {selectedSDG} Climate Analysis</h4>
        <div className="flex items-center space-x-2">
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm"
            disabled={loading}
          >
            <option value="global">Global</option>
            <option value="north-america">North America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="africa">Africa</option>
          </select>
          <button className="p-2 hover:bg-slate-700 rounded" disabled={loading}>
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded" disabled={loading}>
            <Layers className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded" disabled={loading}>
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {renderVisualizationContent()}
    </div>
  );
};

export default ClimateVisualization;