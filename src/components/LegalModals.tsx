import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { SystemSettings } from '../types';

interface LegalModalsProps {
  type: 'privacy' | 'terms' | 'refund' | 'tax80g' | null;
  onClose: () => void;
  settings: SystemSettings;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ type, onClose, settings }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F0] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#103D2B]/15 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#103D2B] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#D6B46A]" />
            <h3 className="font-serif font-bold text-lg text-white">
              {type === 'privacy' && 'Donor Privacy Policy'}
              {type === 'terms' && 'Terms and Conditions'}
              {type === 'refund' && 'Donation Refund & Cancellation Policy'}
              {type === 'tax80g' && 'Section 80G Tax Exemption Information'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#202720]/85 leading-relaxed">
          {type === 'privacy' && (
            <div className="space-y-4">
              <p className="font-semibold text-[#103D2B]">
                {settings.legalName} is committed to safeguarding your personal data and donor records.
              </p>
              <h4 className="font-bold text-[#103D2B]">1. Data Collected</h4>
              <p>
                We only collect information necessary to issue statutory 80G tax receipts and communicate
                verified project impact: donor name, email address, mobile number, mailing address, and
                Permanent Account Number (PAN) where provided for tax benefit verification.
              </p>
              <h4 className="font-bold text-[#103D2B]">2. Strict Non-Monetization</h4>
              <p>
                We never sell, rent, trade, or share donor contact information with any third-party marketing
                firms or commercial databases. Donor records are stored in secure, encrypted cloud repositories.
              </p>
              <h4 className="font-bold text-[#103D2B]">3. Payment Security</h4>
              <p>
                All digital transactions are processed through RBI-authorized payment gateways (Razorpay/PayU)
                via 256-bit encrypted connections. We never store debit/credit card numbers or banking passwords.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-4">
              <p className="font-semibold text-[#103D2B]">
                Welcome to the official portal of {settings.legalName}.
              </p>
              <h4 className="font-bold text-[#103D2B]">1. Voluntary Contributions</h4>
              <p>
                All donations made through this website are voluntary philanthropic contributions intended
                solely for non-profit charitable activities, including child nutrition, hunger alleviation,
                cow welfare, and community relief.
              </p>
              <h4 className="font-bold text-[#103D2B]">2. Receipt Issuance & Verification</h4>
              <p>
                A digitally signed official receipt is issued instantly upon successful payment confirmation.
                Donors must ensure that their PAN details are submitted accurately if claiming 80G deduction
                in their income tax returns.
              </p>
              <h4 className="font-bold text-[#103D2B]">3. Governing Jurisdiction</h4>
              <p>
                Any legal dispute arising from transactions on this platform shall be subject exclusively to
                the jurisdiction of courts in New Delhi, India.
              </p>
            </div>
          )}

          {type === 'refund' && (
            <div className="space-y-4">
              <p className="font-semibold text-[#103D2B]">
                Donation Refund & Cancellation Guidelines
              </p>
              <p>
                As a charitable organization utilizing donations for daily food preparation and animal feeding,
                donations are generally considered non-refundable once deployed into procurement.
              </p>
              <h4 className="font-bold text-[#103D2B]">Accidental or Duplicate Donations:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  If a duplicate debit occurs due to a technical glitch, or if an erroneous amount was entered,
                  please write to us at <span className="font-mono text-[#103D2B]">{settings.contactEmail}</span> within
                  7 days of the transaction.
                </li>
                <li>
                  Please attach your payment transaction reference, banking debit proof, and registered mobile number.
                </li>
                <li>
                  Upon verification by our accounts team, authenticated refunds will be processed back to the original
                  payment source within 7–10 business days through the payment gateway.
                </li>
              </ul>
            </div>
          )}

          {type === 'tax80g' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950">
                <span className="font-bold block text-sm mb-1">
                  50% Tax Deduction under Section 80G
                </span>
                <p className="text-xs">
                  Donations made to Faithful Friends Welfare Society are eligible for deduction under Section 80G
                  of the Income Tax Act, 1961.
                </p>
              </div>

              <div className="space-y-2 bg-white p-4 rounded-xl border border-[#103D2B]/10">
                <p><span className="font-semibold text-[#103D2B]">Legal Name:</span> {settings.legalName}</p>
                <p><span className="font-semibold text-[#103D2B]">Society Reg No:</span> {settings.registrationNumber}</p>
                <p><span className="font-semibold text-[#103D2B]">80G Unique Reg No (URN):</span> <span className="font-mono">{settings.section80G}</span></p>
                <p><span className="font-semibold text-[#103D2B]">12A Unique Reg No (URN):</span> <span className="font-mono">{settings.section12A}</span></p>
              </div>

              <h4 className="font-bold text-[#103D2B]">How to Claim 80G in Your ITR:</h4>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>Provide your PAN during donation so that your contribution is mapped in the annual Form 10BD return.</li>
                <li>Download your instant Form 10BE compliant receipt.</li>
                <li>Report the donation amount under 'Deductions under Section 80G' when filing your Income Tax Return.</li>
              </ol>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#103D2B]/10 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#176B4D] hover:bg-[#103D2B] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
};
