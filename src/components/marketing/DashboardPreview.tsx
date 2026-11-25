import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Radio,
  CalendarCheck,
  CreditCard,
  Cpu,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

export const DashboardPreview: React.FC = () => {
  const { setRole } = useApp();

  return (
    <section className="py-20 bg-white border-b border-[#E5EAE5]" id="platform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#557A65] font-mono">
              OPERATIONAL COMMAND CENTRE
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#202923] tracking-tight mt-1">
              Engineered for Complete Operational Control.
            </h2>
            <p className="text-sm text-[#77817A] mt-2">
              High-density monitoring overview with real-time KPI metrics and worker cluster telemetry.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setRole('admin')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Launch Admin Command
          </Button>
        </div>

        {/* Realistic Dashboard Preview Canvas */}
        <div className="rounded-card border border-[#E5EAE5] bg-[#F6F7F5] p-4 sm:p-6 shadow-elevated">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5EAE5] mb-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#557A65] animate-pulse" />
              <h3 className="font-heading font-bold text-base text-[#202923]">
                AutoPass Master Operations Feed
              </h3>
              <span className="text-[10px] font-mono uppercase bg-[#304F40] text-white px-2 py-0.5 rounded">
                LIVE TELEMETRY (ILLUSTRATIVE)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#77817A]">
              <span>Cluster Status:</span>
              <span className="font-semibold text-[#557A65]">8 / 8 Nodes Nominal</span>
            </div>
          </div>

          {/* 6 Core KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
            <Card className="p-3">
              <span className="text-[10px] text-[#77817A] uppercase block">Total Customers</span>
              <p className="text-2xl font-bold font-heading text-[#202923] tabular-nums mt-0.5">84</p>
              <span className="text-[10px] text-[#557A65] flex items-center gap-0.5 mt-1">
                <TrendingUp className="w-3 h-3" /> +12% this week
              </span>
            </Card>

            <Card className="p-3">
              <span className="text-[10px] text-[#77817A] uppercase block">Active Tasks</span>
              <p className="text-2xl font-bold font-heading text-[#202923] tabular-nums mt-0.5">67</p>
              <span className="text-[10px] text-[#77817A] block mt-1">Across 6 centres</span>
            </Card>

            <Card className="p-3">
              <span className="text-[10px] text-[#77817A] uppercase block">Detected Today</span>
              <p className="text-2xl font-bold font-heading text-[#557A65] tabular-nums mt-0.5">126</p>
              <span className="text-[10px] text-[#557A65] block mt-1">Avg 1.4s latency</span>
            </Card>

            <Card className="p-3">
              <span className="text-[10px] text-[#77817A] uppercase block">Confirmed Bookings</span>
              <p className="text-2xl font-bold font-heading text-[#304F40] tabular-nums mt-0.5">18</p>
              <span className="text-[10px] text-[#77817A] block mt-1">Simulated handoffs</span>
            </Card>

            <Card className="p-3">
              <span className="text-[10px] text-[#77817A] uppercase block">Active Workers</span>
              <p className="text-2xl font-bold font-heading text-[#202923] tabular-nums mt-0.5">8</p>
              <span className="text-[10px] text-[#557A65] block mt-1">0% node errors</span>
            </Card>

            <Card className="p-3">
              <span className="text-[10px] text-[#77817A] uppercase block">Monthly Revenue</span>
              <p className="text-2xl font-bold font-heading text-[#202923] tabular-nums mt-0.5">£4,820</p>
              <span className="text-[10px] text-[#77817A] block mt-1">Illustrative figure</span>
            </Card>
          </div>

          {/* Interactive Preview Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Detections Table Preview */}
            <div className="lg:col-span-2 bg-white rounded-card border border-[#E5EAE5] p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-[#202923] uppercase tracking-wider">
                  Recent Appointment Detections
                </h4>
                <span className="text-[11px] text-[#77817A]">Target 0–5s latency</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5EAE5] text-[#77817A] text-[10px] uppercase">
                      <th className="py-2">Test Centre</th>
                      <th className="py-2">Date & Time</th>
                      <th className="py-2">Mode</th>
                      <th className="py-2">Latency</th>
                      <th className="py-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5EAE5]">
                    <tr>
                      <td className="py-2.5 font-medium text-[#202923]">Birmingham South Yardley</td>
                      <td className="py-2.5">18 Dec • 10:14</td>
                      <td className="py-2.5">
                        <span className="text-[10px] bg-[#D9A85C]/20 text-[#8F6627] px-1.5 py-0.5 rounded font-medium">
                          Timed-Manual
                        </span>
                      </td>
                      <td className="py-2.5 font-mono text-[#557A65]">1,450ms</td>
                      <td className="py-2.5 text-right font-semibold text-[#8F6627]">15m Lock Active</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-medium text-[#202923]">London Mill Hill</td>
                      <td className="py-2.5">22 Dec • 08:40</td>
                      <td className="py-2.5">
                        <span className="text-[10px] bg-[#D9A85C]/20 text-[#8F6627] px-1.5 py-0.5 rounded font-medium">
                          Timed-Manual
                        </span>
                      </td>
                      <td className="py-2.5 font-mono text-[#557A65]">1,150ms</td>
                      <td className="py-2.5 text-right font-semibold text-[#557A65]">Reserved</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-medium text-[#202923]">Leeds Harehills</td>
                      <td className="py-2.5">23 Dec • 13:20</td>
                      <td className="py-2.5">
                        <span className="text-[10px] bg-[#557A65]/15 text-[#304F40] px-1.5 py-0.5 rounded font-medium">
                          Auto-Book
                        </span>
                      </td>
                      <td className="py-2.5 font-mono text-[#557A65]">1,320ms</td>
                      <td className="py-2.5 text-right font-semibold text-[#304F40]">Verifying</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions & Role Jump Box */}
            <div className="bg-white rounded-card border border-[#E5EAE5] p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#202923] uppercase tracking-wider mb-2">
                  Role Explorations
                </h4>
                <p className="text-xs text-[#77817A] mb-4">
                  Jump directly into any role to see its dedicated navigation, layout and actions:
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => setRole('customer')}
                    className="w-full flex items-center justify-between p-2 rounded-btn bg-[#F6F7F5] hover:bg-[#EFF2EF] text-xs font-medium text-[#202923] transition-colors"
                  >
                    <span>Learner Customer Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#557A65]" />
                  </button>
                  <button
                    onClick={() => setRole('staff')}
                    className="w-full flex items-center justify-between p-2 rounded-btn bg-[#F6F7F5] hover:bg-[#EFF2EF] text-xs font-medium text-[#202923] transition-colors"
                  >
                    <span>Operations Staff Console</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#557A65]" />
                  </button>
                  <button
                    onClick={() => setRole('accountant')}
                    className="w-full flex items-center justify-between p-2 rounded-btn bg-[#F6F7F5] hover:bg-[#EFF2EF] text-xs font-medium text-[#202923] transition-colors"
                  >
                    <span>Accountant & Invoicing</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#557A65]" />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-[#77817A] text-center mt-4 font-mono">
                All metrics are illustrative simulated figures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
