import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CreditCard, Landmark, Globe2, ShieldCheck } from 'lucide-react';
import { localLogos, globalLogos, PaymentLogo } from './PaymentLogo';

function LogoRow({ logos, reverse = false }: { logos: PaymentLogo[]; reverse?: boolean }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="marquee-pause relative overflow-hidden py-6">
      <div className={`flex w-max items-center ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {doubled.map((l, i) => (
          <div
            key={`${l.name}-${i}`}
            aria-hidden={i >= logos.length || undefined}
            className="flex shrink-0 items-center px-12 opacity-55 grayscale-[30%] transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:-translate-y-0.5"
          >
            {l.node}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}

export default function Payments() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="payments" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-12 gap-8 items-end mb-14"
        >
          <div className="lg:col-span-8">
            <div className="t-label text-verm mb-5">(06) · PAYMENT RAILS</div>
            <h2 className="t-display text-5xl md:text-7xl lg:text-8xl text-ink leading-[0.95]">
              Wherever they pay,
              <br />
              <span className="text-verm">you get paid.</span>
            </h2>
          </div>
          <p className="lg:col-span-4 text-mut leading-relaxed">
            A SaaS billing in dollars, a shop collecting bKash, a client wiring
            from another continent. One checkout,{' '}
            <span className="text-ink font-semibold">every method your customers already trust.</span>
          </p>
        </motion.div>
      </div>

      {/* the rails, full-bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="border-y-2 border-ink divide-y-2 divide-ink bg-paper"
      >
        <LogoRow logos={globalLogos} />
        <LogoRow logos={localLogos} reverse />
      </motion.div>

      {/* the promises clients should not miss */}
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-14 grid md:grid-cols-3 gap-5"
        >
          <div className="bg-ink text-paper p-6 lg:p-7 hard-shadow-sm">
            <ShieldCheck className="w-6 h-6 text-lime mb-4" />
            <p className="text-base lg:text-lg font-semibold leading-snug">
              Card data never touches our servers.{' '}
              <span className="bg-lime text-ink px-1">Checkouts are tokenized</span>{' '}
              and run entirely on PCI-DSS Level 1 rails.
            </p>
          </div>
          <div className="bg-ink text-paper p-6 lg:p-7 hard-shadow-sm">
            <Landmark className="w-6 h-6 text-lime mb-4" />
            <p className="text-base lg:text-lg font-semibold leading-snug">
              Transaction fees go straight to the provider.{' '}
              <span className="underline decoration-verm decoration-4 underline-offset-4">We never take a cut</span>{' '}
              of your money.
            </p>
          </div>
          <div className="bg-ink text-paper p-6 lg:p-7 hard-shadow-sm">
            <Globe2 className="w-6 h-6 text-lime mb-4" />
            <p className="text-base lg:text-lg font-semibold leading-snug">
              Launch in one market, sell in forty.{' '}
              <span className="bg-verm text-paper px-1">Multi-currency from day one,</span>{' '}
              so scaling abroad needs no rebuild.
            </p>
          </div>
        </motion.div>

        {/* explainer strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-14 grid md:grid-cols-3 gap-x-10 gap-y-6 border-t-2 border-ink pt-10"
        >
          {[
            { icon: CreditCard, t: 'Included where it matters', d: 'E-commerce plans ship with one gateway wired in. Extra gateways are a fixed $79 each, quoted before we start.' },
            { icon: Globe2, t: 'Global-ready from day one', d: 'bKash in Dhaka, Stripe in Dallas, Razorpay in Delhi. Local methods, multi-currency pricing, one dashboard. Wherever you scale next, checkout is already there.' },
            { icon: ShieldCheck, t: 'Security you can put in a contract', d: 'SSL everywhere, encrypted storage, hardened admin access. For SaaS and stores alike, your customers\u2019 data is treated like it\u2019s ours.' },
          ].map((c) => (
            <div key={c.t} className="border-l-2 border-ink pl-5">
              <c.icon className="w-5 h-5 text-verm mb-3" />
              <div className="font-semibold text-ink mb-1">{c.t}</div>
              <p className="text-sm text-mut leading-relaxed">{c.d}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
