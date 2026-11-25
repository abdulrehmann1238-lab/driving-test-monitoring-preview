import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Palette,
  Globe,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Card } from '../common/Card';

export const WhiteLabelShowcase: React.FC = () => {
  const { brands, activeBrand, switchBrand } = useApp();

  return (
    <section className="py-20 bg-[#F6F7F5] border-b border-[#E5EAE5]" id="white-label">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#557A65] font-mono">
            CENTRALISED WHITE-LABEL ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#202923] tracking-tight">
            One Powerful Engine. Multiple Independent Brands.
          </h2>
          <p className="text-sm sm:text-base text-[#77817A]">
            Launch multiple localized consumer brands with completely segregated styling, domain names, customer service details, and marketing copies.
          </p>
        </div>

        {/* Brand Switcher Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {brands.map((brand) => {
            const isSelected = activeBrand.id === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => switchBrand(brand.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-card transition-all ${
                  isSelected
                    ? 'bg-white shadow-elevated border-2 border-[#557A65]'
                    : 'bg-white/60 hover:bg-white border border-[#E5EAE5]'
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full shrink-0 border border-black/10"
                  style={{ backgroundColor: brand.primaryColor }}
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-[#202923] leading-none">{brand.name}</p>
                  <p className="text-[10px] text-[#77817A] mt-0.5 font-mono">{brand.domain}</p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-[#557A65] ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Brand Preview Card */}
        <div className="max-w-4xl mx-auto rounded-card bg-white border border-[#E5EAE5] shadow-card overflow-hidden">
          {/* Mock Browser Header */}
          <div className="bg-[#EFF2EF] px-4 py-2.5 border-b border-[#E5EAE5] flex items-center justify-between text-xs text-[#77817A]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="bg-white px-4 py-1 rounded-md text-[11px] font-mono text-[#202923] border border-[#E5EAE5]">
              https://{activeBrand.domain}
            </div>
            <div className="text-[10px] font-mono">Tenant #{activeBrand.id}</div>
          </div>

          {/* Active Brand Visual Preview */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5EAE5]">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-subtle"
                  style={{ backgroundColor: activeBrand.forestColor }}
                >
                  {activeBrand.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-[#202923]">
                    {activeBrand.name}
                  </h3>
                  <p className="text-xs text-[#77817A]">{activeBrand.tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-[#F6F7F5] border border-[#E5EAE5] text-xs">
                  <Palette className="w-3.5 h-3.5 text-[#557A65]" />
                  <span>Primary: </span>
                  <span className="font-mono font-bold" style={{ color: activeBrand.primaryColor }}>
                    {activeBrand.primaryColor}
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated Brand Hero */}
            <div className="space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#77817A]">
                Customer-Facing Hero
              </span>
              <h4 className="text-2xl sm:text-3xl font-heading font-bold text-[#202923]">
                {activeBrand.headline}
              </h4>
              <p className="text-xs sm:text-sm text-[#77817A] max-w-xl">
                Experience continuous driving test cancellation monitoring with instant WhatsApp and SMS slot reservations.
              </p>
              <button
                className="px-5 py-2.5 rounded-btn text-xs font-semibold text-white shadow-subtle transition-all"
                style={{ backgroundColor: activeBrand.primaryColor }}
              >
                Find Earlier Slots Now
              </button>
            </div>

            {/* Brand Footer Metadata Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#E5EAE5] text-xs text-[#77817A]">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#557A65]" />
                <span className="font-mono text-[#202923]">{activeBrand.domain}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#557A65]" />
                <span>{activeBrand.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#557A65]" />
                <span>{activeBrand.supportPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
