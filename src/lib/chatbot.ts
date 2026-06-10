import { services, creatorNiches, stats, site } from '@/data/content';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  link?: { href: string; label: string };
};

export const quickReplies = [
  'What services do you offer?',
  'How do I work with Ekka?',
  'Tell me about your creator network',
  'How can I contact you?',
] as const;

const greetings = /\b(hi|hello|hey|hola|good\s*(morning|afternoon|evening)|what'?s\s*up)\b/i;

function formatServices(): string {
  return services
    .map((s) => `• **${s.title}** — ${s.description}`)
    .join('\n\n');
}

function formatCreators(): string {
  const niches = creatorNiches.map((c) => `• ${c.niche}`).join('\n');
  return `We work across ${creatorNiches.length}+ niches including:\n\n${niches}\n\nOur network spans ${stats[0].value.toLocaleString()}+ creators with an average campaign engagement of ${stats[2].value}${stats[2].suffix}.`;
}

function formatAbout(): string {
  return `Ekka Media is a creator partnership studio. We help brands find the right voices — aligned on audience, values, and creative direction.\n\nOur philosophy: "Connection over reach. Culture over clicks."`;
}

function formatContact(): string {
  return `We'd love to hear from you! Reach us at ${site.email} or fill out the contact form and our team will get back to you shortly.`;
}

export function getBotResponse(input: string): Pick<ChatMessage, 'text' | 'link'> {
  const msg = input.trim().toLowerCase();

  if (!msg) {
    return { text: 'Ask me anything about Ekka Media — services, creators, or how to get started.' };
  }

  if (greetings.test(msg)) {
    return {
      text: `Hi there! I'm the Ekka Media assistant. I can tell you about our services, creator network, and how to start a partnership.`,
    };
  }

  if (/\b(service|offer|do you do|campaign|ugc|partnership|talent)\b/.test(msg)) {
    return { text: formatServices() };
  }

  if (/\b(creator|influencer|network|roster|niche|talent)\b/.test(msg)) {
    return { text: formatCreators() };
  }

  if (/\b(work with|get started|hire|brand|collaborat|partner)\b/.test(msg)) {
    return {
      text: `Brands typically start by sharing campaign goals, target audience, and timeline. We match you with creators who fit culturally — not just by follower count.\n\nReady to begin? Head to our contact page and tell us about your project.`,
      link: { href: '/contact', label: 'Work With Us' },
    };
  }

  if (/\b(contact|email|reach|talk|call|pricing|price|cost|quote)\b/.test(msg)) {
    return {
      text: formatContact(),
      link: { href: '/contact', label: 'Go to Contact' },
    };
  }

  if (/\b(about|who are you|what is ekka|ekka media)\b/.test(msg)) {
    return { text: formatAbout() };
  }

  if (/\b(stat|number|engagement|campaign)\b/.test(msg)) {
    return {
      text: `• ${stats[0].value.toLocaleString()}+ creators in our network\n• ${stats[1].value}${stats[1].suffix} brand campaigns delivered\n• ${stats[2].value}${stats[2].suffix} average campaign engagement`,
    };
  }

  if (/\b(thank|thanks|ty)\b/.test(msg)) {
    return { text: `You're welcome! Let me know if there's anything else I can help with.` };
  }

  return {
    text: `I'm not sure about that one, but I can help with our services, creator network, or how to get in touch. Try one of the suggestions below, or visit our contact page.`,
    link: { href: '/contact', label: 'Contact Us' },
  };
}

export function renderMarkdown(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
