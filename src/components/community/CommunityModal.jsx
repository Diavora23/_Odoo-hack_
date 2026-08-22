import React from 'react';
import { formatINR } from '../../utils/formatters';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Copy, 
  Heart, 
  MapPin, 
  Calendar, 
  Users, 
  Hotel, 
  Sparkles, 
  Check,
  ShieldCheck
} from 'lucide-react';

export default function CommunityModal({ trip, isOpen, onClose }) {
  const { forkCommunityTrip, toggleLikeCommunityTrip, likedTripIds } = useApp();

  if (!isOpen || !trip) return null;

  const isLiked = likedTripIds.includes(trip.id);

  const handleFork = () => {
    // TODO: API Endpoint - POST /api/v1/trips/fork/:communityTripId
    forkCommunityTrip(trip);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-sand-200 overflow-hidden max-h-[90vh] flex flex-col animate-slide-up">
        
        {/* Header with Cover */}
        <div className="relative h-52 flex-shrink-0">
          <img
            src={trip.coverImage}
            alt={trip.tripTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Author Badge */}
          <div className="absolute bottom-3 left-4 right-4 text-white flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={trip.author.avatar}
                  alt={trip.author.name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold">{trip.author.name}</span>
                    {trip.author.verified && (
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-300">{trip.author.handle} • {trip.author.badge}</span>
                </div>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-white">
                {trip.tripTitle}
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-sand-50 border border-sand-200 text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
              <span className="text-sm font-bold text-slate-900">{trip.durationDays} Days</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Travelers</span>
              <span className="text-sm font-bold text-slate-900">{trip.travelers} People</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Cost (₹)</span>
              <span className="text-sm font-extrabold font-heading text-saffron-600">{formatINR(trip.totalBudget)}</span>
            </div>
          </div>

          {/* Summary description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              About This Itinerary
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {trip.summary}
            </p>
          </div>

          {/* Stay Tier */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-indiaTeal-50 border border-indiaTeal-200 text-xs text-slate-800">
            <Hotel className="w-4 h-4 text-indiaTeal-600 flex-shrink-0" />
            <span>Recommended Accommodation: <strong>{trip.hotelTier}</strong></span>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Key Experiences Included
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {trip.highlights?.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-sand-50 p-2 rounded-xl border border-sand-200">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-medium truncate">{h}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-sand-200 bg-sand-50/50 flex items-center justify-between gap-3">
          <button
            onClick={() => toggleLikeCommunityTrip(trip.id)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              isLiked
                ? 'bg-rose-50 border-rose-300 text-rose-600'
                : 'bg-white border-sand-300 text-slate-700 hover:bg-sand-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{trip.likes + (isLiked ? 1 : 0)} Likes</span>
          </button>

          <button
            onClick={handleFork}
            className="px-6 py-2.5 saffron-gradient hover:opacity-95 text-white font-heading font-bold text-xs sm:text-sm rounded-xl shadow-xl shadow-saffron-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            <span>Copy / Fork Itinerary to My Trips</span>
          </button>
        </div>

      </div>
    </div>
  );
}
