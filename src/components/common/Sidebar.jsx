import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  MapPin, 
  PlusCircle, 
  CalendarDays, 
  Users, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Map
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { currentView, setCurrentView, trips, activeTrip, startNewTripWizard } = useApp();

  const navItems = [
    {
      id: 'home',
      label: 'Home & Explore',
      icon: Home,
      badge: null,
      desc: 'Destinations & Highlights'
    },
    {
      id: 'trips',
      label: 'My Trips',
      icon: MapPin,
      badge: trips.length > 0 ? trips.length : null,
      desc: 'Active & Saved Itineraries'
    },
    {
      id: 'wizard',
      label: 'Plan New Journey',
      icon: PlusCircle,
      badge: '3-Step AI',
      badgeColor: 'bg-saffron-100 text-saffron-700 border-saffron-200',
      desc: 'Custom Itinerary Builder',
      action: () => startNewTripWizard()
    },
    {
      id: 'calendar',
      label: 'Trip Timeline',
      icon: CalendarDays,
      badge: null,
      desc: 'Day-by-Day Schedule'
    },
    {
      id: 'community',
      label: 'Community Hub',
      icon: Users,
      badge: 'Fork Trips',
      badgeColor: 'bg-indiaTeal-100 text-indiaTeal-800 border-indiaTeal-200',
      desc: 'Public Routes & Social Feed'
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-sand-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div className="p-4 space-y-6">
          
          {/* Main Navigation List */}
          <div className="space-y-1.5">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      setCurrentView(item.id);
                    }
                    if (onClose) onClose();
                  }}
                  className={`w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'saffron-gradient text-white font-semibold shadow-md shadow-saffron-500/20'
                      : 'text-slate-700 hover:bg-sand-100/80 hover:text-saffron-600'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-saffron-500'}`} />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold leading-tight truncate">
                        {item.label}
                      </div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isActive
                          ? 'bg-white/20 text-white border-white/30'
                          : item.badgeColor || 'bg-sand-200 text-slate-700 border-sand-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Trip Quick Widget */}
          {activeTrip && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-sand-100 to-sand-50 border border-sand-200">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5 text-indiaTeal-700">
                  <span className="w-2 h-2 rounded-full bg-indiaTeal-500 animate-pulse"></span>
                  Active Journey
                </span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-sand-200 text-slate-600">
                  {activeTrip.status}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 truncate">{activeTrip.tripTitle}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{activeTrip.cityName}, {activeTrip.durationDays} Days</p>
              <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-sand-200/60">
                <span className="font-semibold text-slate-800">
                  ₹{(activeTrip.totalBudget || 0).toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => { setCurrentView('calendar'); if (onClose) onClose(); }}
                  className="text-[11px] font-semibold text-saffron-600 hover:text-saffron-700 flex items-center gap-0.5"
                >
                  <span>View Day 1</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Incredible India Cultural Snippet */}
          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/10 via-saffron-500/5 to-teal-500/10 border border-amber-200/60">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Atithi Devo Bhava</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              "The guest is equivalent to God." Discover handpicked heritage stays and authentic regional thalis.
            </p>
          </div>

        </div>

        {/* Sidebar Footer info */}
        <div className="p-4 border-t border-sand-200 text-[11px] text-slate-400 flex items-center justify-between">
          <span>GlobeTrotter v1.2</span>
          <span className="text-indiaTeal-600 font-semibold">100% Indian INR (₹)</span>
        </div>
      </aside>
    </>
  );
}
