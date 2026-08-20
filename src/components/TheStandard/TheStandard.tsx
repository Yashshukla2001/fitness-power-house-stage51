import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { standardContent } from '../../config/business';
import './TheStandard.css';

gsap.registerPlugin(ScrollTrigger);

interface TheStandardProps {
  reducedMotion: boolean;
}

export function TheStandard({ reducedMotion }: TheStandardProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-standard-eyebrow]',
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        }
      );

      // each manifesto line reveals independently as it enters the
      // viewport — a true scroll "march", not a single batch reveal
      gsap.utils.toArray<HTMLElement>('[data-standard-line]').forEach((line) => {
        gsap.fromTo(
          line,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: line, start: 'top 82%', once: true },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="the-standard" ref={sectionRef} className="the-standard" aria-label="The Standard">
      <div className="the-standard__eyebrow-row" data-standard-eyebrow>
        <span className="the-standard__index">{standardContent.sectionIndex}</span>
        <span className="the-standard__eyebrow-line" aria-hidden="true" />
        <span className="the-standard__eyebrow">{standardContent.eyebrow}</span>
      </div>

      <div className="the-standard__lines">
        {standardContent.lines.map((line) => (
          <p className="the-standard__line" data-standard-line key={line.prefix + line.accent}>
            {line.prefix} <span className="the-standard__accent">{line.accent}</span>
          </p>
        ))}
      </div>
    </section>
  );
}
