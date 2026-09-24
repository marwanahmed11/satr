'use client';

import React, { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function FloatingNotification() {
  const { t } = useLanguage();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 900) return;
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      // Max 16px X, 10px Y opposite
      setOffset({
        x: -mouseX * 32,
        y: -mouseY * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        transform: `translate(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="absolute right-[5%] bottom-28 z-20 hidden sm:flex items-center gap-3.5 px-4 py-3 glass-card bg-white/80 animate-float-bob shadow-[0_22px_40px_-22px_rgba(12,74,110,0.55)] cursor-default"
    >
      <div className="w-9 h-9 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center shadow-sm">
        <Rocket size={18} />
      </div>
      <div className="leading-tight">
        <p className="text-xs font-medium text-[#0C4A6E]">
          {t('hero.notif_title')}
        </p>
        <p className="text-xs font-semibold text-[#0EA5E9]">
          {t('hero.notif_sub')}
        </p>
      </div>
    </div>
  );
}
