import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_CITIES } from '../../data/indianCities';
import { 
  Compass, 
  Search, 
  User, 
  LogOut, 
  Sparkles, 
  Plus, 
  Menu, 
  X, 
  Heart,
  Calendar,
  Briefcase
} from 'lucide-react';

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  const { user, logout, setCurrentView, startNewTripWizard, likedTripIds, trips } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const filteredCities = searchQuery.trim() === '' ? [] : INDIAN_CITIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCity = (cityId) => {
    setSearchQuery('');
    setShowSearchResults(false);
    startNewTripWizard(cityId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sand-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Sidebar Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-slate-600 hover:text-saffron-600 rounded-lg hover:bg-sand-100 transition-colors"
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl saffron-gradient flex items-center justify-center text-white shadow-md shadow-saffron-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 animate-pulse-subtle" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-xl font-extrabold tracking-tight text-slate-900">
                    Globe<span className="text-saffron-500">Trotter</span>
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-indiaTeal-50 text-indiaTeal-700 border border-indiaTeal-200">
                    Incredible India
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden sm:block -mt-0.5">
                  Curated Itineraries & Live Budgeting
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar with Autocomplete Dropdown */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                placeholder="Search Jaipur, Goa, Varanasi, Manali, Kerala..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-sand-100/70 hover:bg-sand-100 focus:bg-white border border-sand-200 rounded-full focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500 transition-all text-slate-800 placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setShowSearchResults(false); }}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Autocomplete Results */}
            {showSearchResults && filteredCities.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-sand-200 py-2 z-50 animate-fade-in max-h-80 overflow-y-auto">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Destinations in India
                </div>
                {filteredCities.map(city => (
                  <button
                    key={city.id}
                    onClick={() => handleSelectCity(city.id)}
                    className="w-full px-3 py-2 flex items-center gap-3 hover:bg-sand-50 transition-colors text-left"
                  >
                    <img
                      src={city.heroImage}
                      alt={city.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-800">{city.name}, {city.state}</p>
                        <span className="text-xs font-semibold text-saffron-600">From ₹{city.startingPrice.toLocaleString('en-IN')}/day</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{city.tagline}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            
            {/* Currency Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sand-100 border border-sand-200 text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>₹ INR</span>
            </div>

            {/* New Trip Quick Button */}
            <button
              onClick={() => startNewTripWizard()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white saffron-gradient hover:opacity-95 rounded-xl shadow-md shadow-saffron-500/20 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Plan Trip</span>
            </button>

            {/* User Profile Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1 pl-2 bg-sand-100 hover:bg-sand-200/80 rounded-full border border-sand-200 transition-colors"
                  aria-label="User menu"
                >
                  <span className="text-xs font-medium text-slate-700 hidden lg:inline max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-saffron-300"
                  />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-sand-200 py-3 z-50 animate-slide-up">
                    <div className="px-4 py-2 border-b border-sand-100">
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center justify-between text-xs bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>Travel Points</span>
                        </span>
                        <span className="font-bold">₹{user.loyaltyPoints}</span>
                      </div>
                    </div>

                    <div className="py-1 text-xs text-slate-700">
                      <button
                        onClick={() => { setCurrentView('trips'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-sand-50 flex items-center gap-2"
                      >
                        <Briefcase className="w-4 h-4 text-slate-500" />
                        <span>My Trips ({trips.length})</span>
                      </button>
                      <button
                        onClick={() => { setCurrentView('community'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-sand-50 flex items-center gap-2"
                      >
                        <Heart className="w-4 h-4 text-slate-500" />
                        <span>Liked Community Routes ({likedTripIds.length})</span>
                      </button>
                      <button
                        onClick={() => { setCurrentView('calendar'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-sand-50 flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>Itinerary Timeline</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-sand-100 px-2">
                      <button
                        onClick={() => { logout(); setShowProfileMenu(false); }}
                        className="w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-saffron-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentView('register')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white saffron-gradient rounded-xl shadow-sm hover:scale-105 transition-transform"
                >
                  Join Free
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
