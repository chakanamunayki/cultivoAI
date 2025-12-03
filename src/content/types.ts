/**
 * CultivoAI Content Type Definitions
 * Bilingual content support for Spanish (es) and English (en)
 */

export type Locale = "es" | "en";

/**
 * Chat context types for contextual greetings
 */
export type ChatContextType =
  | "general"
  | "booking"
  | "story"
  | "semilla"
  | "service"
  | "partnership"
  | "qualification";

export interface ChatContext {
  type: ChatContextType;
  serviceTitle?: string;
  partnershipName?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroCopy {
  tagline: string;
  headline: string;
  subheadline: string;
  cta: string;
  secondaryCta: string;
}

export interface AboutCopy {
  title: string;
  subtitle: string;
  paulTitle: string;
  paulDescription: string;
  rockyTitle: string;
  rockyDescription: string;
}

export interface Service {
  icon: string;
  title: string;
  eng: string; // English subtitle
  description: string;
  details: string[];
  imageUrl: string;
}

export interface Project {
  title: string;
  desc: string;
  fullDesc: string;
  lessons: string;
  status: string;
  image: string;
  tags: string[];
}

export interface Partnership {
  name: string;
  tagline: string;
  description: string;
  idealFor: string[];
  icon: string;
}

export interface Step {
  action: string;
  result: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  scenario: string;
  steps: Step[];
}

export interface RealStory {
  company: string;
  industry: string;
  before: string;
  after: string;
  quote: string;
  author: string;
  imageUrl: string;
}

export interface SemillaTier {
  name: string;
  description: string;
}

export interface SemillaContent {
  title: string;
  subtitle: string;
  about: string;
  tiers: SemillaTier[];
  services: string[];
  goal: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
}

export interface WhyUs {
  notTitle: string;
  notItems: string[];
  yesTitle: string;
  yesItems: string[];
}

export interface FooterCopy {
  cta: string;
  ctaButton: string;
  copyright: string;
}

export interface ChatContextualGreetings {
  general: string;
  booking: string;
  story: string;
  semilla: string;
  service: string; // Use {service} as placeholder for service title
  partnership: string; // Use {partnership} as placeholder for partnership name
  qualification: string;
  formFallback: string; // "Prefer a form?" prompt
}

export interface ChatCopy {
  title: string;
  placeholder: string;
  sendButton: string;
  welcomeMessage: string;
  contextualGreetings: ChatContextualGreetings;
}

export interface ContactFormCopy {
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  whatsappLabel: string;
  whatsappPlaceholder: string;
  projectTypeLabel: string;
  projectTypes: string[];
  descriptionLabel: string;
  descriptionPlaceholder: string;
  submitButton: string;
  chatPrompt: string;
}

export interface SiteContent {
  nav: NavItem[];
  marquee: string;
  hero: HeroCopy;
  about: AboutCopy;
  whyUs: WhyUs;
  servicesTitle: string;
  servicesSubtitle: string;
  services: Service[];
  demosTitle: string;
  demosSubtitle: string;
  useCases: UseCase[];
  semilla: SemillaContent;
  partnershipsTitle: string;
  partnershipsSubtitle: string;
  partnerships: Partnership[];
  projectsTitle: string;
  projectsSubtitle: string;
  projects: Project[];
  storiesTitle: string;
  storiesSubtitle: string;
  stories: RealStory[];
  footer: FooterCopy;
  chat: ChatCopy;
  contactForm: ContactFormCopy;
}

/**
 * Type for localized content dictionary
 */
export type LocalizedContent = Record<Locale, SiteContent>;
