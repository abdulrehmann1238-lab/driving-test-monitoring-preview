import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DemoRole } from '../../types';
import { ShieldAlert, RefreshCw, Layers, UserCheck, AlertTriangle } from 'lucide-react';

export const DemoRoleBanner: React.FC = () => {
  const {
    role,
    setRole,
    brands,
    activeBrand,
    switchBrand,
    resetAllDemoData,
    isEmergencyStopActive,
    triggerEmergencyStop,
    resumeEmergencyStop,
  } = useApp();

  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const roles: { id: DemoRole; label: string; badge: string }[] = [
    { id: 'visitor', label: 'Public Site', badge: 'Marketing' },
    { id: 'admin', label: 'Admin Command', badge: 'Full Access' },
    { id: 'staff', label: 'Operations Staff', badge: 'Task Ops' },
    { id: 'accountant', label: 'Accountant', badge: 'Billing/Tax' },
    { id: 'customer', label: 'Learner Portal', badge: 'Self-Service' },
  ];

  return (
    <>
      <div className="bg-[#202923] text-white border-b border-[#304F40] px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs select-none sticky top-0 z-40">
        {/* Left: Demo Indicator & Brand Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isEmergencyStopActive ? 'bg-red-400' : 'bg-[#D9A85C]'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isEmergencyStopActive ? 'bg-red-500' : 'bg-[#D9A85C]'}`}></span>
            </span>
            <span className="font-mono text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded bg-white/10 font-bold text-[#EFF2EF]">
              SIMULATED DEMO
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/15">
            <Layers className="w-3.5 h-3.5 text-[#A7BBA9]" />
            <span className="text-[#A7BBA9]">Active Brand:</span>
            <select
              value={activeBrand.id}
              onChange={(e) => switchBrand(e.target.value)}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded px-2 py-0.5 text-xs font-medium focus:outline-none cursor-pointer"
            >
              {brands.map((b) => (
                <option key={b.id} value={b.id} className="text-[#202923] bg-white">
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Demo Role Switcher */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full">
          <span className="text-white/60 text-[11px] mr-1 hidden sm:inline">Role View:</span>
          {roles.map((r) => {
            const isSelected = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#557A65] text-white shadow-sm ring-1 ring-white/25'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{r.label}</span>
                {isSelected && (
                  <span className="text-[9px] bg-black/20 text-white/90 px-1 py-0.2 rounded font-mono hidden lg:inline">
                    {r.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Emergency Stop & Reset Demo */}
        <div className="flex items-center gap-2">
          {isEmergencyStopActive ? (
            <button
              onClick={resumeEmergencyStop}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#557A65] text-white hover:bg-[#304F40] transition-colors font-medium text-xs animate-pulse"
            >
              <UserCheck className="w-3 h-3" />
              <span>Resume Operations</span>
            </button>
          ) : (
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="flex items-center gap-1 px-2 py-1 rounded bg-red-950/60 text-red-300 hover:bg-red-900/80 border border-red-700/50 transition-colors text-xs"
              title="Global Emergency Killswitch (Simulated)"
            >
              <ShieldAlert className="w-3 h-3 text-red-400" />
              <span className="hidden sm:inline">Emergency Stop</span>
            </button>
          )}

          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors text-xs"
            title="Reset All Mock Data"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden lg:inline">Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Emergency Stop Confirmation Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-card shadow-modal max-w-md w-full p-5 border border-red-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base text-[#202923]">
                  Emergency Monitoring Killswitch
                </h3>
                <p className="text-xs text-[#77817A]">Immediate halt of all automated DVSA scans</p>
              </div>
            </div>

            <p className="text-xs text-[#202923] mb-4 leading-relaxed">
              This action simulates halting all 8 active regional monitoring workers and pauses every candidate's slot acquisition cycle. Active 15-minute provisional reservation locks will be preserved until expiry.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="px-3.5 py-2 text-xs rounded-btn font-medium bg-[#EFF2EF] text-[#202923] hover:bg-[#E5EAE5]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  triggerEmergencyStop();
                  setShowEmergencyModal(false);
                }}
                className="px-3.5 py-2 text-xs rounded-btn font-medium bg-red-600 text-white hover:bg-red-700"
              >
                Halt All Operations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Demo Data Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-card shadow-modal max-w-sm w-full p-5 border border-[#E5EAE5]">
            <h3 className="font-heading font-semibold text-base text-[#202923] mb-1">
              Reset Demonstration State?
            </h3>
            <p className="text-xs text-[#77817A] mb-4">
              This will restore all customer records, appointment slots, invoice amendments, and 15-minute reservation workflows to fresh initial conditions.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-3.5 py-1.5 text-xs rounded-btn font-medium bg-[#EFF2EF] text-[#202923] hover:bg-[#E5EAE5]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllDemoData();
                  setShowResetModal(false);
                }}
                className="px-3.5 py-1.5 text-xs rounded-btn font-medium bg-[#557A65] text-white hover:bg-[#304F40]"
              >
                Reset State
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
