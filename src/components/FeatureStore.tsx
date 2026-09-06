import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Minimize2, Gauge, Zap, BellRing, MessagesSquare, MailOpen, Languages,
  Newspaper, Search, CalendarCheck, FileText, Boxes, ShieldCheck, KeyRound,
  Gift, Tags, Repeat, ArrowRight, Plug, Bot, PenLine, ScanSearch, PackageCheck, Sparkles, Truck,
} from 'lucide-react';

type Cat = 'All' | 'Power Packs' | 'Performance' | 'Sales' | 'Communication' | 'Content' | 'Operations' | 'Security' | 'AI';

interface AddonItem {
  icon: typeof Zap;
  name: string;
  desc: string;
  price: number;
  bdtPrice: number;
  cat: Exclude<Cat, 'All'>;
  badge?: string;
}

const POWER_PACKS: AddonItem[] = [
  {
    icon: Truck,
    name: 'BD Courier & WhatsApp Commerce Stack',
    desc: 'Automated Pathao / Steadfast courier API dispatch + instant WhatsApp order alerts + fake COD order deterrent.',
    price: 99,
    bdtPrice: 11000,
    cat: 'Power Packs',
    badge: 'POPULAR IN BD',
  },
  {
    icon: Sparkles,
    name: 'Sub-Second Speed & Edge CDN Stack',
    desc: 'Edge CDN distribution, automated WebP compression, browser caching, and Google PageSpeed 95+ score tuning.',
    price: 119,
    bdtPrice: 13000,
    cat: 'Power Packs',
    badge: 'MAX PERFORMANCE',
  },
  {
    icon: Bot,
    name: 'AI Sales Co-Pilot & Assistant',
    desc: 'Custom chatbot trained on your product catalog and FAQs in English & Bangla + AI product description generator.',
    price: 169,
    bdtPrice: 18500,
    cat: 'Power Packs',
    badge: 'AI ADVANTAGE',
  },
];

const ADDONS: AddonItem[] = [
  ...POWER_PACKS,
  { icon: Minimize2, name: 'Auto image compression', desc: 'Product photos compress themselves on upload. Fast pages, zero effort, no quality loss.', price: 49, bdtPrice: 5000, cat: 'Performance' },
  { icon: Gauge, name: 'CDN & edge setup', desc: 'Your site served from the server nearest each visitor. Global sub-second speed.', price: 59, bdtPrice: 6500, cat: 'Performance' },
  { icon: Zap, name: 'Advanced caching', desc: 'Repeat visits load instantly. Reduces server bandwidth and memory.', price: 69, bdtPrice: 7500, cat: 'Performance' },
  { icon: Repeat, name: 'Abandoned cart recovery', desc: 'Automatic email and SMS reminders bring back shoppers who almost bought.', price: 99, bdtPrice: 11000, cat: 'Sales' },
  { icon: Gift, name: 'Loyalty & reward points', desc: 'Customers earn points on orders and return to spend more.', price: 129, bdtPrice: 14000, cat: 'Sales' },
  { icon: Tags, name: 'Flash sale & coupon engine', desc: 'Timed countdowns, promotional discounts, and urgency triggers that convert.', price: 89, bdtPrice: 9500, cat: 'Sales' },
  { icon: BellRing, name: 'WhatsApp order alerts', desc: 'You and your customer both get instant WhatsApp order receipts & tracking.', price: 69, bdtPrice: 7500, cat: 'Communication' },
  { icon: MessagesSquare, name: 'Live chat widget', desc: 'Direct chat widget answering questions before they become abandoned carts.', price: 49, bdtPrice: 5000, cat: 'Communication' },
  { icon: MailOpen, name: 'Email receipt flows', desc: 'Branded order confirmations, shipping updates, and review requests.', price: 79, bdtPrice: 8500, cat: 'Communication' },
  { icon: Languages, name: 'Multi-language (Bangla + EN)', desc: 'Switchable English, Bangla, or Arabic with SEO-friendly URL slugs.', price: 99, bdtPrice: 11000, cat: 'Content' },
  { icon: Newspaper, name: 'Blog & news module', desc: 'Publish SEO articles easily, rank organically on Google, and own your audience.', price: 89, bdtPrice: 9500, cat: 'Content' },
  { icon: Search, name: 'Rich SEO schema automation', desc: 'JSON-LD structured data for Google rich snippets, reviews, and star ratings.', price: 69, bdtPrice: 7500, cat: 'Content' },
  { icon: CalendarCheck, name: 'Booking & appointment slots', desc: 'Clients choose a date & time slot. Auto-syncs with Google Calendar.', price: 129, bdtPrice: 14000, cat: 'Operations' },
  { icon: FileText, name: 'Invoice PDF generation', desc: 'Clean, printable tax invoices and packing slips auto-created per order.', price: 89, bdtPrice: 9500, cat: 'Operations' },
  { icon: Boxes, name: 'Low-stock automated alerts', desc: 'Email alerts before bestsellers run out. Never oversell backorders again.', price: 59, bdtPrice: 6500, cat: 'Operations' },
  { icon: KeyRound, name: 'Two-factor admin login (2FA)', desc: 'Admin dashboard protected with Google Authenticator OTP even if passwords leak.', price: 49, bdtPrice: 5000, cat: 'Security' },
  { icon: ShieldCheck, name: 'Daily offsite backups', desc: 'Encrypted daily database and media backups stored safely offsite.', price: 39, bdtPrice: 4000, cat: 'Security' },
  { icon: Bot, name: 'AI site chatbot assistant', desc: 'A dedicated AI agent trained on your business documents to assist customers 24/7.', price: 149, bdtPrice: 16000, cat: 'AI' },
  { icon: PenLine, name: 'AI product copywriter', desc: 'Generate high-converting product descriptions directly inside your admin panel.', price: 99, bdtPrice: 11000, cat: 'AI' },
  { icon: ScanSearch, name: 'Smart AI semantic search', desc: 'Allows customers to describe what they want in natural language and find exact matches.', price: 129, bdtPrice: 14000, cat: 'AI' },
];

