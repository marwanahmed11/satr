'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />

      <section className="pt-40 pb-28 bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-white flex-1 flex items-center">
        <div className="w-full max-w-4xl mx-auto px-6 text-center">
          <span className="section-label">ERROR 404</span>
          
          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-[#0C4A6E] mb-6">
            This line hasn&apos;t been written yet<span className="text-[#0EA5E9] font-light animate-blink">_</span>
          </h1>

          <p className="text-lg text-[#3F7FA8] max-w-md mx-auto mb-10 leading-relaxed">
            The page you are looking for does not exist in our system map or has moved to another layer.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="btn-navy py-3 px-6 inline-flex items-center gap-2">
              <ArrowLeft size={16} />
              <span>Back home</span>
            </Link>
            
            <Link href="/contact" className="btn-primary py-3 px-7 inline-flex items-center gap-2">
              <span>Start a project</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
