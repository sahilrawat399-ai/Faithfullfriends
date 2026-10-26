import React, { useState } from 'react';
import { Heart, ShieldCheck, Lock, CheckCircle, CreditCard, Sparkles, AlertCircle } from 'lucide-react';
import { Cause, DonationRecord } from '../types';

interface DonationSectionProps {
  causes: Cause[];
  selectedCauseId?: string;
  onDonationSuccess: (donation: DonationRecord) => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  causes,
  selectedCauseId,
  onDonationSuccess,
}) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(501);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [activeCause, setActiveCause] = useState<string>(selectedCauseId || 'feed-child');

  // Form Fields
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [message, setMessage] = useState('');
  const [consentUpdates, setConsentUpdates] = useState(true);

  // Flow & State Handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Simulated Payment Gateway Modal state
  const [showGatewayModal, setShowGatewayModal] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [pendingOrder, setPendingOrder] = useState<any>(null);

  // Update active cause if parent prop changes
  React.useEffect(() => {
    if (selectedCauseId) {
      setActiveCause(selectedCauseId);
    }
  }, [selectedCauseId]);

  const presetAmounts = [101, 251, 501, 1001];

  const effectiveAmount = customAmount ? Number(customAmount) : (selectedAmount || 0);

  const handlePresetSelect = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const validateForm = () => {
    if (!effectiveAmount || effectiveAmount < 10) {
      setErrorMessage('Please select or enter a donation amount of at least ₹10.');
      return false;
    }
    if (!donorName.trim()) {
      setErrorMessage('Please enter your full name as it appears on official records.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!donorEmail.trim() || !emailRegex.test(donorEmail)) {
      setErrorMessage('Please enter a valid email address to receive your 80G tax receipt.');
      return false;
    }
    const phoneClean = donorPhone.replace(/[^0-9]/g, '');
    if (phoneClean.length < 10) {
      setErrorMessage('Please provide a valid 10-digit mobile number.');
      return false;
    }
    if (panNumber.trim() && panNumber.trim().length !== 10) {
      setErrorMessage('PAN format must be 10 characters (e.g., ABCDE1234F).');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleInitiateDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Create order on secure backend
      const res = await fetch('/api/donations/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount,
          causeId: activeCause,
          donorName,
          donorEmail,
          donorPhone,
          panNumber: panNumber ? panNumber.toUpperCase() : undefined,
          frequency,
          message,
          consentUpdates
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create donation order');
      }

      const orderData = await res.json();
      setPendingOrder(orderData);
      setIsSubmitting(false);

      // Open Gateway Checkout Modal (Simulated official checkout interface adhering to security rules)
      setShowGatewayModal(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Payment service is temporarily unreachable. Please retry.');
    }
  };

  const handleCompleteGatewayPayment = async (status: 'success' | 'failure') => {
    if (!pendingOrder) return;

    if (status === 'failure') {
      setShowGatewayModal(false);
      setErrorMessage('Payment was cancelled or declined by your bank. No funds were debited.');
      return;
    }

    setIsSubmitting(true);
    try {
      const mockPaymentId = `pay_rzp_${Date.now()}_${Math.floor(Math.random() * 9000 + 1000)}`;

      // 2. Server-side payment verification
      const verifyRes = await fetch('/api/donations/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: pendingOrder.orderId,
          razorpay_payment_id: mockPaymentId,
          razorpay_signature: pendingOrder.mockExpectedToken,
          amount: pendingOrder.amount,
          causeId: pendingOrder.causeId,
          donorDetails: pendingOrder.donor
        })
      });

      if (!verifyRes.ok) {
        const verifyError = await verifyRes.json();
        throw new Error(verifyError.error || 'Server signature verification failed');
      }

      const verifyData = await verifyRes.json();
      setShowGatewayModal(false);
      setIsSubmitting(false);

      // Reset form
      setDonorName('');
      setDonorEmail('');
      setDonorPhone('');
      setPanNumber('');
      setMessage('');

      // Notify parent & open 80G receipt
      onDonationSuccess(verifyData.donation);
    } catch (err: any) {
      setIsSubmitting(false);
      setShowGatewayModal(false);
      setErrorMessage('Verification error: ' + err.message);
    }
  };

  return (
    <section id="donate" className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#103D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#176B4D] font-bold mb-3">
            <span>Direct Contribution</span>
            <span aria-hidden="true">·</span>
            <span>Tax Exemption 80G</span>
            <span aria-hidden="true">·</span>
            <span>Instant Receipt</span>
          </div>

          <h2
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#103D2B] tracking-tight leading-tight mb-4"
          >
            Turn Compassion Into Action.
          </h2>

          <p className="text-base sm:text-lg text-[#202720]/80 leading-relaxed max-w-2xl mx-auto">
            Your generous contribution provides wholesome meals, animal shelter care, and emergency
            relief. Every donor receives an official tax receipt for 50% deduction under Section 80G.
          </p>
        </div>

        {/* Central Donation Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#103D2B]/12 shadow-xl p-6 sm:p-10">
          <form onSubmit={handleInitiateDonation} className="space-y-8">
            {/* Frequency Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#103D2B] font-bold mb-2">
                Donation Frequency
              </label>
              <div className="grid grid-cols-2 gap-3 p-1 bg-[#FAF7F0] rounded-xl border border-[#103D2B]/10">
                <button
                  type="button"
                  onClick={() => setFrequency('one-time')}
                  className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                    frequency === 'one-time'
                      ? 'bg-[#176B4D] text-white shadow-sm'
                      : 'text-[#202720]/75 hover:text-[#103D2B]'
                  }`}
                >
                  One-Time Gift
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                    frequency === 'monthly'
                      ? 'bg-[#176B4D] text-white shadow-sm'
                      : 'text-[#202720]/75 hover:text-[#103D2B]'
                  }`}
                >
                  Monthly Support
                </button>
              </div>
            </div>

            {/* Cause Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#103D2B] font-bold mb-2">
                Select Cause
              </label>
              <select
                value={activeCause}
                onChange={(e) => setActiveCause(e.target.value)}
                className="w-full py-3.5 px-4 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-xl text-sm font-medium text-[#202720] focus:outline-none focus:ring-2 focus:ring-[#176B4D]/30 focus:border-[#176B4D]"
              >
                {causes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} – {c.subtitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase tracking-wider text-[#103D2B] font-bold">
                  Choose Donation Amount (INR)
                </label>
                <span className="text-xs text-[#176B4D] font-medium">
                  {effectiveAmount ? `Selected: ₹${effectiveAmount.toLocaleString('en-IN')}` : ''}
                </span>
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handlePresetSelect(amt)}
                    className={`py-3.5 px-3 rounded-xl border text-sm font-bold tabular-nums transition-all ${
                      selectedAmount === amt && !customAmount
                        ? 'border-[#176B4D] bg-[#176B4D]/10 text-[#103D2B] ring-2 ring-[#176B4D]/20 shadow-sm'
                        : 'border-[#103D2B]/15 bg-white text-[#202720] hover:border-[#176B4D]/50'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Custom Amount Field */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#103D2B]">
                  ₹
                </span>
                <input
                  type="text"
                  placeholder="Enter other custom amount (e.g. 2100, 5000)"
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full pl-9 pr-4 py-3.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-xl text-sm font-semibold text-[#202720] placeholder-[#202720]/40 focus:outline-none focus:ring-2 focus:ring-[#176B4D]/30 focus:border-[#176B4D]"
                />
              </div>
            </div>

            {/* Donor Personal Information */}
            <div className="pt-4 border-t border-[#103D2B]/10 space-y-4">
              <h4 className="text-sm font-serif font-bold text-[#103D2B]">
                Donor Details (For 80G Tax Exemption Receipt)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#202720]/80 font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#202720]/80 font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#202720]/80 font-medium mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#202720]/80 font-medium mb-1 flex items-center justify-between">
                    <span>PAN Card Number (Optional)</span>
                    <span className="text-[11px] text-[#176B4D]">For 80G Tax Exemption</span>
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="ABCDE1234F"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] uppercase placeholder-normal focus:outline-none focus:border-[#176B4D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#202720]/80 font-medium mb-1">
                  Dedication or Special Prayer (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. In remembrance of parents, birthday blessings, gratitude"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                />
              </div>

              {/* WhatsApp / Email Updates Consent */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={consentUpdates}
                  onChange={(e) => setConsentUpdates(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#176B4D] focus:ring-[#176B4D]"
                />
                <label htmlFor="consentCheckbox" className="text-xs text-[#202720]/75 leading-relaxed cursor-pointer">
                  I agree to receive verified donation receipts, campaign updates, and impact reports via email/WhatsApp. We never share donor details with third parties.
                </label>
              </div>
            </div>

            {/* Error Display */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Primary Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-[#176B4D] hover:bg-[#103D2B] text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 border border-[#D6B46A]/30 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
              >
                <Heart className="w-5 h-5 text-[#D6B46A] fill-[#D6B46A]" />
                <span>
                  {isSubmitting
                    ? 'Preparing Secure Checkout...'
                    : `Proceed to Donate ₹${effectiveAmount ? effectiveAmount.toLocaleString('en-IN') : '0'}`}
                </span>
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="pt-4 border-t border-[#103D2B]/10 grid grid-cols-3 gap-2 text-center text-xs text-[#202720]/75">
              <div className="flex flex-col items-center gap-1">
                <Lock className="w-4 h-4 text-[#176B4D]" />
                <span className="font-semibold text-[#103D2B]">256-Bit SSL</span>
                <span className="text-[11px]">Bank-Grade Security</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#176B4D]" />
                <span className="font-semibold text-[#103D2B]">80G Tax Exemption</span>
                <span className="text-[11px]">Instant Receipt</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Sparkles className="w-4 h-4 text-[#176B4D]" />
                <span className="font-semibold text-[#103D2B]">100% Transparent</span>
                <span className="text-[11px]">Verified Direct Aid</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Official Payment Gateway Simulated Modal (Razorpay / PayU Test Mode) */}
      {showGatewayModal && pendingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden">
            {/* Gateway Header */}
            <div className="bg-[#103D2B] text-white p-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#D6B46A] font-semibold">
                  Secure Payment Gateway · Test Mode
                </p>
                <h3 className="text-lg font-serif font-bold text-white">
                  Faithful Friends Welfare
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-white/80">Order Amount</span>
                <p className="text-xl font-bold text-[#D6B46A] tabular-nums">
                  ₹{pendingOrder.amount.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Payment Details Body */}
            <div className="p-6 space-y-5">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-500">Order Ref:</span>
                  <span className="font-mono">{pendingOrder.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Selected Cause:</span>
                  <span className="font-medium text-[#103D2B]">{pendingOrder.causeTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Donor:</span>
                  <span>{pendingOrder.donor.name}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-2">
                  Select Test Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod('upi')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      activePaymentMethod === 'upi'
                        ? 'border-[#176B4D] bg-[#176B4D]/10 text-[#103D2B]'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod('card')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      activePaymentMethod === 'card'
                        ? 'border-[#176B4D] bg-[#176B4D]/10 text-[#103D2B]'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod('netbanking')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      activePaymentMethod === 'netbanking'
                        ? 'border-[#176B4D] bg-[#176B4D]/10 text-[#103D2B]'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Netbanking
                  </button>
                </div>
              </div>

              {/* Method specific presentation */}
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 text-center">
                {activePaymentMethod === 'upi' && (
                  <div className="space-y-2">
                    <p className="text-xs text-stone-600">Simulated UPI App Intent / QR</p>
                    <p className="text-xs font-mono font-bold text-[#103D2B]">faithfulfriends@sbi</p>
                    <p className="text-[11px] text-stone-500">Supports GPay, PhonePe, Paytm, BHIM</p>
                  </div>
                )}
                {activePaymentMethod === 'card' && (
                  <div className="space-y-1 text-xs text-stone-600">
                    <CreditCard className="w-5 h-5 mx-auto text-[#176B4D] mb-1" />
                    <p>Test Visa / Mastercard / Rupay Simulation</p>
                    <p className="text-[11px] text-stone-500">Auto-authorized sandbox environment</p>
                  </div>
                )}
                {activePaymentMethod === 'netbanking' && (
                  <div className="space-y-1 text-xs text-stone-600">
                    <p>HDFC · SBI · ICICI · Axis Bank</p>
                    <p className="text-[11px] text-stone-500">Instant test server authorization</p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleCompleteGatewayPayment('success')}
                  className="w-full py-3 px-4 bg-[#176B4D] hover:bg-[#103D2B] text-white rounded-xl text-sm font-bold shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4 text-[#D6B46A]" />
                  <span>{isSubmitting ? 'Verifying with Server...' : 'Authorize Test Payment (Success)'}</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleCompleteGatewayPayment('failure')}
                  className="w-full py-2 px-4 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors"
                >
                  Simulate Bank Decline / Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
