import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ArrowUp, Calculator, Mail, Phone, MessageCircle } from 'lucide-react';
import { SA_PHONE_NUMBER, SA_PHONE_RAW, BD_PHONE_DISPLAY, WA_NUMBER, EMAIL } from '../lib/lead';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Care', href: '#care' },
  { label: 'FAQ', href: '#assurance' },
];

const menuExtra = [
  { label: 'Outcomes', href: '#outcomes' },
  { label: 'Payment rails', href: '#payments' },
  { label: 'Small business offer', href: '#offer' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenCalc }: { onOpenCalc: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [showTop, setShowTop] = useState(false);
  const [time, setTime] = useState('');
  const [quarter, setQuarter] = useState('');

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          setShowTop(window.scrollY > 700);
          const ids = [...links.map((l) => l.href.slice(1)), 'contact'];
          for (let i = ids.length - 1; i >= 0; i--) {
            const el = document.getElementById(ids[i]);
            if (el && el.getBoundingClientRect().top <= 160) {
              setActive(ids[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC',
      }));
      setQuarter(`Q${Math.floor(d.getMonth() / 3) + 1} ${d.getFullYear()}`);
    };
    tick();
    const i = setInterval(tick, 30000);
    return () => { window.removeEventListener('scroll', onScroll); clearInterval(i); };
  }, []);

  const go = (h: string) => {
    setOpen(false);
    setTimeout(() => document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <>
      {/* status strip */}
      <div className="fixed top-0 left-0 right-0 z-[70] bg-ink text-paper">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 h-8 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <span className="t-label text-paper/50 hidden sm:block">SYS.STATUS</span>
            <span className="flex items-center gap-1.5 t-label text-paper">
              <span className="w-1.5 h-1.5 rounded-full bg-lime pulse-dot" />
              Global sprint slots open · {quarter}
            </span>
          </div>
          <span className="t-label text-paper/60 tabular">{time} UTC · Worldwide</span>
        </div>
      </div>

      <ScrollProgress />

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-8 left-0 right-0 z-[65] transition-all duration-500 ${
          scrolled ? 'bg-paper/90 backdrop-blur-md border-b border-line' : ''
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-16">
            <a href="#home" onClick={(e) => { e.preventDefault(); go('#home'); }} className="flex items-baseline gap-1">
              <span className="t-display text-xl tracking-tight">RYMTHOS</span>
              <span className="t-mono text-[10px] text-verm">®DEV</span>
            </a>

            <div className="hidden md:flex items-center gap-7">
              {links.map((l) => {
                const isActive = active === l.href.slice(1);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); go(l.href); }}
                    className={`t-label transition-colors relative py-1 ${isActive ? 'text-ink' : 'text-mut hover:text-ink'}`}
                  >
                    {l.label}
                    <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-verm transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => go('#contact')}
                className="hidden md:flex items-center gap-2 bg-ink text-paper px-5 py-2.5 text-xs font-semibold tracking-wide hover:bg-verm transition-colors group"
              >
                Start a project
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
              </button>
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="w-11 h-11 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-ink text-paper flex flex-col"
          >
            <div className="max-w-[1440px] mx-auto px-5 lg:px-10 w-full h-24 flex items-center justify-between">
              <span className="t-display text-xl">RYMTHOS<span className="t-mono text-[10px] text-verm ml-1">®DEV</span></span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 border-2 border-paper/30 flex items-center justify-center hover:bg-verm hover:border-verm transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 max-w-[1440px] mx-auto px-5 lg:px-10 w-full grid lg:grid-cols-12 gap-10 pb-10 overflow-y-auto">
              <div className="lg:col-span-7">
                <div className="t-label text-paper/40 mb-6">Navigate</div>
                <nav className="space-y-1">
                  {[{ label: 'Home', href: '#home' }, ...links, ...menuExtra].map((l, i) => (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      onClick={(e) => { e.preventDefault(); go(l.href); }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                      className="group flex items-center justify-between py-2.5 border-b border-paper/10"
                    >
                      <span className="t-display text-3xl lg:text-5xl group-hover:text-verm group-hover:translate-x-2 transition-all">
                        {l.label}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-paper/30 group-hover:text-verm group-hover:rotate-45 transition-all" />
                    </motion.a>
                  ))}
                </nav>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-5">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => { setOpen(false); onOpenCalc(); }}
                  className="group bg-lime text-ink border-2 border-lime p-6 text-left hover:bg-verm hover:border-verm transition-colors hard-shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-5 h-5" />
                    <span className="t-label">Interactive tool</span>
                  </div>
                  <div className="t-display text-3xl mb-1">Cost Calculator</div>
                  <p className="text-sm opacity-70">Build your estimate with plan, add-ons, care, and hosting. See the number before you talk to us.</p>
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="border border-paper/15 p-6 space-y-3"
                >
                  <div className="t-label text-paper/40 mb-2">Direct</div>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm text-paper/80 hover:text-verm transition-colors">
                    <Mail className="w-4 h-4" /> {EMAIL}
                  </a>
                  <a href={`tel:+${SA_PHONE_RAW}`} className="flex items-center justify-between text-sm text-paper/80 hover:text-verm transition-colors">
                    <span className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-lime" /> {SA_PHONE_NUMBER}
                    </span>
                    <span className="text-[10px] text-lime border border-lime/30 px-1.5 py-0.5 font-mono">Direct Call (KSA)</span>
                  </a>
                  <a href={`https://wa.me/${SA_PHONE_RAW}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-paper/80 hover:text-verm transition-colors">
                    <span className="flex items-center gap-3">
                      <MessageCircle className="w-4 h-4 text-emerald-400" /> {SA_PHONE_NUMBER}
                    </span>
                    <span className="text-[10px] text-emerald-400 border border-emerald-400/30 px-1.5 py-0.5 font-mono">WhatsApp (KSA)</span>
                  </a>
                  <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-paper/80 hover:text-verm transition-colors">
                    <span className="flex items-center gap-3">
                      <MessageCircle className="w-4 h-4 text-paper/70" /> {BD_PHONE_DISPLAY}
                    </span>
                    <span className="text-[10px] text-paper/40 border border-paper/20 px-1.5 py-0.5 font-mono">WhatsApp (BD)</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-[60] w-11 h-11 bg-card text-ink border-2 border-ink flex items-center justify-center hover:bg-verm hover:text-paper hover:border-verm hover:-translate-y-0.5 transition-all hard-shadow-sm"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const h = document.documentElement;
          setP(h.scrollTop / (h.scrollHeight - h.clientHeight));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-8 left-0 right-0 z-[66] h-[2px]">
      <div className="h-full bg-verm origin-left" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
