import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({ to, suffix = '', prefix = '', duration = 1.6, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '60px 0px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}{val}{suffix}
    </span>
  );
}
