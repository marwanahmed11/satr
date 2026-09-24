'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export function ClosingCTA({ onOpenContact }: { onOpenContact?: () => void }) {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-6xl mx-auto px-6">
        
        <div className="relative rounded-[24px] bg-gradient-to-br from-[#0C4A6E] via-[#0369A1] to-[#0EA5E9] py-20 px-8 text-center text-white overflow-hidden shadow-[0_25px_50px_-15px_rgba(12,74,110,0.45)]">
          
          {/* Two thin 3D orbiting rings in opposite directions */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none [perspective:900px] overflow-hidden">
            <div className="w-[600px] h-[600px] rounded-full border border-[#BAE6FD]/30 animate-orbit-1" />
            <div className="w-[800px] h-[800px] rounded-full border border-dashed border-[#BAE6FD]/20 animate-orbit-2" />
          </div>

          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight mb-4">
              {t('cta.heading')}
            </h2>
            <p className="text-lg sm:text-xl text-[#BAE6FD] mb-8 font-normal">
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
              className="inline-flex items-center gap-2 bg-white text-[#0C4A6E] font-medium text-base px-8 py-3.5 rounded-full hover:shadow-[0_16px_30px_-8px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>{t('cta.button')}</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
