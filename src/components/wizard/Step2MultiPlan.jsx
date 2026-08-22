import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';
import { 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Hotel, 
  Car, 
  Plane
} from 'lucide-react';

export default function Step2MultiPlan({ onBack, onNext }) {
  const { wizardState, setWizardState, showToast } = useApp();

  const plans = wizardState.generatedPlans || [];
  const [selectedPlanId, setSelectedPlanId] = useState(
    wizardState.selectedPlan?.planId || plans[0]?.planId || ''
  );

  const selectedPlan = plans.find(p => p.planId === selectedPlanId) || plans[0];

  const handlePlanSelection = (plan) => {
    setSelectedPlanId(plan.planId);
  };

  const handleProceedToCustomization = () => {
    if (!selectedPlan) return;

    setWizardState(prev => ({
      ...prev,
      step: 3,
      selectedPlan,
      customizedItinerary: {
        ...selectedPlan,
        tripTitle: selectedPlan.title,
      }
    }));

    showToast(
      'success',
      'Plan Selected!',
      `Proceeding to customize your ${selectedPlan.durationDays}-Day itinerary for ${selectedPlan.cityName}.`
    );
    if (onNext) onNext();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-slide-up">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#e0effe] text-[#008cff] border border-[#bae0fd]">
          Step 2 of 3: AI Plan Selection
        </span>
        <h2 className="text-3xl font-extrabold font-heading text-slate-900">
          Choose Your Holiday Package for {wizardState.selectedPlan?.cityName || 'India'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          We’ve built 4 custom itineraries for {wizardState.durationDays} days and {wizardState.travelers} travelers with live INR estimates.
        </p>
      </div>

      {/* 4 Multi-Tier Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {plans.map((plan) => {
          const isSelected = selectedPlanId === plan.planId;
          const isRecommended = plan.isRecommended;

          return (
            <div
              key={plan.planId}
              onClick={() => handlePlanSelection(plan)}
              className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                isSelected
                  ? 'bg-white border-[#008cff] shadow-2xl ring-2 ring-[#008cff] -translate-y-1.5'
                  : 'bg-white/90 hover:bg-white border-slate-200 shadow-sm hover:shadow-xl'
              }`}
            >
              {/* Recommended Badge (MMT Red) */}
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#e41d24] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Curated Best Value</span>
                </div>
              )}

              <div className="space-y-4">
                
                {/* Header info */}
                <div className="pt-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f0f7ff] text-[#008cff]">
                    {plan.badge}
                  </span>
                  <h3 className="text-lg font-heading font-extrabold text-slate-900 mt-2">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display in ₹ INR */}
                <div className="p-3.5 rounded-2xl bg-[#f4f7fa] border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Total Estimated Cost
                  </div>
                  <div className="text-2xl font-extrabold font-heading text-slate-900 mt-0.5">
                    {formatINR(plan.costs.grandTotal)}
                  </div>
                  <div className="text-[11px] text-[#008cff] font-bold mt-0.5">
                    {formatINR(plan.costs.perPerson)} per traveler
                  </div>
                </div>

                {/* Inclusions */}
                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex items-start gap-2 text-slate-800">
                    <Hotel className="w-4 h-4 text-[#008cff] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">{plan.hotel.type}: </span>
                      <span className="text-slate-500">{plan.hotel.name} (₹{plan.hotel.pricePerNight.toLocaleString('en-IN')}/nt)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-slate-800">
                    <Car className="w-4 h-4 text-[#008cff] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Transport: </span>
                      <span className="text-slate-500">{plan.transportMode}</span>
                    </div>
                  </div>
                </div>

                {/* Highlight Checkmarks */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  {plan.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#e0effe] text-[#008cff] flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 font-bold" />
                      </div>
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Select Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => handlePlanSelection(plan)}
                  className={`w-full py-2.5 rounded-full font-bold text-xs font-heading transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#008cff] to-[#006ed6] text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {isSelected ? '✓ Selected Plan' : 'Select Plan'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 bg-white border border-slate-300 text-slate-800 rounded-full text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Setup</span>
        </button>

        <button
          type="button"
          onClick={handleProceedToCustomization}
          className="px-8 py-3 bg-gradient-to-r from-[#e41d24] to-[#ff4d52] hover:from-[#d11218] hover:to-[#e41d24] text-white font-heading font-extrabold text-sm rounded-full shadow-xl shadow-red-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <span>Customize Itinerary (Step 3)</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
}
