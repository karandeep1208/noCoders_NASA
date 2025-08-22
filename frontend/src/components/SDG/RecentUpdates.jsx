import { Calendar } from "lucide-react";

const RecentUpdates = () => {
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h6 className="font-semibold">Recent Updates</h6>
        <Calendar className="w-4 h-4 text-slate-400" />
      </div>
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
          <div>
            <p className="text-sm">New Sentinel-2 data available</p>
            <p className="text-xs text-slate-400">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
          <div>
            <p className="text-sm">MODIS ocean color update</p>
            <p className="text-xs text-slate-400">6 hours ago</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
          <div>
            <p className="text-sm">Temperature anomaly detected</p>
            <p className="text-xs text-slate-400">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentUpdates;
