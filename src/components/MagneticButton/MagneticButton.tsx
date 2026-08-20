import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  enabled: boolean;
  external?: boolean;
  ariaLabel?: string;
  /** Custom cursor ring label — defaults to "CLICK" so every existing
   * usage across the site is unaffected. */
  cursorLabel?: string;
}

/**
 * Wraps a link with a subtle magnetic pull toward the pointer (max
 * 8-12px, per spec). Disabled on touch devices and under reduced motion —
 * in that case it renders as a plain link with no listeners attached.
 */
export function MagneticButton({
  href,
  children,
  className,
  enabled,
  external,
  ariaLabel,
  cursorLabel = 'CLICK',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const moveX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const MAX_PULL = 10;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const clampedX = gsap.utils.clamp(-MAX_PULL, MAX_PULL, relX * 0.25);
      const clampedY = gsap.utils.clamp(-MAX_PULL, MAX_PULL, relY * 0.25);
      moveX(clampedX);
      moveY(clampedY);
    }

    function onLeave() {
      moveX(0);
      moveY(0);
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      data-cursor="click"
      data-cursor-label={cursorLabel}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
