import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Customer, LiveActivityItem } from '../../../types';
import {
  Users,
  Radio,
  CalendarCheck,
  Calendar,
  Cpu,
  CreditCard,
  TrendingUp,
  Activity,
  Play,
  Pause,
  Clock,
  ArrowRight,
  ShieldCheck,
  Server,
  Database,
  Cloud,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';

export const AdminOverview: React.FC = () => {
  const {
    customers,
    appointments,
    workers,
    invoices,
    liveActivities,
    isActivityFeedPaused,
    toggleActivityFeed,
    setActivePath,
    startTimedManualWorkflow,
    isEmergencyStopActive,
  } = useApp();

  const [chartPeriod, setChartPeriod] = useState<'24h' | '7d' | '30d'>('24h');

  // Chart simulated points
  const chartData = {
    '24h': [
      { label: '00:00', value: 4 },
      { label: '04:00', value: 2 },
      { label: '08:00', value: 18 },
      { label: '10:00', value: 38 },
      { label: '12:00', value: 24 },
      { label: '14:00', value: 19 },
      { label: '16:00', value: 14 },
      { label: '20:00', value: 7 },
    ],
    '7d': [
      { label: 'Mon', value: 89 },
      { label: 'Tue', value: 112 },
      { label: 'Wed', value: 145 },
      { label: 'Thu', value: 126 },
      { label: 'Fri', value: 138 },
      { label: 'Sat', value: 64 },
      { label: 'Sun', value: 42 },
    ],
    '30d': [
      { label: 'Week 1', value: 680 },
      { label: 'Week 2', value: 740 },
      { label: 'Week 3', value: 890 },
      { label: 'Week 4', value: 810 },
    ],
  }[chartPeriod];

  const maxChartVal = Math.max(...chartData.map((d) => d.value));

  // Mode distribution counts
  const manualCount = customers.filter((c: Customer) => c.mode === 'manual').length;
  const timedManualCount = customers.filter((c: Customer) => c.mode === 'timed-manual').length;
  const autoBookCount = customers.filter((c: Customer) => c.mode === 'auto-book').length;
  const totalModeCount = customers.length || 1;

  return (
    <div className="space-y-6">
      {/* Platform Overview Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            Platform Overview
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Monitor platform operations, customer activity and booking performance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActivePath('monitoring')}
            icon={<Radio className="w-3.5 h-3.5 text-[#557A65]" />}
          >
            Monitoring Engine
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setActivePath('bookings');
              startTimedManualWorkflow();
            }}
            icon={<Clock className="w-3.5 h-3.5" />}
          >
            Launch 15m Flow
          </Button>
        </div>
      </div>

      {/* 6 KPI Cards with Tabular Numerals & Illustrative Trend Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <Card className="p-3.5">
          <span className="text-[10px] text-[#77817A] uppercase block font-medium">Total Customers</span>
          <p className="text-2xl font-heading font-extrabold text-[#202923] tabular-nums mt-1">84</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-[#557A65] font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>+8% (demo)</span>
          </div>
        </Card>

        <Card className="p-3.5">
          <span className="text-[10px] text-[#77817A] uppercase block font-medium">Active Tasks</span>
          <p className="text-2xl font-heading font-extrabold text-[#202923] tabular-nums mt-1">67</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-[#77817A]">
            <span>6 UK regions</span>
          </div>
        </Card>

        <Card className="p-3.5">
          <span className="text-[10px] text-[#77817A] uppercase block font-medium">Detections Today</span>
          <p className="text-2xl font-heading font-extrabold text-[#557A65] tabular-nums mt-1">126</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-[#557A65] font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>1.4s avg latency</span>
          </div>
        </Card>

        <Card className="p-3.5">
          <span className="text-[10px] text-[#77817A] uppercase block font-medium">Confirmed Bookings</span>
          <p className="text-2xl font-heading font-extrabold text-[#304F40] tabular-nums mt-1">18</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-[#77817A]">
            <span>Simulated verified</span>
          </div>
        </Card>

        <Card className="p-3.5">
          <span className="text-[10px] text-[#77817A] uppercase block font-medium">Active Workers</span>
          <p className="text-2xl font-heading font-extrabold text-[#202923] tabular-nums mt-1">8</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-[#557A65] font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% nominal</span>
          </div>
        </Card>

        <Card className="p-3.5">
          <span className="text-[10px] text-[#77817A] uppercase block font-medium">Illustrative Revenue</span>
          <p className="text-2xl font-heading font-extrabold text-[#202923] tabular-nums mt-1">£4,820</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-[#77817A]">
            <span>Monthly demo sum</span>
          </div>
        </Card>
      </div>

      {/* Middle Grid: Activity Chart & Booking Mode Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-card border border-[#E5EAE5] p-5 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-sm font-heading font-bold text-[#202923]">
                Simulated Appointment Detection Activity
              </h3>
              <p className="text-xs text-[#77817A]">
                Historical cancellation frequency across monitored test centres.
              </p>
            </div>

            {/* Period Switcher */}
            <div className="flex items-center bg-[#EFF2EF] p-0.5 rounded-btn text-xs">
              {(['24h', '7d', '30d'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setChartPeriod(period)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    chartPeriod === period
                      ? 'bg-white text-[#202923] shadow-subtle'
                      : 'text-[#77817A] hover:text-[#202923]'
                  }`}
                >
                  {period === '24h' ? '24 Hours' : period === '7d' ? '7 Days' : '30 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Custom SVG Bar/Line Chart */}
          <div className="h-48 w-full flex items-end gap-2 pt-6 pb-2 px-2 border-b border-[#E5EAE5]">
            {chartData.map((item, idx) => {
              const heightPct = Math.max(12, Math.round((item.value / maxChartVal) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-mono font-medium text-[#77817A] opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.value}
                  </span>
                  <div
                    className="w-full max-w-[42px] bg-[#557A65]/25 hover:bg-[#557A65] rounded-t transition-all duration-300 group-hover:shadow-subtle"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[10px] text-[#77817A] font-mono whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#77817A] mt-3">
            <span>Peak detection hours: 08:00 – 11:30 GMT (Standard cancellation release window)</span>
            <span className="font-mono text-[#557A65]">Target 0–5s capture time</span>
          </div>
        </div>

        {/* Booking Distribution Card (1 Column) */}
        <div className="bg-white rounded-card border border-[#E5EAE5] p-5 shadow-card flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-heading font-bold text-[#202923] mb-1">
              Booking Mode Distribution
            </h3>
            <p className="text-xs text-[#77817A] mb-4">
              Breakdown of {customers.length} enrolled learner tasks.
            </p>

            {/* Visual Multi-Segment Bar */}
            <div className="h-4 w-full bg-[#EFF2EF] rounded-full overflow-hidden flex mb-4">
              <div
                style={{ width: `${Math.round((timedManualCount / totalModeCount) * 100)}%` }}
                className="bg-[#D9A85C] h-full"
                title={`Timed-Manual: ${timedManualCount}`}
              />
              <div
                style={{ width: `${Math.round((autoBookCount / totalModeCount) * 100)}%` }}
                className="bg-[#557A65] h-full"
                title={`Auto-Book: ${autoBookCount}`}
              />
              <div
                style={{ width: `${Math.round((manualCount / totalModeCount) * 100)}%` }}
                className="bg-[#77817A] h-full"
                title={`Manual: ${manualCount}`}
              />
            </div>

            {/* Breakdown Items */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-[#F6F7F5]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D9A85C]" />
                  <span className="font-medium text-[#202923]">Timed-Manual (15m Lock)</span>
                </div>
                <span className="font-bold font-mono text-[#202923]">
                  {timedManualCount} ({Math.round((timedManualCount / totalModeCount) * 100)}%)
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#F6F7F5]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#557A65]" />
                  <span className="font-medium text-[#202923]">Auto-Book Safeguard</span>
                </div>
                <span className="font-bold font-mono text-[#202923]">
                  {autoBookCount} ({Math.round((autoBookCount / totalModeCount) * 100)}%)
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#F6F7F5]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#77817A]" />
                  <span className="font-medium text-[#202923]">Manual Review</span>
                </div>
                <span className="font-bold font-mono text-[#202923]">
                  {manualCount} ({Math.round((manualCount / totalModeCount) * 100)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5EAE5] mt-4">
            <button
              onClick={() => setActivePath('customers')}
              className="text-xs font-semibold text-[#557A65] hover:underline flex items-center justify-between w-full"
            >
              <span>Manage Customer Modes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Live Activity Feed & Operational Health Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Activity Feed (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-card border border-[#E5EAE5] p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#557A65] animate-ping" />
              <h3 className="text-sm font-heading font-bold text-[#202923]">
                Live Operational Activity Feed
              </h3>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleActivityFeed}
              icon={isActivityFeedPaused ? <Play className="w-3 h-3 text-[#557A65]" /> : <Pause className="w-3 h-3 text-[#77817A]" />}
            >
              {isActivityFeedPaused ? 'Resume Stream' : 'Pause Stream'}
            </Button>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {liveActivities.map((act: LiveActivityItem) => (
              <div
                key={act.id}
                className="flex items-start justify-between gap-3 p-3 rounded-card bg-[#F6F7F5] border border-[#E5EAE5] hover:bg-white transition-colors"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="text-[11px] font-mono text-[#77817A] mt-0.5 shrink-0">
                    {act.timestamp}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#202923] truncate">{act.title}</p>
                    <p className="text-[11px] text-[#77817A] mt-0.5">{act.description}</p>
                  </div>
                </div>

                <Badge
                  variant={
                    act.statusVariant === 'success'
                      ? 'green'
                      : act.statusVariant === 'warning'
                      ? 'amber'
                      : act.statusVariant === 'critical'
                      ? 'red'
                      : 'neutral'
                  }
                  size="sm"
                  className="shrink-0"
                >
                  {act.statusTag}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Health Cards (1 Column) */}
        <div className="bg-white rounded-card border border-[#E5EAE5] p-5 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-heading font-bold text-[#202923]">
              Operational Health
            </h3>
            <span className="text-[10px] font-mono text-[#77817A] uppercase bg-[#EFF2EF] px-1.5 py-0.5 rounded">
              Simulated Telemetry
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded bg-[#F6F7F5]">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#557A65]" />
                <span className="font-medium text-[#202923]">Monitoring Workers</span>
              </div>
              <span className="font-semibold text-[#557A65]">8/8 Healthy</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded bg-[#F6F7F5]">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#557A65]" />
                <span className="font-medium text-[#202923]">Task Dispatch Queue</span>
              </div>
              <span className="font-semibold text-[#202923]">0 Queued Delay</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded bg-[#F6F7F5]">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#557A65]" />
                <span className="font-medium text-[#202923]">Notification Relay</span>
              </div>
              <span className="font-semibold text-[#557A65]">SMS/WhatsApp OK</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded bg-[#F6F7F5]">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#557A65]" />
                <span className="font-medium text-[#202923]">Database Simulation</span>
                </div>
              <span className="font-semibold text-[#202923]">12ms Latency</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded bg-[#F6F7F5]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#557A65]" />
                <span className="font-medium text-[#202923]">Audit Backups</span>
              </div>
              <span className="font-semibold text-[#557A65]">Encrypted (Hourly)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
