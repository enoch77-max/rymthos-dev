import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, ShoppingBasket, Stethoscope, Wrench, UtensilsCrossed, Home, Dumbbell } from 'lucide-react';

const slides = [
  {
    img: 'https://images.pexels.com/photos/4029473/pexels-photo-4029473.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
    sector: 'Fashion e-commerce',
    title: 'Stride',
    pitch: 'A sneaker store that sells while you sleep — one-tap checkout, sub-second pages.',
    accent: '#ff4d1c',
    icon: ShoppingBasket,
    stat: ['3.1%', 'conversion', '+212% vs. old site'],
  },
  {
    img: 'https://images.pexels.com/photos/6812463/pexels-photo-6812463.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
    sector: 'Dental & clinics',
    title: 'BrightSmile',
    pitch: 'Patients book themselves in. The front desk finally answers the phone.',
    accent: '#0d9488',
    icon: Stethoscope,
    stat: ['4.9★', 'patient rating', '63% book online'],
  },
  {
    img: 'https://images.pexels.com/photos/8936927/pexels-photo-8936927.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
    sector: 'E-bike retail',
    title: 'Volta',
    titleNote: 'the rebuild in the section above',
    pitch: 'One struggling bike shop, rebuilt. Test-ride bookings up 180% in a quarter.',
    accent: '#10b981',
    icon: ShoppingBasket,
    stat: ['1.2s', 'first paint', 'was 8.4s'],
  },
  {
    img: 'https://images.pexels.com/photos/8478235/pexels-photo-8478235.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
    sector: 'Garage & field service',
    title: 'WrenchFlow',
    pitch: 'Jobs route themselves to the free bay. No whiteboard, no lost jobs.',
    accent: '#f59e0b',
    icon: Wrench,
    stat: ['5/6', 'bays live', '0 lost jobs'],
  },
  {
    img: 'https://images.pexels.com/photos/24433378/pexels-photo-24433378.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
    sector: 'Restaurant',
    title: 'Saffron House',
    pitch: 'Tables kept without the phone tag. Fully booked Fri–Sat within two months.',
    accent: '#d4af37',
    icon: UtensilsCrossed,
    stat: ['100%', 'Fri–Sat booked', 'in 8 weeks'],
  },
  {
    img: 'https://images.pexels.com/photos/8583638/pexels-photo-8583638.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
    sector: 'Real estate',
    title: 'Nest',
    pitch: 'Buyers filter, compare, and shortlist. The agent only meets the serious ones.',
    accent: '#2f7fd6',
    icon: Home,
    stat: ['38', 'viewings/mo', '3× qualified'],
  },
  {
    img: 'https://images.pexels.com/photos/6389886/pexels-photo-6389886.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
    sector: 'Gym & fitness',
    title: 'IronCore',
    titleNote: 'also a live dashboard build',
    pitch: 'Classes that fill themselves. Scarcity you can see, capacity you can trust.',
    accent: '#facc15',
    icon: Dumbbell,
    stat: ['24h', 'self-serve', '−40% no-shows'],
  },
];

