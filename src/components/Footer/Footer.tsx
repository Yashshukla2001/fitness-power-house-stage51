import { ArrowRight, ArrowUp } from 'lucide-react';
import { business, navLinks, footerContent, getWhatsAppLink, logo } from '../../config/business';
import { Wordmark } from '../Wordmark/Wordmark';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo">
            <img className="footer__logo-image" src={logo.mark} alt="" aria-hidden="true" />
            <Wordmark className="footer__logo-word" />
          </div>
          <p className="footer__tagline">{footerContent.tagline}</p>
          <span className="footer__location">
            {business.location.city.toUpperCase()} / {business.location.state.toUpperCase()}
          </span>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <span className="footer__links-label">Quick Links</span>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label.toUpperCase()}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contact">
          <span className="footer__links-label">Get In Touch</span>
          <p className="footer__hours">{footerContent.hoursNote}</p>
          <a
            href={getWhatsAppLink(footerContent.whatsAppMessage)}
            className="footer__cta"
            data-cursor="click"
            data-cursor-label="CLICK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{footerContent.ctaLabel}</span>
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copyright">
          © {year} {business.name}. All rights reserved.
        </span>

        <a href="#top" className="footer__back-to-top" data-cursor="click" data-cursor-label="TOP">
          <span>BACK TO TOP</span>
          <ArrowUp size={14} strokeWidth={1.75} aria-hidden="true" />
        </a>

        <span className="footer__built-by">{footerContent.builtByLabel}</span>
      </div>
    </footer>
  );
}
