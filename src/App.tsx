import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Outcomes from './components/Outcomes';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import Projects from './components/Projects';
import DemoShowcase from './components/DemoShowcase';
import Payments from './components/Payments';
import Pricing from './components/Pricing';
import FeatureStore from './components/FeatureStore';
import Care from './components/Care';
import SmallBusiness from './components/SmallBusiness';
import Assurance from './components/Assurance';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Calculator from './components/Calculator';
import Legal from './components/Legal';
import CallToAction, { FloatingTalk, MobileCTA } from './components/CallToAction';
import AuditBand from './components/AuditBand';

type LegalDoc = 'terms' | 'privacy';

export default function App() {
  const [calc, setCalc] = useState(false);
  const [legal, setLegal] = useState<LegalDoc | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');

  useEffect(() => {
    document.body.style.overflow = calc || legal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [calc, legal]);

  const toContact = () => {
    setCalc(false);
    setLegal(null);
    setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-paper text-ink noise">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-4 focus:z-[100] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <Navbar
        currency={currency}
        onToggleCurrency={setCurrency}
        onOpenCalc={() => setCalc(true)}
      />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Services />
        <Outcomes />
        <WhyUs />
        <Process />
        <Projects />
        <DemoShowcase />
        <AuditBand />
        <Payments />
        <Pricing
          currency={currency}
          onCurrencyChange={setCurrency}
          onEstimate={() => setCalc(true)}
        />
        <SmallBusiness currency={currency} />
        <FeatureStore
          currency={currency}
          onContact={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        />
        <Care
          currency={currency}
          onEstimate={() => setCalc(true)}
          onContact={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        />
        <Assurance />
        <CallToAction />
        <Contact onOpenLegal={setLegal} />
      </main>
      <Footer onOpenLegal={setLegal} />
      <FloatingTalk />
      <MobileCTA />
      {calc && (
        <Calculator
          currency={currency}
          onCurrencyChange={setCurrency}
          onClose={() => setCalc(false)}
          onContact={toContact}
        />
      )}
      {legal && <Legal doc={legal} onClose={() => setLegal(null)} />}
    </div>
    </MotionConfig>
  );
}
