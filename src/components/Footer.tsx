import React from 'react';
import { Heart, ShieldCheck, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { SystemSettings } from '../types';

interface FooterProps {
  settings: SystemSettings;
  onDonateClick: () => void;
  onAdminClick: () => void;
  onOpenLegalModal: (type: 'privacy' | 'terms' | 'refund' | 'tax80g') => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onDonateClick,
  onAdminClick,
  onOpenLegalModal,
}) => {
  return (
    <footer id="contact" className="bg-[#103D2B] text-white pt-16 pb-12 border-t border-[#D6B46A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand & Mission Statement (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
              Faithful Friends Welfare
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#D6B46A] font-semibold">
              Faithful Friends Welfare Society · Reg. No: {settings.registrationNumber}
            </p>
            <p className="text-sm text-[#FAF7F0]/80 leading-relaxed max-w-md">
              A registered non-profit welfare organisation dedicated to distributing wholesome meals
              to underprivileged children, feeding the hungry, protecting indigenous cows, and conducting
              direct community relief across India.
            </p>

            <div className="pt-2">
              <button
                onClick={onDonateClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#176B4D] hover:bg-[#14532D] text-white rounded-lg text-xs font-semibold shadow transition-all border border-[#D6B46A]/40 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#D6B46A] fill-[#D6B46A]" />
                <span>Make a Tax-Deductible Donation</span>
              </button>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#D6B46A] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF7F0]/80">
              <li>
                <a href="#mission" className="hover:text-white transition-colors">
                  Our Mission & Ethos
                </a>
              </li>
              <li>
                <a href="#causes" className="hover:text-white transition-colors">
                  Verified Causes
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-white transition-colors">
                  Audited Impact Dashboard
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:text-white transition-colors">
                  Stories of Change
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Photo Documentation
                </a>
              </li>
              <li>
                <a href="#volunteer" className="hover:text-white transition-colors">
                  Volunteer & CSR Partnerships
                </a>
              </li>
              <li>
                <a href="#transparency" className="hover:text-white transition-colors">
                  Statutory Transparency
                </a>
              </li>
            </ul>
          </div>

          {/* Official Registered Office & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#D6B46A] font-bold">
              Registered Head Office
            </h4>

            <div className="text-xs text-[#FAF7F0]/85 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6B46A] shrink-0 mt-0.5" />
                <span>{settings.officeAddress}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D6B46A] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white underline">
                  {settings.contactEmail}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6B46A] shrink-0" />
                <span>{settings.contactPhone}</span>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#D6B46A] shrink-0" />
                <span>Section 80G Approval: {settings.section80G}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F0]/70">
          <p>
            © {new Date().getFullYear()} {settings.legalName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegalModal('refund')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegalModal('tax80g')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              80G Tax Exemption
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onAdminClick}
              className="inline-flex items-center gap-1 text-[#D6B46A] hover:underline cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Access</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
