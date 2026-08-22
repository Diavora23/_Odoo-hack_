// Frontend API Client for GlobeTrotter Backend
// Handles requests to the Express.js local backend server with fallback support.

const API_BASE = '/api';

/**
 * Fetch wrapper with error handling.
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.error || `HTTP ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[API Client Warning] Request to ${url} failed:`, err.message);
    throw err;
  }
}

export const api = {
  // Health check
  checkHealth: () => request('/health'),

  // Auth endpoints
  auth: {
    login: (email, password) => request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
    register: (userData) => request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    me: () => request('/auth/me'),
  },

  // Trips endpoints
  trips: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/trips${query ? `?${query}` : ''}`);
    },
    getById: (id) => request(`/trips/${id}`),
    create: (tripData) => request('/trips', {
      method: 'POST',
      body: JSON.stringify(tripData),
    }),
    update: (id, updateData) => request(`/trips/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    }),
    delete: (id) => request(`/trips/${id}`, {
      method: 'DELETE',
    }),
    addActivity: (tripId, dayNumber, activity) => request(`/trips/${tripId}/activities`, {
      method: 'POST',
      body: JSON.stringify({ dayNumber, activity }),
    }),
    removeActivity: (tripId, activityId, dayNumber) => request(`/trips/${tripId}/activities/${activityId}?dayNumber=${dayNumber}`, {
      method: 'DELETE',
    }),
  },

  // Community endpoints
  community: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/community${query ? `?${query}` : ''}`);
    },
    like: (tripId) => request(`/community/${tripId}/like`, {
      method: 'POST',
    }),
    fork: (tripId) => request(`/community/${tripId}/fork`, {
      method: 'POST',
    }),
  },

  // Cities endpoints
  cities: {
    getAll: (category) => request(`/cities${category ? `?category=${category}` : ''}`),
    getById: (id) => request(`/cities/${id}`),
  }
};
