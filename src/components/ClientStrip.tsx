'use client';

import React from 'react';

const clients = [
  'CLIENT ONE',
  'CLIENT TWO',
  'CLIENT THREE',
  'CLIENT FOUR',
  'CLIENT FIVE',
];

export function ClientStrip() {
  return (
    <section className="w-full border-y border-[#E0F2FE] py-5 overflow-hidden bg-white">
      <div className="animate-marquee flex items-center">
        {/* First set */}
        {clients.map((c, i) => (
          <div
            key={`c1-${i}`}
            className="font-mono text-xs sm:text-sm tracking-[0.16em] uppercase text-[#7FB3D5] font-medium px-8 sm:px-12 flex items-center gap-4 whitespace-nowrap"
          >
            <span>{c}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#BAE6FD]" />
          </div>
        ))}
        {/* Duplicated for seamless 22s marquee */}
        {clients.map((c, i) => (
          <div
            key={`c2-${i}`}
            className="font-mono text-xs sm:text-sm tracking-[0.16em] uppercase text-[#7FB3D5] font-medium px-8 sm:px-12 flex items-center gap-4 whitespace-nowrap"
          >
            <span>{c}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#BAE6FD]" />
          </div>
        ))}
        {/* Tripled for ultrawide screens */}
        {clients.map((c, i) => (
          <div
            key={`c3-${i}`}
            className="font-mono text-xs sm:text-sm tracking-[0.16em] uppercase text-[#7FB3D5] font-medium px-8 sm:px-12 flex items-center gap-4 whitespace-nowrap"
          >
            <span>{c}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#BAE6FD]" />
          </div>
        ))}
      </div>
    </section>
  );
}
