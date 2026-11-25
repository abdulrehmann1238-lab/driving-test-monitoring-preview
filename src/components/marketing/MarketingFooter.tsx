import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '../common/Button';

export const MarketingFooter: React.FC = () => {
  const { setRole, activeBrand } = useApp();

  return (
    <footer className="bg-[#202923] text-white pt-16 pb-12 border-t border-[#304F40]">
      {/* Pre-Footer Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-16 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#304F40] to-[#202923] p-8 sm:p-12 rounded-card border border-white/15 shadow-elevated">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
              Build a More Intelligent Driving Test Booking Operation.
            </h3>
            <p className="text-sm text-[#EFF2EF]/80 max-w-xl">
              Experience the full interactive administrative command centre, monitoring simulator, and candidate approval flows.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setRole('admin')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Explore the Demo Workspace
          </Button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-xs text-[#EFF2EF]/70 mb-12">
        {/* Col 1: Brand Info */}
        <div className="col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#557A65] flex items-center justify-center text-white">
              <svg className="w-4 h-4" viewBox="0 0 48 48" fill="none">
                <path d="M14 32L24 12L34 32" stroke="#EFF2EF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 25H30" stroke="#A7BBA9" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-heading font-bold text-sm text-white">{activeBrand.name}</span>
          </div>
          <p className="text-xs text-[#EFF2EF]/60 leading-relaxed max-w-sm">
            High-availability driving test cancellation monitoring and automated slot booking orchestration engine. Designed for independent brands and ADI fleet operators.
          </p>
          <p className="text-[11px] font-mono text-[#A7BBA9]">
            {activeBrand.footerNotes}
          </p>
        </div>

        {/* Col 2: Platform Links */}
        <div className="space-y-2.5">
          <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Platform</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-white transition-colors">Monitoring Engine</a></li>
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#white-label" className="hover:text-white transition-colors">White-Label Brands</a></li>
            <li><a href="#platform" className="hover:text-white transition-colors">Architecture Telemetry</a></li>
          </ul>
        </div>

        {/* Col 3: Booking Modes */}
        <div className="space-y-2.5">
          <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Workflows</h4>
          <ul className="space-y-2">
            <li><a href="#booking-modes" className="hover:text-white transition-colors">Manual Verification</a></li>
            <li><a href="#booking-modes" className="hover:text-white transition-colors">15-Minute Timed-Manual</a></li>
            <li><a href="#booking-modes" className="hover:text-white transition-colors">Auto-Book Handoff</a></li>
            <li><button onClick={() => setRole('admin')} className="hover:text-white transition-colors text-left">Simulator Tool</button></li>
          </ul>
        </div>

        {/* Col 4: Dashboards */}
        <div className="space-y-2.5">
          <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Dashboards</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setRole('admin')} className="hover:text-white transition-colors text-left">Admin Command</button></li>
            <li><button onClick={() => setRole('staff')} className="hover:text-white transition-colors text-left">Operations Staff</button></li>
            <li><button onClick={() => setRole('accountant')} className="hover:text-white transition-colors text-left">Accountant & Billing</button></li>
            <li><button onClick={() => setRole('customer')} className="hover:text-white transition-colors text-left">Learner Portal</button></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Compliance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#EFF2EF]/60">
        <p>© 2026 AutoPass OS Platform • Simulated Demonstration Environment Only.</p>
        <div className="flex items-center gap-4">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">DVSA Compliance Statement</span>
        </div>
      </div>
    </footer>
  );
};
