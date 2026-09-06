import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const included = [
  '100% custom design, never a template',
  'Up to 5 pages, mobile-first & responsive',
  'Working contact form + Google map',
  'On-page SEO + Google Business setup',
  'SSL + security hardening',
  'Social links & 1-tap WhatsApp button',
  '2 revision rounds included',
  'Staging link ready in 7–10 days',
];

export default function SmallBusiness() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '600px 0px' });
  const go = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="offer" ref={ref} className="relative py-28 lg:py-36 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="t-label text-verm mb-5">(08) · SMALL BUSINESS SPECIAL</div>
            <h2 className="t-display text-6xl lg:text-8xl text-ink mb-6">
              Big-studio<br />
              quality, <span className="bg-lime px-3 inline-block -rotate-1">small budget.</span>
            </h2>
            <p className="text-mut text-lg leading-relaxed max-w-xl mb-8">
              Most small businesses get a recycled template with the logo swapped out.
              You get a site built around your brand, the kind that earns trust
              before the first conversation even starts.
            </p>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-10 max-w-xl">
              {included.map((p) => (
                <div key={p} className="flex items-start gap-2.5 text-sm text-ink">
                  <span className="w-5 h-5 bg-ink text-lime flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  {p}
                </div>
              ))}
            </div>

            <button
              onClick={go}
              className="group flex items-center gap-3 bg-verm text-paper pl-7 pr-2 py-2.5 text-sm font-semibold tracking-wide hover:bg-ink transition-colors hard-shadow-sm"
            >
              Claim the offer
              <span className="w-9 h-9 bg-paper text-ink flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </motion.div>

          {/* price ticket */}
          <motion.div
            initial={{ opacity: 0, rotate: 3, y: 24 }}
            animate={inView ? { opacity: 1, rotate: 2, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative bg-ink text-paper border-2 border-ink p-10 hard-shadow-verm">
              {/* perforation */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-paper border-2 border-ink" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-paper border-2 border-ink" />

              <div className="t-label text-paper/50 mb-4">LAUNCH TICKET · LIMITED SLOTS</div>
              <div className="flex items-baseline gap-4 mb-1">
                <span className="t-display text-7xl lg:text-8xl text-lime">$149</span>
                <span className="t-mono text-paper/40 line-through text-xl">$399</span>
              </div>
              <div className="text-xs text-paper/60 mb-2">or ৳16,990 BDT for local businesses</div>
              <div className="t-label text-verm mb-8">SAVE 62% · THIS MONTH</div>

              <div className="border-t border-dashed border-paper/30 pt-6 space-y-3">
                {[
                  ['Payment', '50% deposit · 50% at launch'],
                  ['Turnaround', '7–10 business days'],
                  ['Speed lock', '7-day staging guarantee'],
                  ['Ownership', 'You own 100%, forever'],
                  ['Support', '30 days free fixes after launch'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-paper/50">{k}</span>
                    <span className="text-paper font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 t-mono text-[10px] text-paper/40 text-center tracking-widest">
                NO. 003 / 05 · ADMIT ONE PROJECT
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
