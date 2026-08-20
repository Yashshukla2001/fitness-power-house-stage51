import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theGymContent, theGymGallery } from '../../config/business';
import { onImageError } from '../../utils/onImageError';
import './TheGym.css';

gsap.registerPlugin(ScrollTrigger);

interface TheGymProps {
  reducedMotion: boolean;
}

/**
 * "The Gym" — all four real photographs of the actual floor, in one
 * continuously auto-scrolling carousel (not a single hero image, not a
 * static grid) — per explicit direction to use every photo, not just
 * the strongest one. Pauses on hover; each card also lifts and
 * brightens individually on hover for a premium, "alive" feel.
 */
export function TheGym({ reducedMotion }: TheGymProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set(['[data-gym-reveal]', '[data-gym-track-reveal]'], { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-gym-reveal]',
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        }
      );

      gsap.fromTo(
        '[data-gym-track-reveal]',
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: trackRef.current, start: 'top 85%', once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  const repeated = [...theGymGallery, ...theGymGallery];

  return (
    <section id="the-gym" ref={sectionRef} className="the-gym" aria-label="The Gym">
      <div className="the-gym__header">
        <div className="the-gym__eyebrow-row" data-gym-reveal>
          <span className="the-gym__index">{theGymContent.sectionIndex}</span>
          <span className="the-gym__eyebrow-line" aria-hidden="true" />
          <span className="the-gym__eyebrow">{theGymContent.sectionLabel}</span>
        </div>

        <h2 className="the-gym__headline" data-gym-reveal>
          {theGymContent.headlineLines.map((line) => (
            <span className="the-gym__headline-line" key={line}>
              {line}
            </span>
          ))}
        </h2>

        <p className="the-gym__paragraph" data-gym-reveal>
          {theGymContent.paragraph}
        </p>
      </div>

      <div className="the-gym__carousel" data-gym-track-reveal>
        <div ref={trackRef} className="the-gym__track">
          {repeated.map((photo, i) => (
            <div className="the-gym__card" key={`${i}-${photo.caption}`}>
              <img
                className="the-gym__card-image"
                src={photo.src}
                alt={photo.alt}
                loading={i < theGymGallery.length ? 'eager' : 'lazy'}
                decoding="async"
                onError={onImageError}
              />
              <span className="the-gym__card-caption">{photo.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
