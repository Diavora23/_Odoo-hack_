import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';
import { 
  Star, 
  MapPin, 
  Sparkles, 
  Calendar, 
  ArrowUpRight, 
  CloudSun,
  UtensilsCrossed
} from 'lucide-react';

export default function CityCard({ city }) {
  const { startNewTripWizard } = useApp();

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
      
      {/* Cover Image & Badges */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={city.heroImage}
          alt={city.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
          <span>{city.category}</span>
        </div>

        {/* Star Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[11px] font-bold shadow-md">
          <Star className="w-3.5 h-3.5 fill-white" />
          <span>{city.rating}</span>
          <span className="text-amber-100 font-normal text-[10px]">({city.reviewCount})</span>
        </div>

        {/* Bottom City Name on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-xs text-saffron-300 font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{city.state}, India</span>
          </div>
          <h3 className="text-xl font-heading font-extrabold text-white tracking-tight">
            {city.name}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Nickname and Tagline */}
        <div>
          <p className="text-xs font-semibold text-indiaTeal-700 uppercase tracking-wider">
            {city.nickname}
          </p>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
            {city.tagline}
          </p>
        </div>

        {/* Top Attractions Pills */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-saffron-500" />
            <span>Must-Visit Landmarks</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {city.topAttractions.slice(0, 3).map(att => (
              <span
                key={att.id}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-sand-100 text-slate-700 border border-sand-200 truncate max-w-[180px]"
              >
                {att.name.split(' (')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Regional Food Specialty */}
        {city.foodRecommendations && city.foodRecommendations.length > 0 && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-200/70 text-xs text-amber-950">
            <UtensilsCrossed className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span className="truncate">
              Famous for: <strong>{city.foodRecommendations[0].name}</strong>
            </span>
          </div>
        )}

        {/* Weather & Price Footer */}
        <div className="pt-3 border-t border-sand-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Starting from
            </div>
            <div className="text-base font-extrabold font-heading text-slate-900">
              {formatINR(city.startingPrice)}
              <span className="text-xs font-normal text-slate-500"> / day</span>
            </div>
          </div>

          <button
            onClick={() => startNewTripWizard(city.id)}
            className="px-4 py-2 text-xs font-bold font-heading text-white saffron-gradient hover:opacity-95 rounded-xl shadow-md shadow-saffron-500/20 group-hover:scale-105 transition-all flex items-center gap-1"
          >
            <span>Plan Trip</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
