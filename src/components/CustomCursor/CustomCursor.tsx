import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

interface CustomCursorProps {
  enabled: boolean;
}

/**
 * Minimal cursor: a small dot that tracks the pointer instantly, and a
 * trailing ring that eases behind it. Any element with a `data-cursor`
 * attribute expands the ring on hover; if it also has `data-cursor-label`,
 * that text (e.g. "EXPLORE", "CLICK") appears inside the ring. Uses GSAP
 * quickTo so it never touches React state on mousemove.
 */
export function CustomCursor({ enabled }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    function onMove(e: MouseEvent) {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    }

    function onDocEnter() {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    }

    function onDocLeave() {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    }

    function handleTargetEnter(e: Event) {
      const target = e.target as HTMLElement;
      const el = target.closest('[data-cursor]');
      if (!el) return;
      const cursorLabel = el.getAttribute('data-cursor-label');
      gsap.to(ring, { scale: cursorLabel ? 3.2 : 2.4, duration: 0.35, ease: 'power3.out' });
      gsap.to(dot, { scale: 0, duration: 0.35, ease: 'power3.out' });
      if (cursorLabel && label) {
        label.textContent = cursorLabel;
        gsap.to(label, { opacity: 1, duration: 0.25 });
      }
    }

    function handleTargetLeave(e: Event) {
      const target = e.target as HTMLElement;
      const el = target.closest('[data-cursor]');
      if (!el) return;
      gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power3.out' });
      gsap.to(dot, { scale: 1, duration: 0.35, ease: 'power3.out' });
      gsap.to(label, { opacity: 0, duration: 0.2 });
    }

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onDocLeave);
    document.documentElement.addEventListener('mouseenter', onDocEnter);
    document.addEventListener('mouseover', handleTargetEnter);
    document.addEventListener('mouseout', handleTargetLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onDocLeave);
      document.documentElement.removeEventListener('mouseenter', onDocEnter);
      document.removeEventListener('mouseover', handleTargetEnter);
      document.removeEventListener('mouseout', handleTargetLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor__ring">
        <span ref={labelRef} className="custom-cursor__label" />
      </div>
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
