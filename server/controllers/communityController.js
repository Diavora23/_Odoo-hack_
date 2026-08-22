// Community Controller for GlobeTrotter Backend

import { db } from '../database/db.js';
import { INDIAN_CITIES } from '../../src/data/indianCities.js';
import { generatePlansForCity } from '../../src/utils/planGenerator.js';
import { getTodayDateString } from '../../src/utils/validation.js';

export const getCommunityTrips = (req, res) => {
  try {
    const { cityId, search, budgetRange, duration } = req.query;
    let items = db.find('community_trips');

    if (cityId && cityId !== 'All') {
      items = items.filter(t => t.cityId === cityId);
    }
    if (budgetRange === 'under15k') {
      items = items.filter(t => t.totalBudget <= 15000);
    } else if (budgetRange === '15k-30k') {
      items = items.filter(t => t.totalBudget >= 15000 && t.totalBudget <= 30000);
    } else if (budgetRange === 'above30k') {
      items = items.filter(t => t.totalBudget >= 30000);
    }
    if (duration === 'short') {
      items = items.filter(t => t.durationDays <= 3);
    } else if (duration === 'medium') {
      items = items.filter(t => t.durationDays >= 4 && t.durationDays <= 6);
    } else if (duration === 'long') {
      items = items.filter(t => t.durationDays >= 7);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(t =>
        t.tripTitle?.toLowerCase().includes(q) ||
        t.cityName?.toLowerCase().includes(q) ||
        t.author?.name?.toLowerCase().includes(q)
      );
    }

    return res.json(items);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const toggleLikeTrip = (req, res) => {
  try {
    const { id } = req.params;
    const trip = db.findById('community_trips', id);
    if (!trip) return res.status(404).json({ error: 'Community trip not found.' });

    const updated = db.update('community_trips', id, {
      likes: (trip.likes || 0) + 1
    });

    return res.json({ success: true, likes: updated.likes });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const forkCommunityTrip = (req, res) => {
  try {
    const { id } = req.params;
    const commTrip = db.findById('community_trips', id);
    if (!commTrip) return res.status(404).json({ error: 'Community trip not found.' });

    const city = INDIAN_CITIES.find(c => c.id === commTrip.cityId) || INDIAN_CITIES[0];
    const today = getTodayDateString();

    const plans = generatePlansForCity(city.id, today, commTrip.durationDays, commTrip.travelers);
    const matchedPlan = plans.find(p => p.planType === 'balanced') || plans[0];

    const clonedTrip = db.insert('trips', {
      cityId: city.id,
      cityName: city.name,
      state: city.state,
      tripTitle: `${commTrip.tripTitle} (My Copy)`,
      coverImage: commTrip.coverImage || city.heroImage,
      status: 'upcoming',
      startDate: today,
      endDate: matchedPlan.endDate,
      durationDays: commTrip.durationDays,
      travelers: commTrip.travelers || 2,
      planType: 'balanced',
      planName: `Forked from ${commTrip.author.name}`,
      hotel: matchedPlan.hotel,
      totalBudget: commTrip.totalBudget,
      spentBudget: 0,
      forkedFrom: {
        authorName: commTrip.author.name,
        originalTripId: commTrip.id,
      },
      days: matchedPlan.days,
    });

    // Increment fork count on original
    db.update('community_trips', id, { forks: (commTrip.forks || 0) + 1 });

    return res.status(201).json(clonedTrip);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
