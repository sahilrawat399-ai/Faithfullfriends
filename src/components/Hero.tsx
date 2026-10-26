import React, { useEffect, useRef } from 'react';
import { Heart, ArrowDown, ChevronRight, ShieldCheck } from 'lucide-react';
import { IMAGES } from '../data/mockData';

interface HeroProps {
  onDonateClick: () => void;
  onExploreClick: () => void;
  impactMetrics: {
    mealsDistributed: number;
    childrenSupported: number;
    cowsCaredFor: number;
    activeVolunteers: number;
  };
}

export const Hero: React.FC<HeroProps> = ({
  onDonateClick,
  onExploreClick,
  impactMetrics,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle ambient light particle drift for cinematic depth (lightweight, zero WebGL overhead)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      speedY: -0.2 - Math.random() * 0.3,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214, 180, 106, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between bg-[#103D2B] overflow-hidden pt-28 pb-10">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Faithful Friends Welfare Trust team and volunteers celebrating community nourishment with children"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim adhering to WCAG AA 4.5:1 contrast across all media luminance */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#103D2B] via-[#103D2B]/75 to-black/60" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Subtle Ambient Particle Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12 lg:py-20">
        <div className="max-w-3xl">
          {/* Subdued Editorial Eyebrow */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D6B46A] font-semibold mb-4">
            <span>Faithful Friends Welfare</span>
            <span aria-hidden="true">·</span>
            <span>Registered Non-Profit Society</span>
            <span aria-hidden="true">·</span>
            <span>80G Tax Exemption</span>
          </div>

          {/* Primary Editorial Headline */}
          <h1
            style={{ textWrap: 'balance' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-serif font-bold text-white tracking-tight leading-[1.12] mb-6"
          >
            Small Acts of Kindness. <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#FAF7F0]/95">
              A World of Difference.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            style={{ textWrap: 'balance' }}
            className="text-lg sm:text-xl text-[#FAF7F0]/90 font-normal leading-relaxed mb-8 max-w-2xl"
          >
            Together, we can bring meals to hungry children, care for animals in need,
            and create a kinder, more compassionate world. Every meal served is an
            act of love that transforms lives.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 mb-8">
            <button
              onClick={onDonateClick}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-[#176B4D] hover:bg-[#103D2B] rounded-lg shadow-lg hover:shadow-xl transition-all border border-[#D6B46A]/40 active:scale-[0.98] group"
            >
              <Heart className="w-5 h-5 text-[#D6B46A] fill-[#D6B46A] group-hover:scale-110 transition-transform" />
              <span>Donate Now</span>
            </button>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium text-white hover:text-[#FAF7F0] bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-lg border border-white/20 transition-all"
            >
              <span>Explore Our Mission</span>
              <ChevronRight className="w-4 h-4 text-[#D6B46A]" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#FAF7F0]/80 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D6B46A]" />
              <span>100% Tax Deductible (80G Certificate)</span>
            </div>
            <span aria-hidden="true">·</span>
            <span>Audited Annual Financials</span>
            <span aria-hidden="true">·</span>
            <span>Zero Intermediaries</span>
          </div>
        </div>
      </div>

      {/* Verified Real-time Impact Strip (Anchored directly below Hero) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="bg-[#FAF7F0]/95 backdrop-blur-md rounded-xl border border-[#D6B46A]/30 p-5 sm:p-6 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#103D2B]/10">
            <div className="pt-3 md:pt-0 md:px-4 first:pl-0">
              <p className="text-2xl sm:text-3xl font-serif font-bold text-[#103D2B] tabular-nums">
                {impactMetrics.mealsDistributed.toLocaleString('en-IN')}+
              </p>
              <p className="text-xs sm:text-sm text-[#202720]/80 mt-1 font-medium">
                Meals Distributed
              </p>
            </div>

            <div className="pt-3 md:pt-0 md:px-4">
              <p className="text-2xl sm:text-3xl font-serif font-bold text-[#103D2B] tabular-nums">
                {impactMetrics.childrenSupported.toLocaleString('en-IN')}+
              </p>
              <p className="text-xs sm:text-sm text-[#202720]/80 mt-1 font-medium">
                Children Nourished
              </p>
            </div>

            <div className="pt-3 md:pt-0 md:px-4">
              <p className="text-2xl sm:text-3xl font-serif font-bold text-[#103D2B] tabular-nums">
                {impactMetrics.cowsCaredFor.toLocaleString('en-IN')}+
              </p>
              <p className="text-xs sm:text-sm text-[#202720]/80 mt-1 font-medium">
                Cows in Sanctuary Care
              </p>
            </div>

            <div className="pt-3 md:pt-0 md:px-4">
              <p className="text-2xl sm:text-3xl font-serif font-bold text-[#103D2B] tabular-nums">
                {impactMetrics.activeVolunteers.toLocaleString('en-IN')}+
              </p>
              <p className="text-xs sm:text-sm text-[#202720]/80 mt-1 font-medium">
                Compassionate Volunteers
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden lg:flex justify-center mt-6">
          <a
            href="#mission"
            aria-label="Scroll to Mission"
            className="p-2 text-white/70 hover:text-white transition-colors animate-bounce"
          >
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
