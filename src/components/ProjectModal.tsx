'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, Check } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIdea?: string;
}

export function ProjectModal({ isOpen, onClose, initialIdea = '' }: ProjectModalProps) {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form states
  const [selectedLayer, setSelectedLayer] = useState<string>('Website');
  const [selectedBudget, setSelectedBudget] = useState<string>('$25k – $50k');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('1 – 3 months');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: initialIdea || '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

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

  const handleSubmit = async (e: React.FormEvent) => {
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
    setStep(5); // Success step

    const lead = {
      ...formData,
      layer: selectedLayer,
      budget: selectedBudget,
      timeline: selectedTimeline,
      date: new Date().toISOString(),
    };

    // Store in localStorage as resilient backup
    const stored = JSON.parse(localStorage.getItem('satr_leads') || '[]');
    stored.push(lead);
    localStorage.setItem('satr_leads', JSON.stringify(stored));

    // Send to Next.js API route
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.error('Lead submission network error:', err);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0C4A6E]/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_25px_60px_-15px_rgba(12,74,110,0.6)] p-6 sm:p-10 animate-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#0C4A6E] hover:bg-slate-200 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <span className="section-label">STEP 1 OF 4</span>
            <h3 className="text-2xl font-medium text-[#0C4A6E] mb-2">
              {t('contact.step1')}
            </h3>
            <p className="text-sm text-[#3F7FA8] mb-6">
              Select the primary layer of your initiative.
            </p>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {layerOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedLayer(opt)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
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
              className="btn-primary w-full justify-center py-3"
            >
              Next: Budget →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <span className="section-label">STEP 2 OF 4</span>
            <h3 className="text-2xl font-medium text-[#0C4A6E] mb-2">
              {t('contact.step2')}
            </h3>
            <p className="text-sm text-[#3F7FA8] mb-6">
              Helps us tailor architecture and sprint allocation.
            </p>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {budgetOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedBudget(opt)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    selectedBudget === opt
                      ? 'bg-[#0EA5E9] text-white shadow-sm'
                      : 'bg-[#F0F9FF] text-[#0C4A6E] border border-[#BAE6FD] hover:border-[#0EA5E9]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="btn-navy py-2.5 px-5"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary flex-1 justify-center py-2.5"
              >
                Next: Timeline →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <span className="section-label">STEP 3 OF 4</span>
            <h3 className="text-2xl font-medium text-[#0C4A6E] mb-2">
              {t('contact.step3')}
            </h3>
            <p className="text-sm text-[#3F7FA8] mb-6">
              When do you plan to go live with version 1.0?
            </p>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {timelineOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedTimeline(opt)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    selectedTimeline === opt
                      ? 'bg-[#0EA5E9] text-white shadow-sm'
                      : 'bg-[#F0F9FF] text-[#0C4A6E] border border-[#BAE6FD] hover:border-[#0EA5E9]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="btn-navy py-2.5 px-5"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="btn-primary flex-1 justify-center py-2.5"
              >
                Next: Details →
              </button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <form onSubmit={handleSubmit}>
            <span className="section-label">STEP 4 OF 4</span>
            <h3 className="text-2xl font-medium text-[#0C4A6E] mb-1">
              {t('contact.step4')}
            </h3>
            <p className="text-xs text-[#3F7FA8] mb-4">
              We review every line and reply within 24 hours.
            </p>

            <div className="space-y-3 mb-4">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full name *"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D6E6F2] text-base focus:outline-none focus:border-[#0EA5E9] text-[#0C4A6E]"
              />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Work email *"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D6E6F2] text-base focus:outline-none focus:border-[#0EA5E9] text-[#0C4A6E]"
              />
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company or project name"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D6E6F2] text-base focus:outline-none focus:border-[#0EA5E9] text-[#0C4A6E]"
              />
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your vision or product requirement..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#D6E6F2] text-base focus:outline-none focus:border-[#0EA5E9] text-[#0C4A6E] resize-none"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-[#B42318] mb-3">{errorMsg}</p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-navy py-2.5 px-5"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="btn-primary flex-1 justify-center py-2.5"
              >
                {t('contact.submit')}
              </button>
            </div>
          </form>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#E0F2FE] text-[#0EA5E9] flex items-center justify-center mx-auto mb-4">
              <Check size={30} />
            </div>
            <h3 className="text-2xl font-medium text-[#0C4A6E] mb-2">
              That's line one.
            </h3>
            <p className="text-sm text-[#3F7FA8] mb-8 max-w-xs mx-auto">
              We received your project details and will send a proposed architectural roadmap within 24 hours.
            </p>
            <button
              onClick={() => {
                setStep(1);
                onClose();
              }}
              className="btn-navy px-8 py-2.5"
            >
              Back to website
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
