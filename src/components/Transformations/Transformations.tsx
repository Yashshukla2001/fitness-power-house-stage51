import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronsLeftRight } from 'lucide-react';
import { transformationsContent, transformations } from '../../config/business';
import { onImageError } from '../../utils/onImageError';
import './Transformations.css';

gsap.registerPlugin(ScrollTrigger);

interface TransformationsProps {
  reducedMotion: boolean;
}

/**
 * Transformations — editorial storytelling composition (vertical title /
 * massive drag visual / info panel) presenting Ashwin's own real
 * before/after photos, confirmed directly by the client. Previously this
 * section used demo stock photography, clearly labeled as such, while
 * waiting for real transformation photos; that placeholder era is over
 * now that real photos exist — see the comment above
 * `transformationsContent` in business.ts for photo-sourcing details.
 */
export function Transformations({ reducedMotion }: TransformationsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(30);
  const demo = transformations[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set(['[data-transformations-reveal]', '[data-transformations-visual]'], { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-transformations-reveal]',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        }
      );

      // cinematic reveal — the visual expands from slightly oversized
      // down to its natural size, rather than a plain fade
      gsap.fromTo(
        '[data-transformations-visual]',
        { autoAlpha: 0, scale: 1.08, clipPath: 'inset(6% 6% 6% 6%)' },
        {
          autoAlpha: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power3.out',
          clearProps: 'transform,clip-path',
          scrollTrigger: { trigger: visualRef.current, start: 'top 82%', once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="transformations" ref={sectionRef} className="transformations" aria-label="Transformations">
      <div className="transformations__composition">
        <div className="transformations__title-col" data-transformations-reveal>
          <div className="transformations__eyebrow-row">
            <span className="transformations__index">{transformationsContent.sectionIndex}</span>
            <span className="transformations__eyebrow-line" aria-hidden="true" />
            <span className="transformations__eyebrow">{transformationsContent.sectionLabel}</span>
          </div>

          <h2 className="transformations__headline">
            {transformationsContent.headlineLines.map((line) => (
              <span className="transformations__headline-line" key={line}>
                {line}
              </span>
            ))}
          </h2>

          <p className="transformations__paragraph">{transformationsContent.paragraph}</p>
        </div>

        <div ref={visualRef} className="transformations__visual" data-transformations-visual>
          <span className="transformations__counter">{transformationsContent.counterLabel}</span>

          <div className="transformations__slider">
            <div className="transformations__layer transformations__layer--after">
              <img
                className="transformations__image"
                src={demo.after.src}
                alt={demo.after.alt}
                style={{ objectPosition: demo.after.focal }}
                onError={onImageError}
                loading="lazy"
                decoding="async"
              />
              <span className="transformations__tag transformations__tag--after">AFTER</span>
            </div>

            <div
              className="transformations__layer transformations__layer--before"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <img
                className="transformations__image"
                src={demo.before.src}
                alt={demo.before.alt}
                style={{ objectPosition: demo.before.focal }}
                onError={onImageError}
                loading="lazy"
                decoding="async"
              />
              <span className="transformations__tag transformations__tag--before">BEFORE</span>
            </div>

            <div className="transformations__handle" style={{ left: `${position}%` }} aria-hidden="true">
              <span className="transformations__handle-line" />
              <span className="transformations__handle-grip">
                <ChevronsLeftRight size={16} strokeWidth={2} />
              </span>
            </div>

            <input
              type="range"
              className="transformations__range"
              min={0}
              max={100}
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              aria-label={`Drag to compare before and after — ${demo.label}`}
            />
          </div>

          <span className="transformations__drag-hint">
            <ChevronsLeftRight size={13} strokeWidth={2} aria-hidden="true" />
            {transformationsContent.dragHint}
          </span>
        </div>

        <div className="transformations__info-col" data-transformations-reveal>
          <span className="transformations__info-label">{demo.label}</span>
          <span className="transformations__info-duration">{demo.duration}</span>
        </div>
      </div>
    </section>
  );
}
