import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Customer } from '../../../types';
import {
  UserCheck,
  Radio,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Pause,
  Play,
  ArrowUpRight,
  Shield,
  MapPin,
  Eye,
  FileText,
  Search,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { CustomerProfileDrawer } from '../admin/CustomerProfileDrawer';

export const StaffDashboard: React.FC = () => {
  const { customers, pauseMonitoring, resumeMonitoring, addToast, addAuditLog } = useApp();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [search, setSearch] = useState('');

  // Operations staff assigned tasks (simulated 8 active tasks)
  const assignedTasks = customers.slice(0, 8);

  const activeCount = assignedTasks.filter((c) => c.monitoringStatus === 'active' || c.monitoringStatus === 'scanning').length;
  const reservedCount = assignedTasks.filter((c) => c.monitoringStatus === 'reserved').length;
  const completedCount = assignedTasks.filter((c) => c.monitoringStatus === 'completed').length;
  const pausedCount = assignedTasks.filter((c) => c.monitoringStatus === 'paused').length;

  const handleEscalate = (cust: Customer) => {
    addAuditLog('TASK_ESCALATED_TO_ADMIN', cust.ref, 'warning', `Operator flagged ${cust.name} for senior review`);
    addToast('Task Escalated', `Escalated ${cust.name} (${cust.ref}) to Super Admin queue`, 'info');
  };

  const handleRetry = (cust: Customer) => {
    addToast('Scan Cycle Re-queued', `Dispatched priority scan for ${cust.preferredCentre}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            Operations Staff Console
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Operational task execution, candidate queue oversight, and slot reservation escalations.
          </p>
        </div>

        <Badge variant="sage" size="md">
          Staff Permissions Active (Restricted Financials)
        </Badge>
      </div>

      {/* Task Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Card className="p-3">
          <span className="text-[10px] text-[#77817A] uppercase block">Assigned Tasks</span>
          <p className="text-2xl font-bold font-heading text-[#202923] tabular-nums mt-0.5">
            {assignedTasks.length}
          </p>
          <span className="text-[10px] text-[#77817A]">Under direct oversight</span>
        </Card>

        <Card className="p-3">
          <span className="text-[10px] text-[#77817A] uppercase block">Active Jobs</span>
          <p className="text-2xl font-bold font-heading text-[#557A65] tabular-nums mt-0.5">
            {activeCount}
          </p>
          <span className="text-[10px] text-[#557A65]">Polling regional nodes</span>
        </Card>

        <Card className="p-3">
          <span className="text-[10px] text-[#77817A] uppercase block">Pending Reservations</span>
          <p className="text-2xl font-bold font-heading text-[#D9A85C] tabular-nums mt-0.5">
            {reservedCount}
          </p>
          <span className="text-[10px] text-[#8F6627]">15m lock active</span>
        </Card>

        <Card className="p-3">
          <span className="text-[10px] text-[#77817A] uppercase block">Completed Jobs</span>
          <p className="text-2xl font-bold font-heading text-[#304F40] tabular-nums mt-0.5">
            {completedCount}
          </p>
          <span className="text-[10px] text-[#77817A]">Simulated verified</span>
        </Card>

        <Card className="p-3">
          <span className="text-[10px] text-[#77817A] uppercase block">Paused / In Review</span>
          <p className="text-2xl font-bold font-heading text-[#77817A] tabular-nums mt-0.5">
            {pausedCount}
          </p>
          <span className="text-[10px] text-[#77817A]">Operator holds</span>
        </Card>
      </div>

      {/* Assigned Tasks Table */}
      <div className="bg-white rounded-card border border-[#E5EAE5] shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E5EAE5] flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-[#202923]">
            Assigned Learner Monitoring Tasks
          </h3>
          <span className="text-xs text-[#77817A]">Shift: Sarah Jenkins (Operations Team A)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F6F7F5] border-b border-[#E5EAE5] text-[#77817A] text-[10px] uppercase font-semibold">
                <th className="py-3 px-4">Task ID & Customer</th>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Test Centre</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAE5]">
              {assignedTasks.map((cust) => {
                const isPaused = cust.monitoringStatus === 'paused';
                return (
                  <tr key={cust.id} className="hover:bg-[#F6F7F5]/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#202923]">{cust.name}</div>
                      <div className="text-[10px] text-[#77817A] font-mono">{cust.maskedLicence}</div>
                    </td>

                    <td className="py-3 px-4 font-mono font-medium text-[#202923]">
                      {cust.ref}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-[#202923] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#557A65]" />
                        {cust.preferredCentre}
                      </div>
                      <div className="text-[10px] text-[#77817A]">
                        Window: {cust.targetDateRange.start}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          cust.mode === 'timed-manual'
                            ? 'amber'
                            : cust.mode === 'auto-book'
                            ? 'green'
                            : 'neutral'
                        }
                        size="sm"
                      >
                        {cust.mode.toUpperCase()}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 font-bold uppercase text-[10px] text-[#557A65]">
                      {cust.priority}
                    </td>

                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          cust.monitoringStatus === 'active' || cust.monitoringStatus === 'scanning'
                            ? 'green'
                            : cust.monitoringStatus === 'reserved'
                            ? 'amber'
                            : 'neutral'
                        }
                        size="sm"
                        dot
                      >
                        {cust.monitoringStatus}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-[#77817A]">
                      {cust.lastScanTime}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedCustomer(cust)}
                          className="px-2 py-1 rounded bg-[#EFF2EF] hover:bg-[#E5EAE5] text-[#202923] font-medium text-[11px]"
                          title="Inspect task details"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={() => handleRetry(cust)}
                          className="p-1 rounded text-[#557A65] hover:bg-[#557A65]/10"
                          title="Retry scan"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEscalate(cust)}
                          className="p-1 rounded text-amber-600 hover:bg-amber-100"
                          title="Escalate to admin"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Identification Drawer */}
      <CustomerProfileDrawer
        customer={selectedCustomer}
        isOpen={Boolean(selectedCustomer)}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
};
