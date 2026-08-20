/**
 * Centralized business configuration for Fitness Power House.
 * Replace placeholder values (marked TODO) with real client data
 * when it becomes available. Nothing in this file should be
 * hard-coded again inside components.
 */

import logoMark from '../assets/images/logo-mark.png';
import ownerHeroPhoto from '../assets/images/owner-hero.jpg';
import ownerAboutPhoto from '../assets/images/owner-about.jpg';
import certNsdcImage from '../assets/images/cert-nsdc.jpg';
import certCptImage from '../assets/images/cert-cpt.jpg';
import certFssaiImage from '../assets/images/cert-fssai.jpg';
import ashwinBeforePhoto from '../assets/images/ashwin-before.jpg';
import ashwinAfterPhoto from '../assets/images/ashwin-after.jpg';
import theGymHeroPhoto from '../assets/images/gym/gallery-1-hero.jpg';
import theGymGalleryDumbbells from '../assets/images/gym/gallery-2-dumbbells.jpg';
import theGymGalleryAngle from '../assets/images/gym/gallery-3-angle.jpg';
import theGymGalleryDepth from '../assets/images/gym/gallery-4-depth.jpg';
import programsDumbbellsPhoto from '../assets/images/gym/programs-dumbbells.jpg';
import programsOpenGymPhoto from '../assets/images/gym/programs-open-gym.jpg';

export const business = {
  name: 'Fitness Power House',
  shortName: 'FPH',
  /**
   * Corrected from "Ashwin Kumar" (an early placeholder) to "Ashwin Sharma"
   * — every real document supplied (NSDC certificate, Sapphire Fitness
   * Academy certificate, FSSAI registration, and the owner's own signed
   * story) consistently gives this name.
   */
  owner: 'Ashwin Sharma',
  location: {
    city: 'Dewas',
    state: 'Madhya Pradesh',
    country: 'India',
    /** Real business address, confirmed directly by the client. */
    addressLine: 'Vikas Nagar, AB Road, Near TVS Showroom, above Narmada Gramin Bank',
    postalCode: '455001',
  },
  focus: ['FITNESS', 'STRENGTH', 'PERFORMANCE'],
} as const;

export const logo = {
  mark: logoMark,
  /** Alt text intentionally doesn't over-describe the illustration — it's decorative alongside the text wordmark, which carries the actual name. */
  alt: 'Fitness Power House logo mark',
} as const;

/**
 * TODO: Replace with the real WhatsApp business number (with country code,
 * no symbols, e.g. "919876543210") once the client provides it.
 */
const WHATSAPP_NUMBER = '918819957772';

/**
 * Real Google Maps data, confirmed directly by the client: the official
 * embed iframe URL (from Google Maps' own "Share > Embed a map" feature
 * — tied to the verified real place listing, not a text-address guess)
 * and the short share link for "get directions" / review / general map
 * links.
 */
const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.0070841211077!2d76.03193050794523!3d22.949966218952746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963173c2b1b4e99%3A0x684cde968c9155aa!2sFitness%20Powerhouse%20Gym!5e0!3m2!1sen!2sin!4v1787206255056!5m2!1sen!2sin';
const GOOGLE_MAPS_SHORT_LINK = 'https://maps.app.goo.gl/SfEEWx6ud3psNuCU6';

const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Fitness Power House, I'd like to know more about membership.";

/**
 * Single function that builds the outbound WhatsApp link used by every
 * CTA on the site. Swap WHATSAPP_NUMBER above and every CTA updates.
 */
