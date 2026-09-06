// Authentic payment brand lockups, normalized to one optical height.
// Single-color wordmarks use Simple Icons' real SVG paths masked in brand hex;
// multi-color marks are hand-built to match the originals. Transparent bg.

const MASK_URL = (slug: string) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${slug}.svg`;

function Mark({ slug, color, className }: { slug: string; color: string; className: string }) {
  return (
    <span
      aria-hidden
      className={`block shrink-0 ${className}`}
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${MASK_URL(slug)})`,
        maskImage: `url(${MASK_URL(slug)})`,
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

// every lockup lives in a fixed-height flex so the rail reads as one line
const wrap = 'flex h-9 items-center gap-2 shrink-0';
const brandText = 'font-extrabold leading-none tracking-tight';

export interface PaymentLogo {
  name: string;
  node: React.ReactNode;
}

export const localLogos: PaymentLogo[] = [
  {
    name: 'bKash',
    node: (
      <span className={wrap} title="bKash">
        <span className={`${brandText} text-[1.45rem] text-[#1a1a1a]`}>
          b<span className="text-[#E2136E]">K</span>ash
        </span>
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
          <polygon points="2,3.5 12,4.3 9.6,12.4" fill="#E2136E" />
          <polygon points="1.8,5.2 3.1,5.2 6.1,8.6" fill="#E2136E" />
          <polygon points="12.4,4.3 10.2,12.5 19,13.6" fill="#E2136E" />
          <polygon points="10.3,13 11.4,18 18.4,14.2" fill="#E2136E" />
          <polygon points="9.8,13 7,22.5 11,19" fill="#E2136E" />
          <polygon points="16.6,10.4 20.8,9.5 19.3,13.4" fill="#E2136E" />
          <polygon points="21.2,9.7 23.4,11.4 20.8,11.4" fill="#E2136E" />
        </svg>
      </span>
    ),
  },
  {
    name: 'Nagad',
    node: (
      <span className={wrap} title="Nagad">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <path d="M15.2 7a7.1 7.1 0 1 1-6.4-1.6" fill="none" stroke="#F6921E" strokeWidth="3.2" strokeLinecap="round" />
          <polygon points="8.6,4.6 11.2,3.9 11.6,6.2 9.2,6.5" fill="#F6921E" />
          <polygon points="11.8,3.8 14.4,3.2 14.1,5.5 12.2,5.7" fill="#E31E24" />
          <circle cx="11.7" cy="10.6" r="1.25" fill="#E31E24" />
          <path d="M10.7 12.2l2.2.8 1.9-.4.4 1.1-1.9.7.7 1.9-1.1.4-.8-2-1.7.6-.5-1Z" fill="#E31E24" />
        </svg>
        <span className={`${brandText} text-[1.7rem] text-[#E31E24]`}>নগদ</span>
      </span>
    ),
  },
  {
    name: 'Rocket',
    node: (
      <span className={`${wrap} flex-col !items-start gap-0.5`} title="Rocket">
        <span className="flex items-center gap-1.5">
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#8C3494]">ROCKET</span>
          <svg viewBox="0 0 24 14" className="h-3.5 w-6" aria-hidden>
            <polygon points="2,12 21,1.5 13.5,12.5 11.2,8.8" fill="#8C3494" />
          </svg>
        </span>
        <span className={`${brandText} text-[1.35rem] text-[#8C3494]`}>রকেট</span>
      </span>
    ),
  },
  {
    name: 'SSLCommerz',
    node: (
      <span className={wrap} title="SSLCommerz">
        <span className="bg-[#00A9E0] text-white text-xs font-extrabold px-1.5 py-1 rounded-[3px]">SSL</span>
        <span className={`${brandText} text-[1.35rem] text-[#0077B6]`}>Commerz</span>
      </span>
    ),
  },
  {
    name: 'aamarpay',
    node: (
      <span className={wrap} title="aamarpay">
        <span className={`${brandText} text-[1.45rem] text-[#E31E24]`}>
          aamar<span className="text-[#1a1a1a]">pay</span>
        </span>
      </span>
    ),
  },
  {
    name: 'Cash on Delivery',
    node: (
      <span className={wrap} title="Cash on Delivery">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <circle cx="12" cy="12" r="11" fill="#C2185B" />
          <rect x="5.5" y="8.5" width="13" height="7.5" rx="1.2" fill="#fff" />
          <circle cx="12" cy="12.2" r="2.1" fill="#C2185B" />
          <rect x="7" y="10" width="1.4" height="4.5" fill="#C2185B" opacity=".5" />
          <rect x="15.6" y="10" width="1.4" height="4.5" fill="#C2185B" opacity=".5" />
        </svg>
        <span className={`${brandText} text-[1.05rem] leading-[1.1] text-[#7C2D8E]`}>
          Cash on<br />Delivery
        </span>
      </span>
    ),
  },
  {
    name: 'Bank Transfer',
    node: (
      <span className={wrap} title="Bank Transfer">
        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
          <path d="M12 2.5 2.5 8h19Z" fill="#101013" />
          <rect x="4.3" y="9.8" width="2.7" height="7.4" fill="#101013" />
          <rect x="10.65" y="9.8" width="2.7" height="7.4" fill="#101013" />
          <rect x="17" y="9.8" width="2.7" height="7.4" fill="#101013" />
          <rect x="2.8" y="18.6" width="18.4" height="2.6" fill="#101013" />
        </svg>
        <span className={`${brandText} text-[1.05rem] leading-[1.1] text-ink`}>
          Bank<br />Transfer
        </span>
      </span>
    ),
  },
];

