export const DATA: Record<string, any> = {
  // Projects
  'dataflow-platform': {
    title: 'DataFlow Platform',
    status: 'In Production',
    date: '2023 - Present',
    desc: 'High-performance data visualization dashboard for enterprise metrics.',
    link: '#',
    workflow: [
      { step: 'Data Ingestion', desc: 'Raw metrics stream via WebSocket API and parsed locally in a Web Worker.', icon: 'Zap' },
      { step: 'State Aggregation', desc: 'Zustand handles complex multi-dimensional filtering before pushing to the render queue.', icon: 'Blocks' },
      { step: 'WebGL Rendering', desc: 'Custom shaders map millions of points into a high-fps interactive canvas.', icon: 'Terminal' }
    ]
  },
  'serverless-cms': {
    title: 'Serverless CMS',
    status: 'Completed',
    date: '2022',
    desc: 'A headless content management system built on edge functions with real-time collaborative editing features.',
    link: '#',
    workflow: [
      { step: 'Client Input', desc: 'Editor makes changes locally in a TipTap instance.', icon: 'Terminal' },
      { step: 'Edge Sync', desc: 'CRDTs sync via Vercel Edge Functions to Redis.', icon: 'Zap' },
      { step: 'Static Generation', desc: 'Webhooks trigger Next.js ISR to rebuild static pages globally.', icon: 'Blocks' }
    ]
  },
  'ecommerce-core': {
    title: 'E-Commerce Core',
    status: 'Archived',
    date: '2021',
    desc: 'Modular storefront architecture supporting multiple payment gateways and bidirectional inventory syncing.',
    link: '#',
    workflow: [
      { step: 'User Action', desc: 'Customer adds item to cart, triggering local storage sync.', icon: 'Terminal' },
      { step: 'Inventory Check', desc: 'Serverless function reserves item in Prisma DB.', icon: 'Blocks' },
      { step: 'Checkout', desc: 'Stripe handles payment and triggers fulfillment webhooks.', icon: 'Zap' }
    ]
  },

  // Careers
  'techcorp-senior-fe': {
    title: 'Senior Frontend Engineer @ Sinar Mas',
    status: 'Current Role',
    date: '2023 - Present',
    desc: 'Leading the frontend architecture for the core product lines.',
    link: '#',
    image: '/LG_Sinarmas_Logo_Vector.svg',
    contributions: [
      { project: 'APC System', tasks: ['Migrated legacy React SPA to Next.js App Router', 'Reduced initial load by 40% utilizing server components', 'Established strict CI/CD pipelines'] },
      { project: 'FDC Dashboard', tasks: ['Built complex data grids handling 50k+ rows', 'Integrated real-time websocket charting', 'Implemented accessibility standards (WCAG 2.1)'] }
    ],
    culture: [
      { activity: 'Futsal Tournament', desc: 'Weekly division futsal bonding and internal tournaments.', photo: '' },
      { activity: 'Tech Talk Friday', desc: 'Sharing session about React Server Components internally.', photo: '' }
    ]
  },
  'studio-xyz-fe': {
    title: 'Frontend Developer @ Studio XYZ',
    status: 'Previous Role',
    date: '2021 - 2023',
    desc: 'Built high-conversion marketing sites and bespoke e-commerce experiences for premium global brands.',
    link: '#',
    contributions: [
      { project: 'Marketing Sites', tasks: ['Developed pixel-perfect animations using GSAP', 'Optimized Core Web Vitals for heavy media sites'] },
      { project: 'E-Commerce', tasks: ['Built headless Shopify storefronts', 'Integrated Stripe and PayPal processing'] }
    ],
    culture: [
      { activity: 'Creative Workshop', desc: 'Monthly UI/UX brainstorming with the design team.', photo: '' }
    ]
  },
  'agency-beta-webdev': {
    title: 'Web Developer @ Agency Beta',
    status: 'Previous Role',
    date: '2019 - 2021',
    desc: 'Developed bespoke web applications and interactive campaigns for various agency clients.',
    link: '#',
    contributions: [
      { project: 'Client Microsites', tasks: ['Handled end-to-end development', 'Maintained legacy WordPress platforms'] }
    ],
    culture: [
      { activity: 'Agency Outing', desc: 'Annual company retreat to the mountains.', photo: '' }
    ]
  },

  // Certificates
  'aws-cert': {
    title: 'AWS Certified Developer',
    status: 'Active',
    date: 'Oct 2023',
    desc: 'Validation of technical expertise in developing and maintaining applications on the AWS platform.',
    link: '#',
    bullets: ['Deep understanding of core AWS services', 'Proficiency in developing cloud-based applications']
  },
  'react-patterns': {
    title: 'Advanced React Patterns',
    status: 'Completed',
    date: 'Mar 2022',
    desc: 'Comprehensive course covering advanced component patterns and performance optimization in React.',
    link: '#',
    bullets: ['Mastered Compound Components', 'Deepened knowledge of React hooks']
  },
  'uiux-design': {
    title: 'UI/UX Design Specialization',
    status: 'Completed',
    date: 'Nov 2021',
    desc: 'A multi-course specialization focusing on user research, wireframing, and interactive prototyping.',
    link: '#',
    bullets: ['Applied human-computer interaction theories', 'Conducted usability tests']
  },
  'gcp-foundations': {
    title: 'Cloud Architecture Foundations',
    status: 'Completed',
    date: 'Jan 2021',
    desc: 'Foundational knowledge of Google Cloud computing and infrastructure.',
    link: '#',
    bullets: ['Configured VPCs and Compute Engine', 'Studied fundamental cloud security principles']
  }
};
