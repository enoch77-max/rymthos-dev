import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Globe, ShoppingCart, Smartphone, Code2, Check,
  Server, Mail, Wrench, ArrowRight, Info,
} from 'lucide-react';

type TypeKey = 'website' | 'ecommerce' | 'mobile' | 'webapp';

interface PlanPricing {
  name: string;
  usd: number;
  bdt: number;
}

const TYPES: Record<TypeKey, { label: string; icon: typeof Globe; blurb: string; plans: PlanPricing[] }> = {
  website: {
    label: 'Website',
    icon: Globe,
    blurb: 'Brand, portfolio, marketing',
    plans: [
      { name: 'Starter', usd: 179, bdt: 19990 },
      { name: 'Business', usd: 349, bdt: 39990 },
    ],
  },
  ecommerce: {
    label: 'E-Commerce',
    icon: ShoppingCart,
    blurb: 'Online store with payments & dispatch',
    plans: [
      { name: 'Standard Store', usd: 449, bdt: 49990 },
      { name: 'Advanced Commerce', usd: 649, bdt: 74990 },
    ],
  },
  mobile: {
    label: 'Mobile App',
    icon: Smartphone,
    blurb: 'Android, iOS, or Dual-Platform',
    plans: [
      { name: 'Android Only', usd: 349, bdt: 39990 },
      { name: 'iOS Only', usd: 499, bdt: 54990 },
      { name: 'Dual (iOS + Android)', usd: 799, bdt: 89990 },
    ],
  },
  webapp: {
    label: 'Web App',
    icon: Code2,
    blurb: 'Dashboard / SaaS / internal tool',
    plans: [
      { name: 'Lean MVP', usd: 899, bdt: 99990 },
      { name: 'Scale Platform', usd: 1599, bdt: 179990 },
    ],
  },
};

const ADDONS: { name: string; usd: number; bdt: number }[] = [
  { name: 'Auto image compression', usd: 49, bdt: 5000 },
  { name: 'WhatsApp order alerts', usd: 69, bdt: 7500 },
  { name: 'Courier API (Pathao / Steadfast)', usd: 69, bdt: 7500 },
  { name: 'Abandoned cart recovery', usd: 99, bdt: 11000 },
  { name: 'Multi-language (Bangla + English)', usd: 99, bdt: 11000 },
  { name: 'Live chat widget', usd: 49, bdt: 5000 },
  { name: 'Booking & appointment system', usd: 129, bdt: 14000 },
  { name: 'Extra payment gateway (bKash/Stripe)', usd: 79, bdt: 8500 },
  { name: 'AI site chatbot assistant', usd: 149, bdt: 16000 },
  { name: 'AI product description writer', usd: 99, bdt: 11000 },
  { name: 'Branding & logo kit', usd: 99, bdt: 11000 },
];

const CARE: { name: string; usd: number; bdt: number; desc: string }[] = [
  { name: 'None', usd: 0, bdt: 0, desc: 'I will manage hosting & updates myself' },
  { name: 'Shield', usd: 19, bdt: 1990, desc: 'Cloud hosting, daily backups, SSL renewals' },
  { name: 'Growth', usd: 59, bdt: 5990, desc: '+ bug fixes, speed tuning & 2h edits/mo' },
];

