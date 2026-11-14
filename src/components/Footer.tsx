import React from 'react';
import { Heart, ShieldCheck, Mail, Phone, MapPin, Lock, Instagram, Facebook, Youtube } from 'lucide-react';
import { SystemSettings } from '../types';

interface FooterProps {
  settings: SystemSettings;
  onDonateClick: () => void;
  onMakePaymentClick?: () => void;
  onAdminClick: () => void;
  onOpenLegalModal: (type: 'privacy' | 'terms' | 'refund' | 'tax80g') => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onDonateClick,
  onMakePaymentClick,
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="h-16 sm:h-20 w-auto min-w-[80px] sm:min-w-[96px] bg-white rounded-2xl p-2 shadow-lg border-2 border-[#D6B46A]/80 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src="/assets/images/logo.png"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.includes('src/assets')) {
                      target.src = '/src/assets/images/logo.png';
                    }
                  }}
                  alt="Faithful Friends Welfare Trust Logo"
                  className="h-12 sm:h-16 w-auto object-contain select-none"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                  Faithful Friends Welfare Trust
                </h3>
                <p className="text-[11px] uppercase tracking-widest text-[#D6B46A] font-semibold mt-0.5">
                  Registered Non-Profit Trust · Reg. No: {settings.registrationNumber}
                </p>
                <p className="text-xs text-[#FAF7F0]/70 mt-1">
                  Income Tax Section 80G Certified · NITI Aayog Darpan UID: {settings.darpanId}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#FAF7F0]/80 leading-relaxed max-w-md">
              A registered non-profit welfare organisation dedicated to distributing wholesome meals
              to underprivileged children, feeding the hungry, protecting indigenous cows, and conducting
              direct community relief across India.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                onClick={onDonateClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#176B4D] hover:bg-[#14532D] text-white rounded-lg text-xs font-semibold shadow transition-all border border-[#D6B46A]/40 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#D6B46A] fill-[#D6B46A]" />
                <span>Donate Now (80G)</span>
              </button>

              <button
                onClick={onMakePaymentClick || onDonateClick}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-stone-100 text-[#003366] rounded-lg text-xs font-bold shadow transition-all border border-[#D6B46A] cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Make a Payment (UPI QR)</span>
              </button>
            </div>

            {/* Social Media Links (Instagram, Facebook, YouTube in order) */}
            <div className="pt-4 space-y-2.5 border-t border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-[#D6B46A] font-bold block">
                Connect With Us On Social Media
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://www.instagram.com/faithfulfriendswelfare_trust/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Faithful Friends Welfare Trust on Instagram"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-[#E1306C] text-[#FAF7F0] hover:text-white border border-white/15 hover:border-transparent text-xs font-semibold transition-all shadow-sm hover:scale-[1.02] group"
                >
                  <Instagram className="w-4 h-4 text-[#D6B46A] group-hover:text-white transition-colors shrink-0" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=100091780464360"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Faithful Friends Welfare Trust on Facebook"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-[#1877F2] text-[#FAF7F0] hover:text-white border border-white/15 hover:border-transparent text-xs font-semibold transition-all shadow-sm hover:scale-[1.02] group"
                >
                  <Facebook className="w-4 h-4 text-[#D6B46A] group-hover:text-white transition-colors shrink-0" />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://www.youtube.com/@faithful.friends"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to Faithful Friends Welfare Trust on YouTube"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-[#FF0000] text-[#FAF7F0] hover:text-white border border-white/15 hover:border-transparent text-xs font-semibold transition-all shadow-sm hover:scale-[1.02] group"
                >
                  <Youtube className="w-4 h-4 text-[#D6B46A] group-hover:text-white transition-colors shrink-0" />
                  <span>YouTube</span>
                </a>
              </div>
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
                <a href={`tel:${settings.contactPhone.replace(/[^0-9+]/g, '')}`} className="hover:text-white underline">
                  {settings.contactPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#D6B46A] shrink-0" />
                <span>Section 80G Approval: {settings.section80G}</span>
              </div>

              {/* Official Social Icons */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#D6B46A] font-semibold block">
                  Follow Us Online
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/faithfulfriendswelfare_trust/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram - Faithful Friends Welfare Trust"
                    title="Instagram"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#E1306C] text-[#FAF7F0] hover:text-white flex items-center justify-center transition-all border border-white/15 hover:scale-105"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100091780464360"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook - Faithful Friends Welfare Trust"
                    title="Facebook"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#1877F2] text-[#FAF7F0] hover:text-white flex items-center justify-center transition-all border border-white/15 hover:scale-105"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.youtube.com/@faithful.friends"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube - Faithful Friends Welfare Trust"
                    title="YouTube"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FF0000] text-[#FAF7F0] hover:text-white flex items-center justify-center transition-all border border-white/15 hover:scale-105"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
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
