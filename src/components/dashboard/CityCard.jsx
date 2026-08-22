import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';
import { 
  Star, 
  MapPin, 
  Sparkles, 
  Calendar, 
  ArrowUpRight, 
  UtensilsCrossed,
  Plane
} from 'lucide-react';

export default function CityCard({ city }) {
  const { startNewTripWizard } = useApp();

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between hover:border-[#008cff]/40">
      
      {/* Cover Image & Badges */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={city.heroImage}
          alt={city.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051329]/85 via-[#051329]/20 to-transparent" />

        {/* Category Badge (MMT Style) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#051329]/80 backdrop-blur-md border border-[#008cff]/40 text-[#7cc5fb] text-[11px] font-bold">
          <span>{city.category}</span>
        </div>

        {/* Star Rating Badge (Amber) */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffb400] text-slate-950 text-[11px] font-bold shadow-md">
          <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
          <span>{city.rating}</span>
          <span className="text-slate-900/80 font-normal text-[10px]">({city.reviewCount})</span>
        </div>

        {/* Bottom City Name on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-xs text-[#7cc5fb] font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#008cff]" />
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
          <p className="text-xs font-bold text-[#0057ab] uppercase tracking-wider">
            {city.nickname}
          </p>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
            {city.tagline}
          </p>
        </div>

        {/* Top Attractions Pills */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Plane className="w-3 h-3 text-[#008cff] transform -rotate-45" />
            <span>Top Attractions</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {city.topAttractions.slice(0, 3).map(att => (
              <span
                key={att.id}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#f0f7ff] text-[#0057ab] border border-[#bae0fd] truncate max-w-[180px]"
              >
                {att.name.split(' (')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Regional Food Specialty */}
        {city.foodRecommendations && city.foodRecommendations.length > 0 && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#ffe1e2] border border-[#ffc8cb] text-xs text-[#7f1d1d]">
            <UtensilsCrossed className="w-4 h-4 text-[#e41d24] flex-shrink-0" />
            <span className="truncate">
              Famous For: <strong>{city.foodRecommendations[0].name}</strong>
            </span>
          </div>
        )}

        {/* Weather & Price Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Starting from
            </div>
            <div className="text-base font-extrabold font-heading text-slate-900">
              {formatINR(city.startingPrice)}
              <span className="text-xs font-normal text-slate-500"> / day</span>
            </div>
          </div>

          <button
            onClick={() => startNewTripWizard(city.id)}
            className="px-4 py-2 text-xs font-extrabold font-heading text-white bg-gradient-to-r from-[#008cff] to-[#006ed6] hover:from-[#007fe6] hover:to-[#005ebd] rounded-full shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all flex items-center gap-1"
          >
            <span>Plan Trip</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
