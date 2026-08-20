import { useEffect, useRef, useState } from 'react';
import { Star, X } from 'lucide-react';
import { googleReviewContent, getGoogleReviewLink } from '../../config/business';
import './GoogleReviewModal.css';

interface GoogleReviewModalProps {
  ready: boolean;
  reducedMotion: boolean;
}

export function GoogleReviewModal({ ready, reducedMotion }: GoogleReviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasTriggeredRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // ---- auto-open once, a few seconds after the hero has had room to settle ----
  useEffect(() => {
    if (!ready || hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    const timer = window.setTimeout(() => setIsOpen(true), googleReviewContent.delayMs);
    return () => window.clearTimeout(timer);
  }, [ready]);

  // ---- open/close side effects: scroll lock, focus management ----
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ---- keyboard: Escape closes, Tab is trapped within the dialog ----
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="review-modal" role="presentation">
      <button
        type="button"
        className="review-modal__backdrop"
        aria-label="Close"
        tabIndex={-1}
        onClick={() => setIsOpen(false)}
      />

      <div
        ref={dialogRef}
        className={`review-modal__dialog ${reducedMotion ? 'review-modal__dialog--static' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-headline"
      >
        <button
          type="button"
          ref={closeButtonRef}
          className="review-modal__close"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          <X size={18} strokeWidth={1.75} />
        </button>

        <div className="review-modal__stars" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} strokeWidth={1.5} className="review-modal__star" />
          ))}
        </div>

        <h2 id="review-modal-headline" className="review-modal__headline">
          {googleReviewContent.headline}
        </h2>

        <p className="review-modal__paragraph">{googleReviewContent.paragraph}</p>

        <div className="review-modal__actions">
          <a
            href={getGoogleReviewLink()}
            className="review-modal__cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
          >
            {googleReviewContent.ctaLabel}
          </a>
          <button type="button" className="review-modal__dismiss" onClick={() => setIsOpen(false)}>
            {googleReviewContent.dismissLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
