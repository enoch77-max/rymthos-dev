import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown, Play, MessageCircle } from 'lucide-react';
import Counter from './Counter';

const WORDS = ['websites', 'mobile apps', 'e-commerce', 'AI products', 'brands'];

// the promises we rotate through the dossier, in our own words
const TICKS = [
  'Fixed quote before we start',
  'Replies within 24 hours',
  '30-day free fixes',
  'You own every line',
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="reveal-mask">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className="reveal-word"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [ti, setTi] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTi((i) => (i + 1) % TICKS.length), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  const word = WORDS[idx];

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden grid-paper pt-16">
      <div className="absolute top-28 right-5 lg:right-10 t-label text-mut-2 hidden lg:block [writing-mode:vertical-rl]">
        RYMTHOS<span className="text-verm">®</span>DEV · EST. 2024
      </div>

      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 min-h-[calc(100svh-4rem)] flex flex-col justify-center pt-12 lg:pt-8 pb-24">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* ===== Left: type ===== */}
          <div className="lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8"
            >
              <span className="bg-ink text-paper t-label px-2.5 py-1.5">RYMTHOS DEV</span>
              <span className="t-label text-mut">Web · Mobile · Commerce · AI</span>
            </motion.div>

            <h1 className="t-display text-[14vw] sm:text-7xl md:text-8xl xl:text-[7.4rem] text-ink">
              <span className="block"><Reveal delay={0.15}>We build</Reveal></span>
              <span
                className="relative block h-[1em] overflow-hidden"
                style={{ perspective: 700 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={idx} className="flex leading-[1]">
                    {word.split('').map((ch, i) => (
                      <motion.span
                        key={i}
                        initial={{ rotateY: -95, opacity: 0 }}
                        animate={{
                          rotateY: 0,
                          opacity: 1,
                          color: ['#101013', '#ff4d1c'],
                          transition: { duration: 0.5, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] },
                        }}
                        exit={{
                          rotateY: 95,
                          opacity: 0,
                          transition: { duration: 0.32, delay: i * 0.018, ease: [0.55, 0, 1, 0.45] },
                        }}
                        style={{ display: 'inline-block', backfaceVisibility: 'hidden' }}
                        className="text-verm"
                      >
                        {ch === ' ' ? '\u00A0' : ch}
                      </motion.span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="block"><Reveal delay={0.4}>that perform.</Reveal></span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-8 max-w-lg text-mut text-base lg:text-lg leading-relaxed"
            >
              Custom web and mobile products. Secure by default, fast by design,
              built to turn visitors into revenue. <span className="text-ink font-semibold">No templates. No shortcuts.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => go('#contact')}
                className="group flex items-center gap-3 bg-ink text-paper pl-6 pr-2 py-2.5 text-sm font-semibold tracking-wide hover:bg-verm transition-colors hard-shadow-sm"
              >
                Start a project
                <span className="w-9 h-9 bg-paper text-ink flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
              <button
                onClick={() => go('#projects')}
                className="group flex items-center gap-3 border-2 border-ink px-6 py-3 text-sm font-semibold tracking-wide hover:bg-ink hover:text-paper transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                View work
              </button>
            </motion.div>

            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); go('#contact'); }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="group mt-7 inline-flex items-center gap-2.5 text-sm text-mut hover:text-verm transition-colors"
            >
              <span className="w-8 h-8 border-2 border-line-2 group-hover:border-verm flex items-center justify-center transition-colors">
                <MessageCircle className="w-3.5 h-3.5" />
              </span>
              Prefer to talk first?{' '}
              <span className="underline decoration-2 underline-offset-4 decoration-verm/60 group-hover:decoration-verm">
                Tell us your vision
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.15 }}
              className="mt-5 flex items-center gap-2 t-label text-mut"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              Free 30-min strategy call. No deposit, no obligation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-12 flex flex-wrap gap-x-12 gap-y-6"
            >
              {[
                { v: <Counter to={15} suffix="+" />, l: 'Projects built' },
                { v: <Counter to={30} suffix="+" />, l: 'Technologies' },
                { v: <span>3–5<span className="text-verm">d</span></span>, l: 'Avg. delivery' },
              ].map((s, i) => (
                <div key={i} className="border-l-2 border-ink pl-4">
                  <div className="t-display text-4xl text-ink">{s.v}</div>
                  <div className="t-label text-mut mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ===== Right: founder dossier — a personnel file, not a poster ===== */}
          <div className="lg:col-span-5 relative lg:self-stretch flex">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full bg-card border-2 border-ink hard-shadow flex flex-col"
            >
              {/* crop marks */}
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-ink" aria-hidden />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-ink" aria-hidden />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-ink" aria-hidden />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-ink" aria-hidden />

              {/* file header */}
              <div className="flex items-center justify-between px-5 py-3 border-b-2 border-ink bg-paper-2">
                <span className="t-label text-mut">A note from the founder</span>
                <span className="t-label text-ink">RYMTHOS<span className="text-verm">®</span>DEV</span>
              </div>

              {/* identity row: photo left, name right */}
              <div className="flex items-start gap-5 lg:gap-6 p-5 lg:p-6">
                <div className="relative shrink-0 self-start group">
                  <span className="absolute inset-0 translate-x-2 translate-y-2 bg-verm" aria-hidden />
                  <div className="relative w-28 lg:w-36 border-2 border-ink bg-ink overflow-hidden">
                    <img
                      src="/photo.jpg"
                      onError={(e) => {
                        const t = e.currentTarget as HTMLImageElement;
                        if (!t.src.includes('postimg.cc')) t.src = 'https://i.postimg.cc/7LmBHj90/Man-wearing-structured-coat-2K-202608122133-1.jpg';
                      }}
                      alt="Md. Billal Hossain"
                      style={{ objectPosition: '50% 18%' }}
                      className="block w-full aspect-[4/5] object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-ink text-paper t-label px-2 py-0.5 whitespace-nowrap">
                    Founder
                  </span>
                </div>

                <div className="min-w-0 flex flex-col justify-center">
                  <div className="t-label text-mut mb-2 flex items-center gap-2">
                    <span className="w-5 h-px bg-verm" />
                    You'll work directly with
                  </div>
                  <h2 className="t-display text-3xl lg:text-[2.6rem] text-ink leading-[0.95] mb-3">
                    Md. Billal<br />Hossain<span className="text-verm">.</span>
                  </h2>
                  <p className="text-sm text-mut leading-relaxed">
                    Design, code, security, launch. Engineering for founders worldwide,
                    rooted in Bangladesh. All handled directly with zero middlemen.
                  </p>
                </div>
              </div>

              {/* the note — first person, said nowhere else on the page */}
              <div className="px-5 lg:px-6 py-5 border-t-2 border-ink space-y-4">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-sm lg:text-[0.95rem] text-mut leading-relaxed"
                >
                  What we build isn't a page. It's your front door at 2 a.m.,
                  the first handshake with every customer who finds you before
                  they ever meet you. Rented land ends;{' '}
                  <span className="text-ink font-semibold underline decoration-verm decoration-2 underline-offset-4">
                    this address is permanently yours.
                  </span>
                </motion.p>
              </div>

              {/* rotating promise ticker */}
              <div className="flex items-center gap-2.5 px-5 lg:px-6 py-2.5 border-t-2 border-ink bg-paper-2 overflow-hidden">
                <span className="w-1.5 h-1.5 bg-verm shrink-0" aria-hidden />
                <div className="h-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ti}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="t-label text-mut block"
                    >
                      {TICKS[ti]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* signature footer */}
              <div className="mt-auto flex items-end justify-between gap-4 px-5 lg:px-6 py-4 border-t-2 border-ink bg-ink text-paper">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.15, duration: 0.5 }}
                    className="t-serif italic text-2xl leading-none"
                  >
                    Billal
                  </motion.div>
                  <div className="t-label text-paper/50 mt-1.5">Founder, Rymthos Dev</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime pulse-dot" />
                    <span className="t-label text-paper/70">Fastest: WhatsApp · Rapid Response</span>
                  </div>
                  <div className="h-1.5 w-20 ml-auto" style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #f4f4f0 0 2px, transparent 2px 4px, #f4f4f0 4px 5px, transparent 5px 9px, #f4f4f0 9px 12px, transparent 12px 14px)',
                  }} aria-hidden />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-5 left-5 lg:left-10 z-10 flex items-center gap-3">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4 text-ink" />
        </motion.div>
        <span className="t-label text-mut">Scroll to explore</span>
      </div>
    </section>
  );
}
