import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Shield, Lock } from 'lucide-react';

interface NavbarProps {
  onDonateClick: () => void;
  onMakePaymentClick?: () => void;
  onAdminClick: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onDonateClick,
  onMakePaymentClick,
  onAdminClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About Us', href: '#mission' },
    { label: 'Our Causes', href: '#causes' },
    { label: 'Our Impact', href: '#impact' },
    { label: 'Stories', href: '#stories' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Get Involved', href: '#volunteer' },
    { label: 'Transparency', href: '#transparency' },
    { label: 'Contact', href: '#contact' },
  ];

  const handlePayment = onMakePaymentClick || onDonateClick;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F0]/95 backdrop-blur-md shadow-sm border-b border-[#103D2B]/10 py-3.5'
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Strict 3-zone Top Bar Contract: Brand — Links — Actions */}
          <div className="flex items-center justify-between gap-6">
            {/* Zone 1: Brand Wordmark (Single text element) */}
            <a
              href="#"
              className={`text-xl sm:text-2xl font-serif font-bold tracking-tight whitespace-nowrap shrink-0 transition-colors ${
                isScrolled ? 'text-[#103D2B]' : 'text-white'
              }`}
            >
              Faithful Friends Welfare Trust
            </a>

            {/* Zone 2: Concise single-line navigation links */}
            <nav className="hidden xl:flex items-center gap-6 text-sm font-medium whitespace-nowrap">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`transition-colors py-1 hover:underline underline-offset-8 ${
                    isScrolled
                      ? 'text-[#202720]/80 hover:text-[#103D2B]'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Actions (Make a Payment + Donate Now) + Mobile Menu Trigger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={handlePayment}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold tracking-wide text-[#003366] bg-white hover:bg-stone-50 rounded-lg shadow-sm border border-[#D6B46A]/60 transition-all active:scale-[0.98] whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Make a Payment</span>
              </button>

              <button
                onClick={onDonateClick}
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-white bg-[#176B4D] hover:bg-[#103D2B] rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98] whitespace-nowrap shrink-0 border border-[#D6B46A]/40"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D6B46A] fill-[#D6B46A]" />
                <span>Donate Now</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className={`xl:hidden p-2 rounded-md transition-colors ${
                  isScrolled ? 'text-[#103D2B] hover:bg-[#103D2B]/5' : 'text-white hover:bg-white/10'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FAF7F0] shadow-xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#103D2B]/10">
                <span className="font-serif font-bold text-lg text-[#103D2B]">
                  Faithful Friends Welfare Trust
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#202720] hover:bg-black/5 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#202720] text-base font-medium py-2 px-3 rounded-md hover:bg-[#176B4D]/10 hover:text-[#103D2B] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#103D2B]/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handlePayment();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-[#003366] bg-white border border-[#D6B46A] hover:bg-stone-50 rounded-lg font-bold text-sm shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Make a Payment (UPI QR)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDonateClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-white bg-[#176B4D] hover:bg-[#103D2B] rounded-lg font-semibold text-sm shadow-sm"
              >
                <Heart className="w-4 h-4 text-[#D6B46A] fill-[#D6B46A]" />
                <span>Donate Now (80G Tax Exemption)</span>
              </button>

              <div className="flex items-center justify-between text-xs text-[#202720]/70 pt-2">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[#176B4D]" /> 80G Tax Deductible
                </span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAdminClick();
                  }}
                  className="flex items-center gap-1 text-[#103D2B] hover:underline font-medium"
                >
                  <Lock className="w-3 h-3" /> Admin Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
