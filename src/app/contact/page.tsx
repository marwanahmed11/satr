'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Check, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [selectedLayer, setSelectedLayer] = useState('Website');
  const [selectedBudget, setSelectedBudget] = useState('$25k – $50k');
  const [selectedTimeline, setSelectedTimeline] = useState('1 – 3 months');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const layerOptions = [
    'Website',
    'Mobile app',
    'SaaS',
    'Custom software',
    'E-commerce',
    'AI',
    'Not sure yet',
  ];

  const budgetOptions = [
    '$10k – $25k',
    '$25k – $50k',
    '$50k – $100k',
    '$100k+',
    'Undecided',
  ];

  const timelineOptions = [
    '< 1 month (Rush)',
    '1 – 3 months',
    '3 – 6 months',
    'Flexible',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg(
        lang === 'ar'
          ? 'يرجى كتابة الاسم والبريد الإلكتروني.'
          : 'Please enter your name and email.'
      );
      return;
    }

    setErrorMsg('');
    setStep(5);

    const fullLead = {
      ...formData,
      layer: selectedLayer,
      budget: selectedBudget,
      timeline: selectedTimeline,
      timestamp: new Date().toISOString(),
    };
    const stored = JSON.parse(localStorage.getItem('satr_contact_leads') || '[]');
    stored.push(fullLead);
    localStorage.setItem('satr_contact_leads', JSON.stringify(stored));
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 sm:pt-36 pb-16 sm:pb-24 bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-white">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-8 sm:mb-12">
            <span className="section-label">START A PROJECT</span>
            <h1 className="text-3xl min-[380px]:text-4xl sm:text-6xl font-medium tracking-tight text-[#0C4A6E] mb-3 sm:mb-4">
              Your idea is line one.
            </h1>
            <p className="text-sm sm:text-lg text-[#3F7FA8]">
              Scope your initiative step-by-step. We reply within 24 hours.
            </p>
          </div>

          {/* Interactive Chat-Style Card */}
          <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_25px_60px_-15px_rgba(12,74,110,0.4)] p-5 sm:p-12 relative">
            
            {/* Step 1 */}
            {step === 1 && (
              <div>
                <span className="section-label">STEP 1 OF 4 · PRODUCT LAYER</span>
                <h2 className="text-2xl sm:text-3xl font-medium text-[#0C4A6E] mb-2">
                  What do you want to build?
                </h2>
                <p className="text-sm text-[#3F7FA8] mb-8">
                  Choose the core digital layer for your product.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  {layerOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedLayer(opt)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                        selectedLayer === opt
                          ? 'bg-[#0EA5E9] text-white shadow-sm'
                          : 'bg-[#F0F9FF] text-[#0C4A6E] border border-[#BAE6FD] hover:border-[#0EA5E9]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="btn-primary py-3 px-8"
                >
                  Next: Budget Range →
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <span className="section-label">STEP 2 OF 4 · BUDGET</span>
                <h2 className="text-2xl sm:text-3xl font-medium text-[#0C4A6E] mb-2">
                  What is your target budget?
                </h2>
                <p className="text-sm text-[#3F7FA8] mb-8">
                  Helps us calibrate sprint architecture and feature velocity.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedBudget(opt)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                        selectedBudget === opt
                          ? 'bg-[#0EA5E9] text-white shadow-sm'
                          : 'bg-[#F0F9FF] text-[#0C4A6E] border border-[#BAE6FD] hover:border-[#0EA5E9]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="btn-navy py-3 px-6">
                    ← Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn-primary py-3 px-8">
                    Next: Timeline →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <span className="section-label">STEP 3 OF 4 · TIMELINE</span>
                <h2 className="text-2xl sm:text-3xl font-medium text-[#0C4A6E] mb-2">
                  What is your target timeline?
                </h2>
                <p className="text-sm text-[#3F7FA8] mb-8">
                  When do you need version 1.0 ready for production?
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {timelineOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedTimeline(opt)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                        selectedTimeline === opt
                          ? 'bg-[#0EA5E9] text-white shadow-sm'
                          : 'bg-[#F0F9FF] text-[#0C4A6E] border border-[#BAE6FD] hover:border-[#0EA5E9]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="btn-navy py-3 px-6">
                    ← Back
                  </button>
                  <button onClick={() => setStep(4)} className="btn-primary py-3 px-8">
                    Next: Contact Details →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <form onSubmit={handleSubmit}>
                <span className="section-label">STEP 4 OF 4 · DETAILS</span>
                <h2 className="text-2xl sm:text-3xl font-medium text-[#0C4A6E] mb-2">
                  Tell us about your company
                </h2>
                <p className="text-sm text-[#3F7FA8] mb-8">
                  We prepare a preliminary technical blueprint before our first call.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-mono text-[#0C4A6E] uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border border-[#D6E6F2] text-base focus:outline-none focus:border-[#0EA5E9] text-[#0C4A6E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#0C4A6E] uppercase mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#D6E6F2] text-base focus:outline-none focus:border-[#0EA5E9] text-[#0C4A6E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-mono text-[#0C4A6E] uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+20 100 000 0000"
                      className="w-full px-4 py-3 rounded-xl border border-[#D6E6F2] text-base focus:outline-none focus:border-[#0EA5E9] text-[#0C4A6E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#0C4A6E] uppercase mb-1">
                      Company or Brand
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 rounded-xl border border-[#D6E6F2] text-base focus:outline-none focus:border-[#0EA5E9] text-[#0C4A6E]"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-mono text-[#0C4A6E] uppercase mb-1">
                    Vision or Requirement
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your user flow, core pain point, or target features..."
                    className="w-full px-4 py-3 rounded-xl border border-[#D6E6F2] text-base focus:outline-none focus:border-[#0EA5E9] text-[#0C4A6E] resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-[#B42318] mb-4 font-medium">{errorMsg}</p>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn-navy py-3 px-6"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="btn-primary py-3 px-8"
                  >
                    Submit line one →
                  </button>
                </div>
              </form>
            )}

            {/* Step 5: Success State */}
            {step === 5 && (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#E0F2FE] text-[#0EA5E9] flex items-center justify-center mx-auto mb-6">
                  <Check size={36} />
                </div>
                <h2 className="text-3xl font-medium text-[#0C4A6E] mb-3">
                  That's line one.
                </h2>
                <p className="text-base text-[#3F7FA8] max-w-md mx-auto mb-8 leading-relaxed">
                  We reply within 24 hours with an actionable architectural roadmap and delivery plan.
                </p>
                <div className="p-4 rounded-xl bg-[#F5FAFF] border border-[#E0F2FE] inline-flex items-center gap-3 text-xs font-mono text-[#0C4A6E]">
                  <Mail size={16} className="text-[#0EA5E9]" />
                  <span>Direct team line: hello@satr.tech</span>
                </div>
              </div>
            )}

          </div>

          {/* Location info */}
          <div className="mt-12 text-center text-sm text-[#3F7FA8] flex items-center justify-center gap-2">
            <MapPin size={16} className="text-[#0EA5E9]" />
            <span>SATR Headquarters · Cairo, Egypt · Working with teams globally</span>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
