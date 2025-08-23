import React, { useState } from 'react';
import { useClimateData } from './hooks/useClimateData';
import ClimateVisualization from './ClimateVisualization';
import PredictionResults from './PredictionResults';
import DataControls from './DataControls';
import SDGSelector from './SDGSelector';
import { AlertCircle, RefreshCw, Satellite, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [selectedSDG, setSelectedSDG] = useState('13');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [timeRange, setTimeRange] = useState({
    startDate: '2015-01-01',
    endDate: '2020-12-31'
  });
  const [currentCrops, setCurrentCrops] = useState(['wheat', 'corn']);
  
  const { data, loading, error, fetchPredictions, fetchRecommendations, clearData } = useClimateData();

  // Map SDG to appropriate dataset and parameters
  const sdgConfig = {
    '13': { 
      parameters: 'T2M,PRECTOT', 
      description: 'Temperature and precipitation data for climate action analysis' 
    },
    '14': { 
      parameters: 'ALLSKY_SFC_SW_DWN,PRECTOT', 
      description: 'Solar radiation and precipitation for marine ecosystem monitoring' 
    },
    '15': { 
      parameters: 'T2M,PRECTOT,RH2M', 
      description: 'Temperature, precipitation and humidity for terrestrial ecosystem analysis' 
    }
  };

  const handleSDGChange = (sdgId) => {
    setSelectedSDG(sdgId);
    clearData();
  };

  const handleGeneratePredictions = async () => {
    try {
      await fetchPredictions({
        lat: 40.7128, // Default to New York
        lon: -74.0060,
        ...timeRange,
        futureYears: 10
      });
    } catch (err) {
      console.error('Failed to generate predictions:', err);
    }
  };

  const handleGetRecommendations = async () => {
    try {
      await fetchRecommendations({
        lat: 40.7128,
        lon: -74.0060,
        ...timeRange,
        currentCrops,
        futureYears: 10
      });
    } catch (err) {
      console.error('Failed to get recommendations:', err);
    }
  };

  const sdgData = {
    '13': {
      title: 'Climate Action',
      description: 'Monitor temperature anomalies, rainfall patterns, and CO₂ levels',
      metrics: data?.data?.predictions ? [
        { label: 'Temperature Trend', value: `${data.data.predictions.Temperature?.change || 0}°C` },
        { label: 'Precipitation Trend', value: `${data.data.predictions.Precipitation?.change || 0} mm/day` },
        { label: 'Confidence Level', value: data.data.predictions.Temperature?.confidence || 'N/A' },
      ] : [
        { label: 'Global Temperature', value: '+1.2°C', change: '+0.1°C' },
        { label: 'CO₂ Levels', value: '421 ppm', change: '+2.3 ppm' },
        { label: 'Rainfall Anomaly', value: '-15%', change: '-5%' },
      ],
      color: 'bg-gradient-to-br from-red-500 to-orange-500'
    },
    '14': {
      title: 'Life Below Water',
      description: 'Track ocean temperature, sea-level rise, and marine ecosystem health',
      metrics: [
        { label: 'Ocean Temperature', value: '+0.8°C', change: '+0.2°C' },
        { label: 'Sea Level Rise', value: '3.4 mm/yr', change: '+0.1 mm/yr' },
        { label: 'Chlorophyll-a', value: '0.45 mg/m³', change: '-0.05 mg/m³' },
      ],
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    '15': {
      title: 'Life on Land',
      description: 'Monitor forest cover, land degradation, and biodiversity hotspots',
      metrics: [
        { label: 'Forest Cover Loss', value: '-1.2%', change: '-0.3%' },
        { label: 'Land Degradation', value: '24%', change: '+1.1%' },
        { label: 'Biodiversity Index', value: '0.72', change: '-0.05' },
      ],
      color: 'bg-gradient-to-br from-green-500 to-emerald-500'
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
          <span className="text-red-400">{error}</span>
          <button 
            onClick={clearData}
            className="ml-auto text-red-300 hover:text-white transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Data Controls */}
      <DataControls
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onGeneratePredictions={handleGeneratePredictions}
        onGetRecommendations={handleGetRecommendations}
        loading={loading}
        currentCrops={currentCrops}
        onCropsChange={setCurrentCrops}
      />

      {/* SDG Selector */}
      <SDGSelector
        selectedSDG={selectedSDG}
        onSDGChange={handleSDGChange}
        sdgData={sdgData}
      />

      {/* Active SDG Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map/Visualization Area */}
        <div className="lg:col-span-2">
          <ClimateVisualization
            data={data}
            loading={loading}
            error={error}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            selectedSDG={selectedSDG}
            sdgConfig={sdgConfig[selectedSDG]}
          />
        </div>

        {/* Metrics Panel */}
        <PredictionResults
          data={data}
          loading={loading}
          sdgData={sdgData[selectedSDG]}
          selectedSDG={selectedSDG}
          onGeneratePredictions={handleGeneratePredictions}
        />
      </div>

      {/* API Status Indicator */}
      <div className="mt-12 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Satellite className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-slate-300">API Connection Status:</span>
            <span className="ml-2 text-green-400 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
              Connected
            </span>
          </div>
          <button 
            onClick={handleGeneratePredictions}
            className="flex items-center text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;