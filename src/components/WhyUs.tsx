import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

const BUDS = {
  hero: 'https://images.pexels.com/photos/30981655/pexels-photo-30981655.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
  alt: 'https://images.pexels.com/photos/6867258/pexels-photo-6867258.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
  case: 'https://images.pexels.com/photos/36625733/pexels-photo-36625733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
  plain: 'https://images.pexels.com/photos/28582648/pexels-photo-28582648.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
};

const STAGE_W = 640;
const STAGE_H = 460;
const APPLE_FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif";

/* =====================================================================
   BEFORE — a real 2011 small-business site. No parody colors:
   gray gradients, Times New Roman, default blue links, table borders.
   ===================================================================== */
function BeforeStore() {
  const cell = 'border border-[#c9c9c9] p-1.5 bg-white align-top';
  return (
    <div className="absolute inset-0 bg-[#f2f2f2] text-[#222] overflow-hidden" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      {/* gray gradient header bar */}
      <div
        className="px-3 py-2 border-b border-[#9a9a9a] flex items-baseline justify-between"
        style={{ background: 'linear-gradient(#e8e8e8, #c4c4c4)' }}
      >
        <span className="font-bold text-[14px] text-[#1a1a8c]">MegaSoundz Electronics</span>
        <span className="text-[8px] text-[#555] italic">Home of Bluetooth Earbuds</span>
      </div>

      {/* pipe-separated default links, mismatched sizes */}
      <div className="bg-white border-b border-[#c9c9c9] px-3 py-1.5 text-[#0000ee]" style={{ fontFamily: 'Arial, sans-serif' }}>
        <span className="text-[9px] underline">Home</span>
        <span className="text-[8px] text-[#777]"> | </span>
        <span className="text-[8px] underline">Products</span>
        <span className="text-[8px] text-[#777]"> | </span>
        <span className="text-[10px] underline font-bold">Earbuds</span>
        <span className="text-[8px] text-[#777]"> | </span>
        <span className="text-[8px] underline">About Us</span>
        <span className="text-[8px] text-[#777]"> | </span>
        <span className="text-[8px] underline">Contact</span>
      </div>

      {/* stretched banner photo with Times overlay */}
      <div className="relative mx-2 mt-2 h-[86px] border border-[#9a9a9a] overflow-hidden">
        <img src={BUDS.plain} alt="" className="absolute inset-0 w-full h-full" style={{ objectFit: 'fill' }} loading="lazy" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[16px] font-bold text-white">BLUETOOTH EARBUDS</span>
          <span className="text-[9px] text-[#e0e0e0]">High Quality Sound at Low Prices!!</span>
        </div>
      </div>

      <div className="px-2 mt-2" style={{ fontFamily: 'Arial, sans-serif' }}>
        <p className="text-[8px] text-[#800000] font-bold mb-1.5" style={{ fontFamily: "'Times New Roman', serif" }}>
          Welcome to our website!!! We sell the best earbuds. <span className="text-[#cc0000]">SALE going on now.</span>
        </p>

        {/* the product table */}
        <table className="w-full border-collapse text-[7.5px]" style={{ fontFamily: 'Arial, sans-serif' }}>
          <tbody>
            <tr>
              <td className={cell} style={{ width: '33%' }}>
                <div className="h-[44px] border border-[#ddd] overflow-hidden mb-1">
                  <img src={BUDS.plain} alt="" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: '15% 75%', transform: 'scale(1.9)' }} loading="lazy" />
                </div>
                <div className="font-bold text-[7px]">Bluetooth Earbud V2</div>
                <div className="text-[8px] mt-0.5">Price: <b>$19.99</b> <span className="text-[#cc0000] font-bold">SALE!</span></div>
                <button className="mt-1 text-[7px] px-2 py-0.5 bg-[#e4e4e4] border border-[#8a8a8a]" style={{ boxShadow: 'inset 1px 1px 0 #fff, inset -1px -1px 0 #aaa' }}>
                  Add to Cart
                </button>
              </td>
              <td className={cell} style={{ width: '34%' }}>
                <div className="h-[44px] border border-[#ddd] overflow-hidden mb-1 bg-white">
                  <img src={BUDS.case} alt="" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: '50% 10%' }} loading="lazy" />
                </div>
                <div className="font-bold text-[7px]">Earbud + Charging Box</div>
                <div className="text-[8px] mt-0.5">Price: <b>Call for price</b></div>
                <button className="mt-1 text-[7px] px-2 py-0.5 bg-[#e4e4e4] border border-[#8a8a8a]" style={{ boxShadow: 'inset 1px 1px 0 #fff, inset -1px -1px 0 #aaa' }}>
                  Enquire
                </button>
              </td>
              <td className={cell} style={{ width: '33%' }}>
                <div className="h-[44px] border border-[#ddd] overflow-hidden mb-1">
                  <img src={BUDS.alt} alt="" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: '88% 50%' }} loading="lazy" />
                </div>
                <div className="font-bold text-[7px]">Pro Model (NEW)</div>
                <div className="text-[8px] mt-0.5">Price: <b>$29.99</b></div>
                <button className="mt-1 text-[7px] px-2 py-0.5 bg-[#e4e4e4] border border-[#8a8a8a]" style={{ boxShadow: 'inset 1px 1px 0 #fff, inset -1px -1px 0 #aaa' }}>
                  Add to Cart
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p className="text-[7px] text-[#555] mt-1.5">
          <span className="text-[#0000ee] underline">Click here</span> to email us for orders. Delivery takes 2-3 weeks.
        </p>
      </div>

      {/* footer: counter + browser note */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#c9c9c9] px-3 py-1.5 flex items-center justify-between" style={{ fontFamily: 'Arial, sans-serif' }}>
        <span className="flex items-center gap-1.5 text-[7px] text-[#555]">
          Visitors:
          <span className="bg-black text-[#33ff33] font-bold px-1 py-0.5 tracking-[0.2em]" style={{ fontFamily: "'Courier New', monospace" }}>000133</span>
        </span>
        <span className="text-[6.5px] text-[#777] italic">Best viewed in Internet Explorer at 1024 x 768 · Last updated: March 2011</span>
      </div>

    </div>
  );
}

