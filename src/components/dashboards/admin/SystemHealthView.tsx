import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Activity, Cpu, Server, Database, Cloud, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';

export const SystemHealthView: React.FC = () => {
  const { workers, isEmergencyStopActive } = useApp();

  const services = [
    { name: 'Distributed Monitoring Engine', status: isEmergencyStopActive ? 'HALTED' : '100% Operational', latency: '12ms', uptime: '99.98%' },
    { name: 'Regional Worker Pool (8 Nodes)', status: isEmergencyStopActive ? 'PAUSED' : 'Healthy (8 Active)', latency: '15ms', uptime: '99.95%' },
    { name: '15-Minute Reservation Locking Relay', status: 'Healthy', latency: '8ms', uptime: '99.99%' },
    { name: 'SMS & WhatsApp Notification Relay', status: 'Operational', latency: '420ms', uptime: '99.91%' },
    { name: 'Encrypted Audit Log Datastore', status: 'Healthy', latency: '18ms', uptime: '100.00%' },
    { name: 'Automated Snapshot Backups', status: 'Hourly Sync OK', latency: 'N/A', uptime: '100.00%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            System Health & Telemetry
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Operational status of background workers, reservation queues, and cloud datastores.
          </p>
        </div>

        <Badge variant={isEmergencyStopActive ? 'red' : 'green'} size="md" dot>
          {isEmergencyStopActive ? 'SYSTEM HALTED' : 'ALL SYSTEMS NOMINAL'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc, i) => (
          <Card key={i} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm text-[#202923]">{svc.name}</span>
              <Badge variant={isEmergencyStopActive && svc.status.includes('HALT') ? 'red' : 'green'} size="sm" dot>
                {svc.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#77817A] pt-2 border-t border-[#E5EAE5]">
              <div>
                <span>Response Latency:</span>
                <p className="font-mono font-semibold text-[#202923]">{svc.latency}</p>
              </div>
              <div>
                <span>Simulated Uptime:</span>
                <p className="font-mono font-semibold text-[#557A65]">{svc.uptime}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
