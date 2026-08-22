import React from 'react';
import HeroBanner from './HeroBanner';
import QuickTrips from './QuickTrips';
import FeaturedCities from './FeaturedCities';
import TravelTips from './TravelTips';

export default function DashboardPage() {
  return (
    <div className="space-y-10 pb-16 animate-fade-in">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Quick Trips Section */}
      <QuickTrips />

      {/* Featured Cities Section */}
      <FeaturedCities />

      {/* Travel Tips Guide */}
      <TravelTips />
    </div>
  );
}
