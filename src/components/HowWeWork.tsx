'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

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

export function HowWeWork() {
  const { t, lang } = useLanguage();
  // Default to step 2 (Build) so steps 0, 1, 2 are filled and 3, 4 are light, exactly matching reference image
  const [activeStage, setActiveStage] = useState<number>(2);

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
    <section className="py-20 sm:py-24 bg-white" id="process">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Exact Section Label Matching User Reference Image */}
        <div className="mb-10 text-left rtl:text-right">
          <span className="font-mono text-xs font-semibold text-[#0EA5E9] tracking-[0.22em] uppercase inline-block">
            {t('process.label')}
          </span>
        </div>

        {/* Clean Horizontal Connected Stepper (100% faithful to reference mockup) */}
        <div className="relative mb-14">
          
          {/* Continuous Connecting Line Running Behind All Icons */}
          <div className="absolute top-[28px] sm:top-[30px] left-[28px] sm:left-[30px] right-[28px] sm:right-[30px] h-[2px] bg-[#BAE6FD] z-0">
            {/* Animated progression track matching active selection */}
            <div 
              style={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
              className="h-full bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] transition-all duration-400 ease-out"
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
                  onClick={() => setActiveStage(idx)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveStage(idx);
                    }
                  }}
                  aria-label={`${t(stage.key)} - Step ${stage.num}`}
                >
                  {/* Rounded Square Button Badge */}
                  <div 
                    className={`w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isFilled
                        ? 'bg-[#0EA5E9] text-white shadow-[0_6px_18px_-2px_rgba(14,165,233,0.4)] hover:brightness-105 hover:scale-105'
                        : 'bg-[#E0F2FE] text-[#0EA5E9] hover:bg-[#BAE6FD] hover:scale-105'
                    } ${isCurrent ? 'ring-4 ring-[#BAE6FD]/60 scale-105' : ''}`}
                  >
                    {renderStepIcon(idx, isFilled)}
                  </div>

                  {/* Stage Label Below Badge */}
                  <span 
                    className={`mt-3 sm:mt-3.5 text-sm sm:text-base transition-colors ${
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
        <div className="rounded-2xl border border-[#D6E6F2] bg-gradient-to-br from-[#FFFFFF] to-[#F5FAFF] p-6 sm:p-8 shadow-[0_14px_30px_-20px_rgba(12,74,110,0.35)] transition-all duration-300">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {current.deliverables.map((item, i) => (
                <div 
                  key={i}
                  className="p-3.5 rounded-xl bg-white border border-[#E0F2FE] shadow-2xs flex items-start gap-2.5 transition-all hover:border-[#BAE6FD]"
                >
                  <CheckCircle2 size={16} className="text-[#0EA5E9] shrink-0 mt-0.5" />
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
              onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
              disabled={activeStage === 0}
              className={`flex items-center gap-1.5 hover:text-[#0EA5E9] transition-colors ${
                activeStage === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {lang === 'ar' ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              <span>{lang === 'ar' ? 'الخطوة السابقة' : 'PREVIOUS STEP'}</span>
            </button>

            <div className="flex gap-1.5">
              {stages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStage(i)}
                  className={`h-2 rounded-full transition-all ${
                    activeStage === i ? 'w-6 bg-[#0EA5E9]' : 'w-2 bg-[#BAE6FD]'
                  }`}
                  aria-label={`Jump to stage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveStage((prev) => Math.min(stages.length - 1, prev + 1))}
              disabled={activeStage === stages.length - 1}
              className={`flex items-center gap-1.5 hover:text-[#0EA5E9] transition-colors ${
                activeStage === stages.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span>{lang === 'ar' ? 'الخطوة التالية' : 'NEXT STEP'}</span>
              {lang === 'ar' ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
