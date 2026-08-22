// Backend & Database Test Runner

import { db } from '../database/db.js';
import { seedDatabase } from '../database/seed.js';

console.log('🚀 Running Local Database & Backend Verification Tests...');

let passed = 0;
let failed = 0;

function assert(condition, name) {
  if (condition) {
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${name}`);
    failed++;
  }
}

// 1. Seed and Verify Tables
seedDatabase();
assert(db.count('cities') >= 7, `Cities table has ${db.count('cities')} records`);
assert(db.count('trips') >= 3, `Trips table has ${db.count('trips')} records`);
assert(db.count('community_trips') >= 6, `Community trips table has ${db.count('community_trips')} records`);
assert(db.count('users') >= 1, `Users table has ${db.count('users')} records`);

// 2. Test Insert Trip
const testTrip = db.insert('trips', {
  cityId: 'udaipur',
  cityName: 'Udaipur',
  state: 'Rajasthan',
  tripTitle: 'Test Royal Odyssey',
  status: 'upcoming',
  startDate: '2026-10-01',
  endDate: '2026-10-05',
  durationDays: 5,
  travelers: 2,
  totalBudget: 48000,
  days: [
    {
      dayNumber: 1,
      date: '2026-10-01',
      theme: 'Arrival & Lake Pichola',
      activities: [
        { id: 'act-test-1', title: 'Sunset Boat to Jagmandir', cost: 1200, category: 'Culture' }
      ]
    }
  ]
});
assert(testTrip.id && testTrip.tripTitle === 'Test Royal Odyssey', 'Inserted new trip into database');

// 3. Test Find & Update Trip
const foundTrip = db.findById('trips', testTrip.id);
assert(foundTrip && foundTrip.id === testTrip.id, 'Found inserted trip by ID');

const updatedTrip = db.update('trips', testTrip.id, { totalBudget: 52000 });
assert(updatedTrip.totalBudget === 52000, 'Updated trip budget in database');

// 4. Test Delete Trip
const deleteResult = db.delete('trips', testTrip.id);
assert(deleteResult === true, 'Deleted test trip from database');
assert(db.findById('trips', testTrip.id) === null, 'Verified trip is removed from database');

// 5. Test User Auth operations
const user = db.findOne('users', u => u.email === 'aarav.sharma@traveler.in');
assert(user && user.name === 'Aarav Sharma', 'Found user by email in database');

console.log(`\n========================================`);
console.log(`🏁 BACKEND TESTS: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
