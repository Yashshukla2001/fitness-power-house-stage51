import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { faqContent, faqItems } from '../../config/business';
import './Faq.css';

gsap.registerPlugin(ScrollTrigger);

interface FaqProps {
  reducedMotion: boolean;
}

export function Faq({ reducedMotion }: FaqProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-faq-reveal]',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section id="faq" ref={sectionRef} className="faq" aria-label="Frequently asked questions">
      <div className="faq__header">
        <div className="faq__eyebrow-row" data-faq-reveal>
          <span className="faq__index">{faqContent.sectionIndex}</span>
          <span className="faq__eyebrow-line" aria-hidden="true" />
          <span className="faq__eyebrow">{faqContent.eyebrow}</span>
        </div>

        <h2 className="faq__headline" data-faq-reveal>
          {faqContent.headlineLines.map((line) => (
            <span className="faq__headline-line" key={line}>
              {line}
            </span>
          ))}
        </h2>
      </div>

      <div className="faq__list">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;

          return (
            <div className="faq__item" data-faq-reveal key={item.question}>
              <h3 className="faq__question-row">
                <button
                  type="button"
                  id={buttonId}
                  className="faq__question"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                >
                  <span>{item.question}</span>
                  <Plus className={`faq__icon ${isOpen ? 'faq__icon--open' : ''}`} size={18} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </h3>

              <div className={`faq__answer-wrap ${isOpen ? 'faq__answer-wrap--open' : ''}`}>
                <div className="faq__answer-inner">
                  <p
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="faq__answer"
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
