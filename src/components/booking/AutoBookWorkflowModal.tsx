import React from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, ShieldCheck, CheckCircle2, CreditCard, ArrowRight, RotateCcw } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const AutoBookWorkflowModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { autoBookWorkflowState, completeAutoBookPayment, resetAutoBookWorkflow } = useApp();

  if (!isOpen) return null;

  const { stage, appointment, customer } = autoBookWorkflowState;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Auto-Book Execution Pipeline"
      subtitle="Automated progression with duplicate-prevention and payment safeguards"
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs text-[#202923]">
        {/* Status Pipeline Display */}
        <div className="p-3.5 bg-[#F6F7F5] rounded-card border border-[#E5EAE5] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#202923]">
              {appointment?.testCentre || 'London — Mill Hill'}
            </span>
            <span className="text-[10px] font-mono bg-[#557A65] text-white px-2 py-0.5 rounded">
              Auto-Book Policy Active
            </span>
          </div>
          <p className="text-[#77817A]">
            Candidate: <strong>{customer?.name || 'Sophia Patel'}</strong> (Pre-authorized)
          </p>
          <p className="text-[#77817A]">
            Target Slot: {appointment?.date || '29 Dec 2026'} at {appointment?.time || '09:15 AM'} (Automatic)
          </p>
        </div>

        {/* Step: Verifying */}
        {stage === 'verifying' && (
          <div className="py-4 text-center space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#557A65] border-t-transparent animate-spin mx-auto" />
            <p className="font-semibold text-[#202923]">
              Live DVSA Verification & Duplicate-Attempt Check in Progress...
            </p>
            <p className="text-[11px] text-[#77817A]">
              Checking for concurrent holds or conflicting instructor commitments.
            </p>
          </div>
        )}

        {/* Step: Payment Required */}
        {stage === 'payment_required' && (
          <div className="p-4 bg-amber-50 rounded-card border border-amber-300 space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 text-amber-800">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <h4 className="font-bold text-sm">
                Mandatory Customer Action Required: Payment Handoff
              </h4>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Auto-Book successfully locked the provisional slot. In accordance with DVSA policy, the workflow safely pauses for mandatory customer booking fee authorization.
            </p>

            <div className="p-3 bg-white rounded border border-amber-200 flex items-center justify-between">
              <span>DVSA Practical Fee:</span>
              <span className="font-bold text-[#202923]">£62.00</span>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={completeAutoBookPayment}
            >
              Simulate Customer Payment Authorization
            </Button>
          </div>
        )}

        {/* Step: Payment Processing */}
        {stage === 'payment_processing' && (
          <div className="py-4 text-center space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#557A65] border-t-transparent animate-spin mx-auto" />
            <p className="font-semibold text-[#202923]">
              Confirming Official DVSA Booking Reference...
            </p>
          </div>
        )}

        {/* Step: Completed */}
        {stage === 'completed' && (
          <div className="p-4 bg-[#557A65]/10 rounded-card border border-[#557A65] space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 text-[#304F40]">
              <CheckCircle2 className="w-6 h-6 text-[#557A65]" />
              <div>
                <h4 className="font-heading font-bold text-sm text-[#202923]">
                  Auto-Book Completed & Verified (Simulated)
                </h4>
                <p className="text-xs text-[#77817A]">
                  Candidate slot confirmed for 29 Dec 2026 at London Mill Hill. Reference: DVSA-AB-774910.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-[#E5EAE5] flex justify-between">
          <Button variant="ghost" size="sm" onClick={resetAutoBookWorkflow}>
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
