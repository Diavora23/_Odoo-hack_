import React from 'react';
import { Filter, Search, IndianRupee, Clock, MapPin } from 'lucide-react';
import { INDIAN_CITIES } from '../../data/indianCities';

export default function CommunityFilter({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  budgetRange,
  setBudgetRange,
  durationFilter,
  setDurationFilter
}) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-sm space-y-4">
      
      {/* Search and Quick Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Search Itinerary */}
        <div className="relative">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Search Itineraries
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword or author..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-saffron-500" />
            <span>Destination City</span>
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400 font-medium text-slate-800"
          >
            <option value="All">All Indian Cities</option>
            {INDIAN_CITIES.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.state})
              </option>
            ))}
          </select>
        </div>

        {/* Budget Range Filter (₹ INR) */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
            <IndianRupee className="w-3 h-3 text-indiaTeal-600" />
            <span>Budget Range (₹)</span>
          </label>
          <select
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400 font-medium text-slate-800"
          >
            <option value="All">Any Budget</option>
            <option value="under15k">Under ₹15,000 (Budget)</option>
            <option value="15k-30k">₹15,000 – ₹30,000 (Moderate)</option>
            <option value="above30k">Above ₹30,000 (Heritage/Luxe)</option>
          </select>
        </div>

        {/* Duration Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-purple-600" />
            <span>Duration (Days)</span>
          </label>
          <select
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400 font-medium text-slate-800"
          >
            <option value="All">Any Duration</option>
            <option value="short">1 – 3 Days (Weekend Express)</option>
            <option value="medium">4 – 6 Days (Classic Tour)</option>
            <option value="long">7 – 14 Days (Grand Expedition)</option>
          </select>
        </div>

      </div>

    </div>
  );
}
