import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR, formatDateRange } from '../../utils/formatters';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Clock, 
  Sparkles,
  Plane,
  ChevronRight
} from 'lucide-react';

export default function QuickTrips() {
  const { trips, setCurrentView, setActiveTripId } = useApp();

  const ongoingAndUpcoming = trips.filter(t => t.status === 'ongoing' || t.status === 'upcoming');

  if (ongoingAndUpcoming.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indiaTeal-700">
            <Plane className="w-4 h-4" />
            <span>Your Active Travel Deck</span>
          </div>
          <h3 className="text-xl font-extrabold font-heading text-slate-900 mt-0.5">
            Ongoing & Upcoming Journeys
          </h3>
        </div>

        <button
          onClick={() => setCurrentView('trips')}
          className="text-xs font-bold text-saffron-600 hover:text-saffron-700 flex items-center gap-1 group"
        >
          <span>View All Trips ({trips.length})</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ongoingAndUpcoming.slice(0, 2).map(trip => {
          const isOngoing = trip.status === 'ongoing';

          return (
            <div
              key={trip.id}
              onClick={() => {
                setActiveTripId(trip.id);
                setCurrentView('trips');
              }}
              className="group cursor-pointer bg-white p-5 rounded-3xl border border-sand-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-saffron-300 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={trip.coverImage}
                  alt={trip.tripTitle}
                  className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                        isOngoing
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse'
                          : 'bg-indiaTeal-50 text-indiaTeal-700 border-indiaTeal-200'
                      }`}
                    >
                      {isOngoing ? '● Happening Now' : 'Upcoming'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {trip.durationDays} Days • {trip.travelers} Travelers
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-saffron-600 transition-colors">
                    {trip.tripTitle}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-saffron-500" />
                    <span>{trip.cityName}, {trip.state}</span>
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-sand-100 flex-shrink-0">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    Total Budget
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 font-heading">
                    {formatINR(trip.totalBudget)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-saffron-600 sm:mt-2">
                  <span>Open Details</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