export function getWhatsAppLink(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Real Google Maps short link, confirmed directly by the client — points
 * to the exact verified business listing ("Fitness Powerhouse Gym" on
 * Google Maps), where "Write a review" is directly available. Used for
 * the review CTA instead of a name+city search guess, since this is now
 * confirmed to resolve to the correct listing rather than an approximation.
 */
export function getGoogleReviewLink(): string {
  return GOOGLE_MAPS_SHORT_LINK;
}

/** Real Instagram handles, confirmed by the client. */
const INSTAGRAM_URL = 'https://www.instagram.com/fitnesspowerhousegym';
/** The owner's personal training/fitness account — used in the About section. */
const OWNER_INSTAGRAM_URL = 'https://www.instagram.com/the_classical_personality';

export function getInstagramLink(): string {
  return INSTAGRAM_URL;
}

export function getOwnerInstagramLink(): string {
  return OWNER_INSTAGRAM_URL;
}

export type NavLink = {
  label: string;
  href: string;
};

/**
 * Placeholder in-page section ids. These sections don't exist yet —
 * they'll be built one at a time in later stages and these anchors
 * will resolve once they do.
 */
export const navLinks: NavLink[] = [
  { label: 'The Gym', href: '#the-gym' },
  { label: 'Programs', href: '#programs' },
  { label: 'Membership', href: '#membership' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'About', href: '#about' },
];

export const heroContent = {
  eyebrow: `${business.location.city.toUpperCase()} / ${business.location.state.toUpperCase()}`,
  /** Giant centered word, crossing the athlete — direct tie to the
   * brand name (Fitness POWER House). */
  giantWord: 'POWER',
  /** Thin editorial statement, sits above the giant word — written for
   * this business rather than reused generic template copy. */
  statementLine: 'BUILT ON DISCIPLINE.',
  primaryCta: 'START YOUR TRANSFORMATION',
  /** Bottom activity strip — continuously scrolling. */
  tickerWords: [
    'STRENGTH',
    'CONDITIONING',
    'PERSONAL TRAINING',
    'FUNCTIONAL TRAINING',
    'MOBILITY',
    'PERFORMANCE',
  ],
} as const;

/**
 * Temporary hero photography. High-quality editorial sports photography,
 * used under the Unsplash License, standing in until the client's own
 * transformation / training photography is supplied.
 *
 * Swap `src` for the client's asset path when ready — everything else
 * (sizing, crop, srcSet) is derived from this single object.
 */
export type HeroSlide = {
  src: string;
  alt: string;
  credit: string | null;
  focalDesktop: string;
  focalMobile: string;
};

/**
 * Full-screen hero slideshow — both real owner photos, crossfading on a
 * loop. Deliberately NOT a stock "gym video": the client asked for video,
 * but no real footage of this gym exists yet, and using stock footage
 * would misrepresent it as their actual facility. This slideshow is the
 * honest version of "moving, changing" hero media using what's real
 * today — see the comment on VideoSlot further down for how to swap in
 * real video the moment it's filmed.
 */
export const heroSlides: readonly HeroSlide[] = [
  {
    src: ownerHeroPhoto,
    alt: `${business.owner}, founder and trainer at ${business.name}, holding dumbbells in the gym`,
    credit: null,
    focalDesktop: '50% 15%',
    focalMobile: '50% 10%',
  },
  {
    src: ownerAboutPhoto,
    alt: `${business.owner}, founder and trainer at ${business.name}, training with dumbbells`,
    credit: 'Photography: mr.CLICK Photography',
    focalDesktop: '50% 35%',
    focalMobile: '50% 30%',
  },
] as const;

export const heroSlideshowIntervalMs = 4200;

/**
 * ============================================================
 * HERO VIDEO — REAL OWNER FOOTAGE
 * ============================================================
 * The Hero previously used a rotating sequence of temporary stock
 * photos while the visual design was under review (see git history /
 * earlier README stages for that period). The client has since
 * supplied a real cinematic video generated from the actual owner —
 * this supersedes the stock-photo era entirely. The video file lives at
 * `src/assets/video/hero-owner.{mp4,webm}` with a poster fallback at
 * `hero-owner-poster.jpg` (a frame extracted from the video itself, not
 * a separate asset), imported directly in `Hero.tsx`.
 *
 * Two formats are bundled: WebM (VP9, smaller, no audio track since the
 * video is always muted) is offered first, with the original MP4/H.264
 * upload as the fallback — required for Safari/iOS, which doesn't
 * support WebM at all.
 */

/**
 * Ghost brand-typography layer, sitting BEHIND the athlete photo —
 * replaces the earlier small circular "community" module (removed per
 * explicit "reduce hero UI elements" direction) as the hero's secondary
 * brand-presence mechanism. Very low opacity, discovered rather than
 * announced — see `.hero__brand-layer` in Hero.css.
 */
export const heroBrandLayerLines = ['FITNESS', 'POWER', 'HOUSE'];

/**
 * TODO: real gym video. When the client has actual footage filmed of the
 * facility/training sessions, drop the file into src/assets/video/ and
 * swap the Hero's <img> slideshow for a <video autoPlay muted loop
 * playsInline> using this same full-bleed treatment — the surrounding
 * scrim/headline/ticker markup doesn't need to change, only the media
 * layer itself. Do not substitute stock gym footage in the meantime; it
 * would misrepresent stock footage as this specific gym.
 */
/**
 * "The Gym" — a single large immersive real photograph of the actual
 * Fitness Power House floor, replacing the earlier stock-photo gallery
 * grid entirely. Copy kept deliberately minimal — the photography is
 * doing the storytelling here, not paragraphs of text.
 */
export const theGymContent = {
  sectionIndex: '02',
  sectionLabel: 'THE GYM',
  headlineLines: ['THE SPACE', 'BUILT FOR', 'THE WORK.'],
  paragraph: 'Real space, real equipment — set up for focused, uninterrupted training.',
} as const;

export type GymGalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
};

/**
 * "The Gym" gallery — all four real photographs of the actual Fitness
 * Power House floor, in one consistently-cropped (3:2) auto-scrolling
 * carousel rather than a single hero image. Per explicit direction: use
 * all of them, not just the strongest one.
 */
export const theGymGallery: readonly GymGalleryPhoto[] = [
  {
    src: theGymHeroPhoto,
    alt: 'Strength machines on the gym\u2019s red flooring, with the mirror wall and motivational art behind',
    caption: 'THE FLOOR',
  },
  {
    src: theGymGalleryDumbbells,
    alt: 'The full free-weight dumbbell rack at Fitness Power House',
    caption: 'FREE WEIGHTS',
  },
  {
    src: theGymGalleryAngle,
    alt: 'A second angle of the training floor, showing more of the equipment layout',
    caption: 'THE SETUP',
  },
  {
    src: theGymGalleryDepth,
    alt: 'A wider view showing the depth of the training space',
    caption: 'THE SPACE',
  },
] as const;

/**
 * "Programs" section — a stacked list of what's trained, not what it costs.
 * Deliberately no pricing/package details here (those come later, once the
 * client's real package data is provided) and no invented claims.
 */
