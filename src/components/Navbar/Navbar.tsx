import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { business, navLinks, getWhatsAppLink, logo } from '../../config/business';
import { Wordmark } from '../Wordmark/Wordmark';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import './Navbar.css';

interface NavbarProps {
  reducedMotion: boolean;
  ready: boolean;
}

/**
 * Segmented pill switcher navbar — nav links sit inside one rounded
 * track, with a soft red-tinted indicator that slides smoothly between
 * items as scroll-spy detects which section is currently in view. The
 * CTA is a solid filled pill rather than a text link, for a bolder
 * "Book/Join" affordance. Chosen as one of two explicitly-approved
 * directions (the other being the hero's framed-cinematic treatment),
 * after presenting three navbar concepts and three hero concepts and
 * waiting for confirmation before building either — not built blind.
 */
export function Navbar({ reducedMotion, ready }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!ready || !wrapRef.current) return;
    if (reducedMotion) {
      gsap.set(wrapRef.current, { clearProps: 'all', opacity: 1 });
      return;
    }
    gsap.fromTo(
      wrapRef.current,
      { autoAlpha: 0, y: -16 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 }
    );
  }, [ready, reducedMotion]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // ---- scroll-spy: track which section is currently most visible ----
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // ---- slide the pill indicator behind whichever link is active ----
  useEffect(() => {
    const track = trackRef.current;
    const indicator = indicatorRef.current;
    if (!track || !indicator) return;

    if (!activeHref) {
      gsap.to(indicator, { autoAlpha: 0, duration: 0.25 });
      return;
    }

    const activeLink = linkRefs.current[activeHref];
    if (!activeLink) return;

    const trackRect = track.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const x = linkRect.left - trackRect.left;

    if (reducedMotion) {
      gsap.set(indicator, { x, width: linkRect.width, autoAlpha: 1 });
    } else {
      gsap.to(indicator, { x, width: linkRect.width, autoAlpha: 1, duration: 0.45, ease: 'power3.out' });
    }
  }, [activeHref, reducedMotion]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div ref={wrapRef} className="navbar__pill">
          <a href="#top" className="navbar__logo" aria-label={`${business.name} — home`}>
            <img className="navbar__logo-image" src={logo.mark} alt="" aria-hidden="true" />
            <Wordmark className="navbar__logo-word" />
          </a>

          <nav className="navbar__links" aria-label="Primary">
            <ul ref={trackRef} className="navbar__track">
              <span ref={indicatorRef} className="navbar__indicator" aria-hidden="true" />
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    ref={(el) => {
                      linkRefs.current[link.href] = el;
                    }}
                    className={`navbar__chip ${activeHref === link.href ? 'navbar__chip--active' : ''}`}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={getWhatsAppLink()}
            className="navbar__join-pill"
            data-cursor="click"
            data-cursor-label="CLICK"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Now
          </a>

          <button
            type="button"
            className={`navbar__menu-btn ${menuOpen ? 'navbar__menu-btn--open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} reducedMotion={reducedMotion} />
    </>
  );
}
