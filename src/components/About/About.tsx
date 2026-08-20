import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { aboutContent, aboutImage, getWhatsAppLink, getOwnerInstagramLink } from '../../config/business';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import { onImageError } from '../../utils/onImageError';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  reducedMotion: boolean;
  isTouch: boolean;
}

/**
 * About — overlapping layered composition (one of three directions
 * presented and approved before building): a large photo sized to its
 * own real aspect ratio (854×538, landscape — no cropping needed since
 * the frame matches exactly), a floating stat card hanging off its
 * bottom-left corner, and the text content panel overlapping onto the
 * photo's right edge with its own solid background so legibility holds
 * even where it crosses over the image. Replaces the previous version's
 * small boxed photo floating in a large sea of empty space.
 */
export function About({ reducedMotion, isTouch }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const statRef = useRef<HTMLSpanElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);
  const [storyOpen, setStoryOpen] = useState(false);

  // ---- continuous ambient Ken Burns drift on the photo, for a premium
  // "never static" feel rather than a photo that just sits still ----
  useEffect(() => {
    if (reducedMotion) return;
    const img = photoImgRef.current;
    if (!img) return;

    const tween = gsap.to(img, {
      scale: 1.06,
      duration: 12,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

  // ---- subtle mouse-responsive 3D tilt on the photo (desktop only) ----
  useEffect(() => {
    if (reducedMotion || isTouch) return;
    const wrap = photoWrapRef.current;
    if (!wrap) return;

    const rotateX = gsap.quickTo(wrap, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const rotateY = gsap.quickTo(wrap, 'rotationY', { duration: 0.6, ease: 'power3.out' });

    function onMove(e: MouseEvent) {
      const rect = wrap!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY(relX * 8);
      rotateX(relY * -8);
    }
    function onLeave() {
      rotateX(0);
      rotateY(0);
    }

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, [reducedMotion, isTouch]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-about-reveal]',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Count up the "12+ years" stat from 0 once it scrolls into view,
  // instead of it just sitting there static from the first frame.
  useEffect(() => {
    const section = sectionRef.current;
    const statEl = statRef.current;
    if (!section || !statEl) return;

    const suffix = aboutContent.yearsLabel.replace(/[0-9]/g, '');
    const target = parseInt(aboutContent.yearsLabel, 10) || 0;

    if (reducedMotion) {
      statEl.textContent = aboutContent.yearsLabel;
      return;
    }

    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: target,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: statEl, start: 'top 88%', once: true },
        onUpdate: () => {
          statEl.textContent = `${Math.round(counter.val)}${suffix}`;
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="about" ref={sectionRef} className="about" aria-label="About">
      <div className="about__composition">
        <div ref={photoWrapRef} className="about__photo-large" data-about-reveal>
          <img
            ref={photoImgRef}
            className="about__photo-image"
            src={aboutImage.src}
            alt={aboutImage.alt}
            style={{ objectPosition: aboutImage.focal }}
            onError={onImageError}
            loading="lazy"
            decoding="async"
          />
          {aboutImage.credit && <span className="about__photo-credit">{aboutImage.credit}</span>}
        </div>

        <div className="about__stat-card" data-about-reveal>
          <span className="about__stat-number" ref={statRef}>
            0{aboutContent.yearsLabel.replace(/[0-9]/g, '')}
          </span>
          <span className="about__stat-label">{aboutContent.yearsSubLabel}</span>
        </div>

        <div className="about__content">
          <div className="about__eyebrow-row" data-about-reveal>
            <span className="about__index">{aboutContent.sectionIndex}</span>
            <span className="about__eyebrow-line" aria-hidden="true" />
            <span className="about__eyebrow">{aboutContent.eyebrow}</span>
          </div>

          <h2 className="about__headline" data-about-reveal>
            {aboutContent.headlineLines.map((line) => (
              <span className="about__headline-line" key={line}>
                {line}
              </span>
            ))}
          </h2>

          <p className="about__paragraph" data-about-reveal>
            {aboutContent.intro}
          </p>

          <blockquote className="about__quote" data-about-reveal>
            &ldquo;{aboutContent.pullQuote}&rdquo;
          </blockquote>

          <p className="about__owner" data-about-reveal>
            {aboutContent.ownerLabel}
          </p>
          <p className="about__signature" data-about-reveal>
            {aboutContent.signatureLine}
          </p>

          <div className="about__actions" data-about-reveal>
            <MagneticButton
              href={getWhatsAppLink(aboutContent.whatsAppMessage)}
              enabled={!reducedMotion && !isTouch}
              className="about__cta"
              external
              ariaLabel={`${aboutContent.primaryCta} — contact Fitness Power House on WhatsApp`}
            >
              <span>{aboutContent.primaryCta}</span>
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </MagneticButton>

            <a
              href={getOwnerInstagramLink()}
              className="about__instagram"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="click"
              data-cursor-label="CLICK"
            >
              <span>{aboutContent.ownerInstagramLabel}</span>
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            className="about__read-more"
            onClick={() => setStoryOpen((v) => !v)}
            aria-expanded={storyOpen}
            aria-controls="about-full-story"
            data-about-reveal
          >
            <span>{storyOpen ? aboutContent.readLessLabel : aboutContent.readMoreLabel}</span>
            <ChevronDown
              size={15}
              strokeWidth={2}
              className={`about__read-more-icon ${storyOpen ? 'about__read-more-icon--open' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div id="about-full-story" className={`about__story-wrap ${storyOpen ? 'about__story-wrap--open' : ''}`}>
        <div className="about__story-inner">
          <div className="about__story-grid">
            {aboutContent.fullStory.map((block) => (
              <div className="about__story-block" key={block.heading}>
                <h3 className="about__story-heading">{block.heading}</h3>
                {block.paragraphs.map((p, i) => (
                  <p className="about__story-paragraph" key={i}>
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
