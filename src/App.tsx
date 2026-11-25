import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoadingScreen } from './components/common/LoadingScreen';
import { LandingPage } from './components/marketing/LandingPage';
import { AppShell } from './components/layout/AppShell';

// Admin Views
import { AdminOverview } from './components/dashboards/admin/AdminOverview';
import { CustomerManagement } from './components/dashboards/admin/CustomerManagement';
import { WorkerManagement } from './components/dashboards/admin/WorkerManagement';
import { BookingsView } from './components/dashboards/admin/BookingsView';
import { AppointmentHistoryView } from './components/dashboards/admin/AppointmentHistoryView';
import { WhiteLabelBrandsView } from './components/dashboards/admin/WhiteLabelBrandsView';
import { BookingSimulatorView } from './components/dashboards/admin/BookingSimulatorView';
import { SystemHealthView } from './components/dashboards/admin/SystemHealthView';
import { AuditLogsView } from './components/dashboards/admin/AuditLogsView';
import { RevenueAnalyticsView } from './components/dashboards/admin/RevenueAnalyticsView';
import { AdminSettingsView } from './components/dashboards/admin/AdminSettingsView';

// Monitoring Engine
import { MonitoringEngineSimulator } from './components/monitoring/MonitoringEngineSimulator';

// Staff Views
import { StaffDashboard } from './components/dashboards/staff/StaffDashboard';

// Accountant Views
import { AccountantDashboard } from './components/dashboards/accountant/AccountantDashboard';

// Customer Views
import { CustomerDashboard } from './components/dashboards/customer/CustomerDashboard';
import { CustomerApplicationForm } from './components/dashboards/customer/CustomerApplicationForm';
import { CustomerCalendar } from './components/dashboards/customer/CustomerCalendar';

const MainAppContent: React.FC = () => {
  const { role, activePath, activeBrand } = useApp();
  const [initialLoading, setInitialLoading] = useState(true);

  if (initialLoading) {
    return <LoadingScreen onComplete={() => setInitialLoading(false)} brandName={activeBrand.name} />;
  }

  // If role is visitor, show the public landing marketing site
  if (role === 'visitor') {
    return <LandingPage />;
  }

  // Otherwise render within the unified AppShell
  const renderDashboardView = () => {
    switch (role) {
      case 'admin':
        switch (activePath) {
          case 'customers':
            return <CustomerManagement />;
          case 'monitoring':
            return <MonitoringEngineSimulator />;
          case 'bookings':
            return <BookingsView />;
          case 'appointments':
            return <AppointmentHistoryView />;
          case 'workers':
            return <WorkerManagement />;
          case 'simulator':
            return <BookingSimulatorView />;
          case 'revenue':
            return <AccountantDashboard />;
          case 'analytics':
            return <RevenueAnalyticsView />;
          case 'white-label':
            return <WhiteLabelBrandsView />;
          case 'health':
            return <SystemHealthView />;
          case 'audit-logs':
            return <AuditLogsView />;
          case 'settings':
            return <AdminSettingsView />;
          case 'overview':
          default:
            return <AdminOverview />;
        }

      case 'staff':
        switch (activePath) {
          case 'monitoring':
            return <MonitoringEngineSimulator />;
          case 'bookings':
            return <BookingsView />;
          case 'detections':
            return <AppointmentHistoryView />;
          case 'simulator':
            return <BookingSimulatorView />;
          case 'assigned-tasks':
          case 'overview':
          default:
            return <StaffDashboard />;
        }

      case 'accountant':
        switch (activePath) {
          case 'reports':
            return <RevenueAnalyticsView />;
          case 'invoices':
          case 'transactions':
          case 'amendments':
          case 'overview':
          default:
            return <AccountantDashboard />;
        }

      case 'customer':
        switch (activePath) {
          case 'application':
            return <CustomerApplicationForm />;
          case 'calendar':
            return <CustomerCalendar />;
          case 'progress':
          case 'notifications':
          case 'overview':
          default:
            return <CustomerDashboard />;
        }

      default:
        return <AdminOverview />;
    }
  };

  return <AppShell>{renderDashboardView()}</AppShell>;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
};

export default App;
