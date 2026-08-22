import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import FloatingPlanBtn from './components/common/FloatingPlanBtn';
import ToastContainer from './components/common/ToastContainer';
import DashboardPage from './components/dashboard/DashboardPage';
import WizardPage from './components/wizard/WizardPage';
import MyTripsPage from './components/trips/MyTripsPage';
import CalendarPage from './components/calendar/CalendarPage';
import CommunityPage from './components/community/CommunityPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';

export default function App() {
  const { currentView } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-sand-50 text-slate-800">
      
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Top Navbar */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Left Navigation Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area (Offset by lg:ml-64 for fixed sidebar) */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 min-w-0 transition-all">
          {currentView === 'home' && <DashboardPage />}
          {currentView === 'wizard' && <WizardPage />}
          {currentView === 'trips' && <MyTripsPage />}
          {currentView === 'calendar' && <CalendarPage />}
          {currentView === 'community' && <CommunityPage />}
          {currentView === 'login' && <LoginPage />}
          {currentView === 'register' && <RegisterPage />}
        </main>

      </div>

      {/* Floating "+ Plan New Trip" Sticky CTA Button */}
      <FloatingPlanBtn />

    </div>
  );
}
