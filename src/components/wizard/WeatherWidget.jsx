import React from 'react';
import { Sun, CloudSun, Wind, CloudRain, CloudSnow, Sparkles, Compass } from 'lucide-react';

export default function WeatherWidget({ cityWeather, cityName }) {
  if (!cityWeather) return null;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'CloudSun': return <CloudSun className="w-5 h-5 text-amber-400" />;
      case 'Wind': return <Wind className="w-5 h-5 text-teal-500" />;
      case 'CloudRain': return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'CloudSnow': return <CloudSnow className="w-5 h-5 text-sky-400" />;
      default: return <Sun className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-sand-200 shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Sun className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-heading text-slate-900">
              5-Day Weather Forecast
            </h4>
            <p className="text-[11px] text-slate-500">{cityName}, India</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-lg font-heading font-extrabold text-slate-900">
            {cityWeather.temp}
          </span>
          <span className="text-[11px] text-indiaTeal-700 font-semibold block -mt-1">
            {cityWeather.condition}
          </span>
        </div>
      </div>

      {/* 5-Day Forecast Strip */}
      <div className="grid grid-cols-5 gap-2 pt-1">
        {cityWeather.forecast?.map((day, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-2xl bg-sand-50 border border-sand-200 text-center flex flex-col items-center justify-between gap-1"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {day.day}
            </span>
            <div className="my-0.5">
              {getIcon(day.icon)}
            </div>
            <span className="text-[10px] font-semibold text-slate-700 leading-tight">
              {day.temp.split(' / ')[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Climate & Packing Tip */}
      {cityWeather.tip && (
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-200/80 text-[11px] text-amber-950 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Traveler Climate Tip: </strong>{cityWeather.tip}
          </p>
        </div>
      )}

    </div>
  );
}
