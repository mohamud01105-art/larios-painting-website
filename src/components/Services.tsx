import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ServiceItem } from '../types.ts';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'interior',
    title: 'Interior Painting',
    shortDescription: 'Comprehensive painting for walls, ceilings, trim, doors, and other interior surfaces with clean lines and uniform coverage.',
    fullDescription: 'Our interior painting process begins with protecting your flooring and furniture, followed by careful patching, sanding, and caulking before applying premium low-VOC paints.',
    image: '/src/assets/images/service_interior_painting_1793123537050.jpg',
    surfaceDetails: ['Drywall & plaster walls', 'Ceilings & crown molding', 'Baseboards, doors & casings', 'Cabinets & accent walls'],
    popularFor: 'Living spaces, bedrooms, hallways & full home refreshes',
  },
  {
    id: 'exterior',
    title: 'Exterior Painting',
    shortDescription: 'Durable weather-resistant painting for siding, trim, fascia, and other suitable exterior surfaces engineered for Midwest seasons.',
    fullDescription: 'From high-adhesion primers to elastic exterior coatings, we prepare and paint exterior surfaces to withstand Nebraska heat, humidity, freeze-thaw cycles, and winter storms.',
    image: '/projects/52cba5c1-d78b-40e2-aaca-0591643594d0.jpeg',
    surfaceDetails: ['Lap siding, vinyl & wood siding', 'Fascia, soffits & gutters', 'Window frames & exterior trim', 'Entry doors & garage doors'],
    popularFor: 'Full exterior repaints, siding refresh & curb appeal',
  },
  {
    id: 'residential',
    title: 'Residential Painting',
    shortDescription: 'Repainting and refreshing houses and residential properties with courteous crews who treat your home with total respect.',
    fullDescription: 'We specialize in residential repainting projects of all sizes. We coordinate schedules around your family’s routine, keep daily work areas clean, and deliver crisp results.',
    image: '/projects/0de5b990-26f5-4c16-b11a-4d9396ebaa84.jpeg',
    surfaceDetails: ['Single-family homes', 'Townhomes & duplexes', 'Rental property turns', 'New homeowner move-in repaints'],
    popularFor: 'Homeowners seeking dependable craftsmanship',
  },
  {
    id: 'commercial',
    title: 'Commercial Painting',
    shortDescription: 'Professional painting for commercial spaces and businesses, completed efficiently to minimize downtime and disruption.',
    fullDescription: 'We provide structured commercial painting services for offices, retail stores, healthcare facilities, and commercial properties throughout the Omaha-Council Bluffs metro.',
    image: '/src/assets/images/service_commercial_painting_1793123537913.jpg',
    surfaceDetails: ['Offices & corporate suites', 'Retail storefronts & restaurants', 'Multi-tenant commercial buildings', 'Warehouses & light industrial'],
    popularFor: 'Business owners, facility managers & property managers',
  },
  {
    id: 'staining',
    title: 'Painting & Staining',
    shortDescription: 'Expert finish application for suitable surfaces, woodwork, and staining projects that enhance and protect natural wood grain.',
    fullDescription: 'Proper wood preparation, stripping, sanding, and conditioning allow our penetrating stains and protective sealants to bring out rich tones on exterior decks, pergolas, and interior millwork.',
    image: '/src/assets/images/service_wood_staining_1793123538472.jpg',
    surfaceDetails: ['Decks, rails & pergolas', 'Wood fencing & gates', 'Interior wood trim & doors', 'Custom woodwork & stairs'],
    popularFor: 'Decks, timber structures & architectural woodwork',
  },
  {
    id: 'wallpapering',
    title: 'Wallpapering',
    shortDescription: 'Precise wallpaper installation and related services with smooth seam alignment, pattern matching, and surface sizing.',
    fullDescription: 'Wallpapering requires meticulous surface smoothing and exact pattern alignment. We handle prep, sizing, hanging, and edge finishing for residential and commercial spaces.',
    image: '/src/assets/images/service_wallpapering_1793123711735.jpg',
    surfaceDetails: ['Accent walls & feature spaces', 'Powder rooms & dining rooms', 'Commercial wallcoverings', 'Removal & substrate smoothing'],
    popularFor: 'Designer accent walls & decorative residential spaces',
  },
  {
    id: 'pressure-washing',
    title: 'Pressure Washing',
    shortDescription: 'Exterior cleaning where appropriate and safely performed to remove dirt, mildew, and grime as an essential surface preparation step.',
    fullDescription: 'Safe, calibrated pressure washing clears built-up grime, chalking paint, and environmental buildup. Done correctly, it ensures paint adheres tightly to siding, decks, and walkways.',
    image: '/src/assets/images/service_pressure_washing_1793123712013.jpg',
    surfaceDetails: ['Home siding & trim prep', 'Driveways, sidewalks & patios', 'Deck & fence wash before stain', 'Safe pressure calibration per surface'],
    popularFor: 'Pre-paint prep & exterior maintenance',
  },
];

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#FAFAFA] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A50918] mb-3">
            <span>Our Professional Services</span>
            <span aria-hidden="true">·</span>
            <span>Omaha & Lincoln Metro</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight mb-4">
            Interior & Exterior Painting for Homes and Businesses
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            From single-room interior transformations to complete exterior repaints, Larios Painting provides dependable, thorough service with prompt communication and clean work sites.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const isMarquee = index === 0 || index === 1; // interior & exterior marquee cards
            return (
              <div
                key={service.id}
                className="group flex flex-col bg-white rounded-xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Photo container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={service.image}
                    alt={`${service.title} by Larios Painting`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-semibold text-white/90 drop-shadow-xs">
                      {service.popularFor}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-xl font-bold text-neutral-900 group-hover:text-[#A50918] transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  {/* Surface scope list */}
                  <div className="mt-auto pt-4 border-t border-neutral-100 mb-6">
                    <div className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2.5">
                      Scope & Surfaces:
                    </div>
                    <ul className="space-y-1.5">
                      {service.surfaceDetails.map((item, idx) => (
                        <li key={idx} className="flex items-center text-xs text-neutral-600 gap-2">
                          <Check className="w-3.5 h-3.5 text-[#A50918] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-neutral-900 bg-neutral-50 hover:bg-[#A50918] hover:text-white border border-neutral-200 hover:border-[#A50918] rounded-lg transition-colors group/btn"
                  >
                    <span>Request an Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Consultation Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-neutral-900 text-white rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="font-display text-lg sm:text-xl font-bold mb-1">
              Need assistance determining your project scope?
            </h4>
            <p className="text-sm text-neutral-300">
              Austin will walk through your home or commercial space, inspect surface conditions, and provide a clear written estimate.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:14025042881"
              className="w-full sm:w-auto text-center px-5 py-3 text-sm font-bold bg-white text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              (402) 504-2881
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
