import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { BrandConfig } from '../../../types';
import {
  Layers,
  Palette,
  Globe,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Save,
  RotateCcw,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';

export const WhiteLabelBrandsView: React.FC = () => {
  const { brands, activeBrand, switchBrand, updateBrand, addToast } = useApp();

  const [editingBrand, setEditingBrand] = useState<BrandConfig>({ ...activeBrand });

  const handleSelectBrand = (b: BrandConfig) => {
    switchBrand(b.id);
    setEditingBrand({ ...b });
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrand(editingBrand);
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#202923]">
            White-Label Brand Management
          </h1>
          <p className="text-xs text-[#77817A] mt-0.5">
            Manage and customize independent tenant brands powered by the core AutoPass engine.
          </p>
        </div>

        <Badge variant="green" size="md">
          Centralized Multi-Tenant Architecture
        </Badge>
      </div>

      {/* 3 Brand Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {brands.map((b) => {
          const isSelected = activeBrand.id === b.id;
          return (
            <Card
              key={b.id}
              hoverEffect
              onClick={() => handleSelectBrand(b)}
              className={`p-4 cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-[#557A65] bg-white shadow-elevated'
                  : 'border-[#E5EAE5] bg-[#F6F7F5]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-heading font-bold text-sm shadow-subtle"
                  style={{ backgroundColor: b.forestColor }}
                >
                  {b.name.charAt(0)}
                </div>
                {isSelected && (
                  <span className="text-[10px] font-mono font-bold bg-[#557A65] text-white px-2 py-0.5 rounded">
                    ACTIVE BRAND
                  </span>
                )}
              </div>

              <h3 className="font-heading font-bold text-base text-[#202923]">{b.name}</h3>
              <p className="text-xs text-[#77817A] mt-0.5 font-mono">{b.domain}</p>

              <div className="pt-3 border-t border-[#E5EAE5] mt-3 flex items-center justify-between text-xs">
                <span className="text-[#77817A]">{b.customerCount} Active Learners</span>
                <span className="font-semibold text-[#557A65]">Switch Brand →</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Live Brand Customizer & Real-Time Preview Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form (6 Columns) */}
        <div className="lg:col-span-6 bg-white rounded-card border border-[#E5EAE5] p-5 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE5] mb-4">
            <h3 className="font-heading font-bold text-sm text-[#202923]">
              Configure Tenant: {editingBrand.name}
            </h3>
            <span className="text-xs text-[#77817A]">Changes apply immediately</span>
          </div>

          <form onSubmit={handleSaveBrand} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#202923] mb-1">Brand Name *</label>
              <input
                type="text"
                value={editingBrand.name}
                onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                className="w-full p-2 border border-[#E5EAE5] rounded text-xs outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#202923] mb-1">Primary Color (Hex)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editingBrand.primaryColor}
                    onChange={(e) => setEditingBrand({ ...editingBrand, primaryColor: e.target.value })}
                    className="w-8 h-8 rounded border border-[#E5EAE5] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingBrand.primaryColor}
                    onChange={(e) => setEditingBrand({ ...editingBrand, primaryColor: e.target.value })}
                    className="w-full p-2 border border-[#E5EAE5] rounded text-xs font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#202923] mb-1">Domain Name</label>
                <input
                  type="text"
                  value={editingBrand.domain}
                  onChange={(e) => setEditingBrand({ ...editingBrand, domain: e.target.value })}
                  className="w-full p-2 border border-[#E5EAE5] rounded text-xs font-mono outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#202923] mb-1">Customer Hero Headline</label>
              <input
                type="text"
                value={editingBrand.headline}
                onChange={(e) => setEditingBrand({ ...editingBrand, headline: e.target.value })}
                className="w-full p-2 border border-[#E5EAE5] rounded text-xs outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#202923] mb-1">Support Contact Email</label>
                <input
                  type="email"
                  value={editingBrand.contactEmail}
                  onChange={(e) => setEditingBrand({ ...editingBrand, contactEmail: e.target.value })}
                  className="w-full p-2 border border-[#E5EAE5] rounded text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#202923] mb-1">Support Telephone</label>
                <input
                  type="text"
                  value={editingBrand.supportPhone}
                  onChange={(e) => setEditingBrand({ ...editingBrand, supportPhone: e.target.value })}
                  className="w-full p-2 border border-[#E5EAE5] rounded text-xs outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5EAE5] flex justify-end">
              <Button
                type="submit"
                variant="primary"
                icon={<Save className="w-3.5 h-3.5" />}
              >
                Save Brand Configuration
              </Button>
            </div>
          </form>
        </div>

        {/* Real-Time Live Preview (6 Columns) */}
        <div className="lg:col-span-6 bg-white rounded-card border border-[#E5EAE5] p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE5] mb-4">
              <span className="text-[10px] font-mono text-[#77817A] uppercase font-bold">
                REAL-TIME BRAND PREVIEW
              </span>
              <span className="text-xs font-mono text-[#557A65]">Live CSS Sync</span>
            </div>

            {/* Simulated browser window */}
            <div className="rounded-card border border-[#E5EAE5] overflow-hidden bg-[#F6F7F5]">
              <div className="bg-[#EFF2EF] px-3 py-1.5 border-b border-[#E5EAE5] flex items-center justify-between text-[11px] font-mono text-[#77817A]">
                <span>https://{editingBrand.domain}</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: editingBrand.primaryColor }} />
              </div>

              <div className="p-5 space-y-4 bg-white">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: editingBrand.primaryColor }}
                  >
                    {editingBrand.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#202923]">{editingBrand.name}</h4>
                    <p className="text-[10px] text-[#77817A]">{editingBrand.tagline}</p>
                  </div>
                </div>

                <div className="py-2 space-y-1">
                  <h5 className="font-heading font-extrabold text-lg text-[#202923]">
                    {editingBrand.headline}
                  </h5>
                  <p className="text-xs text-[#77817A]">
                    Automated DVSA driving test availability monitoring.
                  </p>
                </div>

                <button
                  className="px-4 py-2 rounded text-xs font-bold text-white shadow-subtle"
                  style={{ backgroundColor: editingBrand.primaryColor }}
                >
                  Search Available Dates
                </button>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-[#77817A] text-center mt-4 font-mono">
            Independent client domains share the same high-availability backend cluster.
          </p>
        </div>
      </div>
    </div>
  );
};
