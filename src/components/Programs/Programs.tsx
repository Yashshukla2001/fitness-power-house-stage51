import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { programsContent, programs, getWhatsAppLink } from '../../config/business';
import './Programs.css';

gsap.registerPlugin(ScrollTrigger);

interface ProgramsProps {
  reducedMotion: boolean;
  isTouch: boolean;
}

export function Programs({ reducedMotion, isTouch }: ProgramsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [erroredIndices, setErroredIndices] = useState<Set<number>>(new Set());
  const showPreview = !isTouch;

  // ---- entrance: header + rows reveal once, on scroll into view ----
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-programs-reveal]',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="programs" ref={sectionRef} className="programs" aria-label="Programs">
      <div className="programs__header">
        <div className="programs__eyebrow-row" data-programs-reveal>
          <span className="programs__index">{programsContent.sectionIndex}</span>
          <span className="programs__eyebrow-line" aria-hidden="true" />
          <span className="programs__eyebrow">{programsContent.sectionLabel}</span>
        </div>

        <h2 className="programs__headline" data-programs-reveal>
          {programsContent.headlineLines.map((line) => (
            <span className="programs__headline-line" key={line}>
              {line}
            </span>
          ))}
        </h2>

        <p className="programs__paragraph" data-programs-reveal>
          {programsContent.paragraph}
        </p>
      </div>

      <div className={`programs__body ${showPreview ? '' : 'programs__body--no-preview'}`}>
        <ul className="programs__list">
          {programs.map((program, i) => (
            <li key={program.index} className="programs__item" data-programs-reveal>
              <a
                href={getWhatsAppLink(program.whatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="programs__row"
                data-cursor="click"
                data-cursor-label="ASK"
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
              >
                <span className="programs__row-index">{program.index}</span>
                <span className="programs__row-body">
                  <span className="programs__row-title">{program.title}</span>
                  <span className="programs__row-description">{program.description}</span>
                </span>
                <ArrowUpRight className="programs__row-arrow" size={20} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        {showPreview && (
          <div className="programs__preview" aria-hidden="true">
            <div className="programs__preview-frame">
              {programs.map((program, i) => (
                <img
                  key={program.index}
                  className="programs__preview-image"
                  src={program.image.src}
                  alt=""
                  style={{
                    objectPosition: program.image.focal,
                    opacity: i === activeIndex && !erroredIndices.has(i) ? 1 : 0,
                  }}
                  loading="lazy"
                  decoding="async"
                  onError={() => setErroredIndices((prev) => new Set(prev).add(i))}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
