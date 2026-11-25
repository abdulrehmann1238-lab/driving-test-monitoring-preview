import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSection } from './HeroSection';
import { TrustStrip } from './TrustStrip';
import { BentoFeatures } from './BentoFeatures';
import { ProcessSteps } from './ProcessSteps';
import { BookingModesShowcase } from './BookingModesShowcase';
import { DashboardPreview } from './DashboardPreview';
import { WhiteLabelShowcase } from './WhiteLabelShowcase';
import { SecuritySection } from './SecuritySection';
import { MarketingFooter } from './MarketingFooter';
import { Button } from '../common/Button';
import { DemoRoleBanner } from '../layout/DemoRoleBanner';
import { LiveToastContainer } from '../common/LiveToast';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole, activeBrand } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F7F5] flex flex-col text-[#202923] antialiased">
      {/* Top Demo Indicator Banner */}
      <DemoRoleBanner />

      {/* Sticky Marketing Navigation Bar */}
      <nav className="sticky top-10 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5EAE5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo on Left */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#304F40] flex items-center justify-center text-white shadow-subtle">
              <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
                <path d="M14 32L24 12L34 32" stroke="#EFF2EF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 25H30" stroke="#A7BBA9" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="24" cy="22" r="3" fill="#D9A85C"/>
              </svg>
            </div>
            <div>
              <span className="font-heading font-extrabold text-base text-[#202923]">
                {activeBrand.name}
              </span>
              <span className="text-[10px] text-[#557A65] font-mono block -mt-1 font-semibold">
                AutoPass OS
              </span>
            </div>
          </div>

          {/* Links Center */}
          <div className="hidden md:flex items-center gap-7 text-xs font-medium text-[#77817A]">
            <a href="#platform" className="hover:text-[#202923] transition-colors">Platform</a>
            <a href="#how-it-works" className="hover:text-[#202923] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#202923] transition-colors">Features</a>
            <a href="#booking-modes" className="hover:text-[#202923] transition-colors">Booking Modes</a>
            <a href="#white-label" className="hover:text-[#202923] transition-colors">White Label</a>
            <button
              onClick={() => setRole('customer')}
              className="hover:text-[#202923] transition-colors"
            >
              Learner Portal
            </button>
          </div>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRole('customer')}
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              onClick={() => setRole('admin')}
            >
              Demo Workspace
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#77817A] hover:text-[#202923]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Animated Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E5EAE5] px-4 py-4 space-y-3">
            <a
              href="#platform"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium text-[#202923]"
            >
              Platform
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium text-[#202923]"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium text-[#202923]"
            >
              Features
            </a>
            <a
              href="#booking-modes"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium text-[#202923]"
            >
              Booking Modes
            </a>
            <a
              href="#white-label"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium text-[#202923]"
            >
              White Label
            </a>
            <div className="pt-2 border-t border-[#E5EAE5] flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setRole('customer')}
              >
                Learner Portal
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => setRole('admin')}
              >
                Admin Command
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Marketing Content Flow */}
      <main className="flex-1">
        <HeroSection />
        <TrustStrip />
        <BentoFeatures />
        <ProcessSteps />
        <BookingModesShowcase />
        <DashboardPreview />
        <WhiteLabelShowcase />
        <SecuritySection />
      </main>

      {/* Enterprise Footer */}
      <MarketingFooter />

      {/* Toast notifications */}
      <LiveToastContainer />
    </div>
  );
};
