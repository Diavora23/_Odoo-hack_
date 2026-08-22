// Currency and Date Formatters for Indian Locale

/**
 * Formats amount into Indian Rupee string (e.g. ₹18,500).
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats date string into readable format (e.g., "24 Oct 2026").
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Formats date range string (e.g., "21 Aug – 25 Aug 2026").
 */
export function formatDateRange(startStr, endStr) {
  if (!startStr || !endStr) return '';
  const start = new Date(startStr);
  const end = new Date(endStr);
  
  const startMonth = start.toLocaleDateString('en-IN', { month: 'short' });
  const endMonth = end.toLocaleDateString('en-IN', { month: 'short' });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const year = end.getFullYear();

  if (startMonth === endMonth) {
    return `${startDay} – ${endDay} ${startMonth} ${year}`;
  }
  return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${year}`;
}

/**
 * Calculates total trip expenses broken down by category.
 */
export function calculateDetailedTripCost(trip) {
  if (!trip) return { total: 0, stays: 0, food: 0, activities: 0, transport: 0, perPerson: 0 };

  const travelers = trip.travelers || 1;
  const daysCount = trip.days ? trip.days.length : (trip.durationDays || 1);
  const hotelPerNight = trip.hotel?.pricePerNight || 0;
  const staysCost = hotelPerNight * Math.max(1, daysCount - 1);

  let activitiesCost = 0;
  let foodCost = 0;
  let transportCost = 0;

  if (trip.days && Array.isArray(trip.days)) {
    trip.days.forEach(day => {
      if (day.activities && Array.isArray(day.activities)) {
        day.activities.forEach(act => {
          const cost = Number(act.cost) || 0;
          if (act.category === 'Food') {
            foodCost += cost;
          } else if (act.category === 'Transport') {
            transportCost += cost;
          } else if (act.category === 'Stay') {
            // Handled separately by hotelPerNight
          } else {
            activitiesCost += cost;
          }
        });
      }
    });
  }

  // Multiply activity/food by travelers if it was per-person or keep scaled
  const total = staysCost + (activitiesCost * travelers) + (foodCost * travelers) + transportCost;
  const perPerson = Math.round(total / Math.max(1, travelers));

  return {
    total,
    stays: staysCost,
    food: foodCost * travelers,
    activities: activitiesCost * travelers,
    transport: transportCost,
    perPerson,
    breakdownPercentages: {
      stays: total > 0 ? Math.round((staysCost / total) * 100) : 35,
      food: total > 0 ? Math.round(((foodCost * travelers) / total) * 100) : 25,
      activities: total > 0 ? Math.round(((activitiesCost * travelers) / total) * 100) : 25,
      transport: total > 0 ? Math.round((transportCost / total) * 100) : 15,
    }
  };
}