export default function DemoShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '120px 0px' });
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const moved = useRef(false);
  const goContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  const step = (d: number) => setIdx((i) => (i + d + slides.length) % slides.length);

  const onDown = (e: React.PointerEvent) => { startX.current = e.clientX; moved.current = false; setDragging(true); };
  const onMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 8) moved.current = true;
    setDragX(dx);
  };
  const onUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (dx < -60) step(1);
    else if (dx > 60) step(-1);
    startX.current = null;
    setDragX(0);
    setDragging(false);
    setTimeout(() => (moved.current = false), 0);
  };

  useEffect(() => {
    if (paused || !inView || dragging) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5200);
    return () => clearInterval(t);
  }, [paused, inView, dragging]);

  const s = slides[idx];

  return (
    <section id="showroom" ref={ref} className="relative py-28 lg:py-36 bg-ink text-paper overflow-hidden">
      <div className="absolute -top-40 right-[-10%] w-[560px] h-[560px] bg-verm/10 rounded-full blur-[180px] animate-floaty" />
      <div className="absolute bottom-[-20%] left-[-8%] w-[460px] h-[460px] bg-lime/8 rounded-full blur-[160px] animate-floaty" style={{ animationDelay: '2s' }} />

      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="t-label text-lime mb-5">(04) · THE SHOWROOM</div>
            <h2 className="t-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              Watch them<br />work. <span className="text-verm">Then picture yours.</span>
            </h2>
          </div>
          <p className="text-paper/50 max-w-sm text-sm leading-relaxed md:text-right">
            Seven businesses, seven sectors. Drag through them — every one is
            built to move a number that matters.
          </p>
        </motion.div>

        {/* stage */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="relative select-none touch-pan-y cursor-grab active:cursor-grabbing overflow-hidden border-2 border-paper/20"
          style={{ height: 'min(68vh, 620px)' }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={s.title}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              drag={dragging ? 'x' : false}
              className="absolute inset-0"
              style={{ x: dragging ? dragX * 0.15 : 0 }}
            >
              <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover animate-kenburns" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

              {/* top row */}
              <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 lg:px-10 py-6">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 flex items-center justify-center border border-white/25 backdrop-blur-sm bg-white/5">
                    <s.icon className="w-4 h-4" style={{ color: s.accent }} />
                  </span>
                  <span className="t-label text-white/70">{s.sector}</span>
                </div>
                <span className="t-label text-white/40">0{idx + 1} — 0{slides.length}</span>
              </div>

              {/* bottom block */}
              <div className="absolute bottom-0 inset-x-0 px-6 lg:px-10 pb-8 lg:pb-10">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  <div>
                    <h3 className="t-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.03em] text-white">
                      {s.title}<span style={{ color: s.accent }}>.</span>
                    </h3>
                    {s.titleNote && <div className="t-label text-white/40 mt-2">{s.titleNote}</div>}
                    <p className="text-white/70 text-sm md:text-base mt-3 max-w-md leading-relaxed">{s.pitch}</p>
                  </div>
                  <div className="flex items-center gap-8 shrink-0">
                    <div>
                      <div className="t-display text-4xl md:text-5xl leading-none" style={{ color: s.accent }}>{s.stat[0]}</div>
                      <div className="t-label text-white/50 mt-1.5">{s.stat[1]}</div>
                      <div className="t-label text-white/35 mt-0.5">{s.stat[2]}</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); goContact(); }}
                      className="group w-14 h-14 bg-white text-ink flex items-center justify-center hover:bg-[color:var(--acc)] hover:text-white transition-colors"
                      style={{ ['--acc' as string]: s.accent }}
                      aria-label="Build one like this"
                    >
                      <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* progress rail */}
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/10">
            <motion.div
              key={idx}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: paused || dragging ? 0 : 5.2, ease: 'linear' }}
              className="h-full"
              style={{ background: s.accent }}
            />
          </div>
        </div>

        {/* controls */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-1.5">
            {slides.map((d, i) => (
              <button
                key={d.title}
                onClick={() => setIdx(i)}
                aria-label={d.title}
                className="h-2 transition-all duration-500"
                style={{ width: i === idx ? 40 : 14, background: i === idx ? d.accent : 'rgba(255,255,255,0.18)' }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => step(-1)} aria-label="Previous" className="w-12 h-12 border-2 border-paper/25 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button onClick={() => step(1)} aria-label="Next" className="w-12 h-12 border-2 border-paper/25 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={goContact}
              className="group ml-3 flex items-center gap-2.5 bg-lime text-ink pl-5 pr-2 py-2.5 text-sm font-black uppercase tracking-wider hover:bg-verm hover:text-paper transition-colors"
            >
              Build mine
              <span className="w-8 h-8 bg-ink text-lime flex items-center justify-center group-hover:bg-paper group-hover:text-verm transition-colors">
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
