import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Appointment } from '../../../types';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';

export const CustomerCalendar: React.FC = () => {
  const { appointments, startTimedManualWorkflow } = useApp();
  const [selectedSlot, setSelectedSlot] = useState<Appointment | null>(null);

  // Fictional calendar December 2026 dates (days 1 to 31)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Map appointments to dates
  const getAppointmentsForDay = (day: number) => {
    const dayStr = day.toString().padStart(2, '0');
    return appointments.filter((a) => a.date.includes(`-12-${dayStr}`));
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            Appointment Availability Calendar
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Interactive schedule of detected cancellations, active reservation locks, and historical slots.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#557A65]" />
            <span>Detected Slot</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9A85C]" />
            <span>15m Lock Active</span>
          </span>
        </div>
      </div>

      {/* Calendar Header Month */}
      <div className="bg-white rounded-card border border-[#E5EAE5] p-5 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5EAE5] mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#557A65]" />
            <h3 className="font-heading font-bold text-base text-[#202923]">
              December 2026
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded text-[#77817A] hover:bg-[#EFF2EF]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-[#202923]">Current Target Window</span>
            <button className="p-1 rounded text-[#77817A] hover:bg-[#EFF2EF]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day of Week Headers */}
        <div className="grid grid-cols-7 gap-1 text-center font-semibold text-[11px] text-[#77817A] mb-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>

        {/* Calendar Grid (Days 1 to 31, starting on Tuesday) */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {/* Empty offset for Monday */}
          <div className="h-20 sm:h-24 bg-[#F6F7F5]/40 rounded-card p-1 border border-transparent" />

          {daysInMonth.map((day) => {
            const slots = getAppointmentsForDay(day);
            const isPreferredWindow = day >= 12 && day <= 26;
            const isBlackout = day === 25 || day === 26;

            return (
              <div
                key={day}
                className={`h-20 sm:h-24 rounded-card p-2 border flex flex-col justify-between transition-all ${
                  isBlackout
                    ? 'bg-red-50/40 border-red-100'
                    : isPreferredWindow
                    ? 'bg-[#557A65]/5 border-[#557A65]/30'
                    : 'bg-white border-[#E5EAE5]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      isBlackout ? 'text-red-600' : isPreferredWindow ? 'text-[#304F40]' : 'text-[#77817A]'
                    }`}
                  >
                    {day}
                  </span>
                  {isPreferredWindow && !isBlackout && (
                    <span className="text-[9px] font-mono text-[#557A65] hidden sm:inline">Target</span>
                  )}
                  {isBlackout && (
                    <span className="text-[9px] font-mono text-red-600 hidden sm:inline">Avoid</span>
                  )}
                </div>

                {/* Slots Pill on this day */}
                <div className="space-y-1">
                  {slots.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSlot(s)}
                      className={`w-full text-left p-1 rounded text-[10px] truncate font-medium transition-all ${
                        s.status === 'reserved'
                          ? 'bg-[#D9A85C] text-white font-bold animate-pulse'
                          : s.status === 'completed'
                          ? 'bg-[#304F40] text-white'
                          : 'bg-[#557A65] text-white'
                      }`}
                    >
                      {s.time} • {s.testCentre.split('—')[1] || s.testCentre}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Appointment Detail Modal when clicking date slot */}
      <Modal
        isOpen={Boolean(selectedSlot)}
        onClose={() => setSelectedSlot(null)}
        title="Detected Driving Test Slot"
        subtitle={selectedSlot?.testCentre}
        maxWidth="md"
      >
        {selectedSlot && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#F6F7F5] rounded-card space-y-2">
              <div className="flex justify-between">
                <span className="text-[#77817A]">Appointment Date:</span>
                <span className="font-bold text-[#202923]">{selectedSlot.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#77817A]">Start Time:</span>
                <span className="font-bold text-[#202923]">{selectedSlot.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#77817A]">Transmission:</span>
                <span className="font-bold text-[#202923]">{selectedSlot.transmission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#77817A]">Booking Fee:</span>
                <span className="font-bold text-[#202923]">£{selectedSlot.fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#77817A]">Current State:</span>
                <Badge variant={selectedSlot.status === 'reserved' ? 'amber' : 'green'} size="sm" dot>
                  {selectedSlot.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setSelectedSlot(null)}>
                Close
              </Button>
              {selectedSlot.status === 'reserved' && (
                <Button
                  variant="primary"
                  onClick={() => {
                    startTimedManualWorkflow(selectedSlot.id);
                    setSelectedSlot(null);
                  }}
                >
                  Open 15m Approval Flow
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
