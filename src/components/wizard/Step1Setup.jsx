import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_CITIES } from '../../data/indianCities';
import { 
  validateTripDates, 
  validateTravelers, 
  validateBudget, 
  getTodayDateString 
} from '../../utils/validation';
import { generatePlansForCity } from '../../utils/planGenerator';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  IndianRupee,
  Luggage,
  Info
} from 'lucide-react';

export default function Step1Setup({ onNext }) {
  const { wizardState, setWizardState, showToast } = useApp();

  const todayStr = getTodayDateString();

  const [cityId, setCityId] = useState(wizardState.cityId || 'jaipur');
  const [startDate, setStartDate] = useState(wizardState.startDate || todayStr);
  const [endDate, setEndDate] = useState(wizardState.endDate || (() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  })());
  const [travelers, setTravelers] = useState(wizardState.travelers || 2);
  const [customBudget, setCustomBudget] = useState(wizardState.customBudget || 40000);
  const [travelStyle, setTravelStyle] = useState(wizardState.travelStyle || 'balanced');

  // Validation States
  const [dateError, setDateError] = useState('');
  const [travelersError, setTravelersError] = useState('');
  const [budgetError, setBudgetError] = useState('');
  const [durationDays, setDurationDays] = useState(5);

  // Live validate dates whenever startDate or endDate changes
  useEffect(() => {
    const dateResult = validateTripDates(startDate, endDate);
    if (!dateResult.isValid) {
      setDateError(dateResult.error);
      setDurationDays(dateResult.durationDays > 0 ? dateResult.durationDays : 0);
    } else {
      setDateError('');
      setDurationDays(dateResult.durationDays);
    }
  }, [startDate, endDate]);

  // Live validate travelers
  const handleTravelersChange = (val) => {
    setTravelers(val);
    const result = validateTravelers(val);
    setTravelersError(result.error);
  };

  // Live validate custom budget
  const handleBudgetChange = (val) => {
    setCustomBudget(val);
    const result = validateBudget(val);
    setBudgetError(result.error);
  };

  const selectedCity = INDIAN_CITIES.find(c => c.id === cityId) || INDIAN_CITIES[0];

  const handleSubmitStep1 = (e) => {
    e.preventDefault();

    // Re-verify strictly
    const dateVal = validateTripDates(startDate, endDate);
    const travelersVal = validateTravelers(travelers);
    const budgetVal = validateBudget(customBudget);

    if (!dateVal.isValid) {
      setDateError(dateVal.error);
      showToast('error', 'Date Validation Issue', dateVal.error);
      return;
    }
    if (!travelersVal.isValid) {
      setTravelersError(travelersVal.error);
      showToast('error', 'Traveler Count Error', travelersVal.error);
      return;
    }
    if (!budgetVal.isValid) {
      setBudgetError(budgetVal.error);
      showToast('error', 'Budget Error', budgetVal.error);
      return;
    }

    // Generate multi-plans
    const generated = generatePlansForCity(cityId, startDate, dateVal.durationDays, parseInt(travelers, 10));

    setWizardState(prev => ({
      ...prev,
      step: 2,
      cityId,
      startDate,
      endDate,
      durationDays: dateVal.durationDays,
      travelers: parseInt(travelers, 10),
      customBudget: Number(customBudget),
      travelStyle,
      generatedPlans: generated,
      selectedPlan: generated.find(p => p.planType === travelStyle) || generated[0],
    }));

    showToast('success', 'Plans Generated!', `Created 4 tailored itineraries for ${selectedCity.name}.`);
    if (onNext) onNext();
  };

  const isFormValid = !dateError && !travelersError && !budgetError && durationDays >= 1 && durationDays <= 14;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
      
      {/* Step Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-saffron-100 text-saffron-800 border border-saffron-200">
          Step 1 of 3: Trip Parameters
        </span>
        <h2 className="text-3xl font-extrabold font-heading text-slate-900">
          Where & When Are You Traveling?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Enter destination and dates. Our AI generator builds multi-tier plans with live INR budgeting.
        </p>
      </div>

      <form onSubmit={handleSubmitStep1} className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-sand-200 space-y-8">
        
        {/* City Destination Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-saffron-500" />
              <span>Select Destination City in India</span>
            </span>
            <span className="text-[11px] text-slate-400 font-normal">7 Popular Cities</span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {INDIAN_CITIES.map(city => {
              const isSelected = city.id === cityId;
              return (
                <button
                  type="button"
                  key={city.id}
                  onClick={() => setCityId(city.id)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-2 group ${
                    isSelected
                      ? 'saffron-gradient text-white border-transparent shadow-lg shadow-saffron-500/30 scale-102'
                      : 'bg-sand-50 hover:bg-sand-100/80 text-slate-800 border-sand-200'
                  }`}
                >
                  <img
                    src={city.heroImage}
                    alt={city.name}
                    className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="text-xs font-bold truncate leading-tight">
                      {city.name}
                    </div>
                    <div className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                      ₹{city.startingPrice.toLocaleString('en-IN')}/d
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected City Snippet */}
        <div className="p-4 rounded-2xl bg-sand-100/60 border border-sand-200 flex items-center gap-3">
          <img
            src={selectedCity.heroImage}
            alt={selectedCity.name}
            className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">{selectedCity.name}, {selectedCity.state}</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indiaTeal-100 text-indiaTeal-800">
                {selectedCity.category}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{selectedCity.tagline}</p>
            <p className="text-[11px] text-amber-700 font-semibold mt-1">
              ☀️ Best Time: {selectedCity.bestTimeToVisit}
            </p>
          </div>
        </div>

        {/* Dates Section with Strict Validation & 14-Day Limit Banner */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Start Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indiaTeal-600" />
                <span>Start Date (Departure)</span>
              </label>
              <input
                type="date"
                min={todayStr}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-saffron-500 font-medium text-slate-800"
              />
              <p className="text-[10px] text-slate-400 mt-1">Cannot be prior to today ({todayStr})</p>
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indiaTeal-600" />
                <span>End Date (Return)</span>
              </label>
              <input
                type="date"
                min={startDate || todayStr}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`w-full px-4 py-2.5 text-sm bg-sand-50 border rounded-xl focus:outline-none focus:ring-2 font-medium text-slate-800 ${
                  dateError
                    ? 'border-red-400 focus:ring-red-300 bg-red-50/20'
                    : 'border-sand-300 focus:ring-saffron-400 focus:border-saffron-500'
                }`}
              />
              <p className="text-[10px] text-slate-400 mt-1">Must be on or after Start Date</p>
            </div>

          </div>

          {/* Live Duration Calculation Badge */}
          {durationDays > 0 && !dateError && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Trip Duration: <strong>{durationDays} Days / {Math.max(1, durationDays - 1)} Nights</strong> (Compliant with 14-day limit)
              </span>
            </div>
          )}

          {/* Strict 14-Day Limit & Date Error Display */}
          {dateError && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 animate-fade-in">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Date Restriction Error</p>
                <p className="text-[11px] mt-0.5">{dateError}</p>
              </div>
            </div>
          )}
        </div>

        {/* Travelers & Custom Budget Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Travelers Count (1 to 20 Strict) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-saffron-600" />
                <span>Travelers Count</span>
              </span>
              <span className="text-[11px] text-slate-400">1 – 20 people</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleTravelersChange(Math.max(1, Number(travelers) - 1))}
                className="w-10 h-10 rounded-xl bg-sand-100 hover:bg-sand-200 border border-sand-300 font-bold text-slate-700 text-lg flex items-center justify-center"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max="20"
                value={travelers}
                onChange={(e) => handleTravelersChange(e.target.value)}
                className={`flex-1 text-center py-2 text-sm font-bold bg-sand-50 border rounded-xl focus:outline-none focus:ring-2 ${
                  travelersError ? 'border-red-400' : 'border-sand-300 focus:ring-saffron-400'
                }`}
              />
              <button
                type="button"
                onClick={() => handleTravelersChange(Math.min(20, Number(travelers) + 1))}
                className="w-10 h-10 rounded-xl bg-sand-100 hover:bg-sand-200 border border-sand-300 font-bold text-slate-700 text-lg flex items-center justify-center"
              >
                +
              </button>
            </div>
            {travelersError && (
              <p className="text-[11px] text-red-500 font-medium mt-1">{travelersError}</p>
            )}
          </div>

          {/* Custom Budget in ₹ (> 0 Strict) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-indiaTeal-600" />
                <span>Target Budget (₹ INR)</span>
              </span>
              <span className="text-[11px] text-slate-400">Total for group</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="1000"
                step="500"
                value={customBudget}
                onChange={(e) => handleBudgetChange(e.target.value)}
                placeholder="e.g. 45000"
                className={`w-full pl-9 pr-4 py-2.5 text-sm bg-sand-50 border rounded-xl focus:outline-none focus:ring-2 font-medium ${
                  budgetError ? 'border-red-400' : 'border-sand-300 focus:ring-saffron-400'
                }`}
              />
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">₹</span>
            </div>
            {budgetError ? (
              <p className="text-[11px] text-red-500 font-medium mt-1">{budgetError}</p>
            ) : (
              <p className="text-[10px] text-slate-400 mt-1">
                Avg. ₹{Math.round((customBudget || 0) / Math.max(1, travelers)).toLocaleString('en-IN')} per person
              </p>
            )}
          </div>

        </div>

        {/* Travel Style Preference */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
            <Luggage className="w-4 h-4 text-purple-600" />
            <span>Preferred Travel Theme & Pace</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'balanced', label: 'Balanced Explorer', desc: 'Heritage Stays + AC Cab', icon: '🏛️' },
              { id: 'budget', label: 'Budget Backpacker', desc: 'Hostels + Local Transit', icon: '🎒' },
              { id: 'luxury', label: 'Luxury Heritage', desc: '5-Star Palaces + Private Guide', icon: '👑' },
              { id: 'cultural', label: 'Cultural & Artisan', desc: 'Workshops + Sacred Trails', icon: '🎨' },
            ].map(style => (
              <button
                type="button"
                key={style.id}
                onClick={() => setTravelStyle(style.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  travelStyle === style.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-sand-50 hover:bg-sand-100 text-slate-800 border-sand-200'
                }`}
              >
                <div className="text-lg mb-1">{style.icon}</div>
                <div className="text-xs font-bold leading-tight">{style.label}</div>
                <div className={`text-[10px] mt-0.5 ${travelStyle === style.id ? 'text-slate-300' : 'text-slate-500'}`}>
                  {style.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Step 1 Button */}
        <div className="pt-4 border-t border-sand-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <Info className="w-4 h-4 text-indiaTeal-600" />
            <span>Instant multi-plan options generated in Step 2</span>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-8 py-3.5 font-heading font-bold text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2 ${
              isFormValid
                ? 'saffron-gradient text-white hover:opacity-95 hover:scale-105 shadow-saffron-500/25 active:scale-95 cursor-pointer'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Generate Multi-Plans</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
}
