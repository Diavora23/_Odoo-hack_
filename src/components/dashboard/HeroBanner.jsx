import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Sparkles, MapPin, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  const { startNewTripWizard } = useApp();
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = [
    { label: 'All Destinations', category: 'All' },
    { label: '🏰 Royal Heritage', category: 'Heritage' },
    { label: '🏖️ Coastal & Beaches', category: 'Beaches' },
    { label: '🏔️ Himalayan Peaks', category: 'Mountains' },
    { label: '🕉️ Sacred Ghats', category: 'Spiritual' },
    { label: '🌿 Backwaters & Tea', category: 'Nature' },
  ];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-sand-200 bg-slate-900 text-white min-h-[440px] flex flex-col justify-between p-6 sm:p-10">
      
      {/* Background Image Overlay with Indian Heritage Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80"
          alt="Incredible India Heritage"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl space-y-4">
        
        {/* Incredible India Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron-500/20 border border-saffron-400/40 text-saffron-300 text-xs font-bold tracking-wide backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
          <span>Dekho Apna Desh • Incredible India</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
          Plan Your Dream Journey Across <span className="text-gradient-saffron">Incredible India</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
          From the golden palaces of Rajasthan to the serene backwaters of Kerala and sacred ghats of Kashi. Multi-tier customized itineraries calculated in <strong>₹ Indian Rupees</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => startNewTripWizard('jaipur')}
            className="px-6 py-3.5 saffron-gradient hover:opacity-95 text-white font-heading font-bold text-sm rounded-2xl shadow-xl shadow-saffron-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
          >
            <Compass className="w-5 h-5 animate-pulse-subtle" />
            <span>Generate 3-Step AI Itinerary</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('featured-destinations');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-2xl backdrop-blur-md border border-white/20 transition-all"
          >
            Explore 7 Top Cities
          </button>
        </div>

      </div>

      {/* Feature Badges at Bottom */}
      <div className="relative z-10 pt-6 mt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-saffron-500/20 text-saffron-400 flex items-center justify-center font-bold">₹</div>
          <span>100% Rupee (₹) Pricing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indiaTeal-500/20 text-indiaTeal-400 flex items-center justify-center font-bold">14</div>
          <span>Max 14-Day Trip Control</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">🌤️</div>
          <span>Live Weather Insights</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">🍴</div>
          <span>Regional Culinary Spots</span>
        </div>
      </div>

    </div>
  );
}
