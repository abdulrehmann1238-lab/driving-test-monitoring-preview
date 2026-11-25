import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Invoice } from '../../../types';
import { formatCurrency, formatDateUK } from '../../../utils/formatters';
import {
  CreditCard,
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Send,
  Eye,
  Building2,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import { InvoiceModal } from './InvoiceModal';

export const AccountantDashboard: React.FC = () => {
  const {
    invoices,
    markInvoicePaid,
    requestInvoiceAmendment,
    approveInvoiceAmendment,
    addInvoice,
    addToast,
    addAuditLog,
    activeBrand,
  } = useApp();

  const [search, setSearch] = useState('');
  const [profileFilter, setProfileFilter] = useState<'ALL' | 'UK' | 'TR'>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [amendmentModalInvoice, setAmendmentModalInvoice] = useState<Invoice | null>(null);
  const [amendmentReason, setAmendmentReason] = useState('');

  // Form state
  const [formCustomerName, setFormCustomerName] = useState('');
  const [formAmount, setFormAmount] = useState('70.00');
  const [formProfile, setFormProfile] = useState<'UK' | 'TR'>('UK');
  const [formDesc, setFormDesc] = useState('Cancellation Monitoring & Timed Reservation Package');

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase());

    const matchesProfile = profileFilter === 'ALL' || inv.businessProfile === profileFilter;
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;

    return matchesSearch && matchesProfile && matchesStatus;
  });

  // Calculate totals
  const totalGBP = invoices
    .filter((inv) => inv.currency === 'GBP')
    .reduce((sum, inv) => sum + inv.total, 0);

  const totalTRY = invoices
    .filter((inv) => inv.currency === 'TRY')
    .reduce((sum, inv) => sum + inv.total, 0);

  const paidCount = invoices.filter((inv) => inv.status === 'paid').length;
  const pendingCount = invoices.filter((inv) => inv.status === 'pending').length;

  const handleExportCSV = () => {
    const headers = 'InvoiceNumber,CustomerName,Profile,Currency,Subtotal,TaxAmount,Total,Status,IssueDate\n';
    const rows = invoices
      .map(
        (i) =>
          `${i.invoiceNumber},"${i.customerName}",${i.businessProfile},${i.currency},${i.subtotal},${i.taxAmount},${i.total},${i.status},${i.issueDate}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autopass_invoices_${Date.now()}.csv`;
    a.click();
    addToast('CSV Export Ready', 'Downloaded demonstration invoice register', 'success');
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(formAmount) || 70;
    const taxRate = 20;
    const taxAmount = (amountNum * taxRate) / 100;
    const total = amountNum + taxAmount;

    addInvoice({
      customerId: 'cust-01',
      customerName: formCustomerName || 'James Harrington',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      amount: total,
      currency: formProfile === 'TR' ? 'TRY' : 'GBP',
      status: 'pending',
      lineItems: [
        {
          description: formDesc,
          quantity: 1,
          unitPrice: amountNum,
          total: amountNum,
        },
      ],
      subtotal: amountNum,
      taxRate: 20,
      taxAmount,
      total,
      businessProfile: formProfile,
      eFaturaStatus: formProfile === 'TR' ? 'Queued' : undefined,
    });

    setShowCreateModal(false);
    setFormCustomerName('');
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            Financial & Invoicing Management
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Multi-currency billing, UK HMRC VAT / Turkey e-Fatura profiles, and audit approvals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowCreateModal(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Invoice
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <span className="text-[10px] text-[#77817A] uppercase block">Total Revenue (GBP)</span>
          <p className="text-2xl font-bold font-heading text-[#202923] tabular-nums mt-1">
            £{totalGBP.toFixed(2)}
          </p>
          <span className="text-[10px] text-[#557A65]">UK Business Profile</span>
        </Card>

        <Card className="p-4">
          <span className="text-[10px] text-[#77817A] uppercase block">Total Revenue (TRY)</span>
          <p className="text-2xl font-bold font-heading text-[#202923] tabular-nums mt-1">
            ₺{totalTRY.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] text-[#557A65]">Turkey e-Fatura / e-Arşiv</span>
        </Card>

        <Card className="p-4">
          <span className="text-[10px] text-[#77817A] uppercase block">Paid Invoices</span>
          <p className="text-2xl font-bold font-heading text-[#557A65] tabular-nums mt-1">
            {paidCount}
          </p>
          <span className="text-[10px] text-[#77817A]">Settled through Stripe/Bank</span>
        </Card>

        <Card className="p-4">
          <span className="text-[10px] text-[#77817A] uppercase block">Outstanding Invoices</span>
          <p className="text-2xl font-bold font-heading text-[#D9A85C] tabular-nums mt-1">
            {pendingCount}
          </p>
          <span className="text-[10px] text-[#8F6627]">Awaiting confirmation</span>
        </Card>
      </div>

      {/* Search & Country Filter Tabs */}
      <div className="bg-white rounded-card border border-[#E5EAE5] p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-card">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#77817A]" />
          <input
            type="text"
            placeholder="Search invoice number (e.g. INV-UK) or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs text-[#202923] outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Profile Switcher */}
          <div className="flex items-center bg-[#EFF2EF] p-0.5 rounded-btn text-xs">
            <button
              onClick={() => setProfileFilter('ALL')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                profileFilter === 'ALL' ? 'bg-white text-[#202923] shadow-subtle' : 'text-[#77817A]'
              }`}
            >
              All Profiles
            </button>
            <button
              onClick={() => setProfileFilter('UK')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                profileFilter === 'UK' ? 'bg-white text-[#202923] shadow-subtle' : 'text-[#77817A]'
              }`}
            >
              UK (GBP / VAT)
            </button>
            <button
              onClick={() => setProfileFilter('TR')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                profileFilter === 'TR' ? 'bg-white text-[#202923] shadow-subtle' : 'text-[#77817A]'
              }`}
            >
              Turkey (TRY / e-Fatura)
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-card border border-[#E5EAE5] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F6F7F5] border-b border-[#E5EAE5] text-[#77817A] text-[10px] uppercase font-semibold">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Profile</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4">Amendment State</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAE5]">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#F6F7F5]/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#202923]">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#202923]">
                    {inv.customerName}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        inv.businessProfile === 'TR'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {inv.businessProfile === 'TR' ? 'TR (₺)' : 'UK (£)'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#77817A]">{formatDateUK(inv.issueDate)}</td>
                  <td className="py-3 px-4 text-[#77817A]">{formatDateUK(inv.dueDate)}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#202923]">
                    {formatCurrency(inv.total, inv.currency)}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={inv.status === 'paid' ? 'green' : 'amber'}
                      size="sm"
                      dot
                    >
                      {inv.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    {inv.amendmentStatus === 'pending_approval' ? (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded animate-pulse">
                        Awaiting 2nd Approval
                      </span>
                    ) : inv.amendmentStatus === 'approved' ? (
                      <span className="text-[10px] bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded">
                        Approved
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#77817A]">Normal</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-2 py-1 rounded bg-[#EFF2EF] hover:bg-[#E5EAE5] text-[#202923] text-[11px] font-medium"
                        title="Print / View Invoice"
                      >
                        Preview
                      </button>

                      {inv.status !== 'paid' && (
                        <button
                          onClick={() => markInvoicePaid(inv.id)}
                          className="px-2 py-1 rounded bg-[#557A65]/15 hover:bg-[#557A65]/25 text-[#304F40] text-[11px] font-semibold"
                          title="Record payment confirmation"
                        >
                          Mark Paid
                        </button>
                      )}

                      {inv.amendmentStatus === 'pending_approval' ? (
                        <button
                          onClick={() => approveInvoiceAmendment(inv.id)}
                          className="px-2 py-1 rounded bg-[#557A65] text-white text-[11px] font-bold"
                          title="Authorize amendment"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setAmendmentModalInvoice(inv);
                            setAmendmentReason('');
                          }}
                          className="text-[#77817A] hover:text-[#202923] p-1 text-[11px]"
                          title="Request restricted amendment"
                        >
                          Amend
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Printable Preview Modal */}
      <InvoiceModal
        invoice={selectedInvoice}
        isOpen={Boolean(selectedInvoice)}
        onClose={() => setSelectedInvoice(null)}
        brandName={activeBrand.name}
      />

      {/* Restricted Amendment Approval Dialog (Prompt Requirement) */}
      <Modal
        isOpen={Boolean(amendmentModalInvoice)}
        onClose={() => setAmendmentModalInvoice(null)}
        title="Restricted Financial Amendment Workflow"
        subtitle={`Invoice ${amendmentModalInvoice?.invoiceNumber}`}
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-900 leading-relaxed">
            <p className="font-semibold mb-1">Audit Policy Requirement:</p>
            <p>
              Accountants cannot silently modify invoice amounts or totals. Amendments require a documented justification and are queued for secondary officer sign-off.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#202923] mb-1">
              Reason for Amendment *
            </label>
            <textarea
              rows={3}
              value={amendmentReason}
              onChange={(e) => setAmendmentReason(e.target.value)}
              placeholder="e.g. Applied approved ADI partner discount of 15% following cancellation dispute."
              className="w-full p-2 border border-[#E5EAE5] rounded text-xs outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              onClick={() => setAmendmentModalInvoice(null)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={!amendmentReason.trim()}
              onClick={() => {
                if (amendmentModalInvoice) {
                  requestInvoiceAmendment(amendmentModalInvoice.id, amendmentReason);
                  setAmendmentModalInvoice(null);
                }
              }}
            >
              Submit for Approval
            </Button>
          </div>
        </div>
      </Modal>

      {/* Create Invoice Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Customer Invoice"
        subtitle="Generate an itemized invoice under UK or Turkey profile"
        maxWidth="md"
      >
        <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-[#202923] mb-1">
              Candidate Name *
            </label>
            <input
              type="text"
              required
              value={formCustomerName}
              onChange={(e) => setFormCustomerName(e.target.value)}
              placeholder="e.g. James Harrington"
              className="w-full p-2 border border-[#E5EAE5] rounded text-xs outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#202923] mb-1">
                Business Tax Profile
              </label>
              <select
                value={formProfile}
                onChange={(e) => setFormProfile(e.target.value as any)}
                className="w-full p-2 border border-[#E5EAE5] rounded text-xs bg-white outline-none"
              >
                <option value="UK">United Kingdom (£ • 20% VAT)</option>
                <option value="TR">Turkey (₺ • 20% KDV / e-Fatura)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#202923] mb-1">
                Subtotal Amount (excl. tax)
              </label>
              <input
                type="number"
                required
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
                className="w-full p-2 border border-[#E5EAE5] rounded text-xs outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#202923] mb-1">
              Service Line Description
            </label>
            <input
              type="text"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              className="w-full p-2 border border-[#E5EAE5] rounded text-xs outline-none"
            />
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
              Issue Invoice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
