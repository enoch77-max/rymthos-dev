export type TechCategory =
  | 'Frontend' | 'Backend' | 'Mobile' | 'Database' | 'Cloud & DevOps'
  | 'AI' | 'Design' | 'Payments' | 'Commerce & CMS';

export interface Tech {
  name: string;
  category: TechCategory;
  note: string;
}

export const techs: Tech[] = [
  { name: 'React', category: 'Frontend', note: 'UI library' },
  { name: 'Next.js', category: 'Frontend', note: 'React framework' },
  { name: 'TypeScript', category: 'Frontend', note: 'Typed JS' },
  { name: 'JavaScript', category: 'Frontend', note: 'ES2024' },
  { name: 'Vue', category: 'Frontend', note: 'Progressive UI' },
  { name: 'Svelte', category: 'Frontend', note: 'Compiled UI' },
  { name: 'Tailwind', category: 'Frontend', note: 'Utility CSS' },

  { name: 'Node.js', category: 'Backend', note: 'JS runtime' },
  { name: 'Express', category: 'Backend', note: 'API server' },
  { name: 'Python', category: 'Backend', note: 'Scripts & APIs' },
  { name: 'GraphQL', category: 'Backend', note: 'Query layer' },

  { name: 'Flutter', category: 'Mobile', note: 'Cross-platform' },
  { name: 'React Native', category: 'Mobile', note: 'Native React' },
  { name: 'Swift', category: 'Mobile', note: 'iOS native' },
  { name: 'Kotlin', category: 'Mobile', note: 'Android native' },

  { name: 'PostgreSQL', category: 'Database', note: 'Relational' },
  { name: 'MongoDB', category: 'Database', note: 'Document' },
  { name: 'MySQL', category: 'Database', note: 'Relational' },
  { name: 'Redis', category: 'Database', note: 'Cache' },
  { name: 'Firebase', category: 'Database', note: 'BaaS' },

  { name: 'OpenAI', category: 'AI', note: 'GPT platform' },
  { name: 'Claude', category: 'AI', note: 'LLM platform' },
  { name: 'Gemini', category: 'AI', note: 'Multimodal AI' },
  { name: 'LangChain', category: 'AI', note: 'LLM orchestration' },
  { name: 'Hugging Face', category: 'AI', note: 'Model hub' },
  { name: 'ElevenLabs', category: 'AI', note: 'Voice AI' },

  { name: 'AWS', category: 'Cloud & DevOps', note: 'Infrastructure' },
  { name: 'Vercel', category: 'Cloud & DevOps', note: 'Edge hosting' },
  { name: 'Docker', category: 'Cloud & DevOps', note: 'Containers' },
  { name: 'Git', category: 'Cloud & DevOps', note: 'Version control' },

  { name: 'Figma', category: 'Design', note: 'Product design' },
  { name: 'Framer', category: 'Design', note: 'Prototyping' },

  { name: 'Stripe', category: 'Payments', note: 'Cards & billing' },
  { name: 'PayPal', category: 'Payments', note: 'Wallets' },

  { name: 'Shopify', category: 'Commerce & CMS', note: 'Storefront' },
  { name: 'WordPress', category: 'Commerce & CMS', note: 'CMS' },
];

export const categories: TechCategory[] = [
  'Frontend', 'Backend', 'Mobile', 'Database', 'Cloud & DevOps', 'AI', 'Design', 'Payments', 'Commerce & CMS',
];

export const heroChips = ['React', 'TypeScript', 'Flutter', 'Node.js', 'Figma', 'Stripe', 'Firebase', 'Tailwind'];
