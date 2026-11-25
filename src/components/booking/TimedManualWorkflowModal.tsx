import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  AlertTriangle,
  ArrowRight,
  Send,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const TimedManualWorkflowModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const {
    timedManualState,
    respondTimedManual,
    proceedToPaymentTimedManual,
    completePaymentTimedManual,
    resetTimedManualWorkflow,
    addToast,
  } = useApp();

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { stage, remainingSeconds, appointment, customer, continuationLink, reservationToken } = timedManualState;

  const mins = Math.floor(remainingSeconds / 60);
  const secs = (remainingSeconds % 60).toString().padStart(2, '0');

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(continuationLink);
    setCopied(true);
    addToast('Link Copied', 'Secure continuation token copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Timed-Manual Reservation Workflow"
      subtitle="DVSA 15-Minute Provisional Lock & Automated Candidate Response"
      maxWidth="2xl"
    >
      <div className="space-y-6 text-xs text-[#202923]">
        {/* Reservation Status & Live Countdown Clock */}
        <div className="p-4 rounded-card bg-[#304F40] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#A7BBA9] uppercase block font-bold">
              DVSA PROVISIONAL LOCK TOKEN: {reservationToken}
            </span>
            <h3 className="font-heading font-extrabold text-base text-white mt-0.5">
              {appointment?.testCentre || 'Birmingham — South Yardley'}
            </h3>
            <p className="text-xs text-[#EFF2EF]/80">
              {appointment?.date || '18 Dec 2026'} at {appointment?.time || '10:14 AM'} ({appointment?.transmission || 'Manual'})
            </p>
          </div>

          {/* Active Countdown Display */}
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[10px] text-[#A7BBA9] uppercase font-mono">
              Remaining Lock Window
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <Clock className="w-5 h-5 text-[#D9A85C] animate-pulse" />
              <span className="text-3xl font-heading font-extrabold text-[#D9A85C] tabular-nums tracking-tight">
                {mins}:{secs}
              </span>
            </div>
            <span className="text-[10px] text-[#EFF2EF]/70">
              {remainingSeconds > 0 ? 'Updating every second' : 'Slot released'}
            </span>
          </div>
        </div>

        {/* Stage Progression Breadcrumb */}
        <div className="p-3 bg-[#F6F7F5] rounded-card border border-[#E5EAE5] space-y-2">
          <span className="text-[10px] text-[#77817A] uppercase font-bold block">
            Workflow Progression Stages:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-[#557A65]/15 text-[#304F40] font-semibold">
              1. Detected (1,450ms)
            </span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-[#557A65]/15 text-[#304F40] font-semibold">
              2. Lock Confirmed
            </span>
            <span>→</span>
            <span
              className={`px-2 py-0.5 rounded font-semibold ${
                stage === 'reserved'
                  ? 'bg-[#D9A85C] text-white animate-pulse'
                  : stage === 'accepted' || stage === 'continuation' || stage === 'payment_handoff' || stage === 'completed'
                  ? 'bg-[#557A65]/15 text-[#304F40]'
                  : 'bg-[#EFF2EF] text-[#77817A]'
              }`}
            >
              3. Awaiting Customer
            </span>
            <span>→</span>
            <span
              className={`px-2 py-0.5 rounded font-semibold ${
                stage === 'accepted' || stage === 'continuation'
                  ? 'bg-[#557A65] text-white'
                  : stage === 'completed'
                  ? 'bg-[#557A65]/15 text-[#304F40]'
                  : 'bg-[#EFF2EF] text-[#77817A]'
              }`}
            >
              4. Continuation Link
            </span>
            <span>→</span>
            <span
              className={`px-2 py-0.5 rounded font-semibold ${
                stage === 'payment_handoff'
                  ? 'bg-[#D9A85C] text-white animate-pulse'
                  : stage === 'completed'
                  ? 'bg-[#557A65] text-white'
                  : 'bg-[#EFF2EF] text-[#77817A]'
              }`}
            >
              5. Final Payment & Verified
            </span>
          </div>
        </div>

        {/* Interactive Customer Approval Decision Stage */}
        {stage === 'reserved' && (
          <div className="p-4 bg-white rounded-card border-2 border-[#D9A85C] shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8F6627] uppercase">
                Customer Interactive Decision
              </span>
              <span className="text-[11px] text-[#77817A]">
                Dispatched to {customer?.phone || '+44 7700 900142'} via SMS
              </span>
            </div>

            <p className="text-xs text-[#202923]">
              Provisional lock active on DVSA gateway. Would candidate {customer?.name} like to accept this slot?
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
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
                <span>NO — Decline Slot</span>
              </button>
            </div>
          </div>
        )}

        {/* If Accepted: Show Continuation Link & Copy Action */}
        {(stage === 'accepted' || stage === 'continuation') && (
          <div className="p-4 bg-white rounded-card border border-[#557A65] shadow-subtle space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-[#557A65]">
              <CheckCircle2 className="w-5 h-5" />
              <h4 className="font-heading font-bold text-sm text-[#202923]">
                Customer Accepted! Secure Continuation Link Generated
              </h4>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#77817A] uppercase font-mono block">
                One-Time Cryptographic Continuation URL:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={continuationLink}
                  className="flex-1 p-2 bg-[#F6F7F5] border border-[#E5EAE5] rounded text-xs font-mono text-[#202923] select-all outline-none"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  icon={copied ? <Check className="w-3.5 h-3.5 text-[#557A65]" /> : <Copy className="w-3.5 h-3.5" />}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-[11px] text-[#77817A]">
                Remaining hold time: {mins}:{secs}
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={proceedToPaymentTimedManual}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                Proceed to Payment Verification Handoff
              </Button>
            </div>
          </div>
        )}

        {/* If Declined */}
        {stage === 'declined' && (
          <div className="p-4 bg-amber-50 rounded-card border border-amber-200 text-amber-800 space-y-2">
            <h4 className="font-heading font-bold text-sm">Provisional Reservation Released</h4>
            <p className="text-xs">
              Candidate declined the 18 Dec slot. The slot was released back to the general DVSA queue and candidate {customer?.name} was safely returned to the active monitoring pool.
            </p>
          </div>
        )}

        {/* Payment Handoff Stage */}
        {stage === 'payment_handoff' && (
          <div className="p-4 bg-white rounded-card border border-[#D9A85C] shadow-subtle space-y-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#D9A85C]" />
              <h4 className="font-heading font-bold text-sm text-[#202923]">
                Simulated Payment Settlement Handoff
              </h4>
            </div>
            <p className="text-xs text-[#77817A]">
              Official DVSA standard test booking fee (£62.00) settlement via secure payment gateway handoff.
            </p>
            <div className="p-3 bg-[#F6F7F5] rounded text-xs flex justify-between">
              <span>DVSA Practical Fee:</span>
              <span className="font-bold text-[#202923]">£62.00</span>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="primary"
                onClick={completePaymentTimedManual}
              >
                Simulate Payment Confirmation
              </Button>
            </div>
          </div>
        )}

        {/* Booking Completed Stage */}
        {stage === 'completed' && (
          <div className="p-4 bg-[#557A65]/10 rounded-card border border-[#557A65] space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 text-[#304F40]">
              <CheckCircle2 className="w-6 h-6 text-[#557A65]" />
              <div>
                <h4 className="font-heading font-bold text-sm text-[#202923]">
                  Booking Completed & Verified (Simulated Outcome)
                </h4>
                <p className="text-xs text-[#77817A]">
                  New test date: 18 Dec 2026 at Birmingham South Yardley. Confirmation reference: DVSA-9941829.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Expired Stage */}
        {stage === 'expired' && (
          <div className="p-4 bg-red-50 rounded-card border border-red-200 text-red-700 space-y-2">
            <h4 className="font-heading font-bold text-sm">15-Minute Reservation Expired</h4>
            <p className="text-xs">
              The provisional lock timed out without candidate response. Slot was safely released to prevent penalty locks.
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#E5EAE5] flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTimedManualWorkflow}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Replay 15-Min Workflow
          </Button>

          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Window
          </Button>
        </div>
      </div>
    </Modal>
  );
};
