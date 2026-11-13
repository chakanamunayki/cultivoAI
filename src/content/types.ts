/**
 * Cultivo Labs Content Type Definitions
 * Trilingual content support for Spanish (es), English (en), and Brazilian Portuguese (pt)
 */

export type Locale = "es" | "en" | "pt";

/**
 * Chat context types for contextual greetings
 */
export type ChatContextType =
  | "general"
  | "booking"
  | "story"
  | "service"
  | "partnership"
  | "qualification"
  | "impact"
  | "project";

export interface ChatContext {
  type: ChatContextType;
  serviceTitle?: string;
  partnershipName?: string;
  projectTitle?: string;
  sectorName?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroCopy {
  tagline: string;
  line1: string;
  subheadline: string;
  audience?: string[]; // Deprecated: legacy word-stagger line (kept for backward compat)
  audienceLabel: string;
  audienceChips: string[];
  tertiaryCta: string;
  microcopy: string;
  cta: string;
  secondaryCta: string;
  noDramaText: string;
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
  bio?: TeamMemberBio; // omit to hide the "View more" pop-up
}

export interface AboutCopy {
  title: string;
  subtitle: string;
  teamMembers: TeamMember[];
  footerNote: string;
  viewMoreLabel: string;
}

export interface ModalExpansion {
  whatItMeans: string;
  whyItMatters: string;
  whatsIncluded: string[];
  idealFit: string[];
  typicalOutcome: string;
}

export interface Service {
  icon: string;
  title: string;
  eng: string; // English subtitle
  description: string;
  details: string[];
  imageUrl?: string; // Fallback still image when there is no animation or video (PT only)
  imageFit?: "cover" | "contain";
  videoUrl?: string; // Optional looping video clip (replaces image when set)
  animationKey?: string; // Maps to a bespoke illustration animation component
  modal: ModalExpansion;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  title: string;
  desc: string;
  fullDesc: string;
  lessons: string;
  status: string;
  image: string;
  images?: string[];
  animationKey?: string; // Maps to a bespoke animation component (used when image is empty)
  tags: string[];
  url?: string;
  stats?: ProjectStat[];
  modal: ModalExpansion;
  /** Kept in the content but left off the site and out of the chat. */
  hidden?: boolean;
}

export interface ProjectInProgress {
  status: string;
  title: string;
  desc: string;
  /** Short labelled lines under the description. */
  details?: { label: string; text: string }[];
}

export interface Partnership {
  name: string;
  tagline: string;
  description: string;
  idealFor: string[];
  icon: string;
  imageUrl?: string; // Landing visual tile/banner
  /** How the price is agreed for this step. Never a figure. */
  terms?: string;
  modal: ModalExpansion;
}

export interface PartnershipsExtras {
  missionLine: string;
  missionCta: string;
}

export interface Step {
  action: string;
  result: string;
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
  imageUrl?: string; // Landing visual tile/banner
  badge?: string;
  chatButtonLabel?: string;
  modal?: ModalExpansion; // Expanded popup content (aligned with other landing modals)
  // Extended details for popup
  whoWeHelp?: string[];
  howWeHelp?: string[];
  exampleProjects?: string[];
  detailsButtonLabel?: string;
}

export interface WhoWeHelpContent {
  title: string;
  subtitle: string;
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
  /** Leave out until the mailbox works: the nav and footer only show it when set. */
  email?: string;
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
  service: string; // Use {service} as placeholder for service title
  partnership: string; // Generic, used when no step is named
  partnershipNamed?: string; // Use {partnership} as placeholder for the step name
  project?: string; // Use {project} as placeholder for the project title
  qualification: string;
  qualificationSector?: string; // Use {sector} as placeholder for the sector name
  impact: string;
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
  marquee: string[];
  hero: HeroCopy;
  about: AboutCopy;
  whyUs: WhyUs; // Not rendered on the page; still fed to the chat system prompt
  servicesTitle: string;
  servicesTagline: string;
  servicesSubtitle: string;
  services: Service[];
  whoWeHelp: WhoWeHelpContent;
  semillero: SemilleroContent;
  partnershipsTitle: string;
  partnershipsSubtitle: string;
  partnerships: Partnership[];
  partnershipsExtras?: PartnershipsExtras;
  projectsTitle: string;
  projectsSubtitle: string;
  projects: Project[];
  /** Unnamed work in progress, shown as small cards under the projects. */
  projectsInProgressTitle?: string;
  projectsInProgress?: ProjectInProgress[];
  storiesTitle: string;
  storiesSubtitle: string;
  stories: RealStory[];
  values: ValuesContent;
  whatHappensNext: WhatHappensNextContent;
  footer: FooterCopy;
  chat: ChatCopy;
  contactForm: ContactFormCopy;
  /** Interface labels (buttons, aria labels, modal headings). Optional so the hidden PT content can omit it; it falls back to English. */
  ui?: UiLabels;
}

/**
 * Small interface labels that used to be hardcoded in components.
 */
export interface UiLabels {
  nav: {
    cta: string;
    homeAria: string;
    languageAria: string;
    openMenuAria: string;
    closeMenuAria: string;
    menu: string;
    panelHeadline: string;
  };
  directContact: string;
  chatWidget: {
    bookCallTitle: string;
    voiceButton: string;
    voiceModeAria: string;
    voiceTitle: string;
    whatsappTitle: string;
    arrangeCall: string;
    thinking: string;
  };
  closeModalAria: string;
  openWhatsAppAria: string;
  openChatAria: string;
  closeChatAria: string;
  /** Section headings shared by the service, project and partnership modals. */
  detail: {
    whatItMeans: string;
    whyItMatters: string;
    included: string;
    idealFit: string;
    outcome: string;
    lesson: string;
    visitSite: string;
  };
  serviceModalCta: string;
  projectModalCta: string;
  partnershipModalCta: string;
  teamMemberCta: string;
  watchVideo: string;
  seeMore: string;
  viewDetails: string;
  bookCall: string;
  aboutNote: string;
  contactForm: {
    whatsappCta: string;
    sending: string;
    sentLabel: string;
    sentTitle: string;
    sentWhatsappHint: string;
    close: string;
    errorName: string;
    errorEmail: string;
    errorProjectType: string;
    errorGeneric: string;
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
  closing?: string;
}

/**
 * Semillero teaser (LATAM innovation network; full page is phase 2)
 */
export interface SemilleroContent {
  title: string;
  subtitle: string;
  body: string;
  projectCta: string;
  innovationCta: string;
}

/**
 * Type for localized content dictionary
 */
export type LocalizedContent = Record<Locale, SiteContent>;
