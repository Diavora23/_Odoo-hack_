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
  Plane,
  Luggage,
  Compass
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { currentView, setCurrentView, trips, activeTrip, startNewTripWizard } = useApp();

  const navItems = [
    {
      id: 'home',
      label: 'Explore India',
      icon: Home,
      badge: null,
      desc: 'Top Holiday Destinations'
    },
    {
      id: 'trips',
      label: 'My Bookings & Trips',
      icon: Luggage,
      badge: trips.length > 0 ? trips.length : null,
      desc: 'Active & Saved Plans'
    },
    {
      id: 'wizard',
      label: 'Plan New Holiday',
      icon: PlusCircle,
      badge: '3-Step AI',
      badgeColor: 'bg-[#e0effe] text-[#008cff] border-[#bae0fd]',
      desc: 'Instant Custom Itinerary',
      action: () => startNewTripWizard()
    },
    {
      id: 'calendar',
      label: 'Trip Calendar',
      icon: CalendarDays,
      badge: null,
      desc: 'Day-by-Day Schedule'
    },
    {
      id: 'community',
      label: 'Community Trips',
      icon: Users,
      badge: '1-Click Fork',
      badgeColor: 'bg-[#ffe1e2] text-[#e41d24] border-[#ffc8cb]',
      desc: 'Public Traveler Routes'
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#051329]/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto shadow-sm`}
      >
        <div className="p-4 space-y-6">
          
          {/* Main Navigation List */}
          <div className="space-y-1.5">
            <p className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Trip Services
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
                  className={`w-full group flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#008cff] to-[#006ed6] text-white font-bold shadow-md shadow-blue-500/25'
                      : 'text-slate-700 hover:bg-[#f0f7ff] hover:text-[#008cff]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#008cff]'}`} />
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight truncate">
                        {item.label}
                      </div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                        isActive
                          ? 'bg-white/20 text-white border-white/30'
                          : item.badgeColor || 'bg-slate-100 text-slate-600 border-slate-200'
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
            <div className="p-3.5 rounded-2xl bg-[#051329] border border-[#1b3d66] text-white shadow-md">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5 text-[#008cff]">
                  <Plane className="w-3.5 h-3.5" />
                  Active Holiday
                </span>
                <span className="text-[10px] bg-[#e41d24] text-white px-2 py-0.5 rounded-full font-bold">
                  {activeTrip.status}
                </span>
              </div>
              <p className="text-xs font-bold text-white truncate">{activeTrip.tripTitle}</p>
              <p className="text-[11px] text-slate-300 mt-0.5">{activeTrip.cityName}, {activeTrip.durationDays} Days</p>
              <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[#1b3d66]">
                <span className="font-extrabold text-[#7cc5fb] font-heading">
                  ₹{(activeTrip.totalBudget || 0).toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => { setCurrentView('calendar'); if (onClose) onClose(); }}
                  className="text-[11px] font-bold text-white hover:text-[#008cff] flex items-center gap-0.5"
                >
                  <span>View Timeline</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* MMT Trip Guarantee Badge */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#f0f7ff] to-[#e0effe] border border-[#bae0fd]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0057ab]">
              <Sparkles className="w-4 h-4 text-[#008cff]" />
              <span>MakeMyTrip Assurance</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              100% verified Indian stays, live INR budgeting, and instant customizable plans.
            </p>
          </div>

        </div>

        {/* Sidebar Footer info */}
        <div className="p-4 border-t border-slate-200 text-[11px] text-slate-400 flex items-center justify-between font-semibold">
          <span>GlobeTrotter MMT</span>
          <span className="text-[#e41d24] font-bold">100% INR (₹)</span>
        </div>
      </aside>
    </>
  );
}
