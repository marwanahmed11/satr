'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Menu, 
  X, 
  Globe, 
  Sparkles, 
  Layers, 
  FolderKanban, 
  Compass
} from 'lucide-react';

interface NavbarProps {
  onOpenContact?: () => void;
}

export function Navbar({ onOpenContact }: NavbarProps) {
  const { lang, toggleLanguage, t } = useLanguage();
  const isRTL = lang === 'ar';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    {
      num: '01',
      title: t('nav.work'),
      sub: isRTL ? 'المشاريع والمنصات المنفذة' : 'Selected Products & Case Studies',
      href: '/work',
      icon: <FolderKanban size={18} />,
      badge: null,
    },
    {
      num: '02',
      title: t('nav.services'),
      sub: isRTL ? '٧ أقسام تقنية وهندسية متخصصة' : '7 Engineering & Design Divisions',
      href: '/services',
      icon: <Layers size={18} />,
      badge: null,
    },
    {
      num: '03',
      title: t('nav.stack'),
      sub: isRTL ? 'معمارية الحزمة المتكاملة ثلاثية الأبعاد' : 'Interactive 3D Layer Architecture',
      href: '/#stack',
      icon: <Sparkles size={18} />,
      badge: '3D',
    },
    {
      num: '04',
      title: t('nav.process'),
      sub: isRTL ? 'منهجية العمل ومعايير الجودة' : '5-Step Architectural Delivery',
      href: '/about',
      icon: <Compass size={18} />,
      badge: null,
    },
  ];

  const quickDivisions = [
    { name: isRTL ? 'ويب' : 'Web', href: '/services/web' },
    { name: isRTL ? 'تطبيقات' : 'Mobile', href: '/services/mobile' },
    { name: 'SaaS', href: '/services/saas' },
    { name: 'AI', href: '/services/ai' },
    { name: isRTL ? 'سحابة' : 'Cloud', href: '/services/cloud' },
  ];

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <div className="w-full max-w-6xl flex justify-between items-center pointer-events-auto">
          
          {/* Brand Wordmark */}
          <Link 
            href="/" 
            className="text-[#0C4A6E] font-medium text-lg tracking-[0.18em] flex items-center gap-2 hover:opacity-90 transition-opacity bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-2xs"
          >
            <span className="font-bold tracking-wider">SATR</span>
            <span className="h-3 w-px bg-[#BAE6FD]" />
            <span className="text-xs tracking-normal font-normal text-[#0EA5E9]">
              {lang === 'en' ? 'سطر' : 'SATR'}
            </span>
          </Link>

          {/* Desktop Glass Pill */}
          <nav 
            className={`hidden md:flex items-center gap-5 py-1.5 px-2 ps-5 glass-pill transition-all duration-300 ${
              scrolled ? 'shadow-[0_12px_30px_-10px_rgba(12,74,110,0.25)] bg-[rgba(255,255,255,0.88)]' : ''
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

          {/* Mobile Bar Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={toggleLanguage}
              className="glass-pill px-3 py-1.5 text-xs font-semibold text-[#0C4A6E] border border-[#7DD3FC]/80 shadow-2xs cursor-pointer flex items-center gap-1 active:scale-95 transition-transform"
            >
              <Globe size={13} className="text-[#0EA5E9]" />
              <span>{t('nav.switch')}</span>
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`glass-pill w-10 h-10 text-[#0C4A6E] flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-2xs active:scale-95 ${
                mobileMenuOpen 
                  ? 'border-[#0EA5E9] bg-white text-[#0EA5E9] rotate-90 shadow-[0_0_15px_rgba(14,165,233,0.3)]' 
                  : 'border-[#7DD3FC]/80'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================
          ULTRA-PREMIUM MOBILE DRAWER MODAL
         ======================================================== */}
      {/* Backdrop */}
      <div 
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 bg-[#082F49]/45 backdrop-blur-md z-50 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Luxury Island Sheet */}
      <div 
        className={`fixed inset-x-3 sm:inset-x-6 top-3 bottom-3 z-50 md:hidden flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border border-[#BAE6FD] shadow-[0_25px_70px_-15px_rgba(12,74,110,0.38),0_0_40px_rgba(14,165,233,0.18)] transition-all duration-300 overflow-y-auto ${
          mobileMenuOpen 
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' 
            : '-translate-y-8 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div>
          {/* Sheet Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E0F2FE]">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                S
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-wider text-[#0C4A6E]">SATR</span>
                  <span className="text-[10px] font-mono text-[#0EA5E9] px-1.5 py-0.5 rounded-full bg-[#E0F2FE]">
                    STUDIO
                  </span>
                </div>
                <span className="text-[10px] text-[#3F7FA8] block leading-none">
                  {lang === 'ar' ? 'معمارية الحلول الرقمية' : 'Digital Architecture'}
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-full bg-[#F0F9FF] hover:bg-[#E0F2FE] text-[#0C4A6E] flex items-center justify-center border border-[#BAE6FD] transition-colors cursor-pointer active:scale-95"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links with Numbers & Subtitles */}
          <div className="py-3 flex flex-col gap-1.5">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-[#BAE6FD] hover:bg-[#F0F9FF] active:bg-[#E0F2FE] transition-all duration-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-[#0EA5E9] flex items-center justify-center group-hover:bg-[#0EA5E9] group-hover:text-white transition-all duration-200 shrink-0 shadow-2xs">
                    {item.icon}
                  </div>
                  <div className="text-left rtl:text-right min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#0EA5E9] font-bold">
                        {item.num}
                      </span>
                      <span className="text-base font-semibold text-[#0C4A6E] group-hover:text-[#0EA5E9] transition-colors">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded-full bg-[#E0F2FE] text-[#0284C7] font-mono text-[9px] font-medium border border-[#BAE6FD]/80">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#3F7FA8] block truncate mt-0.5">
                      {item.sub}
                    </span>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-[#F0F9FF] group-hover:bg-[#0EA5E9] text-[#0EA5E9] group-hover:text-white flex items-center justify-center transition-all shrink-0 ms-2">
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform rtl:rotate-90 rtl:group-hover:-translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Division Chips */}
          <div className="pt-2 pb-2 border-t border-[#E0F2FE]">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#3F7FA8] font-semibold">
                {lang === 'ar' ? 'أقسامنا الهندسية:' : 'SPECIALIZED DIVISIONS:'}
              </span>
              <Link 
                href="/services" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[10px] font-mono text-[#0EA5E9] hover:underline"
              >
                {lang === 'ar' ? 'عرض الكل ←' : 'View all 7 →'}
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {quickDivisions.map((div) => (
                <Link
                  key={div.name}
                  href={div.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-[#0C4A6E] hover:bg-[#0EA5E9] hover:text-white hover:border-[#0EA5E9] text-xs font-medium transition-all shadow-2xs"
                >
                  {div.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sheet Footer: High-Impact CTA & Status */}
        <div className="pt-3 border-t border-[#E0F2FE] flex flex-col gap-2.5">
          {/* Main CTA */}
          <Link
            href="/contact"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenContact) onOpenContact();
            }}
            className="btn-primary w-full py-3.5 justify-center text-sm shadow-[0_10px_25px_-5px_rgba(14,165,233,0.5)] active:scale-[0.98] transition-transform font-medium"
          >
            <span>{t('nav.cta')}</span>
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>

          {/* Bottom Meta & Language Switch */}
          <div className="flex items-center justify-between text-xs pt-1 px-1">
            <div className="flex items-center gap-1.5 text-[#0369A1] font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span>{lang === 'ar' ? 'متاح لمشاريع Q4/Q1' : 'Now booking Q4/Q1'}</span>
            </div>

            <button
              onClick={() => {
                toggleLanguage();
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0C4A6E] hover:bg-[#E0F2FE] text-[11px] font-medium transition-colors cursor-pointer"
            >
              <Globe size={11} className="text-[#0EA5E9]" />
              <span>{t('nav.switch')}</span>
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
