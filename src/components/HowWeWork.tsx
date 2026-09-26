'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, ArrowRight, ArrowLeft, Play, Pause } from 'lucide-react';

interface Stage {
  num: string;
  key: string;
  descKey: string;
  phase: string;
  deliverables: string[];
}

const stages: Stage[] = [
  {
    num: '01',
    key: 'process.step1',
    descKey: 'process.step1.desc',
    phase: 'Discovery & Scoping',
    deliverables: [
      'Product specification & requirements matrix',
      'End-to-end system architecture blueprint',
      'Sprint milestone delivery roadmap',
    ],
  },
  {
    num: '02',
    key: 'process.step2',
    descKey: 'process.step2.desc',
    phase: 'UI/UX & Design Systems',
    deliverables: [
      'Figma design tokens & responsive components',
      'Interactive user journey prototypes',
      'High-fidelity desktop & mobile flows',
    ],
  },
  {
    num: '03',
    key: 'process.step3',
    descKey: 'process.step3.desc',
    phase: 'Engineering & Integration',
    deliverables: [
      'Production Next.js / TypeScript architecture',
      'Scalable databases & microservices APIs',
      'Third-party payment & telemetry integrations',
    ],
  },
  {
    num: '04',
    key: 'process.step4',
    descKey: 'process.step4.desc',
    phase: 'QA, Audit & Launch',
    deliverables: [
      'Automated security & performance audits',
      'Zero-downtime multi-region deployment',
      'Real-time error tracking & logging pipeline',
    ],
  },
  {
    num: '05',
    key: 'process.step5',
    descKey: 'process.step5.desc',
    phase: 'Scaling & Optimization',
    deliverables: [
      'Autonomous AI agent & workflow enhancements',
      'Multi-region cloud infrastructure scaling',
      'Continuous feature sprints & SLA guarantees',
    ],
  },
];

const STAGE_DURATION_MS = 3800;

