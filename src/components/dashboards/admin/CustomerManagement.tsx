import React, { useState } from 'react';
import { Customer, BookingMode, Priority, TaskStatus } from '../../../types';
import { useApp } from '../../../context/AppContext';
import {
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  MoreVertical,
  MapPin,
  Clock,
  Eye,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import { CustomerProfileDrawer } from './CustomerProfileDrawer';

export const CustomerManagement: React.FC = () => {
  const { customers, addCustomer, pauseMonitoring, resumeMonitoring } = useApp();

  const [search, setSearch] = useState('');
  const [modeFilter, setModeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State for new customer
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLicence, setFormLicence] = useState('');
  const [formCentre, setFormCentre] = useState('Birmingham — South Yardley');
  const [formMode, setFormMode] = useState<BookingMode>('timed-manual');
  const [formPriority, setFormPriority] = useState<Priority>('high');
  const [formPurpose, setFormPurpose] = useState<'earlier_swap' | 'new_test'>('earlier_swap');
  const [formStartDate, setFormStartDate] = useState('2026-12-15');
  const [formEndDate, setFormEndDate] = useState('2027-01-15');

  // Filter & Search
  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.ref.toLowerCase().includes(search.toLowerCase()) ||
      c.preferredCentre.toLowerCase().includes(search.toLowerCase());

    const matchesMode = modeFilter === 'all' || c.mode === modeFilter;
    const matchesStatus = statusFilter === 'all' || c.monitoringStatus === statusFilter;

    return matchesSearch && matchesMode && matchesStatus;
  });

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formLicence || !formEmail) return;

    addCustomer({
      name: formName,
      email: formEmail,
      phone: formPhone || '+44 7700 900123',
      maskedLicence: `${formLicence.slice(0, 12)} ••••`,
      testType: 'Car Practical',
      bookingPurpose: formPurpose,
      targetDateRange: {
        start: formStartDate,
        end: formEndDate,
      },
      preferredTimes: ['morning', 'midday'],
      avoidDates: [],
      selectedCentres: [formCentre],
      preferredCentre: formCentre,
      mode: formMode,
      priority: formPriority,
      monitoringStatus: 'active',
    });

    setShowCreateModal(false);
    // Reset form
    setFormName('');
    setFormEmail('');
    setFormLicence('');
  };

  return (
    <div className="space-y-6">
      {/* Heading & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            Customer Management
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Active candidate tasks, masked licence identities and queue allocations.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => setShowCreateModal(true)}
        >
          Create Candidate Task
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-card border border-[#E5EAE5] p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-card">
        <div className="flex items-center gap-2 flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-[#77817A]" />
          <input
            type="text"
            placeholder="Search candidate name, reference ID (e.g. DTM-9421), or centre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs text-[#202923] outline-none placeholder-[#77817A]"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Filter */}
          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
            className="text-xs bg-[#EFF2EF] text-[#202923] border border-[#E5EAE5] rounded-btn px-2.5 py-1.5 focus:outline-none"
          >
            <option value="all">All Modes</option>
            <option value="timed-manual">Timed-Manual</option>
            <option value="auto-book">Auto-Book</option>
            <option value="manual">Manual</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-[#EFF2EF] text-[#202923] border border-[#E5EAE5] rounded-btn px-2.5 py-1.5 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="scanning">Scanning</option>
            <option value="reserved">Reserved</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Customer Data Table */}
      <div className="bg-white rounded-card border border-[#E5EAE5] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F6F7F5] border-b border-[#E5EAE5] text-[#77817A] text-[10px] uppercase font-semibold">
                <th className="py-3 px-4">Candidate & Reference</th>
                <th className="py-3 px-4">Test Centre</th>
                <th className="py-3 px-4">Booking Purpose</th>
                <th className="py-3 px-4">Workflow Mode</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAE5]">
              {filtered.map((cust) => {
                const isPaused = cust.monitoringStatus === 'paused';
                return (
                  <tr
                    key={cust.id}
                    className="hover:bg-[#F6F7F5]/70 transition-colors cursor-pointer group"
                    onClick={() => setSelectedCustomer(cust)}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#202923] group-hover:text-[#557A65] transition-colors">
                        {cust.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#77817A]">{cust.ref}</div>
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
                      <span className="text-[11px] text-[#202923]">
                        {cust.bookingPurpose === 'earlier_swap' ? 'Earlier Swap' : 'New Test'}
                      </span>
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

                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase ${
                          cust.priority === 'urgent'
                            ? 'text-red-600'
                            : cust.priority === 'high'
                            ? 'text-[#557A65]'
                            : 'text-[#77817A]'
                        }`}
                      >
                        {cust.priority}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          cust.monitoringStatus === 'active' || cust.monitoringStatus === 'scanning'
                            ? 'green'
                            : cust.monitoringStatus === 'reserved'
                            ? 'amber'
                            : cust.monitoringStatus === 'completed'
                            ? 'forest'
                            : 'neutral'
                        }
                        size="sm"
                        dot
                      >
                        {cust.monitoringStatus}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-[#77817A] font-mono text-[11px]">
                      {cust.lastScanTime}
                    </td>

                    <td
                      className="py-3 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        {isPaused ? (
                          <button
                            onClick={() => resumeMonitoring(cust.id)}
                            className="p-1 rounded text-[#557A65] hover:bg-[#557A65]/10"
                            title="Resume search"
                          >
                            <Play className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => pauseMonitoring(cust.id)}
                            className="p-1 rounded text-[#77817A] hover:bg-[#EFF2EF]"
                            title="Pause search"
                          >
                            <Pause className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedCustomer(cust)}
                          className="p-1 rounded text-[#77817A] hover:bg-[#EFF2EF]"
                          title="Open identification panel"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-[#F6F7F5] border-t border-[#E5EAE5] flex items-center justify-between text-xs text-[#77817A]">
          <span>Showing {filtered.length} of {customers.length} candidate tasks</span>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 rounded bg-white border border-[#E5EAE5] text-[#77817A] disabled:opacity-50">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[#202923]">Page 1 of 1</span>
            <button className="px-2 py-1 rounded bg-white border border-[#E5EAE5] text-[#77817A] disabled:opacity-50">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Customer Identification Drawer */}
      <CustomerProfileDrawer
        customer={selectedCustomer}
        isOpen={Boolean(selectedCustomer)}
        onClose={() => setSelectedCustomer(null)}
      />

      {/* Create Customer Task Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Candidate Monitoring Task"
        subtitle="Enroll a new learner into the regional cancellation scanner"
      >
        <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-[#202923] mb-1">
              Candidate Full Name *
            </label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Liam Henderson"
              className="w-full p-2 border border-[#E5EAE5] rounded-btn text-xs outline-none focus:border-[#557A65]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#202923] mb-1">
                Driving Licence Number *
              </label>
              <input
                type="text"
                required
                value={formLicence}
                onChange={(e) => setFormLicence(e.target.value.toUpperCase())}
                placeholder="e.g. HENDE810214L99AA"
                className="w-full p-2 border border-[#E5EAE5] rounded-btn text-xs font-mono outline-none focus:border-[#557A65]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#202923] mb-1">
                Booking Purpose
              </label>
              <select
                value={formPurpose}
                onChange={(e) => setFormPurpose(e.target.value as any)}
                className="w-full p-2 border border-[#E5EAE5] rounded-btn text-xs bg-white outline-none"
              >
                <option value="earlier_swap">Earlier Slot Swap</option>
                <option value="new_test">New Practical Booking</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#202923] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="candidate@example.co.uk"
                className="w-full p-2 border border-[#E5EAE5] rounded-btn text-xs outline-none focus:border-[#557A65]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#202923] mb-1">
                Mobile Number (SMS Alerts)
              </label>
              <input
                type="text"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="+44 7700 900123"
                className="w-full p-2 border border-[#E5EAE5] rounded-btn text-xs outline-none focus:border-[#557A65]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#202923] mb-1">
              Primary Test Centre
            </label>
            <select
              value={formCentre}
              onChange={(e) => setFormCentre(e.target.value)}
              className="w-full p-2 border border-[#E5EAE5] rounded-btn text-xs bg-white outline-none"
            >
              <option value="Birmingham — South Yardley">Birmingham — South Yardley</option>
              <option value="London — Mill Hill">London — Mill Hill</option>
              <option value="Manchester — Cheetham Hill">Manchester — Cheetham Hill</option>
              <option value="Leeds — Harehills">Leeds — Harehills</option>
              <option value="Bristol — Brislington">Bristol — Brislington</option>
              <option value="Nottingham — Colwick">Nottingham — Colwick</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#202923] mb-1">
                Earliest Acceptable Date
              </label>
              <input
                type="date"
                value={formStartDate}
                onChange={(e) => setFormStartDate(e.target.value)}
                className="w-full p-2 border border-[#E5EAE5] rounded-btn text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#202923] mb-1">
                Latest Acceptable Date
              </label>
              <input
                type="date"
                value={formEndDate}
                onChange={(e) => setFormEndDate(e.target.value)}
                className="w-full p-2 border border-[#E5EAE5] rounded-btn text-xs outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#202923] mb-1">
                Workflow Mode
              </label>
              <select
                value={formMode}
                onChange={(e) => setFormMode(e.target.value as BookingMode)}
                className="w-full p-2 border border-[#E5EAE5] rounded-btn text-xs bg-white outline-none"
              >
                <option value="timed-manual">Timed-Manual (15m Lock)</option>
                <option value="auto-book">Auto-Book</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#202923] mb-1">
                Priority Tier
              </label>
              <select
                value={formPriority}
                onChange={(e) => setFormPriority(e.target.value as Priority)}
                className="w-full p-2 border border-[#E5EAE5] rounded-btn text-xs bg-white outline-none"
              >
                <option value="standard">Standard</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-[#E5EAE5]">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Enroll Candidate
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
