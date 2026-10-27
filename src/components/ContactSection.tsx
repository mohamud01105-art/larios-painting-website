import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Clock, CheckCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const serviceCommunities = [
    { name: 'Omaha', state: 'NE', tag: 'Primary Metro' },
    { name: 'Lincoln', state: 'NE', tag: 'Capital Metro' },
    { name: 'Council Bluffs', state: 'IA', tag: 'Iowa Border Metro' },
    { name: 'Bellevue', state: 'NE', tag: 'Surrounding Area' },
    { name: 'Papillion', state: 'NE', tag: 'Surrounding Area' },
    { name: 'Gretna', state: 'NE', tag: 'Surrounding Area' },
    { name: 'Elkhorn', state: 'NE', tag: 'Surrounding Area' },
    { name: 'La Vista', state: 'NE', tag: 'Surrounding Area' },
    { name: 'Blair', state: 'NE', tag: 'Surrounding Area' },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E53E3E] mb-3">
            <span>Direct Contact & Service Area</span>
            <span aria-hidden="true">·</span>
            <span>Local Team</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Get in Touch With Larios Painting
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            Have questions about an upcoming painting project, surface preparation, or scheduling? Contact Austin directly or submit a free estimate request.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Phone */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E53E3E] mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Direct Phone</h3>
              <p className="text-xs text-neutral-400 mb-6">
                Call Austin directly for estimate scheduling, questions, or project coordination.
              </p>
            </div>

            <a
              href="tel:14025042881"
              className="inline-flex items-center gap-2 text-xl font-extrabold text-white hover:text-[#E53E3E] transition-colors"
            >
              (402) 504-2881
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E53E3E] mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Business Email</h3>
              <p className="text-xs text-neutral-400 mb-6">
                Send blueprints, architectural specifications, or detailed inquiries anytime.
              </p>
            </div>

            <a
              href="mailto:Austin@lariospaintingco.com"
              className="inline-flex items-center gap-2 text-base font-bold text-white hover:text-[#E53E3E] transition-colors break-all"
            >
              Austin@lariospaintingco.com
            </a>
          </div>

          {/* Card 3: Social & Hours */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E53E3E] mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Social & Response Time</h3>
              <p className="text-xs text-neutral-400 mb-4">
                We respond to all phone and email inquiries within 24 business hours.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <a
                href="https://www.instagram.com/lariospainting"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-xs font-semibold text-neutral-300 hover:text-white transition-colors py-1"
              >
                <span className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-[#E53E3E]" />
                  <span>Instagram</span>
                </span>
                <span className="text-neutral-400">@lariospainting</span>
              </a>

              <a
                href="https://www.facebook.com/people/Larios-Painting/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-xs font-semibold text-neutral-300 hover:text-white transition-colors py-1"
              >
                <span className="flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-[#E53E3E]" />
                  <span>Facebook</span>
                </span>
                <span className="text-neutral-400">Larios Painting</span>
              </a>
            </div>
          </div>
        </div>

        {/* Verified Service Areas Block (No invented street address) */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E53E3E] mb-1">
                <MapPin className="w-4 h-4" />
                <span>Geographic Coverage</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Service Areas Across Nebraska & Iowa
              </h3>
            </div>
            <div className="text-xs text-neutral-400 max-w-sm">
              We travel directly to your residential property or commercial jobsite. On-site estimates are arranged by appointment.
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {serviceCommunities.map((area) => (
              <div
                key={area.name}
                className="bg-black/40 border border-neutral-800/80 rounded-xl p-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-base text-white">
                    {area.name}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#E53E3E]">
                    {area.state}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <CheckCircle className="w-3 h-3 text-[#E53E3E]" />
                  <span>{area.tag}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <p>
              Serving Omaha, Lincoln, Council Bluffs, and surrounding communities.
            </p>
            <a
              href="#free-estimate"
              className="text-[#E53E3E] hover:underline font-bold"
            >
              Check Availability For Your ZIP Code &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
