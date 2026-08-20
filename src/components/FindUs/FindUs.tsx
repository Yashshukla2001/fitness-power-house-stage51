import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Send, MapPin } from 'lucide-react';
import {
  findUsContent,
  business,
  getMapEmbedUrl,
  getDirectionsUrl,
  buildContactWhatsAppMessage,
  getWhatsAppLink,
} from '../../config/business';
import './FindUs.css';

gsap.registerPlugin(ScrollTrigger);

/** This angled panel is now independent of Hero — Hero was rebuilt as a
 * full-bleed layout in Stage 24 and no longer has an angled panel of its
 * own (see the note at the top of Hero.tsx). This clip-path stands on
 * its own as Find Us's own structural signature. Must match the desktop
 * clip-path in FindUs.css. */
const PANEL_CLIP = 'polygon(0 0, 58% 0, 44% 100%, 0 100%)';

interface FindUsProps {
  reducedMotion: boolean;
}

export function FindUs({ reducedMotion }: FindUsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (panelRef.current) {
        gsap.set(panelRef.current, { clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)' });
        gsap.to(panelRef.current, {
          clipPath: PANEL_CLIP,
          duration: 0.9,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: section, start: 'top 70%', once: true },
        });
      }

      gsap.fromTo(
        '[data-findus-reveal]',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: 'top 70%', once: true },
        }
      );

      gsap.fromTo(
        '[data-findus-form-reveal]',
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.25,
          scrollTrigger: { trigger: section, start: 'top 60%', once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError(findUsContent.errorMessage);
      return;
    }
    setError(null);
    const whatsAppMessage = buildContactWhatsAppMessage(name, phone, message);
    window.open(getWhatsAppLink(whatsAppMessage), '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="find-us" ref={sectionRef} className="find-us" aria-label="Find us">
      <div className="find-us__stage">
        <div className="find-us__map-bg">
          <iframe
            className="find-us__map-iframe"
            src={getMapEmbedUrl()}
            title="Fitness Power House location map — Dewas, Madhya Pradesh"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="find-us__map-scrim" aria-hidden="true" />
        </div>

        <div ref={panelRef} className="find-us__panel">
          <div className="find-us__eyebrow-row" data-findus-reveal>
            <span className="find-us__index">{findUsContent.sectionIndex}</span>
            <span className="find-us__eyebrow-line" aria-hidden="true" />
            <span className="find-us__eyebrow">{findUsContent.eyebrow}</span>
          </div>

          <h2 className="find-us__headline" data-findus-reveal>
            {findUsContent.headlineLines.map((line) => (
              <span className="find-us__headline-line" key={line}>
                {line}
              </span>
            ))}
          </h2>

          <div className="find-us__address" data-findus-reveal>
            <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
            <span>
              {business.location.addressLine}, {business.location.city}, {business.location.state}{' '}
              {business.location.postalCode}
            </span>
          </div>

          <p className="find-us__paragraph" data-findus-reveal>
            {findUsContent.paragraph}
          </p>

          <a
            href={getDirectionsUrl()}
            className="find-us__directions"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="click"
            data-cursor-label="CLICK"
            data-findus-reveal
          >
            <span>{findUsContent.directionsLabel}</span>
            <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>

        <div className="find-us__form-float" data-findus-form-reveal>
          <h3 className="find-us__form-heading">{findUsContent.formHeading}</h3>

          <form className="find-us__form" onSubmit={handleSubmit}>
            <div className="find-us__field">
              <label htmlFor="findus-name">{findUsContent.nameLabel}</label>
              <input
                id="findus-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="find-us__field">
              <label htmlFor="findus-phone">{findUsContent.phoneLabel}</label>
              <input
                id="findus-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>

            <div className="find-us__field">
              <label htmlFor="findus-message">{findUsContent.messageLabel}</label>
              <textarea
                id="findus-message"
                rows={3}
                placeholder={findUsContent.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {error && (
              <p className="find-us__error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="find-us__submit">
              <span>{findUsContent.submitLabel}</span>
              <Send size={15} strokeWidth={1.75} aria-hidden="true" />
            </button>

            <p className="find-us__submit-note">{findUsContent.submitNote}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
