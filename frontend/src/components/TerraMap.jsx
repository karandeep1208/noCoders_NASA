import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents  } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const FitBounds = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [points, map]);

  return null;
};

const HeatmapLayer = ({ points, radius, blur, maxZoom }) => {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    const heatPoints = points.map(p => [p.lat, p.lng, p.temperature / 40]);

    const heat = L.heatLayer(heatPoints, {
      radius: radius,
      blur: blur,
      maxZoom: maxZoom,
      gradient: {
        0.2: 'blue',
        0.4: 'cyan',
        0.6: 'lime',
        0.8: 'yellow',
        1.0: 'red'
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [points, map, radius, blur, maxZoom]);

  return null;
};

const TerraMap = () => {
  const [radius, setRadius] = useState(30);
  const [blur, setBlur] = useState(25);
  const [maxZoom, setMaxZoom] = useState(17);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);

  // More comprehensive hardcoded data
  const data = [
    { name: "Bengaluru", lat: 12.972, lng: 77.595, temperature: 35, rainfall: 5 },
    { name: "Delhi", lat: 28.6139, lng: 77.2090, temperature: 42, rainfall: 2 },
    { name: "Mumbai", lat: 19.0760, lng: 72.8777, temperature: 32, rainfall: 15 },
    { name: "Chennai", lat: 13.0827, lng: 80.2707, temperature: 38, rainfall: 4 },
    { name: "Kolkata", lat: 22.5726, lng: 88.3639, temperature: 36, rainfall: 8 },
    { name: "Hyderabad", lat: 17.3850, lng: 78.4867, temperature: 39, rainfall: 3 },
    { name: "Jaipur", lat: 26.9124, lng: 75.7873, temperature: 41, rainfall: 1 },
    { name: "Lucknow", lat: 26.8467, lng: 80.9462, temperature: 40, rainfall: 2 },
    { name: "Bhopal", lat: 23.2599, lng: 77.4126, temperature: 37, rainfall: 5 },
    { name: "Chandigarh", lat: 30.7333, lng: 76.7794, temperature: 36, rainfall: 4 },
    { name: "Dehradun", lat: 30.3165, lng: 78.0322, temperature: 32, rainfall: 7 },
    { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, temperature: 43, rainfall: 1 },
    { name: "Pune", lat: 18.5204, lng: 73.8567, temperature: 34, rainfall: 10 },
    { name: "Bhubaneswar", lat: 20.2961, lng: 85.8245, temperature: 36, rainfall: 12 },
    { name: "Thiruvananthapuram", lat: 8.5241, lng: 76.9366, temperature: 31, rainfall: 18 }
  ];

  // Calculate average temperature
  const avgTemp = data.reduce((sum, city) => sum + city.temperature, 0) / data.length;

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-slate-800 text-white">
        <h1 className="text-2xl font-bold">Heatwave Map Visualization</h1>
        <p className="text-slate-300">Monitoring temperature patterns across India</p>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-slate-800 p-4 text-white flex flex-col gap-6 overflow-y-auto">
          <div>
            <h2 className="text-lg font-semibold mb-4">Heatmap Controls</h2>
            
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={showHeatmap}
                    onChange={() => setShowHeatmap(!showHeatmap)}
                  />
                  <div className={`block w-14 h-7 rounded-full ${showHeatmap ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition transform ${showHeatmap ? 'translate-x-7' : ''}`}></div>
                </div>
                <div className="ml-3 text-sm font-medium">Show Heatmap</div>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={showMarkers}
                    onChange={() => setShowMarkers(!showMarkers)}
                  />
                  <div className={`block w-14 h-7 rounded-full ${showMarkers ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition transform ${showMarkers ? 'translate-x-7' : ''}`}></div>
                </div>
                <div className="ml-3 text-sm font-medium">Show Markers</div>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Radius: {radius}</label>
              <input 
                type="range" 
                min="10" 
                max="50" 
                value={radius} 
                onChange={(e) => setRadius(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Blur: {blur}</label>
              <input 
                type="range" 
                min="5" 
                max="40" 
                value={blur} 
                onChange={(e) => setBlur(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Max Zoom: {maxZoom}</label>
              <input 
                type="range" 
                min="10" 
                max="20" 
                value={maxZoom} 
                onChange={(e) => setMaxZoom(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Statistics</h2>
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Average Temperature:</span>
                <span className="font-semibold">{avgTemp.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Highest Temperature:</span>
                <span className="font-semibold text-red-400">
                  {Math.max(...data.map(city => city.temperature))}°C
                </span>
              </div>
              <div className="flex justify-between">
                <span>Lowest Temperature:</span>
                <span className="font-semibold text-blue-400">
                  {Math.min(...data.map(city => city.temperature))}°C
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Temperature Legend</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
                <span className="ml-2 text-sm">20-25°C</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-cyan-500 rounded-sm"></div>
                <span className="ml-2 text-sm">25-30°C</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-lime-500 rounded-sm"></div>
                <span className="ml-2 text-sm">30-35°C</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-500 rounded-sm"></div>
                <span className="ml-2 text-sm">35-40°C</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-red-500 rounded-sm"></div>
                <span className="ml-2 text-sm">40+°C</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer
            center={[22, 80]} // initial center (won’t matter after fitBounds)
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            >
            <TileLayer ... />
            <FitBounds points={data} />
            {showHeatmap && <HeatmapLayer points={data} radius={radius} blur={blur} maxZoom={maxZoom} />}
            {showMarkers && data.map(...)}
            </MapContainer>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {showHeatmap && (
              <HeatmapLayer 
                points={data} 
                radius={radius}
                blur={blur}
                maxZoom={maxZoom}
              />
            )}
            
            {showMarkers && data.map((loc, index) => (
              <Marker key={index} position={[loc.lat, loc.lng]}>
                <Popup>
                  <div className="font-semibold text-lg">{loc.name}</div>
                  <div className="mt-2">
                    <span className="font-medium">Temperature: </span>
                    <span className={loc.temperature > 38 ? 'text-red-600 font-bold' : 'text-gray-700'}>
                      {loc.temperature}°C
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Rainfall: </span>
                    <span className="text-blue-600">{loc.rainfall}mm</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          <div className="absolute bottom-4 left-4 bg-slate-800 bg-opacity-80 text-white p-3 rounded-lg shadow-lg">
            <div className="text-sm font-semibold">Map Controls</div>
            <div className="text-xs mt-1">Use mouse to pan and zoom</div>
            <div className="text-xs">Click on markers for details</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerraMap;