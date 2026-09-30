'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ClosingCTA } from '@/components/ClosingCTA';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';

interface DivisionDetail {
  name: string;
  tagline: string;
  promise: string;
  whatWeBuild: string[];
  deliverables: string[];
  relatedCaseStudy: {
    title: string;
    slug: string;
    desc: string;
    tags: string;
  };
}

const divisionData: Record<string, DivisionDetail> = {
  web: {
    name: 'Web & Digital Platforms',
    tagline: 'DIVISION 01 · WEB',
    promise: 'High-converting, scalable corporate platforms engineered from the first line.',
    whatWeBuild: [
      'Corporate websites with tailored CMS architectures',
      'High-conversion landing pages & marketing funnels',
      'Scalable web applications & customer portals',
      'Design systems & fluid UI/UX component libraries',
      'SEO optimization & Web Vitals performance tuning',
    ],
    deliverables: ['Custom Next.js Frontend', 'Figma Design System', 'Headless CMS', 'Automated CI/CD'],
    relatedCaseStudy: {
      title: 'Real estate ecosystem',
      slug: 'real-estate-ecosystem',
      desc: 'Unified investor portal, interactive property browsing, and customer CRM.',
      tags: 'Web · CRM · Automation',
    },
  },
  mobile: {
    name: 'Mobile Engineering',
    tagline: 'DIVISION 02 · MOBILE',
    promise: 'Native and cross-platform apps crafted with buttery 120fps precision.',
    whatWeBuild: [
      'Native iOS (Swift) & Android (Kotlin) development',
      'Cross-platform applications with React Native & Flutter',
      'Customer-facing mobile commerce & loyalty systems',
      'Internal workforce apps with robust offline data synchronization',
      'Continuous maintenance, App Store submission & telemetry',
    ],
    deliverables: ['App Store & Play Store Builds', 'Offline-First Engine', 'Push Notification Hub', 'Analytics SDKs'],
    relatedCaseStudy: {
      title: 'Retail commerce platform',
      slug: 'retail-commerce-platform',
      desc: 'Omnichannel shopping app with sub-second checkout and personalized AI feeds.',
      tags: 'Mobile · Commerce · AI',
    },
  },
  saas: {
    name: 'SaaS Platforms & Products',
    tagline: 'DIVISION 03 · SAAS',
    promise: 'Multi-tenant cloud products that scale from MVP to millions of users.',
    whatWeBuild: [
      'Rapid MVPs engineered for swift market validation',
      'Subscription platforms with Stripe/Paddle multi-currency billing',
      'Real-time analytics dashboards with role-based access control',
      'Multi-tenant database architectures & isolated workspaces',
      'Admin panels, audit logging & enterprise compliance',
    ],
    deliverables: ['Full-Stack SaaS Codebase', 'Billing & Invoicing Engine', 'Tenant Isolation Architecture', 'Documentation'],
    relatedCaseStudy: {
      title: 'Enterprise AI telemetry dashboard',
      slug: 'saas-analytics-engine',
      desc: 'Predictive server scaling, token observability, and real-time enterprise telemetry tracking 40M+ daily events.',
      tags: 'SaaS · Cloud · AI',
    },
  },
  software: {
    name: 'Custom Software & Enterprise Tools',
    tagline: 'DIVISION 04 · SOFTWARE',
    promise: 'Bespoke operational backbones uniting your data, workflows, and workforce.',
    whatWeBuild: [
      'Custom CRM & pipeline tracking tailored to unique sales workflows',
      'Enterprise Resource Planning (ERP) & inventory management engines',
      'HR platforms, employee onboarding & scheduling tools',
      'Automated sales systems & operational analytics pipelines',
      'Legacy database migration & microservice modernization',
    ],
    deliverables: ['Bespoke Database Schema', 'Role & Permission Hierarchy', 'REST/GraphQL APIs', 'Operational UI'],
    relatedCaseStudy: {
      title: 'Automated lending core & ERP',
      slug: 'fintech-internal-portal',
      desc: 'Internal compliance and underwriting engine automating risk calculation in 3.4 seconds.',
      tags: 'Software · Cloud · ERP',
    },
  },
  commerce: {
    name: 'Headless E-Commerce',
    tagline: 'DIVISION 05 · COMMERCE',
    promise: 'Lightning-fast storefronts and unified checkouts that maximize conversion.',
    whatWeBuild: [
      'Bespoke custom stores engineered for global brands',
      'Shopify Plus & WooCommerce headless architectures',
      'Multi-vendor marketplaces with escrow & seller portals',
      'Unified payment gateway integrations (Stripe, Fawry, Apple Pay)',
      'Automated order management, warehouse & logistics hooks',
    ],
    deliverables: ['Sub-second Headless Frontend', 'Omnichannel Cart Engine', 'Global Payment Matrix', 'Inventory Webhooks'],
    relatedCaseStudy: {
      title: 'Retail commerce platform',
      slug: 'retail-commerce-platform',
      desc: 'Enterprise multi-currency commerce engine serving 250k+ monthly visits.',
      tags: 'Commerce · AI',
    },
  },
  ai: {
    name: 'AI & Machine Intelligence',
    tagline: 'DIVISION 06 · AI',
    promise: 'Practical intelligence that automates workflows and delights users.',
    whatWeBuild: [
      'Custom AI apps & generative interfaces',
      'Context-aware LLM assistants embedded into web & mobile apps',
      'Autonomous customer-service automation & ticket routing',
      'Retrieval-Augmented Generation (RAG) over private company data',
      'Predictive models for churn, inventory demand & pricing',
    ],
    deliverables: ['Private RAG Pipeline', 'Custom AI Fine-tuning', 'Streaming Chat Interface', 'Guardrails & Auditing'],
    relatedCaseStudy: {
      title: 'Fleet dispatch AI dispatcher',
      slug: 'autonomous-logistics-ai',
      desc: 'Autonomous AI routing agent optimizing freight distribution and reducing fuel spend by 19%.',
      tags: 'AI · Cloud · Automation',
    },
  },
  cloud: {
    name: 'Cloud Infrastructure & DevOps',
    tagline: 'DIVISION 07 · CLOUD',
    promise: 'Resilient, high-throughput cloud environments that never drop a line.',
    whatWeBuild: [
      'Scalable cloud architecture on AWS, GCP, and Cloudflare',
      'High-throughput REST & GraphQL API orchestration',
      'Automated CI/CD pipelines with zero-downtime blue/green deployments',
      'High-security payment gateways & banking API connectors',
      '24/7 telemetry, distributed logging & disaster recovery setups',
    ],
    deliverables: ['Terraform Infrastructure as Code', 'Kubernetes / Container Setup', 'CI/CD Pipelines', 'Uptime SLA Monitoring'],
    relatedCaseStudy: {
      title: 'Global fintech banking core',
      slug: 'fintech-banking-platform',
      desc: 'Event-driven multi-region cloud infrastructure processing $12M+ in daily transaction volume.',
      tags: 'Cloud · Security · Architecture',
    },
  },
};

