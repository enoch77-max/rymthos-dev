import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, X, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { allPaymentLogos } from './PaymentLogo';

interface Plan {
  name: string;
  price: number;
  bdtPrice: number;
  market: string;
  bdtMarket: string;
  days: string;
  desc: string;
  features: string[];
  cut: string[];
  featured?: boolean;
}

const web: Plan[] = [
  {
    name: 'Starter',
    price: 179,
    bdtPrice: 19990,
    market: '$800+',
    bdtMarket: '৳85,000+',
    days: '7–10 days',
    desc: 'Portfolio, landing page, or high-trust personal brand site.',
    features: ['Up to 5 custom pages', 'Mobile-first responsive design', 'Contact form + Google Map', 'On-page SEO structure', '2 revision rounds'],
    cut: ['Headless CMS', 'E-commerce checkout'],
  },
  {
    name: 'Business',
    price: 349,
    bdtPrice: 39990,
    market: '$2,500+',
    bdtMarket: '৳280,000+',
    days: '10–14 days',
    featured: true,
    desc: 'Conversion-focused marketing hub for growing brands and companies.',
    features: ['Up to 15 pages', 'Headless CMS + blog', 'Lead capture & analytics', 'Sub-second speed optimization', 'Polished micro-animations', '5 revision rounds'],
    cut: ['E-commerce checkout'],
  },
  {
    name: 'E-Commerce',
    price: 499,
    bdtPrice: 54990,
    market: '$3,500+',
    bdtMarket: '৳400,000+',
    days: '10–14 days',
    desc: 'A complete store processing real payments and dispatching orders from day one.',
    features: ['Unlimited products & inventory', 'Stripe / PayPal / bKash / Nagad', 'Courier & order dispatch flow', 'Admin sales dashboard', 'Discount & coupon engine', 'Unlimited revision rounds'],
    cut: [],
  },
];

const mobile: Plan[] = [
  {
    name: 'Android App',
    price: 349,
    bdtPrice: 39990,
    market: '$3,000+',
    bdtMarket: '৳350,000+',
    days: '7–10 days',
    desc: 'Single-platform Android app engineered for reach and rapid Play Store deployment.',
    features: ['Android (Google Play)', 'Up to 10 screens', 'Push notifications', 'Auth + cloud database', 'Offline mode', 'Play Store submission support', '3 revisions'],
    cut: ['Apple App Store'],
  },
  {
    name: 'iOS App',
    price: 499,
    bdtPrice: 54990,
    market: '$4,500+',
    bdtMarket: '৳500,000+',
    days: '10–14 days',
    desc: 'Bespoke iOS app built to strict Apple Human Interface Guidelines and store compliance.',
    features: ['Apple iOS App Store', 'Up to 10 screens', 'Apple HIG compliance', 'TestFlight staging build', 'Auth + cloud database', 'App Store submission support', '3 revisions'],
    cut: ['Google Play Store'],
  },
  {
    name: 'iOS + Android',
    price: 799,
    bdtPrice: 89990,
    market: '$8,000+',
    bdtMarket: '৳900,000+',
    days: '14–21 days',
    featured: true,
    desc: 'Both platforms, every feature users expect, published end-to-end with unified Flutter engine.',
    features: ['Both iOS + Android', 'Unlimited screens', 'Push notifications on both', 'Auth + realtime database', 'Offline local storage', 'Both stores submission support', '5 revisions'],
    cut: [],
  },
];

