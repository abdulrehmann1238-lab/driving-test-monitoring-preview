import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Customer, Appointment } from '../../types';
import {
  Radio,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Search,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const MonitoringEngineSimulator: React.FC = () => {
  const {
    customers,
    appointments,
    startTimedManualWorkflow,
    startManualWorkflow,
    startAutoBookWorkflow,
    addToast,
    addAuditLog,
    setRole,
    setActivePath,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'queued' | 'paused' | 'completed'>('active');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [selectedOutcome, setSelectedOutcome] = useState<'match' | 'outside_time' | 'missed'>('match');
  const [detectedSlot, setDetectedSlot] = useState<any>(null);

  // Filter tasks by status tab
  const tabTasks = customers.filter((c) => {
    if (activeTab === 'active') return c.monitoringStatus === 'active' || c.monitoringStatus === 'scanning';
    if (activeTab === 'paused') return c.monitoringStatus === 'paused';
    if (activeTab === 'completed') return c.monitoringStatus === 'completed';
    return c.monitoringStatus === 'reserved';
  });

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setSimStep(1); // scanning animation
    setDetectedSlot(null);
    addToast('Simulation Scanning Initiated', 'Worker LON-Alpha querying regional DVSA cancellation feeds...', 'info');

    // Step 2: Detection recorded
    setTimeout(() => {
      setSimStep(2);
      addToast('Slot Observable', 'Cancellation observed on gateway. Latency timing recorded.', 'info');
    }, 1200);

    // Step 3: Analysis & Matching outcome
    setTimeout(() => {
      setSimStep(3);

      if (selectedOutcome === 'match') {
        const slot = {
          centre: 'Birmingham — South Yardley',
          date: 'Friday, 18 Dec 2026',
          time: '10:14 AM',
          transmission: 'Manual',
          timing: {
            observable: '10:42:16.000',
            recorded: '10:42:17.200',
            processed: '10:42:17.450',
            latencyMs: 1450,
          },
        };
        setDetectedSlot(slot);
        addToast('Matching Slot Found!', 'Criteria matched. Initiating 15-minute provisional reservation.', 'success');
        addAuditLog('SIMULATION_MATCH_FOUND', 'Birmingham South Yardley', 'success', 'Matched candidate DTM-9421');
      } else if (selectedOutcome === 'outside_time') {
        setDetectedSlot({
          centre: 'London — Mill Hill',
          date: 'Monday, 22 Dec 2026',
          time: '07:10 AM',
          transmission: 'Automatic',
          note: 'Slot rejected: Outside candidate preferred window (09:00 - 15:00)',
          timing: {
            observable: '10:44:00.000',
            recorded: '10:44:01.100',
            processed: '10:44:01.250',
            latencyMs: 1250,
          },
        });
        addToast('Slot Filtered Out', 'Slot is outside candidate morning preference window.', 'warning');
      } else {
        setDetectedSlot({
          centre: 'Bristol — Brislington',
          date: 'Wednesday, 13 Jan 2027',
          time: '11:10 AM',
          note: 'Contention: Slot was claimed by third party before lock confirmation.',
          timing: {
            observable: '10:45:00.000',
            recorded: '10:45:03.800',
            processed: '10:45:04.100',
            latencyMs: 4100,
          },
        });
        addToast('Contention Warning', 'Slot was acquired prior to provisional hold.', 'error');
      }

      setIsSimulating(false);
    }, 2800);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimStep(0);
    setDetectedSlot(null);
    addToast('Simulator Reset', 'Simulation cleared to baseline state.', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            Monitoring Engine Simulator
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Test sub-second cancellation detection, simulated timing latency, and provisional reservation locking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            disabled={isSimulating}
            onClick={handleStartSimulation}
            icon={<Play className="w-3.5 h-3.5" />}
          >
            {isSimulating ? 'Scanning...' : 'Start Simulation'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetSimulation}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Interactive Simulator Control Bar */}
      <Card className="p-5 shadow-card border border-[#E5EAE5] bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E5EAE5]">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#557A65] uppercase tracking-wider">
              SIMULATION CONFIGURATION
            </span>
            <h3 className="font-heading font-bold text-sm text-[#202923]">
              Select Expected Cancellation Scenario Outcome
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedOutcome('match')}
              className={`px-3 py-1.5 rounded-btn text-xs font-medium transition-all ${
                selectedOutcome === 'match'
                  ? 'bg-[#557A65] text-white shadow-subtle'
                  : 'bg-[#EFF2EF] text-[#202923] hover:bg-[#E5EAE5]'
              }`}
            >
              1. Matching Appointment Found
            </button>
            <button
              onClick={() => setSelectedOutcome('outside_time')}
              className={`px-3 py-1.5 rounded-btn text-xs font-medium transition-all ${
                selectedOutcome === 'outside_time'
                  ? 'bg-[#D9A85C] text-white shadow-subtle'
                  : 'bg-[#EFF2EF] text-[#202923] hover:bg-[#E5EAE5]'
              }`}
            >
              2. Outside Preferred Window
            </button>
            <button
              onClick={() => setSelectedOutcome('missed')}
              className={`px-3 py-1.5 rounded-btn text-xs font-medium transition-all ${
                selectedOutcome === 'missed'
                  ? 'bg-red-600 text-white shadow-subtle'
                  : 'bg-[#EFF2EF] text-[#202923] hover:bg-[#E5EAE5]'
              }`}
            >
              3. Slot Contention / Missed
            </button>
          </div>
        </div>

        {/* Live Simulator Processing Screen */}
        <div className="pt-5">
          {simStep === 0 && !detectedSlot && (
            <div className="text-center py-10 text-[#77817A] space-y-2">
              <Radio className="w-8 h-8 text-[#557A65] mx-auto animate-pulse" />
              <p className="text-xs font-medium text-[#202923]">
                Simulator Idle • Click "Start Simulation" to initiate scanning pipeline
              </p>
              <p className="text-[11px]">
                Demonstrates the 0–5 second target latency and provisional reservation locking flow.
              </p>
            </div>
          )}

          {isSimulating && (
            <div className="py-8 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-[#202923]">
                  <span className="w-2 h-2 rounded-full bg-[#557A65] animate-ping" />
                  Step {simStep} of 3: Scanning Regional Feeds (Worker BHX-Beta)...
                </span>
                <span className="font-mono text-[#557A65]">Target: &lt; 2,000ms</span>
              </div>
              <div className="w-full bg-[#EFF2EF] h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#557A65] w-2/3 animate-scan-line rounded-full" />
              </div>
            </div>
          )}

          {/* Detected Appointment & Detailed Timing Breakdown */}
          {detectedSlot && (
            <div className="p-4 rounded-card bg-[#F6F7F5] border border-[#557A65]/30 space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#557A65]" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#202923]">
                      {detectedSlot.note ? 'Detection Processed (See Status)' : 'Matching Appointment Discovered!'}
                    </h4>
                    <p className="text-xs text-[#77817A]">
                      {detectedSlot.centre} • {detectedSlot.date} at {detectedSlot.time}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={
                    selectedOutcome === 'match'
                      ? 'green'
                      : selectedOutcome === 'outside_time'
                      ? 'amber'
                      : 'red'
                  }
                  size="md"
                  dot
                >
                  {selectedOutcome === 'match'
                    ? '15M LOCK READY'
                    : selectedOutcome === 'outside_time'
                    ? 'WINDOW MISMATCH'
                    : 'CONTENTION MISSED'}
                </Badge>
              </div>

              {/* Exact Latency Timing Breakdown (Prompt Requirement: 0-5s target) */}
              <div className="bg-white p-3 rounded-card border border-[#E5EAE5] space-y-2">
                <span className="text-[10px] font-mono text-[#77817A] uppercase block">
                  Simulated Processing Timeline Breakdown (Target: 0–5s)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="p-2 bg-[#F6F7F5] rounded">
                    <span className="text-[10px] text-[#77817A] block">1. Observable At</span>
                    <span className="text-[#202923] font-semibold">{detectedSlot.timing.observable}</span>
                  </div>
                  <div className="p-2 bg-[#F6F7F5] rounded">
                    <span className="text-[10px] text-[#77817A] block">2. Detection Recorded</span>
                    <span className="text-[#202923] font-semibold">{detectedSlot.timing.recorded}</span>
                  </div>
                  <div className="p-2 bg-[#F6F7F5] rounded">
                    <span className="text-[10px] text-[#77817A] block">3. Processing Initiated</span>
                    <span className="text-[#202923] font-semibold">{detectedSlot.timing.processed}</span>
                  </div>
                  <div className="p-2 bg-[#557A65]/10 rounded border border-[#557A65]/30">
                    <span className="text-[10px] text-[#304F40] block">Total Latency</span>
                    <span className="text-[#557A65] font-bold">{detectedSlot.timing.latencyMs}ms (Nominal)</span>
                  </div>
                </div>
              </div>

              {/* Action Hand-offs for matching slot */}
              {selectedOutcome === 'match' && (
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5EAE5]">
                  <p className="text-xs text-[#77817A]">
                    Slot is eligible for immediate workflow handoff. Choose demonstration path:
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        startTimedManualWorkflow();
                        setRole('customer');
                      }}
                    >
                      Proceed to Timed-Manual (15m Lock)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        startAutoBookWorkflow();
                        setActivePath('bookings');
                      }}
                    >
                      Test Auto-Book Safeguard
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Task Queue Breakdown Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5EAE5] pb-2">
          <div className="flex items-center gap-2">
            {(['active', 'queued', 'paused', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-btn text-xs font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-[#557A65] text-white shadow-subtle'
                    : 'text-[#77817A] hover:text-[#202923]'
                }`}
              >
                {tab} Tasks ({customers.filter((c) => (tab === 'active' ? c.monitoringStatus === 'active' : c.monitoringStatus === tab)).length})
              </button>
            ))}
          </div>

          <span className="text-xs text-[#77817A]">
            Showing {tabTasks.length} candidate tasks
          </span>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tabTasks.map((task) => (
            <Card key={task.id} hoverEffect className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#202923]">
                    {task.name}
                  </h4>
                  <span className="text-[10px] font-mono text-[#77817A]">{task.ref}</span>
                </div>
                <Badge
                  variant={
                    task.monitoringStatus === 'active'
                      ? 'green'
                      : task.monitoringStatus === 'reserved'
                      ? 'amber'
                      : 'neutral'
                  }
                  size="sm"
                  dot
                >
                  {task.monitoringStatus.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-1 text-xs">
                <p className="flex items-center gap-1.5 text-[#202923] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#557A65]" />
                  {task.preferredCentre}
                </p>
                <p className="text-[11px] text-[#77817A]">
                  Target: {task.targetDateRange.start} → {task.targetDateRange.end}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] bg-[#EFF2EF] p-2 rounded">
                <div>
                  <span className="text-[#77817A] block">Workflow Mode</span>
                  <span className="font-semibold text-[#202923] capitalize">
                    {task.mode.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-[#77817A] block">Priority</span>
                  <span className="font-semibold text-[#557A65] capitalize">
                    {task.priority}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5EAE5] flex items-center justify-between text-[11px]">
                <span className="text-[#77817A]">Last scan: {task.lastScanTime}</span>
                <span className="font-mono text-[#304F40] font-semibold">
                  {task.successLikelihood}% Likelihood
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
