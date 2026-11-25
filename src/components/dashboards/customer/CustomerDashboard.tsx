import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Compass,
  Radio,
  Clock,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  Copy,
  ExternalLink,
  Bell,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { TimedManualWorkflowModal } from '../../booking/TimedManualWorkflowModal';

export const CustomerDashboard: React.FC = () => {
  const {
    customers,
    timedManualState,
    respondTimedManual,
    proceedToPaymentTimedManual,
    startTimedManualWorkflow,
    setActivePath,
    notifications,
    markNotificationRead,
    addToast,
  } = useApp();

  const [showTimedModal, setShowTimedModal] = useState(false);

  // Default active demo customer: James Harrington (cust-01)
  const currentCustomer = customers[0];

  const { stage, remainingSeconds, appointment, continuationLink } = timedManualState;
  const mins = Math.floor(remainingSeconds / 60);
  const secs = (remainingSeconds % 60).toString().padStart(2, '0');

  // Customer notifications
  const customerNotifs = notifications.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Customer Welcome Header (Prompt Requirement) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            Good morning, {currentCustomer?.name.split(' ')[0] || 'James'}.
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Here's the latest update on your driving test search.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActivePath('application')}
            icon={<Compass className="w-3.5 h-3.5" />}
          >
            Update Preferences
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setActivePath('calendar')}
            icon={<Calendar className="w-3.5 h-3.5" />}
          >
            View Calendar
          </Button>
        </div>
      </div>

      {/* PROMINENT MONITORING STATUS CARD (Prompt Section 12 Requirement) */}
      <div className="rounded-card bg-white border border-[#E5EAE5] p-5 sm:p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5EAE5]">
          <div className="space-y-1">
            <span className="text-[11px] font-bold font-mono text-[#557A65] tracking-widest uppercase">
              MONITORING ACTIVE
            </span>
            <h2 className="text-xl font-heading font-bold text-[#202923] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#557A65]" />
              Birmingham — South Yardley
            </h2>
            <p className="text-xs text-[#77817A]">
              Earlier Test Search • Target window: <strong className="text-[#202923]">12–26 December 2026</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="amber" size="md">
              Mode: Timed-Manual
            </Badge>
            <Badge variant="green" size="md" dot>
              Priority: High
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-[#F6F7F5] rounded">
            <span className="text-[10px] text-[#77817A] block">Current Slot (Existing)</span>
            <span className="font-semibold text-[#202923]">14 April 2027</span>
          </div>
          <div className="p-3 bg-[#F6F7F5] rounded">
            <span className="text-[10px] text-[#77817A] block">Target Date Gain</span>
            <span className="font-semibold text-[#557A65] font-mono">+4 Months Earlier</span>
          </div>
          <div className="p-3 bg-[#F6F7F5] rounded">
            <span className="text-[10px] text-[#77817A] block">Last Simulated Scan</span>
            <span className="font-mono text-[#202923]">10:42:17 (Worker BHX)</span>
          </div>
          <div className="p-3 bg-[#F6F7F5] rounded">
            <span className="text-[10px] text-[#77817A] block">Success Likelihood</span>
            <span className="font-bold text-[#304F40] font-mono">94% (Illustrative)</span>
          </div>
        </div>
      </div>

      {/* FLAGSHIP YES / NO CUSTOMER APPROVAL CARD (When Slot Reserved) */}
      {timedManualState.active && (
        <div className="rounded-card bg-white border-2 border-[#D9A85C] p-5 shadow-elevated space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E5EAE5]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D9A85C]/15 text-[#8F6627] flex items-center justify-center">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#8F6627] bg-[#D9A85C]/20 px-2 py-0.5 rounded">
                  NEW APPOINTMENT DETECTED & RESERVED
                </span>
                <h3 className="font-heading font-extrabold text-base text-[#202923] mt-1">
                  Friday, 18 Dec 2026 • 10:14 AM at Birmingham South Yardley
                </h3>
              </div>
            </div>

            {/* 15m Countdown Pill */}
            <div className="flex items-center gap-2 bg-[#D9A85C]/15 border border-[#D9A85C]/40 px-3 py-1.5 rounded-full text-xs font-bold text-[#8F6627] tabular-nums">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Provisional Lock Expires: {mins}:{secs}</span>
            </div>
          </div>

          {/* YES / NO Action Buttons (Prompt Requirement) */}
          {stage === 'reserved' && (
            <div className="space-y-3">
              <p className="text-xs text-[#202923]">
                This cancellation was provisionally locked for you. Would you like to accept this appointment?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => respondTimedManual('YES')}
                  className="py-3 px-4 rounded-btn bg-[#557A65] hover:bg-[#304F40] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-subtle transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>YES — Accept Appointment</span>
                </button>
                <button
                  onClick={() => respondTimedManual('NO')}
                  className="py-3 px-4 rounded-btn bg-[#EFF2EF] hover:bg-[#E5EAE5] text-[#202923] font-bold text-xs flex items-center justify-center gap-2 border border-[#E5EAE5] transition-all"
                >
                  <XCircle className="w-4 h-4 text-[#C87570]" />
                  <span>NO — Decline Appointment</span>
                </button>
              </div>
            </div>
          )}

          {/* If Accepted: Show Continuation Link & Payment Handoff */}
          {(stage === 'accepted' || stage === 'continuation') && (
            <div className="p-3.5 bg-[#557A65]/10 rounded border border-[#557A65] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#304F40]">
                  ✓ You Accepted this Slot! Continuation Link Ready
                </span>
                <span className="text-[10px] font-mono text-[#557A65]">{mins}:{secs} remaining</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={continuationLink}
                  className="flex-1 p-2 bg-white border border-[#E5EAE5] rounded text-xs font-mono text-[#202923]"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={proceedToPaymentTimedManual}
                >
                  Proceed to Payment
                </Button>
              </div>
            </div>
          )}

          {/* If Declined */}
          {stage === 'declined' && (
            <div className="p-3.5 bg-amber-50 rounded border border-amber-200 text-amber-800 text-xs">
              Slot declined. Released back to general queue. Monitoring continues automatically.
            </div>
          )}

          {/* If Completed */}
          {stage === 'completed' && (
            <div className="p-3.5 bg-green-50 rounded border border-green-200 text-green-800 text-xs font-semibold">
              ✓ Booking Completed & Verified! DVSA Booking Reference: DVSA-9941829.
            </div>
          )}
        </div>
      )}

      {/* Grid: Booking Progress Vertical Timeline & Notifications Inbox */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vertical Booking Progress Timeline (Prompt Requirement) */}
        <div className="bg-white rounded-card border border-[#E5EAE5] p-5 shadow-card">
          <h3 className="font-heading font-bold text-sm text-[#202923] mb-4">
            Booking Progression Timeline
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5EAE5]">
            <div className="relative">
              <span className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-[#557A65]" />
              <p className="text-xs font-bold text-[#202923]">Monitoring Started</p>
              <p className="text-[11px] text-[#77817A]">Worker BHX-Beta initialized 10 Nov 2026</p>
            </div>

            <div className="relative">
              <span className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-[#557A65]" />
              <p className="text-xs font-bold text-[#202923]">Appointment Detected</p>
              <p className="text-[11px] text-[#77817A]">18 Dec slot matched criteria in 1,450ms</p>
            </div>

            <div className="relative">
              <span className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-[#D9A85C] animate-pulse" />
              <p className="text-xs font-bold text-[#8F6627]">Reservation Initiated & Confirmed</p>
              <p className="text-[11px] text-[#77817A]">15-minute provisional hold active on gateway</p>
            </div>

            <div className="relative opacity-60">
              <span className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-[#E5EAE5]" />
              <p className="text-xs font-bold text-[#202923]">Customer Approval Received</p>
              <p className="text-[11px] text-[#77817A]">Awaiting YES/NO decision or completion</p>
            </div>

            <div className="relative opacity-60">
              <span className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-[#E5EAE5]" />
              <p className="text-xs font-bold text-[#202923]">Official Booking Completion</p>
              <p className="text-[11px] text-[#77817A]">Handoff & DVSA reference verification</p>
            </div>
          </div>
        </div>

        {/* Customer Notification Inbox (Prompt Requirement) */}
        <div className="bg-white rounded-card border border-[#E5EAE5] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-sm text-[#202923]">
                Candidate Notification Inbox
              </h3>
              <span className="text-[10px] font-mono text-[#557A65]">SMS • WhatsApp Relay</span>
            </div>

            <div className="space-y-3">
              {customerNotifs.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-3 rounded-card border transition-all cursor-pointer ${
                    !n.read ? 'bg-[#557A65]/5 border-[#557A65]/30' : 'bg-[#F6F7F5] border-[#E5EAE5]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-[#202923]">{n.title}</span>
                    <span className="text-[10px] text-[#77817A] font-mono">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#77817A]">{n.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5EAE5] mt-4 flex justify-between items-center text-xs">
            <span className="text-[#77817A]">4 alerts in history</span>
            <button
              onClick={() => addToast('Preferences Saved', 'Alert notification channels updated.', 'info')}
              className="text-[#557A65] font-semibold hover:underline"
            >
              Configure Relay Channels
            </button>
          </div>
        </div>
      </div>

      <TimedManualWorkflowModal
        isOpen={showTimedModal}
        onClose={() => setShowTimedModal(false)}
      />
    </div>
  );
};
