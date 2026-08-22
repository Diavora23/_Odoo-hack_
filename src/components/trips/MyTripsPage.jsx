import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import TripCard from './TripCard';
import ExportPdfModal from './ExportPdfModal';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  Sparkles, 
  Compass, 
  Layers,
  ArrowUpDown
} from 'lucide-react';

export default function MyTripsPage() {
  const { trips, startNewTripWizard } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // all | ongoing | upcoming | past
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // date | budget-high | budget-low
  const [selectedPdfTrip, setSelectedPdfTrip] = useState(null);

  // Filtering
  const filteredTrips = trips.filter(trip => {
    // Tab filter
    if (activeTab !== 'all' && trip.status !== activeTab) return false;

    // Search filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchCity = trip.cityName?.toLowerCase().includes(q);
      const matchTitle = trip.tripTitle?.toLowerCase().includes(q);
      const matchState = trip.state?.toLowerCase().includes(q);
      if (!matchCity && !matchTitle && !matchState) return false;
    }

    return true;
  });

  // Sorting
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === 'budget-high') return (b.totalBudget || 0) - (a.totalBudget || 0);
    if (sortBy === 'budget-low') return (a.totalBudget || 0) - (b.totalBudget || 0);
    return new Date(b.startDate || 0) - new Date(a.startDate || 0);
  });

  const ongoingCount = trips.filter(t => t.status === 'ongoing').length;
  const upcomingCount = trips.filter(t => t.status === 'upcoming').length;
  const pastCount = trips.filter(t => t.status === 'past').length;

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      
      {/* Page Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-sand-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-saffron-600 mb-1">
            <Briefcase className="w-4 h-4" />
            <span>My Travel Dossier</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            Saved & Active Itineraries ({trips.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your Indian voyages, view day-by-day timelines, and export printable travel passes.
          </p>
        </div>

        <button
          onClick={() => startNewTripWizard()}
          className="px-6 py-3.5 saffron-gradient hover:opacity-95 text-white font-heading font-bold text-xs sm:text-sm rounded-2xl shadow-xl shadow-saffron-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Plan New Journey</span>
        </button>
      </div>

      {/* Filter Tabs & Search Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Trips', count: trips.length },
            { id: 'ongoing', label: 'Ongoing', count: ongoingCount },
            { id: 'upcoming', label: 'Upcoming', count: upcomingCount },
            { id: 'past', label: 'Past Trips', count: pastCount },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-bold rounded-2xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-sand-100 border border-sand-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-sand-200 text-slate-700'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city or title..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400 text-slate-700 font-semibold"
          >
            <option value="date">Sort: Latest Dates</option>
            <option value="budget-high">Sort: Budget (High to Low)</option>
            <option value="budget-low">Sort: Budget (Low to High)</option>
          </select>
        </div>

      </div>

      {/* Trips Grid */}
      {sortedTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTrips.map(trip => (
            <TripCard
              key={trip.id}
              trip={trip}
              onOpenPdf={(t) => setSelectedPdfTrip(t)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-sand-300 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-saffron-100 text-saffron-600 flex items-center justify-center mx-auto shadow-inner">
            <Compass className="w-8 h-8 animate-pulse-subtle" />
          </div>
          <h3 className="text-lg font-bold font-heading text-slate-900">
            No Journeys Found
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {searchQuery
              ? `No itineraries matching "${searchQuery}". Try clearing search filters.`
              : `You haven't added any ${activeTab !== 'all' ? activeTab : ''} trips yet. Design a new custom journey with our 3-step AI builder!`}
          </p>
          <button
            onClick={() => startNewTripWizard()}
            className="px-6 py-3 saffron-gradient text-white font-heading font-bold text-xs rounded-xl shadow-lg shadow-saffron-500/20 hover:scale-105 transition-all"
          >
            + Create Your First Indian Journey
          </button>
        </div>
      )}

      {/* Export Printable PDF Modal */}
      {selectedPdfTrip && (
        <ExportPdfModal
          trip={selectedPdfTrip}
          isOpen={!!selectedPdfTrip}
          onClose={() => setSelectedPdfTrip(null)}
        />
      )}

    </div>
  );
}