const INTEGRATIONS: { name: string; usd: string; bdt: string; covers: string }[] = [
  { name: 'Extra payment gateway', usd: '$79', bdt: '৳8,500', covers: 'bKash, Nagad, Stripe, PayPal, any one' },
  { name: 'Courier & shipping API', usd: '$69', bdt: '৳7,500', covers: 'Pathao, Steadfast, DHL, FedEx' },
  { name: 'Email / SMS provider', usd: '$59', bdt: '৳6,500', covers: 'Greenweb, Elitbuzz, SendGrid, Twilio' },
  { name: 'Analytics & pixels', usd: '$49', bdt: '৳5,000', covers: 'GA4, Meta Pixel, TikTok Pixel' },
  { name: 'CRM / ERP connection', usd: '$99', bdt: '৳11,000', covers: 'HubSpot, Zoho, custom inventory systems' },
  { name: 'Custom third-party API', usd: 'Quoted', bdt: 'কাস্টম', covers: 'Scoped together on the strategy call' },
];

const CATS: Cat[] = ['All', 'Power Packs', 'Performance', 'Sales', 'Communication', 'Content', 'Operations', 'Security', 'AI'];

export default function FeatureStore({
  currency = 'USD',
  onContact,
}: {
  currency?: 'USD' | 'BDT';
  onContact: () => void;
}) {
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
              Every feature below is a finished, tested module with <span className="text-paper font-semibold">one fixed price</span> covering
              build, installation, and testing. Zero hourly meters, zero surprise invoices.
            </p>
            <p className="t-label text-verm">All add-ons include 30 days of free support and guaranteed compatibility.</p>
          </div>
        </motion.div>

        {/* filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`t-label px-4 py-2 border transition-all ${
                cat === c
                  ? 'bg-paper text-ink border-paper'
                  : c === 'Power Packs'
                  ? 'border-lime text-lime hover:bg-lime/10'
                  : 'border-paper/20 text-paper/60 hover:text-paper hover:border-paper/50'
              }`}
            >
              {c === 'Power Packs' ? '⚡ Power Packs' : c}
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
              className={`group border p-5 transition-colors relative ${
                a.cat === 'Power Packs'
                  ? 'bg-ink-2 border-lime/60 hover:border-lime'
                  : 'bg-ink-2 border-paper/10 hover:border-lime/50'
              }`}
            >
              {a.badge && (
                <span className="absolute -top-2.5 right-4 bg-lime text-ink t-mono text-[9px] font-bold px-2 py-0.5 tracking-wider">
                  {a.badge}
                </span>
              )}
              <div className="flex items-start justify-between mb-4">
                <span className="w-10 h-10 bg-paper text-ink flex items-center justify-center group-hover:bg-lime transition-colors">
                  <a.icon className="w-4 h-4" />
                </span>
                <span className="t-mono text-sm text-lime border border-lime/30 px-2.5 py-1">
                  +{currency === 'USD' ? `$${a.price}` : `৳${a.bdtPrice.toLocaleString()}`}
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
              Some tools are third-party services. You pay their subscription directly at provider cost
              (never marked up by us), and our fixed setup fee listed here.
            </p>
            <div className="space-y-3">
              {[
                ['Provider fees', 'Go directly to the provider. We never touch or mark up their rates.'],
                ['Our integration fee', 'Fixed per connector. Quoted in writing before we begin.'],
                ['Custom systems', 'Scoped on the call. You approve the number, then we wire it in.'],
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
                <span>Connector</span><span>Our setup fee</span><span className="text-right">Covers</span>
              </div>
              {INTEGRATIONS.map((item) => (
                <div key={item.name} className="grid grid-cols-3 px-6 py-4 items-center text-sm hover:bg-paper/5 transition-colors">
                  <span className="text-paper font-medium">{item.name}</span>
                  <span className="t-mono text-lime">
                    {currency === 'USD' ? item.usd : item.bdt}
                  </span>
                  <span className="text-right text-paper/50 text-xs">{item.covers}</span>
                </div>
              ))}
            </div>
            <button
              onClick={onContact}
              className="group mt-6 flex items-center gap-3 text-sm font-semibold text-paper hover:text-lime transition-colors"
            >
              Need a custom ERP or bank API? Let us scope it together.
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
