import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Check, Plus } from 'lucide-react';
import BrandIcon from './BrandIcon';

const services = [
  {
    num: '01', title: 'Custom Websites', tag: 'WEB',
    desc: 'Hand-coded landing pages, marketing sites, and brand hubs. Engineered for speed, built for search, designed to close. Every pixel earns its place.',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    points: ['Sub-2s load times', 'SEO-ready structure', 'CMS on request'],
  },
  {
    num: '02', title: 'E-Commerce', tag: 'SHOP',
    desc: 'Storefronts engineered to sell: secure checkout, live inventory, order flows, and an admin you\u2019ll actually enjoy. Your best salesperson, on duty 24/7.',
    stack: ['Next.js', 'Stripe', 'PostgreSQL', 'Shopify'],
    points: ['Stripe & PayPal', 'Admin dashboard', 'Conversion-tested flows'],
  },
  {
    num: '03', title: 'Mobile Apps', tag: 'APP',
    desc: 'iOS and Android apps that feel native, published to both stores with push, offline mode, and buttery 60fps interactions.',
    stack: ['Flutter', 'React Native', 'Firebase', 'Swift'],
    points: ['App Store publishing', 'Push & offline', '60fps interactions'],
  },
  {
    num: '04', title: 'Web Applications', tag: 'SAAS',
    desc: 'Dashboards, SaaS platforms, and internal tools with real auth, realtime data, and cloud-native architecture that scales past the hockey stick.',
    stack: ['React', 'Node.js', 'GraphQL', 'PostgreSQL', 'AWS'],
    points: ['Role-based auth', 'Real-time data', 'CI/CD pipelines'],
  },
  {
    num: '05', title: 'UI / UX Design', tag: 'DESIGN',
    desc: 'Interfaces that guide the eye and close the deal. Flows backed by research, polished down to the last micro-interaction.',
    stack: ['Figma', 'Framer'],
    points: ['Design systems', 'Interactive prototypes', 'Brand language'],
  },
  {
    num: '06', title: 'Security & Care', tag: 'OPS',
    desc: 'Enterprise hardening: SSL, encrypted data, automated backups, round-the-clock monitoring. You sleep; your uptime doesn\u2019t.',
    stack: ['AWS', 'Docker', 'Redis'],
    points: ['Bank-grade SSL', 'Automated backups', '24/7 monitoring'],
  },
  {
    num: '07', title: 'Rescue & Migration', tag: 'SOS',
    desc: 'Inherited a broken site or outgrew your template? We audit honestly, then fix what\u2019s worth fixing and rebuild the rest without losing your SEO.',
    stack: ['Node.js', 'AWS', 'Git'],
    points: ['Free health audit', 'Zero-downtime migration', 'Fix or rebuild, your call'],
  },
  {
    num: '08', title: 'AI Integration', tag: 'AI',
    desc: 'Chatbots, copilots, and AI-powered SaaS. LLM features wired into your product with your data, your brand voice, and proper guardrails. Not a gimmick bolted on, a capability that works.',
    stack: ['OpenAI', 'Claude', 'Gemini', 'LangChain'],
    points: ['Trained on your data', 'Privacy & guardrails', 'Usage-cost control'],
  },
];

/* the detail shown for the active service — sticky on desktop, inline on mobile */
function Detail({ s }: { s: typeof services[0] }) {
  return (
    <div>
      <p className="text-sm text-mut leading-relaxed mb-5">{s.desc}</p>
      <div className="t-label text-mut-2 mb-3">Stack</div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mb-5">
        {s.stack.map((name) => (
          <span key={name} className="flex items-center gap-2">
            <BrandIcon name={name} size={20} />
            <span className="text-[11px] font-semibold text-ink">{name}</span>
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {s.points.map((p) => (
          <span key={p} className="flex items-center gap-1.5 text-xs font-medium text-mut">
            <Check className="w-3.5 h-3.5 text-verm" /> {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '120px 0px' });
  const [active, setActive] = useState(0);
  const cur = services[Math.max(active, 0)];

  return (
    <section id="services" ref={ref} className="relative py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Sticky rail: heading + live detail */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
              >
                <div className="t-label text-verm mb-5">(01) · SERVICES</div>
                <h2 className="t-display text-5xl lg:text-7xl text-ink mb-5">
                  Built to<br />
                  <span className="text-verm">convert.</span>
                </h2>
                <p className="text-mut leading-relaxed max-w-md mb-8">
                  Eight disciplines, one standard: software that pays for itself.
                  Pick a capability to see what's under the hood.
                </p>

                {/* desktop live detail */}
                <div className="hidden lg:block border-2 border-ink bg-card p-6 hard-shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="t-mono text-[11px] text-mut">CURRENT FOCUS</span>
                    <span className="t-label text-mut-2 border border-line px-2 py-0.5">{cur.tag}</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={Math.max(active, 0)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="t-display text-3xl text-ink mb-4">
                        {cur.title}<span className="text-verm animate-blink">_</span>
                      </h3>
                      <Detail s={cur} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Index rows — hover on desktop, tap to expand on mobile */}
          <div className="lg:col-span-7 space-y-2.5">
            {services.map((s, i) => {
              const on = active === i;
              return (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                >
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(on && window.innerWidth < 1024 ? -1 : i)}
                    aria-expanded={on}
                    className={`w-full text-left border-2 transition-all duration-200 active:scale-[0.99] ${
                      on ? 'border-ink bg-card translate-x-0' : 'border-line bg-transparent hover:border-ink/40'
                    }`}
                  >
                    <div className="flex items-center gap-4 px-5 py-4 lg:py-5">
                      <span className={`t-mono text-xs transition-colors ${on ? 'text-verm' : 'text-mut-2'}`}>/{s.num}</span>
                      <span className={`t-display text-xl lg:text-3xl tracking-tight transition-colors flex-1 ${on ? 'text-ink' : 'text-mut'}`}>
                        {s.title}
                      </span>
                      <span className="hidden sm:block t-label text-mut-2 border border-line px-2 py-0.5">{s.tag}</span>
                      <Plus className={`w-4 h-4 shrink-0 transition-transform duration-300 lg:hidden ${on ? 'rotate-45 text-verm' : 'text-mut-2'}`} />
                      <ArrowRight className={`w-4 h-4 shrink-0 hidden lg:block transition-all duration-300 ${on ? 'text-verm translate-x-0' : 'text-mut-2 -translate-x-1 opacity-0'}`} />
                    </div>

                    {/* mobile inline detail */}
                    <div className={`lg:hidden grid transition-all duration-500 ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 border-t border-line pt-4">
                          <Detail s={s} />
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}

            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              href="#pricing"
              onClick={(e) => { e.preventDefault(); document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group mt-4 flex items-center justify-between border-2 border-dashed border-line-2 p-5 hover:border-ink hover:bg-card transition-all"
            >
              <span className="t-display text-xl lg:text-2xl text-ink">See transparent pricing</span>
              <span className="w-11 h-11 bg-ink text-paper flex items-center justify-center group-hover:bg-verm transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
