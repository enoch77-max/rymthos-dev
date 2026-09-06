import { ArrowLeft, ShieldCheck, FileText } from 'lucide-react';

type Doc = 'terms' | 'privacy';

interface Section {
  t: string;
  p?: string[];
  bullets?: string[];
}

const TERMS: Section[] = [
  {
    t: '1. The agreement',
    p: [
      'These terms apply to every project, add-on, and care plan from Rymthos Dev (\u201cwe\u201d, \u201cus\u201d). By approving a quote, paying a deposit, or signing a project brief, you (\u201cthe client\u201d) accept them.',
      'Anything we agree beyond this document is only binding when confirmed in writing (email or WhatsApp counts).',
    ],
  },
  {
    t: '2. Scope, quotes & changes',
    bullets: [
      'Every build has a written scope and a fixed price. That price does not change once work begins.',
      'Requests outside the agreed scope are quoted as a separate fixed number and only start after you approve them in writing.',
      '\u201cUnlimited revisions\u201d means unlimited within the agreed scope \u2014 not unlimited new features.',
      'If you pause a project for more than 30 days, we\u2019ll confirm the scope and timeline before resuming.',
    ],
  },
  {
    t: '3. Payments',
    bullets: [
      'Standard terms: 50% to begin, 50% at launch. Larger projects may use milestones instead.',
      'Deposits are non-refundable once work has started, because that time is reserved for you.',
      'Care plans are billed monthly (or yearly) in advance. Unpaid invoices suspend service after 7 days\u2019 notice; we never delete your data for non-payment.',
      'Add-on features and On-Demand work are invoiced per their quoted price \u2014 no hidden line items.',
    ],
  },
  {
    t: '4. What\u2019s included in care plans',
    p: ['Care plans keep your existing product healthy. They are not a bucket of free development.'],
    bullets: [
      'Essential & Growth cover monitoring, backups, security patches, domain/hosting management, and bug fixes for what we built.',
      'Growth adds up to 2 hours/month of small changes (text, images, settings). Unused hours don\u2019t roll over.',
      'New features, redesigns, big version upgrades, and product management are On-Demand work \u2014 scoped and priced before any work begins.',
      'Fixing damage caused by third parties (another developer\u2019s edits, a hacked password you shared) is On-Demand work.',
    ],
  },
  {
    t: '5. Your responsibilities',
    bullets: [
      'Provide access, content, and decisions in reasonable time \u2014 delays on your side move the timeline.',
      'Keep your own passwords and admin access private. We\u2019re not liable for breaches caused by shared credentials.',
      'You\u2019re responsible for the legality and accuracy of your content (products, claims, images, prices).',
      'Don\u2019t use our services for anything illegal, harmful, or that infringes others\u2019 rights.',
    ],
  },
  {
    t: '6. Third-party services',
    p: [
      'Hosting, domains, payment gateways, app stores, and AI providers are separate companies. Their fees are yours, at cost \u2014 we never mark them up \u2014 and their own terms govern your use of them.',
      'We\u2019re not responsible for outages, fee changes, or account actions taken by those providers, but we\u2019ll always help you respond.',
    ],
  },
  {
    t: '7. AI features',
    bullets: [
      'AI assistants and generators are trained on content you provide and answer in your brand\u2019s voice.',
      'AI output can be wrong. You review what your site publishes; for regulated industries (medical, legal, financial) you remain responsible for compliance.',
      'AI add-ons include reasonable usage limits. Sustained usage beyond them is upgraded or billed at provider rates \u2014 we\u2019ll tell you before that happens.',
    ],
  },
  {
    t: '8. Ownership & intellectual property',
    bullets: [
      'On full payment, you own your website, app, design, and content \u2014 100%, with source code.',
      'We retain ownership of our reusable tools and libraries, licensed to you as part of the product.',
      'We may show the work in our portfolio unless you ask us not to, or an NDA says otherwise.',
    ],
  },
  {
    t: '9. Warranty & liability',
    bullets: [
      'For 30 days after launch we fix any defect in what we built, free.',
      'We build to a professional standard, but no one can guarantee specific rankings, traffic, or sales \u2014 anyone promising that is guessing.',
      'Our total liability is limited to the fees you paid us for the work in question. We\u2019re not liable for indirect losses like missed sales during a provider outage.',
    ],
  },
  {
    t: '10. Confidentiality',
    p: [
      'Your business information stays confidential. We\u2019ll sign your NDA, or ours applies by default: neither side discloses the other\u2019s private information.',
    ],
  },
  {
    t: '11. Ending the relationship',
    bullets: [
      'Care plans cancel with 30 days\u2019 notice. We\u2019ll hand over access, credentials, and documentation cleanly.',
      'If we part ways mid-build, you keep everything completed and paid for.',
    ],
  },
  {
    t: '12. Disputes & updates',
    p: [
      'If something goes wrong, talk to us first \u2014 we fix problems, and written terms exist for the rare case we can\u2019t. These terms may be updated; the version you accepted at signing governs your project.',
    ],
  },
];

