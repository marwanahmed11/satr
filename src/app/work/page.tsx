'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ClosingCTA } from '@/components/ClosingCTA';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Project {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  tags: string[];
  summary: string;
  bgGradient: string;
  textColor: string;
}

const allProjects: Project[] = [
  {
    slug: 'fintech-banking-platform',
    title: 'Global fintech platform',
    client: 'Apex Capital [PLACEHOLDER]',
    year: '2026',
    category: 'Software',
    tags: ['Web', 'Security', 'Cloud'],
    summary: 'A high-throughput banking core, automated reconciliation platform, and compliance infrastructure processing millions in daily volume.',
    bgGradient: 'from-[#0C4A6E] via-[#0369A1] to-[#0EA5E9]',
    textColor: 'text-white',
  },
  {
    slug: 'retail-commerce-platform',
    title: 'Retail commerce platform',
    client: 'Velvet Goods [PLACEHOLDER]',
    year: '2025',
    category: 'Commerce',
    tags: ['Mobile', 'Commerce', 'AI'],
    summary: 'Headless multi-store commerce engine powered by on-device AI recommendations and instant multi-currency checkout.',
    bgGradient: 'from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC]',
    textColor: 'text-[#0C4A6E]',
  },
  {
    slug: 'saas-analytics-engine',
    title: 'Enterprise telemetry dashboard',
    client: 'DataPulse Cloud [PLACEHOLDER]',
    year: '2026',
    category: 'SaaS',
    tags: ['SaaS', 'Cloud', 'AI'],
    summary: 'Real-time telemetry and predictive server scaling infrastructure tracking 40M+ daily events.',
    bgGradient: 'from-[#0369A1] via-[#0EA5E9] to-[#BAE6FD]',
    textColor: 'text-white',
  },
  {
    slug: 'fintech-internal-portal',
    title: 'Automated lending core & ERP',
    client: 'Apex Credit [PLACEHOLDER]',
    year: '2025',
    category: 'Software',
    tags: ['Software', 'Cloud'],
    summary: 'Internal banking compliance engine automating underwriting workflows and risk assessment in 3.4 seconds.',
    bgGradient: 'from-white to-[#F0F9FF]',
    textColor: 'text-[#0C4A6E]',
  },
  {
    slug: 'mobile-health-suite',
    title: 'Patient care iOS & Android suite',
    client: 'CareLine Health [PLACEHOLDER]',
    year: '2025',
    category: 'Mobile',
    tags: ['Mobile', 'AI'],
    summary: 'HIPAA-compliant mobile application featuring offline biometric logs and conversational medical triage.',
    bgGradient: 'from-[#BAE6FD] via-[#E0F2FE] to-white',
    textColor: 'text-[#0C4A6E]',
  },
  {
    slug: 'autonomous-logistics-ai',
    title: 'Fleet dispatch AI dispatcher',
    client: 'TransGlobal [PLACEHOLDER]',
    year: '2026',
    category: 'AI',
    tags: ['AI', 'Cloud', 'Software'],
    summary: 'Autonomous AI routing platform cutting fuel consumption by 19% across 800+ freight vehicles.',
    bgGradient: 'from-[#0C4A6E] to-[#0369A1]',
    textColor: 'text-white',
  },
];

const filterCategories = ['All', 'Web', 'Mobile', 'SaaS', 'Software', 'Commerce', 'AI', 'Cloud'];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter || p.tags.includes(activeFilter));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-white">
        <div className="w-full max-w-6xl mx-auto px-6 text-center">
          <span className="section-label">SELECTED WORK</span>
          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-[#0C4A6E] mb-6">
            Real products.<br />Real growth.
          </h1>
          <p className="text-lg text-[#3F7FA8] max-w-2xl mx-auto leading-relaxed">
            Every product engineered by SATR is rooted in technical precision, architectural integrity, and tangible business metrics.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeFilter === cat
                    ? 'bg-[#0EA5E9] text-white shadow-sm'
                    : 'bg-white/80 text-[#0C4A6E] border border-[#BAE6FD] hover:border-[#0EA5E9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Work Grid */}
      <section className="py-16">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <Link 
                key={project.slug} 
                href={`/work/${project.slug}`}
                className="group block"
              >
                <div 
                  className={`rounded-2xl p-8 sm:p-10 min-h-[380px] flex flex-col justify-between bg-gradient-to-br ${project.bgGradient} ${project.textColor} border border-[#D6E6F2] shadow-[0_18px_30px_-22px_rgba(12,74,110,0.45)] hover:shadow-[0_28px_50px_-20px_rgba(12,74,110,0.4)] transition-all duration-300 group-hover:-translate-y-1`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-xs uppercase tracking-wider opacity-80">
                        {project.tags.join(' · ')}
                      </span>
                      <span className="font-mono text-xs opacity-75">
                        {project.year}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
                      {project.title}
                    </h2>
                    
                    <p className="text-sm opacity-90 leading-relaxed max-w-md">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-8 flex items-center justify-between border-t border-current/20">
                    <span className="text-xs font-mono opacity-80">
                      {project.client}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium group-hover:translate-x-1 transition-transform">
                      <span>View case study</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </main>
  );
}
