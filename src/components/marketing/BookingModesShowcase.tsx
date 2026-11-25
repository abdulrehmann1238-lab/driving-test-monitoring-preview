import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hand, Clock, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const BookingModesShowcase: React.FC = () => {
  const { setRole, startTimedManualWorkflow, startManualWorkflow, startAutoBookWorkflow } = useApp();
  const [activeModal, setActiveModal] = useState<'manual' | 'timed' | 'auto' | null>(null);

  return (
    <section className="py-20 bg-[#F6F7F5] border-b border-[#E5EAE5]" id="booking-modes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#557A65] font-mono">
            THREE DISTINCT EXECUTION MODES
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#202923] tracking-tight">
            Tailored Automation for Every Learner.
          </h2>
          <p className="text-sm sm:text-base text-[#77817A]">
            Choose the exact level of human intervention and automated handoff appropriate for your business model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: MANUAL */}
          <Card
            hoverEffect
            className="flex flex-col justify-between cursor-pointer border-t-4 border-t-[#77817A]"
            onClick={() => setActiveModal('manual')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#77817A] bg-[#EFF2EF] px-2.5 py-1 rounded">
                  MODE 01
                </span>
                <Hand className="w-5 h-5 text-[#77817A]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#202923]">MANUAL</h3>
              <p className="text-xs text-[#77817A] leading-relaxed">
                Find suitable appointments and allow customers or authorised staff to inspect details and decide when to proceed or dismiss.
              </p>
              <ul className="text-xs text-[#202923] space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#557A65]" />
                  <span>Immediate slot notification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#557A65]" />
                  <span>Zero auto-commit risk</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#557A65]" />
                  <span>Staff / candidate review step</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5EAE5] flex items-center justify-between text-xs text-[#557A65] font-semibold">
              <span>Explore Manual Details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Card>

          {/* Card 2: TIMED-MANUAL */}
          <Card
            hoverEffect
            className="flex flex-col justify-between cursor-pointer border-t-4 border-t-[#D9A85C] relative shadow-elevated"
            onClick={() => setActiveModal('timed')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#8F6627] bg-[#D9A85C]/20 px-2.5 py-1 rounded">
                  MODE 02 • RECOMMENDED
                </span>
                <Clock className="w-5 h-5 text-[#D9A85C]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#202923]">TIMED-MANUAL</h3>
              <p className="text-xs text-[#77817A] leading-relaxed">
                Demonstrates reservation notification, customer YES/NO approval, and a 15-minute countdown continuation workflow.
              </p>
              <ul className="text-xs text-[#202923] space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#557A65]" />
                  <span>Simulated 15m provisional lock</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#557A65]" />
                  <span>Interactive YES/NO prompt via SMS</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#557A65]" />
                  <span>Secure continuation handoff token</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5EAE5] flex items-center justify-between text-xs text-[#D9A85C] font-semibold">
              <span>View 15-Min Workflow</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Card>

          {/* Card 3: AUTO-BOOK */}
          <Card
            hoverEffect
            className="flex flex-col justify-between cursor-pointer border-t-4 border-t-[#557A65]"
            onClick={() => setActiveModal('auto')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#304F40] bg-[#557A65]/15 px-2.5 py-1 rounded">
                  MODE 03
                </span>
                <Zap className="w-5 h-5 text-[#557A65]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#202923]">AUTO-BOOK</h3>
              <p className="text-xs text-[#77817A] leading-relaxed">
                Demonstrates automatic progression through permitted steps, pausing cleanly at mandatory customer actions or payment verification.
              </p>
              <ul className="text-xs text-[#202923] space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#557A65]" />
                  <span>Immediate provisional locking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#557A65]" />
                  <span>Duplicate attempt prevention</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#557A65]" />
                  <span>Mandatory payment handoff safeguard</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5EAE5] flex items-center justify-between text-xs text-[#557A65] font-semibold">
              <span>Explore Auto-Book Details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Card>
        </div>
      </div>

      {/* Explanatory Modals */}
      <Modal
        isOpen={activeModal === 'manual'}
        onClose={() => setActiveModal(null)}
        title="Manual Mode Specification"
        subtitle="Full human oversight before slot commitment"
      >
        <div className="space-y-4 text-xs text-[#202923] leading-relaxed">
          <p>
            In <strong>Manual Mode</strong>, the monitoring worker continuously watches designated DVSA centres. When an earlier slot matches the learner's criteria, it is logged and dispatched to the customer's portal and staff console.
          </p>
          <div className="p-3 bg-[#EFF2EF] rounded-card space-y-2">
            <h4 className="font-semibold text-[#202923]">Typical Sequence:</h4>
            <ol className="list-decimal list-inside space-y-1 text-[#77817A]">
              <li>Slot observed by worker engine</li>
              <li>Customer receives instant notification</li>
              <li>Customer or authorized staff clicks Proceed or Dismiss</li>
              <li>If Proceed: User is redirected to authorized DVSA handoff</li>
              <li>If Dismiss: Decision is recorded and scanning resumes</li>
            </ol>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setActiveModal(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setActiveModal(null);
                setRole('admin');
                startManualWorkflow();
              }}
            >
              Test Manual Mode in Admin
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'timed'}
        onClose={() => setActiveModal(null)}
        title="Timed-Manual Mode Specification (15-Minute Countdown)"
        subtitle="Provisional slot lock with automated candidate response timer"
      >
        <div className="space-y-4 text-xs text-[#202923] leading-relaxed">
          <p>
            The cornerstone of the platform. Once a slot is detected, a provisional reservation is initiated and a <strong>strict 15-minute countdown clock</strong> begins ticking.
          </p>
          <div className="p-3 bg-[#D9A85C]/15 border border-[#D9A85C]/30 rounded-card space-y-2">
            <h4 className="font-semibold text-[#8F6627]">Key Lifecycle Stages:</h4>
            <ul className="space-y-1 text-[#77817A]">
              <li>• <strong>Slot Detected:</strong> Criteria verified in 0–5 seconds.</li>
              <li>• <strong>Reservation Initiated & Confirmed:</strong> 15-minute DVSA lock begins.</li>
              <li>• <strong>Customer YES / NO:</strong> Dispatched via SMS, WhatsApp, and Telegram.</li>
              <li>• <strong>Continuation Link Generated:</strong> Secure token issued upon YES.</li>
              <li>• <strong>Reservation Release:</strong> If NO or timeout, slot is released safely.</li>
            </ul>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setActiveModal(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setActiveModal(null);
                setRole('customer');
                startTimedManualWorkflow();
              }}
            >
              Simulate 15-Min Customer Flow
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'auto'}
        onClose={() => setActiveModal(null)}
        title="Auto-Book Mode Specification"
        subtitle="Rapid progression with mandatory customer payment safeguards"
      >
        <div className="space-y-4 text-xs text-[#202923] leading-relaxed">
          <p>
            For candidates who have pre-authorized rescheduling. The platform advances directly through verification and reservation steps, pausing exclusively for external payment or official credential verification.
          </p>
          <div className="p-3 bg-[#557A65]/10 border border-[#557A65]/20 rounded-card space-y-2">
            <h4 className="font-semibold text-[#304F40]">Safety Safeguards:</h4>
            <p className="text-[#77817A]">
              Prevents duplicate attempts, avoids booking conflicts, and clearly separates automated provisional holds from final financial settlement.
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setActiveModal(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setActiveModal(null);
                setRole('admin');
                startAutoBookWorkflow();
              }}
            >
              Test Auto-Book in Admin
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