export const programsContent = {
  sectionIndex: '03',
  sectionLabel: 'PROGRAMS',
  headlineLines: ['TRAIN WITH', 'A CLEAR PLAN.'],
  paragraph: 'Four ways to train at Fitness Power House — pick what matches your goal, or ask us which fits.',
} as const;

export type ProgramKey = 'strength' | 'personal' | 'functional' | 'open';

export type Program = {
  key: ProgramKey;
  index: string;
  title: string;
  description: string;
  image: { src: string; baseUrl: string; alt: string; focal: string };
  whatsAppMessage: string;
};

export const programs: readonly Program[] = [
  {
    key: 'strength',
    index: '01',
    title: 'STRENGTH TRAINING',
    description: 'Barbell work and progressive overload — structured programming for building real, measurable strength.',
    image: {
      src: programsDumbbellsPhoto,
      baseUrl: '',
      alt: 'The real dumbbell rack at Fitness Power House, Dewas',
      focal: '35% 45%',
    },
    whatsAppMessage: "Hi Fitness Power House, I'd like to know more about Strength Training.",
  },
  {
    key: 'personal',
    index: '02',
    title: 'PERSONAL TRAINING',
    description: 'One-on-one coaching tailored to your goals, your form, and your pace.',
    image: {
      src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80',
      baseUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
      alt: 'A trainer coaching a client through a movement — temporary placeholder photography for the Personal Training program',
      focal: '50% 30%',
    },
    whatsAppMessage: "Hi Fitness Power House, I'd like to know more about Personal Training.",
  },
  {
    key: 'functional',
    index: '03',
    title: 'FUNCTIONAL TRAINING',
    description: 'Movement-based conditioning using functional equipment and open floor space.',
    image: {
      src: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1000&q=80',
      baseUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e',
      alt: 'Athlete training with battle ropes — temporary placeholder photography for the Functional Training program',
      focal: '50% 40%',
    },
    whatsAppMessage: "Hi Fitness Power House, I'd like to know more about Functional Training.",
  },
  {
    key: 'open',
    index: '04',
    title: 'OPEN GYM ACCESS',
    description: 'Full access to the floor during operating hours, for training independently at your own pace.',
    image: {
      src: programsOpenGymPhoto,
      baseUrl: '',
      alt: 'The real training floor at Fitness Power House, Dewas',
      focal: '50% 45%',
    },
    whatsAppMessage: "Hi Fitness Power House, I'd like to know more about Open Gym Access.",
  },
] as const;

/**
 * "Find Your Program" — a short interactive quiz that recommends one of
 * the four `programs` above based on 3 quick questions. Reuses existing
 * program data (title, description, image, WhatsApp message) for the
 * result, so no new content or assets are needed. Scores are additive per
 * ProgramKey; the highest total at the end wins (first-listed program
 * breaks ties).
 */
export const quizContent = {
  sectionIndex: '04',
  eyebrow: 'FIND YOUR PROGRAM',
  headlineLines: ['NOT SURE', 'WHERE TO START?'],
  paragraph: "Answer three quick questions and we'll point you to the program that fits.",
  stepLabel: 'STEP',
  backLabel: 'BACK',
  resultLabel: 'YOUR MATCH',
  retakeLabel: 'RETAKE QUIZ',
  ctaPrefix: 'ASK ABOUT',
} as const;

export type QuizOption = {
  label: string;
  scores: Partial<Record<ProgramKey, number>>;
};

export type QuizQuestion = {
  question: string;
  options: readonly QuizOption[];
};

export const quizQuestions: readonly QuizQuestion[] = [
  {
    question: "What's your main goal?",
    options: [
      { label: 'Build raw strength', scores: { strength: 3 } },
      { label: 'Lose weight / get lean', scores: { functional: 2, personal: 1 } },
      { label: 'General fitness & movement', scores: { functional: 3 } },
      { label: 'Just need a place to train', scores: { open: 3 } },
    ],
  },
  {
    question: 'How much guidance do you want?',
    options: [
      { label: 'Full one-on-one coaching', scores: { personal: 3 } },
      { label: 'Some structure, mostly independent', scores: { strength: 1, functional: 1 } },
      { label: 'I know what I\u2019m doing — just need space', scores: { open: 2 } },
    ],
  },
  {
    question: 'How do you like to move?',
    options: [
      { label: 'Heavy lifting, barbell work', scores: { strength: 2 } },
      { label: 'Varied, functional movement', scores: { functional: 2 } },
      { label: 'Whatever a coach plans for me', scores: { personal: 2 } },
      { label: 'However I want, whenever', scores: { open: 2 } },
    ],
  },
] as const;

/**
 * "BMI Calculator" — a standard WHO-formula BMI calculation, presented as
 * a general indicator only. Not medical advice; includes a disclaimer and
 * routes to a trainer conversation rather than diagnosing anything.
 */
export const bmiContent = {
  sectionIndex: '05',
  eyebrow: 'BMI CALCULATOR',
  headlineLines: ['KNOW YOUR', 'NUMBERS.'],
  paragraph: 'A quick, general fitness indicator — not a diagnosis.',
  metricLabel: 'METRIC',
  imperialLabel: 'IMPERIAL',
  heightLabel: 'HEIGHT',
  weightLabel: 'WEIGHT',
  calculateLabel: 'CALCULATE BMI',
  resultLabel: 'YOUR BMI',
  recalculateLabel: 'RECALCULATE',
  ctaLabel: 'TALK TO A TRAINER',
  whatsAppMessage: "Hi Fitness Power House, I calculated my BMI and would like guidance on a program.",
  disclaimer:
    "BMI is a general screening measure and doesn't account for muscle mass, bone density, or body composition. It isn't a diagnosis — talk to a professional for personalized guidance.",
  errorMessage: 'Enter valid height and weight to calculate.',
} as const;

