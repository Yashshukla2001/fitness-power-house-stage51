import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { instagramContent, getInstagramLink } from '../../config/business';
import './Instagram.css';

gsap.registerPlugin(ScrollTrigger);

interface InstagramProps {
  reducedMotion: boolean;
}

/** Minimal Instagram glyph — lucide-react doesn't ship brand icons. */
function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function Instagram({ reducedMotion }: InstagramProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-instagram-reveal]',
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: 'top 82%', once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="instagram" ref={sectionRef} className="instagram" aria-label="Instagram">
      <div className="instagram__glyph" data-instagram-reveal aria-hidden="true">
        <InstagramGlyph />
      </div>

      <div className="instagram__eyebrow-row" data-instagram-reveal>
        <span className="instagram__index">{instagramContent.sectionIndex}</span>
        <span className="instagram__eyebrow-line" aria-hidden="true" />
        <span className="instagram__eyebrow">{instagramContent.eyebrow}</span>
      </div>

      <h2 className="instagram__headline" data-instagram-reveal>
        {instagramContent.headlineLines.map((line) => (
          <span className="instagram__headline-line" key={line}>
            {line}
          </span>
        ))}
      </h2>

      <p className="instagram__paragraph" data-instagram-reveal>
        {instagramContent.paragraph}
      </p>

      <a
        href={getInstagramLink()}
        className="instagram__cta"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="click"
        data-cursor-label="CLICK"
        data-instagram-reveal
      >
        <span>{instagramContent.ctaLabel}</span>
        <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
      </a>
    </section>
  );
}
