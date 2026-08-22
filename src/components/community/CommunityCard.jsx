import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';
import { 
  Heart, 
  Copy, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Eye
} from 'lucide-react';

export default function CommunityCard({ trip, onOpenModal }) {
  const { forkCommunityTrip, toggleLikeCommunityTrip, likedTripIds } = useApp();

  const isLiked = likedTripIds.includes(trip.id);

  const handleFork = (e) => {
    e.stopPropagation();
    // TODO: API Endpoint - POST /api/v1/trips/fork/:communityTripId
    forkCommunityTrip(trip);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    // TODO: API Endpoint - POST /api/v1/community/:id/like
    toggleLikeCommunityTrip(trip.id);
  };

  return (
    <div
      onClick={() => onOpenModal(trip)}
      className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer group"
    >
      
      {/* Cover Image & Overlays */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={trip.coverImage}
          alt={trip.tripTitle}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
          {trip.category}
        </div>

        {/* Interactive Like Button */}
        <button
          type="button"
          onClick={handleLike}
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full backdrop-blur-md text-xs font-bold transition-all flex items-center gap-1 shadow-md ${
            isLiked
              ? 'bg-rose-500 text-white'
              : 'bg-slate-900/60 hover:bg-slate-900 text-white border border-white/20'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
          <span>{trip.likes + (isLiked ? 1 : 0)}</span>
        </button>

        {/* City & Title */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-xs text-saffron-300 font-semibold mb-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{trip.cityName}, {trip.state}</span>
          </div>
          <h3 className="text-base font-heading font-extrabold text-white truncate">
            {trip.tripTitle}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Author Details */}
        <div className="flex items-center gap-2.5">
          <img
            src={trip.author.avatar}
            alt={trip.author.name}
            className="w-9 h-9 rounded-full object-cover border border-sand-300 flex-shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-900 truncate">
                {trip.author.name}
              </span>
              {trip.author.verified && (
                <span className="w-3 h-3 rounded-full bg-blue-500 text-white flex items-center justify-center text-[8px]">
                  ✓
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 truncate">
              {trip.author.handle} • {trip.author.badge}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {trip.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-sand-100 text-slate-600 border border-sand-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Trip Meta: Duration & Price */}
        <div className="p-3 rounded-2xl bg-sand-50 border border-sand-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Budget in INR
            </span>
            <span className="text-base font-extrabold font-heading text-slate-900">
              {formatINR(trip.totalBudget)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Trip Length
            </span>
            <span className="text-xs font-bold text-indiaTeal-700">
              {trip.durationDays} Days • {trip.travelers} Travelers
            </span>
          </div>
        </div>

        {/* Action Buttons: "Copy / Fork Itinerary" */}
        <div className="pt-2 flex items-center gap-2 border-t border-sand-100">
          <button
            type="button"
            onClick={handleFork}
            className="flex-1 py-2.5 px-3 saffron-gradient hover:opacity-95 text-white text-xs font-bold font-heading rounded-xl shadow-md shadow-saffron-500/20 group-hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy / Fork Itinerary</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenModal(trip)}
            className="p-2.5 bg-sand-100 hover:bg-sand-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
