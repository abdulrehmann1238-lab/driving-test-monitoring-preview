export type DemoRole = 'visitor' | 'admin' | 'staff' | 'accountant' | 'customer';

export type BookingMode = 'manual' | 'timed-manual' | 'auto-book';

export type TaskStatus = 'active' | 'scanning' | 'detected' | 'reserved' | 'completed' | 'paused' | 'failed';

export type Priority = 'standard' | 'high' | 'urgent';

export interface Customer {
  id: string;
  ref: string;
  name: string;
  email: string;
  phone: string;
  maskedLicence: string;
  testType: 'Car Practical' | 'Motorcycle' | 'ADI Part 2' | 'ADI Part 3';
  bookingPurpose: 'earlier_swap' | 'new_test';
  currentBookingDate?: string;
  currentBookingCentre?: string;
  targetDateRange: {
    start: string;
    end: string;
  };
  preferredTimes: ('morning' | 'midday' | 'afternoon')[];
  preferredDays?: string[];
  avoidDates: string[];
  selectedCentres: string[];
  preferredCentre: string;
  mode: BookingMode;
  priority: Priority;
  monitoringStatus: TaskStatus;
  createdDate: string;
  lastScanTime: string;
  successLikelihood: number; // e.g. 88%
  activeBrandId: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  testCentre: string;
  date: string;
  time: string;
  testType: string;
  transmission: 'Manual' | 'Automatic';
  detectedAt: string;
  expiresAt?: string;
  status: 'detected' | 'reserving' | 'reserved' | 'approved' | 'declined' | 'completed' | 'expired' | 'missed';
  bookingMode: BookingMode;
  fee: number;
  simulatedTiming: {
    observableAt: string;
    detectionRecordedAt: string;
    processingInitiatedAt: string;
    latencyMs: number;
  };
}

export interface WorkerNode {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'idle' | 'paused';
  assignedTasks: number;
  activeJobs: number;
  processingRate: string;
  lastHeartbeat: string;
  cpuUsage: number;
  memoryUsage: number;
  region: string;
  logs: { time: string; level: 'info' | 'warn' | 'success'; message: string }[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  currency: 'GBP' | 'TRY';
  status: 'paid' | 'pending' | 'overdue' | 'refunded';
  lineItems: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  paymentRef?: string;
  businessProfile: 'UK' | 'TR';
  eFaturaStatus?: 'Generated' | 'Queued' | 'Pending Approval' | 'Archived';
  amendmentStatus?: 'none' | 'pending_approval' | 'approved';
}

export interface NotificationItem {
  id: string;
  recipient: string;
  recipientName: string;
  channel: 'email' | 'sms' | 'whatsapp' | 'telegram';
  eventType: 
    | 'appointment_detected'
    | 'reservation_confirmed'
    | 'customer_approval_requested'
    | 'customer_accepted'
    | 'customer_declined'
    | 'continuation_link_generated'
    | 'reservation_approaching_expiry'
    | 'reservation_expired'
    | 'booking_completed'
    | 'booking_unsuccessful'
    | 'monitoring_paused';
  title: string;
  message: string;
  timestamp: string;
  status: 'delivered' | 'sent' | 'pending' | 'failed';
  retryCount: number;
  linkUrl?: string;
  read: boolean;
}

export interface BrandConfig {
  id: string;
  name: string;
  tagline: string;
  domain: string;
  primaryColor: string;
  forestColor: string;
  sageColor: string;
  amberColor: string;
  logoText: string;
  contactEmail: string;
  supportPhone: string;
  customerCount: number;
  headline: string;
  footerNotes: string;
  active: boolean;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  resource: string;
  result: 'success' | 'warning' | 'denied';
  ipPlaceholder: string;
  details?: string;
}

export interface LiveActivityItem {
  id: string;
  timestamp: string;
  type: 'detection' | 'notification' | 'reservation' | 'approval' | 'booking' | 'system';
  title: string;
  description: string;
  statusTag: string;
  statusVariant: 'success' | 'warning' | 'info' | 'critical';
}
