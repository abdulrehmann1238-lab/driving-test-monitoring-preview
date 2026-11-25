import React from 'react';
import { UserCheck, Radio, CheckCircle, ArrowRight } from 'lucide-react';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Configure Customer Requirements',
      description:
        'Specify candidate licence details, current booking reference, selected test centres, acceptable date ranges, and blackout dates.',
    },
    {
      number: '02',
      title: 'Monitor Availability',
      description:
        'Continuous polling across designated test centres with sub-second change detection and queue processing.',
    },
    {
      number: '03',
      title: 'Identify Matching Appointments',
      description:
        'When an earlier cancellation matching candidate criteria appears, lock provisional reservation and trigger instant multichannel alerts.',
    },
    {
      number: '04',
      title: 'Complete Authorised Booking Workflow',
      description:
        'Execute candidate confirmation via Manual, 15-Minute Timed-Manual, or policy-governed Auto-Book handoff.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E5EAE5]" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#557A65] font-mono">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#202923] tracking-tight">
            A Rigorous, Four-Stage Booking Lifecycle.
          </h2>
          <p className="text-sm sm:text-base text-[#77817A]">
            Transparent operational pipeline engineered to capture elusive test cancellations with zero guesswork.
          </p>
        </div>

        {/* 4-step horizontal process */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col space-y-4">
              {/* Step Number with Line connector */}
              <div className="flex items-center gap-3">
                <span className="font-heading font-extrabold text-3xl text-[#557A65] tabular-nums">
                  {step.number}
                </span>
                <div className="h-0.5 flex-1 bg-[#E5EAE5]" />
              </div>

              <h3 className="text-base font-heading font-bold text-[#202923]">
                {step.title}
              </h3>
              <p className="text-xs text-[#77817A] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
