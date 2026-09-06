import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Gauge, Smartphone, ShoppingCart, Search, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';

const rows = [
  { icon: Gauge, before: '8-second loads', after: '1.2s, everywhere', note: 'Speed', to: '#services', cta: 'How we build fast' },
  { icon: Smartphone, before: 'Broken on phones', after: '100/100 mobile-ready', note: 'Responsive', to: '#services', cta: 'Mobile-first builds' },
  { icon: ShoppingCart, before: 'Carts abandoned', after: '3-step checkout that closes', note: 'Commerce', to: '#pricing', cta: 'See the store plan' },
  { icon: Search, before: 'Invisible on Google', after: 'Indexed, structured, ranking', note: 'Search', to: '#addons', cta: 'SEO add-ons' },
  { icon: ShieldCheck, before: 'No SSL, exposed', after: 'Encrypted & monitored', note: 'Security', to: '#care', cta: 'Security in care' },
  { icon: TrendingUp, before: 'Visitors bounce', after: 'Visitors buy', note: 'Revenue', to: '#contact', cta: 'Start the conversation' },
];

const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Outcomes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '120px 0px' });

  return (
    <section id="outcomes" ref={ref} className="relative py-28 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-12 gap-8 mb-14 items-end"
        >
          <div className="lg:col-span-7">
            <div className="t-label text-verm mb-5">(02) · OUTCOMES</div>
            <h2 className="t-display text-6xl lg:text-8xl text-ink">
              Before us.<br />
              <span className="text-verm">After us.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-mut leading-relaxed max-w-md">
            No invented reviews, just the measurable shift every project is
            engineered to produce. This is the standard we hold ourselves to.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rows.map((r, i) => (
            <motion.button
              type="button"
              key={r.note}
              onClick={() => go(r.to)}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="group bg-card border-2 border-ink p-6 hover-raise text-left cursor-pointer w-full"
              aria-label={`${r.after} — ${r.cta}`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 bg-paper-2 border-2 border-ink flex items-center justify-center group-hover:bg-lime transition-colors">
                  <r.icon className="w-4 h-4" />
                </span>
                <span className="t-label text-mut-2 group-hover:text-verm transition-colors">{r.note}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-mut line-through decoration-verm decoration-2 flex-1">
                  {r.before}
                </span>
                <span className="w-9 h-9 border-2 border-ink flex items-center justify-center shrink-0 bg-paper group-hover:bg-verm group-hover:border-verm transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
              <div className="t-display text-2xl text-ink mt-3">{r.after}</div>
              <div className="mt-3 h-4 overflow-hidden">
                <span className="t-label text-verm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-block">
                  {r.cta} →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
