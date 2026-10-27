import React from 'react';
import { ShieldCheck, MessageSquare, Home, Palette, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const commitments = [
    {
      number: '01',
      title: 'Careful Preparation & Attention to Detail',
      icon: ShieldCheck,
      description:
        'A lasting paint job depends entirely on what happens before the paint can is opened. We scrape peeling layers, feather-sand edges, caulk seams and joints, and apply specialized primers to ensure tight, even adhesion.',
      subPoints: ['Scraping, power-washing & hand sanding', 'High-grade flexible acrylic caulk on joints', 'Targeted spot and full priming as needed'],
    },
    {
      number: '02',
      title: 'Clear Communication Throughout the Project',
      icon: MessageSquare,
      description:
        'You will never have to wonder when our crew is arriving, what stage your project is in, or how weather might affect the timeline. We keep you updated at every milestone, from the initial estimate walkthrough to the final walkthrough.',
      subPoints: ['Defined project schedule and start dates', 'Direct phone & email access to Austin', 'Daily progress check-ins on active job sites'],
    },
    {
      number: '03',
      title: 'Respect for the Customer’s Property',
      icon: Home,
      description:
        'Whether we are working in your family living room or painting exterior fascia near your landscaping, we protect your floors, furniture, shrubs, and windows with heavy-duty drop cloths, plastic sheeting, and clean tape lines.',
      subPoints: ['Clean drop cloths and masking on every job', 'Safe ladder placement protecting flowerbeds and gutters', 'Daily tidy-up so your home remains livable'],
    },
    {
      number: '04',
      title: 'Help Selecting Suitable Paint Colors and Finishes',
      icon: Palette,
      description:
        'Selecting paint sheens and undertones can be overwhelming. We guide you through how natural sunlight, room orientation, and exterior architectural elements interact with flat, eggshell, satin, semi-gloss, and gloss finishes.',
      subPoints: ['Guidance on interior sheens for high-traffic rooms', 'Exterior finish recommendations for Nebraska weather', 'Color swatch testing on actual surfaces'],
    },
    {
      number: '05',
      title: 'A Clean, Professional Final Result',
      icon: Sparkles,
      description:
        'Our objective on every project is razor-sharp cut-in lines, smooth and uniform coats without roller laps or brush drag, and a thorough final inspection conducted with you before we consider our job finished.',
      subPoints: ['Uniform color density with no thin spots', 'Crisp transitions between walls, ceilings, and baseboards', 'Complete project walkthrough with the customer'],
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 sm:py-28 bg-[#FAFAFA] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A50918] mb-3">
            <span>Our Service Commitments</span>
            <span aria-hidden="true">·</span>
            <span>Why Choose Larios Painting</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight mb-4">
            The Value of Professional Painting Done Right
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Professional painting is more than applying color to a wall—it is thorough surface preparation, property protection, and dependable service you can trust from start to finish.
          </p>
        </div>

        {/* Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {commitments.map((item, index) => {
            const Icon = item.icon;
            const isFullWidthOnLarge = index === 4; // Fifth item nicely balanced
            return (
              <div
                key={item.number}
                className={`flex flex-col bg-white rounded-xl p-8 border border-neutral-200/90 shadow-2xs hover:shadow-md transition-shadow ${
                  isFullWidthOnLarge ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-[#A50918]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-display text-2xl font-extrabold text-neutral-300">
                    {item.number}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-neutral-900 mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="mt-auto pt-4 border-t border-neutral-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Our standard on every job:
                  </div>
                  <ul className="space-y-1.5">
                    {item.subPoints.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A50918] shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Owner Commitment Quote */}
        <div className="mt-14 p-8 bg-white rounded-xl border border-neutral-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-display text-lg font-bold text-neutral-900 mb-2">
              Our Promise to Homeowners & Business Owners
            </h4>
            <p className="text-sm text-neutral-600 leading-relaxed">
              “When we take on your home or facility, our objective is simple: treat your property with complete care, keep you informed every step of the way, and leave behind clean, smooth, beautiful paintwork.”
            </p>
            <div className="mt-3 text-xs font-bold text-[#A50918]">
              — Austin, Larios Painting
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="#free-estimate"
              className="w-full sm:w-auto text-center px-6 py-3 text-xs font-bold uppercase tracking-wider bg-[#A50918] text-white hover:bg-[#870612] rounded-lg shadow-sm transition-colors"
            >
              Request Free Estimate
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
