import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ArrowRight, Dumbbell } from 'lucide-react';
import {
  exerciseFinderContent,
  bodyParts,
  exercises,
  getWhatsAppLink,
  type BodyPart,
} from '../../config/business';
import './ExerciseFinder.css';

gsap.registerPlugin(ScrollTrigger);

interface ExerciseFinderProps {
  reducedMotion: boolean;
}

type FilterValue = BodyPart | 'ALL';

export function ExerciseFinder({ reducedMotion }: ExerciseFinderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterValue>('ALL');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-exercise-reveal]',
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

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exercises.filter((ex) => {
      const matchesFilter = filter === 'ALL' || ex.bodyPart === filter;
      const matchesQuery = q === '' || ex.name.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <section id="exercise-finder" ref={sectionRef} className="exercise-finder" aria-label="Exercise finder">
      <div className="exercise-finder__header">
        <div className="exercise-finder__eyebrow-row" data-exercise-reveal>
          <span className="exercise-finder__index">{exerciseFinderContent.sectionIndex}</span>
          <span className="exercise-finder__eyebrow-line" aria-hidden="true" />
          <span className="exercise-finder__eyebrow">{exerciseFinderContent.eyebrow}</span>
        </div>

        <h2 className="exercise-finder__headline" data-exercise-reveal>
          {exerciseFinderContent.headlineLines.map((line) => (
            <span className="exercise-finder__headline-line" key={line}>
              {line}
            </span>
          ))}
        </h2>

        <p className="exercise-finder__paragraph" data-exercise-reveal>
          {exerciseFinderContent.paragraph}
        </p>
      </div>

      <div className="exercise-finder__card" data-exercise-reveal>
        <div className="exercise-finder__search-row">
          <Search size={16} strokeWidth={1.75} className="exercise-finder__search-icon" aria-hidden="true" />
          <input
            type="text"
            className="exercise-finder__search-input"
            placeholder={exerciseFinderContent.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search exercises by name"
          />
        </div>

        <div className="exercise-finder__filters" role="group" aria-label="Filter by body part">
          <button
            type="button"
            className={`exercise-finder__filter ${filter === 'ALL' ? 'exercise-finder__filter--active' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            {exerciseFinderContent.allFilterLabel}
          </button>
          {bodyParts.map((part) => (
            <button
              type="button"
              key={part}
              className={`exercise-finder__filter ${filter === part ? 'exercise-finder__filter--active' : ''}`}
              onClick={() => setFilter(part)}
            >
              {part}
            </button>
          ))}
        </div>

        <div className="exercise-finder__results" aria-live="polite">
          {results.length === 0 ? (
            <p className="exercise-finder__empty">{exerciseFinderContent.emptyState}</p>
          ) : (
            <ul className="exercise-finder__list">
              {results.map((ex) => (
                <li className="exercise-finder__item" key={ex.name}>
                  <Dumbbell size={15} strokeWidth={1.75} className="exercise-finder__item-icon" aria-hidden="true" />
                  <span className="exercise-finder__item-name">{ex.name}</span>
                  <span className="exercise-finder__item-tags">
                    <span className="exercise-finder__item-part">{ex.bodyPart}</span>
                    <span className="exercise-finder__item-equipment">{ex.equipment}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="exercise-finder__cta-row">
          <span className="exercise-finder__cta-note">{exerciseFinderContent.ctaNote}</span>
          <a
            href={getWhatsAppLink(exerciseFinderContent.whatsAppMessage)}
            className="exercise-finder__cta"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="click"
            data-cursor-label="CLICK"
          >
            <span>{exerciseFinderContent.ctaLabel}</span>
            <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