export default function Pricing({ onEstimate }: { onEstimate: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '600px 0px' });
  const [tab, setTab] = useState<'web' | 'mobile'>('web');
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');
  const plans = tab === 'web' ? web : mobile;

  const compare = [
    ['Typical agency', currency === 'USD' ? '$3,000–$10,000' : '৳350,000–৳1,000,000', '2–4 months'],
    ['Freelance marketplaces', currency === 'USD' ? '$500–$2,000' : '৳60,000–৳240,000', 'Unpredictable'],
    ['Template resellers', currency === 'USD' ? '$200–$600' : '৳25,000–৳70,000', 'Generic output'],
    ['Rymthos Dev', currency === 'USD' ? 'From $179' : 'From ৳19,990', '7–14 days'],
  ];

  const go = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pricing" ref={ref} className="relative py-28 lg:py-36 bg-paper-2 border-y-2 border-ink">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-12 gap-8 items-end mb-14"
        >
          <div className="lg:col-span-7">
            <div className="t-label text-verm mb-5">(07) · PRICING</div>
            <h2 className="t-display text-6xl lg:text-8xl text-ink">
              Agency craft.<br />
              <span className="text-verm">Startup price.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6">
            <p className="text-mut leading-relaxed">
              Flat fees, zero hourly surprises. Built with modern, AI-accelerated engineering
              to ship in days what legacy agencies take months to deliver.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {/* category switch */}
              <div className="inline-flex border-2 border-ink bg-card">
                {(['web', 'mobile'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`t-label px-5 py-2.5 transition-colors ${tab === t ? 'bg-ink text-paper' : 'text-mut hover:text-ink'}`}
                  >
                    {t === 'web' ? 'Websites' : 'Mobile apps'}
                  </button>
                ))}
              </div>

              {/* currency switch */}
              <div className="inline-flex border-2 border-ink bg-card">
                {(['USD', 'BDT'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`t-label px-3.5 py-2.5 transition-colors ${currency === c ? 'bg-verm text-paper' : 'text-mut hover:text-ink'}`}
                  >
                    {c === 'USD' ? '$ USD' : '৳ BDT'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* commitment strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="grid sm:grid-cols-3 gap-px bg-line border-2 border-ink mb-10"
        >
          {[
            ['Zero hidden charges', 'on any base plan. The number you see is the exact number on your agreement.'],
            ['7-day minimum speed lock', 'staging link delivered on schedule, or we discount $50 / ৳5,000.'],
            ['Provider fees at cost', 'domains, hosting, Apple ($99/yr) & Google ($25) licenses billed by them, never marked up.'],
          ].map(([t, d]) => (
            <div key={t} className="bg-card p-5">
              <div className="font-semibold text-ink text-sm mb-1">{t}</div>
              <div className="text-xs text-mut leading-relaxed">{d}</div>
            </div>
          ))}
        </motion.div>

        {/* plans */}
        <div className="grid gap-5 mb-16 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className={`relative flex flex-col p-8 border-2 transition-transform hover:-translate-y-1 ${
                p.featured
                  ? 'bg-ink text-paper border-ink hard-shadow-verm'
                  : 'bg-card border-ink hard-shadow-sm'
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3.5 left-8 bg-verm text-paper t-label px-3 py-1.5">MOST POPULAR</span>
              )}
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="t-display text-3xl">{p.name}</h3>
                <span className="t-mono text-xs text-mut line-through">
                  {currency === 'USD' ? p.market : p.bdtMarket}
                </span>
              </div>
              <p className={`text-sm mb-6 ${p.featured ? 'text-paper/60' : 'text-mut'}`}>{p.desc}</p>

              <div className="flex items-end gap-2 mb-1">
                <span className="t-display text-5xl lg:text-6xl">
                  {currency === 'USD' ? `$${p.price}` : `৳${p.bdtPrice.toLocaleString()}`}
                </span>
                <span className={`text-sm mb-2 ${p.featured ? 'text-paper/50' : 'text-mut'}`}>one-time</span>
              </div>
              <div className="flex items-center gap-2 t-label mb-7 text-verm">
                <Clock className="w-3.5 h-3.5" /> {p.days}
              </div>

              <ul className="space-y-2.5 mb-7 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-verm mt-0.5 shrink-0" />
                    <span className={p.featured ? 'text-paper/90' : 'text-ink'}>{f}</span>
                  </li>
                ))}
                {p.cut.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm opacity-50">
                    <X className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={go}
                className={`group flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold tracking-wide transition-colors ${
                  p.featured ? 'bg-verm text-paper hover:bg-paper hover:text-ink' : 'bg-ink text-paper hover:bg-verm'
                }`}
              >
                Start {p.name}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="bg-card border-2 border-ink"
        >
          <div className="t-label text-mut px-6 py-4 border-b-2 border-ink bg-paper-2">
            Market comparison · average business software &amp; website
          </div>
          <div className="divide-y divide-line">
            {compare.map(([who, price, time], i) => (
              <div key={who} className={`grid grid-cols-3 px-6 py-4 items-center text-sm ${i === 3 ? 'bg-ink text-paper' : ''}`}>
                <span className={`font-semibold ${i === 3 ? 'text-verm' : 'text-ink'}`}>{who}</span>
                <span className={i === 3 ? 'text-paper' : 'text-mut'}>{price}</span>
                <span className={`text-right ${i === 3 ? 'text-paper' : 'text-mut'}`}>{time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* calculator CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
          className="mt-8 bg-ink text-paper border-2 border-ink p-6 lg:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 hard-shadow-verm"
        >
          <div>
            <div className="t-display text-2xl lg:text-3xl mb-1">Want the full picture?</div>
            <p className="text-sm text-paper/60">Mix plans, add-ons, care, and hosting in the interactive calculator and see your exact number before you ever talk to us.</p>
          </div>
          <button
            onClick={onEstimate}
            className="group flex items-center gap-3 bg-lime text-ink pl-6 pr-2 py-2.5 text-sm font-semibold tracking-wide hover:bg-verm hover:text-paper transition-colors shrink-0"
          >
            Open calculator
            <span className="w-9 h-9 bg-ink text-lime flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-5 text-sm text-mut"
        >
          No package quite fits?{' '}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-ink font-semibold underline decoration-verm decoration-2 underline-offset-4 hover:text-verm transition-colors"
          >
            Tell us your vision
          </a>{' '}
          We’ll build the quote around it, not the other way round.
        </motion.p>

        {/* pay your way */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          <span className="t-label text-mut">Pay your way. 50% to start:</span>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {allPaymentLogos
              .filter((p) => ['Visa', 'Mastercard', 'Stripe', 'PayPal', 'bKash', 'Nagad'].includes(p.name))
              .map((p) => (
                <span key={p.name} className="opacity-60 hover:opacity-100 transition-opacity">
                  {p.node}
                </span>
              ))}
          </div>
          <span className="t-label text-mut">bank transfer · crypto on request</span>
        </motion.div>

        {/* the guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-12 bg-ink text-paper border-2 border-ink p-8 lg:p-10 relative overflow-hidden"
        >
          <div className="absolute -right-16 -bottom-20 w-64 h-64 bg-lime/10 rounded-full blur-[100px]" />
          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-3 flex lg:block items-center gap-5">
              <div className="w-24 h-24 rounded-full border-2 border-lime flex flex-col items-center justify-center shrink-0 -rotate-6">
                <span className="t-display text-3xl text-lime leading-none">30</span>
                <span className="t-label text-lime mt-0.5">DAYS</span>
              </div>
              <h3 className="t-display text-3xl lg:text-4xl leading-tight">The Rymthos<br />Guarantee</h3>
            </div>
            <ul className="lg:col-span-6 space-y-3">
              {[
                'Speed-Lock Commitment: We deliver your interactive staging link within 7 business days or discount $50 / ৳5,000 off your balance.',
                '30-Day Defect Shield: If anything we built breaks or underperforms in the first 30 days, we fix it free. No invoices, no excuses.',
                'Store Submission Support: For mobile apps, we handle store submission and provide up to 2 rounds of Apple/Google compliance patches included free.',
                '100% Code & Asset Sovereignty: You own 100% of your source code, repo, and design the moment final payment lands.',
              ].map((g) => (
                <li key={g} className="flex items-start gap-3 text-sm text-paper/80 leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-lime mt-0.5 shrink-0" />
                  {g}
                </li>
              ))}
            </ul>
            <div className="lg:col-span-3 lg:text-right">
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-3 bg-lime text-ink pl-6 pr-2 py-2.5 text-sm font-bold tracking-wide hover:bg-paper transition-colors"
              >
                Start risk-free
                <span className="w-9 h-9 bg-ink text-lime flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
              <p className="t-label text-paper/40 mt-3">No deposit until you have seen the plan</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
