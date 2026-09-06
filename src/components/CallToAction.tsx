import { useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { WA_NUMBER } from '../lib/lead';

// Prefilled so the client answers three prompts instead of staring at a blank chat.
const WA = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  `Hi Rymthos Dev,

Here's my vision. I'd love your help making it real:

WHAT I WANT TO BUILD:
…

WHO IT'S FOR:
…

WHAT SUCCESS LOOKS LIKE:
…

Whenever you're ready to talk.`,
)}`;

export default function CallToAction() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '120px 0px' });

  const goContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} className="relative bg-ink text-paper overflow-hidden">
      {/* diagonal accent stripes */}
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rotate-12 opacity-[0.07]"
        style={{ background: 'repeating-linear-gradient(-45deg, #ff4d1c 0 18px, transparent 18px 44px)' }} />
      <div className="absolute -bottom-32 -left-20 w-[360px] h-[360px] bg-lime/10 rounded-full blur-[120px]" />

      <div className="relative max-w-[1440px] mx-auto px-5 lg:px-10 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2.5 t-label text-lime mb-8"
        >
          <Sparkles className="w-4 h-4" />
          No package is the final answer
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-8 t-display text-6xl md:text-7xl lg:text-[7rem] leading-[0.92]"
          >
            Tell us your vision.<br />
            <span className="text-lime">Watch it get real.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-4 space-y-4"
          >
            <p className="text-paper/60 text-sm leading-relaxed">
              Packages are starting points, not cages. Describe what you're imagining,
              even roughly, and we'll shape the scope, timeline, and price around it.
            </p>
            <button
              onClick={goContact}
              className="group w-full flex items-center justify-center gap-3 bg-paper text-ink py-4 text-sm font-semibold tracking-wide hover:bg-lime transition-colors"
            >
              Tell us your vision
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full flex items-center justify-center gap-3 border-2 border-paper/30 py-3.5 text-sm font-semibold tracking-wide hover:border-lime hover:text-lime transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Or just message us now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FloatingTalk() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discuss your project on WhatsApp"
          className="group hidden md:flex fixed bottom-6 left-6 z-[60] items-center gap-0 bg-[#25D366] text-paper border-2 border-ink hard-shadow-sm hover:bg-ink transition-colors overflow-hidden"
        >
          <span className="w-11 h-11 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-paper group-hover:text-[#25D366] transition-colors" />
          </span>
          <span className="max-w-0 group-hover:max-w-[160px] overflow-hidden whitespace-nowrap text-xs font-semibold tracking-wide transition-all duration-300">
            Discuss your vision
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// Mobile-only sticky conversion bar — the two actions that matter, always in thumb reach.
export function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-[55] grid grid-cols-2 border-t-2 border-ink bg-paper">
      <button
        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="py-4 text-sm font-bold tracking-wide bg-ink text-paper active:bg-verm transition-colors"
      >
        Get a free quote
      </button>
      <a href={WA} target="_blank" rel="noopener noreferrer" className="py-4 text-center text-sm font-bold bg-[#25D366] text-paper active:opacity-80">
        WhatsApp us
      </a>
    </div>
  );
}
