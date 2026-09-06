import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight, KeyRound, CircleDot, PlusCircle, Hourglass } from 'lucide-react';

const plans = [
  {
    name: 'Essential', price: '$29', period: '/mo', tag: 'KEEP IT RUNNING',
    desc: 'The basics every site needs, handled so you never think about them.',
    features: [
      'Uptime & security monitoring',
      'Weekly automated backups',
      'SSL renewals & security patches',
      'Domain & hosting management',
      'Small content updates (text / images)',
      'Priority email support',
    ],
    tone: 'light' as const,
  },
  {
    name: 'Growth', price: '$79', period: '/mo', tag: 'KEEP IT HEALTHY',
    desc: 'Everything in Essential, plus fixes and tuning for what we built.',
    features: [
      'Everything in Essential',
      'Bug fixes for everything we built',
      'Monthly performance tune-up',
      '2 hrs/mo of small changes',
      'Health & analytics report',
      'Priority WhatsApp support',
    ],
    tone: 'dark' as const,
  },
  {
    name: 'On-Demand', price: 'Custom', period: '', tag: 'WHEN YOU NEED MORE',
    desc: 'Big updates, new features, or full product management for large sites, apps, and SaaS.',
    features: [
      'New features & modules',
      'Redesigns & overhauls',
      'Full product management',
      'Dedicated hours blocks',
      'Custom SLA options',
      'Scales with your product',
    ],
    tone: 'accent' as const,
  },
];

const inside = [
  'Everything we shipped, kept working',
  'Security patches & SSL renewals',
  'Backups & uptime monitoring',
  'Domain & hosting renewals',
  'Small tweaks within your hours (Growth)',
];

const outside = [
  'New features, pages, or modules',
  'Redesigns & big version upgrades',
  'Fixing third-party damage',
  'Full product management',
  'Anything not agreed in writing',
];

