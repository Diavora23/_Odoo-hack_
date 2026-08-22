import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER_TRIPS } from '../data/mockTrips';
import { COMMUNITY_TRIPS } from '../data/communityTrips';
import { INDIAN_CITIES } from '../data/indianCities';
import { generatePlansForCity } from '../utils/planGenerator';
import { calculateDetailedTripCost } from '../utils/formatters';
import { getTodayDateString } from '../utils/validation';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. User State (Mock Authenticated by default for instant delight, can switch/logout)
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

  // 2. User Trips State (Saved in LocalStorage)
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem('globetrotter_trips');
    if (savedTrips) {
      try { return JSON.parse(savedTrips); } catch (e) { /* ignore */ }
    }
    return INITIAL_USER_TRIPS;
  });

  // 3. Active Trip ID (defaults to first ongoing/upcoming trip)
  const [activeTripId, setActiveTripId] = useState(() => {
    return INITIAL_USER_TRIPS[0]?.id || null;
  });

  // 4. Current App View ('home' | 'wizard' | 'trips' | 'calendar' | 'community' | 'login' | 'register')
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

  // 7. Global Toast Notification System
  const [toasts, setToasts] = useState([]);

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

  // Toast Helper
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

  // Auth Handlers
  // TODO: API Endpoint - POST /api/v1/auth/login
  const login = (email, password) => {
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

  // TODO: API Endpoint - POST /api/v1/auth/register
  const register = (userData) => {
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

  // TODO: API Endpoint - POST /api/v1/auth/logout
  const logout = () => {
    setUser(null);
    setCurrentView('login');
    showToast('info', 'Logged Out', 'You have been signed out. Explore our public community itineraries!');
  };

  // Trip Creation & Management Handlers
  // TODO: API Endpoint - POST /api/v1/trips
  const saveTrip = (tripData) => {
    const newTrip = {
      ...tripData,
      id: tripData.id || `trip-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: tripData.status || 'upcoming',
    };

    setTrips(prev => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
    showToast('success', 'Journey Saved!', `"${newTrip.tripTitle}" added to My Trips successfully.`);
    setCurrentView('trips');
    return newTrip;
  };

  // TODO: API Endpoint - PUT /api/v1/trips/:id
  const updateTrip = (tripId, updatedData) => {
    setTrips(prev => prev.map(t => (t.id === tripId ? { ...t, ...updatedData } : t)));
    showToast('success', 'Itinerary Updated', 'Your changes have been saved.');
  };

  // TODO: API Endpoint - DELETE /api/v1/trips/:id
  const deleteTrip = (tripId) => {
    const targetTrip = trips.find(t => t.id === tripId);
    setTrips(prev => prev.filter(t => t.id !== tripId));
    if (activeTripId === tripId) {
      const remaining = trips.filter(t => t.id !== tripId);
      setActiveTripId(remaining.length > 0 ? remaining[0].id : null);
    }
    showToast('info', 'Trip Removed', `"${targetTrip?.tripTitle || 'Trip'}" has been deleted from your plans.`);
  };

  // TODO: API Endpoint - POST /api/v1/trips/fork/:communityTripId
  const forkCommunityTrip = (communityTrip) => {
    const city = INDIAN_CITIES.find(c => c.id === communityTrip.cityId) || INDIAN_CITIES[0];
    const today = getTodayDateString();
    
    // Generate fresh days sequence based on today's date
    const plans = generatePlansForCity(city.id, today, communityTrip.durationDays, communityTrip.travelers);
    const matchedPlan = plans.find(p => p.planType === 'balanced') || plans[0];

    const clonedTrip = {
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

    setTrips(prev => [clonedTrip, ...prev]);
    setActiveTripId(clonedTrip.id);
    showToast(
      'success',
      'Itinerary Forked!',
      `Cloned "${communityTrip.tripTitle}" into My Trips. You can now customize it!`
    );
    setCurrentView('trips');
  };

  // TODO: API Endpoint - POST /api/v1/community/:id/like
  const toggleLikeCommunityTrip = (tripId) => {
    setLikedTripIds(prev => {
      const isLiked = prev.includes(tripId);
      if (isLiked) {
        showToast('info', 'Unliked', 'Removed from your liked itineraries.');
        return prev.filter(id => id !== tripId);
      } else {
        showToast('success', 'Liked Itinerary!', 'Added to your favorites.');
        return [...prev, tripId];
      }
    });
  };

  // Activity customization inside an active trip or wizard draft
  // TODO: API Endpoint - POST /api/v1/trips/:id/activities
  const addCustomActivity = (targetTripId, dayNumber, newActivity) => {
    // If updating a saved trip in `trips`
    if (targetTripId && targetTripId !== 'wizard-draft') {
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
      // If updating wizardDraft
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

  // TODO: API Endpoint - DELETE /api/v1/trips/:id/activities/:actId
  const removeCustomActivity = (targetTripId, dayNumber, activityId) => {
    if (targetTripId && targetTripId !== 'wizard-draft') {
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

  // Helper to start fresh planning wizard
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
