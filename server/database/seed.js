// Database Seeder
// Seeds initial 7 Indian cities, sample user trips, and verified community itineraries.

import { db } from './db.js';
import { INDIAN_CITIES } from '../../src/data/indianCities.js';
import { INITIAL_USER_TRIPS } from '../../src/data/mockTrips.js';
import { COMMUNITY_TRIPS } from '../../src/data/communityTrips.js';

export function seedDatabase() {
  // 1. Seed Cities if empty
  if (db.count('cities') === 0) {
    console.log('🌱 Seeding Indian Cities dataset...');
    INDIAN_CITIES.forEach(city => db.insert('cities', city));
  }

  // 2. Seed Default User if empty
  if (db.count('users') === 0) {
    console.log('🌱 Seeding default user...');
    db.insert('users', {
      id: 'usr-101',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@traveler.in',
      password: 'India@2026!',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      travelStyle: 'Balanced Explorer',
      memberSince: '2025',
      tripsCompleted: 4,
      loyaltyPoints: 3450
    });
  }

  // 3. Seed User Trips if empty
  if (db.count('trips') === 0) {
    console.log('🌱 Seeding initial trips...');
    INITIAL_USER_TRIPS.forEach(trip => db.insert('trips', trip));
  }

  // 4. Seed Community Trips if empty
  if (db.count('community_trips') === 0) {
    console.log('🌱 Seeding community itineraries...');
    COMMUNITY_TRIPS.forEach(trip => db.insert('community_trips', trip));
  }

  console.log(`✅ Database ready: ${db.count('cities')} cities, ${db.count('trips')} trips, ${db.count('community_trips')} community itineraries.`);
}
