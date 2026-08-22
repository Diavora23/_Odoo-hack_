import React, { useState } from 'react';
import { COMMUNITY_TRIPS } from '../../data/communityTrips';
import CommunityCard from './CommunityCard';
import CommunityFilter from './CommunityFilter';
import CommunityModal from './CommunityModal';
import { Users, Sparkles, Copy, Compass, MessageSquare } from 'lucide-react';

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [budgetRange, setBudgetRange] = useState('All');
  const [durationFilter, setDurationFilter] = useState('All');
  const [selectedTripModal, setSelectedTripModal] = useState(null);

  // Filtering Logic
  const filteredTrips = COMMUNITY_TRIPS.filter(trip => {
    // City filter
    if (selectedCity !== 'All' && trip.cityId !== selectedCity) {
      return false;
    }

    // Budget filter
    if (budgetRange === 'under15k' && trip.totalBudget > 15000) return false;
    if (budgetRange === '15k-30k' && (trip.totalBudget < 15000 || trip.totalBudget > 30000)) return false;
    if (budgetRange === 'above30k' && trip.totalBudget < 30000) return false;

    // Duration filter
    if (durationFilter === 'short' && trip.durationDays > 3) return false;
    if (durationFilter === 'medium' && (trip.durationDays < 4 || trip.durationDays > 6)) return false;
    if (durationFilter === 'long' && trip.durationDays < 7) return false;

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = trip.tripTitle.toLowerCase().includes(q);
      const matchCity = trip.cityName.toLowerCase().includes(q);
      const matchAuthor = trip.author.name.toLowerCase().includes(q);
      const matchTags = trip.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCity && !matchAuthor && !matchTags) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      
      {/* Hero / Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indiaTeal-950 text-white p-6 sm:p-10 shadow-2xl border border-sand-200">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indiaTeal-500/20 text-indiaTeal-300 text-xs font-bold border border-indiaTeal-400/30">
            <Users className="w-3.5 h-3.5 text-indiaTeal-400" />
            <span>Indian Travelers Social Hub</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight text-white">
            Discover & <span className="text-gradient-saffron">Fork Verified Itineraries</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Browse authentic travel schedules crafted by verified Indian wanderers. Like your favorites or click <strong>"Copy / Fork"</strong> to instantly clone and customize any trip in your own deck.
          </p>
        </div>

        {/* Decorative Badge in Top Right */}
        <div className="hidden lg:flex flex-col items-center justify-center absolute right-8 top-1/2 -translate-y-1/2 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
          <Copy className="w-8 h-8 text-saffron-400 mb-1" />
          <span className="text-sm font-bold font-heading">1-Click Forking</span>
          <span className="text-[11px] text-slate-300">Directly into My Trips</span>
        </div>
      </div>

      {/* Filter Component */}
      <CommunityFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        budgetRange={budgetRange}
        setBudgetRange={setBudgetRange}
        durationFilter={durationFilter}
        setDurationFilter={setDurationFilter}
      />

      {/* Community Trips Grid */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map(trip => (
            <CommunityCard
              key={trip.id}
              trip={trip}
              onOpenModal={(t) => setSelectedTripModal(t)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-sand-300 space-y-3 max-w-md mx-auto">
          <Compass className="w-10 h-10 text-saffron-500 mx-auto" />
          <h4 className="text-base font-bold font-heading text-slate-900">
            No Itineraries Match Your Filter
          </h4>
          <p className="text-xs text-slate-500">
            Try adjusting your budget or destination criteria to see more community itineraries.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCity('All');
              setBudgetRange('All');
              setDurationFilter('All');
            }}
            className="px-4 py-2 bg-sand-100 hover:bg-sand-200 text-xs font-bold text-slate-700 rounded-xl"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedTripModal && (
        <CommunityModal
          trip={selectedTripModal}
          isOpen={!!selectedTripModal}
          onClose={() => setSelectedTripModal(null)}
        />
      )}

    </div>
  );
}
