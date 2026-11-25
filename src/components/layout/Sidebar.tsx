import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Activity,
  CalendarCheck,
  Calendar,
  Bell,
  Cpu,
  Layers,
  BarChart3,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Radio,
  FileText,
  UserCheck,
  PlayCircle,
  FileCheck2,
  Compass,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { role, activePath, setActivePath, activeBrand, workers, isEmergencyStopActive } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Healthy worker count
  const healthyWorkers = workers.filter((w) => w.status === 'healthy').length;

  // Role-specific navigation items
  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'customers', label: 'Customer Management', icon: <Users className="w-4 h-4" /> },
          { id: 'monitoring', label: 'Monitoring Engine', icon: <Radio className="w-4 h-4" /> },
          { id: 'bookings', label: 'Booking Activity', icon: <CalendarCheck className="w-4 h-4" /> },
          { id: 'appointments', label: 'Detection History', icon: <Calendar className="w-4 h-4" /> },
          { id: 'workers', label: 'Worker Nodes', icon: <Cpu className="w-4 h-4" /> },
          { id: 'simulator', label: 'Booking Simulator', icon: <PlayCircle className="w-4 h-4" /> },
          { id: 'revenue', label: 'Revenue & Invoicing', icon: <CreditCard className="w-4 h-4" /> },
          { id: 'analytics', label: 'Analytics & Reporting', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'notifications', label: 'Notification Relay', icon: <Bell className="w-4 h-4" /> },
          { id: 'white-label', label: 'White-Label Brands', icon: <Layers className="w-4 h-4" /> },
          { id: 'health', label: 'System Health', icon: <Activity className="w-4 h-4" /> },
          { id: 'audit-logs', label: 'Audit Logs', icon: <ShieldCheck className="w-4 h-4" /> },
          { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
        ];
      case 'staff':
        return [
          { id: 'overview', label: 'Operations Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'assigned-tasks', label: 'Assigned Learner Tasks', icon: <UserCheck className="w-4 h-4" /> },
          { id: 'monitoring', label: 'Live Monitoring', icon: <Radio className="w-4 h-4" /> },
          { id: 'bookings', label: 'Booking Handoffs', icon: <CalendarCheck className="w-4 h-4" /> },
          { id: 'detections', label: 'Slot Detections', icon: <Calendar className="w-4 h-4" /> },
          { id: 'simulator', label: 'Workflow Simulator', icon: <PlayCircle className="w-4 h-4" /> },
        ];
      case 'accountant':
        return [
          { id: 'overview', label: 'Financial Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'invoices', label: 'Invoices & Billing', icon: <FileText className="w-4 h-4" /> },
          { id: 'transactions', label: 'Transaction History', icon: <CreditCard className="w-4 h-4" /> },
          { id: 'amendments', label: 'Approval Queue', icon: <FileCheck2 className="w-4 h-4" /> },
          { id: 'reports', label: 'Financial Reports', icon: <BarChart3 className="w-4 h-4" /> },
        ];
      case 'customer':
        return [
          { id: 'overview', label: 'Search Overview', icon: <Compass className="w-4 h-4" /> },
          { id: 'application', label: 'Preferences & Form', icon: <FileText className="w-4 h-4" /> },
          { id: 'calendar', label: 'Appointment Calendar', icon: <Calendar className="w-4 h-4" /> },
          { id: 'progress', label: 'Booking Progress', icon: <CalendarCheck className="w-4 h-4" /> },
          { id: 'notifications', label: 'Notification Inbox', icon: <Bell className="w-4 h-4" /> },
        ];
      default:
        return [
          { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside
      className={`hidden md:flex flex-col bg-white border-r border-[#E5EAE5] transition-all duration-300 h-[calc(100vh-40px)] sticky top-10 select-none ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#E5EAE5]">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-[#304F40] flex items-center justify-center text-white shrink-0 shadow-subtle">
              <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
                <path d="M14 32L24 12L34 32" stroke="#EFF2EF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 25H30" stroke="#A7BBA9" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="24" cy="22" r="3" fill="#D9A85C"/>
              </svg>
            </div>
            <div className="truncate">
              <h2 className="font-heading font-bold text-sm text-[#202923] truncate">
                {activeBrand.name}
              </h2>
              <p className="text-[10px] text-[#77817A] truncate font-medium">
                AutoPass OS Enterprise
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-md text-[#77817A] hover:text-[#202923] hover:bg-[#EFF2EF] transition-colors ${
            isCollapsed ? 'mx-auto' : ''
          }`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = activePath === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePath(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-btn text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#557A65]/10 text-[#304F40] font-semibold border-l-2 border-[#557A65]'
                  : 'text-[#77817A] hover:text-[#202923] hover:bg-[#EFF2EF]'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <span className={`shrink-0 ${isActive ? 'text-[#557A65]' : 'text-[#77817A]'}`}>
                {item.icon}
              </span>
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Worker Health Pill in Footer */}
      {!isCollapsed ? (
        <div className="p-3 border-t border-[#E5EAE5] bg-[#F6F7F5]/60 m-2 rounded-card">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[11px] font-semibold text-[#202923]">Monitoring Engine</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                isEmergencyStopActive
                  ? 'bg-red-100 text-red-700'
                  : 'bg-[#557A65]/15 text-[#304F40]'
              }`}
            >
              {isEmergencyStopActive ? 'HALTED' : `${healthyWorkers}/8 Active`}
            </span>
          </div>
          <div className="w-full bg-[#E5EAE5] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isEmergencyStopActive ? 'bg-red-500 w-full' : 'bg-[#557A65] w-[92%]'
              }`}
            />
          </div>
          <p className="text-[10px] text-[#77817A] mt-1.5 flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isEmergencyStopActive ? 'bg-red-500' : 'bg-[#557A65] animate-pulse'
              }`}
            />
            {isEmergencyStopActive ? 'Emergency killswitch active' : 'Scanning 6 regional centres'}
          </p>
        </div>
      ) : (
        <div className="p-2 border-t border-[#E5EAE5] flex justify-center">
          <div
            className={`w-2 h-2 rounded-full ${
              isEmergencyStopActive ? 'bg-red-500' : 'bg-[#557A65] animate-pulse'
            }`}
            title={`${healthyWorkers}/8 Workers Active`}
          />
        </div>
      )}
    </aside>
  );
};