const PRIVACY: Section[] = [
  {
    t: '1. What we collect',
    bullets: [
      'What you send us: name, email, phone, and project details from the contact form or messages.',
      'What a project needs: content, branding, and (for stores) the order data your own customers create.',
      'Billing details needed to invoice you. We never see or store your full card numbers \u2014 payment providers handle those.',
    ],
  },
  {
    t: '2. What we never do',
    bullets: [
      'Sell, rent, or trade your data. Ever.',
      'Use your private business information for anything except your project.',
      'Keep your data longer than we need to.',
    ],
  },
  {
    t: '3. How we use it',
    p: [
      'To reply to you, deliver your project, run your care plan, and issue invoices. That\u2019s the whole list.',
    ],
  },
  {
    t: '4. Who else sees it',
    p: [
      'Only the providers your project requires \u2014 hosting, domain registrar, payment gateway, or app store \u2014 each under their own privacy policy. We choose reputable providers and tell you which ones we\u2019re using.',
    ],
  },
  {
    t: '5. Security',
    bullets: [
      'Encrypted connections (SSL) on everything we build and on our own communications.',
      'Access to your project is limited to the people working on it.',
      'Backups are stored offsite and encrypted where the provider supports it.',
    ],
  },
  {
    t: '6. Your rights',
    p: [
      'Ask us anytime what data we hold about you, correct it, or have it deleted (we keep invoices for the period tax law requires). Email rymthos.dev@gmail.com and we\u2019ll handle it within 30 days.',
    ],
  },
  {
    t: '7. Cookies & analytics',
    p: [
      'Your site may use basic, privacy-respecting analytics so you can see how it performs. If you want cookie consent banners or zero tracking, that\u2019s your call \u2014 we\u2019ll set it up either way.',
    ],
  },
  {
    t: '8. Changes & contact',
    p: [
      'If this policy changes materially, we\u2019ll tell you. Questions: rymthos.dev@gmail.com or WhatsApp +880 1400 788 738.',
    ],
  },
];

export default function Legal({ doc, onClose }: { doc: Doc; onClose: () => void }) {
  const sections = doc === 'terms' ? TERMS : PRIVACY;
  const title = doc === 'terms' ? 'Terms & Conditions' : 'Privacy Policy';
  const Icon = doc === 'terms' ? FileText : ShieldCheck;

  return (
    <div className="fixed inset-0 z-[85] bg-paper text-ink overflow-y-auto">
      <div className="sticky top-0 z-10 bg-paper/90 backdrop-blur-md border-b-2 border-ink">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={onClose} className="group flex items-center gap-2 text-sm font-semibold hover:text-verm transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-ink text-lime flex items-center justify-center"><Icon className="w-3.5 h-3.5" /></span>
            <span className="t-display text-base lg:text-lg">{title}</span>
          </div>
          <span className="t-label text-mut hidden sm:block">Updated Jan 2026</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-12">
        <div className="mb-10">
          <div className="t-label text-verm mb-3">{doc === 'terms' ? 'The agreement between us' : 'Your data, your rules'}</div>
          <h1 className="t-display text-4xl lg:text-6xl mb-4">{title}</h1>
          <p className="text-mut text-sm leading-relaxed max-w-xl">
            {doc === 'terms'
              ? 'Written in plain language on purpose. If any clause is unclear, ask us before signing \u2014 we\u2019d rather explain now than argue later.'
              : 'The short version: we collect only what your project needs, we never sell it, and you can ask us to delete it anytime.'}
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.t} className="border-l-2 border-line-2 pl-6 hover:border-verm transition-colors">
              <h2 className="font-semibold text-lg mb-2">{s.t}</h2>
              {s.p?.map((para, i) => (
                <p key={i} className="text-sm text-mut leading-relaxed mb-2">{para}</p>
              ))}
              {s.bullets && (
                <ul className="space-y-2">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-mut leading-relaxed">
                      <span className="text-verm mt-0.5 shrink-0">·</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 bg-ink text-paper p-6">
          <p className="text-sm text-paper/70 leading-relaxed">
            Questions about anything here? Message us before you commit. A two-minute answer now saves everyone a headache later.
          </p>
          <a href="mailto:rymthos.dev@gmail.com" className="inline-block mt-3 text-sm font-semibold text-lime hover:text-verm transition-colors">
            rymthos.dev@gmail.com →
          </a>
        </div>
      </div>
    </div>
  );
}
