import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Plus, BadgeCheck, FileText, Wrench, Unlock, MessagesSquare, PackageCheck } from 'lucide-react';

const ask = [
  'What should this site actually achieve?',
  'Who are your customers, really?',
  'Which 2 or 3 sites do you love, and why?',
  'What\u2019s your timeline and budget range?',
];

const bring = [
  'Logo & brand colors (if you have them)',
  'Text and photos, or we help you create them',
  'Domain access, if you already own one',
  'Anything you\u2019re selling or explaining',
];

const faqs = [
  {
    q: 'Do I own everything you build?',
    a: 'Yes, 100%. Code, design, content, domain. No lock-in, no platform hostage situations. If we ever part ways, everything leaves with you.',
  },
  {
    q: 'What if I need changes after launch?',
    a: 'Small fixes are free for 30 days. After that, pick a care plan or request changes as needed. We always quote before touching anything.',
  },
  {
    q: 'Can you fix a site someone else broke?',
    a: 'That\u2019s our rescue service. We audit first, tell you honestly whether it\u2019s worth fixing or rebuilding, then do whichever makes sense.',
  },
  {
    q: 'How do payments work?',
    a: '50% to start, 50% when you\u2019re happy at launch. Larger projects split into milestones. Bank transfer, cards, bKash, whatever is easiest for you.',
  },
  {
    q: 'Do you work with international clients across different timezones?',
    a: 'Yes, 100% remote, worldwide. We collaborate with founders across the US, Europe, Middle East, and Asia. Flexible call scheduling and async updates keep you informed without timezone friction.',
  },
  {
    q: 'Hosting and domain — do I have to deal with that?',
    a: 'Only if you want to. We set everything up and can manage every renewal for you. Bills always go directly to providers at cost.',
  },
  {
    q: 'Is my site, and my customers\u2019 data, secure?',
    a: 'SSL, hardened logins, encrypted storage, automated backups. E-commerce follows the payment provider\u2019s standards so card data never touches your server.',
  },
  {
    q: 'I\u2019m not technical at all. Is that a problem?',
    a: 'It\u2019s the norm. We explain everything in plain language, handle the jargon-heavy parts, and hand you a site you can actually use.',
  },
  {
    q: 'Are there service charges on top of the plan price?',
    a: 'Never. Base plans are all-in: design, build, testing, launch. The price shown is the price paid.',
  },
  {
    q: 'How are add-on features priced?',
    a: 'Each one is a finished product with a single fixed price that already includes our service, like the auto image compression system. You\u2019ll see the number before you say yes.',
  },
  {
    q: 'What if I want an extra payment gateway later?',
    a: 'A fixed $79 integration fee per gateway, plus the provider\u2019s own license or transaction costs, which go straight to them at cost. Both numbers in writing before we start.',
  },
  {
    q: 'What if the scope changes mid-project?',
    a: 'We pause, quote the difference as a fixed number, and only continue once you approve it. No silent additions, no invoice surprises.',
  },
];

const trust = [
  { icon: BadgeCheck, t: 'You own 100% of the code' },
  { icon: FileText, t: 'NDA available on request' },
  { icon: Wrench, t: '30 days of free fixes post-launch' },
  { icon: Unlock, t: 'No lock-in, ever' },
];

export default function Assurance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '600px 0px' });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="assurance" ref={ref} className="relative py-28 lg:py-36 bg-paper-2 border-y-2 border-ink">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-14"
        >
          <div className="t-label text-verm mb-5">(11) · NO SURPRISES</div>
          <h2 className="t-display text-6xl lg:text-8xl text-ink">
            Easy to start.<br />
            <span className="text-verm">Easier to stay.</span>
          </h2>
        </motion.div>

        {/* checklists */}
        <div className="grid lg:grid-cols-2 gap-5 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border-2 border-ink p-8 hard-shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-9 h-9 bg-verm text-paper flex items-center justify-center"><MessagesSquare className="w-4 h-4" /></span>
              <h3 className="t-display text-2xl text-ink">What we’ll ask on the call</h3>
            </div>
            <ul className="space-y-4">
              {ask.map((a, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-ink">
                  <span className="t-mono text-xs text-verm pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  {a}
                </li>
              ))}
            </ul>
            <p className="text-xs text-mut mt-6">30 minutes. Free. No obligation, no pressure.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border-2 border-ink p-8 hard-shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-9 h-9 bg-ink text-lime flex items-center justify-center"><PackageCheck className="w-4 h-4" /></span>
              <h3 className="t-display text-2xl text-ink">Helpful to have ready</h3>
            </div>
            <ul className="space-y-4">
              {bring.map((b, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-ink">
                  <span className="t-mono text-xs text-mut pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  {b}
                </li>
              ))}
            </ul>
            <p className="text-xs text-mut mt-6">Missing something? We’ll help you create it. That’s half the job.</p>
          </motion.div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="t-label text-mut mb-6 text-center">Questions everyone asks</div>
          <div className="border-2 border-ink bg-card divide-y divide-line">
            {faqs.map((f, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                >
                  <span className={`font-semibold text-sm lg:text-base transition-colors ${open === i ? 'text-verm' : 'text-ink group-hover:text-verm'}`}>
                    {f.q}
                  </span>
                  <Plus className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45 text-verm' : 'text-mut'}`} />
                </button>
                <div className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm text-mut leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {trust.map((t) => (
            <div key={t.t} className="flex items-center gap-3 bg-ink text-paper px-5 py-4">
              <t.icon className="w-5 h-5 text-lime shrink-0" />
              <span className="text-xs font-semibold tracking-wide">{t.t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