export function HowWeWork() {
  const { t, lang } = useLanguage();
  const isRTL = lang === 'ar';

  // Start at step 0 (Idea) matching user reference image
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progressKey, setProgressKey] = useState<number>(0);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
      setProgressKey((prev) => prev + 1);
    }, STAGE_DURATION_MS);

    return () => clearInterval(timer);
  }, [isPaused, activeStage]);

  // Jump to specific step and reset the timer
  const handleSelectStage = (idx: number) => {
    setActiveStage(idx);
    setProgressKey((prev) => prev + 1);
  };

  const current = stages[activeStage];

  // Render SVG icons matching the exact geometries in user reference image
  const renderStepIcon = (index: number, isFilled: boolean) => {
    const stroke = isFilled ? '#FFFFFF' : '#0EA5E9';
    const fill = 'none';

    switch (index) {
      case 0: // Idea (Lightbulb with rays)
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6"/>
            <path d="M10 22h4"/>
            <path d="M12 2v1"/>
            <path d="M12 7a5 5 0 1 0-3.54 8.54c.4.4.54 1 .54 1.46h6c0-.46.14-1.06.54-1.46A5 5 0 0 0 12 7z"/>
            <path d="M4.93 4.93l.7.7"/>
            <path d="M19.07 4.93l-.7.7"/>
            <path d="M2 12h1"/>
            <path d="M21 12h1"/>
          </svg>
        );
      case 1: // Design (Pencil)
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
          </svg>
        );
      case 2: // Build (Code brackets < / >)
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="7 8 3 12 7 16" />
            <line x1="14" y1="5" x2="10" y2="19" />
            <polyline points="17 8 21 12 17 16" />
          </svg>
        );
      case 3: // Launch (Rocket)
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
          </svg>
        );
      case 4: // Scale (Trending Up Graph)
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
            <polyline points="16 7 22 7 22 13"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      className="py-20 sm:py-24 bg-white" 
      id="process"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full max-w-5xl mx-auto px-3.5 min-[390px]:px-6 sm:px-8">
        
        {/* Header Label & Autoplay Status */}
        <div className="mb-8 sm:mb-10 flex items-center justify-between">
          <div className="text-left rtl:text-right">
            <span className="font-mono text-xs font-semibold text-[#0EA5E9] tracking-[0.22em] uppercase inline-block">
              {t('process.label')}
            </span>
          </div>

          {/* Autoplay Controls Indicator */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0369A1] hover:bg-[#E0F2FE] transition-colors text-[11px] sm:text-xs font-mono cursor-pointer"
              title={isPaused ? "Resume automatic cycling" : "Pause automatic cycling"}
            >
              {isPaused ? <Play size={10} className="text-[#0EA5E9]" /> : <Pause size={10} className="text-[#0EA5E9]" />}
              <span>{isPaused ? (isRTL ? 'إيقاف مؤقت' : 'Paused') : (isRTL ? 'تشغيل تلقائي' : 'Auto-cycling')}</span>
              {!isPaused && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-ping" />
              )}
            </button>
          </div>
        </div>

        {/* Clean Horizontal Connected Stepper (100% faithful to reference mockup) */}
        <div className="relative mb-8 sm:mb-14">
          
          {/* Continuous Connecting Line Running Behind All Icons */}
          <div className="absolute top-[18px] min-[360px]:top-[21px] min-[390px]:top-[25px] sm:top-[30px] left-[18px] min-[360px]:left-[21px] min-[390px]:left-[25px] sm:left-[30px] right-[18px] min-[360px]:right-[21px] min-[390px]:right-[25px] sm:right-[30px] h-[2px] bg-[#BAE6FD] z-0 overflow-hidden">
            {/* Animated progression track matching active selection */}
            <div 
              style={{ 
                width: `${(activeStage / (stages.length - 1)) * 100}%`,
                transformOrigin: isRTL ? 'right' : 'left'
              }}
              className="h-full bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] transition-all duration-500 ease-out"
            />
          </div>

          {/* 5 Connected Step Nodes */}
          <div className="relative z-10 flex justify-between items-start">
            {stages.map((stage, idx) => {
              const isFilled = idx <= activeStage;
              const isCurrent = idx === activeStage;

              return (
                <div 
                  key={stage.key}
                  onClick={() => handleSelectStage(idx)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelectStage(idx);
                    }
                  }}
                  aria-label={`${t(stage.key)} - Step ${stage.num}`}
                >
                  {/* Rounded Square Button Badge */}
                  <div 
                    className={`relative w-[36px] h-[36px] min-[360px]:w-[42px] min-[360px]:h-[42px] min-[390px]:w-[50px] min-[390px]:h-[50px] sm:w-[60px] sm:h-[60px] rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isFilled
                        ? 'bg-[#0EA5E9] text-white shadow-[0_6px_18px_-2px_rgba(14,165,233,0.4)] hover:brightness-105 hover:scale-105'
                        : 'bg-[#E0F2FE] text-[#0EA5E9] hover:bg-[#BAE6FD] hover:scale-105'
                    } ${isCurrent ? 'ring-2 min-[360px]:ring-3 sm:ring-4 ring-[#BAE6FD]/80 scale-105 shadow-[0_8px_24px_-2px_rgba(14,165,233,0.5)]' : ''}`}
                  >
                    <div className="scale-[0.68] min-[360px]:scale-75 min-[390px]:scale-90 sm:scale-100 flex items-center justify-center">
                      {renderStepIcon(idx, isFilled)}
                    </div>

                    {/* Subtle pulse ring on the currently active step */}
                    {isCurrent && !isPaused && (
                      <span className="absolute -inset-1 rounded-xl sm:rounded-2xl border-2 border-[#0EA5E9]/40 animate-ping pointer-events-none" />
                    )}
                  </div>

                  {/* Stage Label Below Badge */}
                  <span 
                    className={`mt-1.5 sm:mt-3.5 text-[9.5px] min-[360px]:text-[10px] min-[390px]:text-[11px] sm:text-base transition-colors text-center ${
                      isCurrent 
                        ? 'text-[#0C4A6E] font-bold' 
                        : 'text-[#0C4A6E] font-medium group-hover:text-[#0EA5E9]'
                    }`}
                  >
                    {t(stage.key)}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Interactive Deliverables Card for Currently Selected Stage */}
        <div 
          key={activeStage}
          className="relative rounded-2xl border border-[#D6E6F2] bg-gradient-to-br from-[#FFFFFF] to-[#F5FAFF] p-4 sm:p-8 shadow-[0_14px_30px_-20px_rgba(12,74,110,0.35)] transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          {/* Top Progress countdown bar indicating auto-advance */}
          {!isPaused && (
            <div 
              key={`bar-${progressKey}`}
              style={{
                animation: `stageProgress ${STAGE_DURATION_MS}ms linear forwards`
              }}
              className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] origin-left"
            />
          )}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-[#E0F2FE]">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0EA5E9] text-white flex items-center justify-center shadow-sm">
                {renderStepIcon(activeStage, true)}
              </div>
              <div>
                <span className="font-mono text-[11px] text-[#0EA5E9] font-semibold tracking-wider uppercase block">
                  STEP {current.num} · {current.phase}
                </span>
                <h3 className="text-xl sm:text-2xl font-medium text-[#0C4A6E]">
                  {t(current.key)}
                </h3>
              </div>
            </div>

            <span className="text-xs font-mono text-[#0369A1] px-3.5 py-1.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD]">
              {t(current.descKey)}
            </span>
          </div>

          {/* Deliverables Grid */}
          <div className="mt-6">
            <span className="font-mono text-xs text-[#3F7FA8] uppercase tracking-wider block mb-3">
              DELIVERABLES & ARCHITECTURAL OUTCOMES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
              {current.deliverables.map((item, i) => (
                <div 
                  key={i}
                  className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#E0F2FE] shadow-2xs flex items-start gap-2.5 transition-all hover:border-[#BAE6FD]"
                >
                  <CheckCircle2 size={15} className="text-[#0EA5E9] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#0C4A6E] leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stepper Navigation Controls */}
          <div className="mt-6 pt-5 border-t border-[#E0F2FE] flex justify-between items-center text-xs font-mono text-[#3F7FA8]">
            <button
              onClick={() => handleSelectStage((activeStage - 1 + stages.length) % stages.length)}
              className="flex items-center gap-1.5 hover:text-[#0EA5E9] transition-colors cursor-pointer"
            >
              {isRTL ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              <span>{isRTL ? 'الخطوة السابقة' : 'PREVIOUS STEP'}</span>
            </button>

            <div className="flex gap-1.5">
              {stages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectStage(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeStage === i ? 'w-6 bg-[#0EA5E9]' : 'w-2 bg-[#BAE6FD]'
                  }`}
                  aria-label={`Jump to stage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => handleSelectStage((activeStage + 1) % stages.length)}
              className="flex items-center gap-1.5 hover:text-[#0EA5E9] transition-colors cursor-pointer"
            >
              <span>{isRTL ? 'الخطوة التالية' : 'NEXT STEP'}</span>
              {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