export type BmiCategory = {
  label: string;
  min: number;
  max: number;
};

export const bmiCategories: readonly BmiCategory[] = [
  { label: 'UNDERWEIGHT', min: -Infinity, max: 18.5 },
  { label: 'NORMAL WEIGHT', min: 18.5, max: 25 },
  { label: 'OVERWEIGHT', min: 25, max: 30 },
  { label: 'OBESE', min: 30, max: Infinity },
] as const;

/**
 * "Exercise Finder" — search/filter by body part. This is standard,
 * well-established exercise knowledge (names, target muscle groups,
 * equipment type), not a claim about Fitness Power House specifically, so
 * it doesn't carry the same "don't invent" concern as business facts —
 * these are just real, commonly-taught exercises.
 */
export const exerciseFinderContent = {
  sectionIndex: '06',
  eyebrow: 'EXERCISE FINDER',
  headlineLines: ['FIND A MOVE', 'FOR THAT.'],
  paragraph: 'Search by name, or filter by body part, to see exercises you can do on the floor.',
  searchPlaceholder: 'Search exercises…',
  allFilterLabel: 'ALL',
  emptyState: 'No exercises match — try a different search or body part.',
  ctaNote: "Want a program built around these?",
  ctaLabel: 'ASK A TRAINER',
  whatsAppMessage: "Hi Fitness Power House, I'd like a program built around specific exercises.",
} as const;

export type BodyPart = 'CHEST' | 'BACK' | 'SHOULDERS' | 'ARMS' | 'LEGS' | 'CORE';

export const bodyParts: readonly BodyPart[] = ['CHEST', 'BACK', 'SHOULDERS', 'ARMS', 'LEGS', 'CORE'] as const;

export type Exercise = {
  name: string;
  bodyPart: BodyPart;
  equipment: string;
};

export const exercises: readonly Exercise[] = [
  { name: 'Barbell Bench Press', bodyPart: 'CHEST', equipment: 'Barbell' },
  { name: 'Incline Dumbbell Press', bodyPart: 'CHEST', equipment: 'Dumbbell' },
  { name: 'Push-Ups', bodyPart: 'CHEST', equipment: 'Bodyweight' },
  { name: 'Cable Fly', bodyPart: 'CHEST', equipment: 'Cable' },
  { name: 'Deadlift', bodyPart: 'BACK', equipment: 'Barbell' },
  { name: 'Lat Pulldown', bodyPart: 'BACK', equipment: 'Machine' },
  { name: 'Bent-Over Row', bodyPart: 'BACK', equipment: 'Barbell' },
  { name: 'Pull-Ups', bodyPart: 'BACK', equipment: 'Bodyweight' },
  { name: 'Overhead Press', bodyPart: 'SHOULDERS', equipment: 'Barbell' },
  { name: 'Lateral Raise', bodyPart: 'SHOULDERS', equipment: 'Dumbbell' },
  { name: 'Face Pull', bodyPart: 'SHOULDERS', equipment: 'Cable' },
  { name: 'Arnold Press', bodyPart: 'SHOULDERS', equipment: 'Dumbbell' },
  { name: 'Barbell Curl', bodyPart: 'ARMS', equipment: 'Barbell' },
  { name: 'Tricep Pushdown', bodyPart: 'ARMS', equipment: 'Cable' },
  { name: 'Hammer Curl', bodyPart: 'ARMS', equipment: 'Dumbbell' },
  { name: 'Skull Crushers', bodyPart: 'ARMS', equipment: 'Barbell' },
  { name: 'Barbell Squat', bodyPart: 'LEGS', equipment: 'Barbell' },
  { name: 'Leg Press', bodyPart: 'LEGS', equipment: 'Machine' },
  { name: 'Romanian Deadlift', bodyPart: 'LEGS', equipment: 'Barbell' },
  { name: 'Walking Lunges', bodyPart: 'LEGS', equipment: 'Dumbbell' },
  { name: 'Plank', bodyPart: 'CORE', equipment: 'Bodyweight' },
  { name: 'Hanging Leg Raise', bodyPart: 'CORE', equipment: 'Bodyweight' },
  { name: 'Cable Crunch', bodyPart: 'CORE', equipment: 'Cable' },
  { name: 'Russian Twist', bodyPart: 'CORE', equipment: 'Bodyweight' },
] as const;

/**
 * Floating action buttons (WhatsApp + back-to-top), fixed bottom-right,
 * appear once the user has scrolled down a bit rather than sitting on
 * screen from the very first frame.
 */
export const floatingActionsContent = {
  scrollThreshold: 480,
  whatsAppLabel: 'Chat on WhatsApp',
  whatsAppMessage: "Hi Fitness Power House, I'd like to know more.",
  backToTopLabel: 'Back to top',
} as const;

/**
 * "Membership" section. IMPORTANT: the client has real package/pricing data
 * that hasn't been supplied yet, so this section deliberately does NOT
 * invent tiers, prices, or discounts. It describes what's included in
 * plain terms and routes pricing questions to WhatsApp instead of
 * fabricating numbers. Replace `inclusions` and copy once real package
 * details are provided — a pricing table can be built at that point.
 */
