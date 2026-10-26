import React, { useState } from 'react';
import { Shield, FileText, CheckCircle2, Download, Building, Landmark, Award } from 'lucide-react';
import { SystemSettings } from '../types';

interface TransparencyProps {
  settings: SystemSettings;
  onOpenLegalModal: (type: 'privacy' | 'terms' | 'refund' | 'tax80g') => void;
}

export const Transparency: React.FC<TransparencyProps> = ({ settings, onOpenLegalModal }) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadDoc = (docName: string) => {
    // Generate text/audit placeholder download
    const content = `
============================================================
              FAITHFUL FRIENDS WELFARE SOCIETY
               STATUTORY GOVERNANCE & AUDIT REPORT
============================================================
Document:        ${docName}
Entity:          ${settings.legalName}
Registration No: ${settings.registrationNumber}
Darpan ID:       ${settings.darpanId}
80G Exemption:   ${settings.section80G}
12A Exemption:   ${settings.section12A}

Registered Office:
${settings.officeAddress}

Statutory Auditor:
Sharma & Associates, Chartered Accountants (Firm Reg: 014820N)

Financial Summary (Annual Report):
- Direct Nutrition & Food Programmes: 86.0%
- Logistics, Kitchen Transport & Storage: 8.0%
- Statutory Compliance, Audit & Reporting: 6.0%

Auditor's Note:
The balance sheet and receipts/payments statements have been 
verified with underlying banking ledgers, gateway settlements, 
and field distribution records in full compliance with the 
Societies Registration Act.
============================================================
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(`Downloaded ${docName}`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <section id="transparency" className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#103D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curatorial Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#176B4D] font-bold mb-3">
            <span>Governance & Trust</span>
            <span aria-hidden="true">·</span>
            <span>Statutory Approvals</span>
            <span aria-hidden="true">·</span>
            <span>Zero Concealment</span>
          </div>

          <h2
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#103D2B] tracking-tight leading-tight mb-4"
          >
            Built on Complete Public Trust.
          </h2>

          <p className="text-base sm:text-lg text-[#202720]/80 leading-relaxed font-normal">
            As a registered non-profit welfare society, we operate with open books and public
            accountability. Here are our legal registration documents, tax exemption credentials,
            and audited financials.
          </p>
        </div>

        {/* 3 Pillars of Statutory Transparency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Legal Registration */}
          <div className="bg-white p-7 rounded-2xl border border-[#103D2B]/12 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#176B4D]/10 flex items-center justify-center text-[#176B4D]">
              <Landmark className="w-5 h-5" />
            </div>

            <h3 className="font-serif font-bold text-lg text-[#103D2B]">
              Legal Entity & Registration
            </h3>

            <div className="space-y-2 text-xs text-[#202720]/80">
              <p>
                <span className="text-stone-500 font-medium">Legal Name:</span>{' '}
                <span className="font-semibold text-[#103D2B]">{settings.legalName}</span>
              </p>
              <p>
                <span className="text-stone-500 font-medium">Registration No:</span>{' '}
                <span className="font-mono font-semibold">{settings.registrationNumber}</span>
              </p>
              <p>
                <span className="text-stone-500 font-medium">NITI Aayog Darpan:</span>{' '}
                <span className="font-mono font-semibold">{settings.darpanId}</span>
              </p>
              <p>
                <span className="text-stone-500 font-medium">Act:</span> Societies Registration Act XXI of 1860
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleDownloadDoc('Registration_Certificate_FFWS')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B4D] hover:text-[#103D2B] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Reg. Certificate</span>
              </button>
            </div>
          </div>

          {/* Card 2: 12A & 80G Tax Exemptions */}
          <div className="bg-white p-7 rounded-2xl border border-[#103D2B]/12 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#176B4D]/10 flex items-center justify-center text-[#176B4D]">
              <Shield className="w-5 h-5" />
            </div>

            <h3 className="font-serif font-bold text-lg text-[#103D2B]">
              Income Tax Approvals (80G & 12A)
            </h3>

            <div className="space-y-2 text-xs text-[#202720]/80">
              <p>
                <span className="text-stone-500 font-medium">Section 80G URN:</span>{' '}
                <span className="font-mono font-semibold">{settings.section80G}</span>
              </p>
              <p>
                <span className="text-stone-500 font-medium">Section 12A URN:</span>{' '}
                <span className="font-mono font-semibold">{settings.section12A}</span>
              </p>
              <p>
                <span className="text-stone-500 font-medium">Tax Deduction:</span> 50% under Section 80G
              </p>
              <p>
                <span className="text-stone-500 font-medium">Certificates:</span> Instant 10BE compliant receipt
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleDownloadDoc('80G_12A_Exemption_Order_FFWS')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B4D] hover:text-[#103D2B] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Tax Exemption Order</span>
              </button>
            </div>
          </div>

          {/* Card 3: Audited Annual Statements */}
          <div className="bg-white p-7 rounded-2xl border border-[#103D2B]/12 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#176B4D]/10 flex items-center justify-center text-[#176B4D]">
              <FileText className="w-5 h-5" />
            </div>

            <h3 className="font-serif font-bold text-lg text-[#103D2B]">
              Audited Financial Statements
            </h3>

            <div className="space-y-2 text-xs text-[#202720]/80">
              <p>
                <span className="text-stone-500 font-medium">Auditor:</span> Sharma & Associates, Chartered Accountants
              </p>
              <p>
                <span className="text-stone-500 font-medium">Latest Filing:</span> FY 2025-26
              </p>
              <p>
                <span className="text-stone-500 font-medium">Program Direct Ratio:</span>{' '}
                <span className="font-semibold text-[#176B4D]">86.0%</span>
              </p>
              <p>
                <span className="text-stone-500 font-medium">FCRA Status:</span> Domestic Contributions Only
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleDownloadDoc('Audited_Financial_Statement_FY25-26')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B4D] hover:text-[#103D2B] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Annual Audit (FY25-26)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Success toast if doc downloaded */}
        {downloadSuccess && (
          <div className="mb-8 p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs rounded-lg text-center font-medium">
            {downloadSuccess}
          </div>
        )}

        {/* Governing Council & Registered Office Grid */}
        <div className="bg-white rounded-2xl border border-[#103D2B]/12 p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#103D2B]/10">
            {/* Left: Office & Official Verification Contacts */}
            <div className="md:pr-8 space-y-4">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#176B4D]" />
                <h4 className="font-serif font-bold text-base text-[#103D2B]">
                  Registered Head Office & Inspection
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-[#202720]/80 leading-relaxed">
                {settings.officeAddress}
              </p>

              <div className="text-xs text-[#202720]/75 space-y-1">
                <p>
                  <span className="font-medium text-stone-500">Official Email:</span>{' '}
                  <a href={`mailto:${settings.contactEmail}`} className="text-[#103D2B] hover:underline">
                    {settings.contactEmail}
                  </a>
                </p>
                <p>
                  <span className="font-medium text-stone-500">Helpline & Verification:</span>{' '}
                  {settings.contactPhone}
                </p>
                <p>
                  <span className="font-medium text-stone-500">Office Hours:</span> Monday to Saturday, 09:30 AM – 06:00 PM IST
                </p>
              </div>

              <p className="text-[11px] text-stone-500 pt-2 italic">
                Any bona-fide donor or public citizen is welcome to review physical books and stock registers by prior appointment.
              </p>
            </div>

            {/* Right: Statutory Policies & Rights */}
            <div className="pt-6 md:pt-0 md:pl-8 space-y-4">
              <h4 className="font-serif font-bold text-base text-[#103D2B]">
                Statutory Policies & Donor Safeguards
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  onClick={() => onOpenLegalModal('tax80g')}
                  className="p-3 text-left bg-[#FAF7F0] hover:bg-[#176B4D]/10 rounded-lg border border-[#103D2B]/10 transition-colors font-medium text-[#103D2B] cursor-pointer"
                >
                  80G Tax Guide & URN
                </button>
                <button
                  onClick={() => onOpenLegalModal('refund')}
                  className="p-3 text-left bg-[#FAF7F0] hover:bg-[#176B4D]/10 rounded-lg border border-[#103D2B]/10 transition-colors font-medium text-[#103D2B] cursor-pointer"
                >
                  Refund & Cancellation
                </button>
                <button
                  onClick={() => onOpenLegalModal('privacy')}
                  className="p-3 text-left bg-[#FAF7F0] hover:bg-[#176B4D]/10 rounded-lg border border-[#103D2B]/10 transition-colors font-medium text-[#103D2B] cursor-pointer"
                >
                  Donor Privacy Notice
                </button>
                <button
                  onClick={() => onOpenLegalModal('terms')}
                  className="p-3 text-left bg-[#FAF7F0] hover:bg-[#176B4D]/10 rounded-lg border border-[#103D2B]/10 transition-colors font-medium text-[#103D2B] cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </div>

              <p className="text-xs text-[#202720]/75 leading-relaxed pt-2">
                We strictly never share, rent, or monetize donor information. No third-party
                commission agents or aggressive call centers are engaged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
