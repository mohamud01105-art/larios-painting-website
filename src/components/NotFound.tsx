import React from 'react';
import { Home, ArrowLeft, Phone } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface NotFoundProps {
  onReturnHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onReturnHome }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-6">
        <Logo className="h-16 sm:h-20" />
      </div>

      <div className="w-16 h-16 rounded-full bg-red-50 text-[#A50918] flex items-center justify-center mb-6">
        <span className="font-display text-2xl font-black">404</span>
      </div>

      <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-2">
        Page Not Found
      </h1>

      <p className="text-sm text-neutral-600 max-w-md mb-8">
        The page you are looking for doesn’t exist or has moved. Let’s get you back to our painting services or free estimate request form.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          type="button"
          onClick={onReturnHome}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#A50918] hover:bg-[#870612] rounded-lg transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <a
          href="tel:14025042881"
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
        >
          <Phone className="w-4 h-4 text-[#A50918]" />
          <span>Call (402) 504-2881</span>
        </a>
      </div>
    </div>
  );
};
