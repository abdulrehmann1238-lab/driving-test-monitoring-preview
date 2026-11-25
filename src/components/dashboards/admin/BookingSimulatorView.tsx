import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { BookingMode } from '../../../types';
import {
  PlayCircle,
  RotateCcw,
  Sparkles,
  Clock,
  Zap,
  Hand,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Radio,
  Eye,
  FileText,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';

export const BookingSimulatorView: React.FC = () => {
  const { customers, appointments, addToast, addAuditLog } = useApp();

  const [selectedMode, setSelectedMode] = useState<BookingMode>('timed-manual');
  const [selectedScenario, setSelectedScenario] = useState<number>(1);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0].id);
  const [selectedCentre, setSelectedCentre] = useState('Birmingham — South Yardley');

  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timelineLogs, setTimelineLogs] = useState<string[]>([]);

  const scenarios = [
    { id: 1, name: 'Matching appointment found' },
    { id: 2, name: 'Appointment missed before reservation' },
    { id: 3, name: 'Reservation confirmed (15m lock initiated)' },
    { id: 4, name: 'Customer accepts slot (YES flow)' },
    { id: 5, name: 'Customer declines slot (NO flow)' },
    { id: 6, name: 'Reservation countdown expires' },
    { id: 7, name: 'Payment action required' },
    { id: 8, name: 'Booking completed and verified' },
    { id: 9, name: 'Booking failure & recovery' },
    { id: 10, name: 'Worker interruption & failover' },
  ];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setCurrentStep(1);
    setTimelineLogs([
      `[00:00.00] Scenario #${selectedScenario} (${scenarios[selectedScenario - 1].name}) initialized.`,
      `[00:00.32] Querying candidate criteria for customer ${selectedCustomer} at ${selectedCentre}.`,
    ]);

    setTimeout(() => {
      setCurrentStep(2);
      setTimelineLogs((prev) => [
        ...prev,
        `[00:01.10] Worker BHX-Beta detected regional slot broadcast. Latency: 1,420ms.`,
      ]);
    }, 1000);

    setTimeout(() => {
      setCurrentStep(3);
      setTimelineLogs((prev) => [
        ...prev,
        `[00:02.15] Evaluating scenario progression rules. Status transition recorded.`,
      ]);
    }, 2000);

    setTimeout(() => {
      setCurrentStep(4);
      setTimelineLogs((prev) => [
        ...prev,
        `[00:03.00] Scenario complete. Simulated state synchronized across all views.`,
      ]);
      setIsRunning(false);
      addToast('Scenario Simulation Complete', `Successfully demonstrated scenario #${selectedScenario}`, 'success');
      addAuditLog('SIMULATION_TOOL_EXECUTION', `Scenario #${selectedScenario}`, 'success', 'Admin simulation executed');
    }, 3200);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setTimelineLogs([]);
    addToast('Simulation Reset', 'Tool reset to idle state.', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            Booking Simulator & Test Tool
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Test and demonstrate 10 end-to-end operational scenarios step-by-step for client demonstrations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            disabled={isRunning}
            onClick={handleRunSimulation}
            icon={<PlayCircle className="w-3.5 h-3.5" />}
          >
            {isRunning ? 'Executing Scenario...' : 'RUN SIMULATION'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            RESET
          </Button>
        </div>
      </div>

      {/* Simulator Inputs & 10 Scenarios Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Selection (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-card border border-[#E5EAE5] p-5 shadow-card space-y-4 text-xs">
          <h3 className="font-heading font-bold text-sm text-[#202923] pb-2 border-b border-[#E5EAE5]">
            Simulation Parameters
          </h3>

          <div>
            <label className="block font-semibold text-[#202923] mb-1">Select Booking Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {(['manual', 'timed-manual', 'auto-book'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMode(m)}
                  className={`p-2 rounded text-xs capitalize font-medium transition-all ${
                    selectedMode === m
                      ? 'bg-[#557A65] text-white shadow-subtle'
                      : 'bg-[#EFF2EF] text-[#202923] hover:bg-[#E5EAE5]'
                  }`}
                >
                  {m.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#202923] mb-1">Target Test Centre</label>
            <select
              value={selectedCentre}
              onChange={(e) => setSelectedCentre(e.target.value)}
              className="w-full p-2 border border-[#E5EAE5] rounded text-xs bg-white outline-none"
            >
              <option value="Birmingham — South Yardley">Birmingham — South Yardley</option>
              <option value="London — Mill Hill">London — Mill Hill</option>
              <option value="Manchester — Cheetham Hill">Manchester — Cheetham Hill</option>
              <option value="Leeds — Harehills">Leeds — Harehills</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#202923] mb-1">Enroll Candidate Profile</label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full p-2 border border-[#E5EAE5] rounded text-xs bg-white outline-none"
            >
              {customers.slice(0, 6).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.ref}) • {c.priority.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#202923] mb-2">
              Select 1 of 10 Demonstration Scenarios:
            </label>
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {scenarios.map((sc) => {
                const isSelected = selectedScenario === sc.id;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setSelectedScenario(sc.id)}
                    className={`w-full text-left p-2 rounded text-xs flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#557A65]/15 border border-[#557A65] text-[#304F40] font-bold'
                        : 'bg-[#F6F7F5] border border-transparent text-[#202923] hover:bg-[#EFF2EF]'
                    }`}
                  >
                    <span>{sc.id}. {sc.name}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#557A65]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Step-by-Step Live Execution Stream (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-card border border-[#E5EAE5] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE5] mb-4">
              <h3 className="font-heading font-bold text-sm text-[#202923]">
                Scenario Execution Timeline
              </h3>
              <span className="text-[10px] font-mono text-[#557A65] bg-[#557A65]/10 px-2 py-0.5 rounded">
                {isRunning ? 'RUNNING...' : currentStep === 4 ? 'COMPLETED' : 'READY'}
              </span>
            </div>

            {/* Step Progression Visualizer */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs mb-4">
              <div
                className={`p-2 rounded border ${
                  currentStep >= 1 ? 'bg-[#557A65] text-white' : 'bg-[#EFF2EF] text-[#77817A]'
                }`}
              >
                1. Initialized
              </div>
              <div
                className={`p-2 rounded border ${
                  currentStep >= 2 ? 'bg-[#557A65] text-white' : 'bg-[#EFF2EF] text-[#77817A]'
                }`}
              >
                2. Detection
              </div>
              <div
                className={`p-2 rounded border ${
                  currentStep >= 3 ? 'bg-[#557A65] text-white' : 'bg-[#EFF2EF] text-[#77817A]'
                }`}
              >
                3. Progression
              </div>
              <div
                className={`p-2 rounded border ${
                  currentStep >= 4 ? 'bg-[#304F40] text-white font-bold' : 'bg-[#EFF2EF] text-[#77817A]'
                }`}
              >
                4. Outcome OK
              </div>
            </div>

            {/* Execution Logs Terminal */}
            <div className="p-3 bg-[#202923] text-[#EFF2EF] rounded-card font-mono text-[11px] space-y-1.5 h-64 overflow-y-auto">
              {timelineLogs.length === 0 ? (
                <p className="text-white/40 italic">Click "RUN SIMULATION" to watch live execution...</p>
              ) : (
                timelineLogs.map((log, i) => (
                  <p key={i} className="leading-relaxed">
                    {log}
                  </p>
                ))
              )}
            </div>
          </div>

          <p className="text-[10px] text-[#77817A] text-center mt-3 font-mono">
            Simulated administrative test tool • Does not alter production customer state permanently.
          </p>
        </div>
      </div>
    </div>
  );
};
