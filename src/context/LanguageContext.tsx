'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  dir: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand
    'brand.name': 'SATR',
    'brand.arabic': 'سطر',
    'brand.tagline': 'Built from the first line.',
    'brand.positioning': 'One partner. Every digital layer.',

    // Nav
    'nav.work': 'Work',
    'nav.services': 'Services',
    'nav.stack': 'The Stack',
    'nav.process': 'About',
    'nav.contact': 'Contact',
    'nav.cta': 'Start a project →',
    'nav.switch': 'العربية',

    // Hero
    'hero.badge': 'Now booking Q4 projects',
    'hero.title_p1': 'Built from',
    'hero.title_p2': 'the first',
    'hero.title_line': 'line',
    'hero.sub_prefix': 'We build your',
    'hero.sub_suffix': 'for ambitious companies.',
    'hero.input_placeholder': 'Write your idea in one line',
    'hero.build_btn': 'Build it →',
    'hero.empty_error': 'Write your idea first',
    'hero.success_msg': "That's line one. We reply within 24 hours.",
    'hero.notif_title': 'App launched',
    'hero.notif_sub': '+2.4k users',

    // Divisions bar
    'div.web': 'Web',
    'div.mobile': 'Mobile',
    'div.saas': 'SaaS',
    'div.software': 'Software',
    'div.commerce': 'Commerce',
    'div.ai': 'AI',
    'div.cloud': 'Cloud',

    // Services
    'services.label': 'WHAT WE BUILD',
    'services.heading': 'One partner. Every digital layer.',
    'services.view_detail': 'Explore division →',

    'serv.web.title': 'Corporate platforms',
    'serv.web.desc': 'Corporate websites, landing pages, web apps, portals, UI/UX, and design systems built for authority and scale.',
    'serv.mobile.title': 'iOS and Android apps',
    'serv.mobile.desc': 'Cross-platform and native customer apps, mobile commerce, and internal tools with buttery 120fps interactions.',
    'serv.saas.title': 'Products that scale',
    'serv.saas.desc': 'MVPs, subscription platforms, multi-tenant dashboards, admin panels, and billing engines ready for global users.',
    'serv.software.title': 'CRM, ERP and internal tools',
    'serv.software.desc': 'Bespoke operational backbones, workflow engines, sales systems, and automation connecting your workforce.',
    'serv.commerce.title': 'Headless stores',
    'serv.commerce.desc': 'Lightning-fast storefronts, Shopify Plus, headless architectures, unified checkout, and high-volume marketplaces.',
    'serv.ai.title': 'Intelligent tools',
    'serv.ai.desc': 'AI apps, custom LLM assistants, automated customer pipelines, and predictive workflow automation.',
    'serv.cloud.title': 'Infrastructure and integrations',
    'serv.cloud.desc': 'Resilient cloud architecture, scalable microservices, payment gateways, databases, DevOps, and continuous monitoring.',

    // Stack
    'stack.label': 'THE WHOLE STACK',
    'stack.heading': 'Design, code and infrastructure. Together.',
    'stack.text': 'Every layer engineered by one team, so your product works as one system without handoff friction or technical debt.',
    'stack.infra': 'Infrastructure',
    'stack.code': 'Code',
    'stack.design': 'Design',

    // Stats
    'stats.products': 'Products launched',
    'stats.divisions': 'Technology divisions',
    'stats.days': 'Days, idea to launch',

    // Work
    'work.label': 'SELECTED WORK',
    'work.heading': 'Real products. Real growth.',
    'work.view_all': 'View all work →',
    'work.card1.topic': 'FINTECH & BANKING',
    'work.card1.tags': 'Web · Security · Cloud',
    'work.card1.title': 'Global fintech platform',
    'work.card2.topic': 'RETAIL & COMMERCE',
    'work.card2.tags': 'Mobile · Commerce · AI',
    'work.card2.title': 'Retail commerce platform',
    'work.card3.topic': 'ENTERPRISE AI & SAAS',
    'work.card3.tags': 'AI · SaaS · Telemetry',
    'work.card3.title': 'Enterprise AI telemetry',

    // How We Work
    'process.label': 'HOW WE WORK',
    'process.heading': 'Every step builds higher.',
    'process.step1': 'Idea',
    'process.step1.desc': 'Distilling product scope and architectural lines.',
    'process.step2': 'Design',
    'process.step2.desc': 'Precision UI/UX, component design systems, and flows.',
    'process.step3': 'Build',
    'process.step3.desc': 'High-performance engineering across frontend and backend.',
    'process.step4': 'Launch',
    'process.step4.desc': 'QA testing, CI/CD deployment, and telemetry.',
    'process.step5': 'Scale',
    'process.step5.desc': 'Infrastructure scaling, AI augmentation, and iteration.',

    // CTA Banner
    'cta.heading': 'Your idea is line one.',
    'cta.sub': "Let's write the rest together.",
    'cta.button': 'Start a project →',

    // Footer
    'footer.location': 'Cairo, Egypt',
    'footer.email': 'hello@satr.tech',
    'footer.copy': '© SATR. Built from the first line.',
    'footer.careers': 'Careers',
    'footer.privacy': 'Privacy',

    // Contact modal / page
    'contact.title': 'Start a project',
    'contact.sub': "Let's scope your product line by line.",
    'contact.step1': 'What do you want to build?',
    'contact.step2': 'What is your budget range?',
    'contact.step3': 'Target launch timeline?',
    'contact.step4': 'Your contact information',
    'contact.submit': 'Submit line one →',
  },
  ar: {
    // Brand
    'brand.name': 'سطر',
    'brand.arabic': 'SATR',
    'brand.tagline': 'بُنيت من السطر الأول.',
    'brand.positioning': 'شريك واحد. لكل طبقة رقمية.',

    // Nav
    'nav.work': 'الأعمال',
    'nav.services': 'الخدمات',
    'nav.stack': 'المنظومة',
    'nav.process': 'عن سطر',
    'nav.contact': 'تواصل معنا',
    'nav.cta': 'ابدأ مشروعك ←',
    'nav.switch': 'English',

    // Hero
    'hero.badge': 'متاح حالياً حجز مشاريع الربع الرابع',
    'hero.title_p1': 'بُنيت من',
    'hero.title_p2': 'السطر',
    'hero.title_line': 'الأول',
    'hero.sub_prefix': 'نحن نبني',
    'hero.sub_suffix': 'للشركات الطموحة.',
    'hero.input_placeholder': 'اكتب فكرتك في سطر واحد',
    'hero.build_btn': 'ابنها الآن ←',
    'hero.empty_error': 'يرجى كتابة فكرتك أولاً',
    'hero.success_msg': 'هذا هو السطر الأول. سنرد عليك خلال 24 ساعة.',
    'hero.notif_title': 'تم إطلاق التطبيق',
    'hero.notif_sub': '+2.4 ألف مستخدم',

    // Divisions bar
    'div.web': 'الويب',
    'div.mobile': 'الجوال',
    'div.saas': 'سحابي SaaS',
    'div.software': 'الأنظمة',
    'div.commerce': 'التجارة',
    'div.ai': 'الذكاء الاصطناعي',
    'div.cloud': 'السحابة',

    // Services
    'services.label': 'ماذا نبني',
    'services.heading': 'شريك واحد. لكل طبقة رقمية.',
    'services.view_detail': 'استكشف القسم ←',

    'serv.web.title': 'منصات ومواقع الشركات',
    'serv.web.desc': 'مواقع مؤسسية متقدمة، بوابات رقمية، وتجارب مستخدم فائقة الإتقان مصممة للهيمنة والنمو.',
    'serv.mobile.title': 'تطبيقات iOS و Android',
    'serv.mobile.desc': 'تطبيقات جوال سريعة بلمسات انسيابية وتزامن فوري وتجربة استخدام لا مثيل لها.',
    'serv.saas.title': 'منتجات SaaS تنمو بثقة',
    'serv.saas.desc': 'معماريات متعددة المستأجرين، لوحات تحكم ديناميكية، وأنظمة اشتراكات وفواتير دولية متكاملة.',
    'serv.software.title': 'أنظمة CRM و ERP والأدوات الداخلية',
    'serv.software.desc': 'بنية تشغيلية مخصصة ومحركات عمل تربط جميع فرقك وبياناتك في منظومة واحدة متكاملة.',
    'serv.commerce.title': 'متاجر التجارة الإلكترونية المتقدمة',
    'serv.commerce.desc': 'متاجر بدون رأس Headless فائقة السرعة، بوابات دفع مدمجة، وإدارة شاملة للمخزون والطلبات.',
    'serv.ai.title': 'أدوات الذكاء الاصطناعي',
    'serv.ai.desc': 'مساعدين أذكياء مخصصين، أتمتة تدفقات خدمة العملاء، ونماذج تنبؤية مدربة على بياناتك بدقة.',
    'serv.cloud.title': 'البنية التحتية والربط السحابي',
    'serv.cloud.desc': 'بنى سحابية ذات موثوقية عالية، واجهات برمجة تطبيقات سريعة، ونظم نشر مستمر آمنة وشديدة الثبات.',

    // Stack
    'stack.label': 'المنظومة الكاملة',
    'stack.heading': 'التصميم والبرمجة والبنية التحتية. معاً.',
    'stack.text': 'كل طبقة يتم تصميمها وهندستها بفريق واحد ليعمل منتجك كنظام موحد سلس دون فجوات تسليم أو ديون تقنية.',
    'stack.infra': 'البنية التحتية',
    'stack.code': 'البرمجة',
    'stack.design': 'التصميم',

    // Stats
    'stats.products': 'منتج تم إطلاقه',
    'stats.divisions': 'أقسام تقنية متخصصة',
    'stats.days': 'يوم من الفكرة للإطلاق',

    // Work
    'work.label': 'أعمال مختارة',
    'work.heading': 'منتجات حقيقية. نمو حقيقي.',
    'work.view_all': 'عرض كل الأعمال ←',
    'work.card1.topic': 'التكنولوجيا المالية والبنوك',
    'work.card1.tags': 'ويب · أمان · بنية سحابية',
    'work.card1.title': 'منصة التكنولوجيا المالية العالمية',
    'work.card2.topic': 'التجارة والتجزئة الذكية',
    'work.card2.tags': 'تطبيقات · تجارة · ذكاء اصطناعي',
    'work.card2.title': 'منصة التجارة والتجزئة الذكية',
    'work.card3.topic': 'الذكاء الاصطناعي المؤسسي والـ SaaS',
    'work.card3.tags': 'ذكاء اصطناعي · سحابي · تحليلات',
    'work.card3.title': 'منصة قياس وتحليلات الذكاء الاصطناعي',

    // How We Work
    'process.label': 'كيف نعمل',
    'process.heading': 'كل خطوة ترتفع بك أعلى.',
    'process.step1': 'الفكرة',
    'process.step1.desc': 'تحديد النطاق بدقة ورسم المعمارية الأساسية.',
    'process.step2': 'التصميم',
    'process.step2.desc': 'تصميم واجهات وتجارب استخدام فائقة الإتقان ونظام تصميم موحد.',
    'process.step3': 'البناء',
    'process.step3.desc': 'برمجة متينة وكود نظيف يراعي الأمان وقابلية التوسع.',
    'process.step4': 'الإطلاق',
    'process.step4.desc': 'اختبارات جودة شاملة، ونشر سحابي مؤتمت وتحليلات فورية.',
    'process.step5': 'التوسع',
    'process.step5.desc': 'مراقبة مستمرة، وتطوير سحابي وتوسيع القدرات بالذكاء الاصطناعي.',

    // CTA Banner
    'cta.heading': 'فكرتك هي السطر الأول.',
    'cta.sub': 'دعنا نكتب البقية معاً.',
    'cta.button': 'ابدأ مشروعك ←',

    // Footer
    'footer.location': 'القاهرة، مصر',
    'footer.email': 'hello@satr.tech',
    'footer.copy': '© سطر. بُنيت من السطر الأول.',
    'footer.careers': 'الوظائف',
    'footer.privacy': 'الخصوصية',

    // Contact modal / page
    'contact.title': 'ابدأ مشروعك',
    'contact.sub': 'دعنا نحدد ملامح منتجك سطراً بسطر.',
    'contact.step1': 'ماذا تود أن تبني؟',
    'contact.step2': 'ما هو النطاق التقديري للميزانية؟',
    'contact.step3': 'الجدول الزمني المستهدف للإطلاق؟',
    'contact.step4': 'معلومات التواصل الخاصة بك',
    'contact.submit': 'أرسل السطر الأول ←',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLanguage, setLanguage, t }}>
      <div dir={dir} className={lang === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
