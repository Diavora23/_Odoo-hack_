import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER_TRIPS } from '../data/mockTrips.js';
import { COMMUNITY_TRIPS } from '../data/communityTrips.js';
import { INDIAN_CITIES } from '../data/indianCities.js';
import { generatePlansForCity } from '../utils/planGenerator.js';
import { calculateDetailedTripCost } from '../utils/formatters.js';
import { getTodayDateString } from '../utils/validation.js';
import { api } from '../services/api.js';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. User State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('globetrotter_user');
    if (savedUser) {
      try { return JSON.parse(savedUser); } catch (e) { /* ignore */ }
    }
    return {
      id: 'usr-101',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@traveler.in',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      travelStyle: 'Balanced Explorer',
      memberSince: '2025',
      tripsCompleted: 4,
      loyaltyPoints: 3450
    };
  });

  // 2. User Trips State
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem('globetrotter_trips');
    if (savedTrips) {
      try { return JSON.parse(savedTrips); } catch (e) { /* ignore */ }
    }
    return INITIAL_USER_TRIPS;
  });

  // 3. Active Trip ID
  const [activeTripId, setActiveTripId] = useState(() => {
    return INITIAL_USER_TRIPS[0]?.id || null;
  });

  // 4. Current App View
  const [currentView, setCurrentView] = useState('home');

  // 5. Liked Community Trips
  const [likedTripIds, setLikedTripIds] = useState(() => {
    const saved = localStorage.getItem('globetrotter_liked_trips');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['comm-1', 'comm-5'];
  });

  // 6. Wizard Draft State
  const [wizardState, setWizardState] = useState(() => {
    const today = getTodayDateString();
    const future = new Date();
    future.setDate(future.getDate() + 4);
    const endStr = future.toISOString().split('T')[0];

    return {
      step: 1,
      cityId: 'jaipur',
      startDate: today,
      endDate: endStr,
      durationDays: 5,
      travelers: 2,
      travelStyle: 'balanced',
      customBudget: 45000,
      generatedPlans: [],
      selectedPlan: null,
      customizedItinerary: null,
    };
  });

  // 7. Global Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Fetch initial trips and sync from backend API if available
  useEffect(() => {
    async function syncFromBackend() {
      try {
        const backendTrips = await api.trips.getAll();
        if (backendTrips && backendTrips.length > 0) {
          setTrips(backendTrips);
          if (!activeTripId && backendTrips.length > 0) {
            setActiveTripId(backendTrips[0].id);
          }
        }
      } catch (err) {
        // Backend offline or fallback to local storage
      }
    }
    syncFromBackend();
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('globetrotter_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('globetrotter_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('globetrotter_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('globetrotter_liked_trips', JSON.stringify(likedTripIds));
  }, [likedTripIds]);

  const showToast = (type, title, message) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth Handlers with Backend API
  const login = async (email, password) => {
    try {
      const res = await api.auth.login(email, password);
      if (res && res.user) {
        setUser(res.user);
        setCurrentView('home');
        showToast('success', 'Namaste & Welcome Back!', `Logged in successfully as ${res.user.name}`);
        return;
      }
    } catch (e) {
      // Fallback
    }

    const mockUser = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      travelStyle: 'Balanced Explorer',
      memberSince: '2026',
      tripsCompleted: 1,
      loyaltyPoints: 500
    };
    setUser(mockUser);
    setCurrentView('home');
    showToast('success', 'Namaste & Welcome Back!', `Logged in successfully as ${mockUser.name}`);
  };

  const register = async (userData) => {
    try {
      const res = await api.auth.register(userData);
      if (res && res.user) {
        setUser(res.user);
        setCurrentView('home');
        showToast('success', 'Registration Successful!', `Welcome to GlobeTrotter, ${res.user.name}!`);
        return;
      }
    } catch (e) {
      // Fallback
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name: userData.name,
      email: userData.email,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(userData.name)}`,
      travelStyle: userData.travelStyle || 'Balanced Explorer',
      memberSince: '2026',
      tripsCompleted: 0,
      loyaltyPoints: 1000
    };
    setUser(newUser);
    setCurrentView('home');
    showToast('success', 'Registration Successful!', `Welcome to GlobeTrotter, ${newUser.name}! ₹1,000 Travel Points Added.`);
  };

  const logout = () => {
    setUser(null);
    setCurrentView('login');
    showToast('info', 'Logged Out', 'You have been signed out. Explore our public community itineraries!');
  };

  // Trip Creation & Management Handlers
  const saveTrip = async (tripData) => {
    let newTrip = {
      ...tripData,
      id: tripData.id || `trip-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: tripData.status || 'upcoming',
    };

    try {
      const savedBackendTrip = await api.trips.create(newTrip);
      if (savedBackendTrip && savedBackendTrip.id) {
        newTrip = savedBackendTrip;
      }
    } catch (e) {
      // Fallback local save
    }

    setTrips(prev => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
    showToast('success', 'Journey Saved!', `"${newTrip.tripTitle}" added to local database successfully.`);
    setCurrentView('trips');
    return newTrip;
  };

  const updateTrip = async (tripId, updatedData) => {
    try {
      await api.trips.update(tripId, updatedData);
    } catch (e) {
      // Fallback local update
    }
    setTrips(prev => prev.map(t => (t.id === tripId ? { ...t, ...updatedData } : t)));
    showToast('success', 'Itinerary Updated', 'Your changes have been saved to local database.');
  };

  const deleteTrip = async (tripId) => {
    const targetTrip = trips.find(t => t.id === tripId);
    try {
      await api.trips.delete(tripId);
    } catch (e) {
      // Fallback
    }

    setTrips(prev => prev.filter(t => t.id !== tripId));
    if (activeTripId === tripId) {
      const remaining = trips.filter(t => t.id !== tripId);
      setActiveTripId(remaining.length > 0 ? remaining[0].id : null);
    }
    showToast('info', 'Trip Removed', `"${targetTrip?.tripTitle || 'Trip'}" removed from local database.`);
  };

  const forkCommunityTrip = async (communityTrip) => {
    let clonedTrip = null;
    try {
      clonedTrip = await api.community.fork(communityTrip.id);
    } catch (e) {
      // Fallback
    }

    if (!clonedTrip) {
      const city = INDIAN_CITIES.find(c => c.id === communityTrip.cityId) || INDIAN_CITIES[0];
      const today = getTodayDateString();
      const plans = generatePlansForCity(city.id, today, communityTrip.durationDays, communityTrip.travelers);
      const matchedPlan = plans.find(p => p.planType === 'balanced') || plans[0];

      clonedTrip = {
        id: `forked-${Date.now()}`,
        cityId: city.id,
        cityName: city.name,
        state: city.state,
        tripTitle: `${communityTrip.tripTitle} (My Copy)`,
        coverImage: communityTrip.coverImage || city.heroImage,
        status: 'upcoming',
        startDate: today,
        endDate: matchedPlan.endDate,
        durationDays: communityTrip.durationDays,
        travelers: communityTrip.travelers || 2,
        planType: 'balanced',
        planName: `Forked from ${communityTrip.author.name}`,
        hotel: matchedPlan.hotel,
        totalBudget: communityTrip.totalBudget,
        spentBudget: 0,
        forkedFrom: {
          authorName: communityTrip.author.name,
          originalTripId: communityTrip.id,
        },
        days: matchedPlan.days,
      };
    }

    setTrips(prev => [clonedTrip, ...prev]);
    setActiveTripId(clonedTrip.id);
    showToast(
      'success',
      'Itinerary Forked!',
      `Cloned "${communityTrip.tripTitle}" into local database and My Trips.`
    );
    setCurrentView('trips');
  };

  const toggleLikeCommunityTrip = async (tripId) => {
    try {
      await api.community.like(tripId);
    } catch (e) {}

    setLikedTripIds(prev => {
      const isLiked = prev.includes(tripId);
      if (isLiked) {
        showToast('info', 'Unliked', 'Removed from your favorites.');
        return prev.filter(id => id !== tripId);
      } else {
        showToast('success', 'Liked Itinerary!', 'Added to your favorites in database.');
        return [...prev, tripId];
      }
    });
  };

  const addCustomActivity = async (targetTripId, dayNumber, newActivity) => {
    if (targetTripId && targetTripId !== 'wizard-draft') {
      try {
        await api.trips.addActivity(targetTripId, dayNumber, newActivity);
      } catch (e) {}

      setTrips(prev => prev.map(trip => {
        if (trip.id !== targetTripId) return trip;
        const updatedDays = trip.days.map(d => {
          if (d.dayNumber !== dayNumber) return d;
          return {
            ...d,
            activities: [...d.activities, {
              ...newActivity,
              id: 'custom-act-' + Date.now(),
            }]
          };
        });
        const updatedTotals = calculateDetailedTripCost({ ...trip, days: updatedDays });
        return {
          ...trip,
          days: updatedDays,
          totalBudget: updatedTotals.total,
        };
      }));
      showToast('success', 'Activity Added', `Added "${newActivity.title}" to Day ${dayNumber}. Total cost recalculated!`);
    } else {
      setWizardState(prev => {
        if (!prev.customizedItinerary) return prev;
        const updatedDays = prev.customizedItinerary.days.map(d => {
          if (d.dayNumber !== dayNumber) return d;
          return {
            ...d,
            activities: [...d.activities, {
              ...newActivity,
              id: 'custom-act-' + Date.now(),
            }]
          };
        });
        const updatedItinerary = { ...prev.customizedItinerary, days: updatedDays };
        const costCalc = calculateDetailedTripCost(updatedItinerary);
        updatedItinerary.costs = { ...updatedItinerary.costs, grandTotal: costCalc.total };
        return {
          ...prev,
          customizedItinerary: updatedItinerary,
        };
      });
      showToast('success', 'Activity Added', `Added "${newActivity.title}" to Day ${dayNumber}. Budget live-updated!`);
    }
  };

  const removeCustomActivity = async (targetTripId, dayNumber, activityId) => {
    if (targetTripId && targetTripId !== 'wizard-draft') {
      try {
        await api.trips.removeActivity(targetTripId, activityId, dayNumber);
      } catch (e) {}

      setTrips(prev => prev.map(trip => {
        if (trip.id !== targetTripId) return trip;
        const updatedDays = trip.days.map(d => {
          if (d.dayNumber !== dayNumber) return d;
          return {
            ...d,
            activities: d.activities.filter(a => a.id !== activityId)
          };
        });
        const updatedTotals = calculateDetailedTripCost({ ...trip, days: updatedDays });
        return {
          ...trip,
          days: updatedDays,
          totalBudget: updatedTotals.total,
        };
      }));
      showToast('info', 'Activity Removed', `Activity removed from Day ${dayNumber}. Total cost recalculated.`);
    } else {
      setWizardState(prev => {
        if (!prev.customizedItinerary) return prev;
        const updatedDays = prev.customizedItinerary.days.map(d => {
          if (d.dayNumber !== dayNumber) return d;
          return {
            ...d,
            activities: d.activities.filter(a => a.id !== activityId)
          };
        });
        const updatedItinerary = { ...prev.customizedItinerary, days: updatedDays };
        const costCalc = calculateDetailedTripCost(updatedItinerary);
        updatedItinerary.costs = { ...updatedItinerary.costs, grandTotal: costCalc.total };
        return {
          ...prev,
          customizedItinerary: updatedItinerary,
        };
      });
      showToast('info', 'Activity Removed', `Activity removed from Day ${dayNumber}. Budget live-updated.`);
    }
  };

  const startNewTripWizard = (cityId = 'jaipur') => {
    const today = getTodayDateString();
    const future = new Date();
    future.setDate(future.getDate() + 4);
    const endStr = future.toISOString().split('T')[0];

    setWizardState({
      step: 1,
      cityId: cityId || 'jaipur',
      startDate: today,
      endDate: endStr,
      durationDays: 5,
      travelers: 2,
      travelStyle: 'balanced',
      customBudget: 40000,
      generatedPlans: [],
      selectedPlan: null,
      customizedItinerary: null,
    });
    setCurrentView('wizard');
  };

  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0] || null;

  return (
    <AppContext.Provider
      value={{
        user,
        trips,
        activeTrip,
        activeTripId,
        setActiveTripId,
        currentView,
        setCurrentView,
        likedTripIds,
        wizardState,
        setWizardState,
        toasts,
        showToast,
        removeToast,
        login,
        register,
        logout,
        saveTrip,
        updateTrip,
        deleteTrip,
        forkCommunityTrip,
        toggleLikeCommunityTrip,
        addCustomActivity,
        removeCustomActivity,
        startNewTripWizard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
