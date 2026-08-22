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
  Crown
} from 'lucide-react';

export default function CityCard({ city }) {
  const { startNewTripWizard } = useApp();

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between hover:border-gold-300">
      
      {/* Cover Image & Badges */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={city.heroImage}
          alt={city.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900/80 backdrop-blur-md border border-gold-500/30 text-gold-300 text-[11px] font-bold">
          <span>{city.category}</span>
        </div>

        {/* Star Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-500 text-navy-950 text-[11px] font-bold shadow-md">
          <Star className="w-3.5 h-3.5 fill-navy-950" />
          <span>{city.rating}</span>
          <span className="text-navy-900/80 font-normal text-[10px]">({city.reviewCount})</span>
        </div>

        {/* Bottom City Name on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-xs text-gold-400 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
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
          <p className="text-xs font-bold text-navy-800 uppercase tracking-wider">
            {city.nickname}
          </p>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
            {city.tagline}
          </p>
        </div>

        {/* Top Attractions Pills */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Crown className="w-3 h-3 text-gold-600" />
            <span>Must-Visit Landmarks</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {city.topAttractions.slice(0, 3).map(att => (
              <span
                key={att.id}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-sand-100 text-navy-900 border border-sand-200 truncate max-w-[180px]"
              >
                {att.name.split(' (')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Regional Food Specialty */}
        {city.foodRecommendations && city.foodRecommendations.length > 0 && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gold-500/10 border border-gold-300/60 text-xs text-gold-950">
            <UtensilsCrossed className="w-4 h-4 text-gold-700 flex-shrink-0" />
            <span className="truncate">
              Signature Dish: <strong>{city.foodRecommendations[0].name}</strong>
            </span>
          </div>
        )}

        {/* Weather & Price Footer */}
        <div className="pt-3 border-t border-sand-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Starting from
            </div>
            <div className="text-base font-extrabold font-heading text-navy-950">
              {formatINR(city.startingPrice)}
              <span className="text-xs font-normal text-slate-500"> / day</span>
            </div>
          </div>

          <button
            onClick={() => startNewTripWizard(city.id)}
            className="px-4 py-2 text-xs font-bold font-heading text-navy-950 royal-gold-gradient hover:opacity-95 rounded-xl shadow-md shadow-gold-500/20 group-hover:scale-105 transition-all flex items-center gap-1"
          >
            <span>Plan Trip</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
