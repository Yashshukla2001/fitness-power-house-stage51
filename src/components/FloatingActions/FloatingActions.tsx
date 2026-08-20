import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { floatingActionsContent, getWhatsAppLink } from '../../config/business';
import './FloatingActions.css';

/** Minimal WhatsApp glyph — lucide-react doesn't ship brand icons (same
 * reason the Instagram section has its own custom SVG mark). Kept in
 * WhatsApp's own recognizable green rather than the site's red accent —
 * this is a third-party app affordance, not a brand element, and users
 * scan for the familiar color/shape to know what it does at a glance. */
function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.13.07-1.83-.11-.42-.11-.96-.3-1.65-.6-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.21.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.66.78 1.94.92.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > floatingActionsContent.scrollThreshold);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`floating-actions ${visible ? 'floating-actions--visible' : ''}`} aria-hidden={!visible}>
      <a
        href="#top"
        className="floating-actions__button floating-actions__button--top"
        aria-label={floatingActionsContent.backToTopLabel}
        data-cursor="click"
        data-cursor-label="TOP"
        tabIndex={visible ? 0 : -1}
      >
        <ArrowUp size={18} strokeWidth={2} />
      </a>

      <a
        href={getWhatsAppLink(floatingActionsContent.whatsAppMessage)}
        className="floating-actions__button floating-actions__button--whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={floatingActionsContent.whatsAppLabel}
        data-cursor="click"
        data-cursor-label="CHAT"
        tabIndex={visible ? 0 : -1}
      >
        <WhatsAppGlyph />
      </a>
    </div>
  );
}
