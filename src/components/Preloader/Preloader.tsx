import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Wordmark } from '../Wordmark/Wordmark';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
  reducedMotion: boolean;
}

/**
 * The opening beat: an animated dumbbell assembles on screen, does a quick
 * "rep" with a red glow pulse, then the wordmark reveals and the whole
 * layer lifts away. Navigation and hero each run their own entrance
 * timelines right after, so the sequence still reads as one continuous
 * moment — just a livelier opening beat than a plain line-draw.
 *
 * Kept to ~1.8s total: lively, not a cutscene. Under reduced motion this
 * collapses to a near-instant fade, same as every other animated piece
 * on the site.
 */
export function Preloader({ onComplete, reducedMotion }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dumbbellRef = useRef<SVGGElement>(null);
  const barRef = useRef<SVGRectElement>(null);
  const leftPlateRef = useRef<SVGGElement>(null);
  const rightPlateRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGGElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      const tl = gsap.timeline({ onComplete });
      tl.set(rootRef.current, { opacity: 1, visibility: 'visible' })
        .set([dumbbellRef.current, wordRef.current], { opacity: 1, visibility: 'visible' })
        .to(rootRef.current, { autoAlpha: 0, duration: 0.3, delay: 0.3 });
      return () => {
        tl.kill();
      };
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete });

    tl.set(rootRef.current, { autoAlpha: 1 })
      // bar extends from the center
      .fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.32, ease: 'power2.inOut' })
      // plates slide in from outside and snap into place
      .fromTo(
        leftPlateRef.current,
        { x: -26, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.38, ease: 'back.out(2.2)' },
        '-=0.12'
      )
      .fromTo(
        rightPlateRef.current,
        { x: 26, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.38, ease: 'back.out(2.2)' },
        '<'
      )
      // a quick "rep": tilt + settle, with a red glow pulse
      .to(dumbbellRef.current, {
        rotate: -10,
        transformOrigin: '50% 50%',
        duration: 0.22,
        ease: 'power2.out',
      })
      .to(glowRef.current, { autoAlpha: 1, duration: 0.15 }, '<')
      .to(dumbbellRef.current, { rotate: 8, duration: 0.24, ease: 'power2.inOut' })
      .to(dumbbellRef.current, { rotate: 0, duration: 0.26, ease: 'back.out(1.8)' })
      .to(glowRef.current, { autoAlpha: 0, duration: 0.35 }, '<')
      // brand line + wordmark
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.32, ease: 'power2.inOut', transformOrigin: 'left center' },
        '-=0.1'
      )
      .fromTo(
        wordRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power4.inOut' },
        '-=0.1'
      )
      .to({}, { duration: 0.12 })
      .to(rootRef.current, { autoAlpha: 0, duration: 0.4, ease: 'power2.inOut' });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="preloader" role="presentation">
      <div className="preloader__center">
        <svg
          className="preloader__dumbbell"
          viewBox="0 0 200 80"
          width="120"
          height="48"
          aria-hidden="true"
        >
          <g ref={glowRef} className="preloader__glow">
            <ellipse cx="100" cy="40" rx="96" ry="34" />
          </g>
          <g ref={dumbbellRef}>
            <rect ref={barRef} x="42" y="36" width="116" height="8" rx="2" className="preloader__bar" />
            <g ref={leftPlateRef}>
              <rect x="6" y="10" width="14" height="60" rx="4" className="preloader__plate" />
              <rect x="22" y="22" width="10" height="36" rx="3" className="preloader__plate" />
              <rect x="34" y="30" width="10" height="20" rx="2" className="preloader__collar" />
            </g>
            <g ref={rightPlateRef}>
              <rect x="156" y="30" width="10" height="20" rx="2" className="preloader__collar" />
              <rect x="168" y="22" width="10" height="36" rx="3" className="preloader__plate" />
              <rect x="180" y="10" width="14" height="60" rx="4" className="preloader__plate" />
            </g>
          </g>
        </svg>

        <div className="preloader__line-track">
          <div ref={lineRef} className="preloader__line" />
        </div>

        <div ref={wordRef} className="preloader__word">
          <Wordmark />
        </div>
      </div>
    </div>
  );
}
