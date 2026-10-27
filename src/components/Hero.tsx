import React from 'react';
import { Phone, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenEstimate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimate }) => {
  return (
    <section id="home" className="relative bg-[#111111] text-white overflow-hidden">
      {/* Background Photography with High Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/projects/0de5b990-26f5-4c16-b11a-4d9396ebaa84.jpeg"
          alt="Freshly painted two-story suburban home completed by Larios Painting"
          className="w-full h-full object-cover object-center opacity-45 lg:opacity-55"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent lg:w-3/4"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
        <div className="max-w-2xl">
          {/* Trust-focused line */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold tracking-wide text-neutral-200 border border-white/15 mb-6">
            <span>Residential & Commercial</span>
            <span aria-hidden="true" className="text-neutral-400">•</span>
            <span>Interior & Exterior</span>
            <span aria-hidden="true" className="text-neutral-400">•</span>
            <span>Painting & Staining</span>
          </div>

          {/* Headline: Exact prompt wording */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white text-balance mb-6">
            Transform Your Home With a{' '}
            <span className="text-[#E53E3E] inline-block underline decoration-[#A50918] decoration-4 underline-offset-6">
              Fresh Coat of Paint.
            </span>
          </h1>

          {/* Supporting text: Exact prompt wording */}
          <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-xl mb-8">
            Professional interior and exterior painting for homes and businesses across Omaha, Lincoln, and Council Bluffs.
          </p>

          {/* Action Button Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <button
              type="button"
              onClick={onOpenEstimate}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-white bg-[#A50918] hover:bg-[#870612] active:bg-[#70040e] transition-all rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A50918]"
            >
              <span>GET A FREE ESTIMATE</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="tel:14025042881"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-xs transition-all rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Phone className="w-5 h-5 text-[#E53E3E]" />
              <span>CALL (402) 504-2881</span>
            </a>
          </div>

          {/* Service Area Region Indicators */}
          <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-neutral-300">
            <div className="flex items-center gap-1.5 text-neutral-200">
              <MapPin className="w-4 h-4 text-[#E53E3E] shrink-0" />
              <span className="font-semibold text-white">Serving:</span>
            </div>
            <span>Omaha, NE</span>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <span>Lincoln, NE</span>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <span>Council Bluffs, IA</span>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <span>Surrounding Communities</span>
          </div>
        </div>
      </div>

      {/* Highlights Strip */}
      <div className="relative z-10 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#E53E3E] shrink-0" />
              <span>Detailed Prep & Protection</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#E53E3E] shrink-0" />
              <span>Clear Project Communication</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#E53E3E] shrink-0" />
              <span>Full Property Respect</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#E53E3E] shrink-0" />
              <span>Clean, Professional Finish</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
