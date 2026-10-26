import React, { useState } from 'react';
import { Heart, ArrowRight, Info, X, CheckCircle2, Shield } from 'lucide-react';
import { Cause } from '../types';
import { IMAGES } from '../data/mockData';

interface CausesProps {
  causes: Cause[];
  onSelectCauseToDonate: (causeId: string) => void;
}

export const Causes: React.FC<CausesProps> = ({ causes, onSelectCauseToDonate }) => {
  const [selectedCauseDetails, setSelectedCauseDetails] = useState<Cause | null>(null);

  const getImageSrc = (index: Cause['imageIndex']) => {
    switch (index) {
      case 'child':
        return IMAGES.childMeal;
      case 'hungry':
        return IMAGES.feedHungry;
      case 'cows':
        return IMAGES.careForCows;
      case 'community':
        return IMAGES.communityWelfare;
      default:
        return IMAGES.hero;
    }
  };

  return (
    <section id="causes" className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#103D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#176B4D] font-bold mb-3">
            <span>Our Primary Initiatives</span>
            <span aria-hidden="true">·</span>
            <span>Verified Programmes</span>
            <span aria-hidden="true">·</span>
            <span>Direct Impact</span>
          </div>

          <h2
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#103D2B] tracking-tight leading-tight mb-5"
          >
            Where Your Kindness Goes.
          </h2>

          <p className="text-base sm:text-lg text-[#202720]/80 leading-relaxed font-normal">
            Choose a verified cause close to your heart. Every single rupee donated is
            channelled with complete transparency, and you will receive an official 80G tax
            receipt immediately upon donation.
          </p>
        </div>

        {/* 4 Interactive Cause Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {causes.map((cause) => {
            const percentage = Math.min(
              100,
              Math.round((cause.raisedAmount / cause.targetAmount) * 100)
            );

            return (
              <div
                key={cause.id}
                className="bg-white rounded-xl overflow-hidden border border-[#103D2B]/12 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Visual Header */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-100">
                  <img
                    src={getImageSrc(cause.imageIndex)}
                    alt={cause.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Clean unboxed category kicker on top left */}
                  <div className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded">
                    Verified Campaign
                  </div>

                  {/* Title overlay at bottom of image */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                      {cause.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FAF7F0]/90 mt-1 line-clamp-1">
                      {cause.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <p className="text-sm text-[#202720]/80 leading-relaxed">
                      {cause.description}
                    </p>

                    {/* Impact Note */}
                    <div className="mt-4 p-3 bg-[#FAF7F0] rounded-lg border border-[#103D2B]/10 text-xs text-[#103D2B] font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#176B4D] shrink-0" />
                      <span>{cause.impactNote}</span>
                    </div>
                  </div>

                  {/* Fundraising Progress Bar (Strictly when verified targets exist) */}
                  <div className="pt-2 border-t border-[#103D2B]/10">
                    <div className="flex justify-between items-baseline text-xs mb-2">
                      <span className="font-semibold text-[#103D2B]">
                        Raised: <span className="tabular-nums font-bold">₹{cause.raisedAmount.toLocaleString('en-IN')}</span>
                      </span>
                      <span className="text-[#202720]/70">
                        Target: <span className="tabular-nums font-medium">₹{cause.targetAmount.toLocaleString('en-IN')}</span>
                      </span>
                    </div>

                    {/* Clean progress bar */}
                    <div className="w-full h-2.5 bg-[#FAF7F0] rounded-full overflow-hidden border border-[#103D2B]/10">
                      <div
                        className="h-full bg-gradient-to-r from-[#176B4D] to-[#D6B46A] rounded-full transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#202720]/70 mt-2 font-medium">
                      <span>{percentage}% funded</span>
                      <span className="tabular-nums">{cause.donorsCount} kind donors</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => onSelectCauseToDonate(cause.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#176B4D] hover:bg-[#103D2B] text-white rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-[0.98]"
                    >
                      <Heart className="w-4 h-4 text-[#D6B46A] fill-[#D6B46A]" />
                      <span>Donate to This Cause</span>
                    </button>

                    <button
                      onClick={() => setSelectedCauseDetails(cause)}
                      aria-label={`Learn more about ${cause.title}`}
                      className="p-3 text-[#103D2B] hover:bg-[#176B4D]/10 rounded-lg border border-[#103D2B]/20 transition-colors"
                      title="View full campaign scope"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cause Detail Modal */}
      {selectedCauseDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F0] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#103D2B]/20">
            <div className="relative h-64 sm:h-72">
              <img
                src={getImageSrc(selectedCauseDetails.imageIndex)}
                alt={selectedCauseDetails.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setSelectedCauseDetails(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#D6B46A] font-semibold">
                  Detailed Campaign Scope
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-1">
                  {selectedCauseDetails.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#176B4D] mb-2">
                  Campaign Mission
                </h4>
                <p className="text-base text-[#202720]/85 leading-relaxed">
                  {selectedCauseDetails.description}
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#103D2B]/10 space-y-3">
                <h4 className="text-sm font-semibold text-[#103D2B]">
                  Verified Transparency Breakdown
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#202720]/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#176B4D] shrink-0 mt-0.5" />
                    <span>Target Fundraising: ₹{selectedCauseDetails.targetAmount.toLocaleString('en-IN')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#176B4D] shrink-0 mt-0.5" />
                    <span>Total Verified Donors: {selectedCauseDetails.donorsCount}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#176B4D] shrink-0 mt-0.5" />
                    <span>All contributions are eligible for 50% tax exemption under Section 80G.</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#103D2B]/10">
                <button
                  onClick={() => setSelectedCauseDetails(null)}
                  className="px-5 py-2.5 text-sm font-medium text-[#202720] hover:bg-black/5 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const id = selectedCauseDetails.id;
                    setSelectedCauseDetails(null);
                    onSelectCauseToDonate(id);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#176B4D] hover:bg-[#103D2B] rounded-lg shadow-sm"
                >
                  <Heart className="w-4 h-4 text-[#D6B46A] fill-[#D6B46A]" />
                  <span>Donate to This Cause</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
