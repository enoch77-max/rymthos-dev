// Official brand logos rendered from Simple Icons' real SVG paths (via CDN mask),
// tinted in each brand's official color. Brands without an official icon set entry
// (Bangladesh payment gateways, etc.) fall back to hand-built marks below.

const SIMPLE: Record<string, { slug: string; color: string }> = {
  React: { slug: 'react', color: '#61DAFB' },
  Vue: { slug: 'vuedotjs', color: '#4FC08D' },
  Svelte: { slug: 'svelte', color: '#FF3E00' },
  JavaScript: { slug: 'javascript', color: '#F7DF1E' },
  'Next.js': { slug: 'nextdotjs', color: '#000000' },
  Tailwind: { slug: 'tailwindcss', color: '#06B6D4' },
  'HTML/CSS': { slug: 'html5', color: '#E34F26' },
  'Node.js': { slug: 'nodedotjs', color: '#5FA04E' },
  Express: { slug: 'express', color: '#000000' },
  GraphQL: { slug: 'graphql', color: '#E10098' },
  'React Native': { slug: 'react', color: '#61DAFB' },
  Kotlin: { slug: 'kotlin', color: '#7F52FF' },
  Swift: { slug: 'swift', color: '#F05138' },
  PostgreSQL: { slug: 'postgresql', color: '#4169E1' },
  MongoDB: { slug: 'mongodb', color: '#47A248' },
  MySQL: { slug: 'mysql', color: '#4479A1' },
  Redis: { slug: 'redis', color: '#FF4438' },
  Vercel: { slug: 'vercel', color: '#000000' },
  Docker: { slug: 'docker', color: '#2496ED' },
  Git: { slug: 'git', color: '#F05032' },
  Framer: { slug: 'framer', color: '#0055FF' },
  Stripe: { slug: 'stripe', color: '#635BFF' },
  PayPal: { slug: 'paypal', color: '#003087' },
  Visa: { slug: 'visa', color: '#1A1F71' },
  Mastercard: { slug: 'mastercard', color: '#EB001B' },
  Shopify: { slug: 'shopify', color: '#7AB55C' },
  WordPress: { slug: 'wordpress', color: '#21759B' },
  Adyen: { slug: 'adyen', color: '#0ABF53' },
  Square: { slug: 'square', color: '#3E4348' },
  Razorpay: { slug: 'razorpay', color: '#0C2451' },
  Wise: { slug: 'wise', color: '#9FE870' },
  OpenAI: { slug: 'openai', color: '#412991' },
  Claude: { slug: 'anthropic', color: '#D97757' },
  Gemini: { slug: 'googlegemini', color: '#4E82E6' },
  LangChain: { slug: 'langchain', color: '#1C3C3C' },
  'Hugging Face': { slug: 'huggingface', color: '#FFD21E' },
  ElevenLabs: { slug: 'elevenlabs', color: '#000000' },
};

