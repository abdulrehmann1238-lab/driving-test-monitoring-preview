import React, { useState } from 'react';
import { Customer } from '../../../types';
import { useApp } from '../../../context/AppContext';
import { Drawer } from '../../common/Drawer';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import {
  User,
  Shield,
  Calendar,
  Clock,
  MapPin,
  Pause,
  Play,
  Bell,
  CheckCircle2,
  AlertTriangle,
  FileText,
  CreditCard,
  Send,
} from 'lucide-react';

interface CustomerProfileDrawerProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerProfileDrawer: React.FC<CustomerProfileDrawerProps> = ({
  customer,
  isOpen,
  onClose,
}) => {
  const { pauseMonitoring, resumeMonitoring, updateCustomer, addAuditLog, addToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMode, setEditedMode] = useState<Customer['mode']>(customer?.mode || 'timed-manual');
  const [editedPriority, setEditedPriority] = useState<Customer['priority']>(customer?.priority || 'standard');

  if (!customer) return null;

  const handleSave = () => {
    updateCustomer({
      ...customer,
      mode: editedMode,
      priority: editedPriority,
    });
    addAuditLog('CUSTOMER_PROFILE_UPDATED', customer.ref, 'success', `Mode: ${editedMode}, Priority: ${editedPriority}`);
    setIsEditing(false);
  };

  const isPaused = customer.monitoringStatus === 'paused';

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Customer Identification Panel"
      subtitle={`Reference: ${customer.ref} • Enrolled ${customer.createdDate}`}
      width="lg"
    >
      <div className="space-y-6 text-xs text-[#202923]">
        {/* Top Identification Card */}
        <div className="p-4 bg-[#F6F7F5] rounded-card border border-[#E5EAE5] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#304F40] text-white flex items-center justify-center font-heading font-bold text-sm shadow-subtle">
                {customer.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#202923]">
                  {customer.name}
                </h4>
                <p className="text-[11px] text-[#77817A]">{customer.email} • {customer.phone}</p>
              </div>
            </div>

            <Badge
              variant={
                customer.monitoringStatus === 'active' || customer.monitoringStatus === 'scanning'
                  ? 'green'
                  : customer.monitoringStatus === 'reserved'
                  ? 'amber'
                  : customer.monitoringStatus === 'completed'
                  ? 'forest'
                  : 'neutral'
              }
              dot
            >
              {customer.monitoringStatus.toUpperCase()}
            </Badge>
          </div>

          {/* Masked Driving Licence Banner (Essential Requirement) */}
          <div className="p-2.5 rounded bg-white border border-[#E5EAE5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#557A65]" />
              <div>
                <span className="text-[10px] text-[#77817A] uppercase block">Masked Driving Licence</span>
                <span className="font-mono font-semibold text-[#202923]">{customer.maskedLicence}</span>
              </div>
            </div>
            <span className="text-[10px] bg-[#557A65]/10 text-[#304F40] px-2 py-0.5 rounded font-mono">
              VERIFIED
            </span>
          </div>
        </div>

        {/* Operational Status Controls */}
        <div className="flex items-center justify-between p-3 rounded-card bg-white border border-[#E5EAE5]">
          <div>
            <span className="text-[10px] text-[#77817A] uppercase block">Monitoring Engine State</span>
            <p className="font-semibold text-[#202923]">
              {isPaused ? 'Search Paused by Operator' : 'Actively Scanning Regional Pools'}
            </p>
          </div>
          <div>
            {isPaused ? (
              <Button
                variant="primary"
                size="sm"
                icon={<Play className="w-3.5 h-3.5" />}
                onClick={() => resumeMonitoring(customer.id)}
              >
                Resume Search
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                icon={<Pause className="w-3.5 h-3.5" />}
                onClick={() => pauseMonitoring(customer.id)}
              >
                Pause Search
              </Button>
            )}
          </div>
        </div>

        {/* Detailed Search Criteria */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#77817A] pb-1 border-b border-[#E5EAE5]">
            Target Test Preferences & Windows
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#F6F7F5] rounded-card">
              <span className="text-[10px] text-[#77817A] uppercase block">Test Type</span>
              <span className="font-semibold text-[#202923]">{customer.testType}</span>
            </div>

            <div className="p-3 bg-[#F6F7F5] rounded-card">
              <span className="text-[10px] text-[#77817A] uppercase block">Booking Purpose</span>
              <span className="font-semibold text-[#202923]">
                {customer.bookingPurpose === 'earlier_swap' ? 'Earlier Slot Swap' : 'New Test Booking'}
              </span>
            </div>

            <div className="p-3 bg-[#F6F7F5] rounded-card">
              <span className="text-[10px] text-[#77817A] uppercase block">Current Slot (Existing)</span>
              <span className="font-semibold text-[#202923]">
                {customer.currentBookingDate || 'None on file'}
              </span>
            </div>

            <div className="p-3 bg-[#F6F7F5] rounded-card">
              <span className="text-[10px] text-[#77817A] uppercase block">Acceptable Date Window</span>
              <span className="font-semibold text-[#202923]">
                {customer.targetDateRange.start} → {customer.targetDateRange.end}
              </span>
            </div>
          </div>

          {/* Test Centres */}
          <div className="p-3 bg-[#F6F7F5] rounded-card space-y-2">
            <span className="text-[10px] text-[#77817A] uppercase block">Selected Test Centres</span>
            <div className="flex flex-wrap gap-1.5">
              {customer.selectedCentres.map((centre, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 ${
                    centre === customer.preferredCentre
                      ? 'bg-[#557A65] text-white'
                      : 'bg-white border border-[#E5EAE5] text-[#202923]'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  {centre} {centre === customer.preferredCentre && '(Primary)'}
                </span>
              ))}
            </div>
          </div>

          {/* Time & Blackout Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#F6F7F5] rounded-card">
              <span className="text-[10px] text-[#77817A] uppercase block">Preferred Times</span>
              <p className="font-semibold text-[#202923] capitalize">
                {customer.preferredTimes.join(', ')}
              </p>
            </div>

            <div className="p-3 bg-[#F6F7F5] rounded-card">
              <span className="text-[10px] text-[#77817A] uppercase block">Avoided / Blackout Dates</span>
              <p className="font-semibold text-[#202923]">
                {customer.avoidDates.length > 0 ? customer.avoidDates.join(', ') : 'None specified'}
              </p>
            </div>
          </div>

          {/* Booking Mode & Priority Configuration */}
          <div className="p-3 bg-[#EFF2EF] rounded-card border border-[#E5EAE5] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#77817A] uppercase font-bold">
                Workflow Mode & Queue Priority
              </span>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-[#557A65] font-semibold hover:underline"
                >
                  Edit Configuration
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-xs text-[#77817A] hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="text-xs text-[#557A65] font-bold hover:underline"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[10px] text-[#77817A] block mb-1">Booking Mode</label>
                  <select
                    value={editedMode}
                    onChange={(e) => setEditedMode(e.target.value as Customer['mode'])}
                    className="w-full bg-white border border-[#E5EAE5] rounded p-1.5 text-xs text-[#202923]"
                  >
                    <option value="manual">Manual</option>
                    <option value="timed-manual">Timed-Manual (15m Lock)</option>
                    <option value="auto-book">Auto-Book</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-[#77817A] block mb-1">Priority</label>
                  <select
                    value={editedPriority}
                    onChange={(e) => setEditedPriority(e.target.value as Customer['priority'])}
                    className="w-full bg-white border border-[#E5EAE5] rounded p-1.5 text-xs text-[#202923]"
                  >
                    <option value="standard">Standard</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#77817A] block">Current Execution Mode</span>
                  <span className="font-semibold text-[#202923] capitalize">
                    {customer.mode.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#77817A] block">Priority Tier</span>
                  <span className="font-semibold text-[#557A65] capitalize">
                    {customer.priority}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#77817A] block">Est. Success Likelihood</span>
                  <span className="font-semibold font-mono text-[#304F40]">
                    {customer.successLikelihood}% (demo)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Operational Notes */}
          {customer.notes && (
            <div className="p-3 bg-white border border-[#E5EAE5] rounded-card">
              <span className="text-[10px] text-[#77817A] uppercase block mb-1">Staff Operational Notes</span>
              <p className="text-xs text-[#202923]">{customer.notes}</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="pt-2 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Send className="w-3.5 h-3.5" />}
              onClick={() => addToast('Notification Dispatched', `Sent test slot prompt to ${customer.phone}`, 'info')}
            >
              Dispatch Test SMS
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Close Panel
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
