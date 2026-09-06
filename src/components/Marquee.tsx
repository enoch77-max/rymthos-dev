import { Fragment } from 'react';
import { Sparkle } from 'lucide-react';
import BrandIcon from './BrandIcon';

// Core product-building stack only — no AI tooling here.
const items = [
  'React', 'Next.js', 'TypeScript', 'Flutter', 'Node.js', 'PostgreSQL',
  'Tailwind', 'Firebase', 'Stripe', 'Docker', 'AWS', 'GraphQL', 'Figma', 'Python',
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex items-center shrink-0" aria-hidden={hidden || undefined}>
      {items.map((name) => (
        <Fragment key={name}>
          <div className="flex items-center gap-3.5 opacity-60 transition-opacity hover:opacity-100">
            <BrandIcon name={name} size={26} color={name === 'Next.js' ? '#f4f4f0' : undefined} />
            <span className="t-display text-xl lg:text-2xl tracking-tight text-paper whitespace-nowrap">
              {name}
            </span>
          </div>
          <Sparkle
            className="w-3.5 h-3.5 text-verm/70 shrink-0 mx-9"
            fill="currentColor"
            strokeWidth={0}
            aria-hidden
          />
        </Fragment>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative bg-ink text-paper border-y-2 border-ink overflow-hidden py-6">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
