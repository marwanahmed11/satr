'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact?: () => void;
}

export function Navbar({ onOpenContact }: NavbarProps) {
  const { lang, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <div className="w-full max-w-6xl flex justify-between items-center pointer-events-auto">
        
        {/* Brand Wordmark */}
        <Link 
          href="/" 
          className="text-[#0C4A6E] font-medium text-lg tracking-[0.18em] flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span>SATR</span>
          <span className="text-xs tracking-normal font-normal opacity-70">
            {lang === 'en' ? 'سطر' : 'SATR'}
          </span>
        </Link>

        {/* Desktop Glass Pill */}
        <nav 
          className={`hidden md:flex items-center gap-5 py-1.5 px-2 ps-5 glass-pill transition-all duration-300 ${
            scrolled ? 'shadow-[0_12px_30px_-10px_rgba(12,74,110,0.25)] bg-[rgba(255,255,255,0.85)]' : ''
          }`}
        >
          <ul className="flex items-center gap-6 text-sm font-normal text-[#0C4A6E]">
            <li>
              <Link href="/work" className="hover:text-[#0EA5E9] transition-colors">
                {t('nav.work')}
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#0EA5E9] transition-colors">
                {t('nav.services')}
              </Link>
            </li>
            <li>
              <Link href="/#stack" className="hover:text-[#0EA5E9] transition-colors">
                {t('nav.stack')}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#0EA5E9] transition-colors">
                {t('nav.process')}
              </Link>
            </li>
          </ul>

          {/* Language Switch */}
          <button 
            onClick={toggleLanguage}
            className="text-xs font-medium text-[#0C4A6E] border border-[#0EA5E9]/30 hover:border-[#0EA5E9] hover:bg-[#0EA5E9]/10 px-3 py-1 rounded-full transition-all cursor-pointer"
            title="Switch Language"
          >
            {t('nav.switch')}
          </button>

          {/* Primary Navy CTA */}
          <Link
            href="/contact"
            onClick={(e) => {
              if (onOpenContact) {
                e.preventDefault();
                onOpenContact();
              }
            }}
            className="btn-navy group"
          >
            <span>{t('nav.cta')}</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={toggleLanguage}
            className="glass-pill px-3 py-1.5 text-xs font-medium text-[#0C4A6E] border border-[#7DD3FC] cursor-pointer"
          >
            {t('nav.switch')}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="glass-pill p-2 text-[#0C4A6E] flex items-center justify-center border border-[#7DD3FC] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-[#0C4A6E]/30 backdrop-blur-xs z-40 md:hidden pointer-events-auto"
        />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-18 p-6 glass-card bg-white/98 border border-[#7DD3FC] pointer-events-auto flex flex-col gap-3 text-center md:hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-50">
          <Link 
            href="/work" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 text-[#0C4A6E] font-medium text-base hover:text-[#0EA5E9] border-b border-[#E0F2FE]"
          >
            {t('nav.work')}
          </Link>
          <Link 
            href="/services" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 text-[#0C4A6E] font-medium text-base hover:text-[#0EA5E9] border-b border-[#E0F2FE]"
          >
            {t('nav.services')}
          </Link>
          <Link 
            href="/#stack" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 text-[#0C4A6E] font-medium text-base hover:text-[#0EA5E9] border-b border-[#E0F2FE]"
          >
            {t('nav.stack')}
          </Link>
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 text-[#0C4A6E] font-medium text-base hover:text-[#0EA5E9] border-b border-[#E0F2FE]"
          >
            {t('nav.process')}
          </Link>
          <Link 
            href="/contact"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenContact) onOpenContact();
            }}
            className="btn-navy justify-center py-3 mt-1 text-sm"
          >
            {t('nav.cta')}
          </Link>
        </div>
      )}
    </header>
  );
}
