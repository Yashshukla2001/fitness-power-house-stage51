import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Star,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Shield,
  Dumbbell,
  MapPin,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { googleReviewsSectionContent, getGoogleReviewLink } from '../../config/business';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import './GoogleReviews.css';

gsap.registerPlugin(ScrollTrigger);

const CARD_ICONS = {
  shield: Shield,
  star: Star,
  dumbbell: Dumbbell,
  mapPin: MapPin,
  checkCircle: CheckCircle2,
  messageSquare: MessageSquare,
} as const;

interface GoogleReviewsProps {
  reducedMotion: boolean;
  isTouch: boolean;
}

const REPEATS = 3;

/**
 * Google/member-experiences section — a premium drag carousel: infinite
 * auto-scroll, pauses on hover and drag, real pointer/touch drag physics,
 * and continuous depth scaling (cards near the viewport center read
 * larger/brighter than cards further away). Deliberately does NOT
 * contain fabricated first-person member testimonials — a detailed
 * brief asked for realistic-sounding demo quotes attributed to invented
 * local names, carefully caveated as "not verified reviews." Declined:
 * even clearly labeled, a specific quote attributed to a name like
 * "Rahul S., Dewas" is far more likely to be mistaken for a genuine
 * review than a generic demo photo would be for a genuine client photo
 * — different in kind from the stock-photo placeholders used elsewhere
 * in this project. Cards show real, already-established facts instead,
 * with varied sizes for genuine visual rhythm. No in-site review
 * submission exists here by explicit request — the only review CTA
 * links out to the business's actual Google listing.
 */
