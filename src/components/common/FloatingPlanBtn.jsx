import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Crown } from 'lucide-react';

export default function FloatingPlanBtn() {
  const { startNewTripWizard, currentView } = useApp();

  // Hide on wizard view to avoid redundancy
  if (currentView === 'wizard') return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => startNewTripWizard()}
        className="group flex items-center gap-2.5 px-5 py-3.5 royal-gold-gradient text-navy-950 rounded-full shadow-2xl shadow-gold-500/40 hover:shadow-gold-500/60 hover:scale-105 active:scale-95 transition-all duration-200 border border-gold-300/40 font-heading font-extrabold text-sm"
        aria-label="Plan New Trip"
      >
        <div className="w-6 h-6 rounded-full bg-navy-950/20 flex items-center justify-center group-hover:rotate-90 transition-transform">
          <Plus className="w-4 h-4 text-navy-950" />
        </div>
        <span className="tracking-wide">
          + Plan New Journey
        </span>
        <Crown className="w-3.5 h-3.5 text-navy-900 animate-pulse" />
      </button>
    </div>
  );
}
