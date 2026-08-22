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
  Plane
} from 'lucide-react';

export default function TripCard({ trip, onOpenPdf }) {
  const { deleteTrip, setActiveTripId, setCurrentView } = useApp();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ongoing':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-600 text-white shadow-md animate-pulse">
            ● Active Now
          </span>
        );
      case 'upcoming':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-[#008cff] text-white shadow-md">
            Confirmed
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
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#008cff]/50">
      
      {/* Top Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={trip.coverImage}
          alt={trip.tripTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051329]/85 via-[#051329]/20 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {getStatusBadge(trip.status)}
        </div>

        {/* Action Button for PDF Voucher */}
        <button
          onClick={() => onOpenPdf(trip)}
          className="absolute top-3 right-3 p-2 rounded-full bg-[#051329]/80 hover:bg-[#051329] backdrop-blur-md text-[#7cc5fb] text-xs font-bold transition-all flex items-center gap-1 border border-[#008cff]/40"
          title="Print Travel Voucher / PDF"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Pass</span>
        </button>

        {/* Title on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-xs text-[#7cc5fb] font-bold mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#008cff]" />
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
          <div className="flex items-center gap-1.5 bg-[#f4f7fa] p-2.5 rounded-xl border border-slate-200">
            <Calendar className="w-4 h-4 text-[#008cff] flex-shrink-0" />
            <span className="truncate font-bold text-slate-900">{formatDateRange(trip.startDate, trip.endDate)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#f4f7fa] p-2.5 rounded-xl border border-slate-200">
            <Users className="w-4 h-4 text-[#008cff] flex-shrink-0" />
            <span className="font-bold text-slate-900">{trip.travelers} Travelers • {trip.durationDays} Days</span>
          </div>
        </div>

        {/* Hotel Stay Snippet */}
        {trip.hotel && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f0f7ff] border border-[#bae0fd] text-xs text-slate-800">
            <Hotel className="w-4 h-4 text-[#008cff] flex-shrink-0" />
            <span className="truncate text-slate-900">
              Stay: <strong>{trip.hotel.name}</strong>
            </span>
          </div>
        )}

        {/* Budget Summary */}
        <div className="p-3 rounded-2xl bg-[#f4f7fa] border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Total Package Budget
            </span>
            <span className="text-base font-extrabold font-heading text-[#008cff]">
              {formatINR(trip.totalBudget)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              {trip.days?.length || trip.durationDays} Days Plan
            </span>
            <span className="text-xs font-bold text-slate-700">
              {trip.days ? trip.days.reduce((acc, d) => acc + (d.activities?.length || 0), 0) : 0} Activities
            </span>
          </div>
        </div>

        {/* Actions Row */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
          
          <button
            onClick={handleViewTimeline}
            className="flex-1 py-2 px-3 bg-gradient-to-r from-[#008cff] to-[#006ed6] hover:from-[#007fe6] hover:to-[#005ebd] text-white text-xs font-heading font-extrabold rounded-full shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <span>View Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenPdf(trip)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors border border-slate-200"
            title="Export Voucher"
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors border border-slate-200"
            title="Delete Trip"
          >
            <Trash2 className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051329]/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white max-w-sm w-full p-6 rounded-3xl shadow-2xl border border-slate-200 space-y-4">
            <h4 className="text-base font-bold font-heading text-slate-900">
              Delete Itinerary?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to remove <strong>"{trip.tripTitle}"</strong> from your saved trips? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTrip(trip.id);
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-full shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
