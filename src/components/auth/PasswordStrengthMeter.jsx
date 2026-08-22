import React from 'react';
import { Check, X } from 'lucide-react';

export default function PasswordStrengthMeter({ validation }) {
  if (!validation) return null;

  const { score, label, color, checks } = validation;

  return (
    <div className="mt-2 space-y-2">
      {/* 4-Segment Strength Bar */}
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4].map((barIndex) => (
          <div
            key={barIndex}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              score >= barIndex ? color : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-500">Strength:</span>
        <span className="font-semibold text-slate-700">{label}</span>
      </div>

      {/* Live Criteria Checklist */}
      <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
        <div className={`flex items-center gap-1.5 ${checks.minLength ? 'text-emerald-600' : 'text-slate-400'}`}>
          {checks.minLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
          <span>8+ Characters</span>
        </div>
        <div className={`flex items-center gap-1.5 ${checks.hasUpper ? 'text-emerald-600' : 'text-slate-400'}`}>
          {checks.hasUpper ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
          <span>Uppercase (A-Z)</span>
        </div>
        <div className={`flex items-center gap-1.5 ${checks.hasLower ? 'text-emerald-600' : 'text-slate-400'}`}>
          {checks.hasLower ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
          <span>Lowercase (a-z)</span>
        </div>
        <div className={`flex items-center gap-1.5 ${checks.hasNumber && checks.hasSpecial ? 'text-emerald-600' : 'text-slate-400'}`}>
          {checks.hasNumber && checks.hasSpecial ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
          <span>Number & Special (!@#)</span>
        </div>
      </div>
    </div>
  );
}