export default function DivisionDetailPage() {
  const params = useParams();
  const divisionSlug = (params?.division as string)?.toLowerCase() || 'web';
  const data = divisionData[divisionSlug] || divisionData.web;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-32 sm:pt-36 pb-16 sm:pb-20 bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0C4A6E] hover:text-[#0EA5E9] mb-4 sm:mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>All Divisions</span>
          </Link>

          <span className="section-label block">{data.tagline}</span>
          <h1 className="text-3xl min-[380px]:text-4xl sm:text-6xl font-medium tracking-tight text-[#0C4A6E] mb-3 sm:mb-4">
            {data.name}
          </h1>
          <p className="text-lg sm:text-2xl text-[#3F7FA8] font-normal leading-relaxed max-w-3xl">
            {data.promise}
          </p>
        </div>
      </section>

      {/* What We Build List */}
      <section className="py-14 sm:py-20">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
            
            {/* Left: What We Build */}
            <div>
              <span className="section-label">SCOPE & CAPABILITIES</span>
              <h2 className="text-2xl sm:text-3xl font-medium text-[#0C4A6E] mb-4 sm:mb-6">
                What we build
              </h2>
              <ul className="space-y-3.5 sm:space-y-4">
                {data.whatWeBuild.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#3F7FA8]">
                    <CheckCircle2 className="text-[#0EA5E9] shrink-0 mt-1" size={17} />
                    <span className="text-sm sm:text-base leading-relaxed text-[#0C4A6E]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Deliverables Card */}
            <div>
              <div className="rounded-2xl border border-[#D6E6F2] p-5 sm:p-8 bg-gradient-to-br from-white to-[#F0F9FF] shadow-[0_18px_30px_-22px_rgba(12,74,110,0.45)]">
                <span className="section-label">KEY DELIVERABLES</span>
                <h3 className="text-xl sm:text-2xl font-medium text-[#0C4A6E] mb-4 sm:mb-6">
                  What you receive
                </h3>
                <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {data.deliverables.map((deliv, i) => (
                    <div 
                      key={i} 
                      className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#E0F2FE] flex items-center justify-between text-xs sm:text-sm font-medium text-[#0C4A6E]"
                    >
                      <span>{deliv}</span>
                      <span className="font-mono text-[10px] sm:text-xs text-[#0EA5E9]">PHASE {i + 1}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="btn-primary w-full justify-center py-3">
                  <span>Scope your {data.name}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Case Study */}
      <section className="py-12 sm:py-16 bg-[#F5FAFF] border-t border-[#E0F2FE]">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
          <span className="section-label">PROOF IN PRODUCTION</span>
          <h2 className="text-2xl sm:text-3xl font-medium text-[#0C4A6E] mb-6 sm:mb-8">
            Related work in this division
          </h2>

          <div className="rounded-2xl bg-white border border-[#D6E6F2] p-5 sm:p-10 shadow-[0_18px_30px_-22px_rgba(12,74,110,0.45)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#0EA5E9] block mb-2">
                {data.relatedCaseStudy.tags}
              </span>
              <h3 className="text-2xl font-medium text-[#0C4A6E] mb-2">
                {data.relatedCaseStudy.title}
              </h3>
              <p className="text-sm text-[#3F7FA8] max-w-lg leading-relaxed">
                {data.relatedCaseStudy.desc}
              </p>
            </div>

            <Link
              href={`/work/${data.relatedCaseStudy.slug}`}
              className="btn-navy whitespace-nowrap"
            >
              <span>View Case Study →</span>
            </Link>
          </div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </main>
  );
}
