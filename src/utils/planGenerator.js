// Multi-Plan Itinerary Generator
// Dynamically generates detailed day-by-day itineraries for any Indian city based on budget, style, and duration.

import { INDIAN_CITIES } from '../data/indianCities.js';

/**
 * Generates 3-4 distinct plan variations for a selected city, dates, and travelers.
 */
export function generatePlansForCity(cityId, startDateStr, durationDays, travelers) {
  const city = INDIAN_CITIES.find(c => c.id === cityId) || INDIAN_CITIES[0];
  const numDays = Math.min(14, Math.max(1, durationDays || 3));
  const numTravelers = Math.max(1, travelers || 2);

  const planTiers = [
    {
      type: 'budget',
      title: `${city.name} Budget Backpacker`,
      badge: 'Best Value for Solo & Backpackers',
      hotelTierKey: 'budget',
      hotel: city.hotelTiers.budget,
      transportMode: 'Auto-Rickshaw & Public Metro',
      transportCostDaily: 350,
      description: 'Hostels, shared transport, local street food trails, and free walking viewpoints.',
      multiplier: 0.75,
      highlights: ['Local transit pass', 'Street food trails', 'Shared experiences', 'Backpacker vibe']
    },
    {
      type: 'balanced',
      title: `${city.name} Heritage Explorer`,
      badge: 'Most Popular Choice',
      isRecommended: true,
      hotelTierKey: 'balanced',
      hotel: city.hotelTiers.balanced,
      transportMode: 'Dedicated AC Sedan with Driver',
      transportCostDaily: 1400,
      description: 'Authentic heritage haveli stays, curated guided entry, and top regional thali restaurants.',
      multiplier: 1.0,
      highlights: ['Comfortable AC cab', 'Top-rated heritage stays', 'All entry passes included', 'Curated dining']
    },
    {
      type: 'luxury',
      title: `${city.name} Royal Luxury Opulence`,
      badge: '5-Star Royal Treatment',
      hotelTierKey: 'luxury',
      hotel: city.hotelTiers.luxury,
      transportMode: 'Chauffeured Luxury SUV & Airport Meet',
      transportCostDaily: 3800,
      description: 'Palatial 5-star suites, private historian guides, fine dining, and exclusive experiences.',
      multiplier: 2.2,
      highlights: ['Palace suites', 'Private guide & skip-the-line', 'Royal champagne breakfasts', 'Private transfers']
    },
    {
      type: 'cultural',
      title: `${city.name} Cultural & Culinary Immersion`,
      badge: 'Art, Heritage & Soul',
      hotelTierKey: 'cultural',
      hotel: city.hotelTiers.cultural || city.hotelTiers.balanced,
      transportMode: 'Curated Heritage Shuttle & E-rickshaws',
      transportCostDaily: 900,
      description: 'Artisan workshops, temple rituals, traditional live performances, and cooking masterclasses.',
      multiplier: 1.1,
      highlights: ['Artisan workshops', 'Culinary food walks', 'Evening folk shows', 'Boutique homestays']
    }
  ];

  return planTiers.map(tier => {
    // Build day-by-day sequence
    const days = [];
    const baseDate = new Date(startDateStr || new Date());

    for (let dayIndex = 0; dayIndex < numDays; dayIndex++) {
      const currentDayDate = new Date(baseDate);
      currentDayDate.setDate(baseDate.getDate() + dayIndex);
      const dateString = currentDayDate.toISOString().split('T')[0];

      const attraction1 = city.topAttractions[dayIndex % city.topAttractions.length];
      const attraction2 = city.topAttractions[(dayIndex + 2) % city.topAttractions.length];
      const foodItem = city.foodRecommendations[dayIndex % city.foodRecommendations.length];
      const dinnerFood = city.foodRecommendations[(dayIndex + 1) % city.foodRecommendations.length];

      const activities = [
        {
          id: `act-${tier.type}-d${dayIndex + 1}-1`,
          title: `Breakfast & Special Dish at ${foodItem.spot}`,
          time: "08:30 AM",
          cost: Math.round(foodItem.cost * (tier.type === 'luxury' ? 2.5 : tier.type === 'budget' ? 0.7 : 1.0)),
          category: "Food",
          icon: "Coffee",
          notes: `Famous for ${foodItem.name}`
        },
        {
          id: `act-${tier.type}-d${dayIndex + 1}-2`,
          title: `${attraction1.name} (Guided Tour)`,
          time: attraction1.timing ? attraction1.timing.split(' - ')[0] : "10:00 AM",
          cost: Math.round(attraction1.cost * (tier.type === 'luxury' ? 2 : 1)),
          category: attraction1.category || "Sightseeing",
          icon: attraction1.icon || "Landmark",
          notes: attraction1.desc
        },
        {
          id: `act-${tier.type}-d${dayIndex + 1}-3`,
          title: `${attraction2.name}`,
          time: attraction2.timing ? attraction2.timing.split(' - ')[0] : "03:30 PM",
          cost: Math.round(attraction2.cost * (tier.type === 'luxury' ? 1.5 : 1)),
          category: attraction2.category || "Culture",
          icon: attraction2.icon || "Compass",
          notes: attraction2.desc
        },
        {
          id: `act-${tier.type}-d${dayIndex + 1}-4`,
          title: `Authentic Dinner at ${dinnerFood.spot}`,
          time: "08:00 PM",
          cost: Math.round(dinnerFood.cost * (tier.type === 'luxury' ? 3.0 : tier.type === 'budget' ? 0.8 : 1.2)),
          category: "Food",
          icon: "Utensils",
          notes: `Try their signature ${dinnerFood.name}`
        }
      ];

      // Day theme label
      const dayThemes = [
        `Arrival & Iconic Highlights`,
        `Heritage Palaces & Hidden Bazaars`,
        `Artisan Traditions & Sunset Vantage`,
        `Sacred Trails & Folk Culture`,
        `Scenic Nature & Royal Feasts`,
        `Craft Studios & Golden Hour`,
        `Farewell & Souvenir Walk`
      ];

      days.push({
        dayNumber: dayIndex + 1,
        date: dateString,
        theme: dayThemes[dayIndex % dayThemes.length],
        activities
      });
    }

    // Calculate total cost
    const staysTotal = tier.hotel.pricePerNight * Math.max(1, numDays - 1);
    let activitiesTotal = 0;
    let foodTotal = 0;

    days.forEach(d => {
      d.activities.forEach(a => {
        if (a.category === 'Food') foodTotal += a.cost * numTravelers;
        else activitiesTotal += a.cost * numTravelers;
      });
    });

    const transportTotal = tier.transportCostDaily * numDays;
    const grandTotal = staysTotal + activitiesTotal + foodTotal + transportTotal;
    const perPersonCost = Math.round(grandTotal / numTravelers);

    return {
      planId: `${city.id}-${tier.type}-${numDays}d`,
      cityId: city.id,
      cityName: city.name,
      state: city.state,
      planType: tier.type,
      title: tier.title,
      badge: tier.badge,
      isRecommended: tier.isRecommended || false,
      hotel: tier.hotel,
      transportMode: tier.transportMode,
      description: tier.description,
      highlights: tier.highlights,
      durationDays: numDays,
      travelers: numTravelers,
      startDate: startDateStr,
      endDate: (() => {
        const d = new Date(startDateStr || new Date());
        d.setDate(d.getDate() + numDays - 1);
        return d.toISOString().split('T')[0];
      })(),
      costs: {
        stays: staysTotal,
        activities: activitiesTotal,
        food: foodTotal,
        transport: transportTotal,
        grandTotal,
        perPerson: perPersonCost,
      },
      days
    };
  });
}
