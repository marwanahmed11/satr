'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Hero3D } from '@/components/Hero3D';
import { FloatingNotification } from '@/components/FloatingNotification';
import { DivisionLine } from '@/components/DivisionLine';
import { ClientStrip } from '@/components/ClientStrip';
import { WhatWeBuild } from '@/components/WhatWeBuild';
import { TheWholeStack } from '@/components/TheWholeStack';
import { StatsBand } from '@/components/StatsBand';
import { SelectedWork } from '@/components/SelectedWork';
import { HowWeWork } from '@/components/HowWeWork';
import { ClosingCTA } from '@/components/ClosingCTA';
import { Footer } from '@/components/Footer';
import { ProjectModal } from '@/components/ProjectModal';
import { ArrowRight } from 'lucide-react';

const enWords = ['website', 'mobile app', 'SaaS', 'CRM', 'AI assistant', 'idea'];
const arWords = ['موقعك', 'تطبيقك', 'منصتك السحابية', 'نظامك الداخلي', 'مساعدك الذكي', 'فكرتك'];

export default function HomePage() {
  const { lang, t } = useLanguage();
  
  // Rotating word state
  const [wordIdx, setWordIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
  // Idea box state
  const [ideaText, setIdeaText] = useState('');
  const [ideaFeedback, setIdeaFeedback] = useState<{ text: string; isError: boolean } | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passedIdea, setPassedIdea] = useState('');

  const words = lang === 'ar' ? arWords : enWords;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % words.length);
        setIsFading(false);
      }, 300);
    }, 1800);
    return () => clearInterval(interval);
  }, [words.length]);

  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim()) {
      setIdeaFeedback({
        text: t('hero.empty_error'),
        isError: true,
      });
      return;
    }

    setIdeaFeedback({
      text: t('hero.success_msg'),
      isError: false,
    });

    // Store lead
    const existing = JSON.parse(localStorage.getItem('satr_quick_ideas') || '[]');
    existing.push({ idea: ideaText, date: new Date().toISOString() });
    localStorage.setItem('satr_quick_ideas', JSON.stringify(existing));

    setPassedIdea(ideaText);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 800);
  };

  return (
    <main className="min-h-screen relative bg-white overflow-hidden">
      
      {/* 4.1 HERO */}
      <section className="relative min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] via-[#F5FAFF] to-white pt-24 pb-4 overflow-hidden">
        
        {/* Three.js Background Sculpture */}
        <Hero3D />

        {/* Floating Notification */}
        <FloatingNotification />

        {/* Top Sticky Navbar */}
        <Navbar onOpenContact={() => setIsModalOpen(true)} />

        {/* Hero Body Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 flex-1 flex items-center">
          <div className="max-w-[540px] animate-in fade-in slide-in-from-bottom-4 duration-900 delay-200">
            
            {/* Live Glass Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 glass-pill text-xs font-medium text-[#0C4A6E] mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#0EA5E9]" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0EA5E9]" />
              </span>
              <span>{t('hero.badge')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[80px] font-medium tracking-[-0.05em] leading-[1.0] text-[#0C4A6E] mb-5">
              <span>{t('hero.title_p1')}</span><br />
              <span>{t('hero.title_p2')}</span>{' '}
              <span className="text-[#0EA5E9]">{t('hero.title_line')}</span>
              <span className="text-[#0EA5E9] font-light animate-blink">_</span>
            </h1>

            {/* Sub-line with rotating word */}
            <p className="text-lg sm:text-xl text-[#3F7FA8] leading-relaxed mb-8">
              <span>{t('hero.sub_prefix')} </span>
              <span 
                className={`inline-block font-medium text-[#0EA5E9] border-b-[1.5px] border-[#0EA5E9] transition-all duration-300 ${
                  isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
                }`}
              >
                {words[wordIdx]}
              </span>{' '}
              <span>{t('hero.sub_suffix')}</span>
            </p>

            {/* Idea Box (Glass Pill with Sky Glow) */}
            <form onSubmit={handleIdeaSubmit} className="max-w-md relative">
              <div className="glass-pill flex items-center p-1.5 ps-5 bg-white/85 focus-within:bg-white focus-within:border-[#0EA5E9] shadow-[0_14px_30px_-14px_rgba(14,165,233,0.6)] transition-all">
                <input
                  type="text"
                  value={ideaText}
                  onChange={(e) => {
                    setIdeaText(e.target.value);
                    if (ideaFeedback) setIdeaFeedback(null);
                  }}
                  placeholder={t('hero.input_placeholder')}
                  className="flex-1 min-w-0 bg-transparent border-none outline-none text-[#0C4A6E] placeholder-[#94A3B8] text-sm sm:text-base font-normal"
                />
                <button
                  type="submit"
                  className="btn-primary py-2.5 px-5 text-xs sm:text-sm whitespace-nowrap"
                >
                  <span>{t('hero.build_btn')}</span>
                </button>
              </div>

              {/* Feedback Message */}
              {ideaFeedback && (
                <p 
                  className={`text-xs mt-2 px-4 font-medium transition-all ${
                    ideaFeedback.isError ? 'text-[#B42318]' : 'text-[#0C4A6E]'
                  }`}
                >
                  {ideaFeedback.text}
                </p>
              )}
            </form>

          </div>
        </div>

        {/* Division Line along the bottom of the hero */}
        <DivisionLine />

      </section>

      {/* 4.2 CLIENT LOGO STRIP */}
      <ClientStrip />

      {/* 4.3 WHAT WE BUILD */}
      <WhatWeBuild />

      {/* 4.4 THE WHOLE STACK */}
      <TheWholeStack onOpenContact={() => setIsModalOpen(true)} />

      {/* 4.5 STATS BAND */}
      <StatsBand />

      {/* 4.6 SELECTED WORK */}
      <SelectedWork />

      {/* 4.7 HOW WE WORK */}
      <HowWeWork />

      {/* 4.8 CLOSING CALL TO ACTION */}
      <ClosingCTA onOpenContact={() => setIsModalOpen(true)} />

      {/* 4.9 FOOTER */}
      <Footer />

      {/* Interactive Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIdea={passedIdea}
      />

    </main>
  );
}
