import React, { useEffect, useRef } from 'react';
import { X, Printer, Download, CheckCircle, ShieldCheck, Heart, Share2 } from 'lucide-react';
import { DonationRecord } from '../types';

interface ReceiptModalProps {
  donation: DonationRecord | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ donation, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!donation) return;

    // Small celebratory confetti burst on canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#176B4D', '#D6B46A', '#103D2B', '#E5C07B', '#FFFFFF'];
    const particles = Array.from({ length: 60 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 3,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.7) * 12,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 10
    }));

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          active = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (active) {
        frame = requestAnimationFrame(animate);
      }
    };
    animate();

    return () => cancelAnimationFrame(frame);
  }, [donation]);

  if (!donation) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const textContent = `
============================================================
           FAITHFUL FRIENDS WELFARE SOCIETY
    OFFICIAL DONATION RECEIPT & 80G TAX CERTIFICATE
============================================================
Receipt Number: ${donation.receiptNumber}
Date of Issue:  ${new Date(donation.createdAt).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })}
Payment Ref:    ${donation.paymentId}
Order Ref:      ${donation.orderId}
------------------------------------------------------------
DONOR DETAILS:
Full Name:      ${donation.donorName}
Email:          ${donation.donorEmail}
Mobile:         ${donation.donorPhone}
PAN Card:       ${donation.panNumber || 'Not Provided (General Receipt)'}
------------------------------------------------------------
CONTRIBUTION SUMMARY:
Amount (INR):   ₹${donation.amount.toLocaleString('en-IN')}
Allocated To:   ${donation.causeTitle}
Frequency:      ${donation.frequency}
------------------------------------------------------------
STATUTORY COMPLIANCE:
Society Reg No: FFWS/2021/DEL/7841
NITI Aayog UID: DL/2021/0284721
80G Exemption:  AAATF1289RF20214
12A Exemption:  AAATF1289RE20212

Registered Office:
Plot 14-B, Institutional Area, Sector 5, Rohini, New Delhi - 110085
Email: contact@faithfulfriendswelfare.org
============================================================
Thank you for your noble generosity. Small acts of kindness
make a world of difference.
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FFW_Receipt_${donation.receiptNumber.replace(/\//g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-10"
      />

      <div className="relative z-20 bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 my-8 overflow-hidden">
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="print:hidden bg-[#103D2B] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#D6B46A]" />
            <span className="font-semibold text-sm">Donation Successfully Verified</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg ml-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div className="p-6 sm:p-10 space-y-6 text-[#202720]">
          {/* Header & Letterhead */}
          <div className="border-b-2 border-[#103D2B] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#103D2B] tracking-tight">
                Faithful Friends Welfare
              </h2>
              <p className="text-xs text-[#202720]/75 font-medium mt-0.5">
                Faithful Friends Welfare Society · Reg. No: FFWS/2021/DEL/7841
              </p>
              <p className="text-[11px] text-[#202720]/60">
                NITI Aayog Darpan UID: DL/2021/0284721 · Sector 5, Rohini, New Delhi
              </p>
            </div>

            <div className="sm:text-right bg-[#FAF7F0] p-3 rounded-xl border border-[#103D2B]/10">
              <span className="text-[10px] uppercase tracking-wider text-[#176B4D] font-bold block">
                Official 80G Receipt
              </span>
              <p className="text-sm font-mono font-bold text-[#103D2B]">
                {donation.receiptNumber}
              </p>
              <p className="text-[11px] text-[#202720]/70">
                Date: {new Date(donation.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Tax Exemption Banner */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#176B4D] shrink-0" />
              <span className="text-emerald-950 font-medium">
                Eligible for 50% Tax Deduction under Section 80G of Income Tax Act 1961
              </span>
            </div>
            <span className="font-mono text-emerald-900 font-semibold text-[11px]">
              URN: AAATF1289RF20214
            </span>
          </div>

          {/* Donor & Contribution Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-[#103D2B] font-bold">
                Donor Information
              </p>
              <div className="space-y-1 bg-[#FAF7F0] p-3.5 rounded-lg border border-[#103D2B]/10">
                <p>
                  <span className="text-stone-500">Name:</span>{' '}
                  <span className="font-semibold text-[#103D2B]">{donation.donorName}</span>
                </p>
                <p>
                  <span className="text-stone-500">Email:</span> {donation.donorEmail}
                </p>
                <p>
                  <span className="text-stone-500">Mobile:</span> {donation.donorPhone}
                </p>
                <p>
                  <span className="text-stone-500">PAN:</span>{' '}
                  <span className="font-mono font-semibold">
                    {donation.panNumber || 'Not Provided'}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-[#103D2B] font-bold">
                Payment Verification
              </p>
              <div className="space-y-1 bg-[#FAF7F0] p-3.5 rounded-lg border border-[#103D2B]/10">
                <p>
                  <span className="text-stone-500">Payment ID:</span>{' '}
                  <span className="font-mono text-xs">{donation.paymentId}</span>
                </p>
                <p>
                  <span className="text-stone-500">Order ID:</span>{' '}
                  <span className="font-mono text-xs">{donation.orderId}</span>
                </p>
                <p>
                  <span className="text-stone-500">Status:</span>{' '}
                  <span className="font-semibold text-[#176B4D]">Verified (Digital Settlement)</span>
                </p>
                <p>
                  <span className="text-stone-500">Mode:</span> {donation.frequency === 'monthly' ? 'Monthly Mandate' : 'One-Time Payment'}
                </p>
              </div>
            </div>
          </div>

          {/* Amount Box */}
          <div className="p-4 bg-[#FAF7F0] rounded-xl border-2 border-[#103D2B]/20 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#103D2B] font-bold">
                Contribution To: {donation.causeTitle}
              </p>
              {donation.message && (
                <p className="text-xs italic text-stone-600 mt-1">
                  “{donation.message}”
                </p>
              )}
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-500 block">Total Amount Received</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#103D2B] tabular-nums">
                ₹{donation.amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 border-t border-stone-200 flex justify-between items-end text-xs text-stone-600">
            <div>
              <p className="text-[11px] text-stone-500">
                This is a computer-generated, digitally verified receipt.
              </p>
              <p className="text-[11px] text-stone-500">
                Form 10BE filing will be completed in annual statutory return.
              </p>
            </div>

            <div className="text-center">
              <div className="font-serif italic text-base text-[#103D2B] font-bold border-b border-stone-400 pb-1 mb-1">
                Authorized Signatory
              </div>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block">
                Faithful Friends Welfare Society
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar for User (Hidden in Print) */}
        <div className="print:hidden p-4 bg-[#FAF7F0] border-t border-stone-200 flex items-center justify-between">
          <p className="text-xs text-stone-600">
            A confirmation copy has been queued for {donation.donorEmail}.
          </p>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#103D2B] hover:bg-[#176B4D] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
