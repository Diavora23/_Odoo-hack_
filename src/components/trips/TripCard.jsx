import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR, formatDateRange } from '../../utils/formatters';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trash2, 
  FileText, 
  ArrowRight, 
  Hotel, 
  Sparkles,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function TripCard({ trip, onOpenPdf }) {
  const { deleteTrip, setActiveTripId, setCurrentView } = useApp();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ongoing':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500 text-white shadow-md animate-pulse">
            ● Active Journey
          </span>
        );
      case 'upcoming':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-indiaTeal-600 text-white shadow-md">
            Upcoming
          </span>
        );
      case 'past':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-slate-600 text-white">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  const handleViewTimeline = () => {
    setActiveTripId(trip.id);
    setCurrentView('calendar');
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      
      {/* Top Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={trip.coverImage}
          alt={trip.tripTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {getStatusBadge(trip.status)}
        </div>

        {/* Action Button for PDF Voucher */}
        <button
          onClick={() => onOpenPdf(trip)}
          className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/70 hover:bg-slate-900 backdrop-blur-md text-white text-xs font-bold transition-all flex items-center gap-1 border border-white/20"
          title="Print Travel Voucher / PDF"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Voucher</span>
        </button>

        {/* Title on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-xs text-saffron-300 font-semibold mb-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{trip.cityName}, {trip.state}</span>
          </div>
          <h3 className="text-lg font-heading font-extrabold text-white truncate">
            {trip.tripTitle}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Meta Info: Dates & Travelers */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 bg-sand-50 p-2.5 rounded-xl border border-sand-200">
            <Calendar className="w-4 h-4 text-saffron-500 flex-shrink-0" />
            <span className="truncate font-medium">{formatDateRange(trip.startDate, trip.endDate)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-sand-50 p-2.5 rounded-xl border border-sand-200">
            <Users className="w-4 h-4 text-indiaTeal-600 flex-shrink-0" />
            <span className="font-medium">{trip.travelers} Travelers • {trip.durationDays} Days</span>
          </div>
        </div>

        {/* Hotel Stay Snippet */}
        {trip.hotel && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-200/60 text-xs text-slate-800">
            <Hotel className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span className="truncate">
              Stay: <strong>{trip.hotel.name}</strong>
            </span>
          </div>
        )}

        {/* Budget Summary */}
        <div className="p-3 rounded-2xl bg-sand-100/60 border border-sand-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Total Trip Budget
            </span>
            <span className="text-base font-extrabold font-heading text-slate-900">
              {formatINR(trip.totalBudget)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              {trip.days?.length || trip.durationDays} Days Plan
            </span>
            <span className="text-xs font-bold text-indiaTeal-700">
              {trip.days ? trip.days.reduce((acc, d) => acc + (d.activities?.length || 0), 0) : 0} Activities
            </span>
          </div>
        </div>

        {/* Actions Row */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-sand-100">
          
          <button
            onClick={handleViewTimeline}
            className="flex-1 py-2 px-3 saffron-gradient hover:opacity-95 text-white text-xs font-bold font-heading rounded-xl shadow-md shadow-saffron-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <span>View Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenPdf(trip)}
            className="p-2 text-slate-600 hover:text-indiaTeal-700 hover:bg-indiaTeal-50 rounded-xl transition-colors border border-sand-200"
            title="Export Voucher"
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-sand-200"
            title="Delete Trip"
          >
            <Trash2 className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white max-w-sm w-full p-6 rounded-3xl shadow-2xl border border-sand-200 space-y-4">
            <h4 className="text-base font-bold font-heading text-slate-900">
              Delete Itinerary?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to remove <strong>"{trip.tripTitle}"</strong> from your saved trips? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-sand-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: API Endpoint - DELETE /api/v1/trips/:id
                  deleteTrip(trip.id);
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md"
              >
                Delete Journey
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
