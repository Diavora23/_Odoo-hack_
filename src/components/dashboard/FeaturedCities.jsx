import React, { useState } from 'react';
import { INDIAN_CITIES } from '../../data/indianCities';
import CityCard from './CityCard';
import { Compass, Filter } from 'lucide-react';

export default function FeaturedCities() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Heritage', 'Beaches', 'Mountains', 'Spiritual', 'Nature'];

  const filteredCities = selectedCategory === 'All'
    ? INDIAN_CITIES
    : INDIAN_CITIES.filter(c => c.category === selectedCategory);

  return (
    <section id="featured-destinations" className="space-y-6">
      
      {/* Section Header with Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-600 mb-1">
            <Compass className="w-4 h-4" />
            <span>Featured Indian Destinations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            Iconic Cities & Wonders of India
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Select a city to generate instant multi-tier itineraries with verified INR costs
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-sand-100 text-slate-700 hover:bg-sand-200 border border-sand-200'
              }`}
            >
              {cat === 'All' ? 'All (7 Cities)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Cities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map(city => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>

    </section>
  );
}
