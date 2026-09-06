import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { n: '01', t: 'Discover', d: '30-min call. Goals, audience, competitors, all mapped before a pixel moves.', time: 'DAY 1' },
  { n: '02', t: 'Design', d: 'Wireframes → hi-fi mockups. You sign off every screen before code.', time: 'DAY 1–2' },
  { n: '03', t: 'Build', d: 'Clean, typed, tested code with daily progress updates. No black boxes.', time: 'DAY 2–4' },
  { n: '04', t: 'Harden', d: 'Cross-device QA, security checks, Lighthouse 90+ or we don\'t ship.', time: 'DAY 4' },
  { n: '05', t: 'Launch', d: 'SSL, analytics, and SEO wired in. Full handover docs, so you\u2019re never locked out of your own product.', time: 'DAY 5' },
  { n: '06', t: 'Support', d: 'We stay on call. Updates, fixes, iteration. Launch day is the start, not the finish line.', time: 'ONGOING' },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '120px 0px' });

  return (
    <section id="process" ref={ref} className="relative py-28 lg:py-32 bg-paper-2 border-y-2 border-ink overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <div className="t-label text-verm mb-5">(04) · PROCESS</div>
            <h2 className="t-display text-6xl lg:text-8xl text-ink">
              Idea → live<br />in <span className="text-verm">days.</span>
            </h2>
          </div>
          <p className="text-mut max-w-sm leading-relaxed">
            Agencies quote months. We ship in days, because delivery here
            is a system, not an improv session.
          </p>
        </motion.div>

        {/* six-step grid, no scroll, nothing to clip */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="relative bg-card border-2 border-ink p-6 lg:p-7 hover-raise group overflow-hidden"
            >
              {/* connecting flow number watermark */}
              <span className="absolute -top-4 -right-2 t-display text-[7rem] leading-none text-paper-2 group-hover:text-verm/10 transition-colors select-none pointer-events-none">
                {s.n}
              </span>
              <div className="relative flex items-center justify-between mb-6">
                <span className="t-display text-4xl text-mut-2 group-hover:text-verm transition-colors">
                  {s.n}
                </span>
                <span className="t-label text-mut border border-line bg-paper px-2 py-1">{s.time}</span>
              </div>
              <h3 className="relative t-display text-2xl text-ink mb-2">{s.t}</h3>
              <p className="relative text-sm text-mut leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
