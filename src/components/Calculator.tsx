import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Globe, ShoppingCart, Smartphone, Code2, Check,
  Server, Mail, Wrench, ArrowRight, Info,
} from 'lucide-react';

type TypeKey = 'website' | 'ecommerce' | 'mobile' | 'webapp';

const TYPES: Record<TypeKey, { label: string; icon: typeof Globe; blurb: string; plans: [string, number][] }> = {
  website: { label: 'Website', icon: Globe, blurb: 'Brand, portfolio, marketing', plans: [['Starter', 149], ['Business', 349]] },
  ecommerce: { label: 'E-Commerce', icon: ShoppingCart, blurb: 'Online store that sells', plans: [['Standard', 299], ['Advanced', 499]] },
  mobile: { label: 'Mobile App', icon: Smartphone, blurb: 'iOS & Android', plans: [['MVP', 299], ['Full', 799]] },
  webapp: { label: 'Web App', icon: Code2, blurb: 'Dashboard / SaaS / tool', plans: [['Lean', 799], ['Scale', 1499]] },
};

const ADDONS: [string, number][] = [
  ['Auto image compression', 79],
  ['WhatsApp order alerts', 69],
  ['Abandoned cart recovery', 99],
  ['Multi-language', 129],
  ['Live chat', 49],
  ['Booking system', 149],
  ['Extra payment gateway', 79],
  ['AI site assistant', 149],
  ['AI product descriptions', 99],
  ['Branding & logo', 99],
];

const CARE: [string, number, string][] = [
  ['None', 0, 'I\u2019ll manage it myself'],
  ['Essential', 29, 'Hosting, backups, updates'],
  ['Growth', 79, '+ bug fixes & improvements'],
];

export default function Calculator({ onClose, onContact }: { onClose: () => void; onContact: () => void }) {
  const [type, setType] = useState<TypeKey>('website');
  const [planIdx, setPlanIdx] = useState(0);
  const [addons, setAddons] = useState<number[]>([]);
  const [care, setCare] = useState(1);
  const [hosting, setHosting] = useState(5);
  const [email, setEmail] = useState(false);
  const [billing, setBilling] = useState<'mo' | 'yr'>('mo');

  const toggleAddon = (i: number) =>
    setAddons((a) => (a.includes(i) ? a.filter((x) => x !== i) : [...a, i]));

  const { build, monthly, yearly } = useMemo(() => {
    const b = TYPES[type].plans[planIdx][1] + addons.reduce((s, i) => s + ADDONS[i][1], 0);
    const m = hosting + (email ? 6 : 0) + CARE[care][1];
    const y = (hosting + (email ? 6 : 0)) * 12 + CARE[care][1] * 10 + 15;
    return { build: b, monthly: m, yearly: y };
  }, [type, planIdx, addons, care, hosting, email]);

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
            <span className="t-display text-lg">COST CALCULATOR</span>
            <span className="t-label bg-ink text-paper px-2 py-1 hidden sm:block">Estimates only</span>
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
            <div className="grid grid-cols-2 gap-3">
              {TYPES[type].plans.map(([name, price], i) => (
                <button
                  key={name}
                  onClick={() => setPlanIdx(i)}
                  className={`p-5 border-2 text-left transition-all ${
                    planIdx === i ? 'border-ink bg-lime hard-shadow-sm' : 'border-ink bg-card hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{name}</span>
                    <span className="t-display text-2xl">${price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3 addons */}
          <div>
            <Step n="03" t="Anything extra?" hint="optional" />
            <div className="grid sm:grid-cols-2 gap-2">
              {ADDONS.map(([name, price], i) => {
                const on = addons.includes(i);
                return (
                  <button
                    key={name}
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
                    <span className="flex-1 text-[13px] font-medium leading-snug">{name}</span>
                    <span className={`t-mono text-[11px] shrink-0 tabular ${on ? 'text-lime' : 'text-mut-2'}`}>
                      +${price}
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
              {CARE.map(([name, price, d], i) => (
                <button
                  key={name}
                  onClick={() => setCare(i)}
                  className={`p-4 border-2 text-left transition-all ${
                    care === i ? 'border-ink bg-ink text-paper hard-shadow-sm' : 'border-ink bg-card hover:-translate-y-0.5'
                  }`}
                >
                  <Wrench className={`w-4 h-4 mb-2 ${care === i ? 'text-lime' : 'text-verm'}`} />
                  <div className="font-semibold text-sm flex items-baseline gap-1.5">
                    {name} {price > 0 && <span className="t-mono text-xs text-verm">${price}/mo</span>}
                  </div>
                  <div className={`text-[11px] mt-1 ${care === i ? 'text-paper/60' : 'text-mut'}`}>{d}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 5 running */}
          <div>
            <Step n="05" t="Running costs" hint="goes to providers at cost" />
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: 5, l: 'Basic hosting', d: '~$5/mo for blogs and sites' },
                  { v: 25, l: 'Pro hosting', d: '~$25/mo for stores and apps' },
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
                <span className="t-mono text-xs">+~$6/seat/mo</span>
              </button>
            </div>
          </div>
        </div>

        {/* summary */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 bg-ink text-paper border-2 border-ink hard-shadow-verm p-8">
            <div className="t-label text-paper/50 mb-6">YOUR ESTIMATE</div>

            <div className="flex items-end justify-between mb-1">
              <span className="text-sm text-paper/60">One-time build</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={build}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="t-display text-5xl text-lime"
                >
                  ${build}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="text-[11px] text-paper/40 mb-6">
              {TYPES[type].plans[planIdx][0]} {TYPES[type].label}
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
                  className="t-display text-4xl text-paper block text-right"
                >
                  ${running}<span className="text-base text-paper/50">/{billing}</span>
                </motion.span>
              </AnimatePresence>
              <div className="text-[11px] text-paper/40 mt-2 space-y-1">
                <div>Hosting ${hosting}/mo · Email {email ? '$6/mo' : 'off'} · Care ${CARE[care][1]}/mo{care > 0 && ' (2 months free yearly)'}</div>
                {billing === 'yr' && <div>Includes ~$15/yr domain</div>}
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
              Estimates only. Your final quote is fixed after a free 30-minute call. No hidden fees, ever.
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
