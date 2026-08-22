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
  Briefcase,
  Crown
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
    <header className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur-md border-b border-navy-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Sidebar Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-slate-300 hover:text-gold-400 rounded-xl hover:bg-navy-800 transition-colors"
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl royal-gold-gradient flex items-center justify-center text-navy-950 shadow-md shadow-gold-500/25 group-hover:scale-105 transition-transform">
                <Crown className="w-5 h-5 text-navy-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-xl font-extrabold tracking-tight text-white">
                    Globe<span className="text-gold-400">Trotter</span>
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                    Royal Edition
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 hidden sm:block -mt-0.5">
                  Incredible India Itineraries & Budgeting
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
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-navy-800/80 hover:bg-navy-800 focus:bg-navy-950 border border-navy-700 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition-all text-white placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setShowSearchResults(false); }}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Autocomplete Results */}
            {showSearchResults && filteredCities.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-navy-900 rounded-2xl shadow-2xl border border-navy-700 py-2 z-50 animate-fade-in max-h-80 overflow-y-auto">
                <div className="px-3 py-1 text-[11px] font-semibold text-gold-400 uppercase tracking-wider">
                  Royal Destinations in India
                </div>
                {filteredCities.map(city => (
                  <button
                    key={city.id}
                    onClick={() => handleSelectCity(city.id)}
                    className="w-full px-3 py-2 flex items-center gap-3 hover:bg-navy-800 transition-colors text-left"
                  >
                    <img
                      src={city.heroImage}
                      alt={city.name}
                      className="w-10 h-10 rounded-lg object-cover border border-navy-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">{city.name}, {city.state}</p>
                        <span className="text-xs font-semibold text-gold-400">From ₹{city.startingPrice.toLocaleString('en-IN')}/day</span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">{city.tagline}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            
            {/* Currency Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-800 border border-gold-500/30 text-xs font-semibold text-gold-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
              <span>₹ INR</span>
            </div>

            {/* New Trip Quick Button */}
            <button
              onClick={() => startNewTripWizard()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-navy-950 royal-gold-gradient hover:opacity-95 rounded-xl shadow-md shadow-gold-500/20 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4 text-navy-950" />
              <span>Plan Trip</span>
            </button>

            {/* User Profile Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1 pl-2 bg-navy-800 hover:bg-navy-700 rounded-full border border-navy-700 transition-colors"
                  aria-label="User menu"
                >
                  <span className="text-xs font-medium text-slate-200 hidden lg:inline max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-gold-400"
                  />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-navy-900 rounded-2xl shadow-2xl border border-navy-700 py-3 z-50 animate-slide-up text-white">
                    <div className="px-4 py-2 border-b border-navy-800">
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center justify-between text-xs bg-navy-800 text-gold-300 px-2.5 py-1.5 rounded-lg border border-gold-500/30">
                        <span className="flex items-center gap-1">
                          <Crown className="w-3.5 h-3.5 text-gold-400" />
                          <span>Royal Travel Points</span>
                        </span>
                        <span className="font-bold text-gold-400">₹{user.loyaltyPoints}</span>
                      </div>
                    </div>

                    <div className="py-1 text-xs text-slate-300">
                      <button
                        onClick={() => { setCurrentView('trips'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-navy-800 flex items-center gap-2"
                      >
                        <Briefcase className="w-4 h-4 text-gold-400" />
                        <span>My Trips ({trips.length})</span>
                      </button>
                      <button
                        onClick={() => { setCurrentView('community'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-navy-800 flex items-center gap-2"
                      >
                        <Heart className="w-4 h-4 text-gold-400" />
                        <span>Liked Routes ({likedTripIds.length})</span>
                      </button>
                      <button
                        onClick={() => { setCurrentView('calendar'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-navy-800 flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-gold-400" />
                        <span>Itinerary Timeline</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-navy-800 px-2">
                      <button
                        onClick={() => { logout(); setShowProfileMenu(false); }}
                        className="w-full px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors flex items-center gap-2"
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
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-gold-400 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentView('register')}
                  className="px-3.5 py-1.5 text-xs font-bold text-navy-950 royal-gold-gradient rounded-xl shadow-sm hover:scale-105 transition-transform"
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
