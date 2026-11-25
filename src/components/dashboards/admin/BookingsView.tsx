import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  CalendarCheck,
  Clock,
  Zap,
  Hand,
  CheckCircle2,
  XCircle,
  Copy,
  ExternalLink,
  RotateCcw,
  Search,
  Filter,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { TimedManualWorkflowModal } from '../../booking/TimedManualWorkflowModal';
import { ManualBookingModal } from '../../booking/ManualBookingModal';
import { AutoBookWorkflowModal } from '../../booking/AutoBookWorkflowModal';

export const BookingsView: React.FC = () => {
  const {
    appointments,
    timedManualState,
    startTimedManualWorkflow,
    startManualWorkflow,
    startAutoBookWorkflow,
  } = useApp();

  const [showTimedModal, setShowTimedModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [showAutoModal, setShowAutoModal] = useState(false);
  const [filterMode, setFilterMode] = useState<string>('all');

  const filteredAppointments = appointments.filter((apt) => {
    if (filterMode === 'all') return true;
    return apt.bookingMode === filterMode;
  });

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            Booking Activity & Workflows
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Demonstrations for Manual, Timed-Manual (15m lock), and Auto-Book execution pipelines.
          </p>
        </div>

        {/* Quick Launch Buttons for the 3 Modes */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              startManualWorkflow();
              setShowManualModal(true);
            }}
            icon={<Hand className="w-3.5 h-3.5 text-[#77817A]" />}
          >
            Manual Mode
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              startTimedManualWorkflow();
              setShowTimedModal(true);
            }}
            icon={<Clock className="w-3.5 h-3.5 text-[#D9A85C]" />}
          >
            15m Timed-Manual
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              startAutoBookWorkflow();
              setShowAutoModal(true);
            }}
            icon={<Zap className="w-3.5 h-3.5 text-[#557A65]" />}
          >
            Auto-Book
          </Button>
        </div>
      </div>

      {/* Featured 15-Minute Countdown Spotlight Card */}
      <div className="rounded-card bg-white border border-[#D9A85C] p-5 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E5EAE5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D9A85C]/15 text-[#8F6627] flex items-center justify-center">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#8F6627] bg-[#D9A85C]/20 px-2 py-0.5 rounded">
                FLAGSHIP DEMO WORKFLOW
              </span>
              <h3 className="font-heading font-bold text-base text-[#202923] mt-1">
                Active 15-Minute Timed-Manual Reservation (Live Countdown)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-[#77817A] uppercase font-mono block">
                Countdown Status
              </span>
              <span className="text-2xl font-heading font-extrabold text-[#D9A85C] tabular-nums">
                {Math.floor(timedManualState.remainingSeconds / 60)}:
                {(timedManualState.remainingSeconds % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowTimedModal(true)}
            >
              Open Workflow Modal
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-[#F6F7F5] rounded">
            <span className="text-[10px] text-[#77817A] block">Candidate</span>
            <span className="font-semibold text-[#202923]">
              {timedManualState.customer?.name || 'James Harrington'}
            </span>
          </div>

          <div className="p-3 bg-[#F6F7F5] rounded">
            <span className="text-[10px] text-[#77817A] block">Provisional Centre</span>
            <span className="font-semibold text-[#202923]">
              {timedManualState.appointment?.testCentre || 'Birmingham South Yardley'}
            </span>
          </div>

          <div className="p-3 bg-[#F6F7F5] rounded">
            <span className="text-[10px] text-[#77817A] block">Provisional Date</span>
            <span className="font-semibold text-[#202923]">
              {timedManualState.appointment?.date || '18 Dec 2026'} ({timedManualState.appointment?.time || '10:14'})
            </span>
          </div>

          <div className="p-3 bg-[#F6F7F5] rounded">
            <span className="text-[10px] text-[#77817A] block">Stage</span>
            <span className="font-semibold text-[#557A65] capitalize">
              {timedManualState.stage.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Booking Records Table */}
      <div className="bg-white rounded-card border border-[#E5EAE5] shadow-card overflow-hidden">
        <div className="p-4 border-b border-[#E5EAE5] flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-[#202923]">
            Historical & In-Flight Booking Records
          </h3>

          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="text-xs bg-[#EFF2EF] text-[#202923] border border-[#E5EAE5] rounded-btn px-2.5 py-1"
          >
            <option value="all">All Modes</option>
            <option value="timed-manual">Timed-Manual</option>
            <option value="auto-book">Auto-Book</option>
            <option value="manual">Manual</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F6F7F5] border-b border-[#E5EAE5] text-[#77817A] text-[10px] uppercase font-semibold">
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Test Centre</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAE5]">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-[#F6F7F5]/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-[#202923]">{apt.id}</td>
                  <td className="py-3 px-4 font-medium text-[#202923]">{apt.testCentre}</td>
                  <td className="py-3 px-4">{apt.date} • {apt.time} ({apt.transmission})</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        apt.bookingMode === 'timed-manual'
                          ? 'amber'
                          : apt.bookingMode === 'auto-book'
                          ? 'green'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {apt.bookingMode.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-mono text-[#557A65]">
                    {apt.simulatedTiming.latencyMs}ms
                  </td>
                  <td className="py-3 px-4">
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
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        if (apt.bookingMode === 'timed-manual') setShowTimedModal(true);
                        else if (apt.bookingMode === 'auto-book') setShowAutoModal(true);
                        else setShowManualModal(true);
                      }}
                      className="text-xs text-[#557A65] font-semibold hover:underline"
                    >
                      Inspect Flow
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals for 3 modes */}
      <TimedManualWorkflowModal
        isOpen={showTimedModal}
        onClose={() => setShowTimedModal(false)}
      />
      <ManualBookingModal
        isOpen={showManualModal}
        onClose={() => setShowManualModal(false)}
      />
      <AutoBookWorkflowModal
        isOpen={showAutoModal}
        onClose={() => setShowAutoModal(false)}
      />
    </div>
  );
};
