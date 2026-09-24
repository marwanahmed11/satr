'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Server, Brackets, Palette, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function TheWholeStack({ onOpenContact }: { onOpenContact?: () => void }) {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<'design' | 'code' | 'infra' | null>(null);

  return (
    <section className="py-28 bg-gradient-to-b from-white via-[#F5FAFF] to-white overflow-hidden" id="stack">
      <div className="w-full max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text */}
          <div className="lg:col-span-5 max-w-lg">
            <span className="section-label">{t('stack.label')}</span>
            <h2 className="section-heading">{t('stack.heading')}</h2>
            <p className="text-[#3F7FA8] text-base sm:text-lg mb-8 leading-relaxed">
              {t('stack.text')}
            </p>

            <div className="p-4 rounded-2xl bg-[#E0F2FE]/50 border border-[#BAE6FD] mb-8">
              <span className="font-mono text-xs text-[#0369A1] uppercase tracking-wider block font-medium mb-1">
                INTERACTIVE SYSTEM ARCHITECTURE
              </span>
              <p className="text-xs text-[#0C4A6E] leading-relaxed">
                Click any layer on the right to enter its specialized division and technical specifications.
              </p>
            </div>
            
            <Link
              href="/contact"
              onClick={(e) => {
                if (onOpenContact) {
                  e.preventDefault();
                  onOpenContact();
                }
              }}
              className="btn-primary"
            >
              <span>{t('cta.button')}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right Column: CSS 3D Isometric Stack with Wide Spacing & Direct Links */}
          <div className="lg:col-span-7 relative h-[480px] sm:h-[540px] flex items-center justify-center [perspective:1400px]">
            
            <div 
              style={{
                transform: 'rotateX(56deg) rotateZ(-36deg)',
              }}
              className="relative w-[320px] sm:w-[360px] h-[210px] [transform-style:preserve-3d] transition-transform duration-700 ease-out"
            >
              
              {/* ===================================================
                  Layer 1 (Bottom): INFRASTRUCTURE -> /services/cloud
                 =================================================== */}
              <Link
                href="/services/cloud"
                onMouseEnter={() => setHoveredCard('infra')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: hoveredCard === 'infra' 
                    ? 'translateZ(10px) scale(1.03)' 
                    : 'translateZ(0px)',
                }}
                className="absolute inset-0 rounded-2xl bg-[#0C4A6E] border-2 border-[#BAE6FD]/40 p-6 flex flex-col justify-between text-[#BAE6FD] shadow-[0_35px_50px_-15px_rgba(12,74,110,0.65)] hover:border-[#38BDF8] hover:shadow-[0_45px_65px_-15px_rgba(12,74,110,0.8)] transition-all duration-400 ease-out group cursor-pointer"
                title="Enter Cloud & Infrastructure Division"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[11px] text-[#7DD3FC] tracking-wider uppercase block">
                      LAYER 01 · FOUNDATION
                    </span>
                    <span className="text-xl font-medium text-white tracking-tight block mt-0.5 group-hover:text-[#BAE6FD] transition-colors">
                      {t('stack.infra')}
                    </span>
                    <span className="text-xs text-[#BAE6FD]/80 mt-1 block">
                      AWS · Cloudflare · High-Throughput APIs · DevOps
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#082f49] flex items-center justify-center text-[#7DD3FC] border border-[#BAE6FD]/20 group-hover:border-[#38BDF8] transition-colors">
                    <Server size={22} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-[#7DD3FC]">
                  <span>99.99% UPTIME SLA</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Enter Division</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>

              {/* ===================================================
                  Layer 2 (Middle): CODE -> /services/software
                 =================================================== */}
              <Link
                href="/services/software"
                onMouseEnter={() => setHoveredCard('code')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: hoveredCard === 'code' 
                    ? 'translateZ(105px) scale(1.03)' 
                    : 'translateZ(90px)',
                }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] border-2 border-white/60 p-6 flex flex-col justify-between text-white shadow-[0_35px_50px_-15px_rgba(14,165,233,0.6)] hover:border-white hover:shadow-[0_45px_65px_-15px_rgba(14,165,233,0.8)] transition-all duration-400 ease-out group cursor-pointer"
                title="Enter Code & Software Division"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[11px] text-[#BAE6FD] tracking-wider uppercase block">
                      LAYER 02 · LOGIC & SCALING
                    </span>
                    <span className="text-xl font-medium text-white tracking-tight block mt-0.5">
                      {t('stack.code')}
                    </span>
                    <span className="text-xs text-white/90 mt-1 block">
                      Next.js · TypeScript · AI Models · Custom CRM
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 group-hover:bg-white/30 transition-colors">
                    <Brackets size={22} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/20 text-xs font-mono text-white/90">
                  <span>CLEAN ARCHITECTURE</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Enter Division</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>

              {/* ===================================================
                  Layer 3 (Top): DESIGN -> /services/web
                 =================================================== */}
              <Link
                href="/services/web"
                onMouseEnter={() => setHoveredCard('design')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: hoveredCard === 'design' 
                    ? 'translateZ(195px) scale(1.03)' 
                    : 'translateZ(180px)',
                }}
                className="absolute inset-0 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#7DD3FC] p-6 flex flex-col justify-between text-[#0C4A6E] shadow-[0_35px_55px_-15px_rgba(12,74,110,0.45)] hover:border-[#0EA5E9] hover:shadow-[0_45px_70px_-15px_rgba(14,165,233,0.55)] transition-all duration-400 ease-out group cursor-pointer"
                title="Enter Web & Design Division"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[11px] text-[#0EA5E9] tracking-wider uppercase block">
                      LAYER 03 · EXPERIENCE & UI
                    </span>
                    <span className="text-xl font-medium text-[#0C4A6E] tracking-tight block mt-0.5 group-hover:text-[#0EA5E9] transition-colors">
                      {t('stack.design')}
                    </span>
                    <span className="text-xs text-[#3F7FA8] mt-1 block">
                      UI/UX · Motion · Design Systems · Conversion
                    </span>
                  </div>

                  {/* Mini UI Sketch */}
                  <div className="w-12 h-9 rounded-md border border-[#7DD3FC] bg-[#F0F9FF] p-1.5 flex flex-col justify-between shadow-xs">
                    <div className="h-1.5 rounded-full bg-[#0EA5E9]" />
                    <div className="flex gap-1">
                      <div className="w-4 h-1.5 rounded-full bg-[#7DD3FC]" />
                      <div className="w-2 h-1.5 rounded-full bg-[#BAE6FD]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E0F2FE] text-xs font-mono text-[#0EA5E9]">
                  <span>PIXEL-PERFECT FIGMA</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Enter Division</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
