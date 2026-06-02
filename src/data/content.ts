export const site = {
  name: 'EKKA MEDIA',
  tagline: 'Creator-led brand storytelling.',
  email: 'hello@ekkamedia.com',
  social: {
    instagram: 'https://instagram.com/ekkamedia',
    linkedin: 'https://linkedin.com/company/ekkamedia',
  },
  est: '2024',
} as const;

export const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#creators', label: 'Creators' },
  { href: '/contact', label: 'Contact' },
] as const;

/** Verticals we partner across — not placeholder brand names */
export const trustVerticals = [
  'Beauty & Skincare',
  'D2C & Retail',
  'Fashion & Apparel',
  'Food & Beverage',
  'Health & Wellness',
  'Lifestyle',
  'Tech & Apps',
  'Entertainment',
] as const;

export const services = [
  {
    tag: 'Campaign Strategy',
    title: 'Influencer Campaigns',
    description:
      'End-to-end creator campaigns built around cultural relevance, audience fit, and measurable engagement — not vanity metrics.',
  },
  {
    tag: 'Partnership',
    title: 'Creator Partnerships',
    description:
      'Long-term brand–creator relationships rooted in shared values, consistent storytelling, and community trust.',
  },
  {
    tag: 'Content',
    title: 'UGC Campaigns',
    description:
      'Platform-native creator content designed for performance — authentic, scroll-stopping, and ready to deploy across channels.',
  },
  {
    tag: 'Brand',
    title: 'Brand Collaborations',
    description:
      'Matching brands with creators and communities that align with your audience — beyond follower count.',
  },
  {
    tag: 'Operations',
    title: 'Talent Coordination',
    description:
      'Briefing, approvals, timelines, and delivery. We manage the creator workflow so your team stays focused on the brand.',
  },
] as const;

/** Creator network shown by niche — no fabricated handles */
export const creatorNiches = [
  { niche: 'Fashion & Style', focus: 'Editorial, lookbooks, seasonal drops' },
  { niche: 'Food & Culture', focus: 'Recipes, dining, regional cuisine' },
  { niche: 'Tech & Product', focus: 'Reviews, tutorials, app launches' },
  { niche: 'Fitness & Wellness', focus: 'Training, nutrition, mindful living' },
  { niche: 'Travel & Lifestyle', focus: 'Destinations, hospitality, experiences' },
  { niche: 'Beauty & Grooming', focus: 'Skincare, routines, product education' },
  { niche: 'Music & Entertainment', focus: 'Artists, events, culture moments' },
  { niche: 'Gaming & Digital', focus: 'Streams, esports, community play' },
] as const;

export const stats = [
  { value: 15000, suffix: '', label: 'Creators in network', decimals: 0 },
  { value: 50, suffix: '+', label: 'Brand campaigns delivered', decimals: 0 },
  { value: 4.2, suffix: '%', label: 'Avg. campaign engagement', decimals: 1 },
] as const;

/** Capability highlights — replaces fake case-study cards */
export const workHighlights = [
  {
    id: 'launch',
    title: 'Product Launch Campaigns',
    category: 'D2C · Multi-creator',
    description: 'Coordinated creator rollouts for new product drops across Instagram, YouTube, and short-form video.',
    visual: 'campaign-card__visual--1' as const,
    large: true,
  },
  {
    id: 'always-on',
    title: 'Always-on Brand Storytelling',
    category: 'Lifestyle · Long-term',
    description: 'Sustained creator partnerships that build narrative depth over quarters, not one-off posts.',
    visual: 'campaign-card__visual--2' as const,
    large: false,
  },
  {
    id: 'ugc',
    title: 'Performance UGC at Scale',
    category: 'Paid social · UGC',
    description: 'High-volume creator content pipelines for Meta and TikTok ads — tested, approved, and platform-ready.',
    visual: 'campaign-card__visual--3' as const,
    large: false,
  },
] as const;

export const creatorCategories = [
  'Lifestyle',
  'Fashion',
  'Beauty / Makeup',
  'Fitness / Sport',
  'Food',
  'Travel',
  'Tech',
  'Gaming',
  'Music',
  'Entertainment',
  'Education',
  'Parenting / Family',
  'Finance / Business',
  'Art / Design',
  'Other',
] as const;
