// Strict Client-Side Form Validation Utilities
// Includes real-time validation checks for Authentication, Dates, Travelers, and Budgets.

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NAME_REGEX = /^[a-zA-Z\s]{2,}$/;
export const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

/**
 * Validates an email address.
 */
export function validateEmail(email) {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email address is required.' };
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address (e.g. wanderer@india.com).' };
  }
  return { isValid: true, error: '' };
}

/**
 * Validates a password with detailed criteria and a 4-bar strength score.
 * Criteria: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character.
 */
export function validatePassword(password) {
  if (!password) {
    return {
      isValid: false,
      score: 0,
      label: 'Too Short',
      color: 'bg-slate-300',
      error: 'Password is required.',
      checks: {
        minLength: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecial: false,
      }
    };
  }

  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = SPECIAL_CHAR_REGEX.test(password);

  let passedCount = 0;
  if (minLength) passedCount++;
  if (hasUpper) passedCount++;
  if (hasLower) passedCount++;
  if (hasNumber) passedCount++;
  if (hasSpecial) passedCount++;

  const isValid = minLength && hasUpper && hasLower && hasNumber && hasSpecial;

  let label = 'Weak';
  let color = 'bg-red-500';
  let score = 1;

  if (passedCount >= 5) {
    label = 'Strong & Secure';
    color = 'bg-emerald-500';
    score = 4;
  } else if (passedCount >= 4) {
    label = 'Good';
    color = 'bg-teal-500';
    score = 3;
  } else if (passedCount >= 2) {
    label = 'Fair';
    color = 'bg-amber-500';
    score = 2;
  }

  let error = '';
  if (!isValid) {
    if (!minLength) error = 'Password must be at least 8 characters long.';
    else if (!hasUpper) error = 'Password must contain at least 1 uppercase letter (A-Z).';
    else if (!hasLower) error = 'Password must contain at least 1 lowercase letter (a-z).';
    else if (!hasNumber) error = 'Password must contain at least 1 number (0-9).';
    else if (!hasSpecial) error = 'Password must contain at least 1 special character (!@#$%^&*).';
  }

  return {
    isValid,
    score,
    label,
    color,
    error,
    checks: {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
    }
  };
}

/**
 * Validates Confirm Password strictly against Password.
 */
export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password.' };
  }
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match. Please ensure both fields match exactly.' };
  }
  return { isValid: true, error: '' };
}

/**
 * Validates Full Name (letters and spaces only, min 2 characters).
 */
export function validateName(name) {
  if (!name || name.trim() === '') {
    return { isValid: false, error: 'Full name is required.' };
  }
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long.' };
  }
  if (!NAME_REGEX.test(name.trim())) {
    return { isValid: false, error: 'Name must contain letters and spaces only.' };
  }
  return { isValid: true, error: '' };
}

/**
 * Gets today's date in YYYY-MM-DD format based on local time.
 */
export function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates date difference in days (inclusive or exclusive).
 */
export function calculateDaysBetween(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return 0;
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const diffTime = end.getTime() - start.getTime();
  if (diffTime < 0) return -1;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive of start and end
  return diffDays;
}

/**
 * Validates Trip Dates and enforces 14-day maximum limit.
 */
export function validateTripDates(startDateStr, endDateStr) {
  const todayStr = getTodayDateString();

  if (!startDateStr) {
    return { isValid: false, durationDays: 0, error: 'Please select a departure start date.' };
  }

  if (startDateStr < todayStr) {
    return { isValid: false, durationDays: 0, error: 'Start date cannot be in the past.' };
  }

  if (!endDateStr) {
    return { isValid: false, durationDays: 0, error: 'Please select a return end date.' };
  }

  if (endDateStr < startDateStr) {
    return { isValid: false, durationDays: 0, error: 'End date cannot be prior to start date.' };
  }

  const durationDays = calculateDaysBetween(startDateStr, endDateStr);

  if (durationDays > 14) {
    return {
      isValid: false,
      durationDays,
      error: 'Trips are limited to a maximum of 14 days for detailed custom planning.'
    };
  }

  if (durationDays < 1) {
    return { isValid: false, durationDays: 0, error: 'Trip must be at least 1 day.' };
  }

  return { isValid: true, durationDays, error: '' };
}

/**
 * Validates travelers count (1 to 20 people).
 */
export function validateTravelers(count) {
  const num = parseInt(count, 10);
  if (isNaN(num)) {
    return { isValid: false, error: 'Traveler count must be a number.' };
  }
  if (num < 1) {
    return { isValid: false, error: 'Minimum 1 traveler required.' };
  }
  if (num > 20) {
    return { isValid: false, error: 'Maximum 20 travelers allowed per booking group.' };
  }
  return { isValid: true, error: '' };
}

/**
 * Validates custom budget (> 0).
 */
export function validateBudget(budget) {
  if (budget === '' || budget === null || budget === undefined) {
    return { isValid: false, error: 'Budget amount is required.' };
  }
  const num = Number(budget);
  if (isNaN(num) || num <= 0) {
    return { isValid: false, error: 'Budget must be a positive number greater than ₹0.' };
  }
  return { isValid: true, error: '' };
}

/**
 * Validates custom activity input.
 */
export function validateActivity(title, cost, day) {
  if (!title || title.trim().length < 3) {
    return { isValid: false, error: 'Activity title must be at least 3 characters long.' };
  }
  const costNum = Number(cost);
  if (isNaN(costNum) || costNum < 0) {
    return { isValid: false, error: 'Activity cost must be a non-negative number.' };
  }
  if (!day || day < 1) {
    return { isValid: false, error: 'Please select a valid itinerary day.' };
  }
  return { isValid: true, error: '' };
}
