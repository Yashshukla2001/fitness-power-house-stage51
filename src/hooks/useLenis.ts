import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wires Lenis smooth-scroll into GSAP's ticker so ScrollTrigger stays in
 * sync with the smoothed scroll position. Skipped entirely when the user
 * prefers reduced motion — native scroll is left untouched in that case.
 */
export function useLenis(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      anchors: true,
    });

    function raf(time: number) {
      // GSAP's ticker reports elapsed time in seconds; Lenis expects a
      // millisecond timestamp (matching performance.now()). Without this
      // conversion Lenis's internal lerp thinks almost no time has passed
      // between frames and scrolling effectively stalls.
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', ScrollTrigger.update);

    document.documentElement.classList.add('lenis');

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      document.documentElement.classList.remove('lenis');
    };
  }, [enabled]);
}
