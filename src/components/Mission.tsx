import React from 'react';
import { Utensils, HeartHandshake, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../data/mockData';

export const Mission: React.FC = () => {
  return (
    <section id="mission" className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#103D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curatorial Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#176B4D] font-bold mb-3">
            <span>Our Foundation</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2021</span>
            <span aria-hidden="true">·</span>
            <span>Registered Society</span>
          </div>

          <h2
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#103D2B] tracking-tight leading-tight mb-6"
          >
            Compassion in Action.
          </h2>

          <p className="text-lg text-[#202720]/85 leading-relaxed font-normal">
            Faithful Friends Welfare was founded on a simple, uncompromising conviction:
            no child should go to sleep hungry, no abandoned animal should suffer without care,
            and no family facing hardship should stand alone. We bridge the gap between people
            who care and lives that urgently need assistance.
          </p>
        </div>

        {/* Asymmetric 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Editorial Essay & Principles (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-lg text-[#202720]/80">
              <p className="text-base sm:text-lg leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#103D2B] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                Every single morning before dawn, our dedicated volunteer teams begin preparing
                warm, hygiene-tested meals in our partner kitchens. From sourcing wholesome lentils,
                whole grains, and fresh farm vegetables to packaging hot meals in eco-safe containers,
                we treat every plate with the highest standards of dignity.
              </p>

              <p className="text-base sm:text-lg leading-relaxed mt-4">
                Beyond hunger relief, our animal welfare sanctuary network provides shelter,
                vital veterinary medical care, and daily fresh green fodder to elderly, abandoned,
                and injured indigenous cows. In rural and peri-urban hubs, we conduct regular
                community drives providing thermal blankets, clean water, and emergency food relief
                directly into the hands of elderly residents and daily wage earners.
              </p>
            </div>

            {/* Curatorial Pull Quote */}
            <div className="py-6 px-8 bg-white/70 border-y border-[#D6B46A]/40 my-8">
              <blockquote className="text-xl sm:text-2xl font-serif italic text-[#103D2B] leading-snug">
                “Charity is not an act of pity; it is the restoration of shared human dignity.
                When we feed a child or care for a mute animal, we heal our own humanity.”
              </blockquote>
              <div className="mt-3 text-xs uppercase tracking-widest text-[#176B4D] font-medium">
                Governing Board Declaration · Faithful Friends Welfare Society
              </div>
            </div>

            {/* 4 Pillars with Clean Editorial Numbering (No mechanical slashes) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 bg-white rounded-lg border border-[#103D2B]/10">
                <span className="text-xs uppercase tracking-widest text-[#D6B46A] font-bold block mb-1">
                  01. Child Nourishment
                </span>
                <h4 className="text-base font-semibold text-[#103D2B] mb-1.5">
                  Hot School-Day Meals
                </h4>
                <p className="text-xs sm:text-sm text-[#202720]/75 leading-relaxed">
                  Daily balanced lunches and fruits ensuring kids attend school healthy,
                  energized, and ready to learn.
                </p>
              </div>

              <div className="p-5 bg-white rounded-lg border border-[#103D2B]/10">
                <span className="text-xs uppercase tracking-widest text-[#D6B46A] font-bold block mb-1">
                  02. Hunger Alleviation
                </span>
                <h4 className="text-base font-semibold text-[#103D2B] mb-1.5">
                  Mobile Kitchen Vans
                </h4>
                <p className="text-xs sm:text-sm text-[#202720]/75 leading-relaxed">
                  Hot meals delivered outside public hospitals and shelter zones to
                  underprivileged families and elderly citizens.
                </p>
              </div>

              <div className="p-5 bg-white rounded-lg border border-[#103D2B]/10">
                <span className="text-xs uppercase tracking-widest text-[#D6B46A] font-bold block mb-1">
                  03. Gau Seva & Sanctuary
                </span>
                <h4 className="text-base font-semibold text-[#103D2B] mb-1.5">
                  Lifetime Compassionate Care
                </h4>
                <p className="text-xs sm:text-sm text-[#202720]/75 leading-relaxed">
                  Fresh green fodder, clean water, shelter, and full-time veterinary
                  treatment for cows in need.
                </p>
              </div>

              <div className="p-5 bg-white rounded-lg border border-[#103D2B]/10">
                <span className="text-xs uppercase tracking-widest text-[#D6B46A] font-bold block mb-1">
                  04. Direct Grassroots Aid
                </span>
                <h4 className="text-base font-semibold text-[#103D2B] mb-1.5">
                  Emergency Relief Kits
                </h4>
                <p className="text-xs sm:text-sm text-[#202720]/75 leading-relaxed">
                  Verified distribution of warm winter blankets, tarpaulins, dry
                  rations, and urgent medical assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Visual Anchor with Accession Style Caption (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-[#103D2B]/10 group">
              <img
                src={IMAGES.feedHungry}
                alt="Faithful Friends Welfare volunteers, teachers, and children during a community care and nutrition program"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-wider text-[#D6B46A] font-medium">
                  Field Documentation · Oct 2026
                </p>
                <p className="text-sm font-medium mt-1">
                  Faithful Friends Welfare team with children and community members during our nutrition and welfare drive.
                </p>
              </div>
            </div>

            {/* Transparency Highlight Card */}
            <div className="bg-white p-6 rounded-xl border border-[#103D2B]/10 shadow-sm">
              <h4 className="font-serif font-bold text-lg text-[#103D2B] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#176B4D]" />
                <span>Our Transparency Commitment</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#202720]/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#176B4D] shrink-0 mt-0.5" />
                  <span>86% of all donations directly fund meals and animal feed on the ground.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#176B4D] shrink-0 mt-0.5" />
                  <span>Audited financial reports published annually for public verification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#176B4D] shrink-0 mt-0.5" />
                  <span>Instant 80G tax exemption certificates generated for every donor.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
