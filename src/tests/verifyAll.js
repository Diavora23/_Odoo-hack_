// Verification Script for GlobeTrotter Core Utilities & Plan Generation

import { 
  validateEmail, 
  validatePassword, 
  validateConfirmPassword, 
  validateName, 
  validateTripDates, 
  validateTravelers, 
  validateBudget, 
  validateActivity,
  calculateDaysBetween
} from '../utils/validation.js';

import { 
  formatINR, 
  formatDateRange, 
  calculateDetailedTripCost 
} from '../utils/formatters.js';

import { INDIAN_CITIES } from '../data/indianCities.js';
import { generatePlansForCity } from '../utils/planGenerator.js';
import { INITIAL_USER_TRIPS } from '../data/mockTrips.js';
import { COMMUNITY_TRIPS } from '../data/communityTrips.js';

console.log('🚀 Running Comprehensive Test Suite for GlobeTrotter...');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    testsPassed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    testsFailed++;
  }
}

// 1. Auth Validation Tests
console.log('\n--- 1. Authentication Form Validation ---');
assert(validateEmail('test@wanderer.in').isValid === true, 'Valid email passes');
assert(validateEmail('invalid-email').isValid === false, 'Invalid email fails');
assert(validateEmail('').isValid === false, 'Empty email fails');

assert(validateName('Aarav Sharma').isValid === true, 'Valid name passes');
assert(validateName('A123').isValid === false, 'Name with digits fails');
assert(validateName('A').isValid === false, 'Single char name fails');

const strongPass = validatePassword('IncredibleIndia@2026');
assert(strongPass.isValid === true && strongPass.score === 4, 'Strong password passes with score 4');

const weakPass = validatePassword('abc');
assert(weakPass.isValid === false && weakPass.checks.minLength === false, 'Weak password fails length check');

const noSpecialPass = validatePassword('Password123');
assert(noSpecialPass.isValid === false && noSpecialPass.checks.hasSpecial === false, 'Missing special char fails');

assert(validateConfirmPassword('Pass@123', 'Pass@123').isValid === true, 'Matching password confirmation passes');
assert(validateConfirmPassword('Pass@123', 'Different@123').isValid === false, 'Mismatched confirmation fails');

// 2. Date and Limit Validations
console.log('\n--- 2. Date & 14-Day Limit Form Validations ---');
const today = new Date().toISOString().split('T')[0];

const day15Future = new Date();
day15Future.setDate(day15Future.getDate() + 16);
const date15Days = day15Future.toISOString().split('T')[0];

const trip15DaysResult = validateTripDates(today, date15Days);
assert(
  trip15DaysResult.isValid === false && trip15DaysResult.error.includes('maximum of 14 days'),
  '15-day trip triggers 14-day maximum limit error'
);

const day5Future = new Date();
day5Future.setDate(day5Future.getDate() + 4);
const date5Days = day5Future.toISOString().split('T')[0];
const trip5DaysResult = validateTripDates(today, date5Days);
assert(trip5DaysResult.isValid === true && trip5DaysResult.durationDays === 5, 'Valid 5-day trip passes');

const pastDateResult = validateTripDates('2020-01-01', '2020-01-05');
assert(pastDateResult.isValid === false, 'Past start date fails');

const endBeforeStartResult = validateTripDates('2026-09-10', '2026-09-05');
assert(endBeforeStartResult.isValid === false, 'End date before start date fails');

// 3. Travelers & Budget Validations
console.log('\n--- 3. Travelers & Budget Validations ---');
assert(validateTravelers(2).isValid === true, '2 travelers passes');
assert(validateTravelers(0).isValid === false, '0 travelers fails');
assert(validateTravelers(25).isValid === false, '25 travelers (> 20) fails');

assert(validateBudget(45000).isValid === true, 'Budget 45000 passes');
assert(validateBudget(-500).isValid === false, 'Negative budget fails');
assert(validateBudget(0).isValid === false, '0 budget fails');

// 4. City Dataset Integrity
console.log('\n--- 4. City Dataset Integrity ---');
assert(INDIAN_CITIES.length === 7, '7 Indian destinations loaded');
const jaipur = INDIAN_CITIES.find(c => c.id === 'jaipur');
assert(jaipur && jaipur.startingPrice > 0 && jaipur.weather.forecast.length === 5, 'Jaipur data has weather forecast & pricing');
assert(jaipur.topAttractions.length >= 4, 'Jaipur attractions pre-populated');
assert(jaipur.foodRecommendations.length >= 3, 'Jaipur regional cuisine recommendations present');

// 5. Multi-Plan Generator
console.log('\n--- 5. Multi-Plan Generator ---');
const plans = generatePlansForCity('jaipur', today, 4, 2);
assert(plans.length === 4, 'Generates 4 distinct plans for city');
assert(plans[0].costs.grandTotal > 0, 'Plan costs calculated in INR');
assert(plans[0].days.length === 4, 'Generates matching 4 days sequence');

// 6. Live Cost Recalculations
console.log('\n--- 6. Live Cost Recalculations ---');
const sampleTrip = INITIAL_USER_TRIPS[0];
const initialCosts = calculateDetailedTripCost(sampleTrip);
assert(initialCosts.total > 0 && initialCosts.stays > 0, 'Initial trip costs computed');

// Test adding an activity
const modifiedTrip = {
  ...sampleTrip,
  days: [
    ...sampleTrip.days,
    {
      dayNumber: 6,
      date: '2026-08-26',
      theme: 'Bonus Day',
      activities: [
        { id: 'act-custom-test', title: 'Hot Air Balloon Ride', cost: 5000, category: 'Adventure' }
      ]
    }
  ]
};
const updatedCosts = calculateDetailedTripCost(modifiedTrip);
assert(
  updatedCosts.total > initialCosts.total,
  `Live cost increased after adding activity: ₹${initialCosts.total.toLocaleString()} -> ₹${updatedCosts.total.toLocaleString()}`
);

// 7. Community Itineraries & Forking
console.log('\n--- 7. Community Itineraries & Forking ---');
assert(COMMUNITY_TRIPS.length === 6, '6 verified community itineraries available');
const commTrip = COMMUNITY_TRIPS[0];
assert(commTrip.author && commTrip.likes > 0, 'Community itinerary contains author and like metadata');

console.log(`\n========================================`);
console.log(`🏁 TEST RESULTS: ${testsPassed} PASSED, ${testsFailed} FAILED`);
console.log(`========================================\n`);

if (testsFailed > 0) process.exit(1);
