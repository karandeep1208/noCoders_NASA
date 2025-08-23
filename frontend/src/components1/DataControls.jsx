import React from 'react';
import { Calendar, Play, ClipboardList, RefreshCw } from 'lucide-react';

const DataControls = ({ 
  timeRange, 
  onTimeRangeChange, 
  onGeneratePredictions, 
  onGetRecommendations,
  loading, 
  currentCrops,
  onCropsChange 
}) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-400" />
            Time Range Selection
          </h4>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-slate-300 text-sm w-20">From:</span>
              <input
                type="date"
                value={timeRange.startDate}
                onChange={(e) => onTimeRangeChange({ ...timeRange, startDate: e.target.value })}
                className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm flex-1"
                disabled={loading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-300 text-sm w-20">To:</span>
              <input
                type="date"
                value={timeRange.endDate}
                onChange={(e) => onTimeRangeChange({ ...timeRange, endDate: e.target.value })}
                className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm flex-1"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <ClipboardList className="w-5 h-5 mr-2 text-green-400" />
            Agricultural Settings
          </h4>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-slate-300 text-sm">Current Crops:</span>
              <input
                type="text"
                value={currentCrops.join(', ')}
                onChange={(e) => onCropsChange(e.target.value.split(',').map(crop => crop.trim()))}
                className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm flex-1"
                placeholder="wheat, corn, soy"
                disabled={loading}
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onGeneratePredictions}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all flex items-center space-x-2 disabled:opacity-50 flex-1 justify-center"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>{loading ? 'Processing...' : 'Generate Predictions'}</span>
              </button>
              
              <button
                onClick={onGetRecommendations}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-all flex items-center space-x-2 disabled:opacity-50 flex-1 justify-center"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Get Recommendations</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataControls;