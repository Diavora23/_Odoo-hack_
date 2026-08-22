import React from 'react';
import { Sparkles, Utensils, Luggage, Sun, HeartHandshake } from 'lucide-react';

export default function TravelTips() {
  const tips = [
    {
      icon: Utensils,
      title: "Regional Food Etiquette",
      desc: "Each Indian state has distinct culinary heritage. Always sample regional Thalis (Rajasthani Dal Baati, Banarasi Kachori, Kerala Sadhya) for authentic flavors.",
      color: "bg-amber-500/10 text-amber-700 border-amber-200"
    },
    {
      icon: Sun,
      title: "Best Travel Seasons",
      desc: "October to March is ideal for Rajasthan, Kerala, and Varanasi. April to June offers lush Himalayan valleys in Manali and Kashmir.",
      color: "bg-saffron-500/10 text-saffron-700 border-saffron-200"
    },
    {
      icon: HeartHandshake,
      title: "Temple & Heritage Respect",
      desc: "Dress modestly covering shoulders and knees when visiting sacred temples, ghats, and monuments. Remove shoes at designated counters.",
      color: "bg-indiaTeal-500/10 text-indiaTeal-700 border-indiaTeal-200"
    },
    {
      icon: Luggage,
      title: "Currency & Local Transit",
      desc: "UPI payments (GPay/PhonePe) work everywhere from luxury hotels to street tea stalls. Keep small ₹100/₹200 notes for auto-rickshaws.",
      color: "bg-indigo-500/10 text-indigo-700 border-indigo-200"
    }
  ];

  return (
    <section className="p-6 sm:p-8 bg-white rounded-3xl border border-sand-200 shadow-sm space-y-6">
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-600">
          <Sparkles className="w-4 h-4" />
          <span>Incredible India Travel Guide</span>
        </div>
        <h3 className="text-xl font-extrabold font-heading text-slate-900 mt-0.5">
          Essential Tips for Exploring India
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tips.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${tip.color} space-y-2 flex flex-col justify-between`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold font-heading text-slate-900">
                  {tip.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tip.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
