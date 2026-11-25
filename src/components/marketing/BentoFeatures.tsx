import React from 'react';
import {
  Radio,
  Workflow,
  Users,
  Activity,
  CreditCard,
  Layers,
  ArrowUpRight,
  Shield,
  Zap,
} from 'lucide-react';
import { Card } from '../common/Card';

export const BentoFeatures: React.FC = () => {
  return (
    <section className="py-20 bg-[#F6F7F5] border-b border-[#E5EAE5]" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#557A65] font-mono">
            CORE PLATFORM CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#202923] tracking-tight">
            Everything You Need to Manage Driving Test Availability.
          </h2>
          <p className="text-sm sm:text-base text-[#77817A]">
            A complete suite of intelligent scanning workers, reservation locking mechanics, and multi-tenant brand controls.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Intelligent Monitoring */}
          <Card hoverEffect className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#557A65]/10 text-[#557A65] flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#202923]">
                Intelligent Monitoring
              </h3>
              <p className="text-xs text-[#77817A] leading-relaxed">
                Distributed scanning workers continuously poll regional DVSA test centres, filtering by custom date windows, preferred times, and candidate preferences with 0–5 second target latency.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5EAE5] bg-[#F6F7F5] p-3 rounded-card text-[11px] font-mono text-[#304F40] space-y-1">
              <div className="flex justify-between">
                <span>Worker LON-Alpha:</span>
                <span className="text-[#557A65]">Active (42 scans/min)</span>
              </div>
              <div className="flex justify-between">
                <span>Centres Covered:</span>
                <span>Mill Hill, Hendon, Borehamwood</span>
              </div>
            </div>
          </Card>

          {/* Card 2: Automated Booking Workflows */}
          <Card hoverEffect className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D9A85C]/15 text-[#8F6627] flex items-center justify-center">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#202923]">
                Automated Booking Workflows
              </h3>
              <p className="text-xs text-[#77817A] leading-relaxed">
                Three configurable execution modes: Manual verification, Timed-Manual with simulated 15-minute reservation countdown & SMS approval, and policy-driven Auto-Book handoff.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5EAE5] flex items-center gap-2">
              <span className="text-[10px] bg-[#D9A85C]/20 text-[#8F6627] font-semibold px-2 py-0.5 rounded">
                15m Countdown
              </span>
              <span className="text-[10px] bg-[#557A65]/20 text-[#304F40] font-semibold px-2 py-0.5 rounded">
                Interactive YES/NO
              </span>
              <span className="text-[10px] bg-[#EFF2EF] text-[#77817A] font-semibold px-2 py-0.5 rounded">
                Secure Link
              </span>
            </div>
          </Card>

          {/* Card 3: Multi-Customer Management */}
          <Card hoverEffect className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#304F40] text-white flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#202923]">
                Multi-Customer Management
              </h3>
              <p className="text-xs text-[#77817A] leading-relaxed">
                Centralized customer identification panels displaying masked driving licences, target date ranges, blackout periods, and priority ratings without leaking sensitive credentials.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5EAE5] text-xs text-[#77817A] flex items-center justify-between">
              <span>Candidate Isolation</span>
              <span className="font-semibold text-[#202923]">Role-Based Access</span>
            </div>
          </Card>

          {/* Card 4: Real-Time Operations */}
          <Card hoverEffect className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#557A65]/10 text-[#557A65] flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#202923]">
                Real-Time Operations
              </h3>
              <p className="text-xs text-[#77817A] leading-relaxed">
                Streaming live activity feeds with pause/resume inspection controls, worker heartbeat monitoring, task queues, and global emergency killswitch safety.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5EAE5] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#557A65] animate-pulse" />
              <span className="text-xs text-[#202923] font-medium">8 Worker Nodes Synchronized</span>
            </div>
          </Card>

          {/* Card 5: Financial Management */}
          <Card hoverEffect className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF2EF] text-[#202923] flex items-center justify-center border border-[#E5EAE5]">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#202923]">
                Financial Management
              </h3>
              <p className="text-xs text-[#77817A] leading-relaxed">
                Full invoice lifecycle with UK (£ + 20% VAT) and Turkey (₺ + 20% KDV with e-Fatura/e-Arşiv provider integration points) plus two-officer amendment approvals.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5EAE5] text-xs text-[#77817A] flex justify-between">
              <span>Multi-Currency</span>
              <span className="font-medium text-[#202923]">GBP (£) & TRY (₺)</span>
            </div>
          </Card>

          {/* Card 6: White-Label Infrastructure */}
          <Card hoverEffect className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#A7BBA9]/30 text-[#304F40] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#202923]">
                White-Label Infrastructure
              </h3>
              <p className="text-xs text-[#77817A] leading-relaxed">
                Run multiple distinct consumer-facing brands on one shared engine. Dynamically toggle brand themes, logos, domain aliases, support phone numbers, and custom messaging.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5EAE5] flex items-center gap-1.5 text-xs text-[#557A65] font-semibold">
              <span>Drive Test Monitor • Earlier Test Finder</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
