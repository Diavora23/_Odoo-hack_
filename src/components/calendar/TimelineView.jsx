import React from 'react';
import { formatINR, formatDate } from '../../utils/formatters';
import { 
  Clock, 
  MapPin, 
  Hotel, 
  Utensils, 
  Landmark, 
  Compass, 
  Sparkles, 
  Car, 
  ShoppingBag,
  Tag
} from 'lucide-react';

export default function TimelineView({ activeTrip, selectedDayNumber }) {
  if (!activeTrip || !activeTrip.days) return null;

  const displayedDays = selectedDayNumber
    ? activeTrip.days.filter(d => d.dayNumber === selectedDayNumber)
    : activeTrip.days;

  const getActivityIcon = (category) => {
    switch (category) {
      case 'Food': return <Utensils className="w-4 h-4 text-amber-600" />;
      case 'Sightseeing': return <Landmark className="w-4 h-4 text-saffron-600" />;
      case 'Culture': return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'Adventure': return <Compass className="w-4 h-4 text-indiaTeal-600" />;
      case 'Shopping': return <ShoppingBag className="w-4 h-4 text-pink-600" />;
      case 'Transport': return <Car className="w-4 h-4 text-indigo-600" />;
      case 'Stay': return <Hotel className="w-4 h-4 text-blue-600" />;
      default: return <Tag className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {displayedDays.map((day) => (
        <div key={day.dayNumber} className="bg-white p-6 rounded-3xl border border-sand-200 shadow-sm space-y-6">
          
          {/* Day Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl saffron-gradient text-white flex items-center justify-center font-bold font-heading text-base shadow-md">
                D{day.dayNumber}
              </div>
              <div>
                <h4 className="text-base font-bold font-heading text-slate-900">
                  Day {day.dayNumber}: {day.theme}
                </h4>
                <p className="text-xs text-slate-500">{formatDate(day.date)}</p>
              </div>
            </div>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sand-100 text-slate-700 w-fit">
              {day.activities?.length || 0} Events Scheduled
            </span>
          </div>

          {/* Vertical Timeline Activity Items */}
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-saffron-500 before:via-indiaTeal-500 before:to-amber-400">
            {day.activities && day.activities.length > 0 ? (
              day.activities.map((act, idx) => (
                <div key={act.id || idx} className="relative group">
                  
                  {/* Timeline Dot Marker */}
                  <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-saffron-500 shadow-md flex items-center justify-center group-hover:scale-125 transition-transform z-10">
                    <div className="w-2 h-2 rounded-full bg-saffron-500" />
                  </div>

                  {/* Activity Card */}
                  <div className="bg-sand-50/70 hover:bg-white p-4 rounded-2xl border border-sand-200 hover:border-saffron-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0 mt-0.5">
                        {getActivityIcon(act.category)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-sand-200 text-slate-800">
                            {act.time}
                          </span>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-indiaTeal-50 text-indiaTeal-800">
                            {act.category}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-slate-900 mt-1">
                          {act.title}
                        </h5>
                        {act.notes && (
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                            {act.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-left sm:text-right flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-sand-200/60">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">
                        Cost in INR
                      </span>
                      <span className="text-sm font-extrabold font-heading text-slate-900">
                        {act.cost > 0 ? formatINR(act.cost) : 'Free Entry'}
                      </span>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No scheduled activities for this day.</p>
            )}
          </div>

        </div>
      ))}
    </div>
  );
}
