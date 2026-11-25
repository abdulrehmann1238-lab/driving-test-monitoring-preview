import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Search,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { NotificationCenterDrawer } from '../notifications/NotificationCenterDrawer';

export const TopBar: React.FC = () => {
  const {
    role,
    activePath,
    activeBrand,
    notifications,
    timedManualState,
  } = useApp();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const getBreadcrumbs = () => {
    const rolePrefix =
      role === 'admin'
        ? 'Admin'
        : role === 'staff'
        ? 'Operations'
        : role === 'accountant'
        ? 'Finance'
        : role === 'customer'
        ? 'Portal'
        : 'Home';

    const pathTitle = activePath.charAt(0).toUpperCase() + activePath.slice(1).replace(/-/g, ' ');

    return (
      <div className="flex items-center gap-2 text-xs text-[#77817A]">
        <span className="hover:text-[#202923] transition-colors">{rolePrefix}</span>
        <span>/</span>
        <span className="font-semibold text-[#202923]">{pathTitle}</span>
      </div>
    );
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-[#E5EAE5] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-10 z-30">
        {/* Left: Breadcrumbs & Live Reservation Chip */}
        <div className="flex items-center gap-3">
          {getBreadcrumbs()}

          {/* Active 15-minute countdown pill in top bar if active */}
          {timedManualState.active && timedManualState.stage === 'reserved' && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D9A85C]/15 border border-[#D9A85C]/35 text-[#8F6627] text-xs font-medium tabular-nums animate-pulse">
              <Clock className="w-3.5 h-3.5" />
              <span>
                Lock expires:{' '}
                {Math.floor(timedManualState.remainingSeconds / 60)}:
                {(timedManualState.remainingSeconds % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search */}
          <button
            onClick={() => setShowSearchModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#77817A] bg-[#EFF2EF] hover:bg-[#E5EAE5] border border-[#E5EAE5] rounded-btn transition-colors hidden sm:flex"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search test centres, reference...</span>
            <kbd className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E5EAE5] text-[#77817A]">
              ⌘K
            </kbd>
          </button>

          {/* Help / Simulated guide */}
          <button
            onClick={() => alert(`AutoPass Architecture Guide:\n\n• Current Brand: ${activeBrand.name}\n• Mode: Simulated Enterprise Frontend\n• Role: ${role}\n• 3 Booking Modes: Manual, Timed-Manual (15m countdown), Auto-Book\n• State is persistently synchronized locally.`)}
            className="p-2 rounded-btn text-[#77817A] hover:text-[#202923] hover:bg-[#EFF2EF] transition-colors"
            title="Platform Guide & Info"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative p-2 rounded-btn text-[#77817A] hover:text-[#202923] hover:bg-[#EFF2EF] transition-colors"
            title="Notification Centre"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#557A65] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#557A65]"></span>
              </span>
            )}
          </button>

          {/* User Profile Capsule */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#E5EAE5]">
            <div className="w-8 h-8 rounded-full bg-[#304F40] text-white flex items-center justify-center font-heading font-semibold text-xs shadow-subtle">
              {role === 'customer' ? 'JH' : role === 'accountant' ? 'AC' : role === 'staff' ? 'OP' : 'AD'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-[#202923] leading-none">
                {role === 'customer'
                  ? 'James Harrington'
                  : role === 'accountant'
                  ? 'Senior Accountant'
                  : role === 'staff'
                  ? 'Sarah Jenkins (Ops)'
                  : 'Platform Administrator'}
              </p>
              <p className="text-[10px] text-[#77817A] mt-0.5 capitalize">
                {role} • {activeBrand.name}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Dialog */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-[#202923]/40 backdrop-blur-xs">
          <div className="bg-white rounded-card shadow-modal border border-[#E5EAE5] max-w-xl w-full overflow-hidden animate-slide-in">
            <div className="flex items-center px-4 py-3 border-b border-[#E5EAE5]">
              <Search className="w-4 h-4 text-[#77817A] mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidates, reference IDs (e.g. DTM-9421), test centres..."
                className="w-full text-sm outline-none text-[#202923] placeholder-[#77817A]"
                autoFocus
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-xs text-[#77817A] hover:text-[#202923] px-2 py-1 bg-[#EFF2EF] rounded"
              >
                ESC
              </button>
            </div>
            <div className="p-3 max-h-72 overflow-y-auto">
              <p className="text-[11px] font-semibold text-[#77817A] uppercase tracking-wider mb-2 px-2">
                Quick Navigation & Matches
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="w-full flex items-center justify-between p-2 rounded-md hover:bg-[#EFF2EF] text-left text-xs transition-colors"
                >
                  <span className="font-medium text-[#202923]">James Harrington (DTM-9421)</span>
                  <span className="text-[10px] text-[#557A65] bg-[#557A65]/10 px-2 py-0.5 rounded">
                    Birmingham South Yardley • Reserved
                  </span>
                </button>
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="w-full flex items-center justify-between p-2 rounded-md hover:bg-[#EFF2EF] text-left text-xs transition-colors"
                >
                  <span className="font-medium text-[#202923]">Sophia Patel (DTM-9422)</span>
                  <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    London Mill Hill • Auto-Book
                  </span>
                </button>
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="w-full flex items-center justify-between p-2 rounded-md hover:bg-[#EFF2EF] text-left text-xs transition-colors"
                >
                  <span className="font-medium text-[#202923]">Leeds Harehills Test Centre</span>
                  <span className="text-[10px] text-[#77817A]">4 active candidate queues</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Notification Center Drawer */}
      <NotificationCenterDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
};