export default function Care({ onEstimate, onContact }: { onEstimate: () => void; onContact: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="care" className="relative py-28 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-12 gap-8 mb-14 items-end"
        >
          <div className="lg:col-span-7">
            <div className="t-label text-verm mb-5">(10) · AFTER LAUNCH</div>
            <h2 className="t-display text-6xl lg:text-8xl text-ink">
              Launch day is<br />
              <span className="text-verm">day one.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-mut leading-relaxed max-w-md">
            Websites are living things. Care plans keep yours healthy; anything that
            changes what it <em>is</em> is On-Demand work, priced before we start.
          </p>
        </motion.div>

        {/* the line — visual boundary */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 border-2 border-ink mb-5 bg-card"
        >
          <div className="p-7 lg:p-8">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-8 h-8 bg-lime text-ink flex items-center justify-center"><CircleDot className="w-4 h-4" /></span>
              <h3 className="t-display text-xl">Inside your plan</h3>
            </div>
            <ul className="space-y-3">
              {inside.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-7 lg:p-8 bg-ink text-paper border-t-2 md:border-t-0 md:border-l-2 border-ink">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-8 h-8 bg-verm text-paper flex items-center justify-center"><PlusCircle className="w-4 h-4" /></span>
              <h3 className="t-display text-xl">Outside the plan</h3>
            </div>
            <ul className="space-y-3">
              {outside.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-sm text-paper/80">
                  <ArrowRight className="w-4 h-4 text-verm mt-0.5 shrink-0" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        <p className="text-xs text-mut mb-12 max-w-2xl">
          The line is simple: if it keeps your product <span className="text-ink font-semibold">healthy</span>, it's in the plan.
          If it makes your product <span className="text-ink font-semibold">different</span>, we price it first, in writing, so there's never a surprise.
        </p>

        {/* plans */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className={`relative p-7 border-2 border-ink flex flex-col ${
                p.tone === 'dark' ? 'bg-ink text-paper hard-shadow-verm'
                : p.tone === 'accent' ? 'bg-cobalt text-paper hard-shadow-sm'
                : 'bg-card hard-shadow-sm'
              }`}
            >
              {p.tone === 'dark' && (
                <span className="absolute -top-3.5 left-7 bg-lime text-ink t-label px-3 py-1.5">RECOMMENDED</span>
              )}
              <div className={`t-label mb-2 ${p.tone === 'light' ? 'text-mut' : 'text-paper/60'}`}>{p.tag}</div>
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="t-display text-3xl">{p.name}</h3>
                <span className={`t-display text-2xl ${p.tone === 'light' ? 'text-verm' : 'text-lime'}`}>{p.price}</span>
                <span className={`text-sm ${p.tone === 'light' ? 'text-mut' : 'text-paper/60'}`}>{p.period}</span>
              </div>
              <p className={`text-sm mb-6 ${p.tone === 'light' ? 'text-mut' : 'text-paper/70'}`}>{p.desc}</p>
              <ul className="space-y-2.5 mb-7 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${p.tone === 'light' ? 'text-verm' : 'text-lime'}`} />
                    <span className={p.tone === 'light' ? 'text-ink' : 'text-paper/90'}>{f}</span>
                  </li>
                ))}
              </ul>
              {p.tone === 'accent' ? (
                <button
                  onClick={onContact}
                  className="group flex items-center justify-center gap-2 bg-ink text-paper py-3 text-sm font-semibold tracking-wide hover:bg-paper hover:text-ink transition-colors"
                >
                  Discuss scope
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={onContact}
                  className={`group flex items-center justify-center gap-2 py-3 text-sm font-semibold tracking-wide transition-colors ${
                    p.tone === 'dark' ? 'bg-verm text-paper hover:bg-lime hover:text-ink' : 'bg-ink text-paper hover:bg-verm'
                  }`}
                >
                  Choose {p.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* fair-use strip */}
        <div className="grid sm:grid-cols-3 gap-px bg-line border-2 border-ink mb-16">
          {[
            { icon: Hourglass, t: 'Hours don\u2019t roll over', d: 'Growth\u2019s 2 hrs/month reset monthly, so plan changes accordingly.' },
            { icon: CircleDot, t: 'Support covers your live project', d: 'Not new builds or other people\u2019s code. That\u2019s On-Demand work.' },
            { icon: KeyRound, t: 'Nothing starts without approval', d: 'On-Demand work is quoted and confirmed in writing first. Always.' },
          ].map((f) => (
            <div key={f.t} className="bg-card p-5 flex gap-3">
              <f.icon className="w-4 h-4 text-verm shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-ink">{f.t}</div>
                <div className="text-xs text-mut mt-1 leading-relaxed">{f.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* third-party costs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="grid lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-5">
            <h3 className="t-display text-3xl lg:text-4xl text-ink mb-4">
              The bills we <span className="text-verm">don’t</span> hide.
            </h3>
            <p className="text-mut text-sm leading-relaxed mb-6 max-w-md">
              These go straight to the providers at cost. We set them up and never mark them up.
              Or hand us the keys and we’ll manage every renewal for you.
            </p>
            <button
              onClick={onEstimate}
              className="group flex items-center gap-3 bg-ink text-paper pl-6 pr-2 py-2.5 text-sm font-semibold tracking-wide hover:bg-verm transition-colors hard-shadow-sm"
            >
              Estimate my costs
              <span className="w-9 h-9 bg-paper text-ink flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-card border-2 border-ink divide-y divide-line">
              {[
                ['Domain name', '$10–20', '/year'],
                ['Hosting', '$5–40', '/month'],
                ['Business email', '~$6', '/seat · month'],
                ['SSL certificate', 'Free', 'we configure it'],
                ['Apple App Store', '$99', '/year'],
                ['Google Play', '$25', 'one-time'],
                ['Gateway fees', 'Provider\u2019s', 'never marked up'],
              ].map(([k, v, u]) => (
                <div key={k} className="grid grid-cols-3 items-center px-6 py-3.5 text-sm">
                  <span className="text-ink font-medium">{k}</span>
                  <span className="t-mono text-verm">{v}</span>
                  <span className="text-right text-mut text-xs">{u}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-4 t-label text-mut">
              <KeyRound className="w-3.5 h-3.5 text-verm" />
              Fully-managed option: we handle every renewal &amp; bill for you
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
