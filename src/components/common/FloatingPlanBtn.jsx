import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Plane } from 'lucide-react';

export default function FloatingPlanBtn() {
  const { startNewTripWizard, currentView } = useApp();

  // Hide on wizard view to avoid redundancy
  if (currentView === 'wizard') return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => startNewTripWizard()}
        className="group flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#e41d24] to-[#ff4d52] hover:from-[#d11218] hover:to-[#e41d24] text-white rounded-full shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 font-heading font-extrabold text-sm"
        aria-label="Plan New Holiday"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform">
          <Plus className="w-4 h-4 text-white" />
        </div>
        <span className="tracking-wide">
          + Plan New Holiday
        </span>
        <Plane className="w-4 h-4 text-white transform -rotate-45" />
      </button>
    </div>
  );
}
