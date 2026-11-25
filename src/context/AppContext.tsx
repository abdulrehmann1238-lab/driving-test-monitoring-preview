import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  DemoRole,
  Customer,
  Appointment,
  WorkerNode,
  Invoice,
  NotificationItem,
  BrandConfig,
  AuditLogItem,
  LiveActivityItem,
  BookingMode,
} from '../types';
import { INITIAL_CUSTOMERS } from '../data/customers';
import { INITIAL_APPOINTMENTS } from '../data/appointments';
import { INITIAL_WORKERS } from '../data/workers';
import { INITIAL_INVOICES } from '../data/invoices';
import { INITIAL_NOTIFICATIONS } from '../data/notifications';
import { INITIAL_BRANDS } from '../data/brands';
import { INITIAL_AUDIT_LOGS } from '../data/auditLogs';

export interface TimedManualState {
  active: boolean;
  appointment: Appointment | null;
  customer: Customer | null;
  stage:
    | 'idle'
    | 'detected'
    | 'reserving'
    | 'reserved'
    | 'awaiting_response'
    | 'accepted'
    | 'declined'
    | 'continuation'
    | 'payment_handoff'
    | 'completed'
    | 'expired';
  remainingSeconds: number; // 900 seconds = 15 minutes
  continuationLink: string;
  reservationToken: string;
}

export interface ManualWorkflowState {
  active: boolean;
  appointment: Appointment | null;
  customer: Customer | null;
  stage: 'idle' | 'detected' | 'reviewing' | 'accepted' | 'dismissed' | 'handoff' | 'completed';
}

export interface AutoBookWorkflowState {
  active: boolean;
  appointment: Appointment | null;
  customer: Customer | null;
  stage:
    | 'idle'
    | 'monitoring'
    | 'detected'
    | 'verifying'
    | 'provisional_lock'
    | 'payment_required'
    | 'payment_processing'
    | 'completed'
    | 'error';
  paymentHandoffUrl?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Roles and navigation
  role: DemoRole;
  setRole: (role: DemoRole) => void;
  activePath: string;
  setActivePath: (path: string) => void;

  // Brands (White-Label)
  brands: BrandConfig[];
  activeBrand: BrandConfig;
  switchBrand: (brandId: string) => void;
  updateBrand: (updated: BrandConfig) => void;

  // Entities
  customers: Customer[];
  appointments: Appointment[];
  workers: WorkerNode[];
  invoices: Invoice[];
  notifications: NotificationItem[];
  auditLogs: AuditLogItem[];
  liveActivities: LiveActivityItem[];

