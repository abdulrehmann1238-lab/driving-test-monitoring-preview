import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Radio,
  CalendarCheck,
  CreditCard,
  Bell,
  Clock,
  Compass,
  FileText,
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { role, activePath, setActivePath, activeBrand, timedManualState, notifications } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const getPrimaryTabs = () => {
    switch (role) {
      case 'admin':
        return [
          { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
          { id: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
          { id: 'monitoring', label: 'Monitoring', icon: <Radio className="w-5 h-5" /> },
          { id: 'bookings', label: 'Bookings', icon: <CalendarCheck className="w-5 h-5" /> },
          { id: 'revenue', label: 'Revenue', icon: <CreditCard className="w-5 h-5" /> },
        ];
      case 'staff':
        return [
          { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
          { id: 'assigned-tasks', label: 'Tasks', icon: <Users className="w-5 h-5" /> },
          { id: 'monitoring', label: 'Monitor', icon: <Radio className="w-5 h-5" /> },
          { id: 'bookings', label: 'Bookings', icon: <CalendarCheck className="w-5 h-5" /> },
        ];
      case 'accountant':
        return [
          { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
          { id: 'invoices', label: 'Invoices', icon: <FileText className="w-5 h-5" /> },
          { id: 'transactions', label: 'Transactions', icon: <CreditCard className="w-5 h-5" /> },
        ];
      case 'customer':
        return [
          { id: 'overview', label: 'Search', icon: <Compass className="w-5 h-5" /> },
          { id: 'application', label: 'Preferences', icon: <FileText className="w-5 h-5" /> },
          { id: 'progress', label: 'Progress', icon: <CalendarCheck className="w-5 h-5" /> },
          { id: 'notifications', label: 'Inbox', icon: <Bell className="w-5 h-5" /> },
        ];
      default:
        return [];
    }
  };

  const primaryTabs = getPrimaryTabs();

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#E5EAE5] sticky top-10 z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="p-1.5 rounded-btn text-[#77817A] hover:bg-[#EFF2EF]"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-heading font-bold text-sm text-[#202923] leading-none">
              {activeBrand.name}
            </h1>
            <p className="text-[10px] text-[#77817A] capitalize font-medium">{role} View</p>
          </div>
        </div>

        {/* Live Reservation Indicator if active */}
        {timedManualState.active && timedManualState.stage === 'reserved' && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D9A85C]/15 border border-[#D9A85C]/40 text-[#8F6627] text-[11px] font-semibold tabular-nums animate-pulse">
            <Clock className="w-3 h-3" />
            <span>
              {Math.floor(timedManualState.remainingSeconds / 60)}:
              {(timedManualState.remainingSeconds % 60).toString().padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {/* Slide-over Full Navigation for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/40 backdrop-blur-xs">
          <div className="w-72 bg-white h-full shadow-modal flex flex-col p-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE5] mb-3">
              <span className="font-heading font-bold text-base text-[#202923]">Navigation</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-[#77817A] hover:bg-[#EFF2EF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1">
              {role === 'admin' && (
                <>
                  <button
                    onClick={() => { setActivePath('overview'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Platform Overview
                  </button>
                  <button
                    onClick={() => { setActivePath('customers'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Customer Management
                  </button>
                  <button
                    onClick={() => { setActivePath('monitoring'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Monitoring Engine
                  </button>
                  <button
                    onClick={() => { setActivePath('bookings'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Booking Activity
                  </button>
                  <button
                    onClick={() => { setActivePath('simulator'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Booking Simulator
                  </button>
                  <button
                    onClick={() => { setActivePath('revenue'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Revenue & Invoices
                  </button>
                  <button
                    onClick={() => { setActivePath('white-label'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    White-Label Brands
                  </button>
                  <button
                    onClick={() => { setActivePath('health'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    System Health
                  </button>
                  <button
                    onClick={() => { setActivePath('audit-logs'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Audit Logs
                  </button>
                  <button
                    onClick={() => { setActivePath('settings'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Settings
                  </button>
                </>
              )}

              {role === 'staff' && (
                <>
                  <button
                    onClick={() => { setActivePath('overview'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Operations Overview
                  </button>
                  <button
                    onClick={() => { setActivePath('assigned-tasks'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Assigned Learner Tasks
                  </button>
                  <button
                    onClick={() => { setActivePath('monitoring'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Live Monitoring Engine
                  </button>
                </>
              )}

              {role === 'customer' && (
                <>
                  <button
                    onClick={() => { setActivePath('overview'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Search Overview
                  </button>
                  <button
                    onClick={() => { setActivePath('application'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Search Application Form
                  </button>
                  <button
                    onClick={() => { setActivePath('calendar'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Appointment Calendar
                  </button>
                  <button
                    onClick={() => { setActivePath('progress'); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-btn text-xs font-medium text-[#202923] hover:bg-[#EFF2EF]"
                  >
                    Booking Progress Timeline
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsOpen(false)} />
        </div>
      )}

      {/* Bottom Fixed Navigation Bar on Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5EAE5] px-2 py-1.5 flex items-center justify-around z-30 shadow-elevated">
        {primaryTabs.map((tab) => {
          const isActive = activePath === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePath(tab.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors flex-1 ${
                isActive ? 'text-[#557A65]' : 'text-[#77817A] hover:text-[#202923]'
              }`}
            >
              {tab.icon}
              <span className={`text-[10px] mt-1 ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};
