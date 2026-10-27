import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface NavbarProps {
  onOpenEstimate: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Our Work', href: '#our-work' },
    { name: 'About', href: '#why-choose-us' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-md shadow-md border-b border-neutral-200 py-2 sm:py-2.5'
            : 'bg-white border-b border-neutral-200 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 md:gap-8">
            {/* Zone 1: Official Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A50918] rounded-md shrink-0 py-0.5"
              aria-label="Larios Painting Home"
            >
              <Logo className="h-13 sm:h-16 md:h-18 lg:h-20" />
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-neutral-700">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`whitespace-nowrap transition-colors hover:text-[#A50918] py-1 relative ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-[#A50918]'
                      : 'text-neutral-700'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Zone 3: Direct Phone & Primary Estimate Button */}
            <div className="hidden sm:flex items-center gap-4 shrink-0">
              <a
                href="tel:14025042881"
                className="flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-[#A50918] transition-colors py-2 px-3 rounded-lg border border-neutral-200 hover:border-neutral-300"
                aria-label="Call Larios Painting at (402) 504-2881"
              >
                <Phone className="w-4 h-4 text-[#A50918]" />
                <span className="whitespace-nowrap">(402) 504-2881</span>
              </a>

              <button
                type="button"
                onClick={onOpenEstimate}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#A50918] hover:bg-[#870612] active:bg-[#70040e] transition-colors rounded-lg shadow-sm whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A50918]"
              >
                <span>Get a Free Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:14025042881"
                className="sm:hidden p-2 text-neutral-800 hover:text-[#A50918] transition-colors rounded-lg border border-neutral-200"
                aria-label="Call (402) 504-2881"
              >
                <Phone className="w-5 h-5 text-[#A50918]" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-800 hover:text-[#A50918] focus:outline-none focus:ring-2 focus:ring-[#A50918] rounded-lg"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2.5 rounded-lg text-base font-semibold text-neutral-800 hover:bg-neutral-50 hover:text-[#A50918] transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2.5">
                <a
                  href="tel:14025042881"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-[#111111] text-neutral-900 font-bold hover:bg-neutral-50"
                >
                  <Phone className="w-4 h-4 text-[#A50918]" />
                  <span>Call (402) 504-2881</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEstimate();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#A50918] text-white font-bold hover:bg-[#870612] shadow-sm"
                >
                  <span>Get a Free Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Persistent Mobile Bottom Action Bar (Capped under 15% mobile viewport height per guideline) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-2.5 shadow-lg flex items-center gap-3">
        <a
          href="tel:14025042881"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-900 text-xs font-bold active:bg-neutral-100"
        >
          <Phone className="w-3.5 h-3.5 text-[#A50918]" />
          <span>Call (402) 504-2881</span>
        </a>
        <button
          type="button"
          onClick={onOpenEstimate}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#A50918] text-white text-xs font-bold active:bg-[#870612] shadow-sm"
        >
          <span>Free Estimate</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </>
  );
};
