// Trips Controller for GlobeTrotter Backend

import { db } from '../database/db.js';
import { calculateDetailedTripCost } from '../../src/utils/formatters.js';

export const getTrips = (req, res) => {
  try {
    const { status, cityId, search } = req.query;
    let trips = db.find('trips');

    if (status && status !== 'all') {
      trips = trips.filter(t => t.status === status);
    }
    if (cityId) {
      trips = trips.filter(t => t.cityId === cityId);
    }
    if (search) {
      const q = search.toLowerCase();
      trips = trips.filter(t => 
        t.tripTitle?.toLowerCase().includes(q) || 
        t.cityName?.toLowerCase().includes(q) ||
        t.state?.toLowerCase().includes(q)
      );
    }

    return res.json(trips);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getTripById = (req, res) => {
  try {
    const trip = db.findById('trips', req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found.' });
    }
    return res.json(trip);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const createTrip = (req, res) => {
  try {
    const tripData = req.body;
    if (!tripData.cityName || !tripData.startDate) {
      return res.status(400).json({ error: 'Missing required trip parameters (cityName, startDate).' });
    }

    // Auto-calculate accurate budget if not supplied
    const costs = calculateDetailedTripCost(tripData);
    const newTrip = db.insert('trips', {
      ...tripData,
      totalBudget: tripData.totalBudget || costs.total,
      status: tripData.status || 'upcoming'
    });

    return res.status(201).json(newTrip);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateTrip = (req, res) => {
  try {
    const updated = db.update('trips', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Trip not found.' });
    }
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteTrip = (req, res) => {
  try {
    const deleted = db.delete('trips', req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Trip not found.' });
    }
    return res.json({ success: true, message: 'Trip deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const addActivityToTrip = (req, res) => {
  try {
    const { id } = req.params;
    const { dayNumber, activity } = req.body;

    const trip = db.findById('trips', id);
    if (!trip) return res.status(404).json({ error: 'Trip not found.' });

    const newActivity = {
      ...activity,
      id: `act-custom-${Date.now()}`
    };

    const updatedDays = (trip.days || []).map(day => {
      if (day.dayNumber === Number(dayNumber)) {
        return {
          ...day,
          activities: [...(day.activities || []), newActivity]
        };
      }
      return day;
    });

    const updatedCosts = calculateDetailedTripCost({ ...trip, days: updatedDays });

    const updatedTrip = db.update('trips', id, {
      days: updatedDays,
      totalBudget: updatedCosts.total
    });

    return res.json({ trip: updatedTrip, addedActivity: newActivity, newTotal: updatedCosts.total });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const removeActivityFromTrip = (req, res) => {
  try {
    const { id, activityId } = req.params;
    const { dayNumber } = req.query;

    const trip = db.findById('trips', id);
    if (!trip) return res.status(404).json({ error: 'Trip not found.' });

    const updatedDays = (trip.days || []).map(day => {
      if (!dayNumber || day.dayNumber === Number(dayNumber)) {
        return {
          ...day,
          activities: (day.activities || []).filter(a => a.id !== activityId)
        };
      }
      return day;
    });

    const updatedCosts = calculateDetailedTripCost({ ...trip, days: updatedDays });

    const updatedTrip = db.update('trips', id, {
      days: updatedDays,
      totalBudget: updatedCosts.total
    });

    return res.json({ trip: updatedTrip, newTotal: updatedCosts.total });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
