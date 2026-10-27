/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Services } from './components/Services.tsx';
import { ProjectGallery } from './components/ProjectGallery.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { EstimateForm } from './components/EstimateForm.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminEstimatesModal } from './components/AdminEstimatesModal.tsx';
import { NotFound } from './components/NotFound.tsx';

export default function App() {
  const [selectedServiceForEstimate, setSelectedServiceForEstimate] = useState<string>('Interior Painting');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [is404, setIs404] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Simple client-side route checking for custom 404
  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '') {
      setIs404(true);
    }
  }, []);

  // Section observer to keep navbar link states in sync
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'our-work', 'why-choose-us', 'free-estimate', 'contact'];
      const scrollY = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenEstimate = () => {
    const el = document.getElementById('free-estimate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCard = (serviceTitle: string) => {
    setSelectedServiceForEstimate(serviceTitle);
    const el = document.getElementById('free-estimate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (is404) {
    return (
      <NotFound
        onReturnHome={() => {
          window.history.pushState({}, '', '/');
          setIs404(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-[#A50918] selection:text-white">
      {/* Sticky Navigation */}
      <Navbar
        onOpenEstimate={handleOpenEstimate}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenEstimate={handleOpenEstimate} />

        {/* Services Section */}
        <Services onSelectService={handleSelectServiceFromCard} />

        {/* Project Gallery */}
        <ProjectGallery />

        {/* Why Choose Larios Painting (Service Commitments) */}
        <WhyChooseUs />

        {/* Free Estimate Form (Functional Full-Stack Backend Connected) */}
        <EstimateForm initialService={selectedServiceForEstimate} />

        {/* Direct Contact & Service Areas */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenEstimate={handleOpenEstimate}
      />

      {/* Admin Submissions Inspector for Austin / Review */}
      <AdminEstimatesModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
