import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenEstimate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenEstimate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t border-neutral-900 pb-20 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand & Bio (Spans 2 columns) */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <Logo variant="light" className="h-16 sm:h-20" showSubtitle />
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mb-6">
              Professional interior and exterior painting services for residential and commercial properties throughout Omaha, Nebraska; Lincoln, Nebraska; Council Bluffs, Iowa; and surrounding communities.
            </p>

            <div className="space-y-2 text-xs text-neutral-300">
              <a
                href="tel:14025042881"
                className="flex items-center gap-2 hover:text-[#E53E3E] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#A50918] shrink-0" />
                <span>(402) 504-2881</span>
              </a>
              <a
                href="mailto:Austin@lariospaintingco.com"
                className="flex items-center gap-2 hover:text-[#E53E3E] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#A50918] shrink-0" />
                <span>Austin@lariospaintingco.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-4 border-b border-neutral-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Painting Services
                </a>
              </li>
              <li>
                <a href="#our-work" className="hover:text-white transition-colors">
                  Project Gallery
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Locations
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenEstimate}
                  className="text-[#E53E3E] font-bold hover:underline"
                >
                  Request Free Estimate
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Painting Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-4 border-b border-neutral-800 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Interior Painting
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Exterior Painting
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Residential Painting
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Commercial Painting
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Painting & Staining
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Wallpapering
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Pressure Washing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Areas & Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-4 border-b border-neutral-800 pb-2">
              Service Areas
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400 mb-6">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A50918] shrink-0" />
                <span>Omaha, NE</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A50918] shrink-0" />
                <span>Lincoln, NE</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A50918] shrink-0" />
                <span>Council Bluffs, IA</span>
              </li>
              <li className="text-[11px] text-neutral-500 pt-1">
                + Bellevue, Papillion, Gretna, Elkhorn, La Vista & surrounding communities
              </li>
            </ul>

            <h5 className="text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-2">
              Follow Our Work
            </h5>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/people/Larios-Painting/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                aria-label="Larios Painting on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/lariospainting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                aria-label="Larios Painting on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Larios Painting. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Owner Portal (Estimates Log)
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
