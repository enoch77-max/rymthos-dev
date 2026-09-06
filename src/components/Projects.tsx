import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Code2, Clock, Globe, ChevronDown, Target, Wrench, TrendingUp, Search, Sun, Menu, Minimize2, Braces } from 'lucide-react';
import BrandIcon from './BrandIcon';

/* Faithful replica of 100toolcrate.com (the live site blocks iframe embedding) */
function ToolCratePreview() {
  const pills = [
    { n: 'All Tools', c: 'bg-cyan-400 text-[#062a33] shadow-[0_0_12px_rgba(34,211,238,0.55)]' },
    { n: 'Image Tools', c: 'border border-purple-400/40 text-purple-300' },
    { n: 'Dev Tools', c: 'border border-teal-400/40 text-teal-300' },
    { n: 'PDF Utilities', c: 'border border-rose-400/40 text-rose-300' },
    { n: 'Text Tools', c: 'border border-yellow-400/40 text-yellow-300' },
    { n: 'SEO Tools', c: 'border border-green-400/40 text-green-300' },
    { n: 'QR Tools', c: 'border border-indigo-400/40 text-indigo-300' },
    { n: 'Calculators', c: 'border border-amber-400/40 text-amber-300' },
  ];
  return (
    <div className="absolute inset-0 bg-[#0b0e15] text-white overflow-hidden" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      {/* header */}
      <div className="flex items-center justify-between px-4 h-8 border-b border-white/6">
        <span className="font-bold text-[11px] tracking-tight">100ToolCrate</span>
        <div className="hidden sm:flex items-center gap-3 text-[7px] text-white/50">
          <span className="text-white font-semibold">Home</span>
          <span className="flex items-center gap-0.5 text-white/80">Categories <ChevronDown className="w-2 h-2" /></span>
          <span>Blog</span><span>About</span><span>Contact</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-md border border-white/15 flex items-center justify-center"><Sun className="w-2.5 h-2.5 text-white/70" /></span>
          <span className="w-5 h-5 rounded-md border border-white/15 flex items-center justify-center"><Menu className="w-2.5 h-2.5 text-white/70" /></span>
        </div>
      </div>

      {/* hero */}
      <div className="text-center px-6 pt-4">
        <h4 className="font-extrabold text-[21px] leading-[1.08] tracking-tight bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
          The Utility Crate for Modern Creators
        </h4>
        <p className="text-[7px] text-white/45 mt-1.5 max-w-[340px] mx-auto leading-snug">
          100+ free online tools for developers, designers, and students. No bloat, no ads, just precision engineering.
        </p>

        {/* search */}
        <div className="mt-3 mx-auto max-w-[360px] flex items-center bg-[#141926] border border-white/10 rounded-full pl-4 pr-1 h-8">
          <span className="text-[7px] text-white/35 flex-1 text-left">Search for a tool... (e.g., 'JSON Format', 'Compress JPG')</span>
          <span className="w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.6)] pulse-dot">
            <Search className="w-3 h-3 text-[#062a33]" strokeWidth={3} />
          </span>
        </div>

        {/* category pills */}
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {pills.map((p) => (
            <span key={p.n} className={`text-[6.5px] font-bold px-2 py-1 rounded-full ${p.c}`}>{p.n}</span>
          ))}
        </div>
      </div>

      {/* modules */}
      <div className="px-4 mt-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-bold text-[10px]">Most Used Modules</span>
          <span className="text-[7px] text-white/40">View All →</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#11151f] border border-white/8 rounded-lg p-2.5">
            <div className="flex items-start justify-between mb-1.5">
              <span className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center"><Minimize2 className="w-3 h-3 text-purple-400" /></span>
              <span className="text-[5.5px] font-bold text-purple-300 bg-purple-500/15 px-1.5 py-0.5 rounded-full tracking-wider">IMAGE</span>
            </div>
            <div className="text-[8.5px] font-bold">Image Compressor</div>
            <div className="text-[6px] text-white/40 leading-snug mt-0.5">Lossless & lossy compression for PNG, JPEG, and WebP.</div>
          </div>
          <div className="bg-[#11151f] border border-white/8 rounded-lg p-2.5">
            <div className="flex items-start justify-between mb-1.5">
              <span className="w-6 h-6 rounded-md bg-teal-500/20 flex items-center justify-center"><Braces className="w-3 h-3 text-teal-400" /></span>
              <span className="text-[5.5px] font-bold text-teal-300 bg-teal-500/15 px-1.5 py-0.5 rounded-full tracking-wider">DEVELOPER</span>
            </div>
            <div className="text-[8.5px] font-bold">JSON Formatter</div>
            <div className="text-[6px] text-white/40 leading-snug mt-0.5">Validate, format, and beautify your JSON data instantly.</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1.5 right-2 t-label bg-white text-black px-1.5 py-0.5 tracking-widest">LIVE</div>
    </div>
  );
}

