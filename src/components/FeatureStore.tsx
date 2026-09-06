import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Minimize2, Gauge, Zap, BellRing, MessagesSquare, MailOpen, Languages,
  Newspaper, Search, CalendarCheck, FileText, Boxes, ShieldCheck, KeyRound,
  Gift, Tags, Repeat, ArrowRight, Plug, Bot, PenLine, ScanSearch,
} from 'lucide-react';

type Cat = 'All' | 'Performance' | 'Sales' | 'Communication' | 'Content' | 'Operations' | 'Security' | 'AI';

const ADDONS: { icon: typeof Zap; name: string; desc: string; price: number; cat: Exclude<Cat, 'All'> }[] = [
  { icon: Minimize2, name: 'Auto image compression', desc: 'Product photos compress themselves on upload. Fast pages, zero effort, no quality loss.', price: 79, cat: 'Performance' },
  { icon: Gauge, name: 'CDN & edge setup', desc: 'Your site served from the server nearest each visitor. Global speed.', price: 59, cat: 'Performance' },
  { icon: Zap, name: 'Advanced caching', desc: 'Repeat visits load instantly. Servers breathe easier.', price: 69, cat: 'Performance' },
  { icon: Repeat, name: 'Abandoned cart recovery', desc: 'Automatic reminders bring back shoppers who almost bought.', price: 99, cat: 'Sales' },
  { icon: Gift, name: 'Loyalty & points', desc: 'Customers earn, return, and spend more. Repeat revenue on autopilot.', price: 129, cat: 'Sales' },
  { icon: Tags, name: 'Flash sale engine', desc: 'Countdowns, timed discounts, urgency that actually converts.', price: 89, cat: 'Sales' },
  { icon: BellRing, name: 'WhatsApp order alerts', desc: 'You and your customer both get instant WhatsApp updates per order.', price: 69, cat: 'Communication' },
  { icon: MessagesSquare, name: 'Live chat widget', desc: 'Answer questions before they become lost sales.', price: 49, cat: 'Communication' },
  { icon: MailOpen, name: 'Email receipt flows', desc: 'Order confirmations, shipping notes, thank-yous. Automated and branded.', price: 79, cat: 'Communication' },
  { icon: Languages, name: 'Multi-language', desc: 'Bangla, English, Arabic. Switchable, SEO-friendly translations.', price: 129, cat: 'Content' },
  { icon: Newspaper, name: 'Blog & news module', desc: 'Publish easily, rank organically, own your audience.', price: 89, cat: 'Content' },
  { icon: Search, name: 'SEO schema automation', desc: 'Structured data generated automatically so Google understands every page.', price: 69, cat: 'Content' },
  { icon: CalendarCheck, name: 'Booking & appointments', desc: 'Customers pick a slot, you get the booking. Calendars sync.', price: 149, cat: 'Operations' },
  { icon: FileText, name: 'Invoice PDF generation', desc: 'Professional invoices auto-created with every order.', price: 89, cat: 'Operations' },
  { icon: Boxes, name: 'Low-stock alerts', desc: 'Know before you run out. Never oversell again.', price: 59, cat: 'Operations' },
  { icon: KeyRound, name: 'Two-factor admin login', desc: 'Your dashboard protected even if a password leaks.', price: 49, cat: 'Security' },
  { icon: ShieldCheck, name: 'Daily offsite backups', desc: 'A copy of everything, every day, stored far from your server.', price: 39, cat: 'Security' },
  { icon: Bot, name: 'AI site assistant', desc: 'A chatbot trained on your business that answers customers 24/7, in your brand\u2019s voice, on every page.', price: 149, cat: 'AI' },
  { icon: PenLine, name: 'AI product descriptions', desc: 'Upload a photo, get ready-to-publish copy. Your catalog writes itself.', price: 99, cat: 'AI' },
  { icon: ScanSearch, name: 'Smart AI search', desc: 'Customers describe what they want in plain words and the store finds it.', price: 129, cat: 'AI' },
];

const INTEGRATIONS: [string, string, string][] = [
  ['Extra payment gateway', '$79', 'bKash, Nagad, Stripe, PayPal, any one'],
  ['Courier & shipping API', '$69', 'Pathao, Steadfast, DHL, FedEx'],
  ['Email / SMS provider', '$59', 'SendGrid, Twilio, Mailgun'],
  ['Analytics & pixels', '$49', 'GA4, Meta Pixel, TikTok Pixel'],
  ['CRM / ERP connection', '$99', 'HubSpot, Zoho, custom systems'],
  ['Custom third-party API', 'Quoted', 'Scoped together on the call'],
];