export const membershipContent = {
  sectionIndex: '07',
  sectionLabel: 'MEMBERSHIP',
  headlineLines: ['MEMBERSHIP,', 'MADE SIMPLE.'],
  paragraph:
    "One straightforward membership — full access to the floor, no confusing tiers. See exact pricing in Packages below, or reach out and we'll walk you through what fits.",
  inclusions: [
    'Full gym floor access',
    'Free weights & strength machines',
    'Functional training area',
    'Flexible training hours',
  ],
  ctaNote: 'See exact pricing in Packages below.',
  primaryCta: 'ASK ABOUT MEMBERSHIP',
  whatsAppMessage: "Hi Fitness Power House, I'd like to know more about membership options and pricing.",
} as const;

export const membershipImage = {
  src: 'https://images.unsplash.com/photo-1689877020200-403d8542d95d?auto=format&fit=crop&w=1200&q=80',
  baseUrl: 'https://images.unsplash.com/photo-1689877020200-403d8542d95d',
  srcSetSizes: [600, 900, 1200, 1600],
  alt: 'A gym filled with strength training machines and weights — temporary placeholder photography for the Membership section',
  focal: '50% 38%',
} as const;

/**
 * "Packages" — real pricing, supplied directly by the client. Two groups:
 * general gym Membership, and Personal Training (which bundles a diet
 * plan, workout plan, gym access, and 1-on-1 coaching). A tab toggle
 * switches between them. Every price below is exactly as given — nothing
 * inferred or rounded.
 */
export const packagesContent = {
  sectionIndex: '08',
  eyebrow: 'PACKAGES',
  headlineLines: ['PICK YOUR', 'STARTING POINT.'],
  paragraph: 'Straightforward pricing for gym membership and personal training.',
  membershipTabLabel: 'GYM MEMBERSHIP',
  personalTrainingTabLabel: 'PERSONAL TRAINING',
  bestValueBadge: 'BEST VALUE',
  ctaLabel: 'SELECT PACKAGE',
} as const;

export type PackageGroup = 'membership' | 'personal-training';

export type PackageTier = {
  group: PackageGroup;
  name: string;
  price: string;
  period: string;
  note?: string;
  description: string;
  features: readonly string[];
  bestValue?: boolean;
};

export const packages: readonly PackageTier[] = [
  // ---- General gym membership ----
  {
    group: 'membership',
    name: 'MONTHLY',
    price: '₹700',
    period: 'first month',
    note: '₹600/month after',
    description: 'No commitment — pay month to month.',
    features: ['Full gym floor access', 'Free weights & machines', 'Flexible hours'],
  },
  {
    group: 'membership',
    name: '3 MONTHS',
    price: '₹1,500',
    period: 'one-time',
    description: 'Three months, paid up front.',
    features: ['Full gym floor access', 'Free weights & machines', 'Flexible hours'],
  },
  {
    group: 'membership',
    name: '6 MONTHS',
    price: '₹3,000',
    period: 'one-time',
    description: 'Six months, paid up front.',
    features: ['Full gym floor access', 'Free weights & machines', 'Flexible hours'],
  },
  {
    group: 'membership',
    name: '12 MONTHS',
    price: '₹6,000',
    period: 'one-time',
    description: 'A full year, paid up front.',
    features: ['Full gym floor access', 'Free weights & machines', 'Flexible hours'],
    bestValue: true,
  },
  // ---- Personal training (diet plan + workout plan + gym fees + PT) ----
  {
    group: 'personal-training',
    name: 'MONTHLY',
    price: '₹5,000',
    period: '/ month',
    description: 'Diet plan, workout plan, gym fees & personal training.',
    features: ['Custom diet plan', 'Custom workout plan', 'Gym fees included', '1-on-1 coaching'],
  },
  {
    group: 'personal-training',
    name: '3 MONTHS',
    price: '₹12,000',
    period: 'one-time',
    description: 'Three months of full personal training.',
    features: ['Custom diet plan', 'Custom workout plan', 'Gym fees included', '1-on-1 coaching'],
  },
  {
    group: 'personal-training',
    name: '6 MONTHS',
    price: '₹24,000',
    period: 'one-time',
    description: 'Six months of full personal training.',
    features: ['Custom diet plan', 'Custom workout plan', 'Gym fees included', '1-on-1 coaching'],
  },
  {
    group: 'personal-training',
    name: '12 MONTHS',
    price: '₹48,000',
    period: 'one-time',
    description: 'A full year of full personal training.',
    features: ['Custom diet plan', 'Custom workout plan', 'Gym fees included', '1-on-1 coaching'],
    bestValue: true,
  },
] as const;

function packageWhatsAppMessage(pkg: PackageTier): string {
  const groupLabel = pkg.group === 'personal-training' ? 'Personal Training' : 'Membership';
  return `Hi Fitness Power House, I'd like to select the ${groupLabel} — ${pkg.name} package (${pkg.price}${pkg.note ? `, ${pkg.note}` : ` ${pkg.period}`}).`;
}

export { packageWhatsAppMessage };

/**
 * "The Standard" — a short manifesto: brand voice/values, not facts about
 * the business, so nothing here needs verification the way bio or pricing
 * copy does. Pure typography, revealed one line at a time on scroll.
 */
