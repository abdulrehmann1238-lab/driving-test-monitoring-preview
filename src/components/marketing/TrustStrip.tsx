import React from 'react';
import {
  Activity,
  Users2,
  GitBranch,
  Eye,
  Layers,
} from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: <Activity className="w-4 h-4 text-[#557A65]" />,
      title: 'Intelligent Monitoring',
      subtitle: 'Sub-second cancellation checks',
    },
    {
      icon: <Users2 className="w-4 h-4 text-[#557A65]" />,
      title: 'Multi-Customer Management',
      subtitle: 'Isolated learner task queues',
    },
    {
      icon: <GitBranch className="w-4 h-4 text-[#557A65]" />,
      title: 'Three Booking Modes',
      subtitle: 'Manual, Timed-Manual, Auto-Book',
    },
    {
      icon: <Eye className="w-4 h-4 text-[#557A65]" />,
      title: 'Real-Time Status Visibility',
      subtitle: 'Full audit logs & detection feeds',
    },
    {
      icon: <Layers className="w-4 h-4 text-[#557A65]" />,
      title: 'White-Label Ready',
      subtitle: 'Independent domains & brands',
    },
  ];

  return (
    <section className="bg-white border-b border-[#E5EAE5] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#77817A] mb-5">
          Enterprise Architecture Highlights
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-card bg-[#F6F7F5] border border-[#E5EAE5] transition-all hover:bg-white hover:border-[#D0D8D1] hover:shadow-subtle"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-[#E5EAE5] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-[#202923] truncate">{item.title}</h4>
                <p className="text-[11px] text-[#77817A] truncate">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
