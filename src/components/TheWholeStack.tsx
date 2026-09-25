'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Server, 
  Brackets, 
  Palette, 
  ArrowRight, 
  ArrowUpRight, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  X,
  ExternalLink,
  Layers
} from 'lucide-react';
import Link from 'next/link';

type LayerId = 'design' | 'code' | 'infra';

interface LayerData {
  id: LayerId;
  layerNum: string;
  subTitle: string;
  name: string;
  techSummary: string;
  divisionHref: string;
  metricsBadge: string;
  colorScheme: {
    bg: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    badgeBg: string;
    badgeText: string;
    glow: string;
    accent: string;
  };
  keySpecs: string[];
  description: string;
}

export function TheWholeStack({ onOpenContact }: { onOpenContact?: () => void }) {
  const { t, lang } = useLanguage();
  const isRTL = lang === 'ar';

  const [activeLayer, setActiveLayer] = useState<LayerId | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<LayerId | null>(null);
  const [isExploded, setIsExploded] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const layers: LayerData[] = [
    {
      id: 'design',
      layerNum: '03',
      subTitle: isRTL ? 'الواجهة والتجربة' : 'EXPERIENCE & UI',
      name: t('stack.design'),
      techSummary: 'UI/UX · Motion · Design Systems · Conversion · Figma',
      divisionHref: '/services/web',
      metricsBadge: 'PIXEL-PERFECT FIGMA',
      colorScheme: {
        bg: 'bg-white',
        border: 'border-2 border-[#7DD3FC] hover:border-[#0EA5E9]',
        textPrimary: 'text-[#0C4A6E]',
        textSecondary: 'text-[#3F7FA8]',
        badgeBg: 'bg-[#F0F9FF] border-[#BAE6FD]',
        badgeText: 'text-[#0284C7]',
        glow: 'rgba(14, 165, 233, 0.4)',
        accent: '#0EA5E9'
      },
      keySpecs: [
        'Atomic Design Systems',
        '60 FPS Micro-Interactions',
        'Figma Design Tokens',
        'WCAG AA Accessibility'
      ],
      description: isRTL 
        ? 'تصميم واجهات وتجارب استثنائية مبنية على هوية بصرية قوية ومعدلات تحويل مدروسة بعناية.'
        : 'World-class digital product design, bespoke interaction mechanics, and unified design token systems.'
    },
    {
      id: 'code',
      layerNum: '02',
      subTitle: isRTL ? 'المنطق والتوسع' : 'LOGIC & SCALING',
      name: t('stack.code'),
      techSummary: 'Next.js · TypeScript · AI Models · Custom CRM · APIs',
      divisionHref: '/services/software',
      metricsBadge: 'CLEAN ARCHITECTURE',
      colorScheme: {
        bg: 'bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#0C4A6E]',
        border: 'border-2 border-white/80 hover:border-white',
        textPrimary: 'text-white',
        textSecondary: 'text-[#BAE6FD]',
        badgeBg: 'bg-white/20 border-white/30',
        badgeText: 'text-white',
        glow: 'rgba(14, 165, 233, 0.6)',
        accent: '#38BDF8'
      },
      keySpecs: [
        'End-to-End TypeScript',
        'Custom LLM Integrations',
        'Edge Hydration & Turbopack',
        'Modular Clean Architecture'
      ],
      description: isRTL
        ? 'بنية برمجية فائقة السرعة والأمان، تعتمد أحدث تقنيات الويب والذكاء الاصطناعي لتطوير منتجاتك.'
        : 'Enterprise-grade application architecture engineered for blazing speed, zero runtime type errors, and intelligent autonomy.'
    },
    {
      id: 'infra',
      layerNum: '01',
      subTitle: isRTL ? 'البنية التحتية والأساس' : 'FOUNDATION & CLOUD',
      name: t('stack.infra'),
      techSummary: 'AWS · Cloudflare · High-Throughput APIs · DevOps',
      divisionHref: '/services/cloud',
      metricsBadge: '99.99% UPTIME SLA',
      colorScheme: {
        bg: 'bg-gradient-to-br from-[#082F49] via-[#0C4A6E] to-[#041926]',
        border: 'border-2 border-[#38BDF8]/50 hover:border-[#38BDF8]',
        textPrimary: 'text-white',
        textSecondary: 'text-[#7DD3FC]',
        badgeBg: 'bg-[#082f49] border-[#38BDF8]/30',
        badgeText: 'text-[#7DD3FC]',
        glow: 'rgba(56, 189, 248, 0.5)',
        accent: '#7DD3FC'
      },
      keySpecs: [
        'Global Edge Routing & CDN',
        'Automated Zero-Downtime CI/CD',
        'Multi-Region Failover',
        '<50ms P99 Database Latency'
      ],
      description: isRTL
        ? 'بنية سحابية ذات اعتمادية فائقة تضمن تشغيل تطبيقاتك دون انقطاع وتتحمل أعلى مستويات الضغط.'
        : 'Battle-hardened cloud clusters, resilient serverless orchestrations, and automated deployment pipelines.'
    }
  ];

  // Mouse tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseTilt({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setHoveredLayer(null);
  };

  // Base 3D Angles
  const baseRotateX = 56 + mouseTilt.y * 4;
  const baseRotateZ = -36 + mouseTilt.x * 4;

  // Calculate 3D transforms for each card
  const getCardTransform = (layerId: LayerId) => {
    const isThisActive = activeLayer === layerId;
    const isAnyActive = activeLayer !== null;

    if (isThisActive) {
      // The active card detaches and floats right in front of the screen facing the camera!
      // translateY(45px) balances the projection so it stays vertically centered in the viewport
      return {
        transform: 'translateZ(230px) translateY(45px) rotateZ(36deg) rotateX(-56deg) scale(1.1)',
        zIndex: 50,
        opacity: 1,
        filter: 'none',
        boxShadow: `0 35px 70px -15px ${
          layerId === 'design' 
            ? 'rgba(12,74,110,0.45)' 
            : layerId === 'code' 
              ? 'rgba(14,165,233,0.6)' 
              : 'rgba(8,47,73,0.75)'
        }, 0 0 30px rgba(56, 189, 248, 0.35)`,
      };
    }

    if (isAnyActive) {
      // Background cards sink back, dim, and blur to emphasize front depth
      let restZ = 0;
      if (layerId === 'design') restZ = 40;
      if (layerId === 'code') restZ = 20;
      if (layerId === 'infra') restZ = 0;

      return {
        transform: `translateZ(${restZ}px) scale(0.9)`,
        zIndex: layerId === 'design' ? 30 : layerId === 'code' ? 20 : 10,
        opacity: 0.35,
        filter: 'blur(1px)',
        boxShadow: '0 20px 35px -15px rgba(12,74,110,0.2)',
      };
    }

    // Default stacked view or exploded view
    const isHovered = hoveredLayer === layerId;
    let z = 0;
    if (isExploded) {
      if (layerId === 'infra') z = -20;
      if (layerId === 'code') z = 120;
      if (layerId === 'design') z = 260;
    } else {
      if (layerId === 'infra') z = 0;
      if (layerId === 'code') z = 95;
      if (layerId === 'design') z = 190;
    }

    if (isHovered) {
      z += 24;
    }

    return {
      transform: `translateZ(${z}px) scale(${isHovered ? 1.04 : 1})`,
      zIndex: layerId === 'design' ? 30 : layerId === 'code' ? 20 : 10,
      opacity: 1,
      filter: 'none',
      boxShadow: isHovered 
        ? '0 45px 65px -15px rgba(12,74,110,0.6)' 
        : '0 30px 45px -15px rgba(12,74,110,0.4)',
    };
  };

  const activeData = layers.find((l) => l.id === activeLayer);

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white via-[#F5FAFF] to-white overflow-hidden" id="stack">
      <div className="w-full max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* =========================================
              Left Column: Information & Controls
             ========================================= */}
          <div className="lg:col-span-5 max-w-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="section-label mb-0">{t('stack.label')}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] font-medium">
                3D INTERACTIVE
              </span>
            </div>
            
            <h2 className="section-heading mb-4">{t('stack.heading')}</h2>
            
            <p className="text-[#3F7FA8] text-base mb-6 leading-relaxed">
              {t('stack.text')}
            </p>

            {/* Dynamic Architecture Spec Box based on Active 3D Selection */}
            <div className="p-5 rounded-2xl bg-white border border-[#BAE6FD] shadow-[0_15px_30px_-15px_rgba(12,74,110,0.08)] mb-6 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-[#0369A1] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#0EA5E9]" />
                  {activeData 
                    ? `LAYER ${activeData.layerNum} · ${activeData.name.toUpperCase()}`
                    : 'FULL STACK ARCHITECTURE'
                  }
                </span>

                {activeLayer && (
                  <button
                    onClick={() => setActiveLayer(null)}
                    className="text-[11px] font-mono text-[#0EA5E9] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Stack View</span>
                    <RotateCcw size={11} />
                  </button>
                )}
              </div>

              <p className="text-xs text-[#0C4A6E] leading-relaxed mb-3">
                {activeData 
                  ? activeData.description
                  : 'Touch any card on the right or click the buttons below to inspect each layer in full 3D with architectural specifications.'
                }
              </p>

              {activeData ? (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E0F2FE]">
                  {activeData.keySpecs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#0369A1]">
                      <CheckCircle2 size={12} className="text-[#0EA5E9] shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-2 border-t border-[#E0F2FE] text-[11px] font-mono text-[#0284C7]">
                  <span className="h-2 w-2 rounded-full bg-[#0EA5E9] animate-ping" />
                  <span>Click any card in the 3D stack to pop out</span>
                </div>
              )}
            </div>

            {/* Clean Layer Controller Bar in Left Column (Never overlaps the 3D canvas) */}
            <div className="p-3 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] mb-7">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#0369A1] font-medium">
                  3D LAYER CONTROLS:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveLayer(null);
                    setIsExploded(!isExploded);
                  }}
                  className="text-[11px] font-mono text-[#3F7FA8] hover:text-[#0C4A6E] flex items-center gap-1 cursor-pointer"
                  title="Toggle exploded 3D spacing"
                >
                  <Layers size={12} />
                  <span>{isExploded && !activeLayer ? 'Compact Deck' : 'Explode 3D'}</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLayer(activeLayer === 'design' ? null : 'design')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeLayer === 'design'
                      ? 'bg-[#0EA5E9] text-white shadow-xs'
                      : 'bg-white hover:bg-[#E0F2FE] text-[#0C4A6E] border border-[#BAE6FD]'
                  }`}
                >
                  <Palette size={13} />
                  <span>03 Design</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveLayer(activeLayer === 'code' ? null : 'code')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeLayer === 'code'
                      ? 'bg-[#0284C7] text-white shadow-xs'
                      : 'bg-white hover:bg-[#E0F2FE] text-[#0C4A6E] border border-[#BAE6FD]'
                  }`}
                >
                  <Brackets size={13} />
                  <span>02 Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveLayer(activeLayer === 'infra' ? null : 'infra')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeLayer === 'infra'
                      ? 'bg-[#0C4A6E] text-white shadow-xs'
                      : 'bg-white hover:bg-[#E0F2FE] text-[#0C4A6E] border border-[#BAE6FD]'
                  }`}
                >
                  <Server size={13} />
                  <span>01 Infra</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
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

              {activeData && (
                <Link
                  href={activeData.divisionHref}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0EA5E9] text-[#0C4A6E] hover:bg-[#E0F2FE]/50 text-xs font-medium transition-all"
                >
                  <span>Explore {activeData.name} Division</span>
                  <ArrowUpRight size={14} />
                </Link>
              )}
            </div>
          </div>

          {/* =======================================================
              Right Column: Unobstructed 3D Stack Stage
             ======================================================= */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            {/* 3D Viewport Container */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-[430px] sm:h-[550px] flex items-center justify-center [perspective:1000px] sm:[perspective:1400px] select-none overflow-hidden"
            >
              
              {/* Ambient 3D ground grid circle */}
              <div 
                style={{
                  transform: `rotateX(${baseRotateX}deg) rotateZ(${baseRotateZ}deg) translateZ(-40px)`,
                }}
                className="absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-[#BAE6FD]/40 pointer-events-none transition-transform duration-700 ease-out flex items-center justify-center"
              >
                <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full border border-[#E0F2FE]/60" />
              </div>

              {/* Isometric 3D Stage with responsive mobile scaling */}
              <div 
                style={{
                  transform: `rotateX(${baseRotateX}deg) rotateZ(${baseRotateZ}deg)`,
                }}
                className="relative w-[300px] min-[390px]:w-[340px] sm:w-[380px] h-[230px] sm:h-[250px] [transform-style:preserve-3d] transition-transform duration-500 ease-out scale-[0.84] min-[390px]:scale-[0.92] sm:scale-100"
              >
                
                {/* ===================================================
                    LAYER 01 (Bottom): INFRASTRUCTURE
                   =================================================== */}
                {(() => {
                  const card = layers[2];
                  const style = getCardTransform('infra');
                  const isFront = activeLayer === 'infra';

                  return (
                    <div
                      key={card.id}
                      onClick={() => setActiveLayer(isFront ? null : 'infra')}
                      onMouseEnter={() => setHoveredLayer('infra')}
                      onMouseLeave={() => setHoveredLayer(null)}
                      style={{
                        transform: style.transform,
                        zIndex: style.zIndex,
                        opacity: style.opacity,
                        filter: style.filter,
                        boxShadow: style.boxShadow,
                        transition: 'transform 600ms cubic-bezier(0.34, 1.25, 0.64, 1), opacity 400ms ease, box-shadow 400ms ease, filter 400ms ease',
                      }}
                      className={`absolute inset-0 rounded-2xl ${card.colorScheme.bg} ${card.colorScheme.border} p-5 sm:p-6 flex flex-col justify-between text-white cursor-pointer group`}
                    >
                      {/* Top Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-[#7DD3FC] tracking-wider uppercase block">
                              LAYER {card.layerNum} · {card.subTitle}
                            </span>
                            {isFront && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] text-[9px] font-mono font-medium">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] animate-ping" />
                                3D IN FOCUS
                              </span>
                            )}
                          </div>
                          
                          <span className="text-xl sm:text-2xl font-medium text-white tracking-tight block mt-1 group-hover:text-[#BAE6FD] transition-colors">
                            {card.name}
                          </span>
                          
                          <span className="text-xs text-[#BAE6FD]/80 mt-1 block">
                            {card.techSummary}
                          </span>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-[#082f49] flex items-center justify-center text-[#7DD3FC] border border-[#BAE6FD]/20 group-hover:border-[#38BDF8] transition-colors shrink-0 ms-2">
                          <Server size={20} />
                        </div>
                      </div>

                      {/* Middle: Expanded In-Front Content */}
                      {isFront && (
                        <div className="my-2 p-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-[#BAE6FD] animate-in fade-in duration-300">
                          <div className="grid grid-cols-2 gap-1.5">
                            {card.keySpecs.map((spec, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[10px] text-white">
                                <CheckCircle2 size={11} className="text-[#38BDF8] shrink-0" />
                                <span className="truncate">{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bottom Footer / Action Bar */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-xs font-mono text-[#7DD3FC]">
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-[#38BDF8] inline-block" />
                          <span>{card.metricsBadge}</span>
                        </span>

                        {isFront ? (
                          <div className="flex items-center gap-2">
                            <Link
                              href={card.divisionHref}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38BDF8] text-[#082F49] font-sans font-medium text-xs hover:bg-white transition-all shadow-xs"
                            >
                              <span>Enter Division</span>
                              <ExternalLink size={12} />
                            </Link>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveLayer(null);
                              }}
                              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                              title="Return to Stack"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#BAE6FD] group-hover:text-white group-hover:translate-x-1 transition-all">
                            <span>Enter Division</span>
                            <ArrowUpRight size={14} />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* ===================================================
                    LAYER 02 (Middle): CODE & SOFTWARE
                   =================================================== */}
                {(() => {
                  const card = layers[1];
                  const style = getCardTransform('code');
                  const isFront = activeLayer === 'code';

                  return (
                    <div
                      key={card.id}
                      onClick={() => setActiveLayer(isFront ? null : 'code')}
                      onMouseEnter={() => setHoveredLayer('code')}
                      onMouseLeave={() => setHoveredLayer(null)}
                      style={{
                        transform: style.transform,
                        zIndex: style.zIndex,
                        opacity: style.opacity,
                        filter: style.filter,
                        boxShadow: style.boxShadow,
                        transition: 'transform 600ms cubic-bezier(0.34, 1.25, 0.64, 1), opacity 400ms ease, box-shadow 400ms ease, filter 400ms ease',
                      }}
                      className={`absolute inset-0 rounded-2xl ${card.colorScheme.bg} ${card.colorScheme.border} p-5 sm:p-6 flex flex-col justify-between text-white cursor-pointer group`}
                    >
                      {/* Top Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-[#BAE6FD] tracking-wider uppercase block">
                              LAYER {card.layerNum} · {card.subTitle}
                            </span>
                            {isFront && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-mono font-medium">
                                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                                3D IN FOCUS
                              </span>
                            )}
                          </div>

                          <span className="text-xl sm:text-2xl font-medium text-white tracking-tight block mt-1">
                            {card.name}
                          </span>

                          <span className="text-xs text-white/90 mt-1 block">
                            {card.techSummary}
                          </span>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 group-hover:bg-white/30 transition-colors shrink-0 ms-2">
                          <Brackets size={20} />
                        </div>
                      </div>

                      {/* Middle: Expanded In-Front Content */}
                      {isFront && (
                        <div className="my-2 p-2.5 rounded-xl bg-black/15 border border-white/20 text-xs text-white animate-in fade-in duration-300">
                          <div className="grid grid-cols-2 gap-1.5">
                            {card.keySpecs.map((spec, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[10px] text-white">
                                <CheckCircle2 size={11} className="text-[#38BDF8] shrink-0" />
                                <span className="truncate">{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bottom Footer / Action Bar */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-white/20 text-xs font-mono text-white/90">
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-white inline-block" />
                          <span>{card.metricsBadge}</span>
                        </span>

                        {isFront ? (
                          <div className="flex items-center gap-2">
                            <Link
                              href={card.divisionHref}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0284C7] font-sans font-medium text-xs hover:bg-[#BAE6FD] transition-all shadow-xs"
                            >
                              <span>Enter Division</span>
                              <ExternalLink size={12} />
                            </Link>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveLayer(null);
                              }}
                              className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                              title="Return to Stack"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-white group-hover:translate-x-1 transition-all">
                            <span>Enter Division</span>
                            <ArrowUpRight size={14} />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* ===================================================
                    LAYER 03 (Top): DESIGN & UI
                   =================================================== */}
                {(() => {
                  const card = layers[0];
                  const style = getCardTransform('design');
                  const isFront = activeLayer === 'design';

                  return (
                    <div
                      key={card.id}
                      onClick={() => setActiveLayer(isFront ? null : 'design')}
                      onMouseEnter={() => setHoveredLayer('design')}
                      onMouseLeave={() => setHoveredLayer(null)}
                      style={{
                        transform: style.transform,
                        zIndex: style.zIndex,
                        opacity: style.opacity,
                        filter: style.filter,
                        boxShadow: style.boxShadow,
                        transition: 'transform 600ms cubic-bezier(0.34, 1.25, 0.64, 1), opacity 400ms ease, box-shadow 400ms ease, filter 400ms ease',
                      }}
                      className={`absolute inset-0 rounded-2xl ${card.colorScheme.bg} ${card.colorScheme.border} p-5 sm:p-6 flex flex-col justify-between text-[#0C4A6E] cursor-pointer group`}
                    >
                      {/* Top Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-[#0EA5E9] tracking-wider uppercase block">
                              LAYER {card.layerNum} · {card.subTitle}
                            </span>
                            {isFront && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[9px] font-mono font-medium">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#0EA5E9] animate-ping" />
                                3D IN FOCUS
                              </span>
                            )}
                          </div>

                          <span className="text-xl sm:text-2xl font-medium text-[#0C4A6E] tracking-tight block mt-1 group-hover:text-[#0EA5E9] transition-colors">
                            {card.name}
                          </span>

                          <span className="text-xs text-[#3F7FA8] mt-1 block">
                            {card.techSummary}
                          </span>
                        </div>

                        {/* Mini UI Sketch Component */}
                        <div className="w-12 h-9 rounded-md border border-[#7DD3FC] bg-[#F0F9FF] p-1.5 flex flex-col justify-between shadow-xs shrink-0 ms-2">
                          <div className="h-1.5 rounded-full bg-[#0EA5E9]" />
                          <div className="flex gap-1">
                            <div className="w-4 h-1.5 rounded-full bg-[#7DD3FC]" />
                            <div className="w-2 h-1.5 rounded-full bg-[#BAE6FD]" />
                          </div>
                        </div>
                      </div>

                      {/* Middle: Expanded In-Front Content */}
                      {isFront && (
                        <div className="my-2 p-2.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs text-[#0C4A6E] animate-in fade-in duration-300">
                          <div className="grid grid-cols-2 gap-1.5">
                            {card.keySpecs.map((spec, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[10px] text-[#0369A1]">
                                <CheckCircle2 size={11} className="text-[#0EA5E9] shrink-0" />
                                <span className="truncate">{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bottom Footer / Action Bar */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-[#E0F2FE] text-xs font-mono text-[#0EA5E9]">
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-[#0EA5E9] inline-block" />
                          <span>{card.metricsBadge}</span>
                        </span>

                        {isFront ? (
                          <div className="flex items-center gap-2">
                            <Link
                              href={card.divisionHref}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0EA5E9] text-white font-sans font-medium text-xs hover:bg-[#0284C7] transition-all shadow-xs"
                            >
                              <span>Enter Division</span>
                              <ExternalLink size={12} />
                            </Link>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveLayer(null);
                              }}
                              className="p-1 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0C4A6E] transition-colors cursor-pointer"
                              title="Return to Stack"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#0EA5E9] group-hover:translate-x-1 transition-all">
                            <span>Enter Division</span>
                            <ArrowUpRight size={14} />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()}

              </div>

            </div>

            {/* Clean Hint below 3D canvas */}
            <div className="mt-2 text-center">
              <p className="text-[11px] font-mono text-[#3F7FA8] flex items-center justify-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
                <span>
                  {activeLayer 
                    ? 'Card in front of screen — click Enter Division or tap card to re-stack'
                    : 'Touch any card to pop it out in 3D'
                  }
                </span>
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