const projects = [
  {
    num: '01', title: '100ToolCrate', year: '2024', type: 'Tooling Platform',
    status: 'Live' as const, span: 'lg:col-span-7',
    desc: '100+ browser tools like converters, generators, and calculators, all built for speed, search, and zero friction. A living product, not a portfolio piece.',
    stack: ['React', 'TypeScript', 'Tailwind'],
    url: 'https://100toolcrate.com', repo: false, accent: 'bg-verm', live: true, mobile: false,
    cs: {
      problem: 'Tool sites are usually slow, ad-riddled, and impossible to search.',
      solution: 'One fast codebase, 100+ utilities, instant client-side search, zero clutter.',
      result: 'Sub-second loads, strong organic search footprint, tools people bookmark.',
    },
  },
  {
    num: '02', title: 'Salah Companion', year: '2024', type: 'Mobile App',
    status: 'Open Source' as const, span: 'lg:col-span-5',
    desc: 'Prayer times, Qibla, Quran reader, and dhikr counter in one clean Flutter app. No backend, no database, no accounts. It collects nothing, shows no ads, makes no money. Your worship stays on your phone.',
    stack: ['Flutter'],
    url: 'https://github.com/enoch77-max/Salah_Companion', repo: true, accent: 'bg-cobalt', mobile: true, live: false,
    cs: {
      problem: 'Most prayer apps phone home: trackers, accounts, ads, paywalls around worship.',
      solution: 'A fully open-source Flutter app with zero backend and zero data collection. Every line is public and auditable.',
      result: 'Private by architecture, free forever, cross-platform from one codebase.',
    },
  },
  {
    num: '03', title: 'Commerce Engine', year: '2026', type: 'E-Commerce',
    status: 'Building' as const, span: 'lg:col-span-5',
    desc: 'Headless storefront with Stripe checkout, inventory, orders, and an admin tuned for conversion.',
    stack: ['Next.js', 'Stripe', 'PostgreSQL'],
    url: null, repo: false, accent: 'bg-lime', live: false, mobile: false,
    cs: {
      problem: 'Off-the-shelf stores feel generic and leak revenue at checkout.',
      solution: 'Headless build: custom storefront, 3-step checkout, real inventory.',
      result: 'Faster pages, fewer abandoned carts, full ownership of the stack.',
    },
  },
  {
    num: '04', title: 'Pulse Analytics', year: '2026', type: 'Web Application',
    status: 'Building' as const, span: 'lg:col-span-7',
    desc: 'Realtime BI dashboard with custom visualizations, role-based access, and automated reporting. Enterprise plumbing, startup speed.',
    stack: ['React', 'GraphQL', 'Node.js', 'AWS'],
    url: null, repo: false, accent: 'bg-ink', live: false, mobile: false,
    cs: {
      problem: 'Business data scattered across five tools, none of it realtime.',
      solution: 'One dashboard, live data, role-based views, scheduled reports.',
      result: 'Decisions from live numbers instead of last month\u2019s export.',
    },
  },
];

