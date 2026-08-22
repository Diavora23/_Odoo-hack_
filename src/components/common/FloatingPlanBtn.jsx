import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Sparkles } from 'lucide-react';

export default function FloatingPlanBtn() {
  const { startNewTripWizard, currentView } = useApp();

  // Hide on wizard view to avoid redundancy
  if (currentView === 'wizard') return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => startNewTripWizard()}
        className="group flex items-center gap-2.5 px-5 py-3.5 saffron-gradient text-white rounded-full shadow-2xl shadow-saffron-500/40 hover:shadow-saffron-500/60 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
        aria-label="Plan New Trip"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform">
          <Plus className="w-4 h-4 text-white" />
        </div>
        <span className="font-heading font-bold text-sm tracking-wide">
          + Plan New Trip
        </span>
        <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
      </button>
    </div>
  );
}
