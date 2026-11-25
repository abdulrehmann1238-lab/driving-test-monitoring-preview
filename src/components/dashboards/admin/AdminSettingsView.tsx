import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Settings, ShieldAlert, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';

export const AdminSettingsView: React.FC = () => {
  const { resetAllDemoData, isEmergencyStopActive, triggerEmergencyStop, resumeEmergencyStop, addToast } = useApp();

  const [pollingFrequency, setPollingFrequency] = useState('2');
  const [webhookUrl, setWebhookUrl] = useState('https://api.autopass.io/webhooks/dvsa-mock');

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-[#202923]">
          Platform & Simulator Settings
        </h1>
        <p className="text-xs text-[#77817A] mt-0.5">
          Configure scanning intervals, simulated webhooks, and administrative state reset.
        </p>
      </div>

      {/* Simulator Tuning */}
      <Card className="p-5 space-y-4 text-xs">
        <h3 className="font-heading font-bold text-sm text-[#202923] pb-2 border-b border-[#E5EAE5]">
          Monitoring Simulation Frequency
        </h3>

        <div>
          <label className="block font-semibold text-[#202923] mb-1">
            Simulated Scan Interval (Seconds)
          </label>
          <input
            type="number"
            value={pollingFrequency}
            onChange={(e) => setPollingFrequency(e.target.value)}
            className="w-48 p-2 border border-[#E5EAE5] rounded text-xs outline-none"
          />
          <span className="text-[10px] text-[#77817A] mt-1 block">
            Target speed: 0–5s latency benchmark
          </span>
        </div>

        <div>
          <label className="block font-semibold text-[#202923] mb-1">
            Simulated Webhook Endpoint
          </label>
          <input
            type="text"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="w-full p-2 border border-[#E5EAE5] rounded text-xs font-mono outline-none"
          />
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => addToast('Settings Saved', 'Monitoring simulator parameters updated.', 'success')}
        >
          Save Configuration
        </Button>
      </Card>

      {/* Danger Zone: Emergency Stop & Reset Demo State */}
      <Card className="p-5 border-red-200 bg-red-50/20 space-y-4 text-xs">
        <h3 className="font-heading font-bold text-sm text-red-700 pb-2 border-b border-red-200">
          Emergency Controls & Demo Data Management
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-[#202923]">Global Emergency Stop</p>
            <p className="text-[11px] text-[#77817A]">
              Immediately halts scanning across all 8 worker nodes.
            </p>
          </div>
          {isEmergencyStopActive ? (
            <Button variant="primary" size="sm" onClick={resumeEmergencyStop}>
              Resume Workers
            </Button>
          ) : (
            <Button variant="danger" size="sm" onClick={triggerEmergencyStop}>
              Trigger Killswitch
            </Button>
          )}
        </div>

        <div className="pt-3 border-t border-red-200 flex items-center justify-between">
          <div>
            <p className="font-bold text-[#202923]">Reset All Demonstration Data</p>
            <p className="text-[11px] text-[#77817A]">
              Clears localStorage and restores initial pristine mock dataset.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetAllDemoData}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Reset Demo State
          </Button>
        </div>
      </Card>
    </div>
  );
};