export function GoogleReviews({ reducedMotion, isTouch }: GoogleReviewsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef(0);
  const setWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, pos: 0 });
  const resumeTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = googleReviewsSectionContent.cards;
  const repeated = Array.from({ length: REPEATS }, () => cards).flat();

  // ---- entrance reveal ----
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set(['[data-reviews-header-reveal]', '[data-reviews-carousel-reveal]', '[data-reviews-cta-reveal]'], {
        autoAlpha: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-reviews-header-reveal]',
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        }
      );
      gsap.fromTo(
        '[data-reviews-carousel-reveal]',
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.google-reviews__viewport', start: 'top 85%', once: true },
        }
      );
      gsap.fromTo(
        '[data-reviews-cta-reveal]',
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.google-reviews__cta-panel', start: 'top 88%', once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // ---- measure one full set's width once cards are laid out ----
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const total = track.scrollWidth;
    setWidthRef.current = total / REPEATS;
    posRef.current = -setWidthRef.current;
    gsap.set(track, { x: posRef.current });
  }, []);

  // ---- the single per-frame loop: applies position + depth scaling.
  // Autoplay, drag, and button nudges all just modify posRef.current
  // between frames — there's only one thing ever writing the transform,
  // so there's no conflict between an animated tween and a manual set. ----
  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const SPEED = 34; // px/sec

    function frame(_time: number, deltaMs: number) {
      const setWidth = setWidthRef.current;
      if (!setWidth) return;

      if (!draggingRef.current && !pausedRef.current) {
        posRef.current -= SPEED * (deltaMs / 1000);
      }

      // wrap seamlessly within the middle repeat's range
      if (posRef.current <= -setWidth * 2) posRef.current += setWidth;
      if (posRef.current > 0) posRef.current -= setWidth;

      gsap.set(track!, { x: posRef.current });

      // depth scaling — distance of each card from the viewport center
      const vpRect = viewport!.getBoundingClientRect();
      const center = vpRect.left + vpRect.width / 2;
      let nearestIndex = 0;
      let nearestDist = Infinity;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const dist = Math.abs(cardCenter - center);
        const t = Math.min(dist / (vpRect.width * 0.6), 1);
        const scale = 1 - t * 0.1;
        const opacity = 1 - t * 0.45;
        card.style.transform = `scale(${scale})`;
        card.style.opacity = String(opacity);

        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIndex = i % cards.length;
        }
      });

      setActiveIndex((prev) => (prev !== nearestIndex ? nearestIndex : prev));
    }

    gsap.ticker.add(frame);
    return () => {
      gsap.ticker.remove(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  // ---- drag / touch: pause autoplay, follow pointer, resume after a
  // short delay on release ----
  useEffect(() => {
    if (reducedMotion) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    function onPointerDown(e: PointerEvent) {
      draggingRef.current = true;
      dragStartRef.current = { x: e.clientX, pos: posRef.current };
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
      viewport!.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      if (!draggingRef.current) return;
      const delta = e.clientX - dragStartRef.current.x;
      posRef.current = dragStartRef.current.pos + delta;
    }
    function onPointerUp() {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      resumeTimerRef.current = window.setTimeout(() => {
        pausedRef.current = false;
      }, 600);
    }

    viewport.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      viewport.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, [reducedMotion]);

  // ---- pause on hover (desktop only) ----
  useEffect(() => {
    if (reducedMotion || isTouch) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    function onEnter() {
      pausedRef.current = true;
    }
    function onLeave() {
      if (!draggingRef.current) pausedRef.current = false;
    }

    viewport.addEventListener('mouseenter', onEnter);
    viewport.addEventListener('mouseleave', onLeave);
    return () => {
      viewport.removeEventListener('mouseenter', onEnter);
      viewport.removeEventListener('mouseleave', onLeave);
    };
  }, [reducedMotion, isTouch]);

  function nudge(direction: 1 | -1) {
    const setWidth = setWidthRef.current;
    if (!setWidth) return;
    const cardWidth = setWidth / cards.length;
    pausedRef.current = true;
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    gsap.to(posRef, {
      current: posRef.current - direction * cardWidth,
      duration: 0.6,
      ease: 'power3.out',
    });
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, 1200);
  }

  return (
    <section id="google-reviews" ref={sectionRef} className="google-reviews" aria-label="Member experiences">
      <div className="google-reviews__bg-word" aria-hidden="true">
        TRUST
      </div>

      <div className="google-reviews__header">
        <div className="google-reviews__eyebrow-row" data-reviews-header-reveal>
          <span className="google-reviews__index">{googleReviewsSectionContent.sectionIndex}</span>
          <span className="google-reviews__eyebrow-line" aria-hidden="true" />
          <span className="google-reviews__eyebrow">{googleReviewsSectionContent.eyebrow}</span>
        </div>

        <h2 className="google-reviews__headline" data-reviews-header-reveal>
          {googleReviewsSectionContent.headlineLines.map((line) => (
            <span className="google-reviews__headline-line" key={line}>
              {line}
            </span>
          ))}
        </h2>

        <p className="google-reviews__paragraph" data-reviews-header-reveal>
          {googleReviewsSectionContent.paragraph}
        </p>
      </div>

      <div
        ref={viewportRef}
        className="google-reviews__viewport"
        data-reviews-carousel-reveal
        data-cursor="drag"
        data-cursor-label="DRAG"
      >
        <div ref={trackRef} className="google-reviews__track">
          {repeated.map((card, i) => {
            const Icon = CARD_ICONS[card.icon as keyof typeof CARD_ICONS];
            return (
              <div
                className={`google-reviews__card google-reviews__card--${card.size}`}
                key={`${i}-${card.value}`}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <span className="google-reviews__card-quote-mark" aria-hidden="true">
                  &rdquo;
                </span>
                <span className="google-reviews__card-icon">
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                <span className="google-reviews__card-value">{card.value}</span>
                <span className="google-reviews__card-label">{card.label}</span>
                {'detail' in card && card.detail && (
                  <span className="google-reviews__card-detail">{card.detail}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="google-reviews__controls">
        <button
          type="button"
          className="google-reviews__control-btn"
          onClick={() => nudge(-1)}
          aria-label="Previous"
          data-cursor="click"
          data-cursor-label="PREV"
        >
          <ArrowLeft size={16} strokeWidth={1.75} />
        </button>

        <span className="google-reviews__counter">
          {String(activeIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
        </span>

        <span className="google-reviews__drag-hint">{googleReviewsSectionContent.dragHint}</span>

        <button
          type="button"
          className="google-reviews__control-btn"
          onClick={() => nudge(1)}
          aria-label="Next"
          data-cursor="click"
          data-cursor-label="NEXT"
        >
          <ArrowRight size={16} strokeWidth={1.75} />
        </button>
      </div>

      <div className="google-reviews__cta-panel">
        <div className="google-reviews__cta-stars" data-reviews-cta-reveal aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={20} strokeWidth={1.5} className="google-reviews__cta-star" />
          ))}
        </div>

        <p className="google-reviews__cta-copy" data-reviews-cta-reveal>
          No reviews yet — yours could be the first one people see.
        </p>

        <div className="google-reviews__cta-row" data-reviews-cta-reveal>
          <MagneticButton
            href={getGoogleReviewLink()}
            enabled={!reducedMotion && !isTouch}
            className="google-reviews__cta-button"
            external
            cursorLabel="RATE US"
            ariaLabel={`${googleReviewsSectionContent.ctaLabel} on Google`}
          >
            <span>{googleReviewsSectionContent.ctaLabel}</span>
            <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
