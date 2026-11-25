import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  User,
  Shield,
  MapPin,
  Calendar,
  Clock,
  Radio,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';

export const CustomerApplicationForm: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const { addCustomer, addToast, setActivePath } = useApp();

  const [step, setStep] = useState(1);

  // Step 1: Personal Info
  const [name, setName] = useState('');
  const [licence, setLicence] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2: Test Info
  const [testType, setTestType] = useState<'Car Practical' | 'Motorcycle' | 'ADI Part 2' | 'ADI Part 3'>('Car Practical');
  const [bookingPurpose, setBookingPurpose] = useState<'earlier_swap' | 'new_test'>('earlier_swap');
  const [existingRef, setExistingRef] = useState('');

  // Step 3: Test Centres
  const allCentres = [
    'Birmingham — South Yardley',
    'Birmingham — Kings Heath',
    'Birmingham — Garretts Green',
    'London — Mill Hill',
    'London — Hendon',
    'London — Borehamwood',
    'Manchester — Cheetham Hill',
    'Leeds — Harehills',
    'Bristol — Brislington',
    'Nottingham — Colwick',
  ];
  const [selectedCentres, setSelectedCentres] = useState<string[]>(['Birmingham — South Yardley']);
  const [preferredCentre, setPreferredCentre] = useState('Birmingham — South Yardley');

  // Step 4: Date Preferences
  const [startDate, setStartDate] = useState('2026-12-12');
  const [endDate, setEndDate] = useState('2026-12-26');
  const [preferredTimes, setPreferredTimes] = useState<('morning' | 'midday' | 'afternoon')[]>(['morning', 'midday']);
  const [avoidDates, setAvoidDates] = useState<string[]>(['2026-12-25']);

  // Step 5: Monitoring Preferences
  const [mode, setMode] = useState<'manual' | 'timed-manual' | 'auto-book'>('timed-manual');
  const [priority, setPriority] = useState<'standard' | 'high' | 'urgent'>('high');
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsAppAlerts, setWhatsAppAlerts] = useState(true);

  const toggleCentre = (centre: string) => {
    if (selectedCentres.includes(centre)) {
      if (selectedCentres.length > 1) {
        setSelectedCentres(selectedCentres.filter((c) => c !== centre));
      }
    } else {
      setSelectedCentres([...selectedCentres, centre]);
    }
  };

  const toggleTime = (t: 'morning' | 'midday' | 'afternoon') => {
    if (preferredTimes.includes(t)) {
      if (preferredTimes.length > 1) {
        setPreferredTimes(preferredTimes.filter((x) => x !== t));
      }
    } else {
      setPreferredTimes([...preferredTimes, t]);
    }
  };

  const handleSubmit = () => {
    addCustomer({
      name: name || 'James Harrington',
      email: email || 'james.harrington@example.co.uk',
      phone: phone || '+44 7700 900142',
      maskedLicence: licence ? `${licence.slice(0, 12)} ••••` : 'HARRI705129J99LK ••••',
      testType,
      bookingPurpose,
      currentBookingDate: existingRef ? '2027-04-14 11:15' : undefined,
      currentBookingCentre: preferredCentre,
      targetDateRange: {
        start: startDate,
        end: endDate,
      },
      preferredTimes,
      avoidDates,
      selectedCentres,
      preferredCentre,
      mode,
      priority,
      monitoringStatus: 'active',
      notes: 'Configured through customer self-service wizard.',
    });

    addToast('Search Enrolled!', 'Your driving test cancellation search is now active.', 'success');
    if (onComplete) onComplete();
    setActivePath('overview');
  };

  return (
    <Card className="max-w-3xl mx-auto p-6 shadow-card bg-white">
      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-[#77817A] mb-2 font-medium">
          <span>Step {step} of 6</span>
          <span className="font-semibold text-[#557A65]">
            {step === 1 && 'Personal Information'}
            {step === 2 && 'Test Details'}
            {step === 3 && 'Test Centre Selection'}
            {step === 4 && 'Date & Time Windows'}
            {step === 5 && 'Monitoring Mode & Alerts'}
            {step === 6 && 'Review & Activation'}
          </span>
        </div>
        <div className="w-full bg-[#EFF2EF] h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#557A65] transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-heading font-bold text-base text-[#202923]">
            Personal & Driving Licence Verification
          </h3>
          <p className="text-[#77817A]">
            Enter your official DVSA candidate details. All licences are masked and stored securely.
          </p>

          <div>
            <label className="block font-semibold text-[#202923] mb-1">Full Legal Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. James Harrington"
              className="w-full p-2.5 border border-[#E5EAE5] rounded text-xs outline-none focus:border-[#557A65]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#202923] mb-1">
                Great Britain Driving Licence Number *
              </label>
              <input
                type="text"
                required
                value={licence}
                onChange={(e) => setLicence(e.target.value.toUpperCase())}
                placeholder="e.g. HARRI705129J99LK"
                className="w-full p-2.5 border border-[#E5EAE5] rounded text-xs font-mono outline-none focus:border-[#557A65]"
              />
              <span className="text-[10px] text-[#77817A] mt-1 block">
                16-character UK driving licence format
              </span>
            </div>

            <div>
              <label className="block font-semibold text-[#202923] mb-1">Mobile Number (Instant Alerts) *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7700 900142"
                className="w-full p-2.5 border border-[#E5EAE5] rounded text-xs outline-none focus:border-[#557A65]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#202923] mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="james.harrington@example.co.uk"
              className="w-full p-2.5 border border-[#E5EAE5] rounded text-xs outline-none focus:border-[#557A65]"
            />
          </div>
        </div>
      )}

      {/* Step 2: Test Info */}
      {step === 2 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-heading font-bold text-base text-[#202923]">
            Test Type & Current Booking Status
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#202923] mb-1">Practical Test Category</label>
              <select
                value={testType}
                onChange={(e) => setTestType(e.target.value as any)}
                className="w-full p-2.5 border border-[#E5EAE5] rounded text-xs bg-white outline-none"
              >
                <option value="Car Practical">Car Practical (Category B)</option>
                <option value="Motorcycle">Motorcycle (Module 2)</option>
                <option value="ADI Part 2">Approved Driving Instructor (Part 2)</option>
                <option value="ADI Part 3">Approved Driving Instructor (Part 3)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#202923] mb-1">Booking Purpose</label>
              <select
                value={bookingPurpose}
                onChange={(e) => setBookingPurpose(e.target.value as any)}
                className="w-full p-2.5 border border-[#E5EAE5] rounded text-xs bg-white outline-none"
              >
                <option value="earlier_swap">Find Earlier Cancellation Slot (Swap)</option>
                <option value="new_test">Book Brand New Practical Test</option>
              </select>
            </div>
          </div>

          {bookingPurpose === 'earlier_swap' && (
            <div>
              <label className="block font-semibold text-[#202923] mb-1">
                Existing DVSA Application / Booking Reference
              </label>
              <input
                type="text"
                value={existingRef}
                onChange={(e) => setExistingRef(e.target.value)}
                placeholder="e.g. 7748102 (found on your DVSA confirmation email)"
                className="w-full p-2.5 border border-[#E5EAE5] rounded text-xs outline-none"
              />
            </div>
          )}
        </div>
      )}

      {/* Step 3: Test Centres */}
      {step === 3 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-heading font-bold text-base text-[#202923]">
            Select Monitored Test Centres
          </h3>
          <p className="text-[#77817A]">
            You can select multiple regional test centres to significantly increase cancellation discovery chances.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
            {allCentres.map((centre) => {
              const isSelected = selectedCentres.includes(centre);
              return (
                <button
                  key={centre}
                  type="button"
                  onClick={() => toggleCentre(centre)}
                  className={`p-2.5 rounded-btn border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-[#557A65]/10 border-[#557A65] text-[#304F40] font-semibold'
                      : 'bg-white border-[#E5EAE5] text-[#202923] hover:bg-[#F6F7F5]'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#557A65]" />
                    {centre}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#557A65] shrink-0" />}
                </button>
              );
            })}
          </div>

          <div>
            <label className="block font-semibold text-[#202923] mb-1">Primary Preferred Centre</label>
            <select
              value={preferredCentre}
              onChange={(e) => setPreferredCentre(e.target.value)}
              className="w-full p-2.5 border border-[#E5EAE5] rounded text-xs bg-white outline-none"
            >
              {selectedCentres.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Step 4: Date Preferences */}
      {step === 4 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-heading font-bold text-base text-[#202923]">
            Target Date Range & Time Slots
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#202923] mb-1">Earliest Acceptable Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2.5 border border-[#E5EAE5] rounded text-xs outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#202923] mb-1">Latest Acceptable Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2.5 border border-[#E5EAE5] rounded text-xs outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#202923] mb-2">Preferred Times of Day</label>
            <div className="grid grid-cols-3 gap-2">
              {(['morning', 'midday', 'afternoon'] as const).map((t) => {
                const isSelected = preferredTimes.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTime(t)}
                    className={`p-2.5 rounded border text-center capitalize text-xs transition-all ${
                      isSelected
                        ? 'bg-[#557A65] text-white font-bold'
                        : 'bg-[#F6F7F5] border-[#E5EAE5] text-[#202923]'
                    }`}
                  >
                    {t === 'morning' ? 'Morning (8am-11am)' : t === 'midday' ? 'Midday (11am-2pm)' : 'Afternoon (2pm-5pm)'}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#202923] mb-1">
              Blackout / Avoid Dates (e.g. Holidays)
            </label>
            <input
              type="text"
              value={avoidDates.join(', ')}
              onChange={(e) => setAvoidDates(e.target.value.split(',').map((s) => s.trim()))}
              placeholder="e.g. 2026-12-25, 2026-12-26"
              className="w-full p-2.5 border border-[#E5EAE5] rounded text-xs outline-none"
            />
          </div>
        </div>
      )}

      {/* Step 5: Mode & Alerts */}
      {step === 5 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-heading font-bold text-base text-[#202923]">
            Choose Workflow Execution Mode
          </h3>

          <div className="space-y-3">
            <div
              onClick={() => setMode('timed-manual')}
              className={`p-3.5 rounded-card border cursor-pointer transition-all ${
                mode === 'timed-manual'
                  ? 'border-[#D9A85C] bg-[#D9A85C]/10 ring-1 ring-[#D9A85C]'
                  : 'border-[#E5EAE5] hover:bg-[#F6F7F5]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#202923] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D9A85C]" />
                  Timed-Manual (15-Minute Countdown) • Recommended
                </span>
                {mode === 'timed-manual' && <CheckCircle2 className="w-4 h-4 text-[#D9A85C]" />}
              </div>
              <p className="text-[11px] text-[#77817A] leading-relaxed">
                We provisionally lock the slot on DVSA and alert you instantly via SMS. You have 15 minutes to reply YES or NO before it releases.
              </p>
            </div>

            <div
              onClick={() => setMode('auto-book')}
              className={`p-3.5 rounded-card border cursor-pointer transition-all ${
                mode === 'auto-book'
                  ? 'border-[#557A65] bg-[#557A65]/10 ring-1 ring-[#557A65]'
                  : 'border-[#E5EAE5] hover:bg-[#F6F7F5]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#202923] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#557A65]" />
                  Auto-Book Safeguard
                </span>
                {mode === 'auto-book' && <CheckCircle2 className="w-4 h-4 text-[#557A65]" />}
              </div>
              <p className="text-[11px] text-[#77817A] leading-relaxed">
                Immediately advances through verification and reservations, pausing cleanly for external payment confirmation.
              </p>
            </div>

            <div
              onClick={() => setMode('manual')}
              className={`p-3.5 rounded-card border cursor-pointer transition-all ${
                mode === 'manual'
                  ? 'border-[#77817A] bg-[#EFF2EF] ring-1 ring-[#77817A]'
                  : 'border-[#E5EAE5] hover:bg-[#F6F7F5]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#202923]">Manual Review</span>
                {mode === 'manual' && <CheckCircle2 className="w-4 h-4 text-[#77817A]" />}
              </div>
              <p className="text-[11px] text-[#77817A] leading-relaxed">
                We only notify you of availability; no provisional hold is created until you confirm in your portal.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 6: Review & Activate */}
      {step === 6 && (
        <div className="space-y-4 text-xs">
          <h3 className="font-heading font-bold text-base text-[#202923]">
            Review & Activate Cancellation Monitoring
          </h3>

          <div className="p-4 bg-[#F6F7F5] rounded-card border border-[#E5EAE5] space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-[#77817A] uppercase block">Candidate Name</span>
                <span className="font-bold text-[#202923]">{name || 'James Harrington'}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#77817A] uppercase block">Licence (Masked)</span>
                <span className="font-mono text-[#202923]">
                  {licence ? `${licence.slice(0, 12)} ••••` : 'HARRI705129J99LK ••••'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#77817A] uppercase block">Target Centres</span>
                <span className="font-medium text-[#202923]">{selectedCentres.join(', ')}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#77817A] uppercase block">Date Window</span>
                <span className="font-medium text-[#202923]">{startDate} → {endDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#77817A] uppercase block">Workflow Mode</span>
                <span className="font-bold text-[#557A65] uppercase">{mode}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#77817A] uppercase block">Alert Relay</span>
                <span className="font-medium text-[#202923]">SMS & WhatsApp Enabled</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#557A65]/10 rounded border border-[#557A65]/30 text-[11px] text-[#304F40]">
            ✓ Target scanning workers will activate immediately upon submission with sub-second polling frequency.
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-[#E5EAE5] mt-6 flex justify-between">
        {step > 1 ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStep(step - 1)}
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back
          </Button>
        ) : <div />}

        {step < 6 ? (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setStep(step + 1)}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            icon={<CheckCircle2 className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Activate Search Task
          </Button>
        )}
      </div>
    </Card>
  );
};
