import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import TimelineView from './TimelineView';
import { formatDateRange, formatINR } from '../../utils/formatters';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  CalendarDays
} from 'lucide-react';

export default function CalendarPage() {
  const { trips, activeTrip, setActiveTripId, startNewTripWizard } = useApp();

  const [viewMode, setViewMode] = useState('day'); // 'day' | 'month'
  const [selectedDayNumber, setSelectedDayNumber] = useState(null); // null = all days

  if (!activeTrip) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-sand-200 space-y-4 max-w-lg mx-auto">
        <CalendarDays className="w-12 h-12 text-saffron-500 mx-auto animate-pulse" />
        <h3 className="text-xl font-bold font-heading text-slate-900">
          No Active Trip Selected
        </h3>
        <p className="text-xs text-slate-500">
          Please create a new trip or choose an existing journey from My Trips to explore the interactive timeline.
        </p>
        <button
          onClick={() => startNewTripWizard()}
          className="px-6 py-2.5 saffron-gradient text-white font-bold text-xs rounded-xl shadow-md"
        >
          + Plan New Journey
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      
      {/* Header with Active Trip Selector & View Mode Switcher */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-saffron-600">
            <CalendarIcon className="w-4 h-4" />
            <span>Interactive Trip Timeline</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              {activeTrip.tripTitle}
            </h2>
            <span className="px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-indiaTeal-50 text-indiaTeal-800 border border-indiaTeal-200">
              {activeTrip.status}
            </span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-saffron-500" />
            <span>{activeTrip.cityName}, {activeTrip.state} • {formatDateRange(activeTrip.startDate, activeTrip.endDate)} • {activeTrip.travelers} Travelers</span>
          </p>
        </div>

        {/* Controls: Trip Switcher & View Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Trip Switcher Dropdown */}
          <div className="flex items-center gap-1.5 bg-sand-50 p-1.5 rounded-2xl border border-sand-200">
            <span className="text-[11px] font-bold text-slate-500 pl-2">Trip:</span>
            <select
              value={activeTrip.id}
              onChange={(e) => {
                setActiveTripId(e.target.value);
                setSelectedDayNumber(null);
              }}
              className="bg-white text-xs font-bold text-slate-800 py-1.5 px-3 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-saffron-400 max-w-[180px] truncate"
            >
              {trips.map(t => (
                <option key={t.id} value={t.id}>
                  {t.tripTitle} ({t.cityName})
                </option>
              ))}
            </select>
          </div>

          {/* Day View vs Month View Toggle */}
          <div className="flex items-center gap-1 bg-sand-100 p-1 rounded-2xl border border-sand-200 text-xs font-bold">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                viewMode === 'day'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Day View (Timeline)
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                viewMode === 'month'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Month Calendar View
            </button>
          </div>

        </div>

      </div>

      {/* Day Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedDayNumber(null)}
          className={`px-4 py-2 text-xs font-bold rounded-2xl whitespace-nowrap transition-all ${
            selectedDayNumber === null
              ? 'saffron-gradient text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-sand-100 border border-sand-200'
          }`}
        >
          All {activeTrip.days?.length || activeTrip.durationDays} Days Overview
        </button>

        {activeTrip.days?.map((d) => (
          <button
            key={d.dayNumber}
            onClick={() => setSelectedDayNumber(d.dayNumber)}
            className={`px-3.5 py-2 text-xs font-bold rounded-2xl whitespace-nowrap transition-all ${
              selectedDayNumber === d.dayNumber
                ? 'saffron-gradient text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-sand-100 border border-sand-200'
            }`}
          >
            Day {d.dayNumber} ({d.activities?.length || 0} acts)
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {viewMode === 'day' ? (
        <TimelineView
          activeTrip={activeTrip}
          selectedDayNumber={selectedDayNumber}
        />
      ) : (
        /* Month Calendar Layout */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-200 shadow-sm space-y-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading text-slate-900">
              Trip Month Overview
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              {formatDateRange(activeTrip.startDate, activeTrip.endDate)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {activeTrip.days?.map((d) => (
              <div
                key={d.dayNumber}
                onClick={() => {
                  setSelectedDayNumber(d.dayNumber);
                  setViewMode('day');
                }}
                className="p-4 rounded-2xl bg-sand-50/80 hover:bg-white border border-sand-200 hover:border-saffron-400 hover:shadow-lg transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl saffron-gradient text-white font-bold text-xs flex items-center justify-center">
                    {d.dayNumber}
                  </span>
                  <span className="text-[10px] font-bold text-indiaTeal-700 bg-indiaTeal-50 px-2 py-0.5 rounded-full">
                    {d.activities?.length || 0} stops
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 group-hover:text-saffron-600 transition-colors line-clamp-1">
                  {d.theme}
                </h5>
                <p className="text-[11px] text-slate-500">{d.date}</p>
                <div className="pt-2 border-t border-sand-200 text-[11px] text-saffron-600 font-semibold flex items-center justify-between">
                  <span>Open Day</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
