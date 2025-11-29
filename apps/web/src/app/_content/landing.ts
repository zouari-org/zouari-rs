export type CtaFooterContent = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCta?: {
    href: string;
    label: string;
  };
};

// 1. Centralize the email address
const CONTACT_EMAIL = 'consulting@zouari.org';

const ctaFooter: CtaFooterContent = {
  title: 'Ready to Move Your Project Forward?',
  body: 'Whether you’re improving an existing system or starting something new, we begin with a simple, no-pressure conversation to understand your goals and challenges.',
  ctaLabel: 'Start the Conversation',
  ctaHref: `mailto:${CONTACT_EMAIL}`,

  // optional – you can comment this out if you don’t want a secondary CTA yet
  // secondaryCta: {
  //   href: '/zouari-one-pager.pdf',
  //   label: 'Download One-Pager',
  // },
};

export const landingContent = {
  contact: {
    email: CONTACT_EMAIL,
    label: 'Contact',
    ctaLabel: 'Contact Us',
  },

  hero: {
    title: 'ZOUARI',
    subtitle: 'Secure by Design. Simple by Choice.',
    description:
      'We build and operate secure digital infrastructure for modern businesses. We apply defense-in-depth principles across backends, pipelines, and cloud systems — giving you the confidence to move fast without compromising security.',
    ctaLabel: 'Schedule a Consultation',
    ctaHref: `mailto:${CONTACT_EMAIL}`,
    stats: [
      { value: '99.9%', label: 'Service Reliability' },
      { value: '24h', label: 'Average Response Time' },
      { value: '100%', label: 'On-Scope Delivery' },
    ],
  },
  whoWeAre: {
    title: 'Built on Expertise. Driven by Trust.',
    body: `ZOUARI is a security-first engineering consultancy focused on building systems that last. Our team brings deep experience designing, hardening, and scaling infrastructure across fintech, healthcare, and enterprise SaaS.

We don’t just ship code — we engineer resilient systems that withstand adversarial environments, meet compliance demands, and remain maintainable over time. Every engagement is guided by clear processes, honest communication, and long-term reliability.`,
    highlights: [
      {
        title: 'Security at the Core',
        description: 'Threat modeling and risk reduction shape every architectural choice.',
      },
      {
        title: 'Engineering That Scales',
        description: 'Battle-tested designs used in high-compliance and high-growth environments.',
      },
      {
        title: 'Designed for Ownership',
        description: 'No lock-in. You get systems you can run confidently for years.',
      },
    ],
  },
  services: {
    title: 'Enterprise-Grade Capabilities',
    subtitle:
      'Security, reliability, and engineering discipline—built for organizations that cannot afford gaps, regressions, or operational surprises.',
    features: [
      {
        icon: 'server',
        title: 'Secure Infrastructure & DevSecOps',
        description:
          'We design and operate secure, containerized infrastructure with automated CI/CD pipelines across major cloud platforms.',
        capabilities: ['Zero-trust design', 'Automated compliance', 'End-to-end auditability'],
      },
      {
        icon: 'shield',
        title: 'Hardened Application Backends',
        description:
          'Memory-safe, type-safe APIs engineered in Rust and TypeScript. Every backend includes strict validation, rate limiting, clear API contracts, and predictable error handling.',
        capabilities: [
          'Memory-safe by default',
          'Contract-driven API testing',
          'Strict dependency hygiene',
        ],
      },
      {
        icon: 'layout',
        title: 'Secure Web Platforms',
        description:
          'Next.js applications with predictable data flows, strong UX, and integrated performance and security controls.',
        capabilities: [
          'A+ security headers',
          'Accessibility compliant',
          'Performance budgets enforced',
        ],
      },
      {
        icon: 'chart',
        title: 'Consulting & Advisory',
        description:
          'Architecture reviews, migration planning, system hardening, and hands-on guidance for modernizing legacy stacks.',
          capabilities: ['Threat modeling', 'Compliance gap analysis', 'Incident response planning'],
      },
    ],
  },
  trust: {
    title: 'Why Organizations Trust Us',
    items: [
      {
        icon: 'lock',
        title: 'Dependable Practices',
        description:
          'We follow clear processes, consistent workflows, and responsible engineering habits that keep projects stable and predictable.',
      },
      {
        icon: 'document',
        title: 'Clear Communication & Documentation',
        description:
          'Every project includes straightforward documentation—runbooks, decisions, and guides—so your team always knows how things work.',
      },
      {
        icon: 'clock',
        title: 'On-Time, On-Scope Delivery',
        description:
          'We commit to clear milestones and deliverables. No scope creep, no shifting timelines, and no unexpected costs.',
      },
      {
        icon: 'users',
        title: 'Work Directly With Engineers',
        description:
          'You collaborate with senior engineers from day one. No handoffs, no layers of management, and no outsourced surprises.',
      },
    ],
  },
  promise: {
    title: 'Our Commitment',
    points: [
      {
        title: 'Quality Without Chaos',
        description:
          'We move quickly without cutting corners. You get stable, reliable work—not rushed shortcuts that create problems later.',
      },
      {
        title: 'Clear and Honest Communication',
        description:
          'You always know what’s happening, what we recommend, and why. No jargon, no hidden decisions, no surprises.',
      },
      {
        title: 'Built to Last',
        description:
          'We create systems your team can understand, maintain, and evolve—documented, organized, and future-friendly.',
      },
    ],
  },
  ctaFooter,
};