export const standardContent = {
  sectionIndex: '09',
  eyebrow: 'THE STANDARD',
  lines: [
    { prefix: 'SHOW', accent: 'UP.' },
    { prefix: 'DO THE', accent: 'WORK.' },
    { prefix: 'NO', accent: 'SHORTCUTS.' },
    { prefix: 'EARN', accent: 'IT.' },
  ],
} as const;

/**
 * Transformations — Ashwin's own real before/after photos, confirmed by
 * the client directly (not stock/demo images — see the client's own
 * uploaded originals). The "after" photo previously excluded the face
 * (an earlier crop cut it below the photographer's watermark, keeping
 * only the flexed arms/torso) — corrected per an explicit, non-negotiable
 * instruction that Ashwin's face must be visible in both images. Now
 * uses the same face-visible, watermark-free crop already established
 * for the About section (854×950, cropped from the bottom only). No
 * invented dates, durations, or measurements — none were provided, so
 * none are shown; the presentation stays visual and editorial instead
 * of filling that gap with fabricated numbers.
 */
export const transformationsContent = {
  sectionIndex: '10',
  sectionLabel: 'TRANSFORMATION',
  headlineLines: ['RESULTS,', 'EARNED ON', 'THE FLOOR.'],
  paragraph: "Ashwin's own transformation — the standard this gym is built around.",
  dragHint: 'DRAG TO COMPARE',
  counterLabel: '01 / 01',
} as const;

export type TransformationDemo = {
  label: string;
  duration: string;
  before: { src: string; alt: string; focal: string };
  after: { src: string; alt: string; focal: string };
};

export const transformations: readonly TransformationDemo[] = [
  {
    label: 'ASHWIN',
    duration: 'FOUNDER / TRAINER',
    before: {
      src: ashwinBeforePhoto,
      alt: 'Ashwin Sharma, before photo',
      focal: '50% 0%',
    },
    after: {
      src: ashwinAfterPhoto,
      alt: 'Ashwin Sharma, after photo — face visible, flexed arms and torso',
      focal: '50% 8%',
    },
  },
] as const;

/**
 * "Certificates & Licensing" — real certificates and registration, supplied
 * directly by the client (NSDC/Skill India certificate photo, the Sapphire
 * Fitness Academy CPT certificate PDF, and the FSSAI registration PDF —
 * the latter two converted to images from their source PDFs). No more
 * placeholders here; see the `certificates` array below for details on
 * each document.
 */
export const certificatesContent = {
  sectionIndex: '11',
  eyebrow: 'CERTIFICATES & LICENSING',
  headlineLines: ['VERIFIED &', 'REGISTERED.'],
  paragraph: `Real certifications held by ${business.owner}, and the gym's food safety registration — click any card to view it in full.`,
} as const;

export type Certificate = {
  label: string;
  issuer: string;
  image: string;
  alt: string;
};

/**
 * Real certificates, supplied by the client:
 * 1. NSDC/Skill India "Fitness Trainer" assessment (National Skills
 *    Qualifications Framework Level 4), issued by SPEFL-SC through
 *    Sapphire Fitness Academy.
 * 2. Sapphire Fitness Academy's own "Certified Personal Trainer"
 *    certificate (valid 18/08/2023–17/08/2026).
 * 3. The gym's FSSAI (Food Safety and Standards Authority of India)
 *    registration — Government of Madhya Pradesh, Registration No.
 *    21426790000687, valid through 23/04/2027. This is what makes it
 *    legitimate to sell supplements/nutrition products on-site.
 */
export const certificates: readonly Certificate[] = [
  {
    label: 'FITNESS TRAINER — NSDC',
    issuer: 'Skill India · National Skill Development Corporation',
    image: certNsdcImage,
    alt: 'NSDC Skill India certificate for Fitness Trainer (SPF/Q1107), issued to Ashwin Sharma by SPEFL-SC through Sapphire Fitness Academy',
  },
  {
    label: 'CERTIFIED PERSONAL TRAINER',
    issuer: 'Sapphire Fitness Academy',
    image: certCptImage,
    alt: 'Sapphire Fitness Academy Certified Personal Trainer certificate for Ashwin Sharma, valid 18/08/2023 to 17/08/2026',
  },
  {
    label: 'FSSAI REGISTRATION',
    issuer: 'Food Safety and Standards Authority of India',
    image: certFssaiImage,
    alt: 'FSSAI food business registration certificate, Government of Madhya Pradesh, registered to Ashwin Sharma, valid through 23/04/2027',
  },
] as const;

/**
 * "About" section — the owner's real story, supplied directly by him.
 * Structured for the web rather than pasted as one long block: a short
 * intro, a pull-quote pulled from his own words, then the complete story
 * available via a "read more" expansion so nothing he wrote gets cut,
 * just progressively disclosed. Section headings below match his own.
 */
