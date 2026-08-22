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
  Plane,
  Luggage
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
    <header className="sticky top-0 z-40 bg-[#051329] border-b border-[#0a2240] text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Sidebar Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              {/* MakeMyTrip Style Red Circular Logo Badge */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#e41d24] to-[#ff4d52] flex items-center justify-center text-white shadow-lg shadow-red-500/30 group-hover:scale-105 transition-transform">
                <Plane className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-xl font-extrabold tracking-tight text-white">
                    Globe<span className="text-[#008cff]">Trotter</span>
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#008cff]/20 text-[#7cc5fb] border border-[#008cff]/30">
                    MMT Edition
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 hidden sm:block -mt-0.5">
                  Incredible India Itineraries & Budgeting
                </p>
              </div>
            </button>
          </div>

          {/* MakeMyTrip Search Bar with Autocomplete Dropdown */}
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
                placeholder="Where to? (Jaipur, Goa, Varanasi, Manali, Kerala...)"
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#0a2240] hover:bg-[#0d2a4e] focus:bg-[#0a1f38] border border-[#1b3d66] rounded-full focus:outline-none focus:ring-2 focus:ring-[#008cff]/50 focus:border-[#008cff] transition-all text-white placeholder-slate-400 shadow-inner"
              />
              <Search className="w-4 h-4 text-[#008cff] absolute left-3.5 top-2.5" />
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
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-fade-in max-h-80 overflow-y-auto text-slate-900">
                <div className="px-3 py-1 text-[11px] font-bold text-[#008cff] uppercase tracking-wider">
                  Popular Indian Destinations
                </div>
                {filteredCities.map(city => (
                  <button
                    key={city.id}
                    onClick={() => handleSelectCity(city.id)}
                    className="w-full px-3 py-2 flex items-center gap-3 hover:bg-[#f0f7ff] transition-colors text-left"
                  >
                    <img
                      src={city.heroImage}
                      alt={city.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900">{city.name}, {city.state}</p>
                        <span className="text-xs font-bold text-[#e41d24]">From ₹{city.startingPrice.toLocaleString('en-IN')}/day</span>
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
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a2240] border border-[#1b3d66] text-xs font-bold text-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#008cff] animate-pulse"></span>
              <span>₹ INR</span>
            </div>

            {/* MakeMyTrip Style Blue/Red "Plan Trip" Button */}
            <button
              onClick={() => startNewTripWizard()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-[#008cff] to-[#006ed6] hover:from-[#007fe6] hover:to-[#005ebd] rounded-full shadow-md shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>+ Plan Trip</span>
            </button>

            {/* User Profile Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1 pl-2 bg-[#0a2240] hover:bg-[#0d2a4e] rounded-full border border-[#1b3d66] transition-colors"
                  aria-label="User menu"
                >
                  <span className="text-xs font-bold text-slate-200 hidden lg:inline max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#008cff]"
                  />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-slide-up text-slate-900">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center justify-between text-xs bg-[#f0f7ff] text-[#008cff] px-2.5 py-1.5 rounded-lg border border-[#bae0fd]">
                        <span className="flex items-center gap-1 font-bold">
                          <Luggage className="w-3.5 h-3.5" />
                          <span>MMT Trip Wallet</span>
                        </span>
                        <span className="font-extrabold text-[#e41d24]">₹{user.loyaltyPoints}</span>
                      </div>
                    </div>

                    <div className="py-1 text-xs text-slate-700 font-semibold">
                      <button
                        onClick={() => { setCurrentView('trips'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-[#f0f7ff] hover:text-[#008cff] flex items-center gap-2 transition-colors"
                      >
                        <Briefcase className="w-4 h-4 text-[#008cff]" />
                        <span>My Trips ({trips.length})</span>
                      </button>
                      <button
                        onClick={() => { setCurrentView('community'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-[#f0f7ff] hover:text-[#008cff] flex items-center gap-2 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-[#e41d24]" />
                        <span>Liked Itineraries ({likedTripIds.length})</span>
                      </button>
                      <button
                        onClick={() => { setCurrentView('calendar'); setShowProfileMenu(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-[#f0f7ff] hover:text-[#008cff] flex items-center gap-2 transition-colors"
                      >
                        <Calendar className="w-4 h-4 text-[#008cff]" />
                        <span>Trip Timeline</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-100 px-2">
                      <button
                        onClick={() => { logout(); setShowProfileMenu(false); }}
                        className="w-full px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2"
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
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentView('register')}
                  className="px-3.5 py-1.5 text-xs font-extrabold text-white bg-gradient-to-r from-[#e41d24] to-[#ff4d52] hover:opacity-95 rounded-full shadow-md shadow-red-500/20 hover:scale-105 transition-transform"
                >
                  Create Account
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
