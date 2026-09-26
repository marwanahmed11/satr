'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export function StatsBand() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [counts, setCounts] = useState({ stat1: 0, stat2: 0, stat3: 0 });

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);

          const duration = 1200; // 1.2s
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setCounts({
              stat1: Math.floor(easedProgress * 40),
              stat2: Math.floor(easedProgress * 7),
              stat3: Math.floor(easedProgress * 90),
            });

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCounts({ stat1: 40, stat2: 7, stat3: 90 });
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
    <section 
      ref={sectionRef}
      className="w-full py-16 bg-gradient-to-r from-[#0C4A6E] via-[#0369A1] to-[#0EA5E9] text-white"
    >
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-8 md:gap-0">
          
          {/* Stat 1 */}
          <div className="pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-[#BAE6FD]/25 md:px-8 relative">
            <div className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-1.5 sm:mb-2">
              {counts.stat1}+
            </div>
            <div className="text-xs sm:text-sm font-normal text-[#BAE6FD]">
              {t('stats.products')}
            </div>
          </div>

          {/* Stat 2 */}
          <div className="pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-[#BAE6FD]/25 md:px-8 relative">
            <div className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-1.5 sm:mb-2">
              {counts.stat2}
            </div>
            <div className="text-xs sm:text-sm font-normal text-[#BAE6FD]">
              {t('stats.divisions')}
            </div>
          </div>

          {/* Stat 3 */}
          <div className="md:px-8">
            <div className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-1.5 sm:mb-2">
              {counts.stat3}
            </div>
            <div className="text-xs sm:text-sm font-normal text-[#BAE6FD]">
              {t('stats.days')}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
