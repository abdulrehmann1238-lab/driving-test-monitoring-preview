import React from 'react';
import { useApp } from '../../context/AppContext';
import { DemoRoleBanner } from './DemoRoleBanner';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { LiveToastContainer } from '../common/LiveToast';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F6F7F5] flex flex-col antialiased">
      {/* Top Persistent Role Switcher & Live Brand Bar */}
      <DemoRoleBanner />

      <div className="flex-1 flex flex-row">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <MobileNav />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-8">
            {children}
          </main>
        </div>
      </div>

      {/* Live Feedback Toast Container */}
      <LiveToastContainer />
    </div>
  );
};
