import React, { useState, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  Building,
  Smartphone,
  CreditCard,
  Heart,
  Sparkles,
  ExternalLink,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { Cause, DonationRecord } from '../types';

interface UpiQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  causes: Cause[];
  selectedCauseId?: string;
  onDonationVerified: (donation: DonationRecord) => void;
  initialAmount?: number;
}

export const UpiQrModal: React.FC<UpiQrModalProps> = ({
  isOpen,
  onClose,
  causes,
  selectedCauseId = 'feed-child',
  onDonationVerified,
  initialAmount = 501,
}) => {
  const [amount, setAmount] = useState<number | string>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCause, setSelectedCause] = useState<string>(selectedCauseId);
  const [isCopied, setIsCopied] = useState(false);
  const [qrHighlighted, setQrHighlighted] = useState(false);

  // Verification & 80G Receipt form state
  const [showProofForm, setShowProofForm] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmittingProof, setIsSubmittingProof] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const qrContainerRef = useRef<HTMLDivElement | null>(null);

  const presetAmounts = [101, 251, 501, 1001, 2100, 5000];
  const upiNumber = '8595555318';
  const merchantName = 'FAITHFUL FRIENDS WELFARE TRUST';
  const bankName = 'ICICI Bank';

  // Synchronize when modal opens
  React.useEffect(() => {
    if (selectedCauseId) {
      setSelectedCause(selectedCauseId);
    }
  }, [selectedCauseId]);

  if (!isOpen) return null;

  const effectiveAmount = customAmount ? Number(customAmount) : (typeof amount === 'number' ? amount : 501);

  const handleCopyUpiNumber = () => {
    navigator.clipboard.writeText(upiNumber).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  const handleScanQrAndPay = () => {
    setQrHighlighted(true);
    if (qrContainerRef.current) {
      qrContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      setQrHighlighted(false);
    }, 2000);
  };

  const handlePresetClick = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    setAmount(val ? Number(val) : '');
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!effectiveAmount || effectiveAmount < 1) {
      setFormError('Please enter a valid donation amount.');
      return;
    }
    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      setFormError('Please enter your 12-digit UPI Transaction Reference / UTR Number from your UPI app receipt.');
      return;
    }
    if (!donorName.trim()) {
      setFormError('Please enter your full name as registered on official records.');
      return;
    }
    const cleanPhone = donorPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (panNumber.trim() && panNumber.trim().length !== 10) {
      setFormError('PAN must be 10 characters (e.g. ABCDE1234F).');
      return;
    }

    setIsSubmittingProof(true);

    try {
      const response = await fetch('/api/donations/submit-upi-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount,
          causeId: selectedCause,
          utrNumber: utrNumber.trim(),
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim(),
          donorPhone: cleanPhone,
          panNumber: panNumber ? panNumber.trim().toUpperCase() : undefined,
          message: message.trim() || 'Direct ICICI Bank UPI Contribution'
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit payment details.');
      }

      setIsSubmittingProof(false);
      onClose();
      // Notify parent to open official 80G receipt
      onDonationVerified(data.donation);
    } catch (err: any) {
      setIsSubmittingProof(false);
      setFormError(err.message || 'Error reconciling UPI payment. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container: White background with royal blue (#003366) and golden (#D6B46A) accents */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#D6B46A]/30 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header Bar */}
        <div className="relative bg-gradient-to-r from-[#003366] via-[#0B4A82] to-[#103D2B] text-white px-6 py-5 flex items-center justify-between border-b-2 border-[#D6B46A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#D6B46A]/50 flex items-center justify-center shadow-inner">
              <QrCode className="w-5 h-5 text-[#D6B46A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6B46A]">
                  ICICI Bank Direct UPI Gateway
                </span>
                <span className="bg-[#D6B46A]/20 text-[#FAF7F0] text-[10px] px-2 py-0.5 rounded-full font-semibold border border-[#D6B46A]/40">
                  80G Certified
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                Donate via ICICI Bank UPI QR
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close UPI payment dialog"
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D6B46A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Friendly Greeting Banner */}
        <div className="bg-[#FAF7F0] border-b border-[#003366]/10 px-6 py-3 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs sm:text-sm text-[#003366] font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D6B46A] shrink-0" />
            <span>
              Your contribution helps us make a meaningful difference. Thank you for supporting{' '}
              <strong className="font-bold text-[#103D2B]">Faithful Friends Welfare Trust</strong>.
            </span>
          </p>
          <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-semibold text-[#176B4D]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Platform Fees</span>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Amount Selection Section */}
          <div className="bg-[#FAF7F0]/60 p-4 sm:p-5 rounded-2xl border border-[#003366]/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <label className="text-xs uppercase tracking-wider font-bold text-[#003366]">
                Step 1: Choose or Enter Donation Amount
              </label>
              <div className="text-xs font-semibold text-[#103D2B]">
                Amount to Pay:{' '}
                <span className="text-base font-bold text-[#003366] tabular-nums">
                  ₹{effectiveAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Preset Amount Chips */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePresetClick(amt)}
                  className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold tabular-nums transition-all ${
                    amount === amt && !customAmount
                      ? 'bg-[#003366] text-white shadow-md ring-2 ring-[#D6B46A] border-transparent'
                      : 'bg-white text-[#202720] border border-[#003366]/15 hover:border-[#003366]/40 hover:bg-stone-50'
                  }`}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            {/* Custom Amount Input and Cause Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#003366] text-sm">
                  ₹
                </span>
                <input
                  type="text"
                  placeholder="Enter other custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full pl-8 pr-3 py-2.5 bg-white border border-[#003366]/20 rounded-xl text-sm font-semibold text-[#003366] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#003366]/30 focus:border-[#003366]"
                />
              </div>

              <div>
                <select
                  value={selectedCause}
                  onChange={(e) => setSelectedCause(e.target.value)}
                  className="w-full py-2.5 px-3 bg-white border border-[#003366]/20 rounded-xl text-xs sm:text-sm font-medium text-[#202720] focus:outline-none focus:ring-2 focus:ring-[#003366]/30 focus:border-[#003366]"
                >
                  {causes.map((c) => (
                    <option key={c.id} value={c.id}>
                      Cause: {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Core Payment Grid: Left = Exact QR poster; Right = Payment Details & Instructions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Official ICICI Bank UPI QR Code (6 cols) */}
            <div
              ref={qrContainerRef}
              className={`lg:col-span-6 bg-white rounded-2xl border-2 transition-all p-3 sm:p-4 text-center flex flex-col items-center justify-between shadow-lg ${
                qrHighlighted
                  ? 'border-[#D6B46A] ring-4 ring-[#D6B46A]/40 scale-[1.01]'
                  : 'border-[#003366]/20 hover:border-[#003366]/40'
              }`}
            >
              {/* Security Header Badge */}
              <div className="w-full pb-2 mb-2 border-b border-stone-100 flex items-center justify-between text-[11px] text-[#003366] font-semibold">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[#003366]" /> Official ICICI Eazypay QR
                </span>
                <span className="text-[#176B4D] font-bold">100% Direct Account Credit</span>
              </div>

              {/* Exact Uncropped, Undistorted QR Poster as provided */}
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto rounded-xl overflow-hidden border border-stone-200 bg-white shadow-inner flex items-center justify-center">
                <img
                  src="/assets/images/icici_upi_qr.jpeg"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.includes('src/assets')) {
                      target.src = '/src/assets/images/icici_upi_qr.jpeg';
                    }
                  }}
                  alt="ICICI Bank Official UPI QR Code - Faithful Friends Welfare Trust"
                  className="w-full h-auto object-contain block select-none"
                  style={{ maxHeight: '460px' }}
                />
              </div>

              {/* Supported UPI Apps Row */}
              <div className="w-full mt-3 pt-3 border-t border-stone-100">
                <p className="text-[11px] text-stone-500 font-medium mb-1.5">
                  Scan using any UPI App on your phone:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-semibold text-stone-700">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded border border-blue-200">
                    Google Pay
                  </span>
                  <span className="px-2 py-0.5 bg-purple-50 text-purple-800 rounded border border-purple-200">
                    PhonePe
                  </span>
                  <span className="px-2 py-0.5 bg-sky-50 text-sky-800 rounded border border-sky-200">
                    Paytm
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                    BHIM
                  </span>
                  <span className="px-2 py-0.5 bg-orange-50 text-orange-800 rounded border border-orange-200">
                    iMobile
                  </span>
                  <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded border border-stone-200">
                    CRED
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Payment Details & Quick Action Buttons (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Payment Details Card */}
              <div className="bg-white rounded-2xl border border-[#003366]/20 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-[#003366]">
                    Verified Payment Details
                  </h3>
                  <span className="text-[10px] font-bold text-[#176B4D] bg-[#176B4D]/10 px-2 py-0.5 rounded">
                    ICICI Bank Trust Account
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  {/* Merchant Name */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 bg-[#FAF7F0] rounded-lg">
                    <span className="text-stone-500 font-medium text-xs">Merchant Name:</span>
                    <span className="font-bold text-[#003366] text-right font-mono text-xs sm:text-sm">
                      {merchantName}
                    </span>
                  </div>

                  {/* Mobile Number & Copy */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 bg-[#FAF7F0] rounded-lg">
                    <span className="text-stone-500 font-medium text-xs">Mobile Number:</span>
                    <div className="flex items-center justify-between sm:justify-end gap-2">
                      <span className="font-bold text-[#003366] font-mono text-sm sm:text-base">
                        {upiNumber}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="flex items-center justify-between p-2 bg-[#FAF7F0] rounded-lg">
                    <span className="text-stone-500 font-medium text-xs">Payment Method:</span>
                    <span className="font-bold text-[#003366]">UPI (Unified Payments Interface)</span>
                  </div>

                  {/* Bank */}
                  <div className="flex items-center justify-between p-2 bg-[#FAF7F0] rounded-lg">
                    <span className="text-stone-500 font-medium text-xs">Bank:</span>
                    <span className="font-bold text-[#003366]">{bankName}</span>
                  </div>
                </div>

                {/* Primary Action Buttons: Scan QR & Pay + Copy UPI Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleScanQrAndPay}
                    className="w-full py-3 px-3 bg-[#003366] hover:bg-[#08294A] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-[#D6B46A]/50 active:scale-[0.98] cursor-pointer"
                  >
                    <QrCode className="w-4 h-4 text-[#D6B46A]" />
                    <span>Scan QR & Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyUpiNumber}
                    className={`w-full py-3 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-white hover:bg-[#FAF7F0] text-[#003366] border-[#003366]/30 shadow-sm'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied: {upiNumber}!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#D6B46A]" />
                        <span>Copy UPI Number</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 4-Step Payment Instructions Section */}
              <div className="bg-[#FAF7F0] rounded-2xl border border-[#D6B46A]/40 p-4 sm:p-5">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#003366] mb-3 flex items-center gap-1.5">
                  <span>How to Pay via UPI in 4 Simple Steps</span>
                </h4>

                <ol className="space-y-2 text-xs sm:text-sm text-[#202720]/85">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      <strong className="text-[#003366]">Step 1:</strong> Enter your donation amount{' '}
                      (e.g. ₹{effectiveAmount.toLocaleString('en-IN')}).
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      <strong className="text-[#003366]">Step 2:</strong> Scan the displayed QR code
                      using your UPI application (Google Pay, PhonePe, Paytm, BHIM).
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      <strong className="text-[#003366]">Step 3:</strong> Complete the payment in
                      your UPI app.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#176B4D] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      4
                    </span>
                    <span>
                      <strong className="text-[#176B4D]">Step 4:</strong> Thank you for supporting
                      our NGO!
                    </span>
                  </li>
                </ol>
              </div>

              {/* 80G Receipt & Verification Toggle Card */}
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl border border-blue-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-[#003366]">Completed your UPI payment?</p>
                    <p className="text-[11px] text-stone-600">
                      Submit your 12-digit UPI reference (UTR) for an instant 80G receipt.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowProofForm(!showProofForm)}
                    className="px-3 py-1.5 bg-[#003366] hover:bg-[#103D2B] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1 shrink-0"
                  >
                    <span>{showProofForm ? 'Hide Form' : 'Get 80G Receipt'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Verification & 80G Tax Receipt Submission Section */}
          {showProofForm && (
            <div className="mt-6 bg-white rounded-2xl border-2 border-[#D6B46A]/60 p-5 sm:p-6 shadow-md animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
                <div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-[#003366]">
                    Submit UPI Reference & Generate 80G Tax Exemption Receipt
                  </h3>
                  <p className="text-xs text-stone-500">
                    All contributions are reconciled with ICICI Bank ledger before the certificate is finalized.
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-[#D6B46A]/20 text-[#003366] rounded-md font-bold text-[11px] border border-[#D6B46A]/40">
                  Sec 80G
                </span>
              </div>

              <form onSubmit={handleSubmitProof} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* UTR / Transaction Reference Number */}
                  <div>
                    <label className="block text-xs font-bold text-[#003366] mb-1">
                      UPI Ref ID / UTR Number (12 digits) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 430291827461"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value.replace(/[^0-9a-zA-Z]/g, ''))}
                      className="w-full px-3.5 py-2 bg-[#FAF7F0] border border-[#003366]/20 rounded-lg text-sm font-mono text-[#003366] focus:outline-none focus:ring-2 focus:ring-[#003366]/30 focus:border-[#003366]"
                    />
                    <span className="text-[10px] text-stone-500 mt-0.5 block">
                      Found in your GPay / PhonePe / Paytm payment receipt details.
                    </span>
                  </div>

                  {/* Donor Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#003366] mb-1">
                      Donor Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name as on PAN / Aadhaar"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#FAF7F0] border border-[#003366]/20 rounded-lg text-sm text-[#202720] focus:outline-none focus:ring-2 focus:ring-[#003366]/30 focus:border-[#003366]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-[#003366] mb-1">
                      Donor Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#FAF7F0] border border-[#003366]/20 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#003366]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#003366] mb-1">
                      Email (To receive receipt)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#FAF7F0] border border-[#003366]/20 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#003366]"
                    />
                  </div>

                  {/* PAN Card */}
                  <div>
                    <label className="block text-xs font-bold text-[#003366] mb-1 flex items-center justify-between">
                      <span>PAN Number</span>
                      <span className="text-[10px] text-[#176B4D]">80G Benefit</span>
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="ABCDE1234F"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2 bg-[#FAF7F0] border border-[#003366]/20 rounded-lg text-sm uppercase text-[#202720] focus:outline-none focus:border-[#003366]"
                    />
                  </div>
                </div>

                {/* Optional Message */}
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Special Dedication / Note (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. In honor of parents, birthday blessings, festival anna daan"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#FAF7F0] border border-[#003366]/20 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#003366]"
                  />
                </div>

                {/* Important Verification Disclaimer */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Payment verification disclosure:</strong> All direct UPI payments undergo
                    reconciliation against our ICICI Bank current account ledger. Submitting your UTR
                    allows instant generation of your verified Section 80G tax receipt.
                  </span>
                </div>

                {/* Form Error */}
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Submit Verification Button */}
                <button
                  type="submit"
                  disabled={isSubmittingProof}
                  className="w-full py-3.5 px-6 bg-[#003366] hover:bg-[#103D2B] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-[#D6B46A]/40 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-[#D6B46A] fill-[#D6B46A]" />
                  <span>
                    {isSubmittingProof
                      ? 'Reconciling with ICICI Bank Ledger...'
                      : `Submit UPI Reference & Generate 80G Receipt (₹${effectiveAmount.toLocaleString('en-IN')})`}
                  </span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Modal Footer / Statutory Assurances */}
        <div className="bg-[#FAF7F0] border-t border-stone-200 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#003366]">ICICI Bank Merchant ID:</span>
            <span className="font-mono text-stone-700">8595555318</span>
            <span>·</span>
            <span className="text-[#176B4D] font-medium">Income Tax 80G Approved</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleCopyUpiNumber}
              className="px-3 py-1.5 bg-white border border-[#003366]/30 text-[#003366] hover:bg-stone-50 rounded-lg text-xs font-bold transition-colors"
            >
              {isCopied ? 'UPI Copied' : 'Copy 8595555318'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
