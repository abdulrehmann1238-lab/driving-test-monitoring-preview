import React from 'react';
import { Invoice } from '../../../types';
import { formatCurrency, formatDateUK } from '../../../utils/formatters';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

interface InvoiceModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  brandName?: string;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  invoice,
  isOpen,
  onClose,
  brandName = 'AutoPass OS Enterprise',
}) => {
  if (!invoice) return null;

  const isTR = invoice.businessProfile === 'TR';

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Printable Invoice: ${invoice.invoiceNumber}`}
      subtitle={`Tax Profile: ${isTR ? 'Turkey (e-Fatura / e-Arşiv • 20% KDV)' : 'United Kingdom (HMRC • 20% VAT)'}`}
      maxWidth="2xl"
    >
      <div className="space-y-6 text-xs text-[#202923] p-2 bg-white" id="printable-invoice">
        {/* Printable Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#E5EAE5]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#304F40] flex items-center justify-center text-white font-bold font-heading">
                AP
              </div>
              <span className="font-heading font-extrabold text-base text-[#202923]">
                {brandName}
              </span>
            </div>
            <p className="text-[11px] text-[#77817A] leading-tight">
              {isTR
                ? 'AutoPass Teknoloji ve Sınav Otomasyonu A.Ş.\nLevent Maslak Vergi Dairesi: 8491028401\nİstanbul, Türkiye'
                : 'AutoPass Operations UK Ltd\nRegistered Office: 140 West Smithfield\nLondon EC1A 9HY, United Kingdom\nVAT Reg: GB 924 8104 22'}
            </p>
          </div>

          <div className="sm:text-right space-y-1">
            <span className="font-heading font-extrabold text-xl text-[#202923] block">
              {isTR ? 'E-FATURA / FATURA' : 'TAX INVOICE'}
            </span>
            <p className="font-mono font-semibold text-[#557A65]">{invoice.invoiceNumber}</p>
            <p className="text-[11px] text-[#77817A]">
              Issue Date: {formatDateUK(invoice.issueDate)}
            </p>
            <p className="text-[11px] text-[#77817A]">
              Due Date: {formatDateUK(invoice.dueDate)}
            </p>
            {isTR && invoice.eFaturaStatus && (
              <span className="inline-block mt-1 text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                GİB e-Fatura: {invoice.eFaturaStatus}
              </span>
            )}
          </div>
        </div>

        {/* Bill To & Payment Info */}
        <div className="grid grid-cols-2 gap-6 pb-6 border-b border-[#E5EAE5]">
          <div>
            <span className="text-[10px] text-[#77817A] uppercase font-bold block mb-1">
              Billed To Candidate:
            </span>
            <p className="font-bold text-[#202923] text-sm">{invoice.customerName}</p>
            <p className="text-[11px] text-[#77817A]">Candidate Ref: DTM-9421</p>
            <p className="text-[11px] text-[#77817A]">Status: Individual Learner</p>
          </div>

          <div className="sm:text-right">
            <span className="text-[10px] text-[#77817A] uppercase font-bold block mb-1">
              Payment Status & Method:
            </span>
            <span
              className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${
                invoice.status === 'paid'
                  ? 'bg-[#557A65]/15 text-[#304F40]'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {invoice.status.toUpperCase()}
            </span>
            {invoice.paymentRef && (
              <p className="text-[10px] font-mono text-[#77817A] mt-1">
                Ref: {invoice.paymentRef}
              </p>
            )}
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5EAE5] text-[#77817A] text-[10px] uppercase font-semibold">
                <th className="py-2.5">Item Description</th>
                <th className="py-2.5 text-center">Qty</th>
                <th className="py-2.5 text-right">Unit Price</th>
                <th className="py-2.5 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAE5]">
              {invoice.lineItems.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3 font-medium text-[#202923]">{item.description}</td>
                  <td className="py-3 text-center tabular-nums">{item.quantity}</td>
                  <td className="py-3 text-right font-mono tabular-nums">
                    {formatCurrency(item.unitPrice, invoice.currency)}
                  </td>
                  <td className="py-3 text-right font-mono font-semibold tabular-nums text-[#202923]">
                    {formatCurrency(item.total, invoice.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="pt-4 border-t border-[#E5EAE5] flex justify-end">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-[#77817A]">
              <span>Subtotal:</span>
              <span className="font-mono text-[#202923]">
                {formatCurrency(invoice.subtotal, invoice.currency)}
              </span>
            </div>
            <div className="flex justify-between text-[#77817A]">
              <span>{isTR ? 'KDV (%20):' : 'VAT (20%):'}</span>
              <span className="font-mono text-[#202923]">
                {formatCurrency(invoice.taxAmount, invoice.currency)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#E5EAE5] font-bold text-sm text-[#202923]">
              <span>Total Payable:</span>
              <span className="font-mono text-[#557A65]">
                {formatCurrency(invoice.total, invoice.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="p-3 bg-[#F6F7F5] rounded text-[10px] text-[#77817A] leading-relaxed">
          <p>
            {isTR
              ? 'Bu fatura AutoPass test ve iptal takip sistemi üzerinden simüle edilmiştir. 213 sayılı VUK kapsamında e-Fatura entegratör taslağı olarak düzenlenmiştir.'
              : 'This invoice demonstrates AutoPass automated billing integration. All values shown are illustrative simulated client records.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-4 flex justify-end gap-2 border-t border-[#E5EAE5]">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            icon={<Printer className="w-3.5 h-3.5" />}
          >
            Print / Save PDF
          </Button>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
