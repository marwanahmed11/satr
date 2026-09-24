'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ClosingCTA } from '@/components/ClosingCTA';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Layers, Globe, Smartphone, ShieldCheck, Zap } from 'lucide-react';

interface CaseStudyData {
  title: string;
  client: string;
  year: string;
  tags: string[];
  challenge: string;
  solution: string;
  results: { val: string; label: string }[];
  nextSlug: string;
  nextTitle: string;
}

const studyDatabase: Record<string, CaseStudyData> = {
  'fintech-banking-platform': {
    title: 'Global fintech platform',
    client: 'Apex Capital [PLACEHOLDER]',
    year: '2026',
    tags: ['Web', 'Security', 'Cloud', 'Software'],
    challenge: 'A growing fintech firm struggling with fragmented payment gateways, high reconciliation delays, and latency during high-volume end-of-month clearing cycles.',
    solution: 'SATR engineered an event-driven banking core with unified payment gateway aggregation, automated sub-second ledger reconciliation, and strict regulatory compliance telemetry.',
    results: [
      { val: '320ms', label: 'End-to-end transaction latency' },
      { val: '99.999%', label: 'Settlement reliability' },
      { val: '$12M+', label: 'Daily clearing volume' },
    ],
    nextSlug: 'retail-commerce-platform',
    nextTitle: 'Retail commerce platform',
  },
  'retail-commerce-platform': {
    title: 'Retail commerce platform',
    client: 'Velvet Goods [PLACEHOLDER]',
    year: '2025',
    tags: ['Mobile', 'Commerce', 'AI', 'Cloud'],
    challenge: 'High cart abandonment on mobile devices due to slow monolithic store architecture and lack of personalized product curation for multi-country shoppers.',
    solution: 'Engineered a headless storefront coupled with native iOS/Android applications, instant one-tap Apple Pay/card checkouts, and an on-device recommendation AI model.',
    results: [
      { val: '310ms', label: 'Average page load speed' },
      { val: '+44%', label: 'Mobile checkout conversion' },
      { val: '2.4k+', label: 'Daily active transactions' },
    ],
    nextSlug: 'saas-analytics-engine',
    nextTitle: 'Enterprise telemetry platform',
  },
  'saas-analytics-engine': {
    title: 'Enterprise AI telemetry platform',
    client: 'DataPulse Cloud [PLACEHOLDER]',
    year: '2026',
    tags: ['AI', 'SaaS', 'Cloud'],
    challenge: 'Enterprises managing autonomous LLM agents had no unified observability into inference latency, hallucinations, or token spend spikes across production clusters.',
    solution: 'Engineered a real-time streaming telemetry dashboard capable of ingesting 40M+ events per day with predictive anomaly detection and cost optimization.',
    results: [
      { val: '18ms', label: 'Streaming metrics latency' },
      { val: '-32%', label: 'AI inference cloud spend' },
      { val: '40M+', label: 'Daily event throughput' },
    ],
    nextSlug: 'fintech-banking-platform',
    nextTitle: 'Global fintech platform',
  },
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'fintech-banking-platform';
  const study = studyDatabase[slug] || studyDatabase['fintech-banking-platform'];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-white">
        <div className="w-full max-w-5xl mx-auto px-6">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0C4A6E] hover:text-[#0EA5E9] mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>All Selected Work</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#0EA5E9] uppercase tracking-wider">
              {study.tags.join(' · ')}
            </span>
            <span className="text-[#3F7FA8]">•</span>
            <span className="text-xs font-mono text-[#3F7FA8]">
              {study.client}
            </span>
            <span className="text-[#3F7FA8]">•</span>
            <span className="text-xs font-mono text-[#3F7FA8]">
              {study.year}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-[#0C4A6E] mb-6">
            {study.title}
          </h1>
        </div>
      </section>

      {/* SYSTEM MAP (Connected Nodes) */}
      <section className="py-16 border-y border-[#E0F2FE] bg-[#F5FAFF]">
        <div className="w-full max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="section-label">SYSTEM MAP</span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#0C4A6E]">
              Connected digital ecosystem
            </h2>
            <p className="text-sm text-[#3F7FA8] mt-2">
              Every layer seamlessly interlinked through SATR event-driven architecture.
            </p>
          </div>

          {/* Interactive Node Graph */}
          <div className="relative py-12 px-6 rounded-2xl bg-white border border-[#D6E6F2] shadow-[0_18px_30px_-22px_rgba(12,74,110,0.45)] flex flex-col items-center justify-center min-h-[360px]">
            
            {/* SVG Connecting Sky Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#7DD3FC] stroke-2 stroke-dasharray-[4_4]">
              <line x1="50%" y1="50%" x2="20%" y2="25%" />
              <line x1="50%" y1="50%" x2="80%" y2="25%" />
              <line x1="50%" y1="50%" x2="20%" y2="75%" />
              <line x1="50%" y1="50%" x2="80%" y2="75%" />
            </svg>

            {/* Central Core Node */}
            <div className="z-10 w-44 h-44 rounded-full bg-gradient-to-br from-[#0C4A6E] to-[#0EA5E9] text-white p-4 flex flex-col items-center justify-center text-center shadow-[0_14px_30px_-14px_rgba(14,165,233,0.8)] border-4 border-white">
              <Layers size={28} className="mb-1 text-[#BAE6FD]" />
              <span className="font-medium text-sm">Core Platform</span>
              <span className="text-[10px] text-[#BAE6FD]">Central Orchestrator</span>
            </div>

            {/* Connected Satellite Nodes */}
            {/* Node 1: Top Left */}
            <div className="sm:absolute sm:top-10 sm:left-12 mt-6 sm:mt-0 z-10 p-3.5 glass-card flex items-center gap-3">
              <Globe size={18} className="text-[#0EA5E9]" />
              <div>
                <div className="text-xs font-medium text-[#0C4A6E]">Next.js Website</div>
                <div className="text-[10px] text-[#3F7FA8]">Global CDN Edge</div>
              </div>
            </div>

            {/* Node 2: Top Right */}
            <div className="sm:absolute sm:top-10 sm:right-12 mt-4 sm:mt-0 z-10 p-3.5 glass-card flex items-center gap-3">
              <Zap size={18} className="text-[#0EA5E9]" />
              <div>
                <div className="text-xs font-medium text-[#0C4A6E]">Internal CRM & ERP</div>
                <div className="text-[10px] text-[#3F7FA8]">Real-time Database</div>
              </div>
            </div>

            {/* Node 3: Bottom Left */}
            <div className="sm:absolute sm:bottom-10 sm:left-12 mt-4 sm:mt-0 z-10 p-3.5 glass-card flex items-center gap-3">
              <Smartphone size={18} className="text-[#0EA5E9]" />
              <div>
                <div className="text-xs font-medium text-[#0C4A6E]">Mobile App</div>
                <div className="text-[10px] text-[#3F7FA8]">iOS & Android Native</div>
              </div>
            </div>

            {/* Node 4: Bottom Right */}
            <div className="sm:absolute sm:bottom-10 sm:right-12 mt-4 sm:mt-0 z-10 p-3.5 glass-card flex items-center gap-3">
              <ShieldCheck size={18} className="text-[#0EA5E9]" />
              <div>
                <div className="text-xs font-medium text-[#0C4A6E]">AI & Payments</div>
                <div className="text-[10px] text-[#3F7FA8]">Stripe & LLM RAG</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Challenge, Solution, Results */}
      <section className="py-20">
        <div className="w-full max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div>
              <span className="section-label">THE CHALLENGE</span>
              <h2 className="text-2xl sm:text-3xl font-medium text-[#0C4A6E] mb-4">
                Bottlenecks before the first line
              </h2>
              <p className="text-[#3F7FA8] leading-relaxed">
                {study.challenge}
              </p>
            </div>

            <div>
              <span className="section-label">THE SOLUTION</span>
              <h2 className="text-2xl sm:text-3xl font-medium text-[#0C4A6E] mb-4">
                Architectural execution
              </h2>
              <p className="text-[#3F7FA8] leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Results Cards */}
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#0C4A6E] via-[#0369A1] to-[#0EA5E9] text-white">
            <span className="font-mono text-xs uppercase tracking-wider text-[#BAE6FD] block mb-2">
              MEASURED IMPACT
            </span>
            <h3 className="text-2xl font-medium mb-8">
              Key outcomes & performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {study.results.map((r, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-4xl sm:text-5xl font-medium tracking-tight mb-2">
                    {r.val}
                  </div>
                  <div className="text-xs text-[#BAE6FD]">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Gallery */}
      <section className="py-16 bg-[#F5FAFF]">
        <div className="w-full max-w-5xl mx-auto px-6">
          <span className="section-label">SCREENSHOT GALLERY</span>
          <h2 className="text-2xl sm:text-3xl font-medium text-[#0C4A6E] mb-8">
            Interface design in production
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#D6E6F2] overflow-hidden bg-white p-3 shadow-md">
              <div className="h-64 rounded-lg bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] p-6 flex flex-col justify-between">
                <div className="h-4 w-32 bg-[#0C4A6E]/30 rounded-full" />
                <div className="h-24 rounded bg-white/70 backdrop-blur-sm border border-white" />
              </div>
            </div>

            <div className="rounded-xl border border-[#D6E6F2] overflow-hidden bg-white p-3 shadow-md">
              <div className="h-64 rounded-lg bg-gradient-to-br from-[#0C4A6E] to-[#0EA5E9] p-6 flex flex-col justify-between text-white">
                <div className="h-4 w-32 bg-white/40 rounded-full" />
                <div className="h-24 rounded bg-white/15 backdrop-blur-sm border border-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Link */}
      <section className="py-16 border-t border-[#E0F2FE]">
        <div className="w-full max-w-5xl mx-auto px-6 flex justify-between items-center">
          <span className="text-sm text-[#3F7FA8]">Next Case Study</span>
          <Link
            href={`/work/${study.nextSlug}`}
            className="inline-flex items-center gap-2 text-lg font-medium text-[#0C4A6E] hover:text-[#0EA5E9] transition-colors"
          >
            <span>{study.nextTitle}</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </main>
  );
}
