import React from 'react';
import { Calendar, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const PredictionResults = ({ data, loading, sdgData, selectedSDG, onGeneratePredictions }) => {
  const renderMetric = (metric, index) => (
    <div key={index} className="bg-slate-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 text-sm">{metric.label}</span>
        {metric.change && (
          <span className={`text-sm font-medium ${
            metric.change.startsWith('+') ? 'text-red-400' : 'text-green-400'
          }`}>
            {metric.change}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold">{metric.value}</div>
      <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 w-3/4 rounded-full"></div>
      </div>
    </div>
  );

  const renderPredictions = () => {
    if (!data?.data?.predictions) {
      return sdgData.metrics.map(renderMetric);
    }

    return Object.entries(data.data.predictions).map(([key, value]) => (
      <div key={key} className="bg-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">{key}</span>
          {value.change && (
            <span className={`text-sm font-medium ${
              parseFloat(value.change) > 0 ? 'text-red-400' : 'text-green-400'
            }`}>
              {parseFloat(value.change) > 0 ? '+' : ''}{value.change}
            </span>
          )}
        </div>
        <div className="text-2xl font-bold">{value.current} → {value.projected}</div>
        <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
          <span>Trend: {value.trend}</span>
          <span>Confidence: {value.confidence}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div className={`${sdgData.color} rounded-xl p-6 text-white`}>
        <h5 className="text-lg font-semibold mb-2">SDG {selectedSDG}</h5>
        <h6 className="text-2xl font-bold mb-2">{sdgData.title}</h6>
        <p className="text-white/80 text-sm">{sdgData.description}</p>
      </div>

      {renderPredictions()}

      <div className="bg-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h6 className="font-semibold">Recent Updates</h6>
          <Calendar className="w-4 h-4 text-slate-400" />
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm">NASA API connected successfully</p>
              <p className="text-xs text-slate-400">Just now</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm">Climate prediction model updated</p>
              <p className="text-xs text-slate-400">2 hours ago</p>
            </div>
          </div>
          {data && (
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
              <div>
                <p className="text-sm">New predictions generated</p>
                <p className="text-xs text-slate-400">Just now</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;