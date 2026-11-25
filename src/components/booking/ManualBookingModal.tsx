import React from 'react';
import { useApp } from '../../context/AppContext';
import { Hand, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const ManualBookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { manualWorkflowState, respondManual, resetManualWorkflow, setRole } = useApp();

  if (!isOpen) return null;

  const { stage, appointment, customer } = manualWorkflowState;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manual Mode Workflow Verification"
      subtitle="Full human oversight and deliberate decision pipeline"
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs text-[#202923]">
        {/* Slot Information */}
        <div className="p-3.5 bg-[#EFF2EF] rounded-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#202923]">
              {appointment?.testCentre || 'Leeds — Harehills'}
            </span>
            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#E5EAE5]">
              Manual Review Slot
            </span>
          </div>
          <p className="text-[#77817A]">
            Candidate: <strong>{customer?.name || 'Oliver Davies'}</strong> ({customer?.ref || 'DTM-9423'})
          </p>
          <p className="text-[#77817A]">
            Slot: {appointment?.date || '23 Dec 2026'} at {appointment?.time || '13:20'} ({appointment?.transmission || 'Manual'})
          </p>
        </div>

        {stage === 'detected' && (
          <div className="space-y-3">
            <p className="text-[#77817A] leading-relaxed">
              Monitoring detected a suitable cancellation matching learner criteria. Would authorized staff or customer like to proceed with the booking handoff?
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="primary"
                onClick={() => respondManual('PROCEED')}
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                Proceed with Booking
              </Button>
              <Button
                variant="secondary"
                onClick={() => respondManual('DISMISS')}
                icon={<XCircle className="w-4 h-4 text-red-500" />}
              >
                Dismiss Slot
              </Button>
            </div>
          </div>
        )}

        {stage === 'handoff' && (
          <div className="p-3.5 bg-[#557A65]/10 rounded-card border border-[#557A65] space-y-2">
            <h4 className="font-bold text-[#304F40]">Authorized Booking Handoff Ready</h4>
            <p className="text-xs text-[#77817A]">
              Permission verified. Candidate details and slot reference queued for authorized DVSA portal handoff.
            </p>
          </div>
        )}

        {stage === 'dismissed' && (
          <div className="p-3.5 bg-amber-50 rounded-card border border-amber-200 text-amber-800 space-y-1">
            <h4 className="font-bold">Slot Dismissed</h4>
            <p className="text-xs">
              Recorded operator dismissal. Search cycle continues across designated centres.
            </p>
          </div>
        )}

        <div className="pt-3 border-t border-[#E5EAE5] flex justify-between">
          <Button variant="ghost" size="sm" onClick={resetManualWorkflow}>
            Reset
          </Button>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