const statusStyle: Record<string, string> = {
  Live: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/40',
  'Open Source': 'bg-cobalt/10 text-cobalt border-cobalt/40',
  Building: 'bg-amber-500/10 text-amber-600 border-amber-500/40',
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-28 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
        >
          <div>
            <div className="t-label text-verm mb-5">(05) · SELECTED WORK</div>
            <h2 className="t-display text-6xl lg:text-8xl text-ink">
              Proof,<br />not promises.
            </h2>
          </div>
          <p className="text-mut max-w-sm leading-relaxed">
            Live products and active builds, each one custom-architected,
            security-audited, and measured against how real people actually use it.
            Tap any card for the story behind it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {projects.map((p, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative col-span-1 lg:col-span-6 ${p.span} bg-card border-2 border-ink p-7 lg:p-9 flex flex-col justify-between hover-raise cursor-pointer`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <div className="flex items-start justify-between mb-8">
                  <span className={`w-12 h-12 ${p.accent} ${p.accent === 'bg-ink' ? 'text-paper' : p.accent === 'bg-lime' ? 'text-ink' : 'text-paper'} t-display text-lg flex items-center justify-center`}>
                    {p.num}
                  </span>
                  <span className={`flex items-center gap-1.5 t-label border px-2.5 py-1 ${statusStyle[p.status]}`}>
                    {p.status === 'Live' && <Globe className="w-3 h-3" />}
                    {p.status === 'Building' && <Clock className="w-3 h-3" />}
                    {p.status === 'Open Source' && <Code2 className="w-3 h-3" />}
                    {p.status}
                  </span>
                </div>

                {/* abstract product window */}
                <div className="mb-7 border-2 border-ink bg-card overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b-2 border-ink bg-paper-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-verm" />
                    <span className="w-2.5 h-2.5 rounded-full bg-lime" />
                    <span className="w-2.5 h-2.5 rounded-full bg-ink/15" />
                    <span className="ml-2 t-mono text-[10px] text-mut truncate">
                      {p.repo
                        ? 'open source · flutter'
                        : p.url
                          ? p.url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
                          : 'in development'}
                    </span>
                  </div>
                  {p.live ? (
                    /* faithful replica — the live site blocks iframe embedding */
                    <div className="relative h-[248px] overflow-hidden">
                      <ToolCratePreview />
                    </div>
                  ) : p.mobile ? (
                    /* phone placeholder, live preview coming later */
                    <div className="relative h-44 overflow-hidden bg-[#0b1220]">
                      <div className="absolute left-1/2 top-3 -translate-x-1/2 w-24 h-40 rounded-xl border-2 border-white/15 bg-[#101a2e] p-2">
                        <div className="h-1.5 w-10 bg-white/20 rounded mx-auto mb-2" />
                        <div className="h-8 rounded-md bg-emerald-400/20 mb-1.5" />
                        <div className="h-3 w-3/4 bg-white/15 rounded mb-1" />
                        <div className="h-3 w-1/2 bg-white/10 rounded mb-2" />
                        <div className="grid grid-cols-3 gap-1">
                          <div className="h-5 rounded bg-white/10" />
                          <div className="h-5 rounded bg-white/10" />
                          <div className="h-5 rounded bg-white/10" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 t-label text-white/50">PREVIEW SOON</div>
                    </div>
                  ) : (
                    <div className="relative h-20 p-3.5 overflow-hidden">
                      <span className="absolute -right-1 -bottom-7 t-display text-[6.5rem] leading-none text-paper-2 select-none pointer-events-none">
                        {p.title.charAt(0)}
                      </span>
                      <div className="relative space-y-2">
                        <div className="h-2 w-2/5 bg-line" />
                        <div className="h-2 w-3/5 bg-line" />
                        <div className="h-2 w-1/2 bg-line" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="t-display text-3xl lg:text-5xl text-ink">{p.title}</h3>
                    <span className="t-mono text-xs text-mut-2 shrink-0">{p.year}</span>
                  </div>
                  <div className="t-label text-mut-2 mb-4">{p.type}</div>
                  <p className="text-sm text-mut leading-relaxed max-w-lg mb-6">{p.desc}</p>

                  <div className="flex items-center gap-2 mb-6">
                    {p.stack.map((s) => (
                      <div key={s} className="bg-paper border border-line rounded-lg p-1.5" title={s}>
                        <BrandIcon name={s} size={20} />
                      </div>
                    ))}
                    <span className="t-mono text-[10px] text-mut-2 ml-2">{p.stack.join(' · ')}</span>
                  </div>

                  {/* expandable case study */}
                  <div className={`grid transition-all duration-500 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="border-t-2 border-dashed border-line-2 pt-5 grid sm:grid-cols-3 gap-4">
                        {[
                          { icon: Target, label: 'Problem', text: p.cs.problem },
                          { icon: Wrench, label: 'Solution', text: p.cs.solution },
                          { icon: TrendingUp, label: 'Result', text: p.cs.result },
                        ].map((c) => (
                          <div key={c.label}>
                            <div className="flex items-center gap-1.5 t-label text-verm mb-2">
                              <c.icon className="w-3 h-3" /> {c.label}
                            </div>
                            <p className="text-xs text-mut leading-relaxed">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <span className="t-label text-mut group-hover:text-verm">
                    {isOpen ? 'Close case' : 'Read the case'}
                  </span>
                  <div className="flex items-center gap-2">
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 border-2 border-ink flex items-center justify-center bg-paper hover:bg-ink hover:text-paper transition-colors"
                        title={p.repo ? 'View source' : 'Visit live'}
                      >
                        {p.repo ? <Code2 className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                      </a>
                    )}
                    <span className={`w-10 h-10 border-2 border-ink flex items-center justify-center bg-paper transition-all ${isOpen ? 'bg-verm text-paper border-verm rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
