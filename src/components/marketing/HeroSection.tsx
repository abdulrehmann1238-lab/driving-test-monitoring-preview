import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  Radio,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  Car,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const HeroSection: React.FC = () => {
  const { setRole, activeBrand } = useApp();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E5EAE5]">
      {/* Background with cinematic styling & subtle depth */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F6F7F5] via-[#EFF2EF]/60 to-[#F6F7F5]" />
      <div className="absolute top-0 right-0 -z-10 w-[550px] h-[550px] bg-[#A7BBA9]/15 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-[450px] h-[450px] bg-[#557A65]/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5EAE5] shadow-subtle text-xs text-[#304F40] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#557A65] animate-pulse" />
              <span>AutoPass OS v2.4 • Enterprise Architecture Preview</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#202923] tracking-tight leading-[1.08]">
              Your Next Driving Test.{' '}
              <span className="text-[#557A65] block sm:inline">Found Faster.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#77817A] max-w-xl leading-relaxed font-normal">
              Intelligent driving test availability monitoring, appointment management and booking workflows — all in one powerful platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={() => setRole('admin')}
              >
                Explore the Platform
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const element = document.getElementById('how-it-works');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                See How It Works
              </Button>
            </div>

            {/* Mini metrics bar */}
            <div className="pt-6 border-t border-[#E5EAE5]/80 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <p className="text-xl sm:text-2xl font-bold font-heading text-[#202923] tabular-nums">0–5s</p>
                <p className="text-[11px] text-[#77817A]">Target Detection Latency</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-heading text-[#202923] tabular-nums">15 Min</p>
                <p className="text-[11px] text-[#77817A]">Provisional Lock Window</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-heading text-[#202923] tabular-nums">3 Modes</p>
                <p className="text-[11px] text-[#77817A]">Manual / Timed / Auto</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Floating Monitoring Card Experience */}
          <div className="lg:col-span-5 relative">
            {/* Visual Frame styled like a premium vehicle cockpit HUD / radar monitor */}
            <div className="relative rounded-card bg-white p-6 shadow-elevated border border-[#E5EAE5] overflow-hidden">
              {/* Radar pulse effect in corner */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#557A65]/10 px-2.5 py-1 rounded-full border border-[#557A65]/20">
                <span className="w-2 h-2 rounded-full bg-[#557A65] animate-ping" />
                <span className="text-[10px] font-bold text-[#304F40] uppercase tracking-wider font-mono">
                  SCANNER ACTIVE
                </span>
              </div>

              {/* Status Header */}
              <div className="space-y-1 mb-5">
                <span className="text-[11px] font-bold text-[#557A65] uppercase tracking-widest font-mono">
                  MONITORING ACTIVE
                </span>
                <h3 className="text-lg font-heading font-bold text-[#202923] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#557A65]" />
                  Birmingham — South Yardley
                </h3>
                <p className="text-xs text-[#77817A]">
                  Preferred date window: <span className="text-[#202923] font-medium">12–26 December</span>
                </p>
              </div>

              {/* Mode & Specification Pills */}
              <div className="grid grid-cols-2 gap-2 mb-4 bg-[#EFF2EF] p-3 rounded-card text-xs">
                <div>
                  <span className="text-[10px] text-[#77817A] uppercase block">Workflow Mode</span>
                  <span className="font-semibold text-[#202923] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D9A85C]" />
                    Timed-Manual
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#77817A] uppercase block">Priority Level</span>
                  <span className="font-semibold text-[#304F40]">High (Class B Car)</span>
                </div>
              </div>

              {/* Live Scanner Animation Bar */}
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-xs text-[#77817A]">
                  <span className="flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-[#557A65] animate-pulse" />
                    Searching for earlier appointments...
                  </span>
                  <span className="font-mono text-[#202923] text-[11px]">Worker BHX-Beta</span>
                </div>
                <div className="w-full bg-[#E5EAE5] h-1.5 rounded-full overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-[#A7BBA9] via-[#557A65] to-[#304F40] w-2/3 rounded-full animate-scan-line" />
                </div>
              </div>

              {/* Simulated Detected Slot Card Overlay */}
              <div className="rounded-card border border-[#557A65]/30 bg-[#557A65]/5 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#557A65]" />
                    <span className="text-xs font-bold text-[#304F40]">
                      Provisional Slot Match Detected!
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-[#557A65] text-white px-1.5 py-0.5 rounded">
                    +4 Months Earlier
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#77817A] block">Detected Slot</span>
                    <p className="font-semibold text-[#202923]">Friday, 18 Dec • 10:14 AM</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#77817A] block">Lock Token Status</span>
                    <span className="text-[11px] font-mono text-[#D9A85C] font-semibold">
                      15m Window Active
                    </span>
                  </div>
                </div>

                <div className="pt-1 flex gap-2">
                  <button
                    onClick={() => setRole('customer')}
                    className="flex-1 text-center py-1.5 bg-[#557A65] hover:bg-[#304F40] text-white rounded-btn text-xs font-medium transition-colors"
                  >
                    View in Learner Portal
                  </button>
                  <button
                    onClick={() => setRole('admin')}
                    className="px-3 py-1.5 bg-white border border-[#E5EAE5] text-[#202923] hover:bg-[#EFF2EF] rounded-btn text-xs font-medium transition-colors"
                  >
                    Admin Feed
                  </button>
                </div>
              </div>

              {/* Subtle disclaimer */}
              <p className="text-[10px] text-[#77817A] text-center mt-3 font-mono">
                Simulated real-time detection event • DVSA authorization flow demonstration
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
