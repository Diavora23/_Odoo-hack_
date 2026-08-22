// Cities Controller for GlobeTrotter Backend

import { db } from '../database/db.js';

export const getCities = (req, res) => {
  try {
    const { category } = req.query;
    let cities = db.find('cities');

    if (category && category !== 'All') {
      cities = cities.filter(c => c.category === category);
    }

    return res.json(cities);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getCityById = (req, res) => {
  try {
    const city = db.findById('cities', req.params.id);
    if (!city) {
      return res.status(404).json({ error: 'City not found.' });
    }
    return res.json(city);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
