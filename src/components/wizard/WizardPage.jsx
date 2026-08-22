import React from 'react';
import { useApp } from '../../context/AppContext';
import Step1Setup from './Step1Setup';
import Step2MultiPlan from './Step2MultiPlan';
import Step3Itinerary from './Step3Itinerary';
import { Check, Compass, Sparkles } from 'lucide-react';

export default function WizardPage() {
  const { wizardState, setWizardState } = useApp();
  const currentStep = wizardState.step || 1;

  const steps = [
    { number: 1, title: 'Trip Setup', desc: 'City, Dates & Travelers' },
    { number: 2, title: 'Multi-Plan Tiers', desc: 'Backpacker to Luxury' },
    { number: 3, title: 'Customize & Save', desc: 'Live Recalculator & Map' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* 3-Step Wizard Navigation Stepper */}
      <div className="max-w-3xl mx-auto bg-white p-4 rounded-3xl border border-sand-200 shadow-sm">
        <div className="flex items-center justify-between relative">
          
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-sand-200 z-0" />
          <div
            className="absolute top-1/2 left-8 -translate-y-1/2 h-1 bg-saffron-500 transition-all duration-500 z-0"
            style={{
              width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'
            }}
          />

          {steps.map((s) => {
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;

            return (
              <div
                key={s.number}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
                onClick={() => {
                  if (s.number < currentStep) {
                    setWizardState(prev => ({ ...prev, step: s.number }));
                  }
                }}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-heading font-extrabold text-sm transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-md'
                      : isCurrent
                      ? 'saffron-gradient text-white shadow-xl shadow-saffron-500/30 scale-110 ring-4 ring-saffron-100'
                      : 'bg-sand-100 text-slate-400 border border-sand-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : s.number}
                </div>
                <span className={`text-xs font-bold mt-2 ${isCurrent ? 'text-slate-900' : 'text-slate-500'}`}>
                  {s.title}
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:block">
                  {s.desc}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* Render Current Step Component */}
      {currentStep === 1 && (
        <Step1Setup onNext={() => setWizardState(prev => ({ ...prev, step: 2 }))} />
      )}

      {currentStep === 2 && (
        <Step2MultiPlan
          onBack={() => setWizardState(prev => ({ ...prev, step: 1 }))}
          onNext={() => setWizardState(prev => ({ ...prev, step: 3 }))}
        />
      )}

      {currentStep === 3 && (
        <Step3Itinerary
          onBack={() => setWizardState(prev => ({ ...prev, step: 2 }))}
        />
      )}

    </div>
  );
}
