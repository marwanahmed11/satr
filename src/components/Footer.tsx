'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-white border-t border-[#E0F2FE] pt-12 sm:pt-16 pb-8 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 sm:gap-6 text-sm text-[#3F7FA8] mb-8 sm:mb-12">
          
          <div>
            <a 
              href="mailto:hello@satr.tech" 
              className="font-medium text-[#0C4A6E] hover:text-[#0EA5E9] transition-colors"
            >
              hello@satr.tech
            </a>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center text-xs sm:text-sm">
            <Link href="/work" className="hover:text-[#0EA5E9] transition-colors">
              {t('nav.work')}
            </Link>
            <span className="opacity-40">·</span>
            <Link href="/services" className="hover:text-[#0EA5E9] transition-colors">
              {t('nav.services')}
            </Link>
            <span className="opacity-40">·</span>
            <Link href="/about" className="hover:text-[#0EA5E9] transition-colors">
              {t('nav.process')}
            </Link>
            <span className="opacity-40">·</span>
            <Link href="/contact" className="hover:text-[#0EA5E9] transition-colors">
              {t('nav.contact')}
            </Link>
          </div>

          <div className="flex items-center gap-3.5 sm:gap-6 flex-wrap justify-center text-xs sm:text-sm">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#0C4A6E] hover:text-[#0EA5E9] transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#0C4A6E] hover:text-[#0EA5E9] transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://behance.net" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#0C4A6E] hover:text-[#0EA5E9] transition-colors"
            >
              Behance
            </a>
            <span className="text-[#0C4A6E] font-medium">
              {t('footer.location')}
            </span>
          </div>

        </div>

        {/* Giant 3D Extruded SATR Wordmark */}
        <div className="relative w-full text-center py-4 sm:py-6 select-none overflow-hidden">
          <span 
            data-text="SATR" 
            className="giant-satr-text leading-[0.8]"
          >
            SATR
          </span>
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 sm:pt-8 border-t border-[#E0F2FE] text-xs text-[#3F7FA8] text-center">
          <span>{t('footer.copy')}</span>
          <span className="font-mono text-[#0EA5E9]">EST. 2026</span>
        </div>

      </div>
    </footer>
  );
}
