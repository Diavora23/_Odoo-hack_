import React from 'react';
import { formatINR } from '../../utils/formatters';
import { PieChart, Hotel, Utensils, Ticket, Car, IndianRupee } from 'lucide-react';

export default function ExpenseChart({ costBreakdown, totalBudget, travelers }) {
  if (!costBreakdown) return null;

  const { stays, food, activities, transport, total, perPerson, breakdownPercentages } = costBreakdown;

  const items = [
    {
      label: 'Heritage & Hotel Stays',
      amount: stays,
      percentage: breakdownPercentages?.stays || 35,
      color: 'bg-indiaTeal-500',
      textColor: 'text-indiaTeal-700',
      bgColor: 'bg-indiaTeal-50',
      icon: Hotel
    },
    {
      label: 'Dining & Food Walks',
      amount: food,
      percentage: breakdownPercentages?.food || 25,
      color: 'bg-amber-500',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      icon: Utensils
    },
    {
      label: 'Activities & Monuments',
      amount: activities,
      percentage: breakdownPercentages?.activities || 25,
      color: 'bg-saffron-500',
      textColor: 'text-saffron-700',
      bgColor: 'bg-saffron-50',
      icon: Ticket
    },
    {
      label: 'Local Transit & Cabs',
      amount: transport,
      percentage: breakdownPercentages?.transport || 15,
      color: 'bg-purple-500',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50',
      icon: Car
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-sand-200 shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-saffron-500/10 flex items-center justify-center">
            <PieChart className="w-5 h-5 text-saffron-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-heading text-slate-900">
              Live Expense Breakdown
            </h4>
            <p className="text-[11px] text-slate-500">
              Recalculated in real-time ({travelers || 1} travelers)
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-lg font-extrabold font-heading text-slate-900">
            {formatINR(total)}
          </span>
          <span className="text-[11px] text-saffron-600 font-semibold block -mt-1">
            {formatINR(perPerson)} / person
          </span>
        </div>
      </div>

      {/* Multi-Color Segmented Progress Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="h-3 w-full rounded-full bg-sand-200 flex overflow-hidden shadow-inner">
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{ width: `${item.percentage}%` }}
              className={`${item.color} h-full transition-all duration-500 hover:opacity-90`}
              title={`${item.label}: ${item.percentage}%`}
            />
          ))}
        </div>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-2.5 rounded-2xl border border-sand-200/80 ${item.bgColor} flex items-center justify-between gap-2`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-6 h-6 rounded-lg ${item.color} text-white flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-800 truncate leading-tight">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {item.percentage}% of total
                  </div>
                </div>
              </div>

              <div className="text-xs font-bold text-slate-900 font-heading text-right flex-shrink-0">
                {formatINR(item.amount)}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
