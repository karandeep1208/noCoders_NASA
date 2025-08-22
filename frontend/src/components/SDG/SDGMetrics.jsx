const SDGMetrics = ({ sdgData, activeSDG }) => {
  return (
    <div className="space-y-6">
      <div className={`${sdgData[activeSDG].color} rounded-xl p-6 text-white`}>
        <h5 className="text-lg font-semibold mb-2">SDG {activeSDG}</h5>
        <h6 className="text-2xl font-bold mb-2">{sdgData[activeSDG].title}</h6>
        <p className="text-white/80 text-sm">{sdgData[activeSDG].description}</p>
      </div>

      {sdgData[activeSDG].metrics.map((metric, index) => (
        <div key={index} className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">{metric.label}</span>
            <span
              className={`text-sm font-medium ${
                metric.change.startsWith("+") ? "text-red-400" : "text-green-400"
              }`}
            >
              {metric.change}
            </span>
          </div>
          <div className="text-2xl font-bold">{metric.value}</div>
          <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 w-3/4 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SDGMetrics;
