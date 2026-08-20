import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';
import { membershipContent, membershipImage, getWhatsAppLink } from '../../config/business';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import { onImageError } from '../../utils/onImageError';
import './Membership.css';

gsap.registerPlugin(ScrollTrigger);

interface MembershipProps {
  reducedMotion: boolean;
  isTouch: boolean;
}

export function Membership({ reducedMotion, isTouch }: MembershipProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-membership-reveal]',
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

  const srcSet = membershipImage.srcSetSizes
    .map((w) => `${membershipImage.baseUrl}?auto=format&fit=crop&w=${w}&q=80 ${w}w`)
    .join(', ');

  return (
    <section id="membership" ref={sectionRef} className="membership" aria-label="Membership">
      <div className="membership__grid">
        <div className="membership__content">
          <div className="membership__eyebrow-row" data-membership-reveal>
            <span className="membership__index">{membershipContent.sectionIndex}</span>
            <span className="membership__eyebrow-line" aria-hidden="true" />
            <span className="membership__eyebrow">{membershipContent.sectionLabel}</span>
          </div>

          <h2 className="membership__headline" data-membership-reveal>
            {membershipContent.headlineLines.map((line) => (
              <span className="membership__headline-line" key={line}>
                {line}
              </span>
            ))}
          </h2>

          <p className="membership__paragraph" data-membership-reveal>
            {membershipContent.paragraph}
          </p>

          <ul className="membership__list" data-membership-reveal>
            {membershipContent.inclusions.map((item) => (
              <li className="membership__list-item" key={item}>
                <Check className="membership__list-icon" size={16} strokeWidth={2} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="membership__visual" data-membership-reveal>
          <div className="membership__visual-frame">
            <img
              className="membership__visual-image"
              src={membershipImage.src}
              srcSet={srcSet}
              sizes="(max-width: 899px) 100vw, 45vw"
              alt={membershipImage.alt}
              style={{ objectPosition: membershipImage.focal }}
              loading="lazy"
              decoding="async"
              onError={onImageError}
            />
            <div className="membership__visual-scrim" aria-hidden="true" />
          </div>

          <div className="membership__cta-card">
            <p className="membership__cta-note">{membershipContent.ctaNote}</p>
            <MagneticButton
              href={getWhatsAppLink(membershipContent.whatsAppMessage)}
              enabled={!reducedMotion && !isTouch}
              className="membership__cta-button"
              external
              ariaLabel={`${membershipContent.primaryCta} — contact Fitness Power House on WhatsApp`}
            >
              <span>{membershipContent.primaryCta}</span>
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
