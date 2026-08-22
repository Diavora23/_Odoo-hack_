import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_CITIES } from '../../data/indianCities';
import { formatINR, calculateDetailedTripCost, formatDate } from '../../utils/formatters';
import WeatherWidget from './WeatherWidget';
import InteractiveMap from './InteractiveMap';
import ExpenseChart from './ExpenseChart';
import CustomActivityDrawer from './CustomActivityDrawer';
import { 
  Calendar, 
  MapPin, 
  Hotel, 
  Car, 
  Trash2, 
  Plus, 
  Save, 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  IndianRupee,
  Utensils,
  Landmark,
  Compass,
  Tag,
  Share2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function Step3Itinerary({ onBack }) {
  const { 
    wizardState, 
    saveTrip, 
    addCustomActivity, 
    removeCustomActivity, 
    setCurrentView,
    showToast 
  } = useApp();

  const itinerary = wizardState.customizedItinerary || wizardState.selectedPlan;
  const city = INDIAN_CITIES.find(c => c.id === wizardState.cityId) || INDIAN_CITIES[0];

  const [activeDayNumber, setActiveDayNumber] = useState(1);
  const [openDayAccordions, setOpenDayAccordions] = useState({ 1: true, 2: true });
  const [isActivityDrawerOpen, setIsActivityDrawerOpen] = useState(false);
  const [tripTitle, setTripTitle] = useState(
    itinerary?.title || `${city.name} Custom Journey`
  );

  if (!itinerary) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No itinerary selected. Please return to Step 1.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-saffron-500 text-white rounded-xl"
        >
          Return to Parameters
        </button>
      </div>
    );
  }

  // Calculate live costs
  const costBreakdown = calculateDetailedTripCost(itinerary);

  const toggleAccordion = (dayNum) => {
    setOpenDayAccordions(prev => ({
      ...prev,
      [dayNum]: !prev[dayNum]
    }));
  };

  const handleSaveToMyTrips = () => {
    // TODO: API Endpoint - POST /api/v1/trips
    saveTrip({
      cityId: city.id,
      cityName: city.name,
      state: city.state,
      tripTitle: tripTitle.trim() || `${city.name} Itinerary`,
      coverImage: city.heroImage,
      status: 'upcoming',
      startDate: wizardState.startDate,
      endDate: wizardState.endDate,
      durationDays: wizardState.durationDays,
      travelers: wizardState.travelers,
      planType: wizardState.travelStyle,
      planName: itinerary.title,
      hotel: itinerary.hotel,
      totalBudget: costBreakdown.total,
      spentBudget: 0,
      days: itinerary.days,
    });
  };

  const getActivityIcon = (category) => {
    switch (category) {
      case 'Food': return <Utensils className="w-3.5 h-3.5 text-amber-600" />;
      case 'Sightseeing': return <Landmark className="w-3.5 h-3.5 text-saffron-600" />;
      case 'Culture': return <Sparkles className="w-3.5 h-3.5 text-purple-600" />;
      case 'Adventure': return <Compass className="w-3.5 h-3.5 text-indiaTeal-600" />;
      case 'Transport': return <Car className="w-3.5 h-3.5 text-indigo-600" />;
      default: return <Tag className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-slide-up pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sand-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
              Step 3: Interactive Itinerary Customizer
            </span>
            <span className="text-xs text-slate-500">
              {wizardState.durationDays} Days • {wizardState.travelers} Travelers
            </span>
          </div>
          <input
            type="text"
            value={tripTitle}
            onChange={(e) => setTripTitle(e.target.value)}
            className="text-2xl font-extrabold font-heading text-slate-900 bg-transparent border-b border-transparent hover:border-sand-300 focus:border-saffron-500 focus:outline-none transition-colors w-full max-w-xl"
            title="Click to edit trip title"
          />
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-saffron-500" />
            <span>{city.name}, {city.state} • {formatDate(wizardState.startDate)} to {formatDate(wizardState.endDate)}</span>
          </p>
        </div>

        {/* Save CTA & Total Budget in Header */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Total Budget
            </div>
            <div className="text-xl font-extrabold font-heading text-slate-900 text-gradient-saffron">
              {formatINR(costBreakdown.total)}
            </div>
          </div>

          <button
            onClick={handleSaveToMyTrips}
            className="px-6 py-3 saffron-gradient hover:opacity-95 text-white font-heading font-bold text-xs sm:text-sm rounded-2xl shadow-xl shadow-saffron-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save to My Trips</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid: Left (Itinerary Timeline & Customizer), Right (Weather, Map, Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Day-by-Day Accordion & Activities */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Action Bar with "+ Add Custom Activity" */}
          <div className="flex items-center justify-between bg-sand-100/70 p-3.5 rounded-2xl border border-sand-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Days Sequence:</span>
              <div className="flex gap-1">
                {itinerary.days?.map(d => (
                  <button
                    key={d.dayNumber}
                    onClick={() => {
                      setActiveDayNumber(d.dayNumber);
                      setOpenDayAccordions(prev => ({ ...prev, [d.dayNumber]: true }));
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      activeDayNumber === d.dayNumber
                        ? 'saffron-gradient text-white shadow-sm'
                        : 'bg-white text-slate-700 hover:bg-sand-200'
                    }`}
                  >
                    {d.dayNumber}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsActivityDrawerOpen(true)}
              className="px-3.5 py-1.5 bg-white hover:bg-sand-50 border border-sand-300 text-saffron-600 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1 hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Activity</span>
            </button>
          </div>

          {/* Hotel Stay Card Banner */}
          <div className="p-4 rounded-3xl bg-indiaTeal-50/70 border border-indiaTeal-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indiaTeal-600 text-white flex items-center justify-center shadow-md">
                <Hotel className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indiaTeal-800">
                  Assigned Accommodation ({itinerary.hotel.type})
                </span>
                <h4 className="text-xs font-bold text-slate-900">{itinerary.hotel.name}</h4>
                <p className="text-[11px] text-slate-500">
                  ₹{itinerary.hotel.pricePerNight.toLocaleString('en-IN')} / night × {Math.max(1, wizardState.durationDays - 1)} nights
                </p>
              </div>
            </div>
            <span className="text-xs font-extrabold font-heading text-indiaTeal-900">
              {formatINR(costBreakdown.stays)}
            </span>
          </div>

          {/* Day Accordion List */}
          <div className="space-y-4">
            {itinerary.days?.map((day) => {
              const isOpen = openDayAccordions[day.dayNumber] !== false;

              return (
                <div
                  key={day.dayNumber}
                  className="bg-white rounded-3xl border border-sand-200 shadow-sm overflow-hidden transition-all"
                >
                  {/* Accordion Header */}
                  <div
                    onClick={() => {
                      toggleAccordion(day.dayNumber);
                      setActiveDayNumber(day.dayNumber);
                    }}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-sand-50/50 transition-colors border-b border-sand-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl saffron-gradient text-white flex items-center justify-center font-bold text-sm shadow-md">
                        D{day.dayNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-extrabold font-heading text-slate-900">
                            Day {day.dayNumber}: {day.theme}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500">{formatDate(day.date)} • {day.activities?.length || 0} Scheduled Activities</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsActivityDrawerOpen(true);
                        }}
                        className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-saffron-600 hover:text-saffron-700 bg-saffron-50 px-2.5 py-1 rounded-lg border border-saffron-200"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add to Day {day.dayNumber}</span>
                      </button>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>

                  {/* Accordion Content: Activity List */}
                  {isOpen && (
                    <div className="p-4 sm:p-5 space-y-3 bg-sand-50/30">
                      {day.activities && day.activities.length > 0 ? (
                        day.activities.map((act) => (
                          <div
                            key={act.id}
                            className="group bg-white p-3.5 rounded-2xl border border-sand-200 hover:border-saffron-300 hover:shadow-md transition-all flex items-start justify-between gap-3"
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <div className="w-8 h-8 rounded-xl bg-sand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                {getActivityIcon(act.category)}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sand-100 text-slate-700">
                                    {act.time}
                                  </span>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indiaTeal-50 text-indiaTeal-700">
                                    {act.category}
                                  </span>
                                </div>
                                <h5 className="text-xs font-bold text-slate-900 mt-1">
                                  {act.title}
                                </h5>
                                {act.notes && (
                                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                                    {act.notes}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Cost & Delete Action */}
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <div className="text-right">
                                <span className="text-xs font-bold text-slate-900 font-heading">
                                  {act.cost > 0 ? formatINR(act.cost) : 'Free'}
                                </span>
                                {act.cost > 0 && wizardState.travelers > 1 && (
                                  <span className="text-[10px] text-slate-400 block -mt-0.5">
                                    per traveler
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => removeCustomActivity('wizard-draft', day.dayNumber, act.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remove activity"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 border border-dashed border-sand-300 rounded-2xl">
                          <p className="text-xs text-slate-400">No activities on this day yet.</p>
                          <button
                            onClick={() => setIsActivityDrawerOpen(true)}
                            className="mt-2 text-xs font-bold text-saffron-600 hover:underline"
                          >
                            + Add First Activity
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Bottom Back Button */}
          <div className="pt-2">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-white border border-sand-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-sand-50 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Plans Tier</span>
            </button>
          </div>

        </div>

        {/* Right Column (5 cols): Weather Widget, Interactive Map, Expense Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live Expense Breakdown Chart */}
          <ExpenseChart
            costBreakdown={costBreakdown}
            totalBudget={costBreakdown.total}
            travelers={wizardState.travelers}
          />

          {/* Interactive Map */}
          <InteractiveMap
            city={city}
            activeDayNumber={activeDayNumber}
            itineraryDays={itinerary.days}
          />

          {/* 5-Day Weather Forecast */}
          <WeatherWidget
            cityWeather={city.weather}
            cityName={city.name}
          />

        </div>

      </div>

      {/* Custom Activity Drawer Modal */}
      <CustomActivityDrawer
        isOpen={isActivityDrawerOpen}
        onClose={() => setIsActivityDrawerOpen(false)}
        totalDays={wizardState.durationDays}
        onAddActivity={addCustomActivity}
        targetTripId="wizard-draft"
      />

    </div>
  );
}