export const globalLogos: PaymentLogo[] = [
  { name: 'Visa', node: <span className={wrap}><Mark slug="visa" color="#1A1F71" className="h-7 w-[4.8rem]" /></span> },
  {
    name: 'Mastercard',
    node: (
      <span className={wrap} title="Mastercard">
        <svg viewBox="0 0 64 40" className="h-8 w-auto" aria-hidden>
          <circle cx="24" cy="20" r="15" fill="#EB001B" />
          <circle cx="40" cy="20" r="15" fill="#F79E1B" />
          <path d="M32 7.31 A15 15 0 0 1 32 32.69 A15 15 0 0 1 32 7.31 Z" fill="#FF5F00" />
        </svg>
        <span className="font-semibold text-[1.15rem] lowercase tracking-tight text-[#4a4a4a]">mastercard</span>
      </span>
    ),
  },
  { name: 'American Express', node: <span className={wrap}><Mark slug="americanexpress" color="#006FCF" className="h-8 w-8" /></span> },
  { name: 'Stripe', node: <span className={wrap}><Mark slug="stripe" color="#635BFF" className="h-6 w-[4.4rem]" /></span> },
  {
    name: 'PayPal',
    node: (
      <span className={wrap} title="PayPal">
        <Mark slug="paypal" color="#003087" className="h-7 w-6" />
        <span className={`${brandText} italic text-[1.35rem] text-[#003087]`}>
          Pay<span className="text-[#009CDE]">Pal</span>
        </span>
      </span>
    ),
  },
  {
    name: 'Wise',
    node: (
      <span className={wrap} title="Wise">
        <Mark slug="wise" color="#9FE870" className="h-7 w-7" />
        <span className="font-bold text-[1.3rem] text-ink tracking-tight">Wise</span>
      </span>
    ),
  },
  {
    name: 'Razorpay',
    node: (
      <span className={wrap} title="Razorpay">
        <Mark slug="razorpay" color="#3395FF" className="h-7 w-7" />
        <span className="font-bold text-[1.3rem] text-[#0C2451] tracking-tight">Razorpay</span>
      </span>
    ),
  },
  {
    name: 'Flutterwave',
    node: (
      <span className={wrap} title="Flutterwave">
        <Mark slug="flutterwave" color="#F5A623" className="h-7 w-9" />
        <span className="font-bold text-[1.3rem] text-ink tracking-tight">Flutterwave</span>
      </span>
    ),
  },
  {
    name: 'Square',
    node: (
      <span className={wrap} title="Square">
        <Mark slug="square" color="#101013" className="h-6 w-6" />
        <span className="font-bold text-[1.3rem] text-ink tracking-tight">Square</span>
      </span>
    ),
  },
  {
    name: 'Adyen',
    node: (
      <span className={wrap} title="Adyen">
        <Mark slug="adyen" color="#0ABF53" className="h-7 w-7" />
        <span className="font-bold text-[1.3rem] text-ink tracking-tight">Adyen</span>
      </span>
    ),
  },
];

export const allPaymentLogos = [...localLogos, ...globalLogos];
