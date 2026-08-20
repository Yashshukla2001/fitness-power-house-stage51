import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  quizContent,
  quizQuestions,
  programs,
  getWhatsAppLink,
  type ProgramKey,
} from '../../config/business';
import { onImageError } from '../../utils/onImageError';
import './ProgramQuiz.css';

gsap.registerPlugin(ScrollTrigger);

interface ProgramQuizProps {
  reducedMotion: boolean;
}

const TOTAL_STEPS = quizQuestions.length;

export function ProgramQuiz({ reducedMotion }: ProgramQuizProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(TOTAL_STEPS).fill(null));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-quiz-reveal]',
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

  function handleSelect(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = optionIndex;
      return next;
    });
    const delay = reducedMotion ? 0 : 280;
    window.setTimeout(() => setStep((s) => s + 1), delay);
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function handleRetake() {
    setAnswers(Array(TOTAL_STEPS).fill(null));
    setStep(0);
  }

  const resultKey: ProgramKey = useMemo(() => {
    const scores: Partial<Record<ProgramKey, number>> = {};
    quizQuestions.forEach((q, qi) => {
      const answerIndex = answers[qi];
      if (answerIndex == null) return;
      const option = q.options[answerIndex];
      (Object.entries(option.scores) as [ProgramKey, number][]).forEach(([key, value]) => {
        scores[key] = (scores[key] ?? 0) + value;
      });
    });

    let bestKey: ProgramKey = programs[0].key;
    let bestScore = -Infinity;
    programs.forEach((p) => {
      const s = scores[p.key] ?? 0;
      if (s > bestScore) {
        bestScore = s;
        bestKey = p.key;
      }
    });
    return bestKey;
  }, [answers]);

  const isResult = step >= TOTAL_STEPS;
  const resultProgram = programs.find((p) => p.key === resultKey) ?? programs[0];
  const progressPercent = (Math.min(step, TOTAL_STEPS) / TOTAL_STEPS) * 100;

  return (
    <section id="find-your-program" ref={sectionRef} className="program-quiz" aria-label="Find your program">
      <div className="program-quiz__header">
        <div className="program-quiz__eyebrow-row" data-quiz-reveal>
          <span className="program-quiz__index">{quizContent.sectionIndex}</span>
          <span className="program-quiz__eyebrow-line" aria-hidden="true" />
          <span className="program-quiz__eyebrow">{quizContent.eyebrow}</span>
        </div>

        <h2 className="program-quiz__headline" data-quiz-reveal>
          {quizContent.headlineLines.map((line) => (
            <span className="program-quiz__headline-line" key={line}>
              {line}
            </span>
          ))}
        </h2>

        <p className="program-quiz__paragraph" data-quiz-reveal>
          {quizContent.paragraph}
        </p>
      </div>

      <div className="program-quiz__card" data-quiz-reveal>
        <div className="program-quiz__progress-track" aria-hidden="true">
          <div className="program-quiz__progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        {!isResult ? (
          <div className="program-quiz__step" key={step}>
            <span className="program-quiz__step-label">
              {quizContent.stepLabel} 0{step + 1} / 0{TOTAL_STEPS}
            </span>

            <h3 className="program-quiz__question">{quizQuestions[step].question}</h3>

            <div className="program-quiz__options" role="group" aria-label={quizQuestions[step].question}>
              {quizQuestions[step].options.map((option, i) => (
                <button
                  type="button"
                  key={option.label}
                  className="program-quiz__option"
                  onClick={() => handleSelect(i)}
                  data-cursor="click"
                  data-cursor-label="SELECT"
                >
                  <span>{option.label}</span>
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </button>
              ))}
            </div>

            {step > 0 && (
              <button type="button" className="program-quiz__back" onClick={handleBack}>
                <ArrowLeft size={13} strokeWidth={1.75} aria-hidden="true" />
                <span>{quizContent.backLabel}</span>
              </button>
            )}
          </div>
        ) : (
          <div className="program-quiz__result" key="result">
            <span className="program-quiz__step-label">{quizContent.resultLabel}</span>

            <div className="program-quiz__result-body">
              <div className="program-quiz__result-frame">
                <img
                  className="program-quiz__result-image"
                  src={resultProgram.image.src}
                  alt=""
                  style={{ objectPosition: resultProgram.image.focal }}
                  onError={onImageError}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="program-quiz__result-info">
                <h3 className="program-quiz__result-title">{resultProgram.title}</h3>
                <p className="program-quiz__result-description">{resultProgram.description}</p>

                <a
                  href={getWhatsAppLink(resultProgram.whatsAppMessage)}
                  className="program-quiz__result-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="click"
                  data-cursor-label="CLICK"
                >
                  <span>
                    {quizContent.ctaPrefix} {resultProgram.title}
                  </span>
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </a>

                <button type="button" className="program-quiz__retake" onClick={handleRetake}>
                  {quizContent.retakeLabel}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
