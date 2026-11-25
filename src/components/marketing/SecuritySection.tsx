import React from 'react';
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Server,
  UserCheck,
  FileKey,
} from 'lucide-react';
import { Card } from '../common/Card';

export const SecuritySection: React.FC = () => {
  const securityFeatures = [
    {
      icon: <UserCheck className="w-5 h-5 text-[#557A65]" />,
      title: 'Role-Based Access Control',
      description: 'Strict segregation between Super Administrators, Operations Staff, Financial Accountants, and Learner Customers.',
    },
    {
      icon: <Lock className="w-5 h-5 text-[#557A65]" />,
      title: 'Masked Driving Licence Privacy',
      description: 'Customer driving licences are masked across all operational drawers (e.g. HARRI705129J99LK ••••) to safeguard candidate privacy.',
    },
    {
      icon: <FileCheck className="w-5 h-5 text-[#557A65]" />,
      title: 'Comprehensive Audit Trail',
      description: 'Every slot detection, approval, reservation lock, emergency override, and invoice amendment produces an immutable audit record.',
    },
    {
      icon: <FileKey className="w-5 h-5 text-[#557A65]" />,
      title: 'Secure Continuation Tokens',
      description: 'Provisional reservations generate cryptographic 15-minute handoff links with single-use verification.',
    },
    {
      icon: <Server className="w-5 h-5 text-[#557A65]" />,
      title: 'Isolated Candidate Queues',
      description: 'Candidate tasks execute within sandboxed worker partitions to prevent cross-account queue contamination.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#557A65]" />,
      title: 'GDPR-Conscious Data Management',
      description: 'Local persistence controls allow complete purging and reset of all simulated operational state at any moment.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E5EAE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#557A65] font-mono">
            SECURITY & COMPLIANCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#202923] tracking-tight">
            Security Architecture Designed for Enterprise Trust.
          </h2>
          <p className="text-sm sm:text-base text-[#77817A]">
            Every layer is engineered to adhere to strict UK data protection principles and authorized DVSA integration policies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feat, idx) => (
            <Card key={idx} hoverEffect className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#557A65]/10 flex items-center justify-center">
                {feat.icon}
              </div>
              <h3 className="text-base font-heading font-bold text-[#202923]">
                {feat.title}
              </h3>
              <p className="text-xs text-[#77817A] leading-relaxed">
                {feat.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
