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
  Crown
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
      badgeColor: 'bg-gold-500/20 text-gold-700 border-gold-400',
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
      badgeColor: 'bg-navy-800 text-gold-400 border-navy-700',
      desc: 'Public Routes & Social Feed'
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-sand-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto shadow-sm`}
      >
        <div className="p-4 space-y-6">
          
          {/* Main Navigation List */}
          <div className="space-y-1.5">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Royal Navigation
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
                      ? 'imperial-navy-gradient text-white font-semibold shadow-md shadow-navy-900/30'
                      : 'text-slate-700 hover:bg-sand-100/80 hover:text-navy-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-gold-400' : 'text-slate-400 group-hover:text-gold-600'}`} />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold leading-tight truncate">
                        {item.label}
                      </div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isActive
                          ? 'bg-gold-500/20 text-gold-300 border-gold-500/30'
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
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 border border-navy-700 text-white shadow-md">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5 text-gold-400">
                  <Crown className="w-3.5 h-3.5" />
                  Active Journey
                </span>
                <span className="text-[10px] bg-navy-800 px-2 py-0.5 rounded-full border border-navy-700 text-gold-300">
                  {activeTrip.status}
                </span>
              </div>
              <p className="text-xs font-bold text-white truncate">{activeTrip.tripTitle}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{activeTrip.cityName}, {activeTrip.durationDays} Days</p>
              <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-navy-700/80">
                <span className="font-extrabold text-gold-400 font-heading">
                  ₹{(activeTrip.totalBudget || 0).toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => { setCurrentView('calendar'); if (onClose) onClose(); }}
                  className="text-[11px] font-bold text-gold-300 hover:text-gold-200 flex items-center gap-0.5"
                >
                  <span>View Timeline</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Imperial India Cultural Snippet */}
          <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-300/60">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gold-900">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span>Royal Indian Heritage</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Experience the magnificence of Rajput forts, Mughal gardens, and tranquil backwaters in royal grandeur.
            </p>
          </div>

        </div>

        {/* Sidebar Footer info */}
        <div className="p-4 border-t border-sand-200 text-[11px] text-slate-400 flex items-center justify-between">
          <span>GlobeTrotter Royal</span>
          <span className="text-gold-700 font-bold">100% Indian INR (₹)</span>
        </div>
      </aside>
    </>
  );
}
