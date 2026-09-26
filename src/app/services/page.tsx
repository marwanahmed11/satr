'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ClosingCTA } from '@/components/ClosingCTA';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { Globe, Smartphone, Layers, Code, ShoppingBag, Sparkles, Cloud, ArrowRight } from 'lucide-react';

const divisions = [
  {
    slug: 'web',
    tag: 'DIVISION 01',
    title: 'Web & Corporate Platforms',
    desc: 'High-impact digital flagships, web apps, portals, and unified design systems engineered for global performance.',
    icon: <Globe size={26} />,
    items: ['Corporate websites', 'Landing pages', 'Web apps & portals', 'UI/UX & Design systems'],
  },
  {
    slug: 'mobile',
    tag: 'DIVISION 02',
    title: 'Mobile Applications',
    desc: 'Native iOS and Android platforms, cross-platform apps, and mobile commerce experiences crafted with 120fps fluid precision.',
    icon: <Smartphone size={26} />,
    items: ['Native iOS & Android', 'Cross-platform architectures', 'Customer & Internal apps', 'Offline data sync'],
  },
  {
    slug: 'saas',
    tag: 'DIVISION 03',
    title: 'SaaS Platforms & Products',
    desc: 'From initial MVP to enterprise multi-tenant scale, we build robust subscription platforms and real-time dashboards.',
    icon: <Layers size={26} />,
    items: ['MVPs & Rapid validation', 'Multi-tenant infrastructure', 'Billing & Subscription engines', 'Real-time telemetry'],
  },
  {
    slug: 'software',
    tag: 'DIVISION 04',
    title: 'Custom Software & ERP',
    desc: 'Custom CRM, ERP, and operational toolsets engineered to streamline operations and unite your entire enterprise workflow.',
    icon: <Code size={26} />,
    items: ['Custom CRM & ERP', 'HR & Inventory engines', 'Operations automation', 'Legacy modernization'],
  },
  {
    slug: 'commerce',
    tag: 'DIVISION 05',
    title: 'Headless E-Commerce',
    desc: 'High-conversion commerce architectures, headless storefronts, and omnichannel checkout engines built for speed.',
    icon: <ShoppingBag size={26} />,
    items: ['Custom storefronts', 'Shopify & WooCommerce', 'Headless & Composable', 'Global payment integrations'],
  },
  {
    slug: 'ai',
    tag: 'DIVISION 06',
    title: 'AI & Machine Intelligence',
    desc: 'Custom intelligent assistants, retrieval-augmented workflows, and predictive systems embedded directly into your products.',
    icon: <Sparkles size={26} />,
    items: ['Autonomous AI agents', 'Internal knowledge RAG', 'Customer automation', 'Predictive modeling'],
  },
  {
    slug: 'cloud',
    tag: 'DIVISION 07',
    title: 'Cloud Infrastructure & DevOps',
    desc: 'Resilient cloud foundations, high-throughput microservices, continuous delivery pipelines, and 99.99% uptime guarantees.',
    icon: <Cloud size={26} />,
    items: ['Cloud architecture & APIs', 'DevOps & CI/CD automation', 'Database optimization', '24/7 Reliability monitoring'],
  },
];

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 sm:pt-36 pb-16 sm:pb-20 bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-white">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="section-label">OUR CAPABILITIES</span>
          <h1 className="text-3xl min-[380px]:text-4xl sm:text-6xl font-medium tracking-tight text-[#0C4A6E] mb-4 sm:mb-6">
            Seven digital layers.<br />One unified team.
          </h1>
          <p className="text-base sm:text-lg text-[#3F7FA8] max-w-2xl mx-auto leading-relaxed">
            From the initial line of code to global cloud scaling, SATR bridges technical depth with bespoke product design.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {divisions.map((div) => (
              <div 
                key={div.slug}
                className="rounded-2xl border border-[#D6E6F2] p-5 sm:p-8 bg-gradient-to-b from-white to-[#F0F9FF] shadow-[0_18px_30px_-22px_rgba(12,74,110,0.45)] hover:border-[#7DD3FC] hover:shadow-[0_22px_42px_-20px_rgba(12,74,110,0.4)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7DD3FC] to-[#0369A1] text-white flex items-center justify-center shadow-md mb-6">
                    {div.icon}
                  </div>
                  <span className="font-mono text-xs text-[#0EA5E9] tracking-wider block mb-1">
                    {div.tag}
                  </span>
                  <h2 className="text-2xl font-medium text-[#0C4A6E] mb-3">
                    {div.title}
                  </h2>
                  <p className="text-sm text-[#3F7FA8] mb-6 leading-relaxed">
                    {div.desc}
                  </p>
                  <ul className="space-y-2 mb-8 border-t border-[#E0F2FE] pt-4">
                    {div.items.map((it) => (
                      <li key={it} className="text-xs text-[#0C4A6E] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/services/${div.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#0EA5E9] hover:text-[#0369A1] transition-colors"
                >
                  <span>Explore division</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </main>
  );
}