/* =====================================================================
   AFTER — "Aero Buds Pro" · a clean Apple-style product page.
   The open case is a real studio shot; it tilts a few degrees toward
   the cursor and nothing floats on its own.
   ===================================================================== */
function AfterStore() {
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 7}deg) rotateX(${-py * 5}deg) scale(1.03)`;
  };
  const onLeave = () => {
    const el = tiltRef.current;
    if (el) el.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
  };

  return (
    <div className="absolute inset-0 bg-[#0a0a0c] text-white overflow-hidden" style={{ fontFamily: APPLE_FONT }}>
      {/* soft glow behind the product */}
      <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[420px] h-[200px] rounded-full bg-[#ff2d3f]/10 blur-[90px]" />

      {/* nav */}
      <div
        className="absolute top-0 inset-x-0 h-[30px] flex items-center justify-center gap-6 border-b border-white/8 z-20"
        style={{ background: 'rgba(10,10,12,0.72)', backdropFilter: 'saturate(180%) blur(14px)', WebkitBackdropFilter: 'saturate(180%) blur(14px)' }}
      >
        <span className="font-semibold text-[11px] tracking-[-0.02em]">aero</span>
        {['Buds', 'Pro', 'Max', 'Compare', 'Support'].map((l) => (
          <span key={l} className="text-[8.5px] text-white/60">{l}</span>
        ))}
      </div>

      {/* copy */}
      <div className="absolute top-[30px] inset-x-0 pt-4 text-center z-10 px-6">
        <span className="text-[8px] font-semibold text-[#ff9f0a]">New</span>
        <h3 className="text-[34px] font-semibold tracking-[-0.025em] leading-[1.02] mt-0.5">Aero Buds Pro</h3>
        <p className="text-[13px] text-white/85 mt-1">Silence, engineered.</p>
        <p className="text-[9px] text-white/45 mt-1">Adaptive noise cancellation. 30-hour battery. Spatial audio.</p>
        <div className="flex items-center justify-center gap-5 mt-2 text-[11px]">
          <span className="text-[#2997ff]">Learn more ›</span>
          <span className="text-[#2997ff]">Buy ›</span>
        </div>
      </div>

      {/* product photo — open case, studio shot, pointer tilt only */}
      <div
        className="absolute inset-x-0 bottom-0 top-[122px]"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ perspective: '1100px' }}
      >
        <div
          ref={tiltRef}
          className="relative w-full h-full transition-transform duration-300 ease-out will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img
            src={BUDS.case}
            alt="Aero Buds Pro in the open charging case"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-[50%_62%]"
          />
        </div>
      </div>

      {/* price + finishes */}
      <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-5 z-10">
        <span className="text-[9px] text-white/70 font-medium drop-shadow">From $249 · or $20.75/mo</span>
        <span className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-white border border-white/40" />
          <span className="w-3 h-3 rounded-full bg-[#3a3a3c] border border-white/25" />
        </span>
      </div>

    </div>
  );
}

/* ---- helpers ---- */
function Count({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) { setV(to); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1200, 1);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduced]);
  return <span ref={ref} className="tabular-nums">{v.toFixed(decimals)}{suffix}</span>;
}



/* =====================================================================
   The comparison stage
   ===================================================================== */
export default function WhyUs() {
  const ref = useRef(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(0);
  const interacted = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (interacted.current) return;
      const p = Math.min((now - start) / 1400, 1);
      setPos(12 + (1 - Math.pow(1 - p, 3)) * 38);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const onDown = (e: React.PointerEvent) => {
    interacted.current = true;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    setPos(Math.min(98.5, Math.max(1.5, ((e.clientX - r.left) / r.width) * 100)));
  };
  const onUp = () => setDragging(false);

  const scale = width ? width / STAGE_W : 0;

  return (
    <section id="why-us" className="relative py-24 lg:py-32 bg-paper-2 border-y-2 border-ink overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-10"
        >
          <div className="t-label text-verm mb-4">(03) · HARD TRUTHS</div>
          <h2 className="t-display text-4xl md:text-6xl lg:text-7xl text-ink leading-[0.95]">
            Same earbuds.<br />
            Two <span className="text-verm">fates.</span>
          </h2>
          <p className="text-mut mt-4 max-w-lg mx-auto text-sm">
            One struggling gadget shop, rebuilt from the ground up. Drag the handle:
            left is the site that was losing them money, right is the one that prints it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          ref={wrapRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="relative mx-auto border-2 border-ink hard-shadow cursor-ew-resize touch-none select-none overflow-hidden"
          style={{ height: width ? (width * STAGE_H) / STAGE_W : undefined, aspectRatio: width ? undefined : `${STAGE_W} / ${STAGE_H}` }}
        >
          <div className="absolute top-0 left-0 origin-top-left" style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}>
            <AfterStore />
          </div>
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <div className="absolute top-0 left-0 origin-top-left" style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}>
              <BeforeStore />
            </div>
          </div>

          <div className={`absolute top-2.5 left-2.5 z-10 t-label bg-[#1d1d1f]/85 text-white px-2.5 py-1.5 tracking-widest transition-opacity duration-300 pointer-events-none ${pos > 14 ? 'opacity-100' : 'opacity-0'}`}>
            YOUR SITE · BEFORE
          </div>
          <div className={`absolute top-[38px] right-2.5 z-10 t-label bg-white/90 text-[#1d1d1f] px-2.5 py-1.5 tracking-widest transition-opacity duration-300 pointer-events-none ${pos < 86 ? 'opacity-100' : 'opacity-0'}`}>
            YOUR SITE · AFTER
          </div>

          <div
            className="absolute top-0 bottom-0 left-0 w-[3px] bg-ink"
            style={{
              transform: `translateX(${(pos / 100) * width - 1.5}px)`,
              transition: dragging ? 'none' : 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-ink text-paper border-2 border-paper flex items-center justify-center hard-shadow-sm transition-transform duration-150 ${dragging ? 'scale-90' : 'scale-100'}`}>
              <ChevronsLeftRight className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 lg:gap-8 mt-8 max-w-3xl mx-auto">
          {[
            { label: 'First paint', from: '8.4s', to: <Count to={1.1} decimals={1} suffix="s" /> },
            { label: 'Mobile score', from: '38', to: <Count to={98} /> },
            { label: 'Conversion', from: '0.4%', to: <Count to={3.2} decimals={1} suffix="%" /> },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="border-l-2 border-ink pl-3 lg:pl-5"
            >
              <div className="t-label text-mut-2 mb-1.5">{m.label}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-mut line-through decoration-red-400/60 text-sm font-bold">{m.from}</span>
                <span className="t-display text-2xl lg:text-4xl text-emerald-600">{m.to}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-8 text-sm text-mut"
        >
          Same product, same price, same founder.
          <span className="text-ink font-semibold"> The only thing that changed is who built it.</span>
        </motion.p>
      </div>
    </section>
  );
}
