'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ClosingCTA } from '@/components/ClosingCTA';
import { useLanguage } from '@/context/LanguageContext';
import { Shield, Sparkles, Target, Users } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    {
      title: 'Precision from Line One',
      desc: 'We never patch over architectural debt. Every database schema, design token, and line of code is deliberate.',
      icon: <Target size={24} className="text-[#0EA5E9]" />,
    },
    {
      title: 'One Unified System',
      desc: 'Design, frontend, backend, and cloud are not isolated departments. We think and ship as one single engineering organism.',
      icon: <Users size={24} className="text-[#0EA5E9]" />,
    },
    {
      title: 'Calm, Confident Delivery',
      desc: 'No buzzwords, no gaming gimmicks, and no chaotic handoffs. We build enterprise-grade software with calm clarity.',
      icon: <Shield size={24} className="text-[#0EA5E9]" />,
    },
    {
      title: 'Global Engineering Depth',
      desc: 'Headquartered in Cairo, Egypt, serving ambitious founders and enterprises across the Middle East, Europe, and North America.',
      icon: <Sparkles size={24} className="text-[#0EA5E9]" />,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 sm:pt-36 pb-16 sm:pb-20 bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="section-label">THE STORY OF SATR</span>
          <h1 className="text-3xl min-[380px]:text-4xl sm:text-6xl font-medium tracking-tight text-[#0C4A6E] mb-4 sm:mb-6">
            Everything starts with a line.
          </h1>
          <p className="text-base sm:text-lg text-[#3F7FA8] max-w-2xl mx-auto leading-relaxed">
            Named after the Arabic word <strong className="text-[#0C4A6E] font-medium">سطر</strong> (meaning &quot;a line&quot;), SATR represents the foundational origin of all technology.
          </p>
        </div>
      </section>

      {/* Story & Concept */}
      <section className="py-16 sm:py-20 border-b border-[#E0F2FE]">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <span className="section-label">THE CONCEPT</span>
              <h2 className="text-2xl sm:text-3xl font-medium text-[#0C4A6E] mb-4">
                A line of code.<br />A line connecting systems.
              </h2>
              <p className="text-sm sm:text-base text-[#3F7FA8] leading-relaxed mb-4">
                The first line of a new product is where clarity is forged. Most technology initiatives stumble not because of ideas, but because they fragment across disparate agencies, contractors, and tools.
              </p>
              <p className="text-sm sm:text-base text-[#3F7FA8] leading-relaxed">
                SATR was established as a full-service technology partner: one team that designs, builds, and scales websites, mobile applications, custom software, e-commerce, AI, and cloud infrastructure.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0C4A6E] to-[#0EA5E9] text-white shadow-xl relative overflow-hidden">
              <div className="text-7xl font-semibold opacity-20 absolute -right-4 -bottom-4 font-arabic select-none">
                سطر
              </div>
              <div className="font-mono text-xs text-[#BAE6FD] uppercase tracking-wider mb-2">
                MISSION STATEMENT
              </div>
              <p className="text-lg sm:text-xl font-normal leading-relaxed text-white">
                &ldquo;To be the single definitive technology partner for ambitious companies, engineering every digital layer with uncompromising craft.&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-white/20 text-xs text-[#BAE6FD]">
                SATR Technology Partner · Cairo, Egypt
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 sm:py-24 bg-[#F5FAFF]">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="section-label">OUR VALUES</span>
            <h2 className="text-2xl sm:text-4xl font-medium text-[#0C4A6E]">
              How we approach every build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((v, i) => (
              <div 
                key={i}
                className="p-5 sm:p-8 rounded-2xl bg-white border border-[#D6E6F2] shadow-[0_18px_30px_-22px_rgba(12,74,110,0.45)] hover:border-[#7DD3FC] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center mb-5">
                  {v.icon}
                </div>
                <h3 className="text-xl font-medium text-[#0C4A6E] mb-2.5">
                  {v.title}
                </h3>
                <p className="text-sm text-[#3F7FA8] leading-relaxed">
                  {v.desc}
                </p>
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