export const aboutContent = {
  sectionIndex: '12',
  sectionLabel: 'ABOUT',
  eyebrow: 'FROM PASSION TO PURPOSE',
  headlineLines: ['MY', 'JOURNEY.'],
  intro:
    'I was not born a fitness expert. Like many people, I started with a desire to become stronger, healthier, and better than I was before. What began as a personal passion slowly became a way of life — and eventually, my purpose.',
  yearsLabel: '12+',
  yearsSubLabel: 'YEARS IN FITNESS',
  pullQuote:
    'I believe in discipline over motivation, consistency over shortcuts, and knowledge over myths.',
  readMoreLabel: 'READ THE FULL STORY',
  readLessLabel: 'SHOW LESS',
  fullStory: [
    {
      heading: 'Building Fitness Powerhouse',
      paragraphs: [
        'With 12+ years in the fitness industry, my journey has taken me from being a fitness enthusiast to becoming a professional trainer, diet coach, and gym owner. I have trained myself through different phases, experienced the struggles of changing my body, and understood firsthand that transformation is not always easy. That experience shaped the way I train and guide others.',
        'My biggest dream was to create a place where people could come not only to build their bodies, but also to build their confidence and mindset. That dream became Fitness Powerhouse Gym.',
        'For me, the gym is more than four walls filled with equipment. It is a place where someone who feels lost can find direction, where someone who lacks confidence can discover strength, and where ordinary people can achieve things they once thought were impossible.',
      ],
    },
    {
      heading: 'My Philosophy',
      paragraphs: [
        "I don't believe in magic formulas or overnight transformations. Every person's body is different. Every journey is different. My approach is to understand the individual, create a realistic strategy, and help them stay consistent long enough to see the results.",
        'I continue to learn because fitness is an ever-evolving field. My education and internationally accredited fitness training certification have helped me build my knowledge, but my greatest teacher has always been experience — years of training, coaching, observing, and learning from real people.',
      ],
    },
    {
      heading: 'Why I Do What I Do',
      paragraphs: [
        'Fitness changed me. It gave me discipline. It gave me confidence. It taught me resilience. And most importantly, it taught me that we are capable of much more than we believe.',
        'Whether your goal is to lose fat, build muscle, become stronger, improve your health, or simply become the best version of yourself, I want to help you build a sustainable lifestyle — not chase a temporary transformation.',
        'My journey is still going. And if you choose to train with me, your journey begins here too.',
      ],
    },
  ],
  ownerLabel: `${business.owner} — Founder, Fitness Trainer & Coach`,
  signatureLine: 'Train with purpose. Stay disciplined. Become stronger.',
  ownerInstagramLabel: 'FOLLOW ASHWIN',
  primaryCta: 'GET IN TOUCH',
  whatsAppMessage: "Hi Fitness Power House, I'd like to know more about the gym.",
} as const;

/**
 * Google Reviews section. No real customer reviews exist yet — this is
 * a genuinely different problem from the earlier stock-photo placeholder
 * pattern used elsewhere: inventing customer quotes, star ratings, or
 * names (even generic/unnamed ones) would be fabricating endorsements
 * that never happened, not just using atmospheric stock imagery. So the
 * carousel below does NOT contain fake reviews. Each card instead shows
 * a real, already-established fact (certification, experience, real
 * programs) styled as a card, plus a genuine CTA linking to the real
 * Google listing via `getGoogleReviewLink()` (business.ts) — which
 * itself honestly falls back to a Maps search when no verified Place ID
 * exists yet, rather than fabricating a review deep-link.
 */
export const googleReviewsSectionContent = {
  sectionIndex: '13',
  eyebrow: 'MEMBER EXPERIENCES',
  headlineLines: ['WHAT PEOPLE', 'SAY ABOUT', 'TRAINING HERE.'],
  paragraph:
    "There aren't any public reviews to show yet — these cards are placeholders for the interface, not real member quotes. Be the first to actually leave one.",
  ctaLabel: 'LEAVE A GOOGLE REVIEW',
  dragHint: 'DRAG TO EXPLORE',
  /**
   * Deliberately real facts, not fabricated first-person member quotes —
   * see the long comment above for why. Card `size` varies (sm/md/lg) so
   * the carousel has genuine visual rhythm without inventing testimonial
   * content to create that variation.
   */
  cards: [
    { size: 'lg', icon: 'shield', value: 'NSDC Certified', label: 'Real Trainer Credential', detail: 'Nationally recognized under the Skill India framework — not a self-issued title.' },
    { size: 'sm', icon: 'star', value: '12+ Years', label: 'Real Training Experience' },
    { size: 'md', icon: 'dumbbell', value: '4 Real Programs', label: 'Strength, PT, Functional Training, Open Gym Access' },
    { size: 'sm', icon: 'mapPin', value: 'Dewas, MP', label: 'A Real Local Gym' },
    { size: 'lg', icon: 'checkCircle', value: 'Sapphire CPT', label: 'Certified Personal Trainer', detail: 'Verified certification from Sapphire Fitness Academy, checkable on request.' },
    { size: 'md', icon: 'messageSquare', value: 'Your Turn', label: 'Be Our First Google Review' },
  ],
} as const;

export const aboutImage = {
  src: ownerAboutPhoto,
  alt: `${business.owner}, founder and trainer at ${business.name}, training with dumbbells`,
  credit: 'Photography: mr.CLICK Photography',
  /** Real photo, 854×950 — cropped from the bottom only (legs trimmed),
   * face and full torso kept intact, per explicit direction not to crop
   * from the top. */
  focal: '50% 8%',
} as const;

/**
 * FAQ. Every answer either restates something already established
 * elsewhere on the site (programs, focus areas) or routes specifics we
 * don't actually have confirmed (hours, exact pricing, exact address) to
 * WhatsApp — same honesty pattern as Membership/Transformations/About.
 */
export const faqContent = {
  sectionIndex: '14',
  eyebrow: 'FAQ',
  headlineLines: ['QUESTIONS?', 'WE\u2019VE GOT ANSWERS.'],
} as const;

