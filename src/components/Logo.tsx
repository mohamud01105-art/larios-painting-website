import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-14 sm:h-18 md:h-20',
  variant = 'auto',
  showSubtitle = false,
}) => {
  // Official supplied Larios Painting Logo
  // Local asset path uploaded by the user:
  const logoSrc = '/assets/aistudio/dce0e853-e90a-4de6-b042-801169623cad_076f6ff2.jpeg';

  const isDarkBackground = variant === 'light'; // when placed on dark surfaces like footer

  if (isDarkBackground) {
    return (
      <div className="inline-flex flex-col items-start select-none">
        <div className="bg-white p-2 rounded-xl shadow-xs border border-white/20 inline-block transition-transform duration-150 hover:scale-[1.02]">
          <img
            src={logoSrc}
            alt="Larios Painting"
            className={`${className} w-auto object-contain block`}
            loading="eager"
          />
        </div>
        {showSubtitle && (
          <span className="mt-2 text-[11px] font-bold tracking-widest uppercase text-neutral-400">
            Residential & Commercial Painting
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 select-none">
      <img
        src={logoSrc}
        alt="Larios Painting"
        className={`${className} w-auto object-contain transition-transform duration-150 hover:scale-[1.02]`}
        loading="eager"
      />
      {showSubtitle && (
        <span className="hidden sm:inline-block text-xs uppercase tracking-wider font-semibold text-neutral-500 border-l border-neutral-300 pl-3">
          Residential & Commercial
        </span>
      )}
    </div>
  );
};
