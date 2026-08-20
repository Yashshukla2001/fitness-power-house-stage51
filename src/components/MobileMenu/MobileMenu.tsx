import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import { navLinks, getWhatsAppLink } from '../../config/business';
import './MobileMenu.css';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  reducedMotion: boolean;
}

export function MobileMenu({ open, onClose, reducedMotion }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  itemsRef.current = [];

  const addItemRef = (el: HTMLLIElement | null) => {
    if (el) itemsRef.current.push(el);
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { autoAlpha: open ? 1 : 0 });
      return;
    }

    if (open) {
      gsap.set(el, { autoAlpha: 1 });
      gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.55, ease: 'power4.inOut' });
      gsap.fromTo(
        itemsRef.current,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.2, ease: 'power3.out' }
      );
    } else {
      gsap.to(el, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => gsap.set(el, { autoAlpha: 0 }),
      });
    }
  }, [open, reducedMotion]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={rootRef}
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      style={{ visibility: open ? 'visible' : 'hidden' }}
    >
          <button
        type="button"
        className="mobile-menu__close"
        onClick={onClose}
        aria-label="Close menu"
      >
        <X size={22} strokeWidth={1.75} />
      </button>

      
      <nav aria-label="Mobile primary">
        <ul>
          {navLinks.map((link) => (
            <li key={link.href} ref={addItemRef}>
              <a href={link.href} onClick={onClose}>
                {link.label.toUpperCase()}
              </a>
            </li>
          ))}
          <li ref={addItemRef} className="mobile-menu__cta-item">
            <a
              href={getWhatsAppLink()}
              className="mobile-menu__cta"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              JOIN NOW
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