// Hand-built marks: multi-color official logos (masks would flatten them) and
// local brands with no icon-set entry.
const CUSTOM: Record<string, { color: string; svg: React.ReactNode }> = {
  TypeScript: {
    color: '#3178C6',
    svg: (
      <>
        <rect x="1.5" y="1.5" width="21" height="21" rx="3" fill="#3178C6" />
        <path d="M7 13.2h2.3v5.3h1.5v-5.3h2.3v-1.3H7Z" fill="#fff" />
        <path d="M16.9 19.7c-.9 0-1.7-.3-2.3-.7l.5-1.2c.5.4 1.1.6 1.8.6.8 0 1.2-.3 1.2-.8 0-.3-.1-.5-.4-.6-.2-.1-.6-.2-1.1-.4-.6-.1-1.1-.3-1.5-.6-.4-.3-.6-.7-.6-1.3 0-.7.3-1.2.8-1.6.5-.4 1.2-.6 2-.6.8 0 1.5.2 2.1.5l-.5 1.2c-.5-.3-1-.4-1.6-.4-.4 0-.7.1-.9.2-.2.2-.3.4-.3.6 0 .2.1.4.3.5.2.1.6.3 1.1.4.6.1 1.1.3 1.5.6.4.3.6.7.6 1.3 0 .7-.3 1.3-.8 1.7-.4.4-1.1.6-1.9.6Z" fill="#fff" />
      </>
    ),
  },
  Python: {
    color: '#3776AB',
    svg: (
      <>
        <path d="M11.9 2c-2.6 0-4.2 1.1-4.2 3.2v2.1h4.6v.7H5.6C3.4 8 2 9.8 2 12.1c0 2.4 1.4 4.1 3.6 4.1h1.7v-2.4c0-2.1 1.8-3.9 4-3.9h4.5c1.9 0 3.4-1.5 3.4-3.4V5.2C19.2 3.1 17 2 14.4 2Zm-2.5 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" fill="#3776AB" />
        <path d="M12.1 22c2.6 0 4.2-1.1 4.2-3.2v-2.1h-4.6v-.7h6.7c2.2 0 3.6-1.8 3.6-4.1 0-2.4-1.4-4.1-3.6-4.1h-1.7v2.4c0 2.1-1.8 3.9-4 3.9H8.2c-1.9 0-3.4 1.5-3.4 3.4v1.3C4.8 20.9 7 22 9.6 22Zm2.5-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" fill="#FFD43B" />
      </>
    ),
  },
  Flutter: {
    color: '#02569B',
    svg: (
      <>
        <path d="M14.5 2 4.7 11.8l3 3L20.5 2Z" fill="#54C5F8" />
        <path d="M14.7 11.3 9.1 16.9l3 3.1 2.6-2.6 5.8-5.8Z" fill="#02569B" />
        <path d="m9.1 16.9 3 3.1 2.6-2.6" fill="none" stroke="#01579B" strokeWidth="0.7" />
      </>
    ),
  },
  Firebase: {
    color: '#DD2C00',
    svg: (
      <>
        {/* left amber petal */}
        <circle cx="7.9" cy="14.1" r="4.4" fill="#FFC24A" />
        {/* middle orange petal */}
        <circle cx="10.2" cy="12.7" r="4.7" fill="#FFA000" />
        {/* main red droplet with flame tip */}
        <path
          d="M12.9 3c.9 2.9 4.9 5.3 4.9 9.9a5 5 0 1 1-10 0c0-2.3 1.2-4.2 2.5-5.7C11.4 5.9 12.4 4.6 12.9 3Z"
          fill="#DD2C00"
        />
      </>
    ),
  },
  AWS: {
    color: '#FF9900',
    svg: (
      <>
        <text x="12" y="11.6" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8.2" fill="#232F3E">aws</text>
        <path d="M4.5 15c4.8 3 10.2 3 15 0" fill="none" stroke="#FF9900" strokeWidth="1.6" strokeLinecap="round" />
        <path d="m18.5 14 1.6.8-.9 1.5" fill="none" stroke="#FF9900" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  Figma: {
    color: '#F24E1E',
    svg: (
      <>
        <path d="M12 2.5H8.8a3.2 3.2 0 1 0 0 6.4H12Z" fill="#F24E1E" />
        <path d="M12 2.5h3.2a3.2 3.2 0 1 1 0 6.4H12Z" fill="#FF7262" />
        <path d="M12 9H8.8a3.2 3.2 0 1 0 0 6.4H12Z" fill="#A259FF" />
        <circle cx="15.2" cy="12.2" r="3.2" fill="#1ABCFE" />
        <path d="M12 15.4H8.8a3.2 3.2 0 1 0 3.2 3.2Z" fill="#0ACF83" />
      </>
    ),
  },
  bKash: {
    color: '#E2136E',
    svg: (
      <>
        <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#E2136E" />
        {/* origami bird — upper wing */}
        <polygon points="3.4,3.5 11.4,4.2 9.4,11.3" fill="#fff" />
        {/* top-left sliver */}
        <polygon points="3.1,4.9 4.2,4.9 6.6,8" fill="#fff" />
        {/* body */}
        <polygon points="11.7,4.2 9.8,11.4 17.4,12.4" fill="#fff" />
        {/* lower facet */}
        <polygon points="9.9,11.8 10.8,16.2 17,12.9" fill="#fff" />
        {/* tail */}
        <polygon points="9.4,11.8 7,20.5 10.5,17.5" fill="#fff" />
        {/* head */}
        <polygon points="15.6,9.3 19.2,8.5 17.9,12.2" fill="#fff" />
        {/* beak */}
        <polygon points="19.6,8.7 21.4,10.2 19.2,10.2" fill="#fff" />
      </>
    ),
  },
  Nagad: {
    color: '#F6921E',
    svg: (
      <>
        {/* bold orange swirl, open at the top */}
        <path
          d="M15 7.2 A7 7 0 1 1 9 7.2"
          fill="none" stroke="#F6921E" strokeWidth="3.4" strokeLinecap="round"
        />
        {/* flag notches sitting in the opening */}
        <polygon points="9.2,5.7 11.5,5.1 11.9,7.1 9.7,7.4" fill="#F6921E" />
        <polygon points="12,5.5 14.5,4.9 14.2,7.1 12.4,7.3" fill="#E31E24" />
        {/* runner */}
        <circle cx="11.8" cy="10.7" r="1.2" fill="#E31E24" />
        <path
          d="M10.9 12.1l2.1.8 1.8-.4.4 1-1.8.7.6 1.8-1 .4-.8-1.9-1.6.6-.5-1Z"
          fill="#E31E24"
        />
      </>
    ),
  },
  Rocket: {
    color: '#8C2F88',
    svg: (
      <>
        <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#8C2F88" />
        <path d="M12 5c2 2.2 3 4.4 3 6.6 0 1.8-1.3 3.2-3 3.2s-3-1.4-3-3.2C9 9.4 10 7.2 12 5Z" fill="#fff" />
        <path d="M10.5 15.5 9 18m4.5-2.5L15 18" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  SSLCommerz: {
    color: '#00A9E0',
    svg: (
      <>
        <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#00A9E0" />
        <path d="M12 5.5 15 7v3c0 2.2-1.3 3.8-3 4.5-1.7-.7-3-2.3-3-4.5V7Z" fill="#fff" />
        <text x="12" y="18.6" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="4.6" fill="#fff">COMMERZ</text>
      </>
    ),
  },
  Aamarpay: {
    color: '#E31E24',
    svg: (
      <>
        <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#E31E24" />
        <text x="12" y="13.4" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontWeight="700" fontSize="6.6" fill="#fff">aamar</text>
        <text x="12" y="18.4" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontWeight="500" fontSize="4.6" fill="#fff" letterSpacing="1">PAY</text>
      </>
    ),
  },
  Flutterwave: {
    color: '#F5A623',
    svg: (
      <>
        <path
          d="M3 8.6c3-2.9 6.6-2.9 9 0 2.4 2.9 6 2.9 9 0"
          fill="none" stroke="#F5A623" strokeWidth="2.6" strokeLinecap="round"
        />
        <path
          d="M3 15.4c3-2.9 6.6-2.9 9 0 2.4 2.9 6 2.9 9 0"
          fill="none" stroke="#F5A623" strokeWidth="2.6" strokeLinecap="round"
        />
      </>
    ),
  },
  Braintree: {
    color: '#009FDF',
    svg: (
      <>
        <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#009FDF" />
        <text x="12" y="15.6" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8" fill="#fff">Bt</text>
      </>
    ),
  },
  'REST APIs': {
    color: '#00D4FF',
    svg: (
      <>
        <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#0A2A33" />
        <path d="M9 8 6 12l3 4M15 8l3 4-3 4" stroke="#00D4FF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
};

export interface BrandIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

export default function BrandIcon({ name, size = 40, className = '', color }: BrandIconProps) {
  const simple = SIMPLE[name];
  if (simple) {
    const url = `https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${simple.slug}.svg`;
    return (
      <span
        role="img"
        aria-label={name}
        title={name}
        className={className}
        style={{
          display: 'inline-block',
          width: size,
          height: size,
          flexShrink: 0,
          backgroundColor: color ?? simple.color,
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />
    );
  }

  const custom = CUSTOM[name];
  if (custom) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} role="img" aria-label={name}>
        <title>{name}</title>
        {custom.svg}
      </svg>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-lg font-mono font-bold ${className}`}
      style={{ width: size, height: size, backgroundColor: '#eee', color: '#666', fontSize: size * 0.3 }}
      title={name}
    >
      {name.slice(0, 2)}
    </div>
  );
}

export function brandColor(name: string): string {
  return SIMPLE[name]?.color || CUSTOM[name]?.color || '#888';
}
