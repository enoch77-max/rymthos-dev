import BrandIcon from './BrandIcon';
import { heroChips } from '../data/tech';
import { SA_PHONE_NUMBER, SA_PHONE_RAW, BD_PHONE_DISPLAY, WA_NUMBER, EMAIL } from '../lib/lead';

type LegalDoc = 'terms' | 'privacy';

export default function Footer({ onOpenLegal }: { onOpenLegal: (d: LegalDoc) => void }) {
  return (
    <footer className="bg-ink text-paper border-t-2 border-ink relative overflow-hidden">
      {/* giant wordmark */}
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 pt-20 pb-8">
        <div className="overflow-hidden select-none">
          <div className="t-display text-[19vw] leading-[0.8] text-paper/[0.09] text-center whitespace-nowrap">
            RYMTHOS
          </div>
        </div>
      </div>

      {/* tech strip */}
      <div className="border-t border-paper/10 py-6">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 flex flex-wrap items-center justify-center gap-3">
          {heroChips.map((n) => (
            <span key={n} title={n} className="bg-paper rounded-md p-1.5 opacity-70 hover:opacity-100 transition-opacity">
              <BrandIcon name={n} size={20} />
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-12 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="t-display text-2xl">RYMTHOS</span>
              <span className="t-mono text-[10px] text-verm">®DEV</span>
            </div>
            <p className="text-sm text-paper/50 max-w-sm leading-relaxed">
              Web, mobile, and commerce. Built to convert, hardened to last.
              Founded and run by Md. Billal Hossain.
            </p>
          </div>
          <div>
            <div className="t-label text-paper/40 mb-4">Sitemap</div>
            <ul className="space-y-2 text-sm text-paper/60">
              {[['Services', '#services'], ['Payments', '#payments'], ['Work', '#projects'], ['Pricing', '#pricing'], ['Contact', '#contact']].map(([l, h]) => (
                <li key={h}><a href={h} className="hover:text-verm transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="t-label text-paper/40 mb-4">Legal</div>
            <ul className="space-y-2 text-sm text-paper/60">
              <li><button onClick={() => onOpenLegal('terms')} className="hover:text-verm transition-colors">Terms &amp; Conditions</button></li>
              <li><button onClick={() => onOpenLegal('privacy')} className="hover:text-verm transition-colors">Privacy Policy</button></li>
            </ul>
            <div className="t-label text-paper/40 mb-4 mt-8">Direct</div>
            <ul className="space-y-2 text-sm text-paper/60">
              <li><a href={`mailto:${EMAIL}`} className="hover:text-verm transition-colors break-all">{EMAIL}</a></li>
              <li><a href={`tel:+${SA_PHONE_RAW}`} className="hover:text-verm transition-colors">Direct Call: {SA_PHONE_NUMBER}</a></li>
              <li><a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-verm transition-colors">WhatsApp: {BD_PHONE_DISPLAY}</a></li>
              <li><a href="https://100toolcrate.com" target="_blank" rel="noopener noreferrer" className="hover:text-verm transition-colors">100toolcrate.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-paper/10">
          <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-6 flex flex-col md:flex-row md:justify-between gap-3">
            <span className="t-mono text-[10px] text-paper/30 tracking-widest">© {new Date().getFullYear()} RYMTHOS DEV · ALL RIGHTS RESERVED</span>
            <span className="t-mono text-[10px] text-paper/30 tracking-widest">DESIGNED & BUILT IN-HOUSE · ZERO TEMPLATES</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
