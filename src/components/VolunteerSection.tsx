import React, { useState } from 'react';
import { Users, Building2, CheckCircle2, AlertCircle, Send, ExternalLink, FileSpreadsheet } from 'lucide-react';
import { SystemSettings } from '../types';

interface VolunteerSectionProps {
  settings: SystemSettings;
}

export const VolunteerSection: React.FC<VolunteerSectionProps> = ({ settings }) => {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'csr' | 'googleform'>('volunteer');

  // Volunteer State
  const [volFullName, setVolFullName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volCity, setVolCity] = useState('');
  const [volArea, setVolArea] = useState('Children Education & Meals');
  const [volAvailability, setVolAvailability] = useState('Weekends (Saturday & Sunday)');
  const [volMessage, setVolMessage] = useState('');
  const [volSubmitting, setVolSubmitting] = useState(false);
  const [volSuccess, setVolSuccess] = useState<string | null>(null);
  const [volError, setVolError] = useState<string | null>(null);

  // CSR State
  const [csrOrgName, setCsrOrgName] = useState('');
  const [csrContact, setCsrContact] = useState('');
  const [csrEmail, setCsrEmail] = useState('');
  const [csrPhone, setCsrPhone] = useState('');
  const [csrType, setCsrType] = useState('CSR Meal Van Sponsorship');
  const [csrBudget, setCsrBudget] = useState('');
  const [csrProposal, setCsrProposal] = useState('');
  const [csrSubmitting, setCsrSubmitting] = useState(false);
  const [csrSuccess, setCsrSuccess] = useState<string | null>(null);
  const [csrError, setCsrError] = useState<string | null>(null);

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!volFullName.trim() || !volEmail.trim() || !volPhone.trim()) {
      setVolError('Please fill in your name, email address, and mobile number.');
      return;
    }

    setVolSubmitting(true);
    setVolError(null);

    try {
      const res = await fetch('/api/volunteer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: volFullName,
          email: volEmail,
          phone: volPhone,
          city: volCity,
          areaOfInterest: volArea,
          availability: volAvailability,
          message: volMessage
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit registration');

      setVolSuccess(data.message);
      setVolFullName('');
      setVolEmail('');
      setVolPhone('');
      setVolCity('');
      setVolMessage('');
    } catch (err: any) {
      setVolError(err.message || 'Submission failed. Please check network and retry.');
    } finally {
      setVolSubmitting(false);
    }
  };

  const handleCsrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csrOrgName.trim() || !csrContact.trim() || !csrEmail.trim() || !csrPhone.trim()) {
      setCsrError('Please fill in all mandatory company contact fields.');
      return;
    }

    setCsrSubmitting(true);
    setCsrError(null);

    try {
      const res = await fetch('/api/partnerships/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationName: csrOrgName,
          contactPerson: csrContact,
          email: csrEmail,
          phone: csrPhone,
          partnershipType: csrType,
          estimatedBudget: csrBudget,
          proposalDetails: csrProposal
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit partnership enquiry');

      setCsrSuccess(data.message);
      setCsrOrgName('');
      setCsrContact('');
      setCsrEmail('');
      setCsrPhone('');
      setCsrBudget('');
      setCsrProposal('');
    } catch (err: any) {
      setCsrError(err.message || 'Submission failed. Please check network and retry.');
    } finally {
      setCsrSubmitting(false);
    }
  };

  return (
    <section id="volunteer" className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#103D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curatorial Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#176B4D] font-bold mb-3">
            <span>Get Involved</span>
            <span aria-hidden="true">·</span>
            <span>Volunteering & CSR</span>
            <span aria-hidden="true">·</span>
            <span>Make a Difference</span>
          </div>

          <h2
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#103D2B] tracking-tight leading-tight mb-4"
          >
            Join Our Circle of Kindness.
          </h2>

          <p className="text-base sm:text-lg text-[#202720]/80 leading-relaxed font-normal">
            Whether giving a few hours over the weekend to pack nutritious meals or partnering
            as an institutional CSR donor to sponsor a mobile meal van, your participation powers
            real transformation.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-xl border border-[#103D2B]/15 shadow-sm">
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'volunteer'
                  ? 'bg-[#103D2B] text-white shadow-sm'
                  : 'text-[#202720]/75 hover:text-[#103D2B]'
              }`}
            >
              <Users className="w-4 h-4 text-[#D6B46A]" />
              <span>Individual Volunteer Registration</span>
            </button>

            <button
              onClick={() => setActiveTab('csr')}
              className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'csr'
                  ? 'bg-[#103D2B] text-white shadow-sm'
                  : 'text-[#202720]/75 hover:text-[#103D2B]'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#D6B46A]" />
              <span>Corporate CSR & Sponsorship</span>
            </button>

            {settings.googleFormsEnabled && (
              <button
                onClick={() => setActiveTab('googleform')}
                className={`py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'googleform'
                    ? 'bg-[#103D2B] text-white shadow-sm'
                    : 'text-[#202720]/75 hover:text-[#103D2B]'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-[#D6B46A]" />
                <span>Google Form</span>
              </button>
            )}
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#103D2B]/12 shadow-lg p-6 sm:p-10">
          {/* TAB 1: INDIVIDUAL VOLUNTEER FORM */}
          {activeTab === 'volunteer' && (
            <form onSubmit={handleVolunteerSubmit} className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#103D2B] mb-1">
                  Volunteer Application
                </h3>
                <p className="text-xs text-[#202720]/70">
                  Join our verified field cohorts in Delhi NCR, Vrindavan, and Haryana.
                </p>
              </div>

              {volSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{volSuccess}</span>
                </div>
              )}

              {volError && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{volError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={volFullName}
                    onChange={(e) => setVolFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={volEmail}
                    onChange={(e) => setVolEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={volPhone}
                    onChange={(e) => setVolPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                    City / Locality
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. New Delhi, Noida, Gurugram"
                    value={volCity}
                    onChange={(e) => setVolCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                    Area of Interest
                  </label>
                  <select
                    value={volArea}
                    onChange={(e) => setVolArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  >
                    <option value="Children Education & Meals">Children Education & Meals</option>
                    <option value="Langar & Food Packaging">Langar & Food Packaging</option>
                    <option value="Gau Seva & Animal Care">Gau Seva & Animal Care</option>
                    <option value="Winter Blanket & Relief Drives">Winter Blanket & Relief Drives</option>
                    <option value="Digital Media & Photography">Digital Media & Photography</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                    Availability
                  </label>
                  <select
                    value={volAvailability}
                    onChange={(e) => setVolAvailability(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  >
                    <option value="Weekends (Saturday & Sunday)">Weekends (Saturday & Sunday)</option>
                    <option value="Weekdays (Morning shifts)">Weekdays (Morning shifts)</option>
                    <option value="Flexible / Monthly Drives">Flexible / Monthly Drives</option>
                    <option value="Remote / Coordination">Remote / Coordination</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                  Why do you wish to volunteer with us? (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share a brief note about yourself, past experience, or personal motivation..."
                  value={volMessage}
                  onChange={(e) => setVolMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                />
              </div>

              <button
                type="submit"
                disabled={volSubmitting}
                className="w-full py-3.5 px-6 bg-[#176B4D] hover:bg-[#103D2B] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                <Send className="w-4 h-4 text-[#D6B46A]" />
                <span>{volSubmitting ? 'Submitting Application...' : 'Submit Volunteer Application'}</span>
              </button>
            </form>
          )}

          {/* TAB 2: CSR & CORPORATE PARTNERSHIP FORM */}
          {activeTab === 'csr' && (
            <form onSubmit={handleCsrSubmit} className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#103D2B] mb-1">
                  Corporate CSR & Sponsorship
                </h3>
                <p className="text-xs text-[#202720]/70">
                  Collaborate under Section 135 CSR mandate. Comprehensive impact reporting provided.
                </p>
              </div>

              {csrSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{csrSuccess}</span>
                </div>
              )}

              {csrError && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{csrError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corp India Pvt Ltd"
                    value={csrOrgName}
                    onChange={(e) => setCsrOrgName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                    Key Contact Person & Designation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Name & Designation"
                    value={csrContact}
                    onChange={(e) => setCsrContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="csr@company.com"
                    value={csrEmail}
                    onChange={(e) => setCsrEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                    Mobile / Landline Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 11 4000 0000"
                    value={csrPhone}
                    onChange={(e) => setCsrPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                    Partnership Focus
                  </label>
                  <select
                    value={csrType}
                    onChange={(e) => setCsrType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  >
                    <option value="CSR Meal Van Sponsorship">CSR Meal Van Sponsorship</option>
                    <option value="Gaushala Sanctuary Infrastructure">Gaushala Sanctuary Infrastructure</option>
                    <option value="School Breakfast Partnership">School Breakfast Partnership</option>
                    <option value="Emergency Disaster Relief Corpus">Emergency Disaster Relief Corpus</option>
                    <option value="Employee Volunteering Day">Employee Volunteering Day</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                    Estimated Annual Budget
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹5 Lakhs - ₹25 Lakhs"
                    value={csrBudget}
                    onChange={(e) => setCsrBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                  Brief Proposal / Objectives
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline key geographic preferences, reporting metrics required, or target timeline..."
                  value={csrProposal}
                  onChange={(e) => setCsrProposal(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#103D2B]/15 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                />
              </div>

              <button
                type="submit"
                disabled={csrSubmitting}
                className="w-full py-3.5 px-6 bg-[#176B4D] hover:bg-[#103D2B] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                <Send className="w-4 h-4 text-[#D6B46A]" />
                <span>{csrSubmitting ? 'Transmitting Request...' : 'Submit CSR Partnership Proposal'}</span>
              </button>
            </form>
          )}

          {/* TAB 3: GOOGLE FORM INTEGRATION VIEW */}
          {activeTab === 'googleform' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#103D2B] mb-1">
                    Official Google Form Integration
                  </h3>
                  <p className="text-xs text-[#202720]/70">
                    Direct integration with Faithful Friends Welfare Google Workspace forms.
                  </p>
                </div>

                <a
                  href={settings.googleFormsVolunteerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F0] hover:bg-stone-200 text-[#103D2B] rounded-lg text-xs font-semibold border border-[#103D2B]/15 transition-colors"
                >
                  <span>Open in Google Forms</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embedded Form Preview Frame / Responsive Container */}
              <div className="rounded-xl overflow-hidden border border-[#103D2B]/15 bg-[#FAF7F0]">
                <div className="p-4 bg-emerald-50 text-xs text-emerald-900 border-b border-emerald-100 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  <span>Configured Google Forms Endpoint: {settings.googleFormsVolunteerUrl}</span>
                </div>
                <div className="p-6 text-center space-y-3">
                  <p className="text-sm text-[#202720]/80">
                    You can submit your responses through our embedded form or directly via Google Forms.
                  </p>
                  <a
                    href={settings.googleFormsVolunteerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#176B4D] hover:bg-[#103D2B] text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
                  >
                    <span>Launch Google Form Interface</span>
                    <ExternalLink className="w-4 h-4 text-[#D6B46A]" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
