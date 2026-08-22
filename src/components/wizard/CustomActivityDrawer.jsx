import React, { useState } from 'react';
import { validateActivity } from '../../utils/validation';
import { 
  X, 
  Plus, 
  Calendar, 
  Clock, 
  IndianRupee, 
  Tag, 
  Sparkles,
  FileText
} from 'lucide-react';

export default function CustomActivityDrawer({ isOpen, onClose, totalDays, onAddActivity, targetTripId }) {
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('500');
  const [selectedDay, setSelectedDay] = useState(1);
  const [time, setTime] = useState('11:00 AM');
  const [category, setCategory] = useState('Sightseeing');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const categories = [
    { label: 'Sightseeing', icon: 'Landmark' },
    { label: 'Food & Dining', icon: 'Utensils' },
    { label: 'Adventure', icon: 'Compass' },
    { label: 'Culture & Arts', icon: 'Sparkles' },
    { label: 'Shopping', icon: 'ShoppingBag' },
    { label: 'Transport', icon: 'Car' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const val = validateActivity(title, cost, selectedDay);
    if (!val.isValid) {
      setError(val.error);
      return;
    }

    onAddActivity(targetTripId, selectedDay, {
      title: title.trim(),
      cost: Number(cost),
      time: time || '12:00 PM',
      category: category === 'Food & Dining' ? 'Food' : category === 'Culture & Arts' ? 'Culture' : category,
      icon: category === 'Food & Dining' ? 'Utensils' : category === 'Adventure' ? 'Compass' : category === 'Shopping' ? 'ShoppingBag' : 'Landmark',
      notes: notes.trim() || 'Custom planned activity'
    });

    // Reset form
    setTitle('');
    setCost('500');
    setNotes('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border border-sand-200 overflow-hidden animate-slide-up">
        
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-sand-200 flex items-center justify-between saffron-gradient text-white">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <h3 className="text-base font-extrabold font-heading">
              Add Custom Experience / Activity
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Activity Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Activity / Experience Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(''); }}
              placeholder="e.g. Sunrise Hot Air Balloon Safari over Amber Fort"
              className="w-full px-4 py-2.5 text-sm bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400 font-medium"
              required
            />
          </div>

          {/* Day Selector & Cost Row */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Select Day */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-saffron-500" />
                <span>Assign to Day</span>
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400 font-medium"
              >
                {Array.from({ length: totalDays || 5 }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d}>
                    Day {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Cost in ₹ INR */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-indiaTeal-600" />
                <span>Cost (₹ INR)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={cost}
                  onChange={(e) => { setCost(e.target.value); setError(''); }}
                  placeholder="0"
                  className="w-full pl-8 pr-3 py-2.5 text-sm bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400 font-bold"
                />
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
              </div>
            </div>

          </div>

          {/* Time Slot & Category */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Time Slot */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Estimated Time</span>
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400 text-xs font-medium"
              >
                <option value="06:00 AM">06:00 AM (Early Dawn)</option>
                <option value="08:30 AM">08:30 AM (Morning)</option>
                <option value="11:00 AM">11:00 AM (Mid-day)</option>
                <option value="01:30 PM">01:30 PM (Lunch / Afternoon)</option>
                <option value="04:30 PM">04:30 PM (Golden Hour)</option>
                <option value="07:30 PM">07:30 PM (Evening Dinner)</option>
                <option value="09:30 PM">09:30 PM (Night Walk)</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-purple-600" />
                <span>Category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400 text-xs font-medium"
              >
                {categories.map(c => (
                  <option key={c.label} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Notes / Special Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Notes / Details (Optional)</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Pre-book online pass; wear comfortable trekking shoes"
              className="w-full px-4 py-2 text-sm bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-xs text-red-500 font-semibold animate-fade-in">{error}</p>
          )}

          {/* Footer Actions */}
          <div className="pt-3 border-t border-sand-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-sand-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold font-heading text-white saffron-gradient hover:opacity-95 rounded-xl shadow-md shadow-saffron-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add & Recalculate Total</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
