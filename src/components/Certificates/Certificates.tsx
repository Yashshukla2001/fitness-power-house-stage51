import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';
import { certificatesContent, certificates, type Certificate } from '../../config/business';
import { onImageError } from '../../utils/onImageError';
import './Certificates.css';

gsap.registerPlugin(ScrollTrigger);

interface CertificatesProps {
  reducedMotion: boolean;
  isTouch: boolean;
}

function TiltCard({
  cert,
  index,
  enabled,
  onOpen,
}: {
  cert: Certificate;
  index: number;
  enabled: boolean;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const card = cardRef.current;
    if (!card) return;

    const rotationX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const rotationY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    const scale = gsap.quickTo(card, 'scale', { duration: 0.5, ease: 'power3.out' });

    function onMove(e: MouseEvent) {
      const rect = card!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      rotationX(relY * -10);
      rotationY(relX * 10);
    }

    function onEnter() {
      scale(1.03);
    }

    function onLeave() {
      rotationX(0);
      rotationY(0);
      scale(1);
    }

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  return (
    <div className="certificates__tilt-wrap" data-cert-reveal data-ghost-index={`0${index + 1}`}>
      <button
        type="button"
        ref={cardRef}
        className="certificates__card"
        onClick={onOpen}
        data-cursor="click"
        data-cursor-label="VIEW"
        aria-label={`View full-size: ${cert.label}`}
      >
        <span className="certificates__card-index">0{index + 1}</span>

        <div className="certificates__card-image-wrap">
          <img
            className="certificates__card-image"
            src={cert.image}
            alt={cert.alt}
            loading="lazy"
            decoding="async"
            onError={onImageError}
          />
          <span className="certificates__card-zoom" aria-hidden="true">
            <ZoomIn size={16} strokeWidth={1.75} />
          </span>
        </div>

        <span className="certificates__card-label">{cert.label}</span>
        <span className="certificates__card-issuer">{cert.issuer}</span>
      </button>
    </div>
  );
}

export function Certificates({ reducedMotion, isTouch }: CertificatesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const tiltEnabled = !reducedMotion && !isTouch;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cert-header-reveal]',
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
        '[data-cert-reveal]',
        { autoAlpha: 0, y: 36, rotationX: -8 },
        {
          autoAlpha: 1,
          y: 0,
          rotationX: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'transform',
          scrollTrigger: { trigger: '.certificates__grid', start: 'top 85%', once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenIndex(null);
    }
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [openIndex]);

  const openCert = openIndex !== null ? certificates[openIndex] : null;

  return (
    <section id="certificates" ref={sectionRef} className="certificates" aria-label="Certificates and licensing">
      <div className="certificates__header">
        <div className="certificates__eyebrow-row" data-cert-header-reveal>
          <span className="certificates__index">{certificatesContent.sectionIndex}</span>
          <span className="certificates__eyebrow-line" aria-hidden="true" />
          <span className="certificates__eyebrow">{certificatesContent.eyebrow}</span>
        </div>

        <h2 className="certificates__headline" data-cert-header-reveal>
          {certificatesContent.headlineLines.map((line) => (
            <span className="certificates__headline-line" key={line}>
              {line}
            </span>
          ))}
        </h2>

        <p className="certificates__paragraph" data-cert-header-reveal>
          {certificatesContent.paragraph}
        </p>
      </div>

      <div className="certificates__grid">
        {certificates.map((cert, i) => (
          <TiltCard cert={cert} index={i} enabled={tiltEnabled} key={cert.label} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>

      {openCert && (
        <div className="certificates__lightbox" role="dialog" aria-modal="true" aria-label={openCert.label}>
          <button
            type="button"
            className="certificates__lightbox-backdrop"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
          />
          <div className="certificates__lightbox-content">
            <button type="button" className="certificates__lightbox-close" onClick={() => setOpenIndex(null)} aria-label="Close">
              <X size={20} strokeWidth={1.75} />
            </button>
            <img className="certificates__lightbox-image" src={openCert.image} alt={openCert.alt} />
            <div className="certificates__lightbox-caption">
              <span>{openCert.label}</span>
              <span>{openCert.issuer}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
