import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';

export const AppointmentHistoryView: React.FC = () => {
  const { appointments } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-[#202923]">
          Appointment Detection History
        </h1>
        <p className="text-xs text-[#77817A] mt-0.5">
          Comprehensive log of cancellation detections with exact simulated latency timings.
        </p>
      </div>

      <div className="bg-white rounded-card border border-[#E5EAE5] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F6F7F5] border-b border-[#E5EAE5] text-[#77817A] text-[10px] uppercase font-semibold">
                <th className="py-3 px-4">Test Centre</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Observable At</th>
                <th className="py-3 px-4">Detection Recorded</th>
                <th className="py-3 px-4">Processing Initiated</th>
                <th className="py-3 px-4">Total Latency</th>
                <th className="py-3 px-4 text-right">Outcome Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAE5]">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-[#F6F7F5]/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#202923]">{apt.testCentre}</td>
                  <td className="py-3 px-4">{apt.date} • {apt.time}</td>
                  <td className="py-3 px-4 font-mono text-[#77817A] text-[11px]">
                    {apt.simulatedTiming.observableAt}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#77817A] text-[11px]">
                    {apt.simulatedTiming.detectionRecordedAt}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#77817A] text-[11px]">
                    {apt.simulatedTiming.processingInitiatedAt}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#557A65]">
                    {apt.simulatedTiming.latencyMs}ms
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Badge
                      variant={
                        apt.status === 'completed'
                          ? 'green'
                          : apt.status === 'reserved'
                          ? 'amber'
                          : apt.status === 'declined' || apt.status === 'missed'
                          ? 'red'
                          : 'neutral'
                      }
                      size="sm"
                      dot
                    >
                      {apt.status.toUpperCase()}
                    </Badge>
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
