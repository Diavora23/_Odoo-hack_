import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Sparkles, MapPin, Compass, ArrowRight, Plane, Hotel, Luggage } from 'lucide-react';

export default function HeroBanner() {
  const { startNewTripWizard } = useApp();

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#0a2240] bg-[#051329] text-white min-h-[440px] flex flex-col justify-between p-6 sm:p-10">
      
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80"
          alt="Incredible India Travel"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105 hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051329] via-[#051329]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051329] via-[#0a2240]/70 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl space-y-4">
        
        {/* MakeMyTrip Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#008cff]/15 border border-[#008cff]/40 text-[#7cc5fb] text-xs font-bold tracking-wide backdrop-blur-md">
          <Plane className="w-3.5 h-3.5 text-[#008cff] transform -rotate-45" />
          <span>MakeMyTrip Inspired • Incredible India Holidays</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
          Explore the Magic of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008cff] to-[#7cc5fb]">Incredible India</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
          From Rajasthan's majestic havelis to the tropical backwaters of Kerala and snow-capped Manali peaks. Instant AI-tailored itineraries in <strong>₹ Indian Rupees</strong>.
        </p>

        {/* MMT Style CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => startNewTripWizard('jaipur')}
            className="px-7 py-3.5 bg-gradient-to-r from-[#e41d24] to-[#ff4d52] hover:from-[#d11218] hover:to-[#e41d24] text-white font-heading font-extrabold text-sm rounded-full shadow-xl shadow-red-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
          >
            <Compass className="w-5 h-5 text-white" />
            <span>Search & Plan Holiday</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('featured-destinations');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-3.5 bg-[#0a2240]/80 hover:bg-[#0d2a4e] text-white font-bold text-sm rounded-full backdrop-blur-md border border-[#1b3d66] transition-all"
          >
            View 7 Top Destinations
          </button>
        </div>

      </div>

      {/* Feature Badges at Bottom (MMT Style) */}
      <div className="relative z-10 pt-6 mt-6 border-t border-[#0a2240] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#008cff]/20 text-[#008cff] flex items-center justify-center font-bold">₹</div>
          <span>100% Rupee (₹) Pricing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
          <span>Instant AI Customization</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#e41d24]/20 text-[#e41d24] flex items-center justify-center font-bold">14</div>
          <span>Max 14-Day Limit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">☀️</div>
          <span>Live 5-Day Weather</span>
        </div>
      </div>

    </div>
  );
}
