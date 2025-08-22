const SDGSelector = ({ sdgData, activeSDG, setActiveSDG }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-slate-800 rounded-lg p-2 inline-flex space-x-2">
        {Object.entries(sdgData).map(([id, data]) => (
          <button
            key={id}
            onClick={() => setActiveSDG(id)}
            className={`px-6 py-3 rounded-md transition-all ${
              activeSDG === id 
                ? "bg-slate-700 text-white shadow-lg" 
                : "hover:bg-slate-700/50 text-slate-400"
            }`}
          >
            SDG {id}: {data.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SDGSelector;