export default function Calculator({ onClose, onContact }: { onClose: () => void; onContact: () => void }) {
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');
  const [type, setType] = useState<TypeKey>('website');
  const [planIdx, setPlanIdx] = useState(0);
  const [addons, setAddons] = useState<number[]>([]);
  const [care, setCare] = useState(1);
  const [hosting, setHosting] = useState(5);
  const [email, setEmail] = useState(false);
  const [billing, setBilling] = useState<'mo' | 'yr'>('mo');

  const toggleAddon = (i: number) =>
    setAddons((a) => (a.includes(i) ? a.filter((x) => x !== i) : [...a, i]));

  const sym = currency === 'USD' ? '$' : '৳';
  const getPrice = (usd: number, bdt: number) => (currency === 'USD' ? usd : bdt);

  const { build, monthly, yearly } = useMemo(() => {
    const selectedPlan = TYPES[type].plans[planIdx] || TYPES[type].plans[0];
    const planCost = getPrice(selectedPlan.usd, selectedPlan.bdt);
    const addonsCost = addons.reduce((s, i) => s + getPrice(ADDONS[i].usd, ADDONS[i].bdt), 0);
    const b = planCost + addonsCost;

    const hostCost = currency === 'USD' ? hosting : hosting * 115;
    const emailCost = email ? (currency === 'USD' ? 6 : 700) : 0;
    const careCost = getPrice(CARE[care].usd, CARE[care].bdt);

    const m = hostCost + emailCost + careCost;
    const domainCost = currency === 'USD' ? 15 : 1800;
    const y = (hostCost + emailCost) * 12 + careCost * 10 + domainCost;

    return { build: b, monthly: m, yearly: y };
  }, [type, planIdx, addons, care, hosting, email, currency]);

  const running = billing === 'mo' ? monthly : yearly;

  return (
    <div className="fixed inset-0 z-[80] bg-paper text-ink overflow-y-auto">
      {/* header */}
      <div className="sticky top-0 z-10 bg-paper/90 backdrop-blur-md border-b-2 border-ink">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
          <button onClick={onClose} className="group flex items-center gap-2 text-sm font-semibold hover:text-verm transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to site
          </button>
          <div className="flex items-center gap-3">
            <div className="inline-flex border-2 border-ink bg-card">
              {(['USD', 'BDT'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`t-label px-3 py-1 transition-colors ${currency === c ? 'bg-verm text-paper' : 'text-mut hover:text-ink'}`}
                >
                  {c === 'USD' ? '$ USD' : '৳ BDT'}
                </button>
              ))}
            </div>
            <span className="t-display text-lg hidden sm:block">COST CALCULATOR</span>
            <span className="t-label bg-ink text-paper px-2 py-1 hidden md:block">Estimates only</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-12 grid lg:grid-cols-12 gap-10">
        {/* options */}
        <div className="lg:col-span-7 space-y-12">
          {/* 1 type */}
          <div>
            <Step n="01" t="What are we building?" />
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(TYPES) as TypeKey[]).map((k) => {
                const T = TYPES[k];
                const active = type === k;
                return (
                  <button
                    key={k}
                    onClick={() => { setType(k); setPlanIdx(0); }}
                    className={`text-left p-5 border-2 transition-all ${
                      active ? 'border-ink bg-ink text-paper hard-shadow-verm' : 'border-ink bg-card hover:-translate-y-0.5'
                    }`}
                  >
                    <T.icon className={`w-5 h-5 mb-3 ${active ? 'text-lime' : 'text-verm'}`} />
                    <div className="font-semibold">{T.label}</div>
                    <div className={`text-xs mt-0.5 ${active ? 'text-paper/60' : 'text-mut'}`}>{T.blurb}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2 plan */}
          <div>
            <Step n="02" t="Which tier?" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TYPES[type].plans.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setPlanIdx(i)}
                  className={`p-4 border-2 text-left transition-all ${
                    planIdx === i ? 'border-ink bg-lime hard-shadow-sm' : 'border-ink bg-card hover:-translate-y-0.5'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">{p.name}</div>
                  <div className="t-display text-xl">
                    {sym}{getPrice(p.usd, p.bdt).toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3 addons */}
          <div>
            <Step n="03" t="Anything extra?" hint="optional power-packs" />
            <div className="grid sm:grid-cols-2 gap-2">
              {ADDONS.map((a, i) => {
                const on = addons.includes(i);
                return (
                  <button
                    key={a.name}
                    onClick={() => toggleAddon(i)}
                    className={`group flex items-center gap-3 px-4 py-3 border-2 text-left transition-all ${
                      on ? 'border-ink bg-ink text-paper' : 'border-line-2 bg-card hover:border-ink hover:-translate-y-px'
                    }`}
                  >
                    <span className={`w-[18px] h-[18px] border-2 flex items-center justify-center shrink-0 transition-colors ${
                      on ? 'border-verm bg-verm' : 'border-mut-2 group-hover:border-ink'
                    }`}>
                      {on && <Check className="w-3 h-3 text-paper" strokeWidth={3} />}
                    </span>
                    <span className="flex-1 text-[13px] font-medium leading-snug">{a.name}</span>
                    <span className={`t-mono text-[11px] shrink-0 tabular ${on ? 'text-lime' : 'text-mut-2'}`}>
                      +{sym}{getPrice(a.usd, a.bdt).toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 care */}
          <div>
            <Step n="04" t="After-launch care" />
            <div className="grid sm:grid-cols-3 gap-3">
              {CARE.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setCare(i)}
                  className={`p-4 border-2 text-left transition-all ${
                    care === i ? 'border-ink bg-ink text-paper hard-shadow-sm' : 'border-ink bg-card hover:-translate-y-0.5'
                  }`}
                >
                  <Wrench className={`w-4 h-4 mb-2 ${care === i ? 'text-lime' : 'text-verm'}`} />
                  <div className="font-semibold text-sm flex items-baseline gap-1.5">
                    {c.name} {c.usd > 0 && <span className="t-mono text-xs text-verm">
                      {sym}{getPrice(c.usd, c.bdt).toLocaleString()}/mo
                    </span>}
                  </div>
                  <div className={`text-[11px] mt-1 ${care === i ? 'text-paper/60' : 'text-mut'}`}>{c.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 5 running */}
          <div>
            <Step n="05" t="Running costs" hint="infrastructure at provider cost" />
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: 5, l: 'Managed basic cloud', d: currency === 'USD' ? '~$5/mo for sites' : '~৳550/mo' },
                  { v: 25, l: 'Pro scalable cloud', d: currency === 'USD' ? '~$25/mo for stores & apps' : '~৳2,800/mo' },
                ].map((h) => (
                  <button
                    key={h.v}
                    onClick={() => setHosting(h.v)}
                    className={`p-4 border-2 text-left transition-all ${
                      hosting === h.v ? 'border-ink bg-lime hard-shadow-sm' : 'border-ink bg-card hover:-translate-y-0.5'
                    }`}
                  >
                    <Server className="w-4 h-4 mb-2" />
                    <div className="font-semibold text-sm">{h.l}</div>
                    <div className="text-[11px] text-mut mt-0.5">{h.d}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setEmail(!email)}
                className={`w-full flex items-center justify-between p-4 border-2 transition-all ${
                  email ? 'border-ink bg-ink text-paper' : 'border-line-2 bg-card hover:border-ink'
                }`}
              >
                <span className="flex items-center gap-3 text-sm font-medium">
                  <Mail className={`w-4 h-4 ${email ? 'text-lime' : 'text-verm'}`} />
                  Business email (you@yourbrand.com)
                </span>
                <span className="t-mono text-xs">
                  {currency === 'USD' ? '+~$6/seat/mo' : '+~৳700/seat/mo'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* summary */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 bg-ink text-paper border-2 border-ink hard-shadow-verm p-8">
            <div className="t-label text-paper/50 mb-6">YOUR ESTIMATE ({currency})</div>

            <div className="flex items-end justify-between mb-1">
              <span className="text-sm text-paper/60">One-time build</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={build}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="t-display text-4xl lg:text-5xl text-lime"
                >
                  {sym}{build.toLocaleString()}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="text-[11px] text-paper/40 mb-6">
              {TYPES[type].plans[planIdx]?.name} {TYPES[type].label}
              {addons.length > 0 && ` + ${addons.length} add-on${addons.length > 1 ? 's' : ''}`}
            </div>

            <div className="border-t border-dashed border-paper/20 pt-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-paper/60">Running costs</span>
                <div className="inline-flex border border-paper/20">
                  {(['mo', 'yr'] as const).map((b) => (
                    <button
                      key={b}
                      onClick={() => setBilling(b)}
                      className={`t-label px-3 py-1.5 transition-colors ${billing === b ? 'bg-paper text-ink' : 'text-paper/50'}`}
                    >
                      {b === 'mo' ? 'Monthly' : 'Yearly'}
                    </button>
                  ))}
                </div>
              </div>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={`${running}-${billing}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="t-display text-3xl lg:text-4xl text-paper block text-right"
                >
                  {sym}{Math.round(running).toLocaleString()}<span className="text-base text-paper/50">/{billing}</span>
                </motion.span>
              </AnimatePresence>
              <div className="text-[11px] text-paper/40 mt-2 space-y-1">
                <div>Hosting + Care {CARE[care].usd > 0 && '(includes 2 months free on yearly)'}</div>
                {billing === 'yr' && <div>Includes domain registration at cost</div>}
              </div>
            </div>

            <button
              onClick={onContact}
              className="group w-full flex items-center justify-center gap-3 bg-verm text-paper py-3.5 text-sm font-semibold tracking-wide hover:bg-lime hover:text-ink transition-colors"
            >
              Get my exact quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex gap-2 mt-5 text-[11px] text-paper/40 leading-relaxed">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              Estimates only. Your final quote is fixed in writing before we build. Zero surprise fees, ever.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ n, t, hint }: { n: string; t: string; hint?: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-4">
      <span className="t-mono text-xs text-verm">{n}</span>
      <h3 className="t-display text-2xl">{t}</h3>
      {hint && <span className="t-label text-mut-2">· {hint}</span>}
    </div>
  );
}
