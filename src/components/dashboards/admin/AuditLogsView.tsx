import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ShieldCheck, Search, Filter, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Badge } from '../../common/Badge';

export const AuditLogsView: React.FC = () => {
  const { auditLogs } = useApp();
  const [search, setSearch] = useState('');

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.resource.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            Enterprise Audit Logs
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Immutable trace of all administrative overrides, customer decisions, and automated worker events.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-[#E5EAE5] p-3 shadow-card">
        <input
          type="text"
          placeholder="Search audit actions (e.g. INITIATE, AMENDMENT), users or resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs p-2 outline-none"
        />
      </div>

      <div className="bg-white rounded-card border border-[#E5EAE5] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F6F7F5] border-b border-[#E5EAE5] text-[#77817A] text-[10px] uppercase font-semibold">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User Identity</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Resource Target</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAE5]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F6F7F5]/70 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-[#77817A] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#202923]">{log.user}</td>
                  <td className="py-3 px-4 text-[11px] text-[#77817A]">{log.role}</td>
                  <td className="py-3 px-4 font-mono text-[11px] font-bold text-[#304F40]">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 text-[#202923] font-medium">{log.resource}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={log.result === 'success' ? 'green' : log.result === 'warning' ? 'amber' : 'red'}
                      size="sm"
                    >
                      {log.result.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[#77817A] max-w-xs truncate">
                    {log.details || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
