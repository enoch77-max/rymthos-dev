import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Mail, Phone, MessageCircle, Globe, Send, CheckCircle2, ArrowUpRight, Check } from 'lucide-react';

type LegalDoc = 'terms' | 'privacy';

import { WEB3FORMS_KEY, WA_NUMBER, EMAIL, API_ENDPOINT } from '../lib/lead';

const methods = [
  { icon: MessageCircle, label: 'Direct WhatsApp · Global', value: '+880 1400 788 738', href: 'https://wa.me/8801400788738' },
  { icon: Phone, label: 'Direct Call / WhatsApp · Bangladesh', value: '+880 1400 788 738', href: 'tel:+8801400788738' },
  { icon: Mail, label: 'Direct Email', value: 'rymthos.dev@gmail.com', href: 'mailto:rymthos.dev@gmail.com' },
  { icon: Globe, label: 'Official Facebook', value: 'Rymthos Dev', href: 'https://www.facebook.com/share/1KpGGzTiwS/' },
];

export default function Contact({ onOpenLegal }: { onOpenLegal: (d: LegalDoc) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [via, setVia] = useState<'inbox' | 'whatsapp'>('inbox');
  const [agree, setAgree] = useState(false);
  const [hp, setHp] = useState(''); // honeypot: humans never see or fill this
  const [form, setForm] = useState({ name: '', email: '', type: 'Website', budget: '$200–$500', message: '' });

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const custom = e as CustomEvent<{ message?: string; type?: string }>;
      if (custom.detail) {
        setForm((prev) => ({
          ...prev,
          message: custom.detail.message || prev.message,
          type: custom.detail.type || prev.type,
        }));
      }
    };
    window.addEventListener('prefill-brief', onPrefill);
    return () => window.removeEventListener('prefill-brief', onPrefill);
  }, []);

  // WhatsApp reads like the client typing from their own phone — chatty, first person.
  const waBrief = () =>
    [
      `Hi Rymthos Dev,`,
      ``,
      `My name is ${form.name} (${form.email}).`,
      ``,
      `I'd like to build: ${form.type}`,
      `My budget range: ${form.budget}`,
      ``,
      `Here's my vision:`,
      form.message,
      ``,
      `Looking forward to hearing from you.`,
    ].join('\n');

  // Email is more formal — proper subject, signature, and contact details.
  const emailBrief = () => ({
    subject: `Project inquiry: ${form.type} — ${form.name}`,
    body: [
      `Hi Rymthos Dev,`,
      ``,
      `I'm ${form.name}, reaching out about a ${form.type.toLowerCase()} project.`,
      ``,
      `Budget range: ${form.budget}`,
      ``,
      `My vision:`,
      form.message,
      ``,
      `You can reach me at ${form.email}.`,
      ``,
      `Best,`,
      form.name,
    ].join('\n'),
  });

  const openWhatsApp = () =>
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waBrief())}`, '_blank');

  const openEmail = () => {
    const { subject, body } = emailBrief();
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Bot filled the hidden field — silently "succeed" without sending anything.
    if (hp) {
      setVia('inbox');
      setStatus('sent');
      return;
    }
    setStatus('sending');

    // Every channel is tried independently; the lead is never lost.
    let delivered = false;

    // 1) Your backend pipeline (DB + AI + Telegram + client ack) when deployed.
    if (API_ENDPOINT) {
      try {
        const res = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, kind: 'project' }),
        });
        if (res.ok) delivered = true;
      } catch { /* offline host or backend down: keep going */ }
    }

    // 2) Web3Forms inbox copy, regardless of backend state.
    if (WEB3FORMS_KEY) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `Project inquiry: ${form.type} (${form.name})`,
            from_name: form.name,
            email: form.email,
            project_type: form.type,
            budget: form.budget,
            message: form.message,
          }),
        });
        if (res.ok) delivered = true;
      } catch { /* same: keep going */ }
    }

    if (delivered) {
      setVia('inbox');
    } else {
      // 3) Last resort, always available: the composed brief in WhatsApp.
      openWhatsApp();
      setVia('whatsapp');
    }
    setStatus('sent');
  };

  const field = 'w-full bg-transparent border-b-2 border-line-2 focus:border-verm py-3 text-ink text-base outline-none transition-colors placeholder:text-mut-2';
  const label = 't-label text-mut block mb-2';

  return (
    <section id="contact" className="relative py-28 lg:py-36 bg-paper-2 border-t-2 border-ink">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="t-label text-verm mb-5">(12) · CONTACT</div>
          <h2 className="t-display text-6xl lg:text-9xl text-ink">
            Let's make<br />
            something <span className="text-verm">worth shipping.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border-2 border-ink hard-shadow p-12 text-center"
              >
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-4" />
                <h3 className="t-display text-4xl text-ink mb-2">Brief delivered.</h3>
                <p className="text-mut max-w-sm mx-auto mb-6 leading-relaxed">
                  {via === 'inbox'
                    ? 'It\u2019s on its way to our inbox right now. Expect a reply within 24 hours, usually much sooner.'
                    : 'Your message just opened in WhatsApp, composed and ready to send. Expect a reply within 24 hours.'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={openEmail}
                    className="text-sm font-semibold text-ink underline decoration-verm decoration-2 underline-offset-4 hover:text-verm transition-colors"
                  >
                    Prefer email? Send it there instead
                  </button>
                  <button
                    onClick={() => setStatus('idle')}
                    className="t-label text-mut border border-line px-3 py-2 hover:border-ink hover:text-ink transition-colors"
                  >
                    Write another
                  </button>
                </div>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border-2 border-ink hard-shadow p-12 text-center"
              >
                <h3 className="t-display text-3xl text-ink mb-2">Couldn't send.</h3>
                <p className="text-mut max-w-sm mx-auto mb-6">No worries. Send the same brief directly:</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button onClick={openWhatsApp} className="bg-[#25D366] text-paper px-5 py-3 text-sm font-semibold hover:bg-ink transition-colors">
                    Send via WhatsApp
                  </button>
                  <button onClick={openEmail} className="border-2 border-ink px-5 py-3 text-sm font-semibold hover:bg-ink hover:text-paper transition-colors">
                    Send via Email
                  </button>
                </div>
                <button onClick={() => setStatus('idle')} className="block mx-auto mt-5 t-label text-mut hover:text-ink transition-colors">
                  Back to form
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="bg-card border-2 border-ink hard-shadow p-8 lg:p-10 space-y-7">
                <div className="grid sm:grid-cols-2 gap-7">
                  <div>
                    <label className={label}>Your name</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Jane Founder" />
                  </div>
                  <div>
                    <label className={label}>Email</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} placeholder="jane@brand.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-7">
                  <div>
                    <label className={label}>Project type</label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={`${field} appearance-none cursor-pointer`}>
                      {['Website', 'E-Commerce', 'Mobile App', 'Web App', 'Branding', 'Other'].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={label}>Budget</label>
                    <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={`${field} appearance-none cursor-pointer`}>
                      {['Under $200', '$200–$500', '$500–$1,000', '$1,000–$2,500', '$2,500+'].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={label}>The vision</label>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none`} placeholder="Goals, timeline, references. Anything that helps us quote accurately." />
                </div>

                {/* honeypot — invisible to people, irresistible to bots */}
                <input
                  type="text"
                  name="company"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <label className="flex items-start gap-3 cursor-pointer group pt-2">
                  <input
                    type="checkbox"
                    required
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="sr-only"
                  />
                  <span className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    agree ? 'border-verm bg-verm' : 'border-mut-2 group-hover:border-ink'
                  }`}>
                    {agree && <Check className="w-3 h-3 text-paper" strokeWidth={3} />}
                  </span>
                  <span className="text-xs text-mut leading-relaxed">
                    I’ve read and agree to the{' '}
                    <button type="button" onClick={() => onOpenLegal('terms')} className="text-ink underline decoration-verm decoration-2 underline-offset-2 hover:text-verm transition-colors">
                      Terms &amp; Conditions
                    </button>{' '}
                    and{' '}
                    <button type="button" onClick={() => onOpenLegal('privacy')} className="text-ink underline decoration-verm decoration-2 underline-offset-2 hover:text-verm transition-colors">
                      Privacy Policy
                    </button>.
                  </span>
                </label>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group flex items-center gap-3 bg-ink text-paper pl-7 pr-2 py-2.5 text-sm font-semibold tracking-wide hover:bg-verm transition-colors hard-shadow-sm disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send the brief'}
                    <span className="w-9 h-9 bg-paper text-ink flex items-center justify-center group-hover:rotate-45 transition-transform">
                      <Send className="w-4 h-4" />
                    </span>
                  </button>
                  <span className="t-label text-mut">
                    {API_ENDPOINT || WEB3FORMS_KEY ? 'Sent straight to our inbox' : 'Delivered via WhatsApp'} or{' '}
                    <button type="button" onClick={openEmail} className="text-ink underline decoration-verm decoration-2 underline-offset-2 hover:text-verm transition-colors">email</button>
                  </span>
                </div>
              </form>
            )}
          </motion.div>

          {/* channels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* who answers — identity at the moment of commitment */}
            <div className="flex items-center gap-4 bg-ink text-paper p-4">
              <img
                src="https://i.postimg.cc/7LmBHj90/Man-wearing-structured-coat-2K-202608122133-1.jpg"
                onError={(e) => {
                  const t = e.currentTarget as HTMLImageElement;
                  if (!t.src.includes('/photo.jpg')) t.src = '/photo.jpg';
                }}
                alt="Md. Billal Hossain"
                loading="lazy"
                style={{ objectPosition: '50% 18%' }}
                className="w-12 h-12 object-cover border-2 border-paper/20 grayscale"
              />
              <div>
                <div className="text-sm font-semibold">A real human answers. Never a ticket queue.</div>
                <div className="t-label text-paper/50 mt-1">Real replies · within 24h</div>
              </div>
            </div>

            {methods.map((m, i) => (
              <a
                key={i}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 bg-card border-2 border-ink p-5 hover:bg-ink hover:text-paper transition-colors hard-shadow-sm"
              >
                <span className="w-11 h-11 bg-paper-2 border-2 border-ink flex items-center justify-center group-hover:bg-verm group-hover:border-verm transition-colors">
                  <m.icon className="w-4 h-4" />
                </span>
                <div className="flex-1">
                  <div className="t-label text-mut group-hover:text-paper/50">{m.label}</div>
                  <div className="font-semibold">{m.value}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}

            <div className="bg-ink text-paper border-2 border-ink p-6">
              <div className="t-label text-paper/50 mb-3">What happens next</div>
              <p className="text-sm text-paper/80 leading-relaxed">
                Scope and fixed quote within <span className="text-lime font-semibold">48 hours</span>.
                Currently booking the next sprint.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
