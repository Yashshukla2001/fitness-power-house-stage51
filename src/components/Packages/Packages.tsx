import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';
import {
  packagesContent,
  packages,
  packageWhatsAppMessage,
  getWhatsAppLink,
  type PackageGroup,
} from '../../config/business';
import './Packages.css';

gsap.registerPlugin(ScrollTrigger);

interface PackagesProps {
  reducedMotion: boolean;
}

export function Packages({ reducedMotion }: PackagesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeGroup, setActiveGroup] = useState<PackageGroup>('membership');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-packages-reveal]',
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
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Re-run the card entrance animation whenever the visible group changes
  // (new cards mount fresh each time since they're keyed by group+name).
  useEffect(() => {
    if (reducedMotion) return;
    const cards = gsap.utils.toArray<HTMLElement>('[data-package-card]');
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', clearProps: 'transform' }
    );
  }, [activeGroup, reducedMotion]);

  const visiblePackages = packages.filter((pkg) => pkg.group === activeGroup);

  return (
    <section id="packages" ref={sectionRef} className="packages" aria-label="Packages">
      <div className="packages__header">
        <div className="packages__eyebrow-row" data-packages-reveal>
          <span className="packages__index">{packagesContent.sectionIndex}</span>
          <span className="packages__eyebrow-line" aria-hidden="true" />
          <span className="packages__eyebrow">{packagesContent.eyebrow}</span>
        </div>

        <h2 className="packages__headline" data-packages-reveal>
          {packagesContent.headlineLines.map((line) => (
            <span className="packages__headline-line" key={line}>
              {line}
            </span>
          ))}
        </h2>

        <p className="packages__paragraph" data-packages-reveal>
          {packagesContent.paragraph}
        </p>

        <div className="packages__tabs" role="group" aria-label="Package type" data-packages-reveal>
          <button
            type="button"
            className={`packages__tab ${activeGroup === 'membership' ? 'packages__tab--active' : ''}`}
            onClick={() => setActiveGroup('membership')}
          >
            {packagesContent.membershipTabLabel}
          </button>
          <button
            type="button"
            className={`packages__tab ${activeGroup === 'personal-training' ? 'packages__tab--active' : ''}`}
            onClick={() => setActiveGroup('personal-training')}
          >
            {packagesContent.personalTrainingTabLabel}
          </button>
        </div>
      </div>

      <div className="packages__grid">
        {visiblePackages.map((pkg) => (
          <div
            className={`packages__card ${pkg.bestValue ? 'packages__card--popular' : ''}`}
            data-package-card
            key={`${pkg.group}-${pkg.name}`}
          >
            {pkg.bestValue && <span className="packages__popular-badge">{packagesContent.bestValueBadge}</span>}

            <h3 className="packages__card-name">{pkg.name}</h3>

            <div className="packages__card-price">
              <span className="packages__card-price-number">{pkg.price}</span>
              <span className="packages__card-price-period">{pkg.period}</span>
            </div>
            {pkg.note && <p className="packages__card-note">{pkg.note}</p>}

            <p className="packages__card-description">{pkg.description}</p>

            <ul className="packages__card-features">
              {pkg.features.map((feature) => (
                <li key={feature}>
                  <Check size={15} strokeWidth={2} className="packages__card-check" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={getWhatsAppLink(packageWhatsAppMessage(pkg))}
              className="packages__card-cta"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="click"
              data-cursor-label="SELECT"
            >
              <span>{packagesContent.ctaLabel}</span>
              <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