export type FaqItem = { question: string; answer: string };

export const faqItems: readonly FaqItem[] = [
  {
    question: 'Do I need experience to train here?',
    answer:
      'No — Fitness Power House works for all levels, from complete beginners to experienced lifters. Personal Training and Open Gym Access cover both ends.',
  },
  {
    question: 'What programs do you offer?',
    answer:
      'Strength Training, Personal Training, Functional Training, and Open Gym Access — see the Programs section above, or take the quick quiz to find the right fit.',
  },
  {
    question: 'What are your membership options and pricing?',
    answer: "See the Packages section above for exact pricing — monthly, 3, 6, and 12-month options for both gym membership and personal training.",
  },
  {
    question: 'What are your operating hours?',
    answer: 'Hours are available on request — reach out on WhatsApp for current timings.',
  },
  {
    question: 'Where are you located?',
    answer: `${business.location.addressLine}, ${business.location.city}, ${business.location.state} ${business.location.postalCode}. See the map and get directions below.`,
  },
  {
    question: 'How do I get started?',
    answer: "Reach out on WhatsApp any time — we'll help you pick the right program and get you started.",
  },
] as const;

/**
 * "Find Us" — a real map centered on the gym's actual registered address
 * (from the FSSAI registration certificate) plus a contact form. There's
 * no backend, so — consistent with every other CTA on the site —
 * submitting the form builds a WhatsApp message from the fields and opens
 * WhatsApp rather than pretending to email/store anything.
 *
 * The map embed uses Google's no-API-key query embed
 * (`google.com/maps?q=...&output=embed`), which is fully interactive
 * (native pinch/scroll/button zoom, drag) without needing a Maps API key.
 * If the client sets up a Google Maps API key later, this can be upgraded
 * to the official Maps Embed API for long-term reliability.
 */
export const findUsContent = {
  sectionIndex: '15',
  eyebrow: 'FIND US',
  headlineLines: ['COME TRAIN', 'IN PERSON.'],
  paragraph: "Drop a pin, get directions, or send a message and we'll reply on WhatsApp.",
  mapQuery: `${business.location.addressLine}, ${business.location.city}, ${business.location.state} ${business.location.postalCode}`,
  directionsLabel: 'GET DIRECTIONS',
  formHeading: 'SEND A MESSAGE',
  nameLabel: 'NAME',
  phoneLabel: 'PHONE (OPTIONAL)',
  messageLabel: 'MESSAGE',
  messagePlaceholder: "Tell us what you're looking for…",
  submitLabel: 'SEND VIA WHATSAPP',
  submitNote: "Opens WhatsApp with your message pre-filled — nothing is stored or emailed.",
  errorMessage: 'Please enter your name and a message.',
} as const;

/**
 * Real Google Maps data, confirmed directly by the client: the official
 * embed iframe URL (from Google Maps' own "Share > Embed a map" feature
 * — tied to the verified real place listing, not a text-address guess)
 * and the short share link for "get directions" / general map links.
 */
export function getMapEmbedUrl(): string {
  return GOOGLE_MAPS_EMBED_URL;
}

export function getDirectionsUrl(): string {
  return GOOGLE_MAPS_SHORT_LINK;
}

export function buildContactWhatsAppMessage(name: string, phone: string, message: string): string {
  const phoneLine = phone.trim() ? ` My phone number is ${phone.trim()}.` : '';
  return `Hi Fitness Power House, my name is ${name.trim()}.${phoneLine} ${message.trim()}`;
}

/**
 * "Follow on Instagram" — a lean CTA banner, not a fake post grid. No real
 * handle or posts have been supplied yet (see getInstagramLink's TODO in
 * the constants above), so this deliberately avoids fabricating content —
 * same honesty pattern as Transformations and About.
 */
export const instagramContent = {
  sectionIndex: '16',
  eyebrow: 'INSTAGRAM',
  headlineLines: ['FOLLOW', 'THE FLOOR.'],
  paragraph: 'Training moments and program updates — over on Instagram.',
  ctaLabel: 'FOLLOW ON INSTAGRAM',
} as const;

/**
 * Google Review modal. IMPORTANT: fires automatically after the hero has
 * had a moment to settle (not instantly on load, and never while the
 * preloader is active). Per its explicit request, this shows on every
 * page load rather than being capped to once-per-session — worth
 * revisiting if it starts to feel aggressive to repeat visitors; a
 * sessionStorage/localStorage cooldown is a small follow-up change to
 * GoogleReviewModal.tsx if wanted.
 */
export const googleReviewContent = {
  headline: 'HOW ARE WE DOING?',
  paragraph: "If you've trained with us, a quick Google review helps other lifters in Dewas find us.",
  ctaLabel: 'LEAVE A REVIEW',
  dismissLabel: 'MAYBE LATER',
  delayMs: 2800,
} as const;

/**
 * Footer. No invented operating hours, no fabricated social links — only
 * what's actually known (location, WhatsApp contact). Copyright year is
 * computed at render time in Footer.tsx, never hard-coded.
 */
export const footerContent = {
  tagline: 'A strength-focused gym in Dewas, Madhya Pradesh.',
  hoursNote: 'Hours available on request.',
  ctaLabel: 'START YOUR TRANSFORMATION',
  whatsAppMessage: "Hi Fitness Power House, I'd like to know more about training here.",
  builtByLabel: 'Built by Exsora - under India’s Business Digitization Mission',
} as const;
