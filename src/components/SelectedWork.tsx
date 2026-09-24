'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, ArrowUpRight, ShieldCheck, Zap, Activity } from 'lucide-react';

interface WorkCardItem {
  slug: string;
  topicKey: string;
  tagsKey: string;
  titleKey: string;
  browserUrl: string;
  gradientClass: string;
  textColorClass: string;
  subtextColorClass: string;
  browserHeaderBg: string;
  borderColorClass: string;
  renderMockupContent: () => React.ReactNode;
}

export function SelectedWork() {
  const { t } = useLanguage();

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 900) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
  };

  const handleResetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  const cards: WorkCardItem[] = [
    // Card 1: Fintech & Banking
    {
      slug: 'fintech-banking-platform',
      topicKey: 'work.card1.topic',
      tagsKey: 'work.card1.tags',
      titleKey: 'work.card1.title',
      browserUrl: 'core.apex-fintech.io',
      gradientClass: 'from-[#0C4A6E] via-[#0369A1] to-[#0EA5E9]',
      textColorClass: 'text-white',
      subtextColorClass: 'text-[#BAE6FD]',
      browserHeaderBg: 'bg-[#F8FAFC]',
      borderColorClass: 'border-[#38BDF8]/40',
      renderMockupContent: () => (
        <div className="h-44 p-3.5 bg-[#F0F9FF] flex flex-col justify-between">
          <div className="flex items-center justify-between bg-white rounded-lg p-2.5 border border-[#BAE6FD]/60 shadow-2xs">
            <div>
              <span className="text-[10px] text-[#3F7FA8] font-mono block">TOTAL SETTLEMENT</span>
              <span className="text-xs font-semibold text-[#0C4A6E] font-mono">$12,480,200.00</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#E0F2FE] text-[#0EA5E9] flex items-center justify-center">
              <ShieldCheck size={14} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white rounded-md p-2 border border-[#E0F2FE]">
              <div className="h-1.5 w-8 bg-[#0EA5E9] rounded-full mb-1.5" />
              <div className="h-1 w-full bg-[#E0F2FE] rounded-full" />
            </div>
            <div className="bg-white rounded-md p-2 border border-[#E0F2FE]">
              <div className="h-1.5 w-8 bg-[#0369A1] rounded-full mb-1.5" />
              <div className="h-1 w-full bg-[#E0F2FE] rounded-full" />
            </div>
            <div className="bg-white rounded-md p-2 border border-[#E0F2FE]">
              <div className="h-1.5 w-8 bg-[#7DD3FC] rounded-full mb-1.5" />
              <div className="h-1 w-full bg-[#E0F2FE] rounded-full" />
            </div>
          </div>
        </div>
      ),
    },
    // Card 2: Retail & Commerce
    {
      slug: 'retail-commerce-platform',
      topicKey: 'work.card2.topic',
      tagsKey: 'work.card2.tags',
      titleKey: 'work.card2.title',
      browserUrl: 'store.velvet-goods.com',
      gradientClass: 'from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC]',
      textColorClass: 'text-[#0C4A6E]',
      subtextColorClass: 'text-[#0369A1]',
      browserHeaderBg: 'bg-[#F8FAFC]',
      borderColorClass: 'border-white/60',
      renderMockupContent: () => (
        <div className="h-44 p-3.5 bg-[#F5FAFF] flex gap-2.5">
          <div className="flex-1 bg-white rounded-lg p-2.5 border border-[#BAE6FD] flex flex-col justify-between shadow-2xs">
            <div className="h-2 w-12 bg-[#0369A1] rounded-full" />
            <div className="h-16 rounded bg-[#E0F2FE]" />
            <div className="h-3 w-full bg-[#0EA5E9] rounded-md text-[8px] text-white flex items-center justify-center font-mono">
              ADD TO CART
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg p-2.5 border border-[#BAE6FD] flex flex-col justify-between shadow-2xs">
            <div className="h-2 w-12 bg-[#0EA5E9] rounded-full" />
            <div className="h-16 rounded bg-[#E0F2FE]" />
            <div className="h-3 w-full bg-[#0C4A6E] rounded-md text-[8px] text-white flex items-center justify-center font-mono">
              EXPRESS BUY
            </div>
          </div>
        </div>
      ),
    },
    // Card 3: Enterprise AI & Telemetry
    {
      slug: 'saas-analytics-engine',
      topicKey: 'work.card3.topic',
      tagsKey: 'work.card3.tags',
      titleKey: 'work.card3.title',
      browserUrl: 'app.neural-stream.ai',
      gradientClass: 'from-[#0EA5E9] via-[#38BDF8] to-[#BAE6FD]',
      textColorClass: 'text-[#0C4A6E]',
      subtextColorClass: 'text-[#0C4A6E]/80',
      browserHeaderBg: 'bg-[#F8FAFC]',
      borderColorClass: 'border-white/70',
      renderMockupContent: () => (
        <div className="h-44 p-3.5 bg-[#F0F9FF] flex flex-col justify-between">
          <div className="flex items-center justify-between bg-white rounded-lg p-2.5 border border-[#BAE6FD] shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-[10px] text-[#0C4A6E] font-mono">AI AGENT STREAM ACTIVE</span>
            </div>
            <Activity size={14} className="text-[#0EA5E9]" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 rounded-full bg-white p-0.5 border border-[#BAE6FD]">
              <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-[#0C4A6E] to-[#0EA5E9]" />
            </div>
            <div className="flex justify-between text-[9px] font-mono text-[#3F7FA8]">
              <span>Inference: 18ms</span>
              <span>42k tokens/s</span>
            </div>
          </div>
          <div className="h-7 bg-white rounded-md border border-[#E0F2FE] p-1.5 flex items-center gap-1.5">
            <Zap size={12} className="text-[#0EA5E9]" />
            <span className="text-[9px] text-[#0C4A6E] font-mono">Automated workflow triggered</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#F5FAFF] via-white to-white" id="work">
      <div className="w-full max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="section-label">{t('work.label')}</span>
            <h2 className="section-heading mb-0">{t('work.heading')}</h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0EA5E9] hover:text-[#0369A1] transition-colors"
          >
            <span>{t('work.view_all')}</span>
          </Link>
        </div>

        {/* 3 Resized Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link key={card.slug} href={`/work/${card.slug}`} className="block group">
              <div
                onMouseMove={handleTilt}
                onMouseLeave={handleResetTilt}
                className={`rounded-2xl overflow-hidden p-6 sm:p-7 pb-0 min-h-[430px] flex flex-col justify-between bg-gradient-to-br ${card.gradientClass} ${card.textColorClass} border ${card.borderColorClass} shadow-[0_18px_30px_-22px_rgba(12,74,110,0.45)] hover:shadow-[0_28px_50px_-20px_rgba(12,74,110,0.55)] transition-all duration-300 [perspective:900px]`}
              >
                <div>
                  {/* Topic badge */}
                  <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-mono uppercase tracking-wider mb-3">
                    <span>{t(card.topicKey)}</span>
                  </div>

                  <span className={`font-mono text-[11px] uppercase tracking-wider ${card.subtextColorClass} block mb-1.5`}>
                    {t(card.tagsKey)}
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight">
                    {t(card.titleKey)}
                  </h3>
                </div>

                {/* 3D Tilted Mockup Screen */}
                <div 
                  style={{ transform: 'rotateX(18deg)', transformOrigin: 'bottom center' }}
                  className="relative mt-6 rounded-t-xl bg-white shadow-xl overflow-hidden border border-white/60 group-hover:rotate-x-[10deg] group-hover:-translate-y-2 transition-transform duration-500 ease-out"
                >
                  {/* Browser top bar */}
                  <div className={`${card.browserHeaderBg} px-3 py-2 flex items-center justify-between border-b border-[#E2E8F0]`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                      <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                      <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                    </div>
                    <span className="text-[9px] text-[#94A3B8] font-mono">{card.browserUrl}</span>
                    <ArrowUpRight size={12} className="text-[#94A3B8] group-hover:text-[#0EA5E9] transition-colors" />
                  </div>
                  
                  {/* Card mockup content */}
                  {card.renderMockupContent()}
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
