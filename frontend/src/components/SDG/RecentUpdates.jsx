import { Calendar } from "lucide-react";

const RecentUpdates = () => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h6 className="font-semibold text-lg">Recent Updates</h6>
        <Calendar className="w-5 h-5 text-slate-400" />
      </div>

      {/* Quick stats */}
      <div className="mb-6">
        <p className="text-xs text-slate-400">This week</p>
        <p className="text-xl font-bold text-white">12 updates</p>
      </div>

      {/* Timeline */}
      <div className="relative pl-5 flex-1 overflow-y-auto">
        {/* Vertical line */}
        <div className="absolute left-1 top-0 h-full w-px bg-slate-600"></div>

        {/* Update items */}
        <div className="relative mb-6">
          <div className="w-3 h-3 bg-green-400 rounded-full absolute -left-[7px] top-1"></div>
          <p className="pl-2 text-xs text-green-400">Satellite Data</p>
          <p className="pl-2 text-sm">New Sentinel-2 data available</p>
          <p className="pl-2 text-xs text-slate-400">2 hours ago</p>
        </div>

        <div className="relative mb-6">
          <div className="w-3 h-3 bg-blue-400 rounded-full absolute -left-[7px] top-1"></div>
          <p className="pl-2 text-xs text-blue-400">Ocean Monitoring</p>
          <p className="pl-2 text-sm">MODIS ocean color update</p>
          <p className="pl-2 text-xs text-slate-400">6 hours ago</p>
        </div>

        <div className="relative mb-6">
          <div className="w-3 h-3 bg-orange-400 rounded-full absolute -left-[7px] top-1"></div>
          <p className="pl-2 text-xs text-orange-400">Climate</p>
          <p className="pl-2 text-sm">Temperature anomaly detected</p>
          <p className="pl-2 text-xs text-slate-400">1 day ago</p>
        </div>

        <div className="relative mb-6">
          <div className="w-3 h-3 bg-purple-400 rounded-full absolute -left-[7px] top-1"></div>
          <p className="pl-2 text-xs text-purple-400">Land Use</p>
          <p className="pl-2 text-sm">Deforestation hotspot detected</p>
          <p className="pl-2 text-xs text-slate-400">3 days ago</p>
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-4 flex justify-end">
        <button className="text-xs text-blue-400 hover:underline">
          View all updates →
        </button>
      </div>
    </div>
  );
};

export default RecentUpdates;