const CATS: Cat[] = ['All', 'Performance', 'Sales', 'Communication', 'Content', 'Operations', 'Security', 'AI'];

export default function FeatureStore({ onContact }: { onContact: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '600px 0px' });
  const [cat, setCat] = useState<Cat>('All');

  const shown = cat === 'All' ? ADDONS : ADDONS.filter((a) => a.cat === cat);

  return (
    <section id="addons" ref={ref} className="relative py-28 lg:py-36 bg-ink text-paper overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }} />
      <div className="relative max-w-[1440px] mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-12 gap-8 mb-14 items-end"
        >
          <div className="lg:col-span-7">
            <div className="t-label text-verm mb-5">(09) · ADD-ONS, IN THE OPEN</div>
            <h2 className="t-display text-6xl lg:text-8xl">
              The feature<br />
              <span className="text-lime">store.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-paper/60 leading-relaxed mb-4">
              Every add-on below is a finished, tested feature with <span className="text-paper font-semibold">one fixed price</span> covering
              build, install, and our service all included. No hourly meters, no surprise line items.
            </p>
            <p className="t-label text-verm">If it isn’t priced, it doesn’t happen without your approval.</p>
          </div>
        </motion.div>

        {/* filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`t-label px-4 py-2 border transition-all ${
                cat === c ? 'bg-paper text-ink border-paper' : 'border-paper/20 text-paper/60 hover:text-paper hover:border-paper/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* add-on grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {shown.map((a, i) => (
            <motion.div
              key={a.name}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
              className="group bg-ink-2 border border-paper/10 hover:border-lime/50 p-5 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="w-10 h-10 bg-paper text-ink flex items-center justify-center group-hover:bg-lime transition-colors">
                  <a.icon className="w-4 h-4" />
                </span>
                <span className="t-mono text-sm text-lime border border-lime/30 px-2.5 py-1">
                  +${a.price}
                </span>
              </div>
              <h3 className="font-semibold text-paper mb-1.5">{a.name}</h3>
              <p className="text-xs text-paper/50 leading-relaxed">{a.desc}</p>
              <div className="t-label text-paper/30 mt-3">{a.cat} · one-time</div>
            </motion.div>
          ))}
        </motion.div>

        {/* integration fees */}
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-verm text-paper flex items-center justify-center"><Plug className="w-4 h-4" /></span>
              <h3 className="t-display text-3xl lg:text-4xl">Integrations,<br />priced honestly.</h3>
            </div>
            <p className="text-sm text-paper/60 leading-relaxed mb-6 max-w-md">
              Some things we don’t build, we wire them in. For those, you pay two numbers,
              both stated before we start: the provider’s own cost (theirs, passed through at cost)
              and our fixed integration fee (ours, listed here).
            </p>
            <div className="space-y-3">
              {[
                ['Provider licenses & fees', 'Go straight to the provider. We never mark them up.'],
                ['Our integration work', 'Fixed per connector. Quoted in writing before we begin.'],
                ['Anything unlisted', 'Scoped on the call. You approve the number, then we build.'],
              ].map(([t, d]) => (
                <div key={t} className="border-l-2 border-verm pl-4">
                  <div className="text-sm font-semibold text-paper">{t}</div>
                  <div className="text-xs text-paper/50 mt-0.5">{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-paper/15 divide-y divide-paper/10">
              <div className="grid grid-cols-3 px-6 py-3.5 t-label text-paper/40">
                <span>Connector</span><span>Our fee</span><span className="text-right">Covers</span>
              </div>
              {INTEGRATIONS.map(([name, fee, covers]) => (
                <div key={name} className="grid grid-cols-3 px-6 py-4 items-center text-sm hover:bg-paper/5 transition-colors">
                  <span className="text-paper font-medium">{name}</span>
                  <span className="t-mono text-lime">{fee}</span>
                  <span className="text-right text-paper/50 text-xs">{covers}</span>
                </div>
              ))}
            </div>
            <button
              onClick={onContact}
              className="group mt-6 flex items-center gap-3 text-sm font-semibold text-paper hover:text-lime transition-colors"
            >
              Need something that isn’t listed? It’s a conversation, not a guess.
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
