'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const divisions = [
  { key: 'div.web', slug: 'web' },
  { key: 'div.mobile', slug: 'mobile' },
  { key: 'div.saas', slug: 'saas' },
  { key: 'div.software', slug: 'software' },
  { key: 'div.commerce', slug: 'commerce' },
  { key: 'div.ai', slug: 'ai' },
  { key: 'div.cloud', slug: 'cloud' },
];

export function DivisionLine() {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 w-full pt-4 pb-6">
      <div className="w-full max-w-6xl mx-auto px-6">
        
        {/* Track Line with traveling dot */}
        <div className="relative h-4 flex items-center">
          <div className="w-full h-[2px] rounded-full bg-gradient-to-r from-[#0C4A6E] via-[#0EA5E9] via-[#7DD3FC] via-[#38BDF8] to-[#0EA5E9]" />
          <div className="absolute top-[2px] w-3 h-3 rounded-full bg-white border-2 border-[#0EA5E9] shadow-[0_0_0_4px_rgba(14,165,233,0.22)] animate-travel-dot" />
        </div>

        {/* 7 Division Labels */}
        <div className="flex flex-wrap items-center justify-center sm:grid sm:grid-cols-7 text-center gap-x-4 gap-y-1.5 sm:gap-2 mt-2.5 text-xs font-medium text-[#0C4A6E]">
          {divisions.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="py-1 px-1 hover:text-[#0EA5E9] hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
