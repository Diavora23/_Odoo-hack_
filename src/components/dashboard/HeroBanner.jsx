import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Sparkles, MapPin, Compass, Crown, ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  const { startNewTripWizard } = useApp();

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-navy-700 bg-navy-950 text-white min-h-[440px] flex flex-col justify-between p-6 sm:p-10">
      
      {/* Background Image Overlay with Royal Indian Heritage Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80"
          alt="Royal Indian Heritage"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/60 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl space-y-4">
        
        {/* Royal Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-bold tracking-wide backdrop-blur-md">
          <Crown className="w-3.5 h-3.5 text-gold-400" />
          <span>Royal Indian Expeditions • Incredible India</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
          Journey Through the Splendors of <span className="text-gradient-gold">Royal India</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
          From the marble palace havelis of Rajasthan to the serene backwaters of Kerala and mystical Varanasi ghats. Multi-tier custom itineraries calculated in <strong>₹ Indian Rupees</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => startNewTripWizard('jaipur')}
            className="px-6 py-3.5 royal-gold-gradient hover:opacity-95 text-navy-950 font-heading font-extrabold text-sm rounded-2xl shadow-xl shadow-gold-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
          >
            <Compass className="w-5 h-5 text-navy-950" />
            <span>Generate 3-Step AI Itinerary</span>
            <ArrowRight className="w-4 h-4 text-navy-950" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('featured-destinations');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-3.5 bg-navy-800/80 hover:bg-navy-800 text-gold-300 font-semibold text-sm rounded-2xl backdrop-blur-md border border-gold-500/30 transition-all"
          >
            Explore 7 Iconic Cities
          </button>
        </div>

      </div>

      {/* Feature Badges at Bottom */}
      <div className="relative z-10 pt-6 mt-6 border-t border-navy-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">₹</div>
          <span>100% Rupee (₹) Pricing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold">14</div>
          <span>Max 14-Day Trip Limit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">☀️</div>
          <span>5-Day Climate Advice</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">👑</div>
          <span>Heritage Palace Stays</span>
        </div>
      </div>

    </div>
  );
}
