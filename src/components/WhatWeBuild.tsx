'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Smartphone, Layers, Code, ShoppingBag, Sparkles, Cloud } from 'lucide-react';

interface ServiceItem {
  slug: string;
  tag: string;
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    slug: 'web',
    tag: 'WEB',
    titleKey: 'serv.web.title',
    descKey: 'serv.web.desc',
    icon: <Globe size={22} />,
  },
  {
    slug: 'mobile',
    tag: 'MOBILE',
    titleKey: 'serv.mobile.title',
    descKey: 'serv.mobile.desc',
    icon: <Smartphone size={22} />,
  },
  {
    slug: 'saas',
    tag: 'SAAS',
    titleKey: 'serv.saas.title',
    descKey: 'serv.saas.desc',
    icon: <Layers size={22} />,
  },
  {
    slug: 'software',
    tag: 'SOFTWARE',
    titleKey: 'serv.software.title',
    descKey: 'serv.software.desc',
    icon: <Code size={22} />,
  },
  {
    slug: 'commerce',
    tag: 'COMMERCE',
    titleKey: 'serv.commerce.title',
    descKey: 'serv.commerce.desc',
    icon: <ShoppingBag size={22} />,
  },
  {
    slug: 'ai',
    tag: 'AI',
    titleKey: 'serv.ai.title',
    descKey: 'serv.ai.desc',
    icon: <Sparkles size={22} />,
  },
  {
    slug: 'cloud',
    tag: 'CLOUD',
    titleKey: 'serv.cloud.title',
    descKey: 'serv.cloud.desc',
    icon: <Cloud size={22} />,
  },
];

export function WhatWeBuild() {
  const { t } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 900) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    const inner = card.querySelector('.tilt-inner') as HTMLElement;
    if (inner) {
      inner.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const inner = card.querySelector('.tilt-inner') as HTMLElement;
    if (inner) {
      inner.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    }
  };

  return (
    <section className="py-24 bg-white" id="services">
      <div className="w-full max-w-6xl mx-auto px-6">
        
        <div>
          <span className="section-label">{t('services.label')}</span>
          <h2 className="section-heading">{t('services.heading')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group block"
            >
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="h-full rounded-2xl border border-[#D6E6F2] p-5 sm:p-8 bg-gradient-to-b from-white to-[#F0F9FF] shadow-[0_18px_30px_-22px_rgba(12,74,110,0.45)] hover:border-[#7DD3FC] hover:shadow-[0_22px_42px_-20px_rgba(12,74,110,0.4)] transition-all duration-300 [perspective:800px] active:scale-[0.99]"
              >
                <div className="tilt-inner transition-transform duration-200 ease-out [transform-style:preserve-3d]">
                  
                  {/* Floating 42px Icon */}
                  <div 
                    style={{ transform: 'translateZ(34px)' }}
                    className="w-[42px] h-[42px] rounded-xl bg-gradient-to-br from-[#7DD3FC] to-[#0369A1] text-white flex items-center justify-center shadow-[0_10px_20px_-8px_rgba(3,105,161,0.5)] mb-6"
                  >
                    {s.icon}
                  </div>

                  {/* Small Sky Label */}
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#0EA5E9] block mb-1">
                    {s.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-[#0C4A6E] tracking-tight mb-2.5 group-hover:text-[#0EA5E9] transition-colors">
                    {t(s.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#3F7FA8] leading-relaxed">
                    {t(s.descKey)}
                  </p>

                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
