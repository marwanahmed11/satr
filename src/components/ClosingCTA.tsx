'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function ClosingCTA({ onOpenContact }: { onOpenContact?: () => void }) {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="relative rounded-2xl sm:rounded-[24px] bg-gradient-to-br from-[#0C4A6E] via-[#0369A1] to-[#0EA5E9] py-10 sm:py-16 px-4 min-[390px]:px-6 sm:px-10 text-center text-white overflow-hidden shadow-[0_20px_45px_-15px_rgba(12,74,110,0.45)]">
          
          {/* Two thin 3D orbiting rings in opposite directions, scaled responsively */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none [perspective:900px] overflow-hidden">
            <div className="w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] md:w-[620px] md:h-[620px] rounded-full border border-[#BAE6FD]/30 animate-orbit-1" />
            <div className="w-[480px] h-[480px] sm:w-[680px] sm:h-[680px] md:w-[800px] md:h-[800px] rounded-full border border-dashed border-[#BAE6FD]/20 animate-orbit-2" />
          </div>

          <div className="relative z-10 max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-3 sm:mb-4">
              {t('cta.heading')}
            </h2>
            <p className="text-base sm:text-lg text-[#BAE6FD] mb-6 sm:mb-8 font-normal leading-relaxed">
              {t('cta.sub')}
            </p>
            
            <Link
              href="/contact"
              onClick={(e) => {
                if (onOpenContact) {
                  e.preventDefault();
                  onOpenContact();
                }
              }}
              className="inline-flex items-center gap-2 bg-white text-[#0C4A6E] font-medium text-sm sm:text-base px-7 sm:px-8 py-3 sm:py-3.5 rounded-full hover:shadow-[0_16px_30px_-8px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>{t('cta.button')}</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
