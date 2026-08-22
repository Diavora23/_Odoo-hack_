import React from 'react';
import { formatINR, formatDateRange, formatDate } from '../../utils/formatters';
import { 
  X, 
  Printer, 
  Download, 
  Compass, 
  Calendar, 
  Users, 
  MapPin, 
  Hotel, 
  QrCode,
  ShieldCheck
} from 'lucide-react';

export default function ExportPdfModal({ trip, isOpen, onClose }) {
  if (!isOpen || !trip) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in no-print-bg">
      <div className="bg-white max-w-3xl w-full rounded-3xl shadow-2xl border border-sand-200 overflow-hidden max-h-[90vh] flex flex-col animate-slide-up">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-saffron-400" />
            <h3 className="text-sm font-bold font-heading">
              Travel Voucher & Printable Itinerary
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 saffron-gradient hover:opacity-95 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Voucher Content */}
        <div className="p-8 overflow-y-auto space-y-6 print-container" id="printable-voucher">
          
          {/* Header Banner */}
          <div className="flex items-start justify-between border-b pb-6 border-sand-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-xl saffron-gradient flex items-center justify-center text-white font-bold">
                  GT
                </div>
                <span className="font-heading text-xl font-black text-slate-900">
                  Globe<span className="text-saffron-500">Trotter</span>
                </span>
                <span className="text-[10px] uppercase font-bold bg-sand-100 text-slate-700 px-2 py-0.5 rounded border border-sand-200">
                  Official Travel Itinerary
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Incredible India Journeys • Booking Reference: GT-{trip.id?.substring(trip.id.length - 6).toUpperCase() || 'IND982'}
              </p>
            </div>

            {/* Mock QR Code for boarding & voucher check */}
            <div className="text-center p-2 rounded-xl bg-sand-50 border border-sand-200">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-lg flex items-center justify-center mx-auto text-[9px] font-mono leading-tight p-1">
                [ QR PASS ]
              </div>
              <span className="text-[9px] text-slate-400 uppercase font-bold mt-1 block">
                Scan on Mobile
              </span>
            </div>
          </div>

          {/* Trip Summary Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-sand-50 border border-sand-200 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Destination</span>
              <span className="font-bold text-slate-900">{trip.cityName}, {trip.state}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Dates</span>
              <span className="font-bold text-slate-900">{formatDateRange(trip.startDate, trip.endDate)}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Party Size</span>
              <span className="font-bold text-slate-900">{trip.travelers} Travelers</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Budget (₹)</span>
              <span className="font-extrabold text-saffron-600 font-heading">{formatINR(trip.totalBudget)}</span>
            </div>
          </div>

          {/* Hotel Information */}
          {trip.hotel && (
            <div className="p-4 rounded-2xl border border-indiaTeal-200 bg-indiaTeal-50/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <Hotel className="w-5 h-5 text-indiaTeal-600" />
                <div>
                  <span className="font-bold text-slate-900">{trip.hotel.name}</span>
                  <p className="text-[11px] text-slate-500">{trip.hotel.type} • ₹{trip.hotel.pricePerNight?.toLocaleString('en-IN')}/night</p>
                </div>
              </div>
              <span className="font-bold text-indiaTeal-900">Confirmed Booking</span>
            </div>
          )}

          {/* Day by Day Schedule Table */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-heading text-slate-900 uppercase tracking-wider">
              Day-by-Day Activity Schedule
            </h4>

            {trip.days?.map((day) => (
              <div key={day.dayNumber} className="border border-sand-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 bg-sand-100/60 p-2 rounded-lg">
                  <span>Day {day.dayNumber}: {day.theme}</span>
                  <span className="text-slate-500 font-normal">{formatDate(day.date)}</span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {day.activities?.map((act, i) => (
                    <div key={i} className="flex items-center justify-between text-xs text-slate-700 py-1 border-b border-sand-100 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400">{act.time}</span>
                        <span className="font-medium text-slate-900">{act.title}</span>
                        <span className="text-[10px] text-slate-400">({act.category})</span>
                      </div>
                      <span className="font-semibold text-slate-800">{act.cost > 0 ? formatINR(act.cost) : 'Free'}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-sand-200 text-center text-[10px] text-slate-400">
            Thank you for traveling with GlobeTrotter India. Have a wonderful and safe journey! • 24/7 Helpline: 1800-INDIA-TRIP
          </div>

        </div>

      </div>
    </div>
  );
}
