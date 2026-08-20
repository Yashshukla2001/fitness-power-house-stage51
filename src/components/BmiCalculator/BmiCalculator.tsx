import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { bmiContent, bmiCategories, getWhatsAppLink } from '../../config/business';
import './BmiCalculator.css';

gsap.registerPlugin(ScrollTrigger);

interface BmiCalculatorProps {
  reducedMotion: boolean;
}

type Unit = 'metric' | 'imperial';

type Result = { bmi: number; category: string };

function categorize(bmi: number): string {
  const match = bmiCategories.find((c) => bmi >= c.min && bmi < c.max);
  return match?.label ?? '';
}

export function BmiCalculator({ reducedMotion }: BmiCalculatorProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const [unit, setUnit] = useState<Unit>('metric');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weightLb, setWeightLb] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-bmi-reveal]',
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

  function handleUnitChange(next: Unit) {
    setUnit(next);
    setResult(null);
    setError(null);
  }

  function handleCalculate(e: FormEvent) {
    e.preventDefault();

    let bmi: number;

    if (unit === 'metric') {
      const h = parseFloat(heightCm);
      const w = parseFloat(weightKg);
      if (!(h > 0) || !(w > 0)) {
        setError(bmiContent.errorMessage);
        setResult(null);
        return;
      }
      const heightM = h / 100;
      bmi = w / (heightM * heightM);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inch;
      const w = parseFloat(weightLb);
      if (!(totalInches > 0) || !(w > 0)) {
        setError(bmiContent.errorMessage);
        setResult(null);
        return;
      }
      const heightM = totalInches * 0.0254;
      const weightKgConverted = w * 0.453592;
      bmi = weightKgConverted / (heightM * heightM);
    }

    setError(null);
    setResult({ bmi: Math.round(bmi * 10) / 10, category: categorize(bmi) });
  }

  function handleRecalculate() {
    setResult(null);
    setError(null);
  }

  return (
    <section id="bmi-calculator" ref={sectionRef} className="bmi" aria-label="BMI Calculator">
      <div className="bmi__header">
        <div className="bmi__eyebrow-row" data-bmi-reveal>
          <span className="bmi__index">{bmiContent.sectionIndex}</span>
          <span className="bmi__eyebrow-line" aria-hidden="true" />
          <span className="bmi__eyebrow">{bmiContent.eyebrow}</span>
        </div>

        <h2 className="bmi__headline" data-bmi-reveal>
          {bmiContent.headlineLines.map((line) => (
            <span className="bmi__headline-line" key={line}>
              {line}
            </span>
          ))}
        </h2>

        <p className="bmi__paragraph" data-bmi-reveal>
          {bmiContent.paragraph}
        </p>
      </div>

      <div className="bmi__card" data-bmi-reveal>
        <div className="bmi__unit-toggle" role="group" aria-label="Measurement unit">
          <button
            type="button"
            className={`bmi__unit-btn ${unit === 'metric' ? 'bmi__unit-btn--active' : ''}`}
            onClick={() => handleUnitChange('metric')}
          >
            {bmiContent.metricLabel}
          </button>
          <button
            type="button"
            className={`bmi__unit-btn ${unit === 'imperial' ? 'bmi__unit-btn--active' : ''}`}
            onClick={() => handleUnitChange('imperial')}
          >
            {bmiContent.imperialLabel}
          </button>
        </div>

        {!result ? (
          <form className="bmi__form" onSubmit={handleCalculate}>
            {unit === 'metric' ? (
              <div className="bmi__field-row">
                <div className="bmi__field">
                  <label htmlFor="bmi-height-cm">{bmiContent.heightLabel} (CM)</label>
                  <input
                    id="bmi-height-cm"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    placeholder="175"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                  />
                </div>
                <div className="bmi__field">
                  <label htmlFor="bmi-weight-kg">{bmiContent.weightLabel} (KG)</label>
                  <input
                    id="bmi-weight-kg"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    placeholder="70"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="bmi__field-row">
                <div className="bmi__field bmi__field--split">
                  <label htmlFor="bmi-height-ft">{bmiContent.heightLabel} (FT / IN)</label>
                  <div className="bmi__split-inputs">
                    <input
                      id="bmi-height-ft"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      placeholder="5"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                    />
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      placeholder="9"
                      aria-label={`${bmiContent.heightLabel} inches`}
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bmi__field">
                  <label htmlFor="bmi-weight-lb">{bmiContent.weightLabel} (LB)</label>
                  <input
                    id="bmi-weight-lb"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    placeholder="154"
                    value={weightLb}
                    onChange={(e) => setWeightLb(e.target.value)}
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="bmi__error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="bmi__submit">
              <span>{bmiContent.calculateLabel}</span>
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </form>
        ) : (
          <div className="bmi__result" role="status">
            <span className="bmi__result-label">{bmiContent.resultLabel}</span>
            <div className="bmi__result-value">
              <span className="bmi__result-number">{result.bmi}</span>
              <span className="bmi__result-category">{result.category}</span>
            </div>

            <p className="bmi__disclaimer">{bmiContent.disclaimer}</p>

            <div className="bmi__result-actions">
              <a
                href={getWhatsAppLink(bmiContent.whatsAppMessage)}
                className="bmi__cta"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="click"
                data-cursor-label="CLICK"
              >
                <span>{bmiContent.ctaLabel}</span>
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <button type="button" className="bmi__recalculate" onClick={handleRecalculate}>
                {bmiContent.recalculateLabel}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
