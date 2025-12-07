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

export interface HeroFooterBar {
  price: string;
  impactRates: string;
  familyTagline: string;
  ctaButton: string;
}

export interface HeroCopy {
  tagline: string;
  headline: string;
  subheadline: string;
  cta: string;
  secondaryCta: string;
  noDrama: string;
  noDramaText: string;
  footerBar: HeroFooterBar;
}

export interface TeamMemberBio {
  headline: string;
  sections: {
    title: string;
    content: string;
  }[];
  linkedinUrl?: string;
  videoUrl?: string;
  videoLabel?: string;
}

export interface TeamMember {
  id: "paul" | "rocky" | "marta";
  name: string;
  title: string;
  subtitle?: string;
  badge?: string;
  description: string;
  imageUrl: string;
  accentColor: string; // Tailwind color class for card accent
  shadowColor: string; // Shadow color hex or class
  linkedinUrl?: string;
  bio: TeamMemberBio;
}

export interface AboutCopy {
  title: string;
  subtitle: string;
  teamMembers: TeamMember[];
  footerNote: string;
  viewMoreLabel: string;
}

export interface Service {
  icon: string;
  title: string;
  eng: string; // English subtitle
  description: string;
  details: string[];
  imageUrl: string;
  pricing?: string; // e.g., "Desde $100 USD" / "From $100 USD"
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
  metric?: string; // e.g., "21 horas/semana recuperadas"
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

export interface Sector {
  name: string;
  description: string;
  icon: string;
  badge?: string;
  chatButtonLabel?: string;
  // Extended details for popup
  whoWeHelp?: string[];
  howWeHelp?: string[];
  exampleProjects?: string[];
  detailsButtonLabel?: string;
}

export interface WhoWeHelpContent {
  title: string;
  idealTitle: string;
  idealItems: string[];
  notIdealTitle: string;
  notIdealItems: string[];
  sectorsTitle: string;
  sectors: Sector[];
  cta: string;
  ctaButton: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface WhatHappensNextContent {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  cta: string;
  ctaButton: string;
}

export interface SocialLink {
  platform: "linkedin" | "whatsapp" | "instagram" | "facebook";
  url: string;
  label: string;
  comingSoon?: boolean;
}

export interface FooterContactInfo {
  email: string;
  whatsapp: string;
  whatsappDisplay: string;
  location: string;
  locationSecondary: string;
}

export interface FooterQuickLink {
  label: string;
  href: string;
}

export interface FooterCopy {
  cta: string;
  ctaButton: string;
  copyright: string;
  socialLinks: SocialLink[];
  contactInfo: FooterContactInfo;
  quickLinks: FooterQuickLink[];
  quickLinksTitle: string;
  contactTitle: string;
  socialTitle: string;
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
  howWeWork: HowWeWorkContent;
  whatWeDo: WhatWeDoContent;
  whyUs: WhyUs;
  servicesTitle: string;
  servicesSubtitle: string;
  services: Service[];
  demosTitle: string;
  demosSubtitle: string;
  useCases: UseCase[];
  whoWeHelp: WhoWeHelpContent;
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
  values: ValuesContent;
  mission: MissionContent;
  whatHappensNext: WhatHappensNextContent;
  footer: FooterCopy;
  chat: ChatCopy;
  contactForm: ContactFormCopy;
  terminal: TerminalContent;
}

/**
 * How We Work Section Types
 */
export interface HowWeWorkPillar {
  icon: string;
  title: string;
  description: string;
  isFullWidth?: boolean;
}

export interface HowWeWorkContent {
  title: string;
  subtitle: string;
  pillars: HowWeWorkPillar[];
}

/**
 * What We Do Section Types
 */
export interface WhatWeDoColumn {
  title: string;
  items: string[];
}

export interface WhatWeDoContent {
  title: string;
  subtitle: string;
  intro: string;
  columns: WhatWeDoColumn[];
  servicesPreview: {
    title: string;
    linkText: string;
  };
}

/**
 * Values Section Types
 */
export interface Value {
  icon: string;
  title: string;
  description: string;
}

export interface ValuesContent {
  title: string;
  subtitle: string;
  values: Value[];
}

/**
 * Mission Statement Section Types
 */
export interface MissionContent {
  title: string;
  statement: string[];
  tagline: string;
}

/**
 * Code Terminal Animation Content
 */
export interface TerminalScriptLine {
  text: string;
  type: 'command' | 'success' | 'info' | 'error' | 'event' | 'ai';
  delay: number;
  className?: string;
}

export interface TerminalContent {
  welcomeLine1: string;
  welcomeLine2: string;
  script: TerminalScriptLine[];
}

/**
 * Type for localized content dictionary
 */
export type LocalizedContent = Record<Locale, SiteContent>;
