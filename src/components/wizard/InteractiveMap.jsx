import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Layers, Sparkles, Car } from 'lucide-react';

export default function InteractiveMap({ city, activeDayNumber, itineraryDays }) {
  const [selectedPin, setSelectedPin] = useState(null);
  const [mapStyle, setMapStyle] = useState('heritage'); // heritage | satellite | terrain

  if (!city) return null;

  const activeDay = itineraryDays?.find(d => d.dayNumber === activeDayNumber) || itineraryDays?.[0];
  const landmarks = city.topAttractions || [];

  return (
    <div className="bg-white rounded-3xl p-5 border border-sand-200 shadow-sm space-y-4">
      
      {/* Map Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indiaTeal-500/10 flex items-center justify-center">
            <Navigation className="w-5 h-5 text-indiaTeal-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-heading text-slate-900">
              Interactive Route Map
            </h4>
            <p className="text-[11px] text-slate-500">
              Day {activeDayNumber || 1} Waypoints in {city.name} ({city.coordinates?.lat.toFixed(2)}°N, {city.coordinates?.lng.toFixed(2)}°E)
            </p>
          </div>
        </div>

        {/* Map Layer Selector */}
        <div className="flex items-center gap-1 bg-sand-100 p-1 rounded-xl text-[10px] font-bold">
          <button
            onClick={() => setMapStyle('heritage')}
            className={`px-2 py-1 rounded-lg transition-all ${
              mapStyle === 'heritage' ? 'bg-white shadow text-saffron-600' : 'text-slate-500'
            }`}
          >
            Heritage
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`px-2 py-1 rounded-lg transition-all ${
              mapStyle === 'satellite' ? 'bg-white shadow text-saffron-600' : 'text-slate-500'
            }`}
          >
            Topographic
          </button>
        </div>
      </div>

      {/* Mock Map Canvas */}
      <div className="relative h-64 rounded-2xl overflow-hidden border border-sand-300 bg-slate-900 shadow-inner group">
        
        {/* Map Background Simulation */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            mapStyle === 'heritage' 
              ? 'bg-[radial-gradient(#fed7aa_1px,transparent_1px)] [background-size:16px_16px] bg-[#f8f4eb]'
              : 'bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] bg-[#0f172a]'
          }`}
        >
          {/* Simulated Geographical Contour Lines */}
          <svg className="w-full h-full opacity-30 pointer-events-none" viewBox="0 0 500 300">
            <path d="M 50 100 Q 150 50 250 120 T 450 180" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M 80 220 Q 200 280 320 200 T 480 90" fill="none" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="120" cy="110" r="45" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.4" />
            <circle cx="350" cy="160" r="60" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>

        {/* Compass Needle in top-right */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-md backdrop-blur-md flex items-center justify-center text-saffron-600 pointer-events-none">
          <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '30s' }} />
        </div>

        {/* Waypoint Markers on Canvas */}
        {landmarks.slice(0, 4).map((landmark, idx) => {
          // Positions calculated for visual charm
          const positions = [
            { top: '25%', left: '22%' },
            { top: '35%', left: '68%' },
            { top: '65%', left: '38%' },
            { top: '75%', left: '78%' },
          ];
          const pos = positions[idx % positions.length];
          const isCurrentSelected = selectedPin?.id === landmark.id;

          return (
            <div
              key={landmark.id}
              style={{ top: pos.top, left: pos.left }}
              onClick={() => setSelectedPin(landmark)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group/pin"
            >
              <div className={`relative flex items-center justify-center transition-transform hover:scale-125 ${
                isCurrentSelected ? 'scale-125' : ''
              }`}>
                <div className="w-8 h-8 rounded-full saffron-gradient text-white flex items-center justify-center font-bold text-xs shadow-lg ring-4 ring-white/80">
                  {idx + 1}
                </div>
                {/* Ripple ring */}
                <div className="absolute -inset-1 rounded-full bg-saffron-400 opacity-40 animate-ping pointer-events-none" />
              </div>

              {/* Pin Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/pin:block z-30 whitespace-nowrap bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-xl">
                {landmark.name}
              </div>
            </div>
          );
        })}

        {/* Selected Landmark Info Overlay */}
        {selectedPin && (
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-sand-200 z-30 animate-fade-in flex items-center justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-saffron-100 text-saffron-700">
                  {selectedPin.category}
                </span>
                <span className="text-xs font-bold text-slate-900 truncate">{selectedPin.name}</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">{selectedPin.desc}</p>
            </div>
            <button
              onClick={() => setSelectedPin(null)}
              className="text-xs font-semibold text-saffron-600 hover:text-saffron-700 px-2 py-1 flex-shrink-0"
            >
              Close
            </button>
          </div>
        )}

      </div>

      {/* Transit Distance & Route Estimate */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-sand-50 border border-sand-200 text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <Car className="w-4 h-4 text-indiaTeal-600" />
          <span>Estimated Day Circuit: <strong>~18 km (45 mins transit)</strong></span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">Click pins for details</span>
      </div>

    </div>
  );
}