  // Entity Actions
  addCustomer: (cust: Omit<Customer, 'id' | 'ref' | 'createdDate' | 'lastScanTime' | 'successLikelihood' | 'activeBrandId'>) => void;
  updateCustomer: (customer: Customer) => void;
  pauseMonitoring: (customerId: string) => void;
  resumeMonitoring: (customerId: string) => void;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => void;
  markInvoicePaid: (invoiceId: string) => void;
  requestInvoiceAmendment: (invoiceId: string, details: string) => void;
  approveInvoiceAmendment: (invoiceId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addAuditLog: (action: string, resource: string, result: 'success' | 'warning' | 'denied', details?: string) => void;

  // Live Activity Feed
  isActivityFeedPaused: boolean;
  toggleActivityFeed: () => void;

  // Workflows
  timedManualState: TimedManualState;
  startTimedManualWorkflow: (appointmentId?: string, customerId?: string) => void;
  respondTimedManual: (decision: 'YES' | 'NO') => void;
  proceedToPaymentTimedManual: () => void;
  completePaymentTimedManual: () => void;
  resetTimedManualWorkflow: () => void;

  manualWorkflowState: ManualWorkflowState;
  startManualWorkflow: (appointmentId?: string, customerId?: string) => void;
  respondManual: (decision: 'PROCEED' | 'DISMISS') => void;
  resetManualWorkflow: () => void;

  autoBookWorkflowState: AutoBookWorkflowState;
  startAutoBookWorkflow: (appointmentId?: string, customerId?: string) => void;
  completeAutoBookPayment: () => void;
  resetAutoBookWorkflow: () => void;

  // Simulator
  isSimulatorRunning: boolean;
  simulatorScenario: string;
  runSimulatorScenario: (scenario: string) => void;
  resetSimulator: () => void;

  // Emergency controls
  isEmergencyStopActive: boolean;
  triggerEmergencyStop: () => void;
  resumeEmergencyStop: () => void;

  // Toast notifications
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Reset demo
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'autopass_demo_state_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load saved state or default
  const [role, setRoleState] = useState<DemoRole>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_role`);
    return (saved as DemoRole) || 'visitor';
  });

  const [activePath, setActivePath] = useState<string>('overview');

  const [brands, setBrands] = useState<BrandConfig[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_brands`);
    return saved ? JSON.parse(saved) : INITIAL_BRANDS;
  });

  const [activeBrandId, setActiveBrandId] = useState<string>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_activeBrandId`);
    return saved || 'brand-1';
  });

  const activeBrand = brands.find((b) => b.id === activeBrandId) || brands[0];

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_customers`);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_appointments`);
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [workers, setWorkers] = useState<WorkerNode[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_workers`);
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_invoices`);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_auditLogs`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [liveActivities, setLiveActivities] = useState<LiveActivityItem[]>([
    {
      id: 'act-1',
      timestamp: '10:45:11',
      type: 'approval',
      title: 'Customer Approval Received',
      description: 'James Harrington accepted provisional slot at Birmingham South Yardley.',
      statusTag: 'Accepted (YES)',
      statusVariant: 'success',
    },
    {
      id: 'act-2',
      timestamp: '10:44:50',
      type: 'reservation',
      title: 'DVSA Reservation Lock Active',
      description: 'Zoe Richardson slot locked. 15-minute countdown running on Worker RES-01.',
      statusTag: '15m Countdown',
      statusVariant: 'warning',
    },
    {
      id: 'act-3',
      timestamp: '10:43:02',
      type: 'notification',
      title: 'Multi-Channel Dispatch',
      description: 'SMS & WhatsApp alert dispatched to cust-01 with continuation token.',
      statusTag: 'Delivered',
      statusVariant: 'info',
    },
    {
      id: 'act-4',
      timestamp: '10:42:17',
      type: 'detection',
      title: 'Matching Appointment Detected',
      description: 'Worker BHX-Beta found 18 Dec 10:14 slot at Birmingham South Yardley (1,450ms).',
      statusTag: 'Matched Slot',
      statusVariant: 'success',
    },
  ]);

  const [isActivityFeedPaused, setIsActivityFeedPaused] = useState<boolean>(false);
  const [isEmergencyStopActive, setIsEmergencyStopActive] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Timed-Manual Workflow State
  const [timedManualState, setTimedManualState] = useState<TimedManualState>({
    active: true,
    appointment: INITIAL_APPOINTMENTS[0], // apt-101
    customer: INITIAL_CUSTOMERS[0], // cust-01
    stage: 'reserved',
    remainingSeconds: 834, // starts mid-countdown (approx 13m 54s)
    continuationLink: 'https://portal.drivetestmonitor.co.uk/reserve/apt-101?token=SEC-941829',
    reservationToken: 'DVSA-RES-884192',
  });

  // Manual Workflow State
  const [manualWorkflowState, setManualWorkflowState] = useState<ManualWorkflowState>({
    active: false,
    appointment: null,
    customer: null,
    stage: 'idle',
  });

  // Auto-Book Workflow State
  const [autoBookWorkflowState, setAutoBookWorkflowState] = useState<AutoBookWorkflowState>({
    active: false,
    appointment: null,
    customer: null,
    stage: 'idle',
  });

  // Simulator
  const [isSimulatorRunning, setIsSimulatorRunning] = useState<boolean>(false);
  const [simulatorScenario, setSimulatorScenario] = useState<string>('timed_manual_success');

  // Persistence side-effects
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_role`, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_brands`, JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_activeBrandId`, activeBrandId);
  }, [activeBrandId]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_customers`, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_appointments`, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_invoices`, JSON.stringify(invoices));
  }, [invoices]);

  // Dynamic CSS variables for active brand
  useEffect(() => {
    document.documentElement.style.setProperty('--brand-green', activeBrand.primaryColor);
    document.documentElement.style.setProperty('--brand-forest', activeBrand.forestColor);
    document.documentElement.style.setProperty('--brand-sage', activeBrand.sageColor);
    document.documentElement.style.setProperty('--brand-amber', activeBrand.amberColor);
  }, [activeBrand]);

  // Countdown timer for Timed-Manual reservation (1 second interval)
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (
      timedManualState.active &&
      (timedManualState.stage === 'reserved' || timedManualState.stage === 'awaiting_response' || timedManualState.stage === 'accepted' || timedManualState.stage === 'continuation') &&
      timedManualState.remainingSeconds > 0
    ) {
      timer = setInterval(() => {
        setTimedManualState((prev) => {
          if (prev.remainingSeconds <= 1) {
            addToast('Reservation Expired', 'The 15-minute provisional reservation has expired. Slot returned to pool.', 'error');
            return {
              ...prev,
              remainingSeconds: 0,
              stage: 'expired',
            };
          }
          return {
            ...prev,
            remainingSeconds: prev.remainingSeconds - 1,
          };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timedManualState.active, timedManualState.stage, timedManualState.remainingSeconds]);

  // Live activity stream simulation
  useEffect(() => {
    if (isActivityFeedPaused || isEmergencyStopActive) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomFeedPool: LiveActivityItem[] = [
        {
          id: `act-${Date.now()}-1`,
          timestamp: timeStr,
          type: 'detection',
          title: 'Regional Scan Cycle Completed',
          description: 'Worker LON-Alpha scanned 16 candidate profiles in 1,220ms without latency spike.',
          statusTag: 'Completed Cycle',
          statusVariant: 'info',
        },
        {
          id: `act-${Date.now()}-2`,
          timestamp: timeStr,
          type: 'reservation',
          title: 'Heartbeat Check Validated',
          description: 'All 8 distributed worker nodes reporting healthy latency (< 25ms ping).',
          statusTag: 'System Healthy',
          statusVariant: 'success',
        },
        {
          id: `act-${Date.now()}-3`,
          timestamp: timeStr,
          type: 'notification',
          title: 'Automated Status Sync',
          description: 'Synchronized live cancellation queue with encrypted client caches.',
          statusTag: 'Sync OK',
          statusVariant: 'info',
        },
      ];

      const item = randomFeedPool[Math.floor(Math.random() * randomFeedPool.length)];
      setLiveActivities((prev) => [item, ...prev.slice(0, 19)]);
    }, 12000); // polite 12-second pace

    return () => clearInterval(interval);
  }, [isActivityFeedPaused, isEmergencyStopActive]);

  // Set role handler with friendly toast
  const setRole = (newRole: DemoRole) => {
    setRoleState(newRole);
    setActivePath('overview');
    const roleLabels: Record<DemoRole, string> = {
      visitor: 'Public Marketing Experience',
      admin: 'Administrator Command Centre',
      staff: 'Operations Staff Dashboard',
      accountant: 'Financial & Invoice Management',
      customer: 'Learner Customer Portal',
    };
    addToast('Role Switched', `Now previewing as ${roleLabels[newRole]}`, 'info');
  };

  const switchBrand = (brandId: string) => {
    const target = brands.find((b) => b.id === brandId);
    if (target) {
      setActiveBrandId(brandId);
      addToast('Brand Switched', `Active white-label instance changed to "${target.name}"`, 'success');
    }
  };

  const updateBrand = (updated: BrandConfig) => {
    setBrands((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    addToast('Brand Settings Saved', `Updated configuration for "${updated.name}"`, 'success');
  };

  const addCustomer = (
    custData: Omit<Customer, 'id' | 'ref' | 'createdDate' | 'lastScanTime' | 'successLikelihood' | 'activeBrandId'>
  ) => {
    const newId = `cust-${String(customers.length + 1).padStart(2, '0')}`;
    const newRef = `DTM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCustomer: Customer = {
      ...custData,
      id: newId,
      ref: newRef,
      createdDate: new Date().toISOString().split('T')[0],
      lastScanTime: 'Just now',
      successLikelihood: Math.floor(82 + Math.random() * 15),
      activeBrandId: activeBrand.id,
    };

    setCustomers((prev) => [newCustomer, ...prev]);
    addAuditLog('CREATE_CUSTOMER_MONITORING_TASK', `${newCustomer.name} (${newRef})`, 'success', `Booking mode: ${newCustomer.mode}`);
    addToast('Customer Task Created', `Monitoring activated for ${newCustomer.name}`, 'success');
  };

  const updateCustomer = (updated: Customer) => {
    setCustomers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    addToast('Customer Updated', `Saved profile details for ${updated.name}`, 'info');
  };

  const pauseMonitoring = (customerId: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, monitoringStatus: 'paused' } : c))
    );
    const target = customers.find((c) => c.id === customerId);
    addAuditLog('PAUSE_MONITORING', target?.ref || customerId, 'warning', 'User or admin paused scan cycle');
    addToast('Monitoring Paused', `Search paused for ${target?.name || customerId}`, 'warning');
  };

  const resumeMonitoring = (customerId: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, monitoringStatus: 'active' } : c))
    );
    const target = customers.find((c) => c.id === customerId);
    addAuditLog('RESUME_MONITORING', target?.ref || customerId, 'success', 'Search resumed');
    addToast('Monitoring Resumed', `Active scan resumed for ${target?.name || customerId}`, 'success');
  };

  const addInvoice = (data: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    const count = invoices.length + 1;
    const prefix = data.businessProfile === 'TR' ? 'INV-TR-2026-' : 'INV-UK-2026-';
    const newInvoice: Invoice = {
      ...data,
      id: `inv-${Date.now()}`,
      invoiceNumber: `${prefix}${890 + count}`,
      amendmentStatus: 'none',
    };
    setInvoices((prev) => [newInvoice, ...prev]);
    addToast('Invoice Created', `Invoice ${newInvoice.invoiceNumber} generated`, 'success');
  };

  const markInvoicePaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? { ...inv, status: 'paid', paymentRef: `MOCK-PAY-${Date.now().toString().slice(-6)}` }
          : inv
      )
    );
    addToast('Payment Recorded', 'Invoice status marked as Paid (Simulated)', 'success');
  };

  const requestInvoiceAmendment = (invoiceId: string, details: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId ? { ...inv, amendmentStatus: 'pending_approval' } : inv
      )
    );
    addAuditLog('AMENDMENT_REQUESTED', invoiceId, 'warning', `Requested change: ${details}`);
    addToast('Amendment Submitted', 'Restricted amendment queued for senior approval', 'info');
  };

  const approveInvoiceAmendment = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId ? { ...inv, amendmentStatus: 'approved' } : inv
      )
    );
    addAuditLog('AMENDMENT_APPROVED', invoiceId, 'success', 'Approved by authorized officer');
    addToast('Amendment Approved', 'Invoice amendment validated and audit trail logged', 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Inbox Cleared', 'All notifications marked as read', 'info');
  };

  const addAuditLog = (
    action: string,
    resource: string,
    result: 'success' | 'warning' | 'denied',
    details?: string
  ) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: role === 'customer' ? 'Customer Portal' : `${role}@autopass.io`,
      role: role.toUpperCase(),
      action,
      resource,
      result,
      ipPlaceholder: '86.14.92.103',
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const toggleActivityFeed = () => {
    setIsActivityFeedPaused((prev) => !prev);
    addToast(
      isActivityFeedPaused ? 'Live Feed Resumed' : 'Live Feed Paused',
      isActivityFeedPaused ? 'Streaming simulated detections.' : 'Feed paused for inspection.',
      'info'
    );
  };

  // Timed-Manual Actions
  const startTimedManualWorkflow = (appointmentId?: string, customerId?: string) => {
    const apt = appointmentId
      ? appointments.find((a) => a.id === appointmentId) || appointments[0]
      : appointments[0];
    const cust = customerId
      ? customers.find((c) => c.id === customerId) || customers[0]
      : customers[0];

    setTimedManualState({
      active: true,
      appointment: apt,
      customer: cust,
      stage: 'reserved',
      remainingSeconds: 900, // 15 mins fresh
      continuationLink: `https://portal.drivetestmonitor.co.uk/reserve/${apt.id}?token=SEC-${Date.now().toString().slice(-6)}`,
      reservationToken: `DVSA-RES-${Math.floor(100000 + Math.random() * 900000)}`,
    });

    addToast('15-Min Reservation Initiated', `Provisional slot held at ${apt.testCentre}. Customer notified.`, 'warning');
    addAuditLog('TIMED_MANUAL_RESERVE_START', `${apt.id} (${apt.testCentre})`, 'success', '15-min countdown started');
  };

  const respondTimedManual = (decision: 'YES' | 'NO') => {
    if (decision === 'YES') {
      setTimedManualState((prev) => ({
        ...prev,
        stage: 'accepted',
      }));
      addToast('Appointment Accepted', 'Customer accepted slot! Continuation link unlocked.', 'success');
      addAuditLog('CUSTOMER_APPROVAL_ACCEPTED', timedManualState.appointment?.id || 'apt', 'success', 'Proceeding to handoff');

      // Sync customer and appointment records
      if (timedManualState.customer) {
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === timedManualState.customer?.id ? { ...c, monitoringStatus: 'reserved' } : c
          )
        );
      }
    } else {
      setTimedManualState((prev) => ({
        ...prev,
        stage: 'declined',
      }));
      addToast('Appointment Declined', 'Slot released back to DVSA queue. Monitoring resumed.', 'info');
      addAuditLog('CUSTOMER_APPROVAL_DECLINED', timedManualState.appointment?.id || 'apt', 'warning', 'Released reservation');

      if (timedManualState.customer) {
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === timedManualState.customer?.id ? { ...c, monitoringStatus: 'active' } : c
          )
        );
      }
    }
  };

  const proceedToPaymentTimedManual = () => {
    setTimedManualState((prev) => ({
      ...prev,
      stage: 'payment_handoff',
    }));
  };

  const completePaymentTimedManual = () => {
    setTimedManualState((prev) => ({
      ...prev,
      stage: 'completed',
    }));

    if (timedManualState.appointment) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === timedManualState.appointment?.id ? { ...a, status: 'completed' } : a))
      );
    }
    if (timedManualState.customer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === timedManualState.customer?.id ? { ...c, monitoringStatus: 'completed' } : c
        )
      );
    }

    addToast('Booking Completed & Verified', 'DVSA test swap confirmed! (Simulated outcome)', 'success');
    addAuditLog('BOOKING_COMPLETED_VERIFIED', timedManualState.appointment?.id || 'apt', 'success', 'Simulated booking verified');
  };

  const resetTimedManualWorkflow = () => {
    setTimedManualState({
      active: true,
      appointment: appointments[0],
      customer: customers[0],
      stage: 'reserved',
      remainingSeconds: 900,
      continuationLink: 'https://portal.drivetestmonitor.co.uk/reserve/apt-101?token=SEC-941829',
      reservationToken: 'DVSA-RES-884192',
    });
    addToast('Workflow Reset', 'Timed-Manual workflow reset to initial 15-minute countdown state', 'info');
  };

  // Manual Workflow Actions
  const startManualWorkflow = (appointmentId?: string, customerId?: string) => {
    const apt = appointmentId
      ? appointments.find((a) => a.id === appointmentId) || appointments[2]
      : appointments[2];
    const cust = customerId
      ? customers.find((c) => c.id === customerId) || customers[2]
      : customers[2];

    setManualWorkflowState({
      active: true,
      appointment: apt,
      customer: cust,
      stage: 'detected',
    });
    addToast('Manual Review Slot', `Candidate informed of available slot at ${apt.testCentre}`, 'info');
  };

  const respondManual = (decision: 'PROCEED' | 'DISMISS') => {
    if (decision === 'PROCEED') {
      setManualWorkflowState((prev) => ({
        ...prev,
        stage: 'handoff',
      }));
      addToast('Proceeding with Booking', 'Handoff to authorized DVSA booking portal initiated.', 'success');
    } else {
      setManualWorkflowState((prev) => ({
        ...prev,
        stage: 'dismissed',
      }));
      addToast('Slot Dismissed', 'Recorded dismissal. Continuing automatic search.', 'info');
    }
  };

  const resetManualWorkflow = () => {
    setManualWorkflowState({
      active: false,
      appointment: null,
      customer: null,
      stage: 'idle',
    });
  };

  // Auto-Book Workflow Actions
  const startAutoBookWorkflow = (appointmentId?: string, customerId?: string) => {
    const apt = appointmentId
      ? appointments.find((a) => a.id === appointmentId) || appointments[3]
      : appointments[3];
    const cust = customerId
      ? customers.find((c) => c.id === customerId) || customers[1]
      : customers[1];

    setAutoBookWorkflowState({
      active: true,
      appointment: apt,
      customer: cust,
      stage: 'verifying',
      paymentHandoffUrl: `https://portal.drivetestmonitor.co.uk/pay/secure?token=AB-${Date.now()}`,
    });

    addToast('Auto-Book Running', 'Slot matched criteria. Verification & provisional locking in progress...', 'info');

    // Simulate verification -> provisional lock -> payment required
    setTimeout(() => {
      setAutoBookWorkflowState((prev) => ({
        ...prev,
        stage: 'payment_required',
      }));
      addToast('Payment Handoff Required', 'Auto-Book locked slot. Mandatory customer payment required to finalize.', 'warning');
    }, 2500);
  };

  const completeAutoBookPayment = () => {
    setAutoBookWorkflowState((prev) => ({
      ...prev,
      stage: 'payment_processing',
    }));

    setTimeout(() => {
      setAutoBookWorkflowState((prev) => ({
        ...prev,
        stage: 'completed',
      }));
      addToast('Auto-Book Finished', 'Appointment locked and confirmed via DVSA simulated gateway!', 'success');
      addAuditLog('AUTO_BOOK_COMPLETED', 'London Mill Hill', 'success', 'Completed automated progression');
    }, 1800);
  };

  const resetAutoBookWorkflow = () => {
    setAutoBookWorkflowState({
      active: false,
      appointment: null,
      customer: null,
      stage: 'idle',
    });
  };

  // Admin Simulator Scenarios
  const runSimulatorScenario = (scenario: string) => {
    setSimulatorScenario(scenario);
    setIsSimulatorRunning(true);

    addToast('Simulation Started', `Executing scenario: "${scenario.replace(/_/g, ' ').toUpperCase()}"`, 'info');

    setTimeout(() => {
      setIsSimulatorRunning(false);
      addToast('Simulation Complete', `Scenario "${scenario}" completed. See state updates and logs.`, 'success');
      addAuditLog('RUN_SIMULATION_SCENARIO', scenario, 'success', 'Demonstrated via Admin Simulator');
    }, 3200);
  };

  const resetSimulator = () => {
    setIsSimulatorRunning(false);
    addToast('Simulator Reset', 'Simulation states refreshed to idle defaults.', 'info');
  };

  // Emergency Stop Controls
  const triggerEmergencyStop = () => {
    setIsEmergencyStopActive(true);
    addAuditLog('GLOBAL_EMERGENCY_STOP_TRIGGERED', 'ALL_WORKERS', 'warning', 'All automated monitoring halted');
    addToast('EMERGENCY STOP TRIGGERED', 'All monitoring scan workers paused immediately!', 'error');
  };

  const resumeEmergencyStop = () => {
    setIsEmergencyStopActive(false);
    addAuditLog('GLOBAL_EMERGENCY_STOP_CLEARED', 'ALL_WORKERS', 'success', 'Operations resumed');
    addToast('Operations Resumed', 'Monitoring workers restarted safely.', 'success');
  };

  // Reset all demo data to pristine state
  const resetAllDemoData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_role`);
    localStorage.removeItem(`${STORAGE_KEY}_brands`);
    localStorage.removeItem(`${STORAGE_KEY}_activeBrandId`);
    localStorage.removeItem(`${STORAGE_KEY}_customers`);
    localStorage.removeItem(`${STORAGE_KEY}_appointments`);
    localStorage.removeItem(`${STORAGE_KEY}_invoices`);
    localStorage.removeItem(`${STORAGE_KEY}_notifications`);
    localStorage.removeItem(`${STORAGE_KEY}_auditLogs`);

    setCustomers(INITIAL_CUSTOMERS);
    setAppointments(INITIAL_APPOINTMENTS);
    setWorkers(INITIAL_WORKERS);
    setInvoices(INITIAL_INVOICES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setBrands(INITIAL_BRANDS);
    setActiveBrandId('brand-1');
    setIsEmergencyStopActive(false);

    resetTimedManualWorkflow();
    resetManualWorkflow();
    resetAutoBookWorkflow();

    addToast('Demo Data Reset', 'All customers, appointments, invoices, and logs restored to defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activePath,
        setActivePath,
        brands,
        activeBrand,
        switchBrand,
        updateBrand,
        customers,
        appointments,
        workers,
        invoices,
        notifications,
        auditLogs,
        liveActivities,
        addCustomer,
        updateCustomer,
        pauseMonitoring,
        resumeMonitoring,
        addInvoice,
        markInvoicePaid,
        requestInvoiceAmendment,
        approveInvoiceAmendment,
        markNotificationRead,
        markAllNotificationsRead,
        addAuditLog,
        isActivityFeedPaused,
        toggleActivityFeed,
        timedManualState,
        startTimedManualWorkflow,
        respondTimedManual,
        proceedToPaymentTimedManual,
        completePaymentTimedManual,
        resetTimedManualWorkflow,
        manualWorkflowState,
        startManualWorkflow,
        respondManual,
        resetManualWorkflow,
        autoBookWorkflowState,
        startAutoBookWorkflow,
        completeAutoBookPayment,
        resetAutoBookWorkflow,
        isSimulatorRunning,
        simulatorScenario,
        runSimulatorScenario,
        resetSimulator,
        isEmergencyStopActive,
        triggerEmergencyStop,
        resumeEmergencyStop,
        toasts,
        addToast,
        removeToast,
        resetAllDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
