import React from 'react';
import { ShieldCheck, Heart, PieChart, Users, Sparkles } from 'lucide-react';
import { ImpactStats } from '../types';

interface ImpactDashboardProps {
  stats: ImpactStats;
  onDonateClick: () => void;
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ stats, onDonateClick }) => {
  return (
    <section id="impact" className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#103D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curatorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#176B4D] font-bold mb-3">
              <span>Verified Metrics</span>
              <span aria-hidden="true">·</span>
              <span>Updated Live</span>
              <span aria-hidden="true">·</span>
              <span>Statutory Audit</span>
            </div>

            <h2
              style={{ textWrap: 'balance' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#103D2B] tracking-tight leading-tight mb-4"
            >
              Every Rupee Accounted For. Every Life Counted.
            </h2>

            <p className="text-base sm:text-lg text-[#202720]/80 leading-relaxed font-normal">
              We uphold absolute financial and operational transparency. Our books are audited
              annually, and each distribution drive is documented and geo-verified by field coordinators.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#202720]/70 bg-white px-4 py-2.5 rounded-lg border border-[#103D2B]/10 self-start lg:self-auto">
            <ShieldCheck className="w-4 h-4 text-[#176B4D]" />
            <span>Audit cycle: {stats.lastVerifiedDate}</span>
          </div>
        </div>

        {/* 5 Big Stat Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#103D2B]/10 shadow-sm flex flex-col justify-between">
            <span className="text-xs uppercase tracking-wider text-[#D6B46A] font-bold block mb-2">
              Food Security
            </span>
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-[#103D2B] tabular-nums">
                {stats.mealsDistributed.toLocaleString('en-IN')}+
              </p>
              <h3 className="text-sm font-semibold text-[#202720] mt-1">
                Meals Distributed
              </h3>
            </div>
            <p className="text-xs text-[#202720]/70 mt-3 pt-3 border-t border-[#103D2B]/10">
              Across hospital langars and schools
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#103D2B]/10 shadow-sm flex flex-col justify-between">
            <span className="text-xs uppercase tracking-wider text-[#D6B46A] font-bold block mb-2">
              Child Welfare
            </span>
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-[#103D2B] tabular-nums">
                {stats.childrenSupported.toLocaleString('en-IN')}+
              </p>
              <h3 className="text-sm font-semibold text-[#202720] mt-1">
                Children Nourished
              </h3>
            </div>
            <p className="text-xs text-[#202720]/70 mt-3 pt-3 border-t border-[#103D2B]/10">
              Daily morning nutrition programs
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#103D2B]/10 shadow-sm flex flex-col justify-between">
            <span className="text-xs uppercase tracking-wider text-[#D6B46A] font-bold block mb-2">
              Animal Care
            </span>
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-[#103D2B] tabular-nums">
                {stats.cowsCaredFor.toLocaleString('en-IN')}+
              </p>
              <h3 className="text-sm font-semibold text-[#202720] mt-1">
                Cows in Sanctuary
              </h3>
            </div>
            <p className="text-xs text-[#202720]/70 mt-3 pt-3 border-t border-[#103D2B]/10">
              24/7 fodder & vet healthcare
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#103D2B]/10 shadow-sm flex flex-col justify-between">
            <span className="text-xs uppercase tracking-wider text-[#D6B46A] font-bold block mb-2">
              Relief Operations
            </span>
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-[#103D2B] tabular-nums">
                {stats.welfareDrives.toLocaleString('en-IN')}+
              </p>
              <h3 className="text-sm font-semibold text-[#202720] mt-1">
                Grassroots Drives
              </h3>
            </div>
            <p className="text-xs text-[#202720]/70 mt-3 pt-3 border-t border-[#103D2B]/10">
              Blanket & medical ration drives
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#103D2B]/10 shadow-sm flex flex-col justify-between">
            <span className="text-xs uppercase tracking-wider text-[#D6B46A] font-bold block mb-2">
              Community Force
            </span>
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-[#103D2B] tabular-nums">
                {stats.activeVolunteers.toLocaleString('en-IN')}+
              </p>
              <h3 className="text-sm font-semibold text-[#202720] mt-1">
                Active Volunteers
              </h3>
            </div>
            <p className="text-xs text-[#202720]/70 mt-3 pt-3 border-t border-[#103D2B]/10">
              Dedication on the ground
            </p>
          </div>
        </div>

        {/* Financial Transparency & Utilization Architecture */}
        <div className="bg-white rounded-2xl border border-[#103D2B]/12 p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-wider text-[#176B4D] font-bold block">
                Audited Fund Allocation
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#103D2B]">
                86% Directly Reaches the Field.
              </h3>
              <p className="text-sm text-[#202720]/80 leading-relaxed">
                We believe donors have the right to know how every rupee is deployed.
                Our overheads are kept strictly minimized through community kitchen volunteerism
                and ethical procurement.
              </p>

              <div className="pt-2">
                <button
                  onClick={onDonateClick}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#176B4D] hover:bg-[#103D2B] text-white rounded-lg text-sm font-semibold transition-all shadow-sm"
                >
                  <Heart className="w-4 h-4 text-[#D6B46A] fill-[#D6B46A]" />
                  <span>Support Our Mission</span>
                </button>
              </div>
            </div>

            {/* Fund Breakdown Bars */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex justify-between items-baseline text-xs mb-1.5 font-semibold">
                  <span className="text-[#103D2B]">
                    86% · Direct Meal Distribution & Animal Sanctuary Care
                  </span>
                  <span className="tabular-nums text-[#176B4D] font-bold">86.0%</span>
                </div>
                <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#176B4D] rounded-full" style={{ width: '86%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-xs mb-1.5 font-semibold">
                  <span className="text-[#103D2B]">
                    8% · Food Quality Testing, Hygiene Certification & Transport
                  </span>
                  <span className="tabular-nums text-[#D6B46A] font-bold">8.0%</span>
                </div>
                <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D6B46A] rounded-full" style={{ width: '8%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-xs mb-1.5 font-semibold">
                  <span className="text-[#103D2B]">
                    6% · Compliance, Statutory Audit & Donor Reporting
                  </span>
                  <span className="tabular-nums text-stone-500 font-bold">6.0%</span>
                </div>
                <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-stone-400 rounded-full" style={{ width: '6%' }} />
                </div>
              </div>

              <p className="text-[11px] text-stone-500 pt-2 italic">
                * Note: Financial records audited by Sharma & Associates, Chartered Accountants.
                Reports filed with Registrar of Societies & Income Tax Department.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
